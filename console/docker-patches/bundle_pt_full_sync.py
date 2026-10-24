#!/usr/bin/env python3
"""Full Portuguese sync for Fleetbase console Docker patches + production assets.

- Applies curated + cached EN→PT replacements to console/engines (exact quoted)
- Enriches pt-ui-runtime.js dictionary
- Forces locale bootstrap to pt-br
- Updates index.html SRI with cache-bust query
"""
from __future__ import annotations

import base64
import hashlib
import json
import re
import sys
import time
from pathlib import Path

try:
    sys.stdout.reconfigure(line_buffering=True)
except Exception:
    pass

ROOT = Path(__file__).resolve().parent
ASSETS = ROOT / "assets"
ENGINES = ROOT / "engines-dist" / "@fleetbase"
CACHE_PATH = ROOT / "pt_translation_cache.json"
VENDOR = ASSETS / "vendor-06e3449278af5832aa3f5c4ebf12c1fe.js"
CONSOLE = ASSETS / "@fleetbase" / "console-2eb4b2507bff82bcbbbfb7fd639c3469.js"
RUNTIME = ASSETS / "pt-ui-runtime.js"
INDEX = ROOT / "index.html"

SKIP = {
    "Fleetbase", "OK", "ID", "GPS", "SKU", "API", "URL", "PDF", "CSV", "SMS",
    "MFA", "IAM", "OSRM", "JSON", "HTML", "CSS", "UUID", "N/A", "Stripe",
    "Leaflet", "Google", "Taler", "Radar", "Webhooks", "Sockets", "Socket",
    "xlsx", "csv", "xls", "html", "pdf", "FCM", "OTP",
}

