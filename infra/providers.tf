terraform {
  required_version = ">= 1.5"

  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 4.0"
    }
  }

  backend "azurerm" {
    resource_group_name  = "rg-azure-estudo"
    storage_account_name = "stterraformadpstate"
    container_name       = "tfstate"
    key                  = "azure-estudo.tfstate"
  }
}

provider "azurerm" {
  features {}
  subscription_id = var.subscription_id
}
