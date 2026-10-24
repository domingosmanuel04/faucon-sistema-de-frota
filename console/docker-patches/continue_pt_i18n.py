#!/usr/bin/env python3
"""Finish remaining PT values using offline glossary + MyMemory for long phrases."""
from __future__ import annotations

import base64
import hashlib
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
CACHE = ROOT / "pt_translation_cache.json"
ASSETS = ROOT / "assets"
ENGINES = ROOT / "engines-dist" / "@fleetbase"

WORD = {
    "Created": "Criado",
    "Updated": "Atualizado",
    "Deleted": "Eliminado",
    "Started": "Iniciado",
    "Completed": "Concluído",
    "Scheduled": "Agendado",
    "Assigned": "Atribuído",
    "Performed": "Realizado",
    "Issued": "Emitido",
    "Failed": "Falhou",
    "Pending": "Pendente",
    "Active": "Ativo",
    "Inactive": "Inativo",
    "Enabled": "Ativado",
    "Disabled": "Desativado",
    "Online": "Online",
    "Offline": "Offline",
    "Available": "Disponível",
    "Unavailable": "Indisponível",
    "Required": "Obrigatório",
    "Optional": "Opcional",
    "Default": "Predefinido",
    "Custom": "Personalizado",
    "General": "Geral",
    "Advanced": "Avançado",
    "Basic": "Básico",
    "New": "Novo",
    "Edit": "Editar",
    "Delete": "Eliminar",
    "Remove": "Remover",
    "Add": "Adicionar",
    "Create": "Criar",
    "Save": "Guardar",
    "Update": "Atualizar",
    "Cancel": "Cancelar",
    "Confirm": "Confirmar",
    "Continue": "Continuar",
    "Back": "Voltar",
    "Next": "Seguinte",
    "Previous": "Anterior",
    "Close": "Fechar",
    "Done": "Concluído",
    "Open": "Abrir",
    "View": "Ver",
    "Show": "Mostrar",
    "Hide": "Ocultar",
    "Search": "Pesquisar",
    "Filter": "Filtrar",
    "Filters": "Filtros",
    "Export": "Exportar",
    "Import": "Importar",
    "Download": "Descarregar",
    "Upload": "Carregar",
    "Print": "Imprimir",
    "Refresh": "Atualizar",
    "Reset": "Repor",
    "Clear": "Limpar",
    "Apply": "Aplicar",
    "Select": "Selecionar",
    "Selected": "Selecionado",
    "All": "Todos",
    "None": "Nenhum",
    "Other": "Outro",
    "Unknown": "Desconhecido",
    "Yes": "Sim",
    "No": "Não",
    "On": "Ligado",
    "Off": "Desligado",
    "Name": "Nome",
    "Type": "Tipo",
    "Status": "Estado",
    "State": "Estado",
    "Description": "Descrição",
    "Details": "Detalhes",
    "Actions": "Ações",
    "Action": "Ação",
    "Options": "Opções",
    "Settings": "Definições",
    "Configuration": "Configuração",
    "Preferences": "Preferências",
    "Profile": "Perfil",
    "Account": "Conta",
    "Accounts": "Contas",
    "User": "Utilizador",
    "Users": "Utilizadores",
    "Role": "Função",
    "Roles": "Funções",
    "Group": "Grupo",
    "Groups": "Grupos",
    "Policy": "Política",
    "Policies": "Políticas",
    "Permission": "Permissão",
    "Permissions": "Permissões",
    "Invite": "Convite",
    "Invites": "Convites",
    "Member": "Membro",
    "Members": "Membros",
    "Owner": "Proprietário",
    "Admin": "Administração",
    "Manager": "Gestor",
    "Operator": "Operador",
    "Driver": "Motorista",
    "Drivers": "Motoristas",
    "Vehicle": "Veículo",
    "Vehicles": "Veículos",
    "Fleet": "Frota",
    "Fleets": "Frotas",
    "Order": "Encomenda",
    "Orders": "Encomendas",
    "Customer": "Cliente",
    "Customers": "Clientes",
    "Vendor": "Fornecedor",
    "Vendors": "Fornecedores",
    "Contact": "Contacto",
    "Contacts": "Contactos",
    "Place": "Local",
    "Places": "Locais",
    "Location": "Localização",
    "Address": "Morada",
    "City": "Cidade",
    "Country": "País",
    "Company": "Empresa",
    "Organization": "Organização",
    "Phone": "Telefone",
    "Email": "Email",
    "Password": "Palavra-passe",
    "Code": "Código",
    "Date": "Data",
    "Time": "Hora",
    "Amount": "Montante",
    "Balance": "Saldo",
    "Price": "Preço",
    "Total": "Total",
    "Subtotal": "Subtotal",
    "Tax": "Imposto",
    "Discount": "Desconto",
    "Quantity": "Quantidade",
    "Unit": "Unidade",
    "Currency": "Moeda",
    "Payment": "Pagamento",
    "Payments": "Pagamentos",
    "Invoice": "Fatura",
    "Invoices": "Faturas",
    "Transaction": "Transação",
    "Transactions": "Transações",
    "Wallet": "Carteira",
    "Wallets": "Carteiras",
    "Refund": "Reembolso",
    "Gateway": "Gateway",
    "Product": "Produto",
    "Products": "Produtos",
    "Category": "Categoria",
    "Categories": "Categorias",
    "Catalog": "Catálogo",
    "Catalogs": "Catálogos",
    "Store": "Loja",
    "Stores": "Lojas",
    "Network": "Rede",
    "Networks": "Redes",
    "Promotion": "Promoção",
    "Promotions": "Promoções",
    "Report": "Relatório",
    "Reports": "Relatórios",
    "Device": "Dispositivo",
    "Devices": "Dispositivos",
    "Sensor": "Sensor",
    "Sensors": "Sensores",
    "Trailer": "Reboque",
    "Trailers": "Reboques",
    "Equipment": "Equipamento",
    "Part": "Peça",
    "Parts": "Peças",
    "Issue": "Problema",
    "Issues": "Problemas",
    "Maintenance": "Manutenção",
    "Inspection": "Inspeção",
    "Route": "Rota",
    "Routes": "Rotas",
    "Trip": "Viagem",
    "Trips": "Viagens",
    "Waypoint": "Ponto de passagem",
    "Waypoints": "Pontos de passagem",
    "Pickup": "Recolha",
    "Dropoff": "Entrega",
    "Delivery": "Entrega",
    "Origin": "Origem",
    "Destination": "Destino",
    "Distance": "Distância",
    "Duration": "Duração",
    "Speed": "Velocidade",
    "Heading": "Direção",
    "Latitude": "Latitude",
    "Longitude": "Longitude",
    "Coordinates": "Coordenadas",
    "Notes": "Notas",
    "Note": "Nota",
    "Message": "Mensagem",
    "Messages": "Mensagens",
    "Comment": "Comentário",
    "Comments": "Comentários",
    "History": "Histórico",
    "Activity": "Atividade",
    "Timeline": "Cronologia",
    "Attachment": "Anexo",
    "Attachments": "Anexos",
    "Notification": "Notificação",
    "Notifications": "Notificações",
    "Event": "Evento",
    "Events": "Eventos",
    "Log": "Registo",
    "Logs": "Registos",
    "Webhook": "Webhook",
    "Webhooks": "Webhooks",
    "Extension": "Extensão",
    "Extensions": "Extensões",
    "Developer": "Programador",
    "Developers": "Programadores",
    "Dashboard": "Painel",
    "Overview": "Visão geral",
    "Analytics": "Análises",
    "Metrics": "Métricas",
    "Metric": "Métrica",
    "Widget": "Widget",
    "Widgets": "Widgets",
    "Map": "Mapa",
    "Tracking": "Rastreio",
    "Track": "Rastrear",
    "Schedule": "Agenda",
    "Scheduler": "Agendador",
    "Service": "Serviço",
    "Services": "Serviços",
    "Rate": "Tarifa",
    "Rates": "Tarifas",
    "Quote": "Cotação",
    "Quotes": "Cotações",
    "Area": "Área",
    "Zones": "Zonas",
    "Zone": "Zona",
    "Provider": "Fornecedor",
    "Providers": "Fornecedores",
    "Credentials": "Credenciais",
    "Credential": "Credencial",
    "Token": "Token",
    "Key": "Chave",
    "Keys": "Chaves",
    "Secret": "Segredo",
    "Value": "Valor",
    "Values": "Valores",
    "Field": "Campo",
    "Fields": "Campos",
    "Column": "Coluna",
    "Columns": "Colunas",
    "Row": "Linha",
    "Rows": "Linhas",
    "Page": "Página",
    "Pages": "Páginas",
    "Title": "Título",
    "Subtitle": "Subtítulo",
    "Label": "Etiqueta",
    "Labels": "Etiquetas",
    "Icon": "Ícone",
    "Image": "Imagem",
    "Images": "Imagens",
    "File": "Ficheiro",
    "Files": "Ficheiros",
    "Folder": "Pasta",
    "Size": "Tamanho",
    "Format": "Formato",
    "Language": "Idioma",
    "Timezone": "Fuso horário",
    "Locale": "Localidade",
    "Theme": "Tema",
    "Dark": "Escuro",
    "Light": "Claro",
    "Mode": "Modo",
    "Success": "Sucesso",
    "Error": "Erro",
    "Warning": "Aviso",
    "Info": "Informação",
    "Critical": "Crítico",
    "High": "Alto",
    "Medium": "Médio",
    "Low": "Baixo",
    "Severity": "Gravidade",
    "Processed": "Processado",
    "Unprocessed": "Não processado",
    "Connected": "Ligado",
    "Disconnected": "Desligado",
    "Connection": "Ligação",
    "Sync": "Sincronizar",
    "Synced": "Sincronizado",
    "Last": "Último",
    "First": "Primeiro",
    "After": "Depois",
    "Before": "Antes",
    "From": "De",
    "To": "Para",
    "By": "Por",
    "At": "Em",
    "Of": "De",
    "For": "Para",
    "With": "Com",
    "Without": "Sem",
    "And": "E",
    "Or": "Ou",
    "Number": "Número",
    "Serial": "Série",
    "License": "Licença",
    "Plate": "Matrícula",
    "Model": "Modelo",
    "Make": "Marca",
    "Year": "Ano",
    "Color": "Cor",
    "Colour": "Cor",
    "Weight": "Peso",
    "Height": "Altura",
    "Width": "Largura",
    "Length": "Comprimento",
    "Capacity": "Capacidade",
    "Method": "Método",
    "Reason": "Motivo",
    "Failure": "Falha",
    "Due": "Vencimento",
    "Net": "Líquido",
    "Gross": "Bruto",
    "Credit": "Crédito",
    "Debit": "Débito",
    "Hand": "Mão",
    "Reading": "Leitura",
    "Seen": "Visto",
    "Birth": "Nascimento",
    "Full": "Completo",
    "Display": "Apresentação",
    "Postal": "Postal",
    "Street": "Rua",
    "Changes": "Alterações",
    "Change": "Alteração",
    "Selected": "Selecionado",
    "Loading": "A carregar",
    "Empty": "Vazio",
    "Results": "Resultados",
    "Found": "Encontrado",
    "Not": "Não",
    "Something": "Algo",
    "Went": "correu",
    "Wrong": "mal",
    "Try": "Tentar",
    "Again": "Novamente",
    "Are": "Tem",
    "You": "você",
    "Sure": "certeza",
    "Help": "Ajuda",
    "Home": "Início",
    "Welcome": "Bem-vindo",
    "Sign": "Iniciar",
    "Out": "sessão",
    "In": "sessão",
    "Remember": "Lembrar",
    "Me": "me",
    "Forgot": "Esqueceu",
    "Your": "sua",
    "Create": "Criar",
    "a": "um",
    "the": "o",
    "new": "novo",
    "Account": "Conta",
}