CURATED: list[tuple[str, str]] = [
    # Common actions / chrome
    ("Save changes", "Guardar alterações"),
    ("Save Changes", "Guardar alterações"),
    ("Save Settings", "Guardar definições"),
    ("Save", "Guardar"),
    ("Cancel", "Cancelar"),
    ("Confirm", "Confirmar"),
    ("Delete", "Excluir"),
    ("Edit", "Editar"),
    ("Create", "Criar"),
    ("Close", "Fechar"),
    ("Back", "Voltar"),
    ("Next", "Seguinte"),
    ("Previous", "Anterior"),
    ("Search", "Pesquisar"),
    ("Filter", "Filtrar"),
    ("Filters", "Filtros"),
    ("Export", "Exportar"),
    ("Import", "Importar"),
    ("Loading...", "A carregar..."),
    ("Loading…", "A carregar…"),
    ("Add", "Adicionar"),
    ("Remove", "Remover"),
    ("Settings", "Definições"),
    ("Actions", "Ações"),
    ("Details", "Detalhes"),
    ("Status", "Estado"),
    ("Description", "Descrição"),
    ("Optional", "Opcional"),
    ("Required", "Obrigatório"),
    ("Enable", "Ativar"),
    ("Disable", "Desativar"),
    ("Update", "Atualizar"),
    ("Download", "Descarregar"),
    ("Upload", "Carregar"),
    ("Select", "Selecionar"),
    ("Browse", "Navegar"),
    ("Configure", "Configurar"),
    ("Manage", "Gerir"),
    ("View", "Ver"),
    ("New", "Novo"),
    ("Submit", "Submeter"),
    ("Continue", "Continuar"),
    ("Apply", "Aplicar"),
    ("Reset", "Repor"),
    ("Clear", "Limpar"),
    ("Refresh", "Atualizar"),
    ("Reload", "Recarregar"),
    ("Open", "Abrir"),
    ("Copy", "Copiar"),
    ("Copied", "Copiado"),
    ("Click to copy", "Clique para copiar"),
    ("No results", "Sem resultados"),
    ("No results found", "Nenhum resultado encontrado"),
    ("Are you sure?", "Tem a certeza?"),
    ("Something went wrong", "Algo correu mal"),
    ("Please wait", "Por favor aguarde"),
    ("Success", "Sucesso"),
    ("Error", "Erro"),
    ("Warning", "Aviso"),
    ("Active", "Ativo"),
    ("Inactive", "Inativo"),
    ("Pending", "Pendente"),
    ("Complete", "Concluído"),
    ("Incomplete", "Incompleto"),
    ("Dashboard", "Painel"),
    ("Admin Dashboard", "Painel de administração"),
    ("Organization", "Organização"),
    ("Organizations", "Organizações"),
    ("Your Organizations", "As suas organizações"),
    ("Member Since:", "Membro desde:"),
    ("Member Since", "Membro desde"),
    ("Leave", "Sair"),
    ("Switch", "Alternar"),
    ("Home", "Início"),
    ("Profile", "Perfil"),
    ("Account", "Conta"),
    ("Notifications", "Notificações"),
    ("Messages", "Mensagens"),
    ("Documentation", "Documentação"),
    ("Help & Support", "Ajuda e suporte"),
    ("Logout", "Terminar sessão"),
    ("Sign in", "Entrar"),
    ("Password", "Senha"),
    ("Email", "Email"),
    ("Name", "Nome"),
    ("Type", "Tipo"),
    ("Date", "Data"),
    ("Time", "Hora"),
    ("Timezone", "Fuso horário"),
    ("Onboarding", "Integração"),
    ("Billing", "Faturação"),
    ("Owner", "Proprietário"),
    ("Users", "Utilizadores"),
    ("Roles", "Funções"),
    ("Permissions", "Permissões"),
    ("Policies", "Políticas"),
    ("Groups", "Grupos"),
    ("Drivers", "Motoristas"),
    ("Vehicles", "Veículos"),
    ("Fleets", "Frotas"),
    ("Places", "Locais"),
    ("Orders", "Encomendas"),
    ("Reports", "Relatórios"),
    ("Customers", "Clientes"),
    ("Products", "Produtos"),
    ("Extensions", "Extensões"),
    ("Developers", "Programadores"),
    ("Storefront", "Loja online"),
    ("Transport", "Transporte"),
    ("Format", "Formato"),
    ("Views", "Vistas"),
    ("Export Companies", "Exportar empresas"),
    ("Export selected", "Exportar selecionados"),
    ("Select export format...", "Selecionar formato de exportação..."),
    ("Needs Attention", "Necessita de atenção"),
    ("Missing Owner", "Sem proprietário"),
    ("Incomplete Onboarding", "Integração incompleta"),
    ("Inactive Status", "Estado inativo"),
    ("Clear View", "Limpar vista"),
    ("Owner email", "Email do proprietário"),
    ("Owner name", "Nome do proprietário"),
    ("Owner phone", "Telefone do proprietário"),
    ("Owner IP address", "Endereço IP do proprietário"),
    ("Organization type", "Tipo de organização"),
    ("Registered on or after", "Registado em ou após"),
    ("Registered on or before", "Registado em ou antes"),
    ("Updated on or after", "Atualizado em ou após"),
    ("Updated on or before", "Atualizado em ou antes"),
    ("Last Updated", "Última atualização"),
    ("Search organizations, owners, email or phone", "Pesquisar organizações, proprietários, email ou telefone"),
    ("Search organizations", "Pesquisar organizações"),
    ("2FA Settings", "Definições de 2FA"),
    ("Enable Two-Factor Authentication", "Ativar autenticação de dois fatores"),
    ("Save 2FA Settings", "Guardar definições de 2FA"),
    ("Passwords", "Palavras-passe"),
    ("Allow users to change their own password", "Permitir que os utilizadores alterem a própria palavra-passe"),
    ("Save Authentication Settings", "Guardar definições de autenticação"),
    ("Select notifiables...", "Selecionar destinatários..."),
    ("SMS Notification Settings", "Definições de Notificação SMS"),
    ("Enable Alpha-Numeric Sender ID", "Ativar ID de remetente alfanumérico"),
    ("Alpha-Numeric Sender ID", "ID de remetente alfanumérico"),
    ("User Accepted Company Invite", "Utilizador aceitou convite da empresa"),
    ("Active Admins", "Admins ativos"),
    ("Pending Attention", "Pendente de atenção"),
    ("New Users", "Novos utilizadores"),
    ("New Organizations", "Novas organizações"),
    ("Failed Jobs", "Tarefas falhadas"),
    ("Suspicious Activity", "Atividade suspeita"),
    ("vs previous 30d", "vs 30d anteriores"),
    ("admin access", "acesso admin"),
    ("needs review", "precisa de revisão"),
    ("queue health", "saúde da fila"),
    ("last 30d", "últimos 30d"),
    ("System Diagnostics", "Diagnósticos do sistema"),
    ("Admin Activity", "Atividade de admin"),
    ("Organization Risk Queue", "Fila de risco de organizações"),
    ("Configuration Gaps", "Lacunas de configuração"),
    ("View all", "Ver tudo"),
    ("No report data available. Select a date and refresh.", "Sem dados de relatório. Selecione uma data e atualize."),
    ("No report data available. Select a period and refresh.", "Sem dados de relatório. Selecione um período e atualize."),
    ("Select one or more teammates", "Selecione um ou mais colegas"),
    ("Select from map", "Selecionar no mapa"),
    ("Field is Required", "Campo obrigatório"),
    ("Select a data source", "Selecione uma fonte de dados"),
    ("Select fields first", "Selecione os campos primeiro"),
    ("Performance Warning", "Aviso de desempenho"),
    ("Select the Fleetbase model this query runs against.", "Selecione o modelo Fleetbase para esta consulta."),
    ("Admin roles", "Funções de admin"),
    ("Required before apply", "Obrigatório antes de aplicar"),
    ("Configure Provider", "Configurar fornecedor"),
    ("Organization profile", "Perfil da organização"),
    ("Organization Status", "Estado da organização"),
    ("Organization Users", "Utilizadores da organização"),
    ("Account Code", "Código da conta"),
    ("Loading invoice…", "A carregar fatura…"),
    ("Loading refund...", "A carregar reembolso..."),
    ("Loading gateway status", "A carregar estado do gateway"),
    ("Debit Account Code", "Código da conta a débito"),
    ("Credit Account Code", "Código da conta a crédito"),
    ("Create accounts in the Chart of Accounts to see entries here.", "Crie contas no Plano de Contas para ver lançamentos aqui."),
    ("Create a template", "Criar um modelo"),
    ("Add a gateway", "Adicionar um gateway"),
    ("Organization 2FA", "2FA da organização"),
    ("Create group", "Criar grupo"),
    ("Create role", "Criar função"),
    ("Create policy", "Criar política"),
    ("Enable the generic tracking page", "Ativar a página de rastreio genérica"),
    ("Support phone", "Telefone de suporte"),
    ("Support email", "Email de suporte"),
    ("Select an Order to view Details", "Selecione uma encomenda para ver os detalhes"),
    ("Sync Settings", "Definições de sincronização"),
    ("Loading integrations", "A carregar integrações"),
    ("Delete driver", "Excluir motorista"),
    ("Delete vehicle", "Excluir veículo"),
    ("Confirm your phone number below and click send to receive a verification code by SMS.",
     "Confirme o seu número de telefone abaixo e clique em enviar para receber um código de verificação por SMS."),
    ("Optional blackbox metadata for provider hardware installed in the fleet.",
     "Metadados opcionais da blackbox do hardware do fornecedor instalado na frota."),
    ("Confirm the provider accepts the credentials before saving this fuel integration.",
     "Confirme que o fornecedor aceita as credenciais antes de guardar esta integração de combustível."),
    ("Pending start", "Início pendente"),
    ("Create Organization", "Criar organização"),
    ("Leave Organization", "Sair da organização"),
    ("Delete Organization", "Eliminar organização"),
    ("Transfer Ownership and Leave", "Transferir propriedade e sair"),
    ("Missing owner", "Sem proprietário"),
    ("Suspended", "Suspenso"),
    ("Loading User 2FA Settings...", "A carregar definições de 2FA do utilizador..."),
    ("Require Users to Set-Up 2FA", "Exigir que os utilizadores configurem o 2FA"),
    ("Choose an authentication method", "Escolha um método de autenticação"),
    ("Recommended", "Recomendado"),
    ("Needs setup", "Requer configuração"),
    ("Authenticator App", "Aplicação autenticadora"),
    ("Change Email", "Alterar email"),
    ("Change Password", "Alterar palavra-passe"),
    ("Starting up...", "A iniciar..."),
]


