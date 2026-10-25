# Observabilidade + plataforma

## Estado
Health, Sentry env, webhooks retry queue stub, environments, OCR/RBAC/corredores/marketplace/what-if stubs.

## Endpoints
- `GET control-tower/health`
- `GET control-tower/environments`
- `GET control-tower/webhooks/retry-status`
- `POST control-tower/webhooks/retry-enqueue`
- `POST control-tower/ocr/extract`
- `GET|POST control-tower/rbac/zones`
- `GET control-tower/corridors`
- `GET control-tower/marketplace`
- `GET|POST control-tower/what-if`

## Compose
Ver `docker-compose.override.yml.example`. Variáveis `SENTRY_*` opcionais.
