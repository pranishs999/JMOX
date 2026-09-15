#!/bin/bash
set -e

ROOT="$(cd "$(dirname "$0")" && pwd)"
ENV_FILE="$ROOT/.env"

# Create .env from .env.example if it doesn't exist
if [ ! -f "$ENV_FILE" ]; then
    cp "$ROOT/.env.example" "$ENV_FILE"
    echo "Created .env from .env.example"
fi

# Generate APP_SECRET_KEY only if missing or still a placeholder
if ! grep -qE '^APP_SECRET_KEY=.{64,}$' "$ENV_FILE"; then
    APP_SECRET=$(python3 -c "import secrets; print(secrets.token_hex(64))")
    sed -i "s|^APP_SECRET_KEY=.*|APP_SECRET_KEY=$APP_SECRET|" "$ENV_FILE"
    echo "Generated APP_SECRET_KEY"
else
    echo "Existing APP_SECRET_KEY found, keeping it"
fi

# Generate JWT_SECRET_KEY only if missing or still a placeholder
if ! grep -qE '^JWT_SECRET_KEY=.{64,}$' "$ENV_FILE"; then
    JWT_SECRET=$(python3 -c "import secrets; print(secrets.token_hex(64))")
    sed -i "s|^JWT_SECRET_KEY=.*|JWT_SECRET_KEY=$JWT_SECRET|" "$ENV_FILE"
    echo "Generated JWT_SECRET_KEY"
else
    echo "Existing JWT_SECRET_KEY found, keeping it"
fi

chmod 600 "$ENV_FILE"

echo
echo "JMOX .env is ready."