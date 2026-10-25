# Roadmap Faucon — Completar e inovar

Documento vivo. Estado: **stubs operacionais aplicados no Docker local** (Torre multi-módulo + hooks Fleet-Ops). Integrações externas reais e app motorista ficam pendentes de credenciais / outros repos.

## Visão

Responder em segundos a: *onde vai a frota, o que está atrasado, quanto custa, e o que o sistema recomenda fazer a seguir?*

## Fase 1 — Operação diária ✅

| # | Item | Estado | Entrega |
|---|------|--------|---------|
| 1 | Torre de controlo unificada | **Implementado** | `/torre/` + `control-tower/*` |
| 2 | SLA e excepções | **Implementado** | `faucon.sla` + excepções POD |
| 3 | POD avançado | **Implementado** | meta + proofs + gate + hook `update-activity` |
| 4 | Planeado vs executado | **Heurística v1** | `planned-vs-actual` |
| 5 | Atribuição inteligente | **Stub + confirmar** | suggest + assign-confirm |

## Fase 2 — Dinheiro e custo ✅ stubs

| # | Item | Estado |
|---|------|--------|
| 6–8 | Custo / liquidação / fatura draft | **Stub v1** |
| 9 | Pagamentos locais (Multicaixa) | **Dry-run** |

## Fase 3 — IA ✅ heurísticas / stubs

| # | Item | Estado |
|---|------|--------|
| 10–11 | Copiloto + previsão atraso | **Stub / heurística** |
| 12 | OCR documentos | **Stub v1** (`ocr/extract`) |
| 13 | Anomalias | **Heurística v1** |

## Fase 4 — Canais e plataforma ✅ parcial

| # | Item | Estado | Entrega |
|---|------|--------|---------|
| 14 | Tracking público | **UI v1** | `/tracking/` |
| 15 | WhatsApp Business | **Dry-run** | precisa token Meta |
| 16 | App motorista offline | Fora deste repo | — |
| 17 | Build próprio da consola | Planeado | sair de patches minificados |
| 18 | Observabilidade | **Health + Sentry env** | precisa DSN |
| 19 | Ambientes | **Doc + endpoint** | `environments` |
| 20 | E2E Playwright | Parcial | suite existente |
| 21 | RBAC zonas | **Stub v1** | `rbac/zones` |
| 22 | Webhooks retry | **Stub + fila** | retry-status / retry-enqueue |
| 23–26 | Corredores AO, marketplace, compliance, what-if | **Stubs v1** | `corridors`, `marketplace`, `what-if` |

## Compose versionado

`docker-compose.override.yml` é gitignored (secrets). Modelo: `docker-compose.override.yml.example`.

## Critérios de aceite (local)

- [x] Torre + APIs montadas e a responder
- [x] POD gate nativo `update-activity`
- [x] Stubs plataforma na aba Sistema
- [ ] Credenciais reais WhatsApp / Multicaixa / Sentry
- [ ] App motorista + build consola próprios

## Validar

```bash
cp docker-compose.override.yml.example docker-compose.override.yml  # se necessário
docker compose up -d
open http://localhost:4200/torre/
```
