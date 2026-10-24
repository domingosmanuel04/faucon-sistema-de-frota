#!/usr/bin/env python3
"""Safely patch Fleetbase console/engine JS for Portuguese menus/UI.

Rules:
- Only exact quoted literals ("..." / '...')
- Never patch engine-vendor / main vendor with short generic words
  (those files hold ember-intl keys; renaming keys breaks lookups)
- Clone pt-br locale pack to pt-pt in vendor bundles only
"""
from __future__ import annotations

import base64
import hashlib
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent
ASSETS = ROOT / "assets"
ENGINES = ROOT / "engines-dist" / "@fleetbase"

# Menu / navigation / panel titles only (specific phrases).
MENU_STRINGS = [
    ("Fleet-Ops Config", "Configuração Fleet-Ops"),
    ("Extensions Registry", "Registo de Extensões"),
    ("AI Config", "Configuração de IA"),
    ("Developers Console", "Consola de Programadores"),
    ("Developers", "Programadores"),
    ("Storefront", "Loja Online"),
    ("Extensions", "Extensões"),
    ("Ledger", "Contabilidade"),
    ("Track Order", "Rastrear Encomenda"),
    ("Company tracking", "Rastreio da empresa"),
    ("Tracking Page", "Página de rastreio"),
    ("Service Rates", "Tarifas de serviço"),
    ("Navigator App", "App Navigator"),
    ("Telematics", "Telemática"),
    ("Inspection", "Inspeção"),
    ("Orchestrator", "Orquestrador"),
    ("Reports", "Relatórios"),
    ("Routing", "Roteamento"),
    ("Vehicles", "Veículos"),
    ("Drivers", "Motoristas"),
    ("Fleets", "Frotas"),
    ("Places", "Locais"),
    ("Devices", "Dispositivos"),
    ("Orders", "Encomendas"),
    ("Radar", "Radar"),
    ("Track", "Rastrear"),
    ("Map", "Mapa"),
    ("Promotions", "Promoções"),
    ("Catalogs", "Catálogos"),
    ("Products", "Produtos"),
    ("Networks", "Redes"),
    ("Customers", "Clientes"),
    ("Policies", "Políticas"),
    ("Groups", "Grupos"),
    ("Roles", "Funções"),
    ("Users", "Utilizadores"),
    ("API Keys", "Chaves API"),
    ("Webhooks", "Webhooks"),
    ("Sockets", "Sockets"),
    ("Events", "Eventos"),
    ("Logs", "Registos"),
    ("Chart of Accounts", "Plano de contas"),
    ("Journal Entries", "Lançamentos contabilísticos"),
    ("Payment Gateways", "Gateways de pagamento"),
    ("General Ledger", "Razão geral"),
    ("Taler Refund", "Reembolso Taler"),
    ("Transactions", "Transações"),
    ("Invoices", "Faturas"),
    ("Invoice", "Fatura"),
    ("Wallets", "Carteiras"),
    ("Pending Publish", "Publicação pendente"),
    ("Awaiting Review", "A aguardar revisão"),
    ("Registry Config", "Configuração do registo"),
    ("Customer Portal", "Portal do Cliente"),
    ("Knowledge Base", "Base de conhecimento"),
    ("Provider Settings", "Definições do fornecedor"),
    ("Task & Chat Logs", "Registos de tarefas e chat"),
    ("Usage Analytics", "Análises de utilização"),
    ("Purchased", "Comprado"),
    ("Installed", "Instalado"),
    ("Explore", "Explorar"),
    ("Dashboard", "Painel"),
    ("Settings", "Definições"),
    ("Starting up...", "A iniciar..."),
]


def replace_quoted(content: str, pairs: list[tuple[str, str]]) -> tuple[str, int]:
    total = 0
    for en, pt in pairs:
        if en == pt:
            continue
        for q in ('"', "'"):
            a, b = f"{q}{en}{q}", f"{q}{pt}{q}"
            n = content.count(a)
            if n:
                content = content.replace(a, b)
                total += n
    return content, total


def clone_locale_pack(content: str, src: str, dst: str) -> tuple[str, int]:
    if f'["{dst}",{{' in content:
        return content, 0
    marker = f'["{src}",{{'
    starts = [m.start() for m in re.finditer(re.escape(marker), content)]
    if not starts:
        return content, 0
    inserted = 0
    for start in reversed(starts):
        i = start + len(f'["{src}",')
        if i >= len(content) or content[i] != "{":
            continue
        depth = 0
        j = i
        in_str = False
        esc = False
        quote = ""
        while j < len(content):
            ch = content[j]
            if in_str:
                if esc:
                    esc = False
                elif ch == "\\":
                    esc = True
                elif ch == quote:
                    in_str = False
            else:
                if ch in ('"', "'"):
                    in_str = True
                    quote = ch
                elif ch == "{":
                    depth += 1
                elif ch == "}":
                    depth -= 1
                    if depth == 0:
                        j += 1
                        break
            j += 1
        else:
            continue
        pack = content[start:j]
        clone = pack.replace(f'["{src}",', f'["{dst}",', 1)
        content = content[:j] + "," + clone + content[j:]
        inserted += 1
    return content, inserted


