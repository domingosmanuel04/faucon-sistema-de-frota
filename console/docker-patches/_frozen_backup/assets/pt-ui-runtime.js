/* Faucon PT UI runtime — translates leftover English when locale is Portuguese */
(function () {
  var DICT = {
  "Outstanding Invoices": "Faturas em aberto",
  "Oct": "Out",
  "Total Expenses": "Despesas totais",
  "Total Revenue": "Receita total",
  "Expenses": "Despesas",
  "EXPENSES": "DESPESAS",
  "No expenses recorded": "Sem despesas registadas",
  "No revenue recorded": "Sem receita registada",
  "Profitable": "Com lucro",
  "Select period": "Selecionar período",
  "Select date range": "Selecionar intervalo de datas",
  "DEBIT ACCOUNT": "CONTA A DÉBITO",
  "Describe the purpose of this journal entry...": "Descreva o propósito deste lançamento...",
  "Select credit account": "Selecionar conta a crédito",
  "Select debit account": "Selecionar conta a débito",
  "Standard": "Padrão",
  "Entry Date": "Data do lançamento",
  "Entry Number": "Número do lançamento",
  "Double-Entry": "Partida dobrada",
  "DOUBLE-ENTRY": "PARTIDA DOBRADA",
  "Entry Information": "Informação do lançamento",
  "ENTRY INFORMATION": "INFORMAÇÃO DO LANÇAMENTO",
  "Create Ledger Journal": "Criar lançamento contabilístico",
  "Criar Journal Entry": "Criar lançamento de diário",
  "Journal Entries": "Lançamentos de diário",
  "Cash": "Caixa",
  "Bank Account": "Conta bancária",
  "Accounts Payable": "Contas a pagar",
  "Expense": "Despesa",
  "Equity": "Capital",
  "Asset": "Ativo",
  "Liability": "Passivo",
  "Code": "Código",
  "Pesquisar Accounts": "Pesquisar contas",
  "Accounts": "Contas",
  "sandbox": "sandbox",
  "webhooks": "webhooks",
  "refund": "reembolso",
  "purchase": "compra",
  "Disponível": "Disponível",
  "REGIONAL PAYMENT": "PAGAMENTO REGIONAL",
  "MANUAL PAYMENT": "PAGAMENTO MANUAL",
  "CARDS AND WALLETS": "CARTÕES E CARTEIRAS",
  "WALLET PAYMENT": "PAGAMENTO POR CARTEIRA",
  "Connect gateway": "Ligar gateway",
  "Supported Gateways": "Gateways suportados",
  "SANDBOX": "SANDBOX",
  "WEBHOOK ISSUES": "PROBLEMAS DE WEBHOOK",
  "LIVE READY": "PRONTOS EM PRODUÇÃO",
  "ACTIVE GATEWAYS": "GATEWAYS ATIVOS",
  "Gateways de pagamento": "Gateways de pagamento",
  "Operating Wallet": "Carteira operacional",
  "Revenue Wallet": "Carteira de receita",
  "Payout Reserve": "Reserva de pagamentos",
  "Refund Reserve": "Reserva de reembolso",
  "Personal Wallet": "Carteira pessoal",
  "Company": "Empresa",
  "User": "Utilizador",
  "Owner": "Proprietário",
  "OWNER": "PROPRIETÁRIO",
  "Pesquisar Wallets": "Pesquisar carteiras",
  "Wallets": "Carteiras",
  "Failure Reason": "Motivo da falha",
  "Reference": "Referência",
  "Currency": "Moeda",
  "Net Amount": "Montante líquido",
  "Settled At": "Liquidado em",
  "Payment Method": "Método de pagamento",
  "Tax": "Imposto",
  "Settlement": "Liquidação",
  "Period": "Período",
  "Gateway": "Gateway",
  "Fee": "Taxa",
  "Amount": "Montante",
  "Direction": "Direção",
  "Date": "Data",
  "AMOUNT": "MONTANTE",
  "DIRECTION": "DIREÇÃO",
  "DEFAULT": "PADRÃO",
  "ORIENTATION": "ORIENTAÇÃO",
  "Use the toolbar to add elements.": "Use a barra de ferramentas para adicionar elementos.",
  "No elements yet.": "Ainda sem elementos.",
  "Background Color": "Cor de fundo",
  "Landscape": "Paisagem",
  "Portrait": "Retrato",
  "Orientation": "Orientação",
  "Paper Size": "Tamanho do papel",
  "New Invoice Template": "Novo modelo de fatura",
  "Template Name": "Nome do modelo",
  "Canvas Settings": "Definições da tela",
  "Queries": "Consultas",
  "Layers": "Camadas",
  "Save": "Guardar",
  "Barcode": "Código de barras",
  "Shape": "Forma",
  "Line": "Linha",
  "Table": "Tabela",
  "Image": "Imagem",
  "Text": "Texto",
  "Payment terms, e.g. Net 30…": "Termos de pagamento, ex. 30 dias…",
  "Add any notes or payment instructions for the customer…": "Adicione notas ou instruções de pagamento para o cliente…",
  "+ Add line item": "+ Adicionar item",
  "Add line item": "Adicionar item",
  "No line items recorded.": "Ainda sem itens de linha.",
  "Select a template (optional)": "Selecionar um modelo (opcional)",
  "Notes & Terms": "Notas e termos",
  "NOTES & TERMS": "NOTAS E TERMOS",
  "Terms": "Termos",
  "TOTAL": "TOTAL",
  "SUBTOTAL": "SUBTOTAL",
  "TAX": "IVA",
  "TAX %": "IVA %",
  "Unit Price": "Preço unitário",
  "UNIT PRICE": "PREÇO UNITÁRIO",
  "QTY": "QTD",
  "BALANCE": "SALDO",
  "CURRENCY": "MOEDA",
  "NUMBER": "NÚMERO",
  "Criar Ledger Invoice": "Criar fatura",
  "Create Ledger Invoice": "Criar fatura",
  "Criar nova fatura": "Criar nova fatura",
  "Invoices": "Faturas",
  "Exportar Users": "Exportar utilizadores",
  "Previous": "Anterior",
  "Showing 1 to 1 of 1 results": "A mostrar 1 a 1 de 1 resultados",
  "Enter the email address of the person you want to invite. If they already have a Fleetbase account they will receive an invitation to join your organisation. If they are new, a pending account will be created and they will be asked to set a password on acceptance.": "Introduza o email da pessoa que pretende convidar. Se já tiver uma conta Faucon, receberá um convite para juntar-se à organização. Se for nova, será criada uma conta pendente e pedirão para definir uma palavra-passe ao aceitar.",
  "Organization Managed": "Gerido pela organização",
  "FLB Managed": "FLB Gerido",
  "results": "resultados",
  "Showing": "A mostrar",
  "Mark email verified...": "Marcar email como verificado...",
  "Send email verification...": "Enviar verificação de email...",
  "Change user email...": "Alterar email do utilizador...",
  "Mark phone verified...": "Marcar telefone como verificado...",
  "Send phone verification...": "Enviar verificação de telefone...",
  "colleague@example.com": "colega@exemplo.com",
  "Full name (required for new users)": "Nome completo (obrigatório para novos utilizadores)",
  "Export Format": "Formato de exportação",
  "Select export format...": "Selecionar formato de exportação...",
  "Download": "Descarregar",
  "Format": "Formato",
  "Inactive": "Inativo",
  "Verified": "Verificado",
  "Unverified": "Não verificado",
  "Phone Verified": "Telefone verificado",
  "Email Verified": "Email verificado",
  "PHONE VERIFIED": "TELEFONE VERIFICADO",
  "EMAIL VERIFIED": "EMAIL VERIFICADO",
  "Send Invitation": "Enviar convite",
  "Export Users": "Exportar utilizadores",
  "Invite User": "Convidar utilizador",
  "Version": "Versão",
  "Administrator": "Administrador",
  "Org managed": "Gerido pela org.",
  "Create a dashboard to customize widgets.": "Crie um painel para personalizar os widgets.",
  "+ Create new Dashboard": "+ Criar novo painel",
  "Create new Dashboard": "Criar novo painel",
  "Latest identity and access changes": "Últimas alterações de identidade e acesso",
  "Recent IAM Activity": "Atividade recente do IAM",
  "RECENT IAM ACTIVITY": "ATIVIDADE RECENTE DO IAM",
  "Policies by service": "Políticas por serviço",
  "Policy Surface": "Superfície de políticas",
  "POLICY SURFACE": "SUPERFÍCIE DE POLÍTICAS",
  "Fleetbase Managed": "Gerido pelo Faucon",
  "Direct grants": "Concessões diretas",
  "Wildcard policies": "Políticas com wildcard",
  "Privileged exposure requiring review": "Exposição privilegiada que requer revisão",
  "New identities grouped by user type": "Novas identidades agrupadas por tipo de utilizador",
  "Users by Type Created Over Time": "Utilizadores por tipo criados ao longo do tempo",
  "USERS BY TYPE CREATED OVER TIME": "UTILIZADORES POR TIPO CRIADOS AO LONGO DO TEMPO",
  "Organization managed": "Gerido pela organização",
  "Org enforcement shown": "Aplicação na organização",
  "No recent login": "Sem início de sessão recente",
  "Disabled access": "Acesso desativado",
  "Awaiting access": "A aguardar acesso",
  "Current access": "Acesso atual",
  "CODE": "CÓDIGO",
  "EVENT": "EVENTO",
  "Search Events": "Pesquisar eventos",
  "Events": "Eventos",
  "URL": "URL",
  "MODE": "MODO",
  "CREATED": "CRIADO",
  "DATE": "DATA",
  "VERSION": "VERSÃO",
  "HTTP METHOD": "MÉTODO HTTP",
  "API CREDENTIAL": "CREDENCIAL DE API",
  "STATUS": "ESTADO",
  "DESCRIPTION": "DESCRIÇÃO",
  "Search Logs": "Pesquisar logs",
  "Logs": "Logs",
  "Listen": "Escutar",
  "Event channel ID": "ID do canal de eventos",
  "Listen on a custom channel": "Escutar um canal personalizado",
  "Listen on custom channel": "Escutar canal personalizado",
  "Watch Channel": "Observar canal",
  "Watch Channel →": "Observar canal →",
  "CHANNEL": "CANAL",
  "Channels receiving events from your account": "Canais a receber eventos da sua conta",
  "Confirm & Create": "Confirmar e criar",
  "receive all events": "receber todos os eventos",
  "Search for events with the dropdown above, or receive all events.": "Pesquise eventos no menu acima, ou receba todos os eventos.",
  "No events selected": "Nenhum evento selecionado",
  "Select events...": "Selecionar eventos...",
  "Events to send": "Eventos a enviar",
  "Receive from all API Credentials...": "Receber de todas as credenciais de API...",
  "API Credential": "Credencial de API",
  "An optional description of what this webhook endpoint is used for.": "Descrição opcional da utilização deste endpoint de webhook.",
  "Endpoint URL": "URL do endpoint",
  "Endpoint URL *": "URL do endpoint *",
  "Add a webhook endpoint": "Adicionar endpoint de webhook",
  "Add new endpoint": "Adicionar novo endpoint",
  "+ Add new endpoint": "+ Adicionar novo endpoint",
  "Search Webhooks": "Pesquisar webhooks",
  "Webhooks": "Webhooks",
  "Confirm": "Confirmar",
  "Cancel": "Cancelar",
  "You are creating a live environment key, use this for production environments.": "Está a criar uma chave de ambiente em produção; use-a em ambientes de produção.",
  "Live Key": "Chave em produção",
  "Once this key expires, you can't perform any actions with it.": "Quando esta chave expirar, não poderá realizar ações com ela.",
  "never": "nunca",
  "Expiration": "Expiração",
  "Enter a nickname or environment name for API Key": "Introduza um nome ou ambiente para a chave de API",
  "New": "Novo",
  "+ New": "+ Novo",
  "Export": "Exportar",
  "Showing 1 to 1 of 0 results": "A mostrar 1 a 1 de 0 resultados",
  "No records found": "Nenhum registo encontrado",
  "New API Key": "Nova chave de API",
  "View test data": "Ver dados de teste",
  "Search API Keys": "Pesquisar chaves de API",
  "API Keys": "Chaves de API",
  "No data available": "Sem dados disponíveis",
  "Jump into developer tools": "Aceder às ferramentas de programador",
  "Quick Resources": "Recursos rápidos",
  "Recent logs, webhooks, and events": "Logs, webhooks e eventos recentes",
  "Developer Activity": "Atividade do programador",
  "SOURCES": "FONTES",
  "EVENT TYPES": "TIPOS DE EVENTO",
  "Top event types and sources": "Principais tipos e fontes de eventos",
  "Event Stream": "Fluxo de eventos",
  "Recent webhook endpoint reliability": "Fiabilidade recente dos endpoints de webhook",
  "Endpoint Health": "Saúde dos endpoints",
  "Delivery volume, retries, and failures": "Volume de entrega, novas tentativas e falhas",
  "Webhook Delivery Health": "Saúde da entrega de webhooks",
  "Request volume, successes, and errors": "Volume de pedidos, sucessos e erros",
  "API Traffic": "Tráfego de API",
  "EVENTS EMITTED": "EVENTOS EMITIDOS",
  "WEBHOOK FAILURES": "FALHAS DE WEBHOOKS",
  "ACTIVE WEBHOOKS": "WEBHOOKS ATIVOS",
  "ACTIVE API KEYS": "CHAVES DE API ATIVAS",
  "WEBHOOK SUCCESS": "SUCESSO DE WEBHOOKS",
  "AVG API LATENCY": "LATÊNCIA MÉDIA DA API",
  "API ERROR RATE": "TAXA DE ERRO DA API",
  "API REQUESTS": "PEDIDOS DE API",
  "Developers Dashboard": "Painel de programadores",
  "Selecione uma fonte de dados": "Selecione uma fonte de dados",
  "Communication": "Comunicação",
  "Business And Data": "Negócio e dados",
  "Dispatch Automation": "Automação de despacho",
  "Driver And Map Experience": "Experiência do motorista e do mapa",
  "Personalizado Campos": "Campos Personalizados",
  "GUIDES": "GUIAS",
  "Setup Focus": "Foco da configuração",
  "Route Deviation Threshold": "Limite de desvio de rota",
  "Late Departure Grace Period": "Período de tolerância de partida atrasada",
  "Operational Alerts": "Alertas operacionais",
  "Fallback Providers": "Provedores de contingência",
  "Routing Optimization Engine": "Motor de otimização de roteamento",
  "Fleet-Ops Routing & Tracking": "Roteamento e rastreio Fleet-Ops",
  "Fleet-Ops Settings": "Definições Fleet-Ops",
  "+ New field group": "+ Novo grupo de campos",
  "New field group": "Novo grupo de campos",
  "No custom field groups": "Sem grupos de campos personalizados",
  "Custom Fields Manager": "Gestor de campos personalizados",
  "Reports guide": "Guia de relatórios",
  "Add the first computed column": "Adicionar a primeira coluna calculada",
  "Computed columns allow you to create calculated fields using SQL expressions": "As colunas calculadas permitem criar campos com expressões SQL",
  "No computed columns defined yet": "Ainda sem colunas calculadas",
  "Choose a table to see available fields": "Escolha uma tabela para ver os campos disponíveis",
  "None selected": "Nenhum selecionado",
  "Search for a column": "Pesquisar uma coluna",
  "Select data source...": "Selecionar fonte de dados...",
  "No source selected": "Nenhuma fonte selecionada",
  "Add Computed Column": "Adicionar coluna calculada",
  "Computed Columns": "Colunas calculadas",
  "Select fields": "Selecionar campos",
  "Data Source": "Fonte de dados",
  "REPORT DETAILS": "DETALHES DO RELATÓRIO",
  "Criar Report": "Criar relatório",
  "Create Report": "Criar relatório",
  "Tags": "Etiquetas",
  "Title": "Título",
  "Execute": "Executar",
  "Preview": "Pré-visualizar",
  "Configuration": "Configuração",
  "Entity": "Entidade",
  "Avatars": "Avatares",
  "Miles": "Milhas",
  "Kilometers": "Quilómetros",
  "Invite": "Convite",
  "invite": "convite",
  "Transport": "Transporte",
  "Sale Price": "Preço de venda",
  "Declared Value": "Valor declarado",
  "Weight": "Peso",
  "Length": "Comprimento",
  "Width": "Largura",
  "Height": "Altura",
  "Description": "Descrição",
  "There is nothing to see here": "Não há nada para ver aqui",
  "Waypoint Completed": "Waypoint concluído",
  "Order Split": "Encomenda dividida",
  "Driver Shift Changed": "Turno do motorista alterado",
  "Prolonged Stoppage": "Paragem prolongada",
  "Route Deviations": "Desvios de rota",
  "Route Deviation": "Desvio de rota",
  "Late Departures": "Partidas atrasadas",
  "Late Departure": "Partida atrasada",
  "Order Completed": "Encomenda concluída",
  "Order Failed": "Encomenda falhada",
  "Order Ping": "Ping da encomenda",
  "Order dispatch Failed": "Falha no despacho da encomenda",
  "Order Dispatch Failed": "Falha no despacho da encomenda",
  "Order Dispatched": "Encomenda despachada",
  "Order Cancelled": "Encomenda cancelada",
  "Order Canceled": "Encomenda cancelada",
  "Order Assigned": "Encomenda atribuída",
  "Camiões": "Camião",
  "SAT": "SÁB",
  "FRI": "SEX",
  "THU": "QUI",
  "WED": "QUA",
  "TUE": "TER",
  "MON": "SEG",
  "SUN": "DOM",
  "Unit": "Unidade",
  "UNIT": "UNIDADE",
  "Fuel": "Combustível",
  "DATES": "DATAS",
  "Parts": "Peças",
  "today": "hoje",
  "DEVICE": "DISPOSITIVO",
  "Guides": "Guias",
  "Issues": "Problemas",
  "Summary": "Resumo",
  "Subject": "Assunto",
  "Records": "Registos",
  "HARDWARE": "HARDWARE",
  "IDENTITY": "IDENTIDADE",
  "Planning": "Planeamento",
  "Staffing": "Pessoal",
  "LAST SYNC": "ÚLTIMA SINCRONIZAÇÃO",
  "Closed At": "Fechado em",
  "Opened At": "Aberto em",
  "Equipment": "Equipamento",
  "Schedules": "Agendamentos",
  "Assign to": "Atribuir a",
  "Not synced": "Não sincronizado",
  "0 warnings": "0 avisos",
  "Asset Type": "Tipo de ativo",
  "ASSIGNMENT": "ATRIBUIÇÃO",
  "online now": "online agora",
  "Compliance": "Conformidade",
  "food truck": "camião",
  "Food truck": "Camião",
  "Food Truck": "Camião",
  "INTEGRATION": "INTEGRAÇÃO",
  "Target Type": "Tipo de alvo",
  "Work Orders": "Ordens de serviço",
  "Inspections": "Inspeções",
  "Maintenance": "Manutenção",
  "food-trucks": "camião",
  "food trucks": "camião",
  "Food trucks": "Camião",
  "Food Trucks": "Camião",
  "Criar Device": "Criar dispositivo",
  "PERFORMED BY": "EXECUTADO POR",
  "Action Queue": "Fila de ações",
  "Maintenances": "Manutenções",
  "vehicle idle": "veículo parado",
  "Connectivity": "Conectividade",
  "October 2026": "Outubro 2026",
  "Review health": "Ver saúde",
  "Assignee Type": "Tipo de responsável",
  "Due This Week": "Vence esta semana",
  "clears 2 gaps": "resolve 2 lacunas",
  "has no driver": "não tem motorista",
  "PROVIDER COUNT": "N.º DE FORNECEDORES",
  "IDENTIFICATION": "IDENTIFICAÇÃO",
  "New work order": "Nova ordem de serviço",
  "Select Warranty": "Selecionar garantia",
  "HEALTH WARNINGS": "AVISOS DE SAÚDE",
  "Select Priority": "Selecionar prioridade",
  "Maintenance Hub": "Centro de manutenção",
  "TELEMATIC DEVICE": "DISPOSITIVO TELEMÁTICO",
  "Select Telematic": "Selecionar telemática",
  "Connect provider": "Ligar fornecedor",
  "Native Providers": "Fornecedores nativos",
  "Connect Provider": "Ligar fornecedor",
  "Connectivity Hub": "Centro de conectividade",
  "Criar Work Order": "Criar ordem de serviço",
  "Inspection Forms": "Formulários de inspeção",
  "Open Work Orders": "Ordens de serviço abertas",
  "WARRANTY & STATUS": "GARANTIA E ESTADO",
  "No spend recorded": "Sem gasto registado",
  "Fuel Integrations": "Integrações de combustível",
  "Performed By Type": "Tipo de executor",
  "Select asset type": "Selecionar tipo de ativo",
  "LINKED WORK ORDER": "ORDEM DE SERVIÇO ASSOCIADA",
  "Criar Maintenance": "Criar manutenção",
  "STATUS & PRIORITY": "ESTADO E PRIORIDADE",
  "Work orders guide": "Guia de ordens de serviço",
  "Inspections guide": "Guia de inspeções",
  "Overdue Schedules": "Agendamentos em atraso",
  "PROVIDER ID / IMEI": "ID DO FORNECEDOR / IMEI",
  "TELEMATIC PROVIDER": "FORNECEDOR TELEMÁTICO",
  "Attach to vehicles": "Associar a veículos",
  "UNATTACHED DEVICES": "DISPOSITIVOS NÃO ASSOCIADOS",
  "connect a provider": "ligar um fornecedor",
  "MAINTAINABLE ASSET": "ATIVO A MANTER",
  "ASSET & WORK ORDER": "ATIVO E ORDEM DE SERVIÇO",
  "Select target type": "Selecionar tipo de alvo",
  "WORK ORDER DETAILS": "DETALHES DA ORDEM DE SERVIÇO",
  "Failed Inspections": "Inspeções reprovadas",
  "Open Due This Week": "Abrir o que vence esta semana",
  "Confirm assignment": "Confirmar atribuição",
  "warning - staffing": "aviso - pessoal",
  "drivers unassigned": "motoristas sem atribuição",
  "Threshold Inclusive": "Limiar inclusivo",
  "LATEST IMPORT SPEND": "GASTO DA ÚLTIMA IMPORTAÇÃO",
  "Connect Integration": "Ligar integração",
  "MAINTENANCE DETAILS": "DETALHES DA MANUTENÇÃO",
  "No open work orders": "Sem ordens de serviço abertas",
  "Select assignee type": "Selecionar tipo de responsável",
  "Inspections And DVIR": "Inspeções e DVIR",
  "Pick another vehicle": "Escolher outro veículo",
  "FUEL CARD INTEGRATION": "INTEGRAÇÃO DE CARTÃO DE COMBUSTÍVEL",
  "Review synced devices": "Ver dispositivos sincronizados",
  "Select performer type": "Selecionar tipo de executor",
  "SCHEDULING & READINGS": "AGENDAMENTO E LEITURAS",
  "Open Open Work Orders": "Abrir ordens de serviço",
  "UNMATCHED IN LAST SYNC": "NÃO CORRESPONDIDOS NA ÚLTIMA SINCRONIZAÇÃO",
  "Connected Fuel Systems": "Sistemas de combustível ligados",
  "CONNECTED INTEGRATIONS": "INTEGRAÇÕES LIGADAS",
  "Open Overdue Schedules": "Abrir agendamentos em atraso",
  "TYPE, STATUS & PRIORITY": "TIPO, ESTADO E PRIORIDADE",
  "Read the guide on Parts": "Ler o guia de Peças",
  "Create inspection forms": "Criar formulários de inspeção",
  "Open Failed Inspections": "Abrir inspeções reprovadas",
  "has no vehicle assigned": "não tem veículo atribuído",
  "UNMATCHED IN LATEST RUNS": "NÃO CORRESPONDIDOS NAS ÚLTIMAS EXECUÇÕES",
  "No open attachment count": "Sem associações pendentes",
  "No fuel connections found": "Nenhuma ligação de combustível encontrada",
  "SINCRONIZADO DISPOSITIVOS": "DISPOSITIVOS SINCRONIZADOS",
  "WORK ORDER CLASSIFICATION": "CLASSIFICAÇÃO DA ORDEM DE SERVIÇO",
  "Ainda sem work encomendas": "Ainda sem ordens de serviço",
  "Add serviceable equipment": "Adicionar equipamento",
  "Report Frequency (Seconds)": "Frequência de reporte (segundos)",
  "INSTALLATION & MAINTENANCE": "INSTALAÇÃO E MANUTENÇÃO",
  "Discovered from providers.": "Descobertos nos fornecedores.",
  "Pesquisar Inspection Forms": "Pesquisar formulários de inspeção",
  "Available Fuel Integrations": "Integrações de combustível disponíveis",
  "Read the guide on Equipment": "Ler o guia de Equipamento",
  "Read the guide on Schedules": "Ler o guia de Agendamentos",
  "Connected provider accounts.": "Contas de fornecedores ligadas.",
  "Auto-generated if left blank": "Gerado automaticamente se ficar em branco",
  "Assigning it ends both gaps.": "Atribuí-lo resolve as duas lacunas.",
  "Ainda sem maintenance records": "Ainda sem registos de manutenção",
  "Read the guide on Work Orders": "Ler o guia de Ordens de serviço",
  "Read the guide on Inspections": "Ler o guia de Inspeções",
  "No open work orders right now.": "Nenhuma ordem de serviço aberta neste momento.",
  "Link to a Work Order (optional)": "Associar a uma ordem de serviço (opcional)",
  "Pesquisar Connected Fuel Systems": "Pesquisar sistemas de combustível",
  "No recurring service is overdue.": "Nenhuma manutenção periódica está em atraso.",
  "Create your first inspection form": "Crie o seu primeiro formulário de inspeção",
  "No failed inspections need review.": "Nenhuma inspeção reprovada precisa de revisão.",
  "Brief description of the work order": "Breve descrição da ordem de serviço",
  "Frequency of sensor reporting in sec": "Frequência de reporte do sensor em segundos",
  "Missing translation \"sensor.fields.max\"": "Máximo",
  "Missing translation \"sensor.fields.min\"": "Mínimo",
  "Brief summary of the maintenance activity": "Breve resumo da atividade de manutenção",
  "Select performer type (Vendor, Driver, etc)": "Selecionar tipo de executor (Fornecedor, Motorista, etc)",
  "Select asset type (Vehicle, Equipment, etc)": "Selecionar tipo de ativo (Veículo, Equipamento, etc)",
  "Maintenance schedules due in the next 7 days.": "Agendamentos de manutenção nos próximos 7 dias.",
  "SASCO B2B fleet fuel transactions and vehicles.": "Transações de combustível B2B SASCO e veículos.",
  "Parts inventory visibility for repair planning.": "Visibilidade do inventário de peças para planeamento.",
  "Maintenance records and service history by asset.": "Registos de manutenção e histórico por ativo.",
  "Assigned equipment and serviceable operational gear.": "Equipamento atribuído e material operacional.",
  "Repair tasks, assignments, vendor work, and closure.": "Tarefas de reparação, atribuições, trabalho de fornecedor e fecho.",
  "Recurring maintenance intervals and service windows.": "Intervalos de manutenção periódica e janelas de serviço.",
  "Publish DVIR and safety checklists drivers can complete.": "Publique DVIR e checklists de segurança para os motoristas.",
  "Submitted DVIRs, failed items, and linked follow-up work.": "DVIRs submetidos, itens reprovados e seguimento associado.",
  "Track tools and equipment that need inspection or service.": "Acompanhe ferramentas e equipamento que precisam de inspeção.",
  "Create a work order when an asset needs repair or service.": "Crie uma ordem de serviço quando um ativo precisar de reparação.",
  "Published forms available for driver and technician checklists.": "Formulários publicados para checklists de motoristas e técnicos.",
  "PetroApp fuel card bills, vehicles, trips, and station locations.": "Faturas de cartão PetroApp, veículos, viagens e estações.",
  "Missing translation 'radar.pills.não atribuído' for locale 'pt-br'": "Não atribuído",
  "Start with a provider connection, then sync devices and attach them to vehicles.": "Comece por ligar um fornecedor, depois sincronize dispositivos e associe-os a veículos.",
  "Build DVIR and safety checklists drivers can submit before defects become downtime.": "Crie DVIR e checklists de segurança que os motoristas podem submeter antes que as falhas parem a operação.",
  "Create work orders to assign maintenance tasks, track progress, and close out repairs.": "Crie ordens de serviço para atribuir tarefas, acompanhar progresso e fechar reparações.",
  "Plan recurring service, coordinate work orders, and keep assets ready for daily operations.": "Planeie manutenção periódica, coordene ordens de serviço e mantenha os ativos prontos para o dia a dia.",
  "Connect telematics providers, sync devices, attach them to vehicles, and monitor telemetry health from one workflow.": "Ligue fornecedores de telemática, sincronize dispositivos, associe-os a veículos e monitore a saúde da telemetria num só fluxo.",
  "All": "Todos",
  "Tip": "Gorjeta",
  "Name": "Nome",
  "Book": "Reservar",
  "None": "Nenhuma",
  "ASAP": "Logo que possível",
  "Next": "Seguinte",
  "Type": "Tipo",
  "Done": "Concluído",
  "ORDER": "ENCOMENDA",
  "Total": "Total",
  "Apply": "Aplicar",
  "Clear": "Limpar",
  "Items": "Itens",
  "Order": "Encomenda",
  "Draft": "Rascunho",
  "DRIVER": "MOTORISTA",
  "Orders": "Encomendas",
  "Custom": "Personalizado",
  "Method": "Método",
  "Placed": "Feita em",
  "Pickup": "Levantamento",
  "Drafts": "Rascunhos",
  "Revenue": "Receita",
  "REVENUE": "RECEITA",
  "BOOKING": "RESERVA",
  "SUMMARY": "RESUMO",
  "PAYMENT": "PAGAMENTO",
  "Dropoff": "Entrega",
  "Columns": "Colunas",
  "On sale": "Em promoção",
  "Catalogs": "Catálogos",
  "PROVIDER": "PRESTADOR",
  "Subtotal": "Subtotal",
  "Schedule": "Agendar",
  "Delivery": "Entrega",
  "CUSTOMER": "CLIENTE",
  "Customer": "Cliente",
  "PROMOTION": "PROMOÇÃO",
  "New order": "Nova encomenda",
  "Published": "Publicados",
  "Low stock": "Stock baixo",
  "All orders": "Todas as encomendas",
  "Travel fee": "Taxa de deslocação",
  "Deliver to": "Entregar em",
  "Updated By": "Atualizado por",
  "Created By": "Criado por",
  "Updated At": "Atualizado em",
  "Sort: name": "Ordenar: nome",
  "Categories": "Categorias",
  "1 category": "1 categoria",
  "Sem catalog": "Sem catálogo",
  "New catalog": "Novo catálogo",
  "Active only": "Só ativas",
  "Place order": "Fazer encomenda",
  "Order notes": "Notas da encomenda",
  "Leaves from": "Parte de",
  "FULFILLMENT": "CUMPRIMENTO",
  "Select user": "Selecionar utilizador",
  "Internal ID": "ID interno",
  "Fulfillment": "Cumprimento",
  "New booking": "Nova reserva",
  "Unavailable": "Indisponível",
  "New product": "Novo produto",
  "Catalog name": "Nome do catálogo",
  "No hours set": "Sem horário definido",
  "At the store": "Na loja",
  "Delivery fee": "Taxa de entrega",
  "New customer": "Novo cliente",
  "Scheduled At": "Agendado para",
  "Start Upload": "Iniciar carregamento",
  "Smart groups": "Grupos inteligentes",
  "SMART GROUPS": "GRUPOS INTELIGENTES",
  "All products": "Todos os produtos",
  "Recent Orders": "Encomendas recentes",
  "Any available": "Qualquer disponível",
  "No orders yet": "Ainda sem encomendas",
  "Search orders": "Pesquisar encomendas",
  "Uncategorized": "Sem categoria",
  "Uncategorised": "Sem categoria",
  "Create catalog": "Criar catálogo",
  "Add a service.": "Adicione um serviço.",
  "WHEN AND WHERE": "QUANDO E ONDE",
  "PROMOTION CODE": "CÓDIGO PROMOCIONAL",
  "Manage add-ons": "Gerir complementos",
  "Create and open": "Criar e abrir",
  "Search catalogs": "Pesquisar catálogos",
  "across 0 orders": "em 0 encomendas",
  "CART CONVERSION": "CONVERSÃO DO CARRINHO",
  "Needs attention": "Precisa de atenção",
  "Choose a driver": "Escolher um motorista",
  "Service address": "Endereço do serviço",
  "Another address": "Outro endereço",
  "Tracking Number": "Número de rastreio",
  "Driver Assigned": "Motorista atribuído",
  "Search products": "Pesquisar produtos",
  "No recent orders": "Sem encomendas recentes",
  "Pick a customer.": "Escolha um cliente.",
  "Cash on delivery": "Pagamento na entrega",
  "{count} category": "{count} categoria",
  "orders to confirm": "encomendas por confirmar",
  "Customize Columns": "Personalizar colunas",
  "No previous period": "Sem período anterior",
  "Cash after the job": "Dinheiro após o serviço",
  "Subtotal · 0 items": "Subtotal · 0 itens",
  "{count} categories": "{count} categorias",
  "AVERAGE ORDER VALUE": "VALOR MÉDIO DA ENCOMENDA",
  "Upload Spreadsheets": "Carregar folhas de cálculo",
  "No recent orders yet": "Ainda sem encomendas recentes",
  "No product sales yet": "Ainda sem vendas de produtos",
  "Storefront Dashboard": "Painel da loja",
  "Access and job notes": "Acesso e notas do serviço",
  "No recent orders yet.": "Ainda sem encomendas recentes.",
  "No product sales yet.": "Ainda sem vendas de produtos.",
  "across {count} orders": "em {count} encomendas",
  "SERVICES AND PRODUCTS": "SERVIÇOS E PRODUTOS",
  "Select order customer": "Selecionar cliente da encomenda",
  "Sort: recently updated": "Ordenar: atualizados recentemente",
  "Best sellers by revenue": "Mais vendidos por receita",
  "Select driver for order": "Selecionar motorista da encomenda",
  "Pick the store location.": "Escolha o local da loja.",
  "Pick the service address.": "Escolha o endereço do serviço.",
  "At the customer's address": "No endereço do cliente",
  "Add at least one product.": "Adicione pelo menos um produto.",
  "The provider sets off from": "O prestador parte de",
  "Pick a time for the booking": "Escolha uma hora para a reserva",
  "Search the store's products": "Pesquisar produtos da loja",
  "Select order pickup location": "Selecionar local de levantamento",
  "Select order dropoff location": "Selecionar local de entrega",
  "Nothing waiting on you right now": "Nada à espera de si neste momento",
  "nothing waiting on you right now": "nada à espera de si neste momento",
  "Import products via spreadsheets": "Importar produtos via folhas de cálculo",
  "Nothing waiting on you right now.": "Nada à espera de si neste momento.",
  "or select spreadsheets to upload.": "ou selecione folhas de cálculo para carregar.",
  "the order form, opened on services": "o formulário de encomenda, aberto em serviços",
  "ready for pickup - Customers notified": "prontas para levantamento — clientes notificados",
  "ready for pickup - customers notified": "prontas para levantamento — clientes notificados",
  "Pick where the order is delivered to.": "Escolha onde a encomenda é entregue.",
  "Anything the store or driver should know": "Qualquer coisa que a loja ou o motorista devam saber",
  "Search customers by name, phone or email": "Pesquisar clientes por nome, telefone ou email",
  "ITEMS from the store's published products": "ITENS dos produtos publicados da loja",
  "Pick a customer to see their saved places.": "Escolha um cliente para ver os locais guardados.",
  "Picking a customer fills the places below.": "Ao escolher um cliente, os locais abaixo são preenchidos.",
  "Assign a driver when the booking is confirmed": "Atribuir um motorista quando a reserva for confirmada",
  "Add a service to see its free days and times.": "Adicione um serviço para ver dias e horários livres.",
  "Drag and drop spreadsheet files onto this dropzone": "Arraste e largue ficheiros de folhas de cálculo nesta zona",
  "Services and the products the provider brings along": "Serviços e os produtos que o prestador leva",
  "a console order follows the same flow as an app order": "uma encomenda da consola segue o mesmo fluxo que uma encomenda da app",
  "This store has no locations yet; add one under Settings.": "Esta loja ainda não tem locais; adicione um em Definições.",
  "Click a product to add it; products with options ask first.": "Clique num produto para o adicionar; produtos com opções pedem primeiro.",
  "A store location; its hours decide what the catalog offers.": "Um local da loja; o horário define o que o catálogo oferece.",
  "Orders placed in the app and from the console show up here.": "As encomendas feitas na app e na consola aparecem aqui.",
  "Orders placed through the app and the console, newest first": "Encomendas feitas na app e na consola, mais recentes primeiro",
  "Orders placed through the app and the console, newest first.": "Encomendas feitas na app e na consola, mais recentes primeiro.",
  "For example: key with the concierge, cat in the second bedroom": "Por exemplo: chave com o porteiro, gato no segundo quarto",
  "Organize products for browsing. Click a caret to fold a category.": "Organize os produtos para navegação. Clique na seta para recolher uma categoria.",
  "Organise products for browsing. Click a caret to fold a category.": "Organize os produtos para navegação. Clique na seta para recolher uma categoria.",
  "The provider goes to the customer, or the customer comes to the store.": "O prestador vai ao cliente, ou o cliente vem à loja.",
  "Paid now is recorded as paid; otherwise the provider collects after the job.": "Pago agora fica como pago; caso contrário o prestador cobra após o serviço.",
  "Card payments are collected in the app; a console order is cash or already paid.": "Pagamentos com cartão são feitos na app; uma encomenda da consola é em dinheiro ou já paga.",
  "Create a catalog to group products into a menu with its own categories and hours.": "Crie um catálogo para agrupar produtos num menu com as suas categorias e horários.",
  "Give the catalog a name; you add categories, products, hours and who serves it next.": "Dê um nome ao catálogo; a seguir adiciona categorias, produtos, horários e quem o serve.",
  "Pickup hides the dropoff and the delivery fee; Schedule adds a time within store hours.": "Levantamento esconde a entrega e a taxa; Agendar adiciona uma hora dentro do horário da loja.",
  "Previous Period": "Período anterior",
  "Live Fleet Map": "Mapa da frota ao vivo",
  "Accounts Receivable": "Contas a receber",
  "Net Revenue": "Receita líquida",
  "Drivers Online": "Motoristas online",
  "Active Orders": "Encomendas ativas",
  "AR vencido": "Contas a receber vencidas",
  "Manutenção Visão geral": "Visão geral da manutenção",
  "Concluído Encomendas": "Encomendas concluídas",
  "Ativo Encomendas": "Encomendas ativas",
  "Período Anterior — Atual": "Período atual",
  "Período Anterior — Current": "Período atual",
  "Current": "Atual",
  "MTD": "Mês",
  "On-time": "No prazo",
  "Next 7d": "Próx. 7d",
  "Overdue": "Em atraso",
  "One place for offers, the campaigns that announce them, the segments they target, and the pushes that go out.": "Um só lugar para ofertas, campanhas, segmentos e notificações.",
  "What the app shows is the union of the assigned catalogs that are within their hours.": "O que a app mostra é a união dos catálogos atribuídos dentro do respetivo horário.",
  "Crie um catálogo para agrupar produtos num menu com as suas categorias e horários.": "Crie um catálogo para agrupar produtos num menu com as suas categorias e horários.",
  "No customers yet. They appear here after their first order or sign-up.": "Ainda sem clientes. Aparecem após a primeira encomenda ou registo.",
  "A Fleet-Ops vehicle that sells from a catalog inside a service area.": "Um veículo que vende a partir de um catálogo numa área de serviço.",
  "Organize os produtos para navegação. Clique na seta para recolher uma categoria.": "Organize os produtos para navegação. Clique na seta para recolher uma categoria.",
  "Encomendas feitas na app e na consola, mais recentes primeiro.": "Encomendas na app e na consola, mais recentes primeiro.",
  "No catalogs to assign yet. Create one on the Catalogs page.": "Ainda não há catálogos para atribuir. Crie um na página Catálogos.",
  "As encomendas feitas na app e na consola aparecem aqui.": "As encomendas da app e da consola aparecem aqui.",
  "Add a truck to sell from a vehicle inside a service area.": "Adicione um camião para vender a partir de um veículo numa área de serviço.",
  "Send promotional push notifications to your customers": "Envie notificações push promocionais aos seus clientes",
  "Pick the vehicle, where it serves and what it sells.": "Escolha o veículo, onde serve e o que vende.",
  "Create a promotion to offer discounts at checkout.": "Crie uma promoção para oferecer descontos no checkout.",
  "Select customers to send notification to": "Selecione os clientes a quem enviar",
  "People who have ordered from this store": "Pessoas que encomendaram nesta loja",
  "prontas para levantamento — clientes notificados": "prontas para levantamento — clientes notificados",
  "prontas para levantamento — clientes notificados": "prontas para levantamento — clientes notificados",
  "Select the vehicle for this truck": "Selecione o veículo para este camião",
  "Nada à espera de si neste momento.": "Nada à espera de si neste momento.",
  "Nada à espera de si neste momento": "Nada à espera de si neste momento",
  "This page could not be loaded": "Esta página não pôde ser carregada",
  "There is nothing to see here.": "Não há nada para ver aqui.",
  "Enter notification message": "Introduza a mensagem da notificação",
  "Pick a service area first": "Escolha primeiro uma área de serviço",
  "Enter notification title": "Introduza o título da notificação",
  "Send Push Notifications": "Enviar notificações push",
  "Mais vendidos por receita": "Mais vendidos por receita",
  "Ordenar: atualizados recentemente": "Ordenar: atualizados recentemente",
  "Where the truck serves": "Onde o camião serve",
  "CATALOGS ON THIS TRUCK": "CATÁLOGOS NESTE CAMIÃO",
  "Next: When it applies": "Seguinte: Quando se aplica",
  "Ainda sem vendas de produtos.": "Ainda sem vendas de produtos.",
  "Ainda sem encomendas recentes.": "Ainda sem encomendas recentes.",
  "Select All Customers": "Selecionar todos os clientes",
  "Painel da loja": "Painel da loja",
  "Ainda sem vendas de produtos": "Ainda sem vendas de produtos",
  "Ainda sem encomendas recentes": "Ainda sem encomendas recentes",
  "Schedule and limits": "Horário e limites",
  "Review and announce": "Rever e anunciar",
  "VALOR MÉDIO DA ENCOMENDA": "VALOR MÉDIO DA ENCOMENDA",
  "Push Notifications": "Notificações push",
  "Notification Title": "Título da notificação",
  "Sem período anterior": "Sem período anterior",
  "No promotions yet": "Ainda sem promoções",
  "Notification Body": "Corpo da notificação",
  "encomendas por confirmar": "encomendas por confirmar",
  "Back to dashboard": "Voltar ao painel",
  "VEHICLE AND CREW": "VEÍCULO E EQUIPA",
  "Select Customers": "Selecionar clientes",
  "Search customers": "Pesquisar clientes",
  "Sem encomendas recentes": "Sem encomendas recentes",
  "Pesquisar produtos": "Pesquisar produtos",
  "Unsaved changes": "Alterações não guardadas",
  "Pesquisar catálogos": "Pesquisar catálogos",
  "When it applies": "Quando se aplica",
  "Precisa de atenção": "Precisa de atenção",
  "CONVERSÃO DO CARRINHO": "CONVERSÃO DO CARRINHO",
  "em 0 encomendas": "em 0 encomendas",
  "Gerir complementos": "Gerir complementos",
  "Criar catálogo": "Criar catálogo",
  "Percentage off": "Percentagem de desconto",
  "Sem categoria": "Sem categoria",
  "Search trucks": "Pesquisar camiões",
  "New promotion": "Nova promoção",
  "Free delivery": "Entrega grátis",
  "Pesquisar encomendas": "Pesquisar encomendas",
  "Ainda sem encomendas": "Ainda sem encomendas",
  "Encomendas recentes": "Encomendas recentes",
  "Todos os produtos": "Todos os produtos",
  "GRUPOS INTELIGENTES": "GRUPOS INTELIGENTES",
  "Create truck": "Criar camião",
  "Service area": "Área de serviço",
  "Sem horário definido": "Sem horário definido",
  "Novo produto": "Novo produto",
  "Indisponível": "Indisponível",
  "Novo catálogo": "Novo catálogo",
  "Sem catálogo": "Sem catálogo",
  "Redemptions": "Resgates",
  "Buy X get Y": "Compre X leve Y",
  "Percent off": "Percentagem de desconto",
  "Whole store": "Loja inteira",
  "Nova reserva": "Nova reserva",
  "Só ativas": "Só ativas",
  "Camião": "Camiões",
  "Categorias": "Categorias",
  "Ordenar: nome": "Ordenar: nome",
  "Promotions": "Promoções",
  "Amount off": "Valor de desconto",
  "Save draft": "Guardar rascunho",
  "Todas as encomendas": "Todas as encomendas",
  "Camião": "Camião",
  "Stock baixo": "Stock baixo",
  "Publicados": "Publicados",
  "New truck": "Novo camião",
  "Sem truck": "Sem camião",
  "Campaigns": "Campanhas",
  "Scheduled": "Agendado",
  "Nova encomenda": "Nova encomenda",
  "Try again": "Tentar novamente",
  "Fleetbase": "Faucon",
  "Catálogos": "Catálogos",
  "Segments": "Segmentos",
  "Em promoção": "Em promoção",
  "Discard": "Descartar",
  "Targets": "Alvos",
  "Colunas": "Colunas",
  "RECEITA": "RECEITA",
  "Discard": "Descartar",
  "Rascunhos": "Rascunhos",
  "Trucks": "Camião",
  "Paused": "Em pausa",
  "Active": "Ativo",
  "Create": "Criar",
  "Rascunho": "Rascunho",
  "Truck": "Camião",
  "Ended": "Terminado",
  "Nome": "Nome",
  "Todos": "Todos",
  "Map": "Mapa"

  };
  var PHRASES = [
"Connect telematics providers, sync devices, attach them to vehicles, and monitor telemetry health from one workflow.",
"One place for offers, the campaigns that announce them, the segments they target, and the pushes that go out.",
"Plan recurring service, coordinate work orders, and keep assets ready for daily operations.",
"Pickup hides the dropoff and the delivery fee; Schedule adds a time within store hours.",
"Create work orders to assign maintenance tasks, track progress, and close out repairs.",
"What the app shows is the union of the assigned catalogs that are within their hours.",
"Give the catalog a name; you add categories, products, hours and who serves it next.",
"Build DVIR and safety checklists drivers can submit before defects become downtime.",
"Crie um catálogo para agrupar produtos num menu com as suas categorias e horários.",
"Create a catalog to group products into a menu with its own categories and hours.",
"Start with a provider connection, then sync devices and attach them to vehicles.",
"Card payments are collected in the app; a console order is cash or already paid.",
"Organize os produtos para navegação. Clique na seta para recolher uma categoria.",
"Computed columns allow you to create calculated fields using SQL expressions",
"Paid now is recorded as paid; otherwise the provider collects after the job.",
"The provider goes to the customer, or the customer comes to the store.",
"No customers yet. They appear here after their first order or sign-up.",
"A Fleet-Ops vehicle that sells from a catalog inside a service area.",
"Missing translation 'radar.pills.não atribuído' for locale 'pt-br'",
"PetroApp fuel card bills, vehicles, trips, and station locations.",
"Organize products for browsing. Click a caret to fold a category.",
"Organise products for browsing. Click a caret to fold a category.",
"Published forms available for driver and technician checklists.",
"For example: key with the concierge, cat in the second bedroom",
"Encomendas feitas na app e na consola, mais recentes primeiro.",
"Orders placed through the app and the console, newest first.",
"Click a product to add it; products with options ask first.",
"A store location; its hours decide what the catalog offers.",
"Orders placed in the app and from the console show up here.",
"Orders placed through the app and the console, newest first",
"No catalogs to assign yet. Create one on the Catalogs page.",
"Track tools and equipment that need inspection or service.",
"Create a work order when an asset needs repair or service.",
"Submitted DVIRs, failed items, and linked follow-up work.",
"Add a truck to sell from a vehicle inside a service area.",
"Publish DVIR and safety checklists drivers can complete.",
"This store has no locations yet; add one under Settings.",
"As encomendas feitas na app e na consola aparecem aqui.",
"a console order follows the same flow as an app order",
"Send promotional push notifications to your customers",
"Assigned equipment and serviceable operational gear.",
"Repair tasks, assignments, vendor work, and closure.",
"Recurring maintenance intervals and service windows.",
"Pick the vehicle, where it serves and what it sells.",
"Services and the products the provider brings along",
"Drag and drop spreadsheet files onto this dropzone",
"Create a promotion to offer discounts at checkout.",
"Maintenance records and service history by asset.",
"prontas para levantamento — clientes notificados",
"prontas para levantamento — clientes notificados",
"SASCO B2B fleet fuel transactions and vehicles.",
"Parts inventory visibility for repair planning.",
"Maintenance schedules due in the next 7 days.",
"Assign a driver when the booking is confirmed",
"Add a service to see its free days and times.",
"Select performer type (Vendor, Driver, etc)",
"Select asset type (Vehicle, Equipment, etc)",
"Pick a customer to see their saved places.",
"Picking a customer fills the places below.",
"Brief summary of the maintenance activity",
"ITEMS from the store's published products",
"Anything the store or driver should know",
"Search customers by name, phone or email",
"Select customers to send notification to",
"Missing translation \"sensor.fields.max\"",
"Missing translation \"sensor.fields.min\"",
"People who have ordered from this store",
"Choose a table to see available fields",
"ready for pickup - Customers notified",
"ready for pickup - customers notified",
"Pick where the order is delivered to.",
"Frequency of sensor reporting in sec",
"Brief description of the work order",
"No failed inspections need review.",
"the order form, opened on services",
"Nada à espera de si neste momento.",
"Create your first inspection form",
"Nothing waiting on you right now.",
"or select spreadsheets to upload.",
"Select the vehicle for this truck",
"Nada à espera de si neste momento",
"Ordenar: atualizados recentemente",
"Pesquisar Connected Fuel Systems",
"No recurring service is overdue.",
"Nothing waiting on you right now",
"nothing waiting on you right now",
"Import products via spreadsheets",
"No computed columns defined yet",
"Link to a Work Order (optional)",
"No open work orders right now.",
"Ainda sem encomendas recentes.",
"Add the first computed column",
"Ainda sem maintenance records",
"Read the guide on Work Orders",
"Read the guide on Inspections",
"Select order dropoff location",
"This page could not be loaded",
"There is nothing to see here.",
"Ainda sem vendas de produtos.",
"Ainda sem encomendas recentes",
"Selecione uma fonte de dados",
"Fleet-Ops Routing & Tracking",
"There is nothing to see here",
"Connected provider accounts.",
"Auto-generated if left blank",
"Assigning it ends both gaps.",
"Select order pickup location",
"Ainda sem vendas de produtos",
"Late Departure Grace Period",
"Routing Optimization Engine",
"Available Fuel Integrations",
"Read the guide on Equipment",
"Read the guide on Schedules",
"Pick a time for the booking",
"Search the store's products",
"Report Frequency (Seconds)",
"INSTALLATION & MAINTENANCE",
"Discovered from providers.",
"Pesquisar Inspection Forms",
"The provider sets off from",
"Período Anterior — Current",
"Enter notification message",
"Driver And Map Experience",
"Route Deviation Threshold",
"No fuel connections found",
"SINCRONIZADO DISPOSITIVOS",
"WORK ORDER CLASSIFICATION",
"Ainda sem work encomendas",
"Add serviceable equipment",
"Pick the service address.",
"At the customer's address",
"Add at least one product.",
"Pick a service area first",
"Mais vendidos por receita",
"UNMATCHED IN LATEST RUNS",
"No open attachment count",
"Pick the store location.",
"Período Anterior — Atual",
"Enter notification title",
"VALOR MÉDIO DA ENCOMENDA",
"encomendas por confirmar",
"TYPE, STATUS & PRIORITY",
"Read the guide on Parts",
"Create inspection forms",
"Open Failed Inspections",
"has no vehicle assigned",
"Best sellers by revenue",
"Select driver for order",
"Send Push Notifications",
"Sem encomendas recentes",
"No custom field groups",
"UNMATCHED IN LAST SYNC",
"Connected Fuel Systems",
"CONNECTED INTEGRATIONS",
"Open Overdue Schedules",
"Sort: recently updated",
"Manutenção Visão geral",
"Where the truck serves",
"CATALOGS ON THIS TRUCK",
"Custom Fields Manager",
"Select data source...",
"Order dispatch Failed",
"Order Dispatch Failed",
"FUEL CARD INTEGRATION",
"Review synced devices",
"Select performer type",
"SCHEDULING & READINGS",
"Open Open Work Orders",
"No recent orders yet.",
"No product sales yet.",
"across {count} orders",
"SERVICES AND PRODUCTS",
"Select order customer",
"Next: When it applies",
"CONVERSÃO DO CARRINHO",
"Personalizado Campos",
"Driver Shift Changed",
"Select assignee type",
"Inspections And DVIR",
"Pick another vehicle",
"No recent orders yet",
"No product sales yet",
"Storefront Dashboard",
"Access and job notes",
"Concluído Encomendas",
"Select All Customers",
"Sem período anterior",
"Pesquisar encomendas",
"Ainda sem encomendas",
"Sem horário definido",
"Dispatch Automation",
"Search for a column",
"Add Computed Column",
"Threshold Inclusive",
"LATEST IMPORT SPEND",
"Connect Integration",
"MAINTENANCE DETAILS",
"No open work orders",
"AVERAGE ORDER VALUE",
"Upload Spreadsheets",
"Accounts Receivable",
"Schedule and limits",
"Review and announce",
"Pesquisar catálogos",
"Encomendas recentes",
"GRUPOS INTELIGENTES",
"Todas as encomendas",
"Operational Alerts",
"Fallback Providers",
"Fleet-Ops Settings",
"No source selected",
"Waypoint Completed",
"Prolonged Stoppage",
"PROVIDER ID / IMEI",
"TELEMATIC PROVIDER",
"Attach to vehicles",
"UNATTACHED DEVICES",
"connect a provider",
"MAINTAINABLE ASSET",
"ASSET & WORK ORDER",
"Select target type",
"WORK ORDER DETAILS",
"Failed Inspections",
"Open Due This Week",
"Confirm assignment",
"warning - staffing",
"drivers unassigned",
"No previous period",
"Cash after the job",
"Subtotal · 0 items",
"{count} categories",
"Push Notifications",
"Notification Title",
"Pesquisar produtos",
"Precisa de atenção",
"Gerir complementos",
"Business And Data",
"+ New field group",
"WARRANTY & STATUS",
"No spend recorded",
"Fuel Integrations",
"Performed By Type",
"Select asset type",
"LINKED WORK ORDER",
"Criar Maintenance",
"STATUS & PRIORITY",
"Work orders guide",
"Inspections guide",
"Overdue Schedules",
"orders to confirm",
"Customize Columns",
"No promotions yet",
"Notification Body",
"Back to dashboard",
"Todos os produtos",
"Computed Columns",
"Route Deviations",
"Order Dispatched",
"TELEMATIC DEVICE",
"Select Telematic",
"Connect provider",
"Native Providers",
"Connect Provider",
"Connectivity Hub",
"Criar Work Order",
"Inspection Forms",
"Open Work Orders",
"No recent orders",
"Pick a customer.",
"Cash on delivery",
"{count} category",
"Ativo Encomendas",
"VEHICLE AND CREW",
"Select Customers",
"Search customers",
"New field group",
"Route Deviation",
"Late Departures",
"Order Completed",
"Order Cancelled",
"Select Warranty",
"HEALTH WARNINGS",
"Select Priority",
"Maintenance Hub",
"Create and open",
"Search catalogs",
"across 0 orders",
"CART CONVERSION",
"Needs attention",
"Choose a driver",
"Service address",
"Another address",
"Tracking Number",
"Driver Assigned",
"Search products",
"Previous Period",
"Unsaved changes",
"When it applies",
"em 0 encomendas",
"REPORT DETAILS",
"Declared Value",
"Late Departure",
"Order Canceled",
"Order Assigned",
"PROVIDER COUNT",
"IDENTIFICATION",
"New work order",
"Create catalog",
"Add a service.",
"WHEN AND WHERE",
"PROMOTION CODE",
"Manage add-ons",
"Live Fleet Map",
"Drivers Online",
"Painel da loja",
"Criar catálogo",
"Percentage off",
"Nova encomenda",
"Communication",
"Reports guide",
"None selected",
"Select fields",
"Create Report",
"Configuration",
"Review health",
"Assignee Type",
"Due This Week",
"clears 2 gaps",
"has no driver",
"Recent Orders",
"Any available",
"No orders yet",
"Search orders",
"Uncategorized",
"Uncategorised",
"Active Orders",
"Sem categoria",
"Search trucks",
"New promotion",
"Free delivery",
"Novo catálogo",
"Ordenar: nome",
"Criar Report",
"Order Failed",
"Criar Device",
"PERFORMED BY",
"Action Queue",
"Maintenances",
"vehicle idle",
"Connectivity",
"October 2026",
"Catalog name",
"No hours set",
"At the store",
"Delivery fee",
"New customer",
"Scheduled At",
"Start Upload",
"Smart groups",
"SMART GROUPS",
"All products",
"Create truck",
"Service area",
"Novo produto",
"Indisponível",
"Sem catálogo",
"Nova reserva"
  ];
  var ATTRS = ["placeholder", "title", "aria-label", "alt"];
  var SKIP = /^(SCRIPT|STYLE|NOSCRIPT|TEXTAREA|CODE|PRE|KBD|SVG|PATH|MATH)$/i;
  var scheduled = false;

  function getLocale() {
    try {
      var raw = localStorage.getItem("@fleetbase/storage:user-options");
      var opts = raw ? JSON.parse(raw) : {};
      var loc = opts.locale || "";
      Object.keys(opts).forEach(function (k) {
        if (String(k).endsWith(":locale") && opts[k]) loc = opts[k];
      });
      return String(loc || "").toLowerCase();
    } catch (e) { return ""; }
  }

  function isPortuguese(loc) {
    if (!loc) return true;
    return loc === "pt" || loc.indexOf("pt-") === 0 || loc.indexOf("pt_") === 0;
  }

  function normalizePtLocale() {
    try {
      var key = "@fleetbase/storage:user-options";
      var raw = localStorage.getItem(key);
      var opts = raw ? JSON.parse(raw) : {};
      var changed = false;
      function norm(v) {
        if (!v) return v;
        var s = String(v).toLowerCase();
        if (s === "pt" || s === "pt-pt" || s === "pt_pt" || s.indexOf("pt-") === 0 || s.indexOf("pt_") === 0) {
          if (s !== "pt-br") { changed = true; return "pt-br"; }
        }
        return v;
      }
      Object.keys(opts).forEach(function (k) {
        if (k === "locale" || String(k).endsWith(":locale")) {
          var n = norm(opts[k]);
          if (n !== opts[k]) opts[k] = n;
        }
      });
      if (!opts.locale) { opts.locale = "pt-br"; changed = true; }
      if (changed || !raw) localStorage.setItem(key, JSON.stringify(opts));
    } catch (e) {}
  }

  function translateText(text) {
    if (text == null) return text;
    var m = String(text).match(/^(\s*)([\s\S]*?)(\s*)$/);
    if (!m) return text;
    var lead = m[1], core = m[2], trail = m[3];
    if (!core) return text;
    if (Object.prototype.hasOwnProperty.call(DICT, core)) return lead + DICT[core] + trail;
    var num = core.match(/^(\d+)\s+(.+)$/);
    if (num && Object.prototype.hasOwnProperty.call(DICT, num[2])) {
      return lead + num[1] + " " + DICT[num[2]] + trail;
    }
    if (core.length >= 12) {
      var out = core;
      for (var i = 0; i < PHRASES.length; i++) {
        var k = PHRASES[i];
        if (out.indexOf(k) !== -1) out = out.split(k).join(DICT[k]);
      }
      if (out !== core) return lead + out + trail;
    }
    return text;
  }

  function translateNode(node) {
    if (!node || node.nodeType !== 3) return;
    var p = node.parentElement;
    if (!p || SKIP.test(p.tagName) || p.isContentEditable) return;
    if (p.closest && p.closest("[data-no-pt],code,pre,.monaco-editor,.cm-editor,input,textarea")) return;
    var next = translateText(node.nodeValue);
    if (next !== node.nodeValue) node.nodeValue = next;
  }

  function translateAttrs(el) {
    if (!el || el.nodeType !== 1) return;
    for (var i = 0; i < ATTRS.length; i++) {
      var a = ATTRS[i];
      if (!el.hasAttribute(a)) continue;
      var v = el.getAttribute(a);
      var nv = translateText(v);
      if (nv !== v) el.setAttribute(a, nv);
    }
    if (el.tagName === "INPUT" && /^(button|submit|reset)$/i.test(el.type) && el.value) {
      var xv = translateText(el.value);
      if (xv !== el.value) el.value = xv;
    }
  }

  function walk(root) {
    if (!root) return;
    if (root.nodeType === 1) translateAttrs(root);
    var tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, null);
    var n;
    while ((n = tw.nextNode())) {
      if (n.nodeType === 3) translateNode(n);
      else if (n.nodeType === 1) translateAttrs(n);
    }
  }

  function run() {
    normalizePtLocale();
    if (!isPortuguese(getLocale())) return;
    walk(document.body);
  }

  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(function () {
      scheduled = false;
      run();
    });
  }

  function hookIntl() {
    try {
      if (!window.Ember || !Ember.Namespace || !Ember.Namespace.NAMESPACES) return false;
      var app = Ember.Namespace.NAMESPACES.find(function (n) { return n && n.__container__; });
      if (!app) return false;
      var intl = app.__container__.lookup("service:intl");
      if (!intl || intl.__ptHooked) return !!intl;
      intl.__ptHooked = true;
      var orig = intl.setLocale.bind(intl);
      intl.setLocale = function (locale) {
        var first = Array.isArray(locale) ? locale[0] : locale;
        if (first && String(first).toLowerCase().indexOf("pt") === 0) {
          locale = Array.isArray(locale) ? ["pt-br"] : "pt-br";
        }
        var r = orig(locale);
        setTimeout(schedule, 30);
        setTimeout(schedule, 300);
        setTimeout(schedule, 1000);
        return r;
      };
      if (intl.onLocaleChanged) intl.onLocaleChanged(schedule);
      return true;
    } catch (e) { return false; }
  }

  normalizePtLocale();
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", schedule);
  else schedule();
  window.addEventListener("load", function () {
    schedule();
    var tries = 0;
    var t = setInterval(function () {
      if (hookIntl() || ++tries > 50) clearInterval(t);
      schedule();
    }, 400);
  });
  window.addEventListener("storage", schedule);

  new MutationObserver(function (muts) {
    if (!isPortuguese(getLocale())) return;
    for (var i = 0; i < muts.length; i++) {
      var m = muts[i];
      if (m.type === "characterData") translateNode(m.target);
      else if (m.type === "childList") {
        m.addedNodes.forEach(function (n) {
          if (n.nodeType === 3) translateNode(n);
          else if (n.nodeType === 1) walk(n);
        });
      } else if (m.type === "attributes") translateAttrs(m.target);
    }
  }).observe(document.documentElement, {
    childList: true, subtree: true, characterData: true,
    attributes: true, attributeFilter: ATTRS
  });

  setInterval(function () { if (isPortuguese(getLocale())) walk(document.body); }, 3000);


  var TITLE_MAP={
    "Atividade financeira recente":"ledger-activity-feed",
    "Recent Financial Activity":"ledger-activity-feed",
    "Resumo do fluxo de caixa":"ledger-cash-flow-summary",
    "Cash Flow Summary":"ledger-cash-flow-summary"
  };
  function itemOf(n){
    if(!n) return null;
    return n.classList && n.classList.contains("grid-stack-item") ? n : (n.closest ? n.closest(".grid-stack-item") : null);
  }
  function findById(id){
    var sels=[
      '.grid-stack-item#'+CSS.escape(id),
      '.grid-stack-item[id="'+id+'"]',
      '.grid-stack-item[gs-id="'+id+'"]',
      '.grid-stack-item[data-gs-id="'+id+'"]',
      '#'+CSS.escape(id)
    ];
    for(var i=0;i<sels.length;i++){
      try{
        var el=document.querySelector(sels[i]);
        var item=itemOf(el);
        if(item) return item;
      }catch(e){}
    }
    return null;
  }
  function findByTitle(){
    var found={};
    var titles=document.querySelectorAll(".ledger-widget-title, .ledger-dashboard-widget .ledger-widget-title");
    titles.forEach(function(t){
      var key=(t.textContent||"").trim();
      var id=TITLE_MAP[key];
      if(!id) return;
      var item=itemOf(t);
      if(item) found[id]=item;
    });
    return found;
  }
  function fixItem(el, cfg, y){
    if(!el||!cfg) return;
    try{
      var opts={w:cfg.w,x:cfg.x};
      if(typeof y==="number") opts.y=y;
      el.setAttribute("gs-w", String(opts.w));
      el.setAttribute("gs-x", String(opts.x));
      if(typeof opts.y==="number") el.setAttribute("gs-y", String(opts.y));
      if(el.gridstackNode){
        el.gridstackNode.w=opts.w;
        el.gridstackNode.x=opts.x;
        if(typeof opts.y==="number") el.gridstackNode.y=opts.y;
      }
      var gs=el.closest(".grid-stack");
      if(gs && gs.gridstack){
        gs.gridstack.update(el, opts);
      } else {
        // fallback CSS width so they sit side-by-side even without gridstack API
        el.style.width="calc(50% - 8px)";
        el.style.display="inline-block";
        el.style.verticalAlign="top";
        el.style.float="left";
      }
    }catch(e){}
  }
  function scan(){
    var byTitle=findByTitle();
    var items={};
    Object.keys(PAIR).forEach(function(id){
      items[id]=findById(id) || byTitle[id] || null;
    });
    var a=items["ledger-activity-feed"];
    var b=items["ledger-cash-flow-summary"];
    if(!a && !b) return;
    var y=null;
    if(a && a.gridstackNode && typeof a.gridstackNode.y==="number") y=a.gridstackNode.y;
    else if(b && b.gridstackNode && typeof b.gridstackNode.y==="number") y=b.gridstackNode.y;
    else {
      var gy=a && a.getAttribute("gs-y");
      if(gy!=null) y=parseInt(gy,10);
    }
    if(a) fixItem(a, PAIR["ledger-activity-feed"], y);
    if(b) fixItem(b, PAIR["ledger-cash-flow-summary"], y);
    // keep same row after both updates
    if(a && b && typeof y==="number"){
      try{
        var gs=(a.closest(".grid-stack")||b.closest(".grid-stack"));
        if(gs && gs.gridstack){
          gs.gridstack.update(a,{w:6,x:0,y:y});
          gs.gridstack.update(b,{w:6,x:6,y:y});
        }
      }catch(e){}
    }
  }
  setInterval(scan, 900);
  if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded", function(){ setTimeout(scan,500); setTimeout(scan,1500); setTimeout(scan,3500); });
  } else {
    setTimeout(scan,500); setTimeout(scan,1500); setTimeout(scan,3500);
  }
  new MutationObserver(function(){ scan(); }).observe(document.documentElement,{childList:true,subtree:true});
})();

