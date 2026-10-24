#!/usr/bin/env python3
"""Apply upstream Fleetbase pt-br YAML + glossary into runtime vendor packs safely."""
from __future__ import annotations

import base64
import hashlib
import json
import re
import sys
from pathlib import Path

import yaml

try:
    sys.stdout.reconfigure(line_buffering=True)
except Exception:
    pass

ROOT = Path(__file__).resolve().parent
ASSETS = ROOT / "assets"
ENGINES = ROOT / "engines-dist" / "@fleetbase"
YAML_DIR = ROOT.parent / "translations"
UPSTREAM = Path("/tmp/fb-i18n")
CACHE = ROOT / "pt_translation_cache.json"

# Import menu strings from apply script if present
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
    ("Current Balance", "Saldo atual"),
    ("Overview", "Visão geral"),
    ("Analytics", "Análises"),
    ("Maintenance", "Manutenção"),
    ("Contacts", "Contactos"),
    ("Vendors", "Fornecedores"),
    ("Schedule", "Agenda"),
    ("Live Map", "Mapa em direto"),
    ("Fuel Reports", "Relatórios de combustível"),
    ("Issues", "Problemas"),
    ("Parts", "Peças"),
    ("Equipment", "Equipamento"),
    ("Sensors", "Sensores"),
    ("Trailers", "Reboques"),
    ("Save changes", "Guardar alterações"),
    ("Save Changes", "Guardar alterações"),
    ("Delete selected...", "Eliminar selecionados..."),
    ("No results found", "Nenhum resultado encontrado"),
    ("Loading...", "A carregar..."),
    ("Search...", "Pesquisar..."),
    ("Create new", "Criar novo"),
    ("Edit", "Editar"),
    ("Delete", "Eliminar"),
    ("Cancel", "Cancelar"),
    ("Confirm", "Confirmar"),
    ("Continue", "Continuar"),
    ("Back", "Voltar"),
    ("Next", "Seguinte"),
    ("Previous", "Anterior"),
    ("Close", "Fechar"),
    ("Done", "Concluído"),
    ("Refresh", "Atualizar"),
    ("Import", "Importar"),
    ("Export", "Exportar"),
    ("Active", "Ativo"),
    ("Inactive", "Inativo"),
    ("Status", "Estado"),
    ("Name", "Nome"),
    ("Type", "Tipo"),
    ("Description", "Descrição"),
    ("Actions", "Ações"),
    ("Details", "Detalhes"),
    ("Amount", "Montante"),
    ("Balance", "Saldo"),
    ("Date", "Data"),
    ("Code", "Código"),
    ("Currency", "Moeda"),
    ("Customer", "Cliente"),
    ("Driver", "Motorista"),
    ("Vehicle", "Veículo"),
    ("Order", "Encomenda"),
    ("Password", "Palavra-passe"),
    ("Phone", "Telefone"),
    ("Address", "Morada"),
    ("City", "Cidade"),
    ("Country", "País"),
    ("Company", "Empresa"),
    ("Organization", "Organização"),
    ("Notifications", "Notificações"),
    ("Profile", "Perfil"),
    ("Account", "Conta"),
    ("Admin", "Administração"),
    ("Help", "Ajuda"),
    ("Home", "Início"),
    ("Welcome", "Bem-vindo"),
    ("Sign in", "Entrar"),
    ("Sign out", "Terminar sessão"),
    ("Remember me", "Lembrar-me"),
    ("Forgot your password?", "Esqueceu a palavra-passe?"),
    ("Create a new Account", "Criar uma nova conta"),
    ("Sign in to your account", "Inicie sessão na sua conta"),
]

GLOSSARY = dict(MENU_STRINGS)


def flatten(d, prefix=""):
    out = {}
    if not isinstance(d, dict):
        return out
    for k, v in d.items():
        p = f"{prefix}.{k}" if prefix else str(k)
        if isinstance(v, dict):
            out.update(flatten(v, p))
        else:
            out[p] = v
    return out


