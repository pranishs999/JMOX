#!/usr/bin/env bash

# =============================================================================
# JMO Management System – One‑Touch Run Script (rewritten)
# =============================================================================
# This script:
#   1. Verifies required binaries (docker, docker-compose, python, node, npm).
#   2. Starts PostgreSQL & Redis containers.
#   3. Sets up a Python virtual environment and seeds the database.
#   4. Launches the FastAPI backend and Vite frontend.
#   5. Shows a summary banner with service URLs and admin credentials.
# =============================================================================

set -euo pipefail

# ---------------------------- Terminal colors ----------------------------
BOLD='\033[1m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
PURPLE='\033[0;35m'
RESET='\033[0m'

# -------------------------- Project layout ---------------------------
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SERVER_DIR="${ROOT_DIR}/server"
WEB_DIR="${ROOT_DIR}/apps/web"

# --------------------------- Cleanup trap ---------------------------
cleanup() {
    echo -e "\n${YELLOW}[!] Stopping development servers...${RESET}"
    [[ -n "${BACKEND_PID-}" ]] && kill "${BACKEND_PID}" 2>/dev/null || true
    [[ -n "${FRONTEND_PID-}" ]] && kill "${FRONTEND_PID}" 2>/dev/null || true
    echo -e "${GREEN}[✔] Shutdown complete. Goodbye!${RESET}"
    exit 0
}
trap cleanup SIGINT SIGTERM EXIT

# -------------------------- Banner helper --------------------------
banner() {
    echo -e "${PURPLE}${BOLD}$1${RESET}"
}

banner "============================================================================="
banner "        Junior Mathematics Olympiad (JMO) Management System                  "
banner "============================================================================="

# ----------------------- 1. Prerequisite checks -----------------------
banner "[1/5] Checking system prerequisites..."

# Docker compose command selection
if command -v docker-compose >/dev/null 2>&1; then
    DOCKER_CMD="docker-compose"
elif command -v docker >/dev/null 2>&1 && docker compose version >/dev/null 2>&1; then
    DOCKER_CMD="docker compose"
elif command -v podman-compose >/dev/null 2>&1; then
    DOCKER_CMD="podman-compose"
else
    echo -e "${RED}[✘] Neither docker-compose nor podman-compose found.${RESET}"
    exit 1
fi

# Node & npm
if ! command -v node >/dev/null 2>&1 || ! command -v npm >/dev/null 2>&1; then
    echo -e "${RED}[✘] Node.js and npm are required for the web frontend.${RESET}"
    exit 1
fi

# Python 3
if ! command -v python3 >/dev/null 2>&1; then
    echo -e "${RED}[✘] Python 3 is required for the backend API.${RESET}"
    exit 1
fi

echo -e "${GREEN}[✔] Prerequisites met. Using container engine: ${DOCKER_CMD}${RESET}"

# -------------------- 2. Start PostgreSQL & Redis --------------------
banner "\n[2/5] Starting PostgreSQL (5432) & Redis (6379) containers..."
cd "${ROOT_DIR}"
${DOCKER_CMD} up -d

# Wait for PostgreSQL to accept connections
echo -n -e "${CYAN}Waiting for PostgreSQL to be ready on port 5432...${RESET}"
MAX_RETRIES=30
RETRY=0
while ! python3 -c "import socket; s=socket.socket(); s.settimeout(1); s.connect(('127.0.0.1',5432))" 2>/dev/null; do
    echo -n '.'
    ((RETRY++))
    if (( RETRY >= MAX_RETRIES )); then
        echo -e "\n${RED}[✘] Timed out waiting for PostgreSQL.${RESET}"
        exit 1
    fi
    sleep 1
done
echo -e " ${GREEN}[Ready]${RESET}"

# ---------------------- 3. Setup venv & seed DB ----------------------
banner "\n[3/5] Seeding database schema and initial users..."
cd "${SERVER_DIR}"

# Create or reuse virtual environment
if [[ -d venv ]]; then
    VENV_PATH="${SERVER_DIR}/venv"