PHRASES = {
    "Created At": "Criado em",
    "Updated At": "Atualizado em",
    "Deleted At": "Eliminado em",
    "Started At": "Iniciado em",
    "Completed At": "Concluído em",
    "Scheduled At": "Agendado para",
    "Assigned To": "Atribuído a",
    "Created By": "Criado por",
    "Updated By": "Atualizado por",
    "Performed By": "Realizado por",
    "Issued At": "Emitido em",
    "Due At": "Vencimento em",
    "Due Date": "Data de vencimento",
    "Invoice Date": "Data da fatura",
    "Balance After": "Saldo depois",
    "Credit Account": "Conta a crédito",
    "Debit Account": "Conta a débito",
    "Failure Reason": "Motivo da falha",
    "Net Amount": "Montante líquido",
    "Next Due": "Próximo vencimento",
    "Part Number": "Número da peça",
    "Payment Method": "Método de pagamento",
    "Quantity on Hand": "Quantidade em stock",
    "Last Seen": "Última vez visto",
    "Last Reading": "Última leitura",
    "Serial Number": "Número de série",
    "License Plate": "Matrícula",
    "Phone Number": "Número de telefone",
    "Email Address": "Endereço de email",
    "Postal Code": "Código postal",
    "Street Address": "Morada",
    "First Name": "Nome",
    "Last Name": "Apelido",
    "Full Name": "Nome completo",
    "Display Name": "Nome a apresentar",
    "Date of Birth": "Data de nascimento",
    "Save changes": "Guardar alterações",
    "Save Changes": "Guardar alterações",
    "Delete selected": "Eliminar selecionados",
    "Delete selected...": "Eliminar selecionados...",
    "No results found": "Nenhum resultado encontrado",
    "Something went wrong": "Algo correu mal",
    "Are you sure?": "Tem a certeza?",
    "Try again": "Tentar novamente",
    "View details": "Ver detalhes",
    "View Details": "Ver detalhes",
    "Back to Console": "Voltar à consola",
    "Loading...": "A carregar...",
    "Search...": "Pesquisar...",
    "No data": "Sem dados",
    "No data available": "Sem dados disponíveis",
}

