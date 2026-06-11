terraform {
  required_version = ">= 1.5"

  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 4.0"
    }
  }

  # Descomente e configure para usar backend remoto (recomendado em time)
  # backend "azurerm" {
  #   resource_group_name  = "rg-tfstate"
  #   storage_account_name = "stmateuslhtfstate"
  #   container_name       = "tfstate"
  #   key                  = "azure-estudo/terraform.tfstate"
  # }
}

provider "azurerm" {
  features {}
  subscription_id = var.subscription_id
}
