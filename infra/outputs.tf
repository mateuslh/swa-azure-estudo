output "resource_group_name" {
  description = "Nome do Resource Group criado."
  value       = azurerm_resource_group.main.name
}

output "static_web_app_name" {
  description = "Nome do Static Web App."
  value       = azurerm_static_web_app.main.name
}

output "static_web_app_url" {
  description = "URL pública do site."
  value       = "https://${azurerm_static_web_app.main.default_host_name}"
}

output "deployment_token" {
  description = "Token de deploy para configurar no GitHub Actions secret AZURE_STATIC_WEB_APPS_API_TOKEN."
  value       = azurerm_static_web_app.main.api_key
  sensitive   = true
}