UNITS = {"kg", "m", "ft", "nm", "m³", "°C", "°F", "km", "mi", "lb", "g", "cm", "mm", "h", "min", "sec", "ms"}
SKIP = {"Fleetbase", "OK", "ID", "GPS", "SKU", "API", "URL", "PDF", "CSV", "SMS", "MFA", "IAM", "OSRM", "JSON", "HTML", "CSS", "UUID", "N/A", "ETA", "PIN", "OTP"}


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
        raise ValueError("ustr")

    def parse_key():
        nonlocal i
        skip()
        if s[i] in "\"'`":
            return parse_str()
        j = i
        while j < n and (s[j].isalnum() or s[j] in "_-"):
            j += 1
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
        i += 1
        obj = {}
        while True:
            skip()
            if s[i] == "}":
                i += 1
                return obj
            k = parse_key()
            skip()
            i += 1
            obj[k] = parse_val()
            skip()
            if s[i] == ",":
                i += 1
                continue
            if s[i] == "}":
                i += 1
                return obj

    skip()
    return parse_obj()


def flatten(d, p=""):
    o = {}
    for k, v in d.items():
        kk = f"{p}.{k}" if p else k
        if isinstance(v, dict):
            o.update(flatten(v, kk))
        else:
            o[kk] = v
    return o


