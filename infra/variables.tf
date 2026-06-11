variable "subscription_id" {
  description = "ID da subscription Azure onde os recursos serão criados."
  type        = string
}

variable "project" {
  description = "Nome do projeto — usado como base para nomear recursos."
  type        = string
  default     = "swa-azure-estudo"
}

variable "owner" {
  description = "Owner dos recursos (usado em tags)."
  type        = string
  default     = "mateuslh"
}

variable "environment" {
  description = "Ambiente dos recursos."
  type        = string
  default     = "study"
}

variable "rg_location" {
  description = "Região do Resource Group (metadados e billing)."
  type        = string
  default     = "brazilsouth"
}

variable "swa_location" {
  description = "Região do Static Web App. Free tier não está disponível em brazilsouth."
  type        = string
  default     = "eastus2"
}

variable "swa_sku" {
  description = "SKU do Static Web App. Free para estudo, Standard para produção com custom domain e auth."
  type        = string
  default     = "Free"

  validation {
    condition     = contains(["Free", "Standard"], var.swa_sku)
    error_message = "swa_sku deve ser 'Free' ou 'Standard'."
  }
}