elif [[ -d .venv ]]; then
    VENV_PATH="${SERVER_DIR}/.venv"
else
    echo -e "${YELLOW}Creating Python virtual environment...${RESET}"
    python3 -m venv venv
    VENV_PATH="${SERVER_DIR}/venv"
fi
source "${VENV_PATH}/bin/activate"


# Run DB migrations (if alembic is configured) and seed data
if command -v alembic >/dev/null 2>&1; then
    alembic upgrade head
fi
python seed.py

# -------------------- 4. Launch backend & frontend --------------------
banner "\n[4/5] Launching FastAPI backend & Vite web frontend..."

# Backend (uvicorn) – run in background, log to temp file
cd "${SERVER_DIR}"
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload > /tmp/jmox-backend.log 2>&1 &
BACKEND_PID=$!

# Frontend (Vite) – run in background, log to temp file
cd "${WEB_DIR}"
npm run dev -- --host 0.0.0.0 > /tmp/jmox-frontend.log 2>&1 &
FRONTEND_PID=$!

# Wait for backend health endpoint
echo -n -e "${CYAN}Waiting for FastAPI backend (http://localhost:8000/health)...${RESET}"
RETRY=0
while ! curl -s http://localhost:8000/health | grep -q "healthy"; do
    echo -n '.'
    ((RETRY++))
    if (( RETRY >= 20 )); then
        echo -e "\n${RED}[✘] Backend failed to start. Check /tmp/jmox-backend.log${RESET}"
        tail -20 /tmp/jmox-backend.log
        exit 1
    fi
    sleep 1
done
echo -e " ${GREEN}[Healthy]${RESET}"

# Wait for frontend to serve HTML
echo -n -e "${CYAN}Waiting for Vite frontend (http://localhost:5173)...${RESET}"
RETRY=0
while ! curl -s http://localhost:5173/ | grep -q "<html"; do
    echo -n '.'
    ((RETRY++))
    if (( RETRY >= 20 )); then
        echo -e "\n${RED}[✘] Frontend failed to start. Check /tmp/jmox-frontend.log${RESET}"
        tail -20 /tmp/jmox-frontend.log
        exit 1
    fi
    sleep 1
done
echo -e " ${GREEN}[Ready]${RESET}"

# --------------------------- 5. Summary banner ---------------------------
banner "\n[5/5] All services are operational!"

echo -e "${CYAN}${BOLD}+-------------------------------------------------------------------------+${RESET}"
echo -e "${CYAN}${BOLD}|                 JMO SYSTEM LIVE SERVICES & ENDPOINTS                    |${RESET}"
echo -e "${CYAN}${BOLD}+-------------------------------------------------------------------------+${RESET}"
echo -e " ${BOLD}Web Frontend:${RESET}        ${BLUE}http://localhost:5173${RESET}"
echo -e " ${BOLD}FastAPI Backend:${RESET}     ${BLUE}http://localhost:8000${RESET}"
echo -e " ${BOLD}Interactive Swagger:${RESET}  ${BLUE}http://localhost:8000/docs${RESET}"
echo -e " ${BOLD}PostgreSQL Database:${RESET} ${BLUE}127.0.0.1:5432${RESET} (DB: jmox, User: jmox)"
echo -e " ${BOLD}Redis Cache:${RESET}         ${BLUE}127.0.0.1:6379${RESET}"
echo -e "${CYAN}${BOLD}+-------------------------------------------------------------------------+${RESET}"
echo -e "${CYAN}${BOLD}|                 SYSTEM ADMIN CREDENTIALS                                 |${RESET}"
echo -e "${CYAN}${BOLD}+-------------------------------------------------------------------------+${RESET}"
echo -e " ${BOLD}Super Admin:${RESET}         Email: ${YELLOW}jms.hric@gmail.com${RESET}   | Password: ${YELLOW}Mathforall@JMO369${RESET}"
echo -e "${CYAN}${BOLD}+-------------------------------------------------------------------------+${RESET}\n"

echo -e "${YELLOW}Press [CTRL+C] at any time to gracefully stop all services.${RESET}"

# Keep script alive so trap works
wait
