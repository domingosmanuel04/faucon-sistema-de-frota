#!/usr/bin/env bash
# Restore critical Faucon patches from local frozen backup — NEVER from Docker image.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
BACKUP="$ROOT/_frozen_backup"

if [[ ! -d "$BACKUP" ]]; then
  echo "ERROR: missing $BACKUP" >&2
  exit 1
fi

echo "Restoring from local frozen backup (NOT from Docker image)..."
while IFS= read -r -d '' file; do
  rel="${file#$BACKUP/}"
  [[ "$rel" == "MANIFEST.json" ]] && continue
  dest="$ROOT/$rel"
  mkdir -p "$(dirname "$dest")"
  cp -a "$file" "$dest"
  echo "  restored $rel"
done < <(find "$BACKUP" -type f -print0)

python3 "$ROOT/verify_patches.py"
echo "Done. Recreate console if needed: docker compose up -d --force-recreate console"
