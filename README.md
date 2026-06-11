# Microsoft Azure — Arquitetura, Serviços, Estratégia e Comparativo Cloud

Site técnico construído em React para apresentar o Microsoft Azure a arquitetos sênior. Cobre origem, arquitetura ARM, principais serviços, vantagens, comparativo com AWS e Google Cloud, cobertura global e modelos de preço.

**URL de produção:** https://ashy-grass-0b545950f.7.azurestaticapps.net

---

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | React 19 + Vite |
| Estilo | Tailwind CSS v4 |
| Animações | Framer Motion |
| Mapa | d3-geo + topojson-client (Natural Earth 110m) |
| Ícones | react-icons |
| Deploy | Azure Static Web Apps |
| CI/CD | GitHub Actions |

---

## Estrutura do projeto

```
src/
├── components/
│   ├── Navbar.jsx          # Navegação fixa com blur no scroll
│   ├── Hero.jsx            # Seção inicial com partículas animadas
│   ├── Timeline.jsx        # Linha do tempo da história do Azure
│   ├── Architecture.jsx    # Hierarquia ARM interativa + conceitos fundamentais
│   ├── Services.jsx        # Catálogo de serviços com tabs por categoria
│   ├── Advantages.jsx      # Vantagens e limitações com análise de risco
│   ├── Comparison.jsx      # Azure vs AWS vs Google Cloud
│   ├── GlobalCoverage.jsx  # Cobertura mundial + foco no Brasil
│   ├── WorldMap.jsx        # Mapa SVG com projeção Natural Earth e regiões Azure
│   ├── Pricing.jsx         # Modelos de preço e armadilhas FinOps
│   ├── Governance.jsx      # Landing Zone e Well-Architected Framework
│   ├── Conclusion.jsx      # Síntese técnica para arquitetos
│   ├── AzureIcon.jsx       # Ícone SVG do Azure
│   └── SectionHeader.jsx   # Componente de cabeçalho reutilizável
├── data/
│   └── services.js         # Dados dos serviços Azure por categoria
└── index.css               # Estilos globais, animações e utilitários
public/
└── world-110m.json         # TopoJSON 110m dos países (Natural Earth)
.github/
└── workflows/
    └── deploy.yml          # Pipeline CI/CD GitHub Actions
staticwebapp.config.json    # Configuração de roteamento e cache Azure SWA
```

---

## Deploy na Azure

### Visão geral

O site é hospedado no **Azure Static Web Apps**, serviço que combina CDN global, HTTPS automático e deploy contínuo. A cada push na branch `main` o GitHub Actions constrói o site e envia para a CDN da Azure automaticamente.

```
git push → GitHub Actions → npm run build → Azure CDN → URL pública
```

### Infraestrutura criada

Toda a infraestrutura foi provisionada via **Azure CLI** sem acesso ao portal.

#### 1. Resource Group

```bash
az group create \
  --name rg-azure-estudo \
  --location brazilsouth \
  --tags environment=study owner=mateuslh product=azure-estudo
```

Container lógico que agrupa todos os recursos do projeto. Criado em `brazilsouth` para metadados ficarem próximos geograficamente. Tags aplicadas para rastreabilidade de custo e ownership.

#### 2. Registro do provider

A subscription era nova e não tinha o namespace `Microsoft.Web` habilitado — necessário para criar qualquer recurso web na Azure.

```bash
az provider register --namespace Microsoft.Web
```

#### 3. Azure Static Web App

```bash
az staticwebapp create \
  --name swa-azure-estudo \
  --resource-group rg-azure-estudo \
  --location eastus2 \
  --sku Free \
  --tags environment=study owner=mateuslh product=azure-estudo
```

Criado em `eastus2` porque o Static Web Apps Free não está disponível em `brazilsouth`. O recurso provisiona automaticamente:
- CDN global com pontos de presença em todas as regiões Azure
- Certificado HTTPS gerenciado pela Microsoft (renovação automática)
- URL pública no domínio `*.azurestaticapps.net`
- Ambientes de preview por Pull Request

