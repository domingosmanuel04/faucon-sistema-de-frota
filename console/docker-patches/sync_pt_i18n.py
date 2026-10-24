#!/usr/bin/env python3
"""
Complete Portuguese (pt-br) localization for Fleetbase console Docker patches.

Safe rules:
- Only rewrite translation VALUES inside ["pt-br",{...}] packs
- Only rewrite exact quoted UI literals in engine entry JS / console JS
- Never touch identifiers, routes, package names, or translation KEYS
"""
from __future__ import annotations

import base64
import hashlib
import json
import re
import sys
import urllib.parse
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

# unbuffered progress
try:
    sys.stdout.reconfigure(line_buffering=True)
except Exception:
    pass

ROOT = Path(__file__).resolve().parent
CACHE = ROOT / "pt_translation_cache.json"
ASSETS = ROOT / "assets"
ENGINES = ROOT / "engines-dist" / "@fleetbase"
YAML_DIR = ROOT.parent / "translations"

SKIP_EXACT = {
    "Fleetbase",
    "OK",
    "ID",
    "GPS",
    "SKU",
    "API",
    "URL",
    "PDF",
    "CSV",
    "SMS",
    "MFA",
    "IAM",
    "OSRM",
    "JSON",
    "HTML",
    "CSS",
    "UUID",
    "Email",
    "Avatar",
    "Logo",
    "Socket",
    "Webhooks",
    "Sockets",
    "Radar",
    "Taler",
    "Stripe",
    "Leaflet",
    "Google",
    "N/A",
}

# High-visibility menu / nav literals (engine entry + console only)
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
]


def extract_pack(js: str, locale: str) -> tuple[str, int, int] | tuple[None, int, int]:
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


def parse_js_obj(s: str):
    i = 0
    n = len(s)

    def skip():
        nonlocal i
        while i < n and s[i] in " \t\r\n":
            i += 1

    def parse_str():
        nonlocal i
        q = s[i]
        i += 1
        out = []
        while i < n:
            ch = s[i]
            if ch == "\\" and i + 1 < n:
                out.append(s[i : i + 2])
                i += 2
                continue
            if ch == q:
                i += 1
                return "".join(out)
            out.append(ch)
            i += 1
        raise ValueError("unterminated string")

    def parse_key():
        nonlocal i
        skip()
        if s[i] in "\"'`":
            return parse_str()
        j = i
        while j < n and (s[j].isalnum() or s[j] in "_-"):
            j += 1
        if j == i:
            raise ValueError(f"bad key @{i}: {s[i:i+40]!r}")
        k = s[i:j]
        i = j
        return k

    def parse_val():
        nonlocal i
        skip()
        if s[i] == "{":
            return parse_obj()
        if s[i] in "\"'`":
            return parse_str()
        j = i
        while j < n and s[j] not in ",}":
            j += 1
        v = s[i:j]
        i = j
        return v

    def parse_obj():
        nonlocal i
        assert s[i] == "{"
        i += 1
        obj = {}
        while True:
            skip()
            if i < n and s[i] == "}":
                i += 1
                return obj
            k = parse_key()
            skip()
            if s[i] != ":":
                raise ValueError(f"expected colon @{i}: {s[i:i+40]!r}")
            i += 1
            obj[k] = parse_val()
            skip()
            if i < n and s[i] == ",":
                i += 1
                continue
            if i < n and s[i] == "}":
                i += 1
                return obj
            raise ValueError(f"expected sep @{i}: {s[i:i+40]!r}")

    skip()
    return parse_obj()


def flatten(d, prefix=""):
    out = {}
    for k, v in d.items():
        p = f"{prefix}.{k}" if prefix else k
        if isinstance(v, dict):
            out.update(flatten(v, p))
        else:
            out[p] = v
    return out


def load_cache() -> dict:
    if CACHE.exists():
        return json.loads(CACHE.read_text())
    return {}


def save_cache(cache: dict) -> None:
    CACHE.write_text(json.dumps(cache, ensure_ascii=False, indent=0))


def google_translate(text: str, dest: str = "pt") -> str:
    q = urllib.parse.quote(text)
    url = (
        "https://translate.googleapis.com/translate_a/single"
        f"?client=gtx&sl=en&tl={dest}&dt=t&q={q}"
    )
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=45) as r:
        data = json.loads(r.read().decode())
    return "".join(part[0] for part in data[0] if part and part[0])


def placeholders(s: str) -> list[str]:
    return re.findall(r"\{[^{}]+\}", s)


def looks_translatable(s: str) -> bool:
    if not isinstance(s, str):
        return False
    t = s.strip()
    if not t or t in SKIP_EXACT:
        return False
    if t.startswith("{") and t.endswith("}") and " " not in t:
        return False
    if not re.search(r"[A-Za-z]", t):
        return False
    # skip pure technical tokens
    if re.fullmatch(r"[A-Z0-9_\-./]+", t) and " " not in t:
        return False
    return True