def placeholders(s: str):
    return re.findall(r"\{[^{}]+\}", s)


def offline_translate(s: str) -> str | None:
    if s in PHRASES:
        return PHRASES[s]
    if s in WORD:
        return WORD[s]
    if s in UNITS or s in SKIP:
        return s
    # Title Case multi-word labels without punctuation (except hyphens/spaces)
    if re.fullmatch(r"[A-Za-z0-9][A-Za-z0-9 \-/]{1,60}", s) and " " in s:
        parts = s.split(" ")
        if 2 <= len(parts) <= 5 and all(p[:1].isupper() or p.islower() or p.isdigit() for p in parts):
            out = []
            ok = True
            for p in parts:
                if p in WORD:
                    out.append(WORD[p])
                elif p.lower() in {k.lower(): v for k, v in WORD.items()}:
                    # case-insensitive fallback
                    for k, v in WORD.items():
                        if k.lower() == p.lower():
                            out.append(v if p[0].isupper() else v.lower())
                            break
                else:
                    ok = False
                    break
            if ok and out:
                # lowercase connecting words style: "Criado Em" -> "Criado em"
                fixed = [out[0]]
                for w in out[1:]:
                    if w.lower() in {"em", "de", "para", "por", "a", "o", "e", "com", "sem"}:
                        fixed.append(w.lower())
                    else:
                        fixed.append(w)
                return " ".join(fixed)
    # simple templates
    templates = [
        (r"^\{(\w+)\} ago$", r"há {\1}"),
        (r"^(\{\w+\}) ago$", r"há \1"),
        (r"^For \{(\w+)\}$", r"Para {\1}"),
        (r"^Due \{(\w+)\}$", r"Vence {\1}"),
        (r"^Call \{(\w+)\}$", r"Ligar a {\1}"),
        (r"^Tell \{(\w+)\}$", r"Informar {\1}"),
        (r"^At \{(\w+)\}$", r"Em {\1}"),
        (r"^Open \{(\w+)\}$", r"Abrir {\1}"),
        (r"^Ends \{(\w+)\}$", r"Termina {\1}"),
        (r"^Sent \{(\w+)\}$", r"Enviado {\1}"),
        (r"^last \{(\w+)\}$", r"último {\1}"),
        (r"^\{(\w+)\} late$", r"{\1} de atraso"),
        (r"^\{(\w+)\} each$", r"{\1} cada"),
        (r"^\{(\w+)\} pays$", r"{\1} paga"),
        (r"^Was \{(\w+)\}$", r"Era {\1}"),
        (r"^for \{(\w+)\}$", r"para {\1}"),
    ]
    for pat, repl in templates:
        if re.fullmatch(pat, s):
            return re.sub(pat, repl, s)
    return None