def build_value_map() -> dict[str, str]:
    m = dict(GLOSSARY)
    # cache
    if CACHE.exists():
        for k, v in json.loads(CACHE.read_text()).items():
            if v and v != k:
                m[k] = v
    pairs = [
        ("console-en.yaml", "console-pt.yaml"),
        ("fleetops-en.yaml", "fleetops-pt.yaml"),
        ("storefront-en.yaml", "storefront-pt.yaml"),
        ("iam-en.yaml", "iam-pt.yaml"),
        ("dev-en.yaml", "dev-pt.yaml"),
    ]
    for en_f, pt_f in pairs:
        en_p, pt_p = UPSTREAM / en_f, UPSTREAM / pt_f
        if not en_p.exists() or not pt_p.exists() or pt_p.stat().st_size < 50:
            continue
        en = flatten(yaml.safe_load(en_p.read_text()) or {})
        pt = flatten(yaml.safe_load(pt_p.read_text()) or {})
        n = 0
        for path, ev in en.items():
            if path in pt and isinstance(ev, str) and isinstance(pt[path], str):
                if pt[path] and pt[path] != ev:
                    m[ev] = pt[path]
                    n += 1
        print(f"upstream {en_f}: {n} value mappings")
    # local yaml too
    for locale in ("pt-br.yaml", "pt-pt.yaml"):
        en = flatten(yaml.safe_load((YAML_DIR / "en-us.yaml").read_text()) or {})
        pt = flatten(yaml.safe_load((YAML_DIR / locale).read_text()) or {})
        for path, ev in en.items():
            if path in pt and isinstance(ev, str) and isinstance(pt[path], str) and pt[path] != ev:
                m[ev] = pt[path]
    print("total value map", len(m))
    return m


def extract_pack(js: str, locale: str):
    marker = f'["{locale}",{{'
    start = js.find(marker)
    if start < 0:
        return None, -1, -1
    i = start + len(f'["{locale}",')
    depth = 0
    j = i
    in_str = False
    esc = False
    quote = ""
    while j < len(js):
        ch = js[j]
        if in_str:
            if esc:
                esc = False
            elif ch == "\\":
                esc = True
            elif ch == quote:
                in_str = False
        else:
            if ch in "\"'`":
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
    return js[i:j], i, j


def apply_map_to_pack(pack: str, value_map: dict[str, str]) -> tuple[str, int]:
    n = 0
    for en, pt in sorted(value_map.items(), key=lambda kv: len(kv[0]), reverse=True):
        if not en or en == pt:
            continue
        # escape for safety - only exact quoted values
        for q in ('"', "'"):
            if q in en or q in pt:
                continue
            a, b = f"{q}{en}{q}", f"{q}{pt}{q}"
            c = pack.count(a)
            if c:
                pack = pack.replace(a, b)
                n += c
    return pack, n


def patch_vendor(path: Path, value_map: dict[str, str]) -> int:
    js = path.read_text(encoding="utf-8", errors="surrogateescape")
    pt_s, p0, p1 = extract_pack(js, "pt-br")
    if not pt_s:
        print("no pt-br pack", path)
        return 0
    new_pack, n = apply_map_to_pack(pt_s, value_map)
    if n:
        path.write_text(js[:p0] + new_pack + js[p1:], encoding="utf-8", errors="surrogateescape")
    print(f"{path.name}: {n} replacements in pt-br pack")
    return n


def replace_quoted(content: str, pairs) -> tuple[str, int]:
    total = 0
    for en, pt in sorted(pairs, key=lambda x: len(x[0]), reverse=True):
        if en == pt:
            continue
        for q in ('"', "'"):
            a, b = f"{q}{en}{q}", f"{q}{pt}{q}"
            c = content.count(a)
            if c:
                content = content.replace(a, b)
                total += c
    return content, total


def sha_integrity(data: bytes) -> str:
    return (
        f"sha256-{base64.b64encode(hashlib.sha256(data).digest()).decode()} "
        f"sha512-{base64.b64encode(hashlib.sha512(data).digest()).decode()}"
    )