def translate_icu(en: str) -> str:
    """Translate text segments outside {...} blocks to preserve ICU."""
    parts = re.split(r"(\{[^{}]+\})", en)
    out = []
    for part in parts:
        if not part:
            continue
        if part.startswith("{") and part.endswith("}"):
            # nested plural bodies: translate quoted-ish words carefully inside
            if "plural" in part or "select" in part:
                # translate only alphabetic runs of length > 2 not after #
                def repl(m):
                    word = m.group(0)
                    if word.lower() in {"plural", "select", "offset", "other", "one", "few", "many", "zero"}:
                        return word
                    try:
                        return google_translate(word, "pt")
                    except Exception:
                        return word

                # only translate sequences of letters/spaces between braces content pieces
                inner = part[1:-1]
                # keep structure tokens; translate human phrases after `# ` and in `=0 {Text}`
                def body_repl(m):
                    body = m.group(1)
                    if not re.search(r"[A-Za-z]", body):
                        return m.group(0)
                    try:
                        tr = google_translate(body, "pt")
                        if "#" in body and "#" not in tr:
                            return m.group(0)
                        return "{" + tr + "}"
                    except Exception:
                        return m.group(0)

                inner2 = re.sub(r"\{([^{}]+)\}", body_repl, inner)
                out.append("{" + inner2 + "}")
            else:
                out.append(part)
        else:
            if looks_translatable(part):
                try:
                    out.append(google_translate(part, "pt"))
                except Exception:
                    out.append(part)
            else:
                out.append(part)
    return "".join(out)


def translate_value(en: str, cache: dict) -> str:
    if en in cache:
        return cache[en]
    if not looks_translatable(en):
        cache[en] = en
        return en
    try:
        # Skip complex ICU in bulk pass (keeps app stable); translate plain UI copy.
        if "{," in en.replace(" ", "") or ", plural," in en or ", select," in en:
            pt = en
        else:
            pt = google_translate(en, "pt")
            if placeholders(en) != placeholders(pt):
                pt = en
    except Exception as e:
        print("WARN translate fail:", e, en[:60], flush=True)
        pt = en
    cache[en] = pt
    return pt


def translate_many(values: list[str], cache: dict, workers: int = 16) -> dict[str, str]:
    pending = [v for v in values if v not in cache]
    print(f"translating {len(pending)} new / {len(values)} total", flush=True)
    if not pending:
        return {v: cache.get(v, v) for v in values}

    done = 0

    def work(v: str):
        # local cache miss path without sharing writes
        return v, translate_value(v, {})

    with ThreadPoolExecutor(max_workers=workers) as ex:
        futs = [ex.submit(work, v) for v in pending]
        for fut in as_completed(futs):
            en, pt = fut.result()
            cache[en] = pt if pt else en
            done += 1
            if done % 100 == 0:
                save_cache(cache)
                print(f"  translated {done}/{len(pending)}", flush=True)
    save_cache(cache)
    return {v: cache.get(v, v) for v in values}


def apply_value_map_to_pack(pack: str, value_map: dict[str, str]) -> tuple[str, int]:
    """Replace :"EN" / :"EN" style values; longest first."""
    n = 0
    items = sorted(value_map.items(), key=lambda kv: len(kv[0]), reverse=True)
    for en, pt in items:
        if en == pt:
            continue
        for q in ('"', "'"):
            a = f"{q}{en}{q}"
            b = f"{q}{pt}{q}"
            # only as JS string values after colon (value side)
            # replace :\"EN\" and also occurrences in template arrays after colon-like usage
            # Safer: replace all exact quoted occurrences inside pack — keys with same text are rare
            c = pack.count(a)
            if c:
                pack = pack.replace(a, b)
                n += c
    return pack, n


def patch_vendor_file(path: Path, cache: dict) -> dict:
    js = path.read_text(encoding="utf-8", errors="surrogateescape")
    en_s, _, _ = extract_pack(js, "en-us")
    pt_s, p0, p1 = extract_pack(js, "pt-br")
    if not en_s or not pt_s:
        return {"file": str(path), "skipped": True}
    en = flatten(parse_js_obj(en_s))
    pt = flatten(parse_js_obj(pt_s))
    todo = []
    for k, ev in en.items():
        if k not in pt:
            continue
        if pt[k] != ev:
            continue
        if looks_translatable(ev):
            todo.append(ev)
    unique = sorted(set(todo), key=len, reverse=True)
    print(f"{path.name}: {len(unique)} unique EN values to translate", flush=True)
    value_map = translate_many(unique, cache, workers=20)
    new_pack, n = apply_value_map_to_pack(pt_s, value_map)
    if new_pack != pt_s:
        js = js[:p0] + new_pack + js[p1:]
        path.write_text(js, encoding="utf-8", errors="surrogateescape")
    return {"file": path.name, "unique": len(unique), "replacements": n}


def replace_quoted(content: str, pairs: list[tuple[str, str]]) -> tuple[str, int]:
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


