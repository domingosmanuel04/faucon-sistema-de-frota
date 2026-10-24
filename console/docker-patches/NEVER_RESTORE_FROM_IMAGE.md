# NUNCA restaurar assets da imagem Docker

Os ficheiros em `console/docker-patches/` são a **fonte da verdade** do Faucon (PT, menu, ícone, CSS).

## Proibido

- `docker cp` / `docker create` + copiar `vendor*.js`, `engine*.js`, `engine-vendor*.js` ou `index.html` a partir de `fleetbase/fleetbase-console:latest` (ou qualquer imagem upstream) para cima destes patches.
- “Consertar” JS corrompido voltando à imagem original.

Isso apaga traduções, remoções de menu e branding. Foi a causa de o inglês e o menu antigo voltarem.

## Se um ficheiro JS partir

1. Correr: `bash console/docker-patches/restore_from_frozen_backup.sh`
2. Ou recuperar de git / `_frozen_backup/` — **nunca** da imagem.
3. Validar: `python3 console/docker-patches/verify_patches.py`
4. Só depois reaplicar traduções com os scripts `*_pt_*.py` **em cima dos patches**.

Há também regra Cursor always-on: `.cursor/rules/faucon-never-restore-image.mdc`.

## Camadas que devem sobreviver sempre

| Camada | Ficheiro | Função |
|--------|----------|--------|
| Runtime | `assets/pt-ui-runtime.js` | PT residual + política de menu |
| CSS | `assets/faucon-overrides.css` + CSS em `index.html` | Esconder widgets/itens |
| Mounts | `docker-compose.override.yml` | Servir sempre os patches |
| Favicon | `favicon/` + `/favicon.ico` | Ícone Makira |
| Docs | `docs/sistema.html` | Página Documentação (menu utilizador) |

Estas camadas não dependem de restaurar a imagem.
