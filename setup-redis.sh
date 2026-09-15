#!/bin/bash
set -e

ROOT="$(cd "$(dirname "$0")" && pwd)"
ENV_FILE="$ROOT/.env"

if [ ! -f "$ENV_FILE" ]; then
    cp "$ROOT/.env.example" "$ENV_FILE"
fi

read -rsp "Enter Upstash Redis Token: " REDIS_TOKEN
echo

REDIS_URL="rediss://default:${REDIS_TOKEN}@warm-bluejay-42936.upstash.io:6379"

if grep -q '^REDIS_URL=' "$ENV_FILE"; then
    sed -i "s|^REDIS_URL=.*|REDIS_URL=$REDIS_URL|" "$ENV_FILE"
else
    printf '\nREDIS_URL=%s\n' "$REDIS_URL" >> "$ENV_FILE"
fi

chmod 600 "$ENV_FILE"

echo "Upstash Redis configured successfully."