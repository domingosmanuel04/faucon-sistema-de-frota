# Copiloto de despacho (Fase 3)

## Estado
**Stub v1** — flags `dispatch_copilot`, `assignment_suggest`, `delay_prediction`, `anomaly_detection`.

## API
- `GET /int/v1/control-tower/assignment-suggest` — motoristas candidatos
- `POST /int/v1/control-tower/assign-confirm` — confirma atribuição
- `GET /int/v1/control-tower/delay-prediction` — risco heurístico de atraso
- `GET /int/v1/control-tower/anomalies` — sinais simples (sem GPS / overload)

## UI
Abas **Operação** e **IA / Riscos** em `/torre/`.

## Próximos passos
Scoring com distância real + carga; feedback loop; OCR (ainda scaffold).
