#!/usr/bin/env python3
"""Translate remaining EN leftovers in pt-br packs + hardcoded engine UI strings."""
from __future__ import annotations

import importlib.util
import json
import re
import sys
import time
import urllib.parse
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

try:
    sys.stdout.reconfigure(line_buffering=True)
except Exception:
    pass

ROOT = Path(__file__).resolve().parent
ASSETS = ROOT / "assets"
ENGINES = ROOT / "engines-dist" / "@fleetbase"

spec = importlib.util.spec_from_file_location("cont", ROOT / "continue_pt_i18n.py")
cont = importlib.util.module_from_spec(spec)
spec.loader.exec_module(cont)

# High-visibility hardcoded UI (exact quoted replacements in engine/console JS)
HARDCODED = [
    ("Create, send, and manage customer invoices.", "Crie, envie e gerencie faturas de clientes."),
    ("Manage driver, customer, and company wallets and balances.", "Gerencie carteiras e saldos de motoristas, clientes e empresas."),
    ("View and manage the full chart of accounts.", "Veja e gerencie o plano de contas completo."),
    ("Legacy invoice counts widget. Replaced by Invoice Pipeline.", "Widget legado de contagem de faturas. Substituído pelo Pipeline de Faturas."),
    ("Invoice Summary", "Resumo de faturas"),
    ("Order volume for the current period with trend.", "Volume de encomendas do período atual com tendência."),
    ("New and returning customer mix.", "Mistura de clientes novos e recorrentes."),
    ("Manage your product catalogue, categories, and inventory.", "Gerencie o catálogo de produtos, categorias e inventário."),
    ("View and fulfil incoming storefront orders.", "Veja e cumpra as encomendas recebidas da loja online."),
    ("Create push notifications and promotional campaigns.", "Crie notificações push e campanhas promocionais."),
    ("Manage console user accounts and their access levels.", "Gerencie contas de utilizadores da consola e níveis de acesso."),
    ("Create fine-grained access control policies for resources.", "Crie políticas de controlo de acesso detalhadas para recursos."),
    ("Create, dispatch, and track delivery orders in real time.", "Crie, despache e acompanhe encomendas de entrega em tempo real."),
    ("Manage saved locations, addresses, and points of interest.", "Gerencie locais, moradas e pontos de interesse guardados."),
    ("Manage driver profiles, assignments, and live locations.", "Gerencie perfis, atribuições e localizações em direto dos motoristas."),
    ("View and manage your vehicle fleet and telematics.", "Veja e gerencie a frota de veículos e a telemática."),
    ("Manage connected telematics devices and their sensor data.", "Gerencie dispositivos telemáticos ligados e dados dos sensores."),
    ("Manage company, customer, and driver wallets.", "Gerencie carteiras da empresa, clientes e motoristas."),
    ("Edit Settings", "Editar definições"),
    ("View organization", "Ver organização"),
    ("Edit Organization", "Editar organização"),
    ("New Place", "Novo local"),
    ("Edit Place", "Editar local"),
    ("View event", "Ver evento"),
    ("Order Type", "Tipo de encomenda"),
    ("Customer Name", "Nome do cliente"),
    ("Customer Email", "Email do cliente"),
    ("Customer Phone", "Telefone do cliente"),
    ("Send Work Order to Vendor", "Enviar ordem de trabalho ao fornecedor"),
    ("Fuel Report", "Relatório de combustível"),
    ("Match to Vehicle", "Associar ao veículo"),
    ("Match to Order", "Associar à encomenda"),
    ("Create new Layer", "Criar nova camada"),
    ("Confirm & Save", "Confirmar e guardar"),
    ("Create Test Order", "Criar encomenda de teste"),
    ("Delete Journal Entry?", "Eliminar lançamento contabilístico?"),
    ("Invoice Templates", "Modelos de fatura"),
    ("Notification channels", "Canais de notificação"),
    ("Reusable Schedule Templates", "Modelos de agenda reutilizáveis"),
    ("What happens to the payment", "O que acontece ao pagamento"),
    ("Daily Driving Limit (Hours)", "Limite diário de condução (horas)"),
    ("Instructions for the driver", "Instruções para o motorista"),
    ("What the customer asked for", "O que o cliente pediu"),
    ("Time off request submitted.", "Pedido de folga enviado."),
    ("Shift created successfully.", "Turno criado com sucesso."),
    ("Shift updated successfully.", "Turno atualizado com sucesso."),
    ("Auto-accept incoming orders", "Aceitar automaticamente encomendas recebidas"),
    ("No route details available.", "Sem detalhes de rota disponíveis."),
    ("Add product from storefront", "Adicionar produto da loja online"),
    ("Your stores in this network", "As suas lojas nesta rede"),
    ("Enable minimum order amount", "Ativar valor mínimo de encomenda"),
    ("Orchestrator settings saved.", "Definições do orquestrador guardadas."),
    ("Top event types and sources", "Principais tipos e fontes de eventos"),
    ("This section has no checks.", "Esta secção não tem verificações."),
    ("No options in this variant.", "Sem opções nesta variante."),
    ("Accepted: .csv, .xlsx, .xls", "Aceite: .csv, .xlsx, .xls"),
    ("Online · no catalog in hours", "Online · sem catálogo nestas horas"),
]

