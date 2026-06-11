locals {
  tags = {
    environment = var.environment
    owner       = var.owner
    product     = var.project
    managed_by  = "terraform"
  }
}

# ---------------------------------------------------------------------------
# Resource Group
# ---------------------------------------------------------------------------
resource "azurerm_resource_group" "main" {
  name     = "rg-${var.project}"
  location = var.rg_location
  tags     = local.tags
}

# ---------------------------------------------------------------------------
# Azure Static Web App
# CDN global + HTTPS automático + preview environments por PR
# ---------------------------------------------------------------------------
resource "azurerm_static_web_app" "main" {
  name                = "swa-${var.project}"
  resource_group_name = azurerm_resource_group.main.name
  location            = var.swa_location
  sku_tier            = var.swa_sku
  sku_size            = var.swa_sku
  tags                = local.tags
}
