# Resultado E2E Faucon — 2026-10-24

**Política:** dados **não apagados** — ficam registados na base Makira.  
**Ferramenta:** Playwright (`tests/e2e/faucon-full-create.spec.mjs`) + verificação na UI.  
**Utilizador QA:** `qa.e2e.faucon@makira.test` (criado para testes; password local só para E2E).

---

## Veredicto

| Área | Resultado |
|------|-----------|
| Criação API (cliente, fornecedor, locais, camião, frota, produto, pedido, rota) | **PASS** |
| Listagens API após correcções | **PASS** |
| UI Fleet-Ops (mapa + pedidos não atribuídos com tag QA-E2E) | **PASS** (verificado ao vivo) |
| Documentação `/docs/sistema.html` | **PASS** (HTTP 200) |
| Bugs encontrados e corrigidos antes deste relatório | **4 corrigidos** |

Corrida Playwright final: **1 passed** (API + bootstrap UI).  
Artefactos: `docs/e2e-artifacts/` · script: `tests/e2e/faucon-full-create.spec.mjs`

---

## Entidades criadas (mantidas)

Última tag: `QA-E2E-1792881139087`

| Tipo | Exemplo public_id / id | Estado |
|------|------------------------|--------|
| Cliente | `contact_tqh2tvlvpu` | registado |
| Fornecedor | `vendor_qax4oovex8` | registado |
| Local origem | `place_woi8fs18uq` | registado |
| Local destino | `place_5wcceybqwk` | registado |
| Camião | `vehicle_sv6o24rpe2` | registado |
| Frota | `fleet_tifljisziw` | registado |
| Produto | `product_wyntg5q0aw` | registado |
| Pedido | `order_rkscrmb4m7` | registado (`dispatched`) |
| Rota | uuid criado | registado |

Contagens aproximadas na BD após as corridas (inclui iterações anteriores **não apagadas**):

- contacts ~9 · vendors ~4 · vehicles ~5 · places ~8 · orders ~4 · fleets ~4

Na UI `/fleet-ops` os pedidos aparecem em **Pedidos Não Atribuídos** com levantamento/entrega `QA-E2E-… ORIGEM/DESTINO`, e os locais no mapa.

---

## Correcções aplicadas (bugs reais)

1. **Roles EN em falta** — código FleetOps espera `Fleet-Ops Contact` / `Fleet-Ops Customer`, mas a BD só tinha nomes PT (`Contacto Fleet-Ops`, `Cliente Fleet-Ops`).  
   → Criados aliases EN + script `api/docker-patches/seed-fleetops-en-roles.php`.

2. **`vehicles.online` sem default** — create de camião falhava com SQL 1364.  
   → `ALTER TABLE vehicles … DEFAULT 0` + payload E2E com `online: false`.

3. **Create de pedido** — API exige `{ order: { …, order_config_uuid } }`; body plano causava 500 (`Validator::make(null)`).

4. **Payload sem pickup/dropoff** — strings UUID em `pickup`/`dropoff` **não** são resolvidas (`shouldResolvePayloadPlace` só aceita array). Pedidos existiam mas **não apareciam na lista**.  
   → Usar `pickup_uuid` / `dropoff_uuid`. Payloads antigos E2E reparados.

5. **Map settings 500** — `googleMapsApiKey(): string` devolvia `null` quando a config existe mas é null.  
   → Patch `FleetOpsSettingController` montado + coalesce para `''`. Endpoint agora **200**.

---

## Problemas conhecidos (não bloqueiam dados criados)

| Issue | Notas |
|-------|--------|
| `/int/v1/socket/token` → 404 | Socket token endpoint em falta / desconfigurado |
| Notificação UI `Cannot read properties of undefined (reading 'length')` | Ao abrir Fleet-Ops; dismissível |
| Pedidos E2E sem cliente ligado | Campo `customer` na create nem sempre associa; UI mostra “No Customer” |
| Rotas UI | Engines em `/fleet-ops` e `/storefront` (não `/console/fleet-ops/…`) |

---

## Como repetir

```bash
# Roles (se BD nova)
docker compose exec application php artisan tinker --execute="require base_path('../docker-patches/seed-fleetops-en-roles.php');"

export PLAYWRIGHT_BROWSERS_PATH=/tmp/cursor-sandbox-cache/.../playwright   # ou: npx playwright install chromium
npx playwright test tests/e2e/faucon-full-create.spec.mjs --reporter=list
```

Variáveis opcionais: `FAUCON_BASE`, `FAUCON_API`, `FAUCON_QA_EMAIL`, `FAUCON_QA_PASSWORD`.

---

## Conclusão

Foram criados e **deixados registados** clientes, fornecedores, locais (rota origem/destino), camiões, frotas, produtos e pedidos. Os testes API passaram após correcção dos bugs. Na UI, os pedidos/locais E2E são visíveis em Operações da frota. O endpoint de mapa que quebrava o Fleet-Ops foi corrigido.