def load_cache() -> dict:
    if not CACHE_PATH.exists():
        return {}
    try:
        data = json.loads(CACHE_PATH.read_text(encoding="utf-8"))
        return data if isinstance(data, dict) else {}
    except Exception:
        return {}


def looks_safe(en: str, pt: str) -> bool:
    if not en or not pt or en == pt:
        return False
    if en in SKIP or len(en) < 2 or len(en) > 160:
        return False
    if "{" in en or "}" in en or "\n" in en:
        return False
    if en.startswith(("http", "/", "@", "#", ".", "console.", "fleetbase")):
        return False
    # Avoid translating pure identifiers
    if re.fullmatch(r"[a-z0-9_\-./]+", en):
        return False
    return True


def replace_quoted(content: str, pairs: list[tuple[str, str]]) -> tuple[str, int]:
    total = 0
    for en, pt in pairs:
        if not looks_safe(en, pt) and en not in {a for a, _ in CURATED}:
            # still allow curated even if short
            if (en, pt) not in CURATED and not any(en == a for a, _ in CURATED):
                continue
        for q in ('"', "'"):
            a, b = f"{q}{en}{q}", f"{q}{pt}{q}"
            n = content.count(a)
            if n:
                content = content.replace(a, b)
                total += n
    return content, total


def sha_integrity(data: bytes) -> str:
    return (
        f"sha256-{base64.b64encode(hashlib.sha256(data).digest()).decode()} "
        f"sha512-{base64.b64encode(hashlib.sha512(data).digest()).decode()}"
    )