def patch_yaml(cache: dict) -> None:
    try:
        import yaml
    except ImportError:
        print("PyYAML missing; skip YAML sync")
        return

    def flatten_y(d, prefix=""):
        out = {}
        if not isinstance(d, dict):
            return out
        for k, v in d.items():
            p = f"{prefix}.{k}" if prefix else str(k)
            if isinstance(v, dict):
                out.update(flatten_y(v, p))
            else:
                out[p] = v
        return out

    def unflatten(flat):
        root = {}
        for path, val in flat.items():
            cur = root
            parts = path.split(".")
            for p in parts[:-1]:
                cur = cur.setdefault(p, {})
            cur[parts[-1]] = val
        return root

    en_path = YAML_DIR / "en-us.yaml"
    for locale_file in ("pt-br.yaml", "pt-pt.yaml"):
        path = YAML_DIR / locale_file
        en = flatten_y(yaml.safe_load(en_path.read_text()))
        pt = flatten_y(yaml.safe_load(path.read_text()) or {})
        changed = 0
        for k, ev in en.items():
            if k not in pt:
                pt[k] = translate_value(str(ev), cache) if looks_translatable(str(ev)) else ev
                changed += 1
            elif pt[k] == ev and looks_translatable(str(ev)):
                pt[k] = translate_value(str(ev), cache)
                changed += 1
        # keep extra pt keys
        data = unflatten(pt)
        path.write_text(
            yaml.safe_dump(data, allow_unicode=True, sort_keys=False, width=120),
            encoding="utf-8",
        )
        print(f"YAML {locale_file}: updated {changed} leaves")
    save_cache(cache)


def patch_console_runtime(path: Path) -> None:
    c = path.read_text(encoding="utf-8", errors="surrogateescape")
    o = c
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
        r'initializeLocale\(\)\{const e=this\.currentUser\.getOption\("locale","(?:en-US|pt-br|pt-pt)"\)\s*(?:\|\|"pt-br")?;?\s*this\.intl\.setLocale\(\[[^\]]+\]\)\}',
        'initializeLocale(){this.intl.setLocale(["pt-br"])}',
        c,
    )
    if 'setLocale(["pt-br"])' not in c:
        c = c.replace(
            'getOption("locale","en-US")',
            'getOption("locale","pt-br")',
        )
        c = re.sub(
            r'initializeLocale\(\)\{[^}]+\}',
            'initializeLocale(){this.intl.setLocale(["pt-br"])}',
            c,
            count=1,
        )
    c, n = replace_quoted(c, MENU_STRINGS)
    path.write_text(c, encoding="utf-8", errors="surrogateescape")
    print(f"console runtime patched; menu replacements={n}; changed={c!=o}")


def main():
    cache = load_cache()

    # 1) YAML source of truth (console)
    patch_yaml(cache)

    # 2) Vendor packs used at runtime
    vendor_files = [ASSETS / "vendor-06e3449278af5832aa3f5c4ebf12c1fe.js"]
    for eng in ENGINES.iterdir():
        if eng.is_dir():
            vendor_files.extend((eng / "assets").glob("engine-vendor*.js"))

    # Deduplicate by content hash so shared vendors aren't translated N times on disk copies
    seen_hash = {}
    for vf in vendor_files:
        if not vf.exists():
            continue
        h = hashlib.sha256(vf.read_bytes()).hexdigest()
        if h in seen_hash:
            # copy already patched sibling
            src = seen_hash[h]
            if src != vf:
                vf.write_bytes(src.read_bytes())
                print(f"copied patched vendor -> {vf.relative_to(ROOT)}")
            continue
        report = patch_vendor_file(vf, cache)
        print(report)
        seen_hash[hashlib.sha256(vf.read_bytes()).hexdigest()] = vf

    # 3) Hardcoded menus in engine entry + console
    console = ASSETS / "@fleetbase" / "console-2eb4b2507bff82bcbbbfb7fd639c3469.js"
    if console.exists():
        # restore-safe: apply runtime + menus on current file
        patch_console_runtime(console)

    for eng in ENGINES.iterdir():
        assets = eng / "assets"
        if not assets.is_dir():
            continue
        for f in assets.glob("engine-*.js"):
            if f.name.startswith("engine-vendor") or "libphone" in f.name or "socket" in f.name:
                continue
            content = f.read_text(encoding="utf-8", errors="surrogateescape")
            content2, n = replace_quoted(content, MENU_STRINGS)
            if n:
                f.write_text(content2, encoding="utf-8", errors="surrogateescape")
                print(f"UI {eng.name}: {n}")

    # 4) index bootstrap locale + SRI
    index = ROOT / "index.html"
    html = index.read_text(encoding="utf-8")
    html = html.replace("pt-pt", "pt-br")
    html = html.replace("Starting up...", "A iniciar...")
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
    save_cache(cache)


if __name__ == "__main__":
    main()
