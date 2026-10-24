# Faucon — Documentação do Sistema

---

## 1. O que é o Faucon

O **Faucon** é a plataforma operacional de logística e cadeia de abastecimento usada pela Makira Tec, construída sobre o Fleetbase e personalizada (marca, idioma português, menu, ícones e patches de UI/API).

Serve para:

- Gerir frota, motoristas, veículos e pedidos em tempo real  
- Despachar e acompanhar entregas / operações  
- Comércio on-demand (loja / marketplace)  
- Contabilidade operacional (faturas, pagamentos, fluxo de caixa)  
- Portal do cliente, IA assistiva, identidade e acessos  
- Integrações via API REST, webhooks e WebSockets  

Público-alvo típico: transportadoras, courier, last-mile, e-commerce com entrega própria, operações multi-depósito e equipas que precisam de controlos de identidade e auditoria.

---

## 2. Identidade e branding

| Elemento | Valor neste projeto |
|----------|---------------------|
| Nome na consola | **Faucon Console** |
| Favicon / ícone | Ave azul + seta laranja (Makira), fundo transparente |
| Créditos UI | «desenvolvido por Makira Tec» (em vez de «Powered by Fleetbase») |
| Idioma principal | Português (`pt-br` normalizado na UI) |
| Tema por omissão | Dark (configurável em Administração → Branding) |
| Ícone de login / painel | `branding.icon_url` (upload em Administração → Branding) |

O favicon do browser é gerado a partir do ícone de branding e servido por `console/docker-patches/favicon/`. Em runtime, `pt-ui-runtime.js` pode sincronizar o favicon com o `icon_url` da API de branding.

---

## 3. Arquitectura (visão geral)

```
┌─────────────────────────────────────────────────────────────┐
│                     Utilizador (browser)                    │
│                   http://localhost:4200                     │
└────────────────────────────┬────────────────────────────────┘
                             │
              ┌──────────────▼──────────────┐
              │   Console (Ember.js / nginx) │
              │   engines + patches Faucon   │
              └──────────────┬──────────────┘
                             │ REST + WebSocket
         ┌───────────────────┼───────────────────┐
         │                   │                   │
┌────────▼────────┐  ┌───────▼────────┐  ┌───────▼────────┐
│  API (Laravel)  │  │ SocketCluster  │  │  MySQL + Redis │
│  :8000 (httpd)  │  │     :38000     │  │  cache/filas   │
└────────┬────────┘  └────────────────┘  └────────────────┘
         │
   ┌─────┴─────┐
   │ queue +   │
   │ scheduler │
   └───────────┘
```

### Componentes Docker

| Serviço | Função | Porta típica |
|---------|--------|--------------|
| `console` | Frontend Ember (imagem + patches montados) | **4200** |
| `httpd` | Proxy HTTP da API | **8000** |
| `application` | API Laravel / Fleetbase | interno |
| `database` | MySQL 8 | **3309** → 3306 |
| `cache` | Redis (cache + filas) | interno |
| `socket` | SocketCluster (tempo real) | **38000** |
| `queue` | Workers `php artisan queue:work` | — |
| `scheduler` | Cron (`go-crond`) | — |

Ficheiros-chave:

- `docker-compose.yml` — stack base  
- `docker-compose.override.yml` — **ambiente local Faucon** (volumes de patches, env, imagem da consola)  
- `console/fleetbase.config.json` — host da API e do socket para a consola  

---

## 4. Stack técnica

| Camada | Tecnologia |
|--------|------------|
| Frontend | Ember.js (engines por módulo), nginx estático em produção/imagem |
| Backend | PHP / Laravel (pacotes `fleetbase/*-api`) |
| Tempo real | SocketCluster |
| Dados | MySQL 8 |
| Cache / filas | Redis |
| Mapas / rotas | OSRM (configurável), Leaflet nos engines |
| Extensões | Registry Bridge + marketplace Fleetbase |
| Contentores | Docker Compose |

Pacotes API relevantes (`api/composer.json`): `core-api`, `fleetops-api`, `storefront-api`, `ledger-api`, `customer-portal-api`, `ai`, `valhalla-api`, `vroom-api`, `registry-bridge`.

Engines na consola: `fleetops`, `storefront`, `ledger`, `iam`, `dev`, `ai`, `customer-portal`, `registry-bridge`, `valhalla`, `vroom`.