def ui_targets() -> list[Path]:
    targets = [CONSOLE]
    if ENGINES.exists():
        for eng in sorted(ENGINES.iterdir()):
            assets = eng / "assets"
            if not assets.is_dir():
                continue
            for f in assets.glob("engine-*.js"):
                if f.name.startswith("engine-vendor") or "libphone" in f.name or "socket" in f.name:
                    continue
                targets.append(f)
    return [p for p in targets if p.exists()]


def build_pairs(cache: dict) -> list[tuple[str, str]]:
    merged: dict[str, str] = {}
    for en, pt in cache.items():
        if isinstance(en, str) and isinstance(pt, str) and looks_safe(en, pt):
            # Prefer multi-word / longer UI phrases from cache
            if " " in en or len(en) >= 8 or en.endswith(("...", ".", "?", "!")):
                merged[en] = pt
    for en, pt in CURATED:
        merged[en] = pt
    return sorted(merged.items(), key=lambda kv: len(kv[0]), reverse=True)


def patch_console_locale(content: str) -> str:
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
    content = content.replace('getOption("locale","en-US")', 'getOption("locale","pt-br")')
    if 'setLocale(["pt-br"])' not in content:
        content = re.sub(
            r"initializeLocale\(\)\{[^}]*\}",
            'initializeLocale(){this.intl.setLocale(["pt-br"])}',
            content,
            count=1,
        )
    return content


