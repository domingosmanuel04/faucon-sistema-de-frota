#!/usr/bin/env python3
"""Verify Faucon docker-patches were not overwritten by the stock Fleetbase image.

Exit 0 = OK. Exit 1 = drift / forbidden stock markers. Exit 2 = missing files.
"""
from __future__ import annotations

import hashlib
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
BACKUP = ROOT / "_frozen_backup"
MANIFEST = BACKUP / "MANIFEST.json"

# Stock Fleetbase markers that must NOT reappear in the main vendor user-menu.
FORBIDDEN_IN_VENDOR = [
    "show-keyboard-shortcuts-user-nav-item",
    "changelog-user-nav-item",
    "Join Discord Community",
    "Fleetbase Documentation",
    'text:"Developers"})\nconst i=[{id:"discord"',
]

REQUIRED_IN_VENDOR = [
    "wa.me/244945400126",
    "Ver perfil",
    "Ajuda e suporte",
    '["pt-br","en-us","fr-fr"]',
]

REQUIRED_FILES = [
    "assets/vendor-06e3449278af5832aa3f5c4ebf12c1fe.js",
    "assets/pt-ui-runtime.js",
    "assets/faucon-overrides.css",
    "index.html",
    "favicon/favicon.ico",
]


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def main() -> int:
    errors: list[str] = []
    warnings: list[str] = []

    for rel in REQUIRED_FILES:
        p = ROOT / rel
        if not p.exists():
            errors.append(f"MISSING {rel}")

    vendor = ROOT / "assets/vendor-06e3449278af5832aa3f5c4ebf12c1fe.js"
    if vendor.exists():
        text = vendor.read_text(errors="ignore")
        for needle in FORBIDDEN_IN_VENDOR:
            if needle in text:
                errors.append(f"STOCK MARKER in vendor: {needle!r}")
        for needle in REQUIRED_IN_VENDOR:
            if needle not in text:
                errors.append(f"REQUIRED missing in vendor: {needle!r}")

    runtime = ROOT / "assets/pt-ui-runtime.js"
    if runtime.exists() and "FAUCON_UI_POLICY_V1" not in runtime.read_text(errors="ignore"):
        errors.append("pt-ui-runtime.js missing FAUCON_UI_POLICY_V1")

    if MANIFEST.exists():
        meta = json.loads(MANIFEST.read_text())
        for rel, info in meta.get("files", {}).items():
            p = ROOT / rel
            b = BACKUP / rel
            if not p.exists():
                errors.append(f"MISSING vs backup: {rel}")
                continue
            current = sha256(p)
            frozen = info.get("sha256")
            if frozen and current != frozen:
                warnings.append(f"CHANGED since freeze (ok if intentional): {rel}")
            if b.exists() and sha256(b) != frozen:
                warnings.append(f"backup file drift: {rel}")
    else:
        warnings.append("no _frozen_backup/MANIFEST.json yet")

    for w in warnings:
        print(f"WARN: {w}")
    if errors:
        for e in errors:
            print(f"ERROR: {e}")
        print("\nDo NOT restore from fleetbase-console image.")
        print("Recover from console/docker-patches/_frozen_backup/ instead.")
        return 1

    print("OK: Faucon patches look intact (menu/WhatsApp/locales/runtime policy).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