def patch_console(path: Path):
    c = path.read_text(encoding="utf-8", errors="surrogateescape")
    c = c.replace("disableRuntimeConfig:!0", "disableRuntimeConfig:!1", 1)
    c = c.replace(
        'API:{host:"",namespace:"int/v1"}',
        'API:{host:"http://localhost:8000",namespace:"int/v1"}',
        1,
    )
    c = c.replace(
        'socket:{path:"/socketcluster/",hostname:"",secure:!0,port:"38000"}',
        'socket:{path:"/socketcluster/",hostname:"localhost",secure:!1,port:"38000"}',
        1,
    )
    c = re.sub(
        r'initializeLocale\(\)\{[^}]*setLocale\([^)]*\)\}',
        'initializeLocale(){this.intl.setLocale(["pt-br"])}',
        c,
        count=1,
    )
    c = c.replace('getOption("locale","en-US")', 'getOption("locale","pt-br")')
    c, n = replace_quoted(c, MENU_STRINGS)
    path.write_text(c, encoding="utf-8", errors="surrogateescape")
    print(f"console patched menus={n}")


def sync_local_yaml():
    src = UPSTREAM / "console-pt.yaml"
    if src.exists() and src.stat().st_size > 100:
        for name in ("pt-br.yaml", "pt-pt.yaml"):
            dest = YAML_DIR / name
            # merge: prefer upstream values, keep local extras
            local = flatten(yaml.safe_load(dest.read_text()) or {})
            up = flatten(yaml.safe_load(src.read_text()) or {})
            en = flatten(yaml.safe_load((YAML_DIR / "en-us.yaml").read_text()) or {})
            merged = dict(local)
            for k, v in up.items():
                merged[k] = v
            for k, v in en.items():
                merged.setdefault(k, v)
            # unflatten
            root = {}
            for path, val in merged.items():
                cur = root
                parts = path.split(".")
                for p in parts[:-1]:
                    cur = cur.setdefault(p, {})
                cur[parts[-1]] = val
            dest.write_text(
                yaml.safe_dump(root, allow_unicode=True, sort_keys=False, width=120),
                encoding="utf-8",
            )
            print("synced", name)


def main():
    # restore vendors from image if needed? assume clean or current
    value_map = build_value_map()

    vendor = ASSETS / "vendor-06e3449278af5832aa3f5c4ebf12c1fe.js"
    patch_vendor(vendor, value_map)
    vendor_bytes = vendor.read_bytes()
    vendor_hash = hashlib.sha256(vendor_bytes).hexdigest()

    # patch unique engine-vendors then copy identical
    seen = {vendor_hash: vendor}
    for eng in sorted(ENGINES.iterdir()):
        for f in (eng / "assets").glob("engine-vendor*.js"):
            h = hashlib.sha256(f.read_bytes()).hexdigest()
            if h in seen:
                # if already patched content available for same original hash — re-read after patch
                pass
            # Always apply map (idempotent for already translated values)
            patch_vendor(f, value_map)

    console = ASSETS / "@fleetbase" / "console-2eb4b2507bff82bcbbbfb7fd639c3469.js"
    if console.exists():
        # restore console from? apply on current — if already partially patched OK
        # Re-copy clean console first for runtime patches consistency
        patch_console(console)

    for eng in sorted(ENGINES.iterdir()):
        for f in (eng / "assets").glob("engine-*.js"):
            if f.name.startswith("engine-vendor") or "libphone" in f.name or "socket" in f.name:
                continue
            content = f.read_text(encoding="utf-8", errors="surrogateescape")
            content2, n = replace_quoted(content, MENU_STRINGS)
            if n:
                f.write_text(content2, encoding="utf-8", errors="surrogateescape")
                print(f"UI {eng.name}: {n}")

    sync_local_yaml()

    index = ROOT / "index.html"
    html = index.read_text(encoding="utf-8")
    html = html.replace("pt-pt", "pt-br").replace("Starting up...", "A iniciar...")
    for rel in [
        "assets/vendor-06e3449278af5832aa3f5c4ebf12c1fe.js",
        "assets/@fleetbase/console-2eb4b2507bff82bcbbbfb7fd639c3469.js",
    ]:
        integ = sha_integrity((ROOT / rel).read_bytes())
        html = re.sub(
            rf'(<script src="/{re.escape(rel)}" integrity=")[^"]+(")',
            rf"\g<1>{integ}\2",
            html,
        )
    index.write_text(html, encoding="utf-8")
    print("index/SRI updated")


if __name__ == "__main__":
    main()