def rebuild_runtime(pairs: list[tuple[str, str]]) -> None:
    # Keep runtime focused: curated + multi-word cache (exact DOM match)
    items = [(en, pt) for en, pt in pairs if looks_safe(en, pt) or any(en == a for a, _ in CURATED)]
    # Deduplicate preferring curated order already merged
    exact = dict(items)
    for en, pt in CURATED:
        exact[en] = pt
    # Extra aliases for uppercase CSS titles
    exact.update({
        "YOUR ORGANIZAÇÕES": "AS SUAS ORGANIZAÇÕES",
        "2FA SETTINGS": "DEFINIÇÕES DE 2FA",
        "PASSWORDS": "PALAVRAS-PASSE",
        "ACTIVE ADMINS": "ADMINS ATIVOS",
        "PENDING ATTENTION": "PENDENTE DE ATENÇÃO",
        "NEW USERS": "NOVOS UTILIZADORES",
        "FAILED JOBS": "TAREFAS FALHADAS",
        "SUSPICIOUS ACTIVITY": "ATIVIDADE SUSPEITA",
        "SYSTEM DIAGNOSTICS": "DIAGNÓSTICOS DO SISTEMA",
        "ADMIN ACTIVITY": "ATIVIDADE DE ADMIN",
        "CONFIGURATION GAPS": "LACUNAS DE CONFIGURAÇÃO",
        "LAST UPDATED": "ÚLTIMA ATUALIZAÇÃO",
        "OWNER": "PROPRIETÁRIO",
        "CORE": "PRINCIPAIS",
    })
    keys = sorted(exact.keys(), key=len, reverse=True)
    phrases = [k for k in keys if len(k) >= 12]

    def js(s: str) -> str:
        return json.dumps(s, ensure_ascii=False)

    pairs_js = ",\n".join(f"  {js(k)}: {js(exact[k])}" for k in keys)
    phrases_js = ",\n".join(js(k) for k in phrases)

    js_src = f"""/* Fleetbase PT UI runtime — translates leftover English when locale is Portuguese */
(function () {{
  var DICT = {{\n{pairs_js}\n}};
  var PHRASES = [\n{phrases_js}\n];
  var ATTRS = ["placeholder", "title", "aria-label", "alt"];
  var SKIP = /^(SCRIPT|STYLE|NOSCRIPT|TEXTAREA|CODE|PRE|KBD|SVG|PATH|MATH)$/i;
  var scheduled = false;

  function getLocale() {{
    try {{
      var raw = localStorage.getItem("@fleetbase/storage:user-options");
      var opts = raw ? JSON.parse(raw) : {{}};
      var loc = opts.locale || "";
      Object.keys(opts).forEach(function (k) {{
        if (String(k).endsWith(":locale") && opts[k]) loc = opts[k];
      }});
      return String(loc || "").toLowerCase();
    }} catch (e) {{ return ""; }}
  }}

  function isPortuguese(loc) {{
    if (!loc) return true;
    return loc === "pt" || loc.indexOf("pt-") === 0 || loc.indexOf("pt_") === 0;
  }}

  function normalizePtLocale() {{
    try {{
      var key = "@fleetbase/storage:user-options";
      var raw = localStorage.getItem(key);
      var opts = raw ? JSON.parse(raw) : {{}};
      var changed = false;
      function norm(v) {{
        if (!v) return v;
        var s = String(v).toLowerCase();
        if (s === "pt" || s === "pt-pt" || s === "pt_pt" || s.indexOf("pt-") === 0 || s.indexOf("pt_") === 0) {{
          if (s !== "pt-br") {{ changed = true; return "pt-br"; }}
        }}
        return v;
      }}
      Object.keys(opts).forEach(function (k) {{
        if (k === "locale" || String(k).endsWith(":locale")) {{
          var n = norm(opts[k]);
          if (n !== opts[k]) opts[k] = n;
        }}
      }});
      if (!opts.locale) {{ opts.locale = "pt-br"; changed = true; }}
      if (changed || !raw) localStorage.setItem(key, JSON.stringify(opts));
    }} catch (e) {{}}
  }}

  function translateText(text) {{
    if (text == null) return text;
    var m = String(text).match(/^(\\s*)([\\s\\S]*?)(\\s*)$/);
    if (!m) return text;
    var lead = m[1], core = m[2], trail = m[3];
    if (!core) return text;
    if (Object.prototype.hasOwnProperty.call(DICT, core)) return lead + DICT[core] + trail;
    var num = core.match(/^(\\d+)\\s+(.+)$/);
    if (num && Object.prototype.hasOwnProperty.call(DICT, num[2])) {{
      return lead + num[1] + " " + DICT[num[2]] + trail;
    }}
    if (core.length >= 12) {{
      var out = core;
      for (var i = 0; i < PHRASES.length; i++) {{
        var k = PHRASES[i];
        if (out.indexOf(k) !== -1) out = out.split(k).join(DICT[k]);
      }}
      if (out !== core) return lead + out + trail;
    }}
    return text;
  }}

  function translateNode(node) {{
    if (!node || node.nodeType !== 3) return;
    var p = node.parentElement;
    if (!p || SKIP.test(p.tagName) || p.isContentEditable) return;
    if (p.closest && p.closest("[data-no-pt],code,pre,.monaco-editor,.cm-editor,input,textarea")) return;
    var next = translateText(node.nodeValue);
    if (next !== node.nodeValue) node.nodeValue = next;
  }}

  function translateAttrs(el) {{
    if (!el || el.nodeType !== 1) return;
    for (var i = 0; i < ATTRS.length; i++) {{
      var a = ATTRS[i];
      if (!el.hasAttribute(a)) continue;
      var v = el.getAttribute(a);
      var nv = translateText(v);
      if (nv !== v) el.setAttribute(a, nv);
    }}
    if (el.tagName === "INPUT" && /^(button|submit|reset)$/i.test(el.type) && el.value) {{
      var xv = translateText(el.value);
      if (xv !== el.value) el.value = xv;
    }}
  }}

  function walk(root) {{
    if (!root) return;
    if (root.nodeType === 1) translateAttrs(root);
    var tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, null);
    var n;
    while ((n = tw.nextNode())) {{
      if (n.nodeType === 3) translateNode(n);
      else if (n.nodeType === 1) translateAttrs(n);
    }}
  }}

  function run() {{
    normalizePtLocale();
    if (!isPortuguese(getLocale())) return;
    walk(document.body);
  }}

  function schedule() {{
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(function () {{
      scheduled = false;
      run();
    }});
  }}

  function hookIntl() {{
    try {{
      if (!window.Ember || !Ember.Namespace || !Ember.Namespace.NAMESPACES) return false;
      var app = Ember.Namespace.NAMESPACES.find(function (n) {{ return n && n.__container__; }});
      if (!app) return false;
      var intl = app.__container__.lookup("service:intl");
      if (!intl || intl.__ptHooked) return !!intl;
      intl.__ptHooked = true;
      var orig = intl.setLocale.bind(intl);
      intl.setLocale = function (locale) {{
        var first = Array.isArray(locale) ? locale[0] : locale;
        if (first && String(first).toLowerCase().indexOf("pt") === 0) {{
          locale = Array.isArray(locale) ? ["pt-br"] : "pt-br";
        }}
        var r = orig(locale);
        setTimeout(schedule, 30);
        setTimeout(schedule, 300);
        setTimeout(schedule, 1000);
        return r;
      }};
      if (intl.onLocaleChanged) intl.onLocaleChanged(schedule);
      return true;
    }} catch (e) {{ return false; }}
  }}

  normalizePtLocale();
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", schedule);
  else schedule();
  window.addEventListener("load", function () {{
    schedule();
    var tries = 0;
    var t = setInterval(function () {{
      if (hookIntl() || ++tries > 50) clearInterval(t);
      schedule();
    }}, 400);
  }});
  window.addEventListener("storage", schedule);

  new MutationObserver(function (muts) {{
    if (!isPortuguese(getLocale())) return;
    for (var i = 0; i < muts.length; i++) {{
      var m = muts[i];
      if (m.type === "characterData") translateNode(m.target);
      else if (m.type === "childList") {{
        m.addedNodes.forEach(function (n) {{
          if (n.nodeType === 3) translateNode(n);
          else if (n.nodeType === 1) walk(n);
        }});
      }} else if (m.type === "attributes") translateAttrs(m.target);
    }}
  }}).observe(document.documentElement, {{
    childList: true, subtree: true, characterData: true,
    attributes: true, attributeFilter: ATTRS
  }});

  setInterval(function () {{ if (isPortuguese(getLocale())) walk(document.body); }}, 3000);
}})();
"""
    RUNTIME.write_text(js_src, encoding="utf-8")
    print(f"runtime rebuilt keys={len(exact)} phrases={len(phrases)} bytes={RUNTIME.stat().st_size}")


