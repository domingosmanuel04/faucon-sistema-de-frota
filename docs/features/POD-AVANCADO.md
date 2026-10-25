# POD avançado (Fase 1.5)

## Objectivo
Prova de entrega com foto, assinatura, OTP/código e checklist; motivos de recusa; bloquear conclusão sem POD.

## Estado
**Implementado (v1.1)** — flag `pod_advanced`.

## API Torre
- `GET /int/v1/control-tower/pod-queue` — inclui `photos[]`, `proof_uuid`, `recipient_name`
- `GET/POST /int/v1/control-tower/pod/{orderUuid}`
- `GET /int/v1/control-tower/pod/{orderUuid}/can-complete`
- `POST /int/v1/control-tower/complete-order`

Completo quando: foto + (assinatura ou OTP), ou recusa com motivo. POD completo cria linha em `proofs`.

## Hook Fleet-Ops nativo
- Internal: `FauconOrderController@updateActivity` / `nextActivity` — bloqueia conclusão se SLA/`pod_required` e `faucon_pod` incompleto; injecta `proof_uuid` automaticamente.
- API v1: `FauconApiOrderController@updateActivity` / `completeOrder` — mesma regra.
- Rotas montadas via `api/docker-patches/fleetops-routes.php`.

`bypass_proof=1` continua a permitir override (auditoria Fleetbase).

## UI
Aba **POD** em `/torre/` — fila com miniaturas, detalhe, gate e conclusão.

## Próximos passos
1. Galeria na ficha Ember da ordem.
2. Captura nativa na app motorista.
3. Remover necessidade de `bypass_proof` em fluxos internos privilegiados com audit log.