def mymemory(text: str) -> str:
    q = urllib.parse.quote(text[:450])
    url = f"https://api.mymemory.translated.net/get?q={q}&langpair=en|pt"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=40) as r:
        data = json.loads(r.read().decode())
    if int(data.get("responseStatus") or 0) != 200:
        raise RuntimeError(str(data.get("responseDetails") or data))
    return data["responseData"]["translatedText"]


def load_cache():
    if CACHE.exists():
        return {k: v for k, v in json.loads(CACHE.read_text()).items() if v and v != k}
    return {}


def save_cache(c):
    CACHE.write_text(json.dumps(c, ensure_ascii=False, indent=0))


def remaining(vendor: Path):
    js = vendor.read_text(encoding="utf-8", errors="surrogateescape")
    en = flatten(parse_js_obj(extract_pack(js, "en-us")[0]))
    pt = flatten(parse_js_obj(extract_pack(js, "pt-br")[0]))
    vals = []
    for k, ev in en.items():
        if k not in pt or pt[k] != ev or not isinstance(ev, str):
            continue
        if not re.search(r"[A-Za-z]", ev):
            continue
        if ev in SKIP or ev in UNITS:
            continue
        if re.fullmatch(r"[A-Z0-9_\-./°³]+", ev) and " " not in ev and len(ev) <= 4:
            continue
        if ", plural," in ev or ", select," in ev:
            continue
        vals.append(ev)
    return sorted(set(vals), key=len)