---

## 5. Módulos e funcionalidades

### 5.1 Operações da frota (Fleet-Ops)

Rota base: `/console/fleet-ops` (na UI: **Operações da frota**).

| Área | O que faz |
|------|-----------|
| **Pedidos / Ordens** | Criar, atribuir, acompanhar; fluxos de actividade configuráveis; board Kanban; mapa ao vivo |
| **Operações ao vivo** | Visão em tempo real de pedidos activos, frota e mapa |
| **Condutores** | Cadastro, estado, atribuição, avatar, contacto |
| **Veículos** | Frota, tipos, estado, ligação a condutores |
| **Contactos / locais** | Clientes, fornecedores, pontos de recolha/entrega |
| **Rotas / optimização** | Planeamento; integração com motores Valhalla / Vroom |
| **Áreas de serviço & geofences** | Zonas, eventos de entrada/saída |
| **Manutenção** | Ordens de manutenção, equipamentos, peças |
| **Conectividade / telemática** | Dispositivos GPS, sensores, combustível, eventos |
| **Análises** | Indicadores operacionais |
| **Definições Fleet-Ops** | Configuração do módulo, tipos de pedido, campos custom |

Fluxos típicos:

1. Configurar tipos de pedido e fluxos de estado  
2. Registar veículos e condutores  
3. Criar pedido → atribuir → acompanhar no mapa  
4. Prova de entrega / conclusão → repercussão no Ledger se ligado  

---

### 5.2 Storefront (Loja / comércio)

Rota: `/console/storefront`.

- Catálogo de produtos e categorias  
- Pedidos de loja / marketplace  
- Multi-vendor (conforme extensão)  
- Ligação nativa à entrega via Fleet-Ops  
- Definições de loja, branding da loja, checkout  

Útil para food delivery, grocery, retail com last-mile próprio.

---

### 5.3 Contabilidade (Ledger)

Rota do engine Ledger.

| Função | Descrição |
|--------|-----------|
| **Dashboard financeiro** | Receitas, actividade recente, resumo |
| **Fluxo de caixa** | Visão de entradas/saídas (UI PT: ao lado da actividade recente) |
| **Faturas** | Emissão e gestão |
| **Pagamentos** | Registo e conciliação |
| **Carteiras** | Saldos / wallets |
| **Despesas** | Controlo de custos operacionais |

---

### 5.4 Identidade e acesso (IAM)

- Utilizadores, grupos, papéis (roles)  
- Políticas de permissão  
- Convites  
- Autenticação (incl. OAuth providers quando configurados)  
- **2FA** (two-factor)  

---

### 5.5 Programadores (Developers)

Rota: `/console/developers` (UI: **Programadores**).

- Chaves API (test / live)  
- Webhooks  
- Eventos de sistema e socket  
- Logs de pedidos  
- Ferramentas para integração externa  

---

### 5.6 Portal do cliente (Customer Portal)

Workspace self-service para clientes finais / B2B:

- Criar e seguir pedidos  
- Cotações e pagamento  
- Faturas e documentos  
- Tickets de suporte  

---

### 5.7 IA (AI Engine)

- Criação de pedidos por linguagem natural  
- Consultas operacionais  
- Insights (quando API OpenAI/Claude configurada)  

---

### 5.8 Extensões (Registry Bridge)

- Explorar e instalar extensões do registry Fleetbase  
- Extensões pré-instaladas possíveis via `REGISTRY_PREINSTALLED_EXTENSIONS`  
- Publicação / revisão (fluxos de developers do registry)  

---

### 5.9 Valhalla & Vroom

Motores de **routing / matrix / optimização de rotas** usados pelo Fleet-Ops para planeamento avançado de rotas e alocação.

---

### 5.10 Administração da consola

Áreas tipicamente sob **Admin**:

- **Branding** — logo, ícone, tema  
- **Organizações** — tenants, utilizadores, definições  
- **Configuração de serviços** — mail, filesystem, queue, notification channels, mapas, etc.  
- **Métricas** (patches API locais possíveis em `api/docker-patches/`)  

Conta do utilizador: perfil, organizações, autenticação, notificações, 2FA.

---

### 5.11 Apps móveis (ecossistema Fleetbase)