/* pin-limit-10 enforcer */
(function(){
  function bumpBadge(){
    try{
      var badges=document.querySelectorAll('.snm-customizer-col-badge');
      badges.forEach(function(b){
        var t=(b.textContent||'').trim();
        var m=t.match(/^(\d+)\s*\/\s*(\d+)$/);
        if(m && parseInt(m[2],10)===5){
          b.textContent=m[1]+' / 10';
        }
      });
    }catch(e){}
  }
  setInterval(bumpBadge, 800);
  document.addEventListener('DOMContentLoaded', bumpBadge);
})();

/* hide Abrir App / Open App buttons */
(function(){
  function hideOpenApp(){
    try{
      var nodes=document.querySelectorAll('a,button');
      nodes.forEach(function(el){
        var t=(el.textContent||'').replace(/\s+/g,' ').trim();
        var href=(el.getAttribute('href')||'');
        if(/^(Abrir App|Open App)$/i.test(t) || href.indexOf('storefront-app')>=0){
          el.style.display='none';
        }
      });
    }catch(e){}
  }
  setInterval(hideOpenApp, 1000);
  document.addEventListener('DOMContentLoaded', hideOpenApp);
})();

/* FAUCON_UI_POLICY_V1 */
(function(){
  var HIDE_TEXT = [
    /^Show keyboard shortcuts$/i,
    /^Mostrar atalhos/i,
    /^Changelog$/i,
    /^Registo de altera/i,
    /^Registro de altera/i,
    /^Join Discord/i,
    /^Entrar na comunidade/i,
    /^Documentation$/i,
    /^Documenta[cç][aã]o$/i,
    /^Fleetbase documentation$/i,
    /^Documenta[cç][aã]o Fleetbase$/i,
    /^Developers$/i,
    /^Programadores$/i,
    /^Open App$/i,
    /^Abrir App$/i,
    /^v?\d+\.\d+\.\d+/
  ];
  var HIDE_HREF = [
    /discord\.gg/i,
    /github\.com\/fleetbase\/fleetbase\/i,
    /fleetbase\.io\/docs/i,
    /storefront-app/i
  ];
  var HIDE_CLASS = [
    'show-keyboard-shortcuts-user-nav-item',
    'changelog-user-nav-item',
    'docs-user-nav-item',
    'developers-user-nav-item',
    'fleetbase-attribution-version',
    'fleetbase-blog',
    'fleetbase-github-card'
  ];
  var ALLOW_LOCALES = { 'pt-br':1, 'en-us':1, 'fr-fr':1, 'pt':1, 'en':1, 'fr':1 };

  function hideEl(el){
    if(!el || el.nodeType!==1) return;
    el.style.setProperty('display','none','important');
    el.setAttribute('data-faucon-hidden','1');
  }

  function textOf(el){
    return (el.textContent||'').replace(/\s+/g,' ').trim();
  }

  function scrubMenus(){
    try{
      HIDE_CLASS.forEach(function(cls){
        document.querySelectorAll('.'+cls+', [class*="'+cls+'"]').forEach(hideEl);
      });
      document.querySelectorAll('a,button,li,[role="menuitem"],.next-dd-item,.ember-basic-dropdown-content a,.ember-basic-dropdown-content button').forEach(function(el){
        if(el.getAttribute('data-faucon-hidden')==='1') return;
        var t = textOf(el);
        var href = el.getAttribute('href')||'';
        var id = el.id||'';
        var cls = el.className||'';
        if(HIDE_HREF.some(function(re){ return re.test(href); })) { hideEl(el); return; }
        if(/developers-user-nav|changelog-user-nav|keyboard-shortcuts|docs-user-nav|discord/i.test(id+' '+cls)) { hideEl(el); return; }
        // Only hide exact short menu labels (avoid wiping page content)
        if(t.length < 48 && HIDE_TEXT.some(function(re){ return re.test(t); })) {
          // Keep WhatsApp support
          if(/ajuda e suporte|help & support|help and support/i.test(t) && /wa\.me/i.test(href)) return;
          // Don't hide top-nav "Programadores" engine - only profile menu item
          if(/^(Developers|Programadores)$/i.test(t) && !/user-nav|next-dd|dropdown/i.test(cls+' '+(el.closest('[class]')||{}).className||'')) {
            var inUserMenu = el.closest('.next-dd-menu, .user-menu, [class*="session"], [class*="user-nav"], .ember-basic-dropdown-content');
            if(!inUserMenu) return;
          }
          hideEl(el);
        }
      });
      // Version / powered-by strip
      document.querySelectorAll('.fleetbase-attribution-version, .fleetbase-attribution-separator').forEach(hideEl);
      document.querySelectorAll('.fleetbase-attribution, [class*="attribution"]').forEach(function(el){
        var t = textOf(el);
        if(/\bv?\d+\.\d+\.\d+\b/.test(t) || /^Fleetbase$/i.test(t) || /Powered by/i.test(t)) {
          // hide version nodes inside
          el.querySelectorAll('*').forEach(function(n){
            var nt = textOf(n);
            if(/^\s*v?\d+\.\d+\.\d+\s*$/.test(nt) || nt === '·' || /^Powered by$/i.test(nt)) hideEl(n);
          });
        }
      });
      // Language picker: keep only pt / en / fr
      document.querySelectorAll('[data-locale], [data-value], button, a, li, option').forEach(function(el){
        var loc = (el.getAttribute('data-locale')||el.getAttribute('data-value')||el.value||'').toLowerCase();
        if(!loc && el.getAttribute('data-option-locale')) loc = el.getAttribute('data-option-locale').toLowerCase();
        if(loc && /^(ar-ae|zh-cn|zh-tw|es-es|ja-jp|mn-mn|ru-ru|de-de|it-it|ko-kr|vi-vn|th-th|hi-in|tr-tr|nl-nl|pl-pl|sv-se|uk-ua)$/.test(loc)){
          hideEl(el);
        }
      });
    }catch(e){}
  }

  setInterval(scrubMenus, 700);
  document.addEventListener('DOMContentLoaded', scrubMenus);
  new MutationObserver(function(){ scrubMenus(); }).observe(document.documentElement,{childList:true,subtree:true});
})();
/* FAUCON_UI_POLICY_V1_END */