# Remaining pack values - curated high value
PACK_EXTRA = {
    "ETA {time}": "ETA {time}",
    "{value} min": "{value} min",
    "{count} min": "{count} min",
    "Item {index}": "Item {index}",
    "{name}: {content}": "{name}: {content}",
    "Remove {language}": "Remover {language}",
    "Refunded {amount}": "Reembolsado {amount}",
    'Signed as "{name}"': 'Sessão como "{name}"',
    "Choose a {variant}.": "Escolha um {variant}.",
    "last online {ago} ago": "última vez online há {ago}",
    "Order moved to “{step}”": "Encomenda movida para “{step}”",
    "{hours} h {minutes} min": "{hours} h {minutes} min",
    "Minimum order {amount} met": "Valor mínimo de encomenda {amount} atingido",
    "· {amount} paid by {method}": "· {amount} pago por {method}",
    "Move the order to “{step}”?": "Mover a encomenda para “{step}”?",
    "Was due {time} · {late} late": "Vencia {time} · {late} de atraso",
    "{offered} of {total} offered": "{offered} de {total} oferecidos",
    "delivery fee unchanged {fee}": "taxa de entrega inalterada {fee}",
    "pending, {declined} declined": "pendente, {declined} recusado(s)",
    "Acknowledged by {name} {time}": "Confirmado por {name} {time}",
    "Error": "Erro",
    "Create": "Criar",
    "Product": "Produto",
    "Item": "Item",
    "Total": "Total",
    "Menu": "Menu",
    "Hours": "Horas",
    "Media": "Multimédia",
    "About": "Sobre",
    "Audit": "Auditoria",
    "Cargo": "Carga",
    "Tags": "Etiquetas",
    "Text": "Texto",
    "Sold": "Vendido",
    "Pass": "Passou",
    "Fail": "Falhou",
    "Held": "Retido",
    "When": "Quando",
    "What": "O quê",
    "Host": "Anfitrião",
    "Payee": "Beneficiário",
    "ended": "terminado",
    "Ended": "Terminado",
    "stops": "paragens",
    "Radar": "Radar",
    "Modal": "Modal",
}


def mymemory(text: str) -> str:
    q = urllib.parse.quote(text[:450])
    url = f"https://api.mymemory.translated.net/get?q={q}&langpair=en|pt"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=40) as r:
        data = json.loads(r.read().decode())
    if int(data.get("responseStatus") or 0) != 200:
        raise RuntimeError(str(data.get("responseDetails") or data))
    return data["responseData"]["translatedText"]


def placeholders(s: str):
    return re.findall(r"\{[^{}]+\}", s)


def replace_quoted(content: str, pairs: list[tuple[str, str]]) -> tuple[str, int]:
    n = 0
    for en, pt in sorted(pairs, key=lambda x: len(x[0]), reverse=True):
        if en == pt:
            continue
        for q in ('"', "'"):
            a, b = f"{q}{en}{q}", f"{q}{pt}{q}"
            c = content.count(a)
            if c:
                content = content.replace(a, b)
                n += c
    return content, n


def main():
    cache = cont.load_cache()
    cache.update(PACK_EXTRA)

    vendor = ASSETS / "vendor-06e3449278af5832aa3f5c4ebf12c1fe.js"
    left = cont.remaining(vendor)
    multi = [s for s in left if " " in s and s not in cache]
    print(f"pack remaining multi: {len(multi)}", flush=True)

    # Translate remaining multiword via MyMemory (up to 350)
    todo = sorted(multi, key=len)[:350]
    ok = fail = 0

    def work(s):
        time.sleep(0.25)
        try:
            pt = mymemory(s)
            if placeholders(s) != placeholders(pt):
                return s, None
            return s, pt
        except Exception:
            return s, None

    if todo:
        print(f"API {len(todo)}...", flush=True)
        with ThreadPoolExecutor(max_workers=3) as ex:
            futs = [ex.submit(work, s) for s in todo]
            for i, fut in enumerate(as_completed(futs), 1):
                en, pt = fut.result()
                if pt and pt != en:
                    cache[en] = pt
                    ok += 1
                else:
                    fail += 1
                if i % 25 == 0:
                    cont.save_cache(cache)
                    print(f"  {i}/{len(todo)} ok={ok} fail={fail}", flush=True)
        print(f"api ok={ok} fail={fail}", flush=True)

    cont.save_cache(cache)
    cont.apply_cache(cache)

    # Hardcoded engine/console strings
    targets = [ASSETS / "@fleetbase" / "console-2eb4b2507bff82bcbbbfb7fd639c3469.js"]
    for eng in ENGINES.iterdir():
        for f in (eng / "assets").glob("engine-*.js"):
            if f.name.startswith("engine-vendor") or "libphone" in f.name or "socket" in f.name:
                continue
            targets.append(f)

    # Ensure console locale/API still intact after any re-copy (shouldn't re-copy here)
    for path in targets:
        c = path.read_text(encoding="utf-8", errors="surrogateescape")
        c2, n = replace_quoted(c, HARDCODED)
        if path.name.startswith("console-"):
            if 'setLocale(["pt-br"])' not in c2:
                c2 = re.sub(
                    r'initializeLocale\(\)\{[^}]*\}',
                    'initializeLocale(){this.intl.setLocale(["pt-br"])}',
                    c2,
                    count=1,
                )
            if "localhost:8000" not in c2:
                c2 = c2.replace(
                    'API:{host:"",namespace:"int/v1"}',
                    'API:{host:"http://localhost:8000",namespace:"int/v1"}',
                    1,
                )
                c2 = c2.replace("disableRuntimeConfig:!0", "disableRuntimeConfig:!1", 1)
        if c2 != c:
            path.write_text(c2, encoding="utf-8", errors="surrogateescape")
            print(f"UI {path.parent.parent.name if 'engines' in str(path) else 'console'}: {n}", flush=True)

    cont.update_sri()
    left2 = cont.remaining(vendor)
    print(f"FINAL remaining non-ICU: {len(left2)} multi={sum(1 for s in left2 if ' ' in s)}", flush=True)


if __name__ == "__main__":
    main()