def update_index_sri() -> None:
    html = INDEX.read_text(encoding="utf-8")
    html = html.replace("Starting up...", "A iniciar...")
    # Ensure runtime script present
    if "pt-ui-runtime.js" not in html:
        html = html.replace(
            '<script src="/assets/vendor-',
            '<script src="/assets/pt-ui-runtime.js"></script>\n<script src="/assets/vendor-',
            1,
        )
    bust = str(int(time.time()))
    for rel in [
        "assets/vendor-06e3449278af5832aa3f5c4ebf12c1fe.js",
        "assets/@fleetbase/console-2eb4b2507bff82bcbbbfb7fd639c3469.js",
    ]:
        path = ROOT / rel
        if not path.exists():
            continue
        dig = sha_integrity(path.read_bytes())
        html, n = re.subn(
            rf'<script src="/{re.escape(rel)}(?:\?[^"]*)?" integrity="[^"]*"\s*></script>',
            f'<script src="/{rel}?v={bust}" integrity="{dig}" ></script>',
            html,
            count=1,
        )
        print(f"SRI {rel} updated={n} bust={bust}")
    INDEX.write_text(html, encoding="utf-8")


def main() -> None:
    cache = load_cache()
    pairs = build_pairs(cache)
    print(f"pairs={len(pairs)} (cache={len(cache)} curated={len(CURATED)})")

    total = 0
    for path in ui_targets():
        content = path.read_text(encoding="utf-8", errors="surrogateescape")
        original = content
        content, n = replace_quoted(content, pairs)
        if path == CONSOLE:
            content = patch_console_locale(content)
        if content != original:
            path.write_text(content, encoding="utf-8", errors="surrogateescape")
            label = path.name if "engines" not in str(path) else f"{path.parent.parent.name}/{path.name}"
            print(f"UI {label}: {n}")
            total += n
        else:
            print(f"-- {path.name}")

    # Light vendor UI string patches (exact only, avoid short words that break intl keys)
    if VENDOR.exists():
        safe_vendor = [(a, b) for a, b in CURATED if len(a) >= 6 or " " in a]
        # Extra vendor-specific
        safe_vendor.extend([
            ("Export ${", "Exportar ${"),  # won't match as quoted
        ])
        vc = VENDOR.read_text(encoding="utf-8", errors="surrogateescape")
        vo = vc
        vc, vn = replace_quoted(vc, safe_vendor)
        # Template fragments already handled previously; keep export title PT
        vc = vc.replace("title:`Export ${", "title:`Exportar ${")
        if "complete:\"Concluído\"" not in vc and 'pending:"Pendente"' in vc:
            vc = vc.replace('pending:"Pendente"', 'pending:"Pendente",complete:"Concluído",completed:"Concluído",incomplete:"Incompleto"')
        if vc != vo:
            VENDOR.write_text(vc, encoding="utf-8", errors="surrogateescape")
            print(f"vendor replacements={vn}")
        else:
            print("vendor unchanged")

    rebuild_runtime(pairs)
    update_index_sri()
    print(f"DONE total_ui_replacements≈{total}")


if __name__ == "__main__":
    main()