#### 4. Deployment Token

O Azure SWA gera um token exclusivo que autoriza a pipeline a fazer uploads. Extraído via CLI e adicionado como secret no repositório GitHub:

```bash
# Extrair o token
az staticwebapp secrets list \
  --name swa-azure-estudo \
  --resource-group rg-azure-estudo \
  --query "properties.apiKey" -o tsv

# Adicionar ao GitHub (requer gh CLI autenticado)
gh secret set AZURE_STATIC_WEB_APPS_API_TOKEN \
  --repo mateuslh/swa-azure-estudo \
  --body "<token>"
```

O token nunca é exposto no código — fica armazenado como secret criptografado no GitHub e injetado na pipeline em tempo de execução.

---

### Pipeline CI/CD (`.github/workflows/deploy.yml`)

```yaml
on:
  push:
    branches: [main]          # deploy de produção a cada push
  pull_request:
    branches: [main]          # deploy de preview a cada PR
```

#### Job: Build & Deploy

```yaml
- uses: actions/checkout@v4
- uses: Azure/static-web-apps-deploy@v1
  with:
    app_location: '/'          # raiz do repositório
    output_location: 'dist'    # pasta gerada pelo Vite
    app_build_command: 'npm run build'
```

A action oficial `Azure/static-web-apps-deploy@v1`:
1. Instala as dependências com `npm ci`
2. Executa `npm run build` gerando a pasta `dist/`
3. Faz upload do conteúdo de `dist/` para a CDN Azure

#### Job: Close PR Preview

```yaml
- uses: Azure/static-web-apps-deploy@v1
  with:
    action: close
```

Quando um PR é fechado, esse job remove automaticamente o ambiente de preview criado para ele.

---

### Configuração SPA (`staticwebapp.config.json`)

React é uma SPA — todas as rotas são resolvidas pelo JavaScript no browser. Sem configuração específica, acessar qualquer rota diretamente (ex: `/servicos`) retornaria 404 porque o servidor não encontra o arquivo físico.

O `staticwebapp.config.json` resolve isso redirecionando todas as requisições para `index.html`:

```json
{
  "routes": [
    {
      "route": "/assets/*",
      "headers": {
        "Cache-Control": "public, max-age=31536000, immutable"
      }
    },
    {
      "route": "/*",
      "serve": "/index.html",
      "statusCode": 200
    }
  ]
}
```

**Cache de assets:** os arquivos em `/assets/` recebem cache de 1 ano com `immutable`. O Vite inclui hash no nome dos arquivos (`index-Abc123.js`), então a cada novo build o nome muda e o browser baixa a versão nova — sem risco de servir arquivo antigo em cache.

**Headers de segurança:** `X-Frame-Options`, `X-Content-Type-Options`, `X-XSS-Protection` e `Referrer-Policy` aplicados globalmente em todas as respostas.

---

### Fluxo completo de deploy

```
┌─────────────────────────────────────────────────────────────┐
│  Developer                                                  │
│  git push origin main                                       │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│  GitHub Actions                                             │
│  1. checkout do código                                      │
│  2. npm ci (instala dependências)                           │
│  3. npm run build (Vite gera dist/)                         │
│  4. Azure/static-web-apps-deploy@v1                         │
│     └── upload de dist/ para Azure SWA                     │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│  Azure Static Web Apps                                      │
│  ├── CDN global distribui os arquivos                       │
│  ├── HTTPS com certificado gerenciado                       │
│  └── URL: ashy-grass-0b545950f.7.azurestaticapps.net        │
└─────────────────────────────────────────────────────────────┘
```

---

## Desenvolvimento local

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build de produção
npm run build
```

---

## Recursos Azure utilizados

| Recurso | Nome | Região | SKU |
|---|---|---|---|
| Resource Group | `rg-azure-estudo` | Brazil South | — |
| Static Web App | `swa-azure-estudo` | East US 2 | Free |
