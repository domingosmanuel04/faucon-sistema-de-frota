# Custo por entrega (Fase 2)

## Estado
**Stub v1** — flag `cost_per_delivery`.

## API
- `GET/POST /int/v1/control-tower/cost-rates` — combustível, l/100km, custo/hora motorista, manutenção/km, moeda
- `GET /int/v1/control-tower/cost-summary` — estimativa agregada por pedidos activos
- `GET /int/v1/control-tower/driver-settlement` — liquidação heurística
- `POST /int/v1/control-tower/invoice-draft` — rascunho de fatura

## UI
Aba **Custos** em `/torre/`.

## Próximos passos
Telemetria real de km/combustível; contratos por cliente; export PDF/ledger.
