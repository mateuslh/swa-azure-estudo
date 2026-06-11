#!/usr/bin/env bash
# Sincroniza o deployment token do Terraform com o secret AZURE_STATIC_WEB_APPS_API_TOKEN no GitHub.
# Uso: ./infra/sync-secret.sh [<repo>]
# Requer: terraform (com backend configurado), gh (autenticado)
set -euo pipefail

REPO="${1:-mateuslh/swa-azure-estudo}"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

cd "$SCRIPT_DIR"

echo "→ Buscando token do Terraform..."
TOKEN=$(terraform output -raw deployment_token)

echo "→ Atualizando secret AZURE_STATIC_WEB_APPS_API_TOKEN em $REPO..."
printf '%s' "$TOKEN" | gh secret set AZURE_STATIC_WEB_APPS_API_TOKEN --repo "$REPO"

echo "✓ Secret atualizado com sucesso."