def apply_cache(cache: dict):
    files = [ASSETS / "vendor-06e3449278af5832aa3f5c4ebf12c1fe.js"]
    files += list(ENGINES.glob("*/assets/engine-vendor*.js"))
    items = sorted(
        ((k, v) for k, v in cache.items() if k and v and k != v and '"' not in k and '"' not in v),
        key=lambda kv: len(kv[0]),
        reverse=True,
    )
    for f in files:
        js = f.read_text(encoding="utf-8", errors="surrogateescape")
        pack, a, b = extract_pack(js, "pt-br")
        if not pack:
            continue
        n = 0
        for en, pt in items:
            c = pack.count(f'"{en}"')
            if c:
                pack = pack.replace(f'"{en}"', f'"{pt}"')
                n += c
        if n:
            f.write_text(js[:a] + pack + js[b:], encoding="utf-8", errors="surrogateescape")
        print(f"apply {f.name}: {n}", flush=True)


def update_sri():
    index = ROOT / "index.html"
    html = index.read_text(encoding="utf-8")

    def integ(data: bytes) -> str:
        return (
            f"sha256-{base64.b64encode(hashlib.sha256(data).digest()).decode()} "
            f"sha512-{base64.b64encode(hashlib.sha512(data).digest()).decode()}"
        )

    for rel in [
        "assets/vendor-06e3449278af5832aa3f5c4ebf12c1fe.js",
        "assets/@fleetbase/console-2eb4b2507bff82bcbbbfb7fd639c3469.js",
    ]:
        i = integ((ROOT / rel).read_bytes())
        html = re.sub(
            rf'(<script src="/{re.escape(rel)}" integrity=")[^"]+(")',
            rf"\g<1>{i}\2",
            html,
        )
    index.write_text(html, encoding="utf-8")
    print("SRI updated", flush=True)


def main():
    vendor = ASSETS / "vendor-06e3449278af5832aa3f5c4ebf12c1fe.js"
    cache = load_cache()
    todo = remaining(vendor)
    print(f"remaining: {len(todo)} cache:{len(cache)}", flush=True)

    offline_n = 0
    api_todo = []
    for s in todo:
        if s in cache:
            continue
        pt = offline_translate(s)
        if pt and pt != s:
            cache[s] = pt
            offline_n += 1
        else:
            # API only for meaningful phrases
            words = s.split()
            if len(s) >= 12 and len(words) >= 2 and not s.startswith("http"):
                api_todo.append(s)
    print(f"offline new={offline_n} api_candidates={len(api_todo)}", flush=True)
    save_cache(cache)
    apply_cache(cache)

    # MyMemory for longer leftovers (limit to avoid quota burn)
    api_todo = sorted(api_todo, key=len)[:500]
    ok = fail = 0

    def work(s):
        time.sleep(0.2)
        try:
            pt = mymemory(s)
            if placeholders(s) != placeholders(pt):
                return s, None
            return s, pt
        except Exception:
            return s, None

    if api_todo:
        print(f"API translating {len(api_todo)}...", flush=True)
        with ThreadPoolExecutor(max_workers=3) as ex:
            futs = [ex.submit(work, s) for s in api_todo]
            for i, fut in enumerate(as_completed(futs), 1):
                en, pt = fut.result()
                if pt and pt != en:
                    cache[en] = pt
                    ok += 1
                else:
                    fail += 1
                if i % 25 == 0:
                    save_cache(cache)
                    print(f"  api {i}/{len(api_todo)} ok={ok} fail={fail}", flush=True)
        save_cache(cache)
        apply_cache(cache)
        print(f"api done ok={ok} fail={fail}", flush=True)

    left = remaining(vendor)
    print(f"FINAL remaining non-ICU: {len(left)}", flush=True)
    update_sri()


if __name__ == "__main__":
    main()
