# WhatsApp Business (Fase 4)

## Estado
**Dry-run v1** — flag `whatsapp_business`. Sem envio real até `token` + `phone_number_id`.

## API
- `GET/POST /int/v1/control-tower/whatsapp` — config (token mascarado na resposta pública)
- `POST /int/v1/control-tower/whatsapp/dry-run` — simula template (tracking, atraso, POD)

## UI
Aba **Canais** em `/torre/`.

## Próximos passos
Meta Cloud API; templates aprovados; webhooks de status de entrega.