Não fazem parte deste repo Docker da consola, mas integram-se à mesma API:

| App | Função |
|-----|--------|
| **Navigator** | App do motorista (dispatch, navegação, POD) |
| **Storefront App** | App do consumidor / loja |

---

## 6. Personalizações Faucon neste repositório

Tudo o que diferencia o Faucon do Fleetbase “vanilla” vive sobretudo em patches montados por volume — **não** na imagem Docker upstream.

### 6.1 Pasta `console/docker-patches/`

| Conteúdo | Função |
|----------|--------|
| `index.html` | Título Faucon, favicons, CSS de UI, scripts |
| `assets/pt-ui-runtime.js` | Tradução residual em runtime + política de menu + sync de favicon |
| `assets/@fleetbase/console-*.js` / `vendor-*.js` | Bundles com strings PT e ajustes |
| `engines-dist/@fleetbase/*/assets/engine*.js` | Engines traduzidos / ajustados |
| `favicon/` + `favicon.ico` | Ícone Makira (transparência) |
| `images/icon*.png` | Fallback do ícone na UI |
| `nginx/default.conf` | Config nginx da consola |
| `_frozen_backup/` | Backup seguro dos patches |
| `verify_patches.py` / `restore_from_frozen_backup.sh` | Validação e restauro |
| Scripts `*_pt_*.py` | Pipelines de tradução EN→PT |

### 6.2 Pasta `api/docker-patches/`

Patches PHP/rotas montados sobre o vendor da API (ex.: métricas admin, settings Fleet-Ops).

### 6.3 `docker-compose.override.yml`

- Usa imagem `fleetbase/fleetbase-console:latest` (sem rebuild local lento)  
- Monta **todos** os JS/CSS/engines/favicon/index necessários  
- Env local (APP_URL, CONSOLE_HOST, DB, mail log, etc.)  

### 6.4 Idioma

1. Substituições quoted nos bundles JS  
2. Dicionário + walker em `pt-ui-runtime.js`  
3. Normalização de locale para `pt-br` no `index.html`  
4. Locale do contentor: `LANG=pt_PT.UTF-8`  

### 6.5 Política de UI

O runtime esconde promoções Fleetbase (blog, Discord, changelog genérico, etc.) e reforça branding Makira, sem remover funcionalidade operacional.

---

## 7. Arranque local

### Pré-requisitos

- Docker + Docker Compose v2  
- Memória Docker recomendada ≥ 4 GB  
- Portas livres: 4200, 8000, 38000, 3309  

### Subir

```bash
cd /caminho/para/fleetbase
docker compose up -d
```

### URLs

| Serviço | URL |
|---------|-----|
| Consola Faucon | http://localhost:4200 |
| API | http://localhost:8000 |
| Socket | ws://localhost:38000 |

Primeiro acesso: onboarding (criar admin + organização), depois login.

Configuração da consola → API:

```json
{
  "API_HOST": "http://localhost:8000",
  "SOCKETCLUSTER_HOST": "localhost",
  "SOCKETCLUSTER_PORT": "38000",
  "SOCKETCLUSTER_SECURE": "false"
}
```

(`console/fleetbase.config.json`)

### Após alterar patches montados

- Ficheiros bind-mount (JS, CSS, favicon, `index.html`) actualizam sem rebuild.  
- Novos volumes em `docker-compose.override.yml` exigem:  
  `docker compose up -d console`  
- Hard refresh no browser (Ctrl+Shift+R) para cache de favicon/assets.

---

## 8. Configuração de sistema (serviços)

Na consola (Admin / Configuração), tipicamente:

| Serviço | Exemplos |
|---------|----------|
| Mail | SMTP, log (dev), From name/address |
| Filesystem / storage | Local, S3, etc. |
| Queue | Redis |
| Notification channels | Email, SMS, push (conforme drivers) |
| Mapas | Google Maps / outros + locale |
| Socket | já via SocketCluster no compose |
| Branding | logo, ícone, tema |

Em desenvolvimento local o mail costuma ir para o driver `log`.

---

## 9. Modelo de dados (resumo)

Fleetbase modela entidades centrais como:

- **Organização / company** (tenant)  
- **Users** e papéis IAM  
- **Orders** com configs e activity flows  
- **Drivers**, **vehicles**, **places**, **contacts**  
- **Files / uploads**  
- **Storefront**: products, categories, store orders  
- **Ledger**: invoices, payments, wallets  
- **Settings / branding**  

Diagrama ER do upstream: `erd.svg` / `erd-dark.svg` na raiz do repo.

---

## 10. Segurança e acessos

- Autenticação na consola + tokens/API keys para integrações  
- Separação test/live nas chaves de developers  
- Roles e policies (IAM)  
- 2FA opcional  
- Sessões / CORS / `FRONTEND_HOSTS` e `CONSOLE_HOST` no override  
- Origins do SocketCluster restritas em produção  

**Produção:** nunca expor MySQL publicamente; definir `SOCKETCLUSTER_OPTIONS` com origins HTTPS reais; secrets fora do git; backups de `storage` e DB.

---

## 11. Regras críticas de manutenção (Faucon)

> **Nunca restaurar assets da imagem Docker upstream** sobre `console/docker-patches/`.

Isso apaga traduções PT, branding e remoções de menu. Ver:

- `console/docker-patches/NEVER_RESTORE_FROM_IMAGE.md`  
- `.cursor/rules/faucon-never-restore-image.mdc`  

Se um JS partir:

1. `bash console/docker-patches/restore_from_frozen_backup.sh`  
2. Ou recuperar de git / `_frozen_backup/`  
3. `python3 console/docker-patches/verify_patches.py`  
4. Reaplicar traduções **em cima** dos patches  

Camadas que devem sobreviver sempre: `pt-ui-runtime.js`, CSS Faucon, mounts do override, pasta `favicon/`.

---

## 12. Estrutura útil do repositório

```
fleetbase/
├── api/                      # Laravel + storage + docker-patches API
├── console/                  # Código Ember + fleetbase.config.json
│   └── docker-patches/       # ★ Fonte da verdade da UI Faucon
├── packages/                 # Código fonte de engines/APIs (monorepo)
├── docker/                   # HTTP, DB init, etc.
├── docs/                     # Esta documentação
├── docker-compose.yml
├── docker-compose.override.yml
├── erd.svg                   # Schema da BD
└── README.md                 # README upstream Fleetbase
```

---

## 13. Fluxos de negócio exemplo

### Entrega courier

1. Cliente ou operador cria pedido (consola / API / portal / storefront)  
2. Orquestração / atribuição a motorista + veículo  
3. Motorista actualiza estados (Navigator ou consola)  
4. Tracking em tempo real (socket + mapa)  
5. Conclusão / POD → faturação no Ledger se aplicável  

### Loja com entrega própria

1. Produtos no Storefront  
2. Pedido da loja  
3. Despacho automático ou manual no Fleet-Ops  
4. Entrega e notificação ao cliente  

### Manutenção de frota

1. Equipamentos e peças cadastrados  
2. Ordem de manutenção  
3. Histórico ligado ao veículo  
4. Custos podem reflectir-se em despesas (Ledger)  

---

## 14. Troubleshooting rápido

| Sintoma | Verificar |
|---------|-----------|
| Consola em inglês de novo | Patches não montados ou restaurados da imagem; `verify_patches.py` |
| API inacessível | `docker compose ps`, logs `httpd`/`application`, `API_HOST` |
| Sem tempo real | Socket `:38000`, origins no override |
| Favicon antigo | Hard refresh; mounts de `favicon/`; query `?v=` no `index.html` |
| Upload falha | `storage` montado, permissões, config filesystem |
| Tradução a meio | `pt-ui-runtime.js` + bundles; limpar cache browser |

```bash
docker compose ps
docker compose logs -f console application httpd
curl -s http://localhost:8000/int/v1/settings/branding
curl -sI http://localhost:4200/favicon/favicon-32x32.png
```

---

## 15. Glossário

| Termo | Significado |
|-------|-------------|
| **Fleetbase** | OS open-source de logística (upstream) |
| **Faucon** | Nome/produto Makira sobre Fleetbase neste projeto |
| **Engine** | Módulo Ember montado na consola |
| **Patch** | Ficheiro local montado por cima da imagem Docker |
| **POD** | Proof of Delivery (prova de entrega) |
| **Tenant** | Organização isolada na mesma instalação |
| **Registry** | Marketplace / repositório de extensões |