def sha_integrity(data: bytes) -> str:
    return (
        f"sha256-{base64.b64encode(hashlib.sha256(data).digest()).decode()} "
        f"sha512-{base64.b64encode(hashlib.sha512(data).digest()).decode()}"
    )


def main() -> None:
    pairs = sorted(MENU_STRINGS, key=lambda x: len(x[0]), reverse=True)
    report: list[str] = []

    # 1) Menu patches: console + engine entry JS only (not vendors)
    ui_targets: list[Path] = [
        ASSETS / "@fleetbase" / "console-2eb4b2507bff82bcbbbfb7fd639c3469.js"
    ]
    for eng in sorted(ENGINES.iterdir()):
        assets = eng / "assets"
        if not assets.is_dir():
            continue
        for f in assets.glob("engine-*.js"):
            if f.name.startswith("engine-vendor") or "libphone" in f.name or "socket" in f.name:
                continue
            ui_targets.append(f)

    for path in ui_targets:
        original = path.read_text(encoding="utf-8", errors="surrogateescape")
        content, n = replace_quoted(original, pairs)
        if 'code:"pt-br",label:"Português"' in content and 'code:"pt-pt"' not in content:
            content = content.replace(
                '{code:"pt-br",label:"Português"}',
                '{code:"pt-br",label:"Português"},{code:"pt-pt",label:"Português (Portugal)"}',
            )
        # Local docker console: enable runtime config + API/socket hosts + force locale
        if path.name.startswith("console-"):
            before = content
            content = content.replace("disableRuntimeConfig:!0", "disableRuntimeConfig:!1", 1)
            content = content.replace(
                'API:{host:"",namespace:"int/v1"}',
                'API:{host:"http://localhost:8000",namespace:"int/v1"}',
                1,
            )
            content = content.replace(
                'socket:{path:"/socketcluster/",hostname:"",secure:!0,port:"38000"}',
                'socket:{path:"/socketcluster/",hostname:"localhost",secure:!1,port:"38000"}',
                1,
            )
            content = re.sub(
                r'initializeLocale\(\)\{const e=this\.currentUser\.getOption\("locale","(?:en-US|pt-br)"\)\s*;?\s*this\.intl\.setLocale\(\[e\]\)\}',
                'initializeLocale(){this.intl.setLocale(["pt-br"])}',
                content,
            )
            content = content.replace(
                'getOption("locale","en-US")',
                'getOption("locale","pt-br")',
            )
            if content != before:
                report.append("API/locale patched in console")
        if content != original:
            path.write_text(content, encoding="utf-8", errors="surrogateescape")
            report.append(f"UI {path.relative_to(ROOT)} replacements={n}")
        else:
            report.append(f"-- {path.relative_to(ROOT)}")

    # 2) Do NOT clone locale packs into minified vendor bundles here:
    #    brace-walking insertion previously broke vendor.js parse.
    #    Force the existing registered locale `pt-br` instead.

    # 3) Force locale pt-br in index bootstrap (registered pack)
    index = ROOT / "index.html"
    html = index.read_text(encoding="utf-8")
    html = html.replace("pt-pt", "pt-br")
    # boot loader text
    html = html.replace("Starting up...", "A iniciar...")
    index.write_text(html, encoding="utf-8")
    report.append("OK index.html force locale pt-br")

    # 4) SRI for mounted console + vendor
    html = index.read_text(encoding="utf-8")
    for rel in [
        "assets/vendor-06e3449278af5832aa3f5c4ebf12c1fe.js",
        "assets/@fleetbase/console-2eb4b2507bff82bcbbbfb7fd639c3469.js",
    ]:
        integ = sha_integrity((ROOT / rel).read_bytes())
        fname = "/" + rel
        pattern = re.compile(rf'(<script src="{re.escape(fname)}" integrity=")[^"]+(")')
        html, n = pattern.subn(rf"\g<1>{integ}\2", html)
        report.append(f"SRI {rel} updated={n}")
    index.write_text(html, encoding="utf-8")

    print("\n".join(report))


if __name__ == "__main__":
    main()
