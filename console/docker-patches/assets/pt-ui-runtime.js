/* Faucon PT UI runtime — translates leftover English when locale is Portuguese */
(function () {
  var DICT = {
  "Add your first contact": "Adicione o seu primeiro contacto",
  "New contact": "Novo contacto",
  "Contacts guide": "Guia de contactos",
  "Contacts": "Contactos",
  "Customers": "Clientes",
  "No fuel reports yet": "Ainda sem relatórios de combustível",
  "New fuel report": "Novo relatório de combustível",
  "Fuel reports guide": "Guia de relatórios de combustível",
  "No fuel transactions": "Sem transações de combustível",
  "No issues reported": "Nenhum problema reportado",
  "New Issue": "Novo problema",
  "Issues guide": "Guia de problemas",
  "Create a new issue": "Criar um novo problema",
  "Create Issue": "Criar problema",
  "Create inspection form": "Criar formulário de inspeção",
  "Create Inspection Form": "Criar formulário de inspeção",
  "New form": "Novo formulário",
  "No inspections yet": "Ainda sem inspeções",
  "New Inspection": "Nova inspeção",
  "Create inspection": "Criar inspeção",
  "Maintenance Schedules": "Agendamentos de manutenção",
  "New schedule": "Novo agendamento",
  "Schedules guide": "Guia de agendamentos",
  "Create Maintenance Schedule": "Criar agendamento de manutenção",
  "No work orders yet": "Ainda sem ordens de serviço",
  "Create Work Order": "Criar ordem de serviço",
  "No maintenance records yet": "Ainda sem registos de manutenção",
  "New maintenance": "Nova manutenção",
  "Create Maintenance": "Criar manutenção",
  "Due At": "Vence em",
  "NEXT DUE": "PRÓXIMO VENCIMENTO",
  "SOURCE": "FONTE",
  "TRANSACTION": "TRANSAÇÃO",
  "STATION": "POSTO",
  "LITERS": "LITROS",
  "FUEL REPORT": "RELATÓRIO DE COMBUSTÍVEL",
  "INSPECTION": "INSPEÇÃO",
  "FORM": "FORMULÁRIO",
  "RESULT": "RESULTADO",
  "FAILED": "REPROVADO",
  "Operational": "Operacional",
  "Pending": "Pendente",
  "shifts in window": "turnos na janela",
  "undated": "sem data",
  "Supports PNGs, JPEGs and GIFs": "Suporta PNG, JPEG e GIF",
  "Hard caps applied by the Orchestrator when building a single route. These are separate from the driver's shift schedule, which controls availability windows.": "Limites rígidos aplicados pelo Orquestrador ao construir uma única rota. São distintos do horário de turnos do motorista, que controla as janelas de disponibilidade.",
  "Fleets help group vehicles and drivers for dispatching, reporting, and operational coverage.": "As frotas ajudam a agrupar veículos e motoristas para despacho, relatórios e cobertura operacional.",
  "Vendors let your team manage external carriers, service providers, and operational partners.": "Os fornecedores permitem gerir transportadoras externas, prestadores de serviços e parceiros operacionais.",
  "Drag an item onto a lane to give it a time.": "Arraste um item para uma faixa para lhe dar uma hora.",
  "No metadata. Click Add to create one.": "Sem metadados. Clique em Adicionar para criar um.",
  "GCWR (Gross Combined Weight Rating)": "GCWR (peso bruto combinado)",
  "GVWR (Gross Vehicle Weight Rating)": "GVWR (peso bruto do veículo)",
  "Estimated Service Life (Distance)": "Vida útil estimada (distância)",
  "Estimated Service Life (Months)": "Vida útil estimada (meses)",
  "Select System of Measurement": "Selecionar sistema de medida",
  "Odometer reading at purchase": "Leitura do odómetro na compra",
  "Max Driving Time (seconds)": "Tempo máximo de condução (segundos)",
  "Service Life Distance Unit": "Unidade de distância da vida útil",
  "Supports PNG, JPEG and GIF": "Suporta PNG, JPEG e GIF",
  "{count} shifts in window": "{count} turnos na janela",
  "No events in this window": "Sem eventos nesta janela",
  "ORCHESTRATOR CONSTRAINTS": "RESTRIÇÕES DO ORQUESTRADOR",
  "ORQUESTRADOR CONSTRAINTS": "RESTRIÇÕES DO ORQUESTRADOR",
  "Current Odometer Reading": "Leitura atual do odómetro",
  "TECHNICAL SPECIFICATIONS": "ESPECIFICAÇÕES TÉCNICAS",
  "e.g., Euro 6, EPA Tier 3": "ex. Euro 6, EPA Tier 3",
  "LIFECYCLE & SERVICE LIFE": "CICLO DE VIDA E VIDA ÚTIL",
  "Supports PNG, JPEG e GIF": "Suporta PNG, JPEG e GIF",
  "SKILLS & CERTIFICATIONS": "COMPETÊNCIAS E CERTIFICAÇÕES",
  "Select Fuel Volume Unit": "Selecionar unidade de volume de combustível",
  "REGULATORY & COMPLIANCE": "REGULAMENTAÇÃO E CONFORMIDADE",
  "Supports PNG, JPEG, GIF": "Suporta PNG, JPEG e GIF",
  "Create your first fleet": "Crie a sua primeira frota",
  "SKILLS & CAPABILITIES": "COMPETÊNCIAS E CAPACIDADES",
  "Max Distance (metres)": "Distância máxima (metros)",
  "System of Measurement": "Sistema de medida",
  "Current Odometer (km)": "Odómetro atual (km)",
  "Select ownership type": "Selecionar tipo de propriedade",
  "CAPACITY & DIMENSIONS": "CAPACIDADE E DIMENSÕES",
  "FINANCIAL & LIFECYCLE": "FINANCEIRO E CICLO DE VIDA",
  "Depreciation Rate (%)": "Taxa de depreciação (%)",
  "Add your first vendor": "Adicione o seu primeiro fornecedor",
  "Print handover sheet": "Imprimir folha de passagem",
  "e.g. 150000 (150 km)": "ex. 150000 (150 km)",
  "Create a new vehicle": "Criar um novo veículo",
  "Odometer at Purchase": "Odómetro na compra",
  "Select body sub-type": "Selecionar subtipo de carroçaria",
  "Engine Configuration": "Configuração do motor",
  "Cylinder Arrangement": "Disposição dos cilindros",
  "Create a new driver": "Criar um novo motorista",
  "MEASUREMENT & UNITS": "MEDIDAS E UNIDADES",
  "Select transmission": "Selecionar transmissão",
  "POWERTRAIN & ENGINE": "TREM DE FORÇA E MOTOR",
  "Engine Manufacturer": "Fabricante do motor",
  "Engine Configuração": "Configuração do motor",
  "Number of Cylinders": "Número de cilindros",
  "Engine Displacement": "Deslocamento do motor",
  "Ground Clearance cm": "Altura ao solo cm",
  "AVAILABILITY WINDOW": "JANELA DE DISPONIBILIDADE",
  "Create a new vendor": "Criar um novo fornecedor",
  "0 shifts in window": "0 turnos na janela",
  "Passenger Volume L": "Volume de passageiros L",
  "Number of Payments": "Número de pagamentos",
  "Number of payments": "Número de pagamentos",
  "First Payment Date": "Data do primeiro pagamento",
  "Create a new fleet": "Criar uma nova frota",
  "Select usage type": "Selecionar tipo de utilização",
  "Interior Volume L": "Volume interior L",
  "Emission Standard": "Norma de emissões",
  "Lease Expiry Date": "Data de fim do leasing",
  "Select skills...": "Selecionar competências...",
  "e.g. 28800 (8 h)": "ex. 28800 (8 h)",
  "Fuel Volume Unit": "Unidade de volume de combustível",
  "ODOMETER & USAGE": "ODÓMETRO E UTILIZAÇÃO",
  "Select body type": "Selecionar tipo de carroçaria",
  "Select fuel type": "Selecionar tipo de combustível",
  "Payload Capacity": "Capacidade de carga",
  "Seating Capacity": "Capacidade de lugares",
  "Passenger Volume": "Volume de passageiros",
  "Ground Clearance": "Altura ao solo",
  "Acquisition Cost": "Custo de aquisição",
  "FINANCING (LOAN)": "FINANCIAMENTO (EMPRÉSTIMO)",
  "see all {count}": "ver todos {count}",
  "Select from map": "Selecionar no mapa",
  "Towing Capacity": "Capacidade de reboque",
  "Interior Volume": "Volume interior",
  "Insurance Value": "Valor do seguro",
  "Available Until": "Disponível até",
  "Filter keys...": "Filtrar chaves...",
  "Create Vehicle": "Criar veículo",
  "Ownership Type": "Tipo de propriedade",
  "Horsepower RPM": "RPM da potência",
  "Vehicle Weight": "Peso do veículo",
  "Total distance": "Distância total",
  "Available From": "Disponível desde",
  "Vehicle Skills": "Competências do veículo",
  "Create Trailer": "Criar reboque",
  "Create Driver": "Criar motorista",
  "Driver Skills": "Competências do motorista",
  "Select skills": "Selecionar competências",
  "Odometer Unit": "Unidade do odómetro",
  "Engine Number": "Número do motor",
  "Engine Family": "Família do motor",
  "Fuel Capacity": "Capacidade de combustível",
  "Bed Length cm": "Comprimento da caixa cm",
  "Current Value": "Valor atual",
  "Purchase Date": "Data de compra",
  "Create Vendor": "Criar fornecedor",
  "ROUTE LIMITS": "LIMITES DE ROTA",
  "BODY & USAGE": "CARROÇARIA E UTILIZAÇÃO",
  "Body Subtype": "Subtipo de carroçaria",
  "Transmission": "Transmissão",
  "Engine Model": "Modelo do motor",
  "Cargo Volume": "Volume de carga",
  "DPF Equipped": "Equipado com DPF",
  "SCR Equipped": "Equipado com SCR",
  "ASSET VALUES": "VALORES DO ATIVO",
  "Create Fleet": "Criar frota",
  "+ New vendor": "+ Novo fornecedor",
  "Vendor guide": "Guia de fornecedores",
  "Filter keys": "Filtrar chaves",
  "No metadata": "Sem metadados",
  "Engine Make": "Marca do motor",
  "Engine Size": "Cilindrada",
  "Select unit": "Selecionar unidade",
  "Loan Amount": "Valor do empréstimo",
  "TASK LIMITS": "LIMITES DE TAREFAS",
  "+ New fleet": "+ Nova frota",
  "Fleet guide": "Guia de frotas",
  "Usage Type": "Tipo de utilização",
  "Horsepower": "Potência",
  "Torque RPM": "RPM do binário",
  "Bed Length": "Comprimento da caixa",
  "New vendor": "Novo fornecedor",
  "0 overdue": "0 em atraso",
  "0 undated": "0 sem data",
  "Generated": "Gerado",
  "Longitude": "Longitude",
  "Kilometer": "Quilómetro",
  "Body Type": "Tipo de carroçaria",
  "Fuel Type": "Tipo de combustível",
  "Max Tasks": "Máximo de tarefas",
  "New fleet": "Nova frota",
  "Next 24h": "Próximas 24h",
  "staffing": "pessoal",
  "Latitude": "Latitude",
  "Metadata": "Metadados",
  "Expires": "Expira",
  "ANYTIME": "A QUALQUER MOMENTO",
  "UNDATED": "SEM DATA",
  "see all": "ver todos",
  "warning": "aviso",
  "e.g. 20": "ex. 20",
  "Shifts": "Turnos",
  "Filter": "Filtrar",
  "Torque": "Binário",
  "Import": "Importar",
  "LATER": "DEPOIS",
  "Later": "Depois",
  "+ Add": "+ Adicionar",
  "Value": "Valor",
  "Key": "Chave",
  "Fleet-Ops Dashboard": "Painel — operações-da-frota",
  "Get Started with Fleet-Ops": "Começar com operações-da-frota",
  "Open in Fleet-Ops": "Abrir em operações-da-frota",
  "Loading Fleet-Ops...": "A carregar operações-da-frota...",
  "Search Fleet-Ops": "Pesquisar operações-da-frota",
  "Search Fleet-Ops...": "Pesquisar operações-da-frota...",
  "Morning brief": "Briefing matinal",
  "Fleet health score": "Índice de saúde da frota",
  "Snoozed to": "Adiado até",
  "order to confirm": "encomenda por confirmar",
  "ready for pickup": "pronta para levantamento",
  "customers notified": "clientes notificados",
  "customer notified": "cliente notificado",
  "Orchestrator Workbench": "Bancada do Orquestrador",
  "Card Fields": "Campos do cartão",
  "Run Orchestrator": "Executar Orquestrador",
  "Phases": "Fases",
  "Advanced Filters": "Filtros avançados",
  "Import Orders": "Importar encomendas",
  "No unassigned orders ... all caught up!": "Sem encomendas por atribuir ... tudo em dia!",
  "No unassigned orders": "Sem encomendas por atribuir",
  "all caught up!": "tudo em dia!",
  "Available Vehicles": "Veículos disponíveis",
  "Available Drivers": "Motoristas disponíveis",
  "Search vehicles...": "Pesquisar veículos...",
  "Search vehicles": "Pesquisar veículos",
  "No Driver": "Sem motorista",
  "No position": "Sem posição",
  "No driver assigned": "Nenhum motorista atribuído",
  "Available": "Disponível",
  "Order Schedule": "Agenda de encomendas",
  "Fleet Schedule": "Agenda da frota",
  "Filter resources...": "Filtrar recursos...",
  "Filter resources": "Filtrar recursos",
  "+ Add Shift": "+ Adicionar turno",
  "Add Shift": "Adicionar turno",
  "All orders scheduled": "Todas as encomendas agendadas",
  "Day": "Dia",
  "Week": "Semana",
  "Today": "Hoje",
  "Index": "Índice",
  "Urgent": "Urgente",
  "Unassigned": "Não atribuído",
  "Imported": "Importado",
  "Pesquisar Fleet-Ops": "Pesquisar operações-da-frota",
  "Pesquisar Fleet-Op": "Pesquisar operações-da-frota",
  "Fleet-Op": "operações-da-frota",
  "Orchestrator": "Orquestrador",
  "Lifecycle": "Ciclo de vida",
  "LIFECYCLE": "CICLO DE VIDA",
  "Use a configured lifecycle": "Usar um ciclo de vida configurado",
  "A configured lifecycle lets this order type start, complete and cancel at its own activities instead of the default dispatch lifecycle (created, dispatched, started, completed, canceled).": "Um ciclo de vida configurado permite que este tipo de encomenda inicie, conclua e cancele nas suas próprias atividades em vez do ciclo de despacho predefinido (criada, despachada, iniciada, concluída, cancelada).",
  "This order type uses the default dispatch lifecycle. Orders start at 'created', can be dispatched to drivers and complete or cancel through the standard activities.": "Este tipo de encomenda usa o ciclo de despacho predefinido. As encomendas começam em 'criada', podem ser despachadas aos motoristas e concluem ou cancelam através das atividades padrão.",
  "Field Group Name": "Nome do grupo de campos",
  "Order Created": "Encomenda criada",
  "New order was created.": "Nova encomenda foi criada.",
  "Order has been dispatched.": "A encomenda foi despachada.",
  "Order Started": "Encomenda iniciada",
  "Order has been started.": "A encomenda foi iniciada.",
  "Driver Enroute": "Motorista a caminho",
  "Driver is en-route.": "O motorista está a caminho.",
  "Order has been completed.": "A encomenda foi concluída.",
  "Set up your first service rate": "Configure a sua primeira tarifa de serviço",
  "Service rates define how Fleet-Ops prices routes, zones, distance, and other service rules.": "As tarifas de serviço definem como as operações-da-frota precificam rotas, zonas, distância e outras regras de serviço.",
  "Service rates define how operações-da-frota prices routes, zones, distance, and other service rules.": "As tarifas de serviço definem como as operações-da-frota precificam rotas, zonas, distância e outras regras de serviço.",
  "Service rates guide": "Guia de tarifas de serviço",
  "Default order configuration for transport": "Configuração de encomenda predefinida para transporte",
  "MORNING BRIEF": "BRIEFING MATINAL",
  "Morning Brief": "Briefing matinal",
  "FLEET HEALTH SCORE": "ÍNDICE DE SAÚDE DA FROTA",
  "Fleet Health Score": "Índice de saúde da frota",
  "DECISIONS WAITING ON YOU": "DECISÕES À SUA ESPERA",
  "Decisions waiting on you": "Decisões à sua espera",
  "vs yesterday": "vs ontem",
  "unassigned": "não atribuído",
  "sources linked": "fontes ligadas",
  "Generated ": "Gerado ",
  "Yesterday: 0 gaps closed, 0 rolled over": "Ontem: 0 lacunas fechadas, 0 adiadas",
  "gaps closed": "lacunas fechadas",
  "rolled over": "adiadas",
  "warning staffing": "aviso de pessoal",
  "Not now": "Agora não",
  "Open record": "Abrir registo",
  "open record": "abrir registo",
  "3 items open, none critical.": "3 itens abertos, nenhum crítico.",
  "items open, none critical.": "itens abertos, nenhum crítico.",
  "Due this week": "A vencer esta semana",
  "Open issues": "Problemas abertos",
  "Shift changes": "Mudanças de turno",
  "Expiring 30d": "A expirar 30d",
  "Stock levels": "Níveis de stock",
  "Unmatched fuel": "Combustível não correspondente",
  "Notices": "Avisos",
  "Open": "Aberto",
  "Snoozed": "Adiado",
  "Resolved": "Resolvido",
  "views": "vistas",
  "My assignments": "As minhas atribuições",
  "+ Save current": "+ Guardar atual",
  "Save current": "Guardar atual",
  "NO DATE": "SEM DATA",
  "UNASSIGNED": "NÃO ATRIBUÍDO",
  "IDLE": "INATIVO",
  "Filter items": "Filtrar itens",
  "List": "Lista",
  "Agenda": "Agenda",
  "+ New notice": "+ Novo aviso",
  "New notice": "Novo aviso",
  "Post notice": "Publicar aviso",
  "Message": "Mensagem",
  "Severity": "Gravidade",
  "Deadline": "Prazo",
  "Applies to": "Aplica-se a",
  "Info": "Info",
  "Assign vehicle": "Atribuir veículo",
  "Assign to ": "Atribuir a ",
  "resolve ": "resolver ",
  "move": "mover",
  "select": "selecionar",
  "acknowledge": "confirmar",
  "snooze": "adiar",
  "assign": "atribuir",
  "RESOURCES": "RECURSOS",
  "Radar": "Radar",
  "Oct ": "Out ",
  "Missing translation": "Tradução em falta",

  "No trucks yet.": "Ainda sem camiões.",
  "Place order · {total}": "Fazer encomenda · {total}",
  "Fazer encomenda": "Fazer encomenda",
  "Orders this period": "Encomendas neste período",
  "0 recent customer": "0 cliente recente",
  "0 recent customers": "0 clientes recentes",
  "Hours": "Horário",
  "Locations": "Localizações",

  "Customer Insights": "Perspetivas de clientes",
  "New vs returning buyers": "Novos vs clientes recorrentes",
  "RETURNING": "RECORRENTES",
  "Returning": "Recorrentes",
  "Repeat purchase rate": "Taxa de recompra",
  "0 buyers ordered during this period.": "0 compradores encomendaram neste período.",
  "buyers ordered during this period.": "compradores encomendaram neste período.",
  "Order Status Mix": "Mistura de estados das encomendas",
  "orders this period": "encomendas neste período",
  "0 orders this period": "0 encomendas neste período",
  "No order activity yet.": "Ainda sem atividade de encomendas.",
  "No recent customers yet.": "Ainda sem clientes recentes.",
  "recent customer": "cliente recente",
  "recent customers": "clientes recentes",
  "from the store's published products": "dos produtos publicados da loja",
  "Add products": "Adicionar produtos",
  "+ Add products": "+ Adicionar produtos",
  "PRODUCT": "PRODUTO",
  "OPTIONS": "OPÇÕES",
  "PRICE": "PREÇO",
  "TOTAL": "TOTAL",
  "PROMOTION": "PROMOÇÃO",
  "PROMOTION CODE": "CÓDIGO PROMOCIONAL",
  "Promotion": "Promoção",
  "Promotion code": "Código promocional",
  "PAYMENT": "PAGAMENTO",
  "Payment": "Pagamento",
  "Place order": "Fazer encomenda",
  "No trucks": "Nenhum camião",
  "VEHICLE AND CREW": "VEÍCULO E EQUIPA",
  "Vehicle and crew": "Veículo e equipa",
  "Vehicle": "Veículo",
  "Zone": "Zona",
  "CATALOGS ON THIS TRUCK": "CATÁLOGOS NESTE CAMIÃO",
  "Catalogs on this truck": "Catálogos neste camião",
  "Copy store key": "Copiar chave da loja",
  "Branding and media": "Marca e media",
  "Hours": "Horário",
  "Locations": "Localizações",
  "Checkout rules": "Regras de checkout",
  "Payment gateways": "Gateways de pagamento",
  "Notification channels": "Canais de notificação",
  "Order messages": "Mensagens de encomenda",
  "API keys": "Chaves API",
  "Danger zone": "Zona de perigo",
  "Store key": "Chave da loja",
  "Default order config": "Configuração de encomenda predefinida",
  "Select default order config": "Selecionar configuração de encomenda predefinida",
  "Map marker": "Marcador do mapa",
  "All changes saved": "Todas as alterações guardadas",
  "Save settings": "Guardar definições",
  "Fleet-Ops": "operações-da-frota",
  "Fleet Ops": "operações-da-frota",
  "fleet-ops": "operações-da-frota",
  "FleetOps": "operações-da-frota",
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
  "PROVIDER COUNT": "CONTAGEM DE FORNECEDORES",
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
  "UNMATCHED IN LAST SYNC": "SEM CORRESPONDÊNCIA NA ÚLTIMA SINCRONIZAÇÃO",
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
  "active": "ativo",
  "Active": "Ativo",
  "inactive": "inativo",
  "Inactive": "Inativo",
  "complete": "concluída",
  "incomplete": "incompleta",
  "Onboarding complete": "Integração concluída",
  "Onboarding incomplete": "Integração incompleta",
  "Onboarding Complete": "Integração concluída",
  "Owner:": "Proprietário:",
  "Users:": "Utilizadores:",
  "Created:": "Criado:",
  "Impersonate Owner": "Personificar proprietário",
  "Copy Public ID": "Copiar ID público",
  "Copy UUID": "Copiar UUID",
  "Operations and usage": "Operações e utilização",
  "Organization users": "Utilizadores da organização",
  "Organização users": "Utilizadores da organização",
  "API calls": "Chamadas API",
  "Webhook callbacks": "Callbacks de webhook",
  "Access and onboarding": "Acesso e integração",
  "Recent activity": "Atividade recente",
  "Registered": "Registado",
  "Filter By Data": "Filtrar por dados",
  "Filter Data": "Filtrar dados",
  "Deleted": "Eliminado",
  "Updated": "Atualizado",
  "created": "criou",
  "deleted": "eliminou",
  "updated": "atualizou",
  "a new user": "um novo utilizador",
  "an user": "um utilizador",
  "a user": "um utilizador",
  "a new contact": "um novo contacto",
  "a contact": "um contacto",
  "a new driver": "um novo motorista",
  "a driver": "um motorista",
  "a new vehicle": "um novo veículo",
  "a vehicle": "um veículo",
  "with": "com",
  "attributes": "atributos",
  "Fleet-Ops Customer": "Cliente Operações da Frota",
  "TWO-FACTOR AUTHENTICATION": "AUTENTICAÇÃO DE DOIS FATORES",
  "Two-factor authentication": "Autenticação de dois fatores",
  "Lifecycle Controls": "Controlos de ciclo de vida",
  "LIFECYCLE CONTROLS": "CONTROLOS DE CICLO DE VIDA",
  "Danger Zone": "Zona de perigo",
  "DANGER ZONE": "ZONA DE PERIGO",
  "Suspend": "Suspender",
  "Mark Complete": "Marcar como concluída",
  "Mark Incomplete": "Marcar como incompleta",
  "Onboarding State": "Estado de integração",
  "Activity Stream": "Fluxo de atividade",
  "No activity yet": "Ainda sem atividade",
  "days ago": "dias atrás",
  "day ago": "dia atrás",
  "hours ago": "horas atrás",
  "hour ago": "hora atrás",
  "minutes ago": "minutos atrás",
  "minute ago": "minuto atrás",
  "just now": "agora mesmo",

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
  "Map": "Mapa",
  "Add your first equipment item": "Adicione o seu primeiro equipamento",
  "Equipment records help track assigned assets, condition, service history, and operational readiness.": "Os registos de equipamento ajudam a acompanhar ativos atribuídos, condição, histórico de serviço e prontidão operacional.",
  "New equipment": "Novo equipamento",
  "Equipment guide": "Guia de equipamento",
  "Create Equipment": "Criar equipamento",
  "Equipment Details": "Detalhes do equipamento",
  "EQUIPMENT DETAILS": "DETALHES DO EQUIPAMENTO",
  "Equipment name": "Nome do equipamento",
  "Internal code or reference": "Código ou referência interna",
  "Serial Number": "Número de série",
  "SERIAL NUMBER": "NÚMERO DE SÉRIE",
  "Manufacturer serial number": "Número de série do fabricante",
  "Manufacturer": "Fabricante",
  "MANUFACTURER": "FABRICANTE",
  "Manufacturer name": "Nome do fabricante",
  "Model designation": "Designação do modelo",
  "TYPE & STATUS": "TIPO E ESTADO",
  "Type & Status": "Tipo e estado",
  "Select Equipment Type": "Selecionar tipo de equipamento",
  "EQUIPPED TO": "EQUIPADO EM",
  "Equipped To": "Equipado em",
  "PURCHASE & WARRANTY": "COMPRA E GARANTIA",
  "Purchase & Warranty": "Compra e garantia",
  "PURCHASE INFORMATION": "INFORMAÇÃO DE COMPRA",
  "Purchase Information": "Informação de compra",
  "Purchase Price": "Preço de compra",
  "WARRANTY": "GARANTIA",
  "Warranty": "Garantia",
  "Add your first part": "Adicione a sua primeira peça",
  "Parts keep replacement inventory and compatibility details ready for maintenance work.": "As peças mantêm o inventário de substituição e os detalhes de compatibilidade prontos para o trabalho de manutenção.",
  "New part": "Nova peça",
  "Parts guide": "Guia de peças",
  "PART NUMBER": "NÚMERO DA PEÇA",
  "Part Number": "Número da peça",
  "QUANTITY ON HAND": "QUANTIDADE EM MÃO",
  "Quantity On Hand": "Quantidade em mão",
  "Quantity on Hand": "Quantidade em mão",
  "UNIT COST": "CUSTO UNITÁRIO",
  "Unit Cost": "Custo unitário",
  "Create Part": "Criar peça",
  "Supports JPG, PNG, GIF up to 10 MB": "Suporta JPG, PNG, GIF até 10 MB",
  "Part name": "Nome da peça",
  "Stock Keeping Unit": "Unidade de manutenção de stock (SKU)",
  "Barcode or QR code value": "Valor do código de barras ou QR",
  "Select Part Type": "Selecionar tipo de peça",
  "Part description and usage notes": "Descrição da peça e notas de utilização",
  "STOCK LEVELS": "NÍVEIS DE STOCK",
  "Stock Levels": "Níveis de stock",
  "Current stock quantity": "Quantidade atual em stock",
  "PRICING": "PREÇOS",
  "Pricing": "Preços",
  "COMPATIBILITY": "COMPATIBILIDADE",
  "COMPATIBLE ASSET": "ATIVO COMPATÍVEL",
  "Compatible Asset": "Ativo compatível",
  "Select compatible asset type": "Selecionar tipo de ativo compatível",
  "VENDOR & WARRANTY": "FORNECEDOR E GARANTIA",
  "Vendor & Warranty": "Fornecedor e garantia",
  "SUPPLIER": "FORNECEDOR",
  "Supplier": "Fornecedor",
  "Provider count": "Contagem de fornecedores",
  "SYNCED DEVICES": "DISPOSITIVOS SINCRONIZADOS",
  "Synced devices": "Dispositivos sincronizados",
  "Unattached devices": "Dispositivos não associados",
  "Health warnings": "Avisos de saúde",
  "Connect a provider": "Ligar um fornecedor",
  "Connected provider accounts": "Contas de fornecedores ligados",
  "No warnings": "Sem avisos",
  "NATIVE": "NATIVO",
  "Native": "Nativo",
  "0 sync issues": "0 problemas de sincronização",
  "sync issues": "problemas de sincronização",
  "Connected integrations": "Integrações ligadas",
  "Last sync": "Última sincronização",
  "UNMATCHED IN LATEST RUN": "SEM CORRESPONDÊNCIA NA ÚLTIMA EXECUÇÃO",
  "Unmatched in latest runs": "Sem correspondência na última execução",
  "Latest import spend": "Gasto da última importação",
  "Connect integration": "Ligar integração",
  "Review sync": "Rever sincronização",
  "Review matches": "Rever correspondências",
  "Open ledger": "Abrir razão",
  "Fuel card and fuel management accounts": "Contas de cartão e gestão de combustível",
  "Most recent completed import": "Importação concluída mais recente",
  "No unmatched count": "Sem contagem sem correspondência",
  "0 imported": "0 importados",
  "Integration": "Integração",
  "PROVIDER KEY": "CHAVE DO FORNECEDOR",
  "Provider Key": "Chave do fornecedor",
  "NEW IN LAST SYNC": "NOVOS NA ÚLTIMA SINCRONIZAÇÃO",
  "New in last sync": "Novos na última sincronização",
  "Unmatched in last sync": "Sem correspondência na última sincronização",
  "Manage credentials, connection health, sync windows, and imported transaction status for each fuel integration.": "Faça a gestão das credenciais, saúde da ligação, janelas de sincronização e estado das transações importadas de cada integração de combustível.",
  "Adjust your filters or connect a fuel provider to import transactions.": "Ajuste os filtros ou ligue um fornecedor de combustível para importar transações.",
  "Connect fuel card providers or fuel management systems, import provider bills as fuel transactions, match them to vehicles and trips, then create linked fuel reports for operations.": "Ligue fornecedores de cartões de combustível ou sistemas de gestão de combustível, importe faturas como transações, associe-as a veículos e viagens e crie relatórios de combustível ligados às operações.",
  "Fuel card integration": "Integração de cartão de combustível",
  "Add your first device": "Adicione o seu primeiro dispositivo",
  "Devices connect vehicles and assets to telemetry, events, tracking, and provider syncs.": "Os dispositivos ligam veículos e ativos à telemetria, eventos, rastreio e sincronizações de fornecedores.",
  "New device": "Novo dispositivo",
  "Device guide": "Guia de dispositivos",
  "Create a new device": "Criar um novo dispositivo",
  "Create Device": "Criar dispositivo",
  "Telematic Device": "Dispositivo telemático",
  "CONNECTION": "LIGAÇÃO",
  "Connection": "Ligação",
  "Telematic Provider": "Fornecedor telemático",
  "SENSORS": "SENSORES",
  "Sensors": "Sensores",
  "LAST SEEN": "ÚLTIMA VEZ VISTO",
  "Last Seen": "Última vez visto",
  "Installation & Maintenance": "Instalação e manutenção",
  "Warranty & Status": "Garantia e estado",
  "NOTES": "NOTAS",
  "Notes": "Notas",
  "Add your first sensor": "Adicione o seu primeiro sensor",
  "Sensors capture telemetry signals that can power events, conditions, and operational visibility.": "Os sensores captam sinais de telemetria que alimentam eventos, condições e visibilidade operacional.",
  "New sensor": "Novo sensor",
  "Sensors guide": "Guia de sensores",
  "Create a new sensor": "Criar um novo sensor",
  "Create Sensor": "Criar sensor",
  "Select Device": "Selecionar dispositivo",
  "TELEMATIC": "TELEMÁTICA",
  "Telematic": "Telemática",
  "LAST VALUE": "ÚLTIMO VALOR",
  "Last Value": "Último valor",
  "THRESHOLD": "LIMIAR",
  "Threshold": "Limiar",
  "Min Threshold": "Limiar mínimo",
  "Max Threshold": "Limiar máximo",
  "Connectivity Events": "Eventos de conectividade",
  "Conectividade Events": "Eventos de conectividade",
  "Pesquisar Conectividade Events": "Pesquisar eventos de conectividade",
  "No connectivity events yet": "Ainda sem eventos de conectividade",
  "Events appear here after connected devices or providers begin sending telemetry signals.": "Os eventos aparecem aqui depois de dispositivos ou fornecedores ligados começarem a enviar sinais de telemetria.",
  "Events guide": "Guia de eventos",
  "Event": "Evento",
  "PROCESSED": "PROCESSADO",
  "Processed": "Processado",
  "OCCURRED": "OCORRIDO",
  "Occurred": "Ocorrido",
  "Criar novo peça": "Criar nova peça",
  "Ligar fornecedores that supply fuel card bills, purchase transactions, vehicle identifiers, station locations, or trip references.": "Ligue fornecedores que fornecem faturas de cartão de combustível, transações de compra, identificadores de veículos, postos ou referências de viagem.",
  "Connect providers that supply fuel card bills, purchase transactions, vehicle identifiers, station locations, or trip references.": "Ligue fornecedores que fornecem faturas de cartão de combustível, transações de compra, identificadores de veículos, postos ou referências de viagem.",
  "Create work orders when scheduled service or asset issues need assignment.": "Crie ordens de serviço quando o serviço agendado ou problemas de ativos precisarem de atribuição.",
  "Publish DVIR forms so drivers can report vehicle defects before dispatch.": "Publique formulários DVIR para os motoristas reportarem defeitos antes do despacho.",
  "Keep the maintenance history and serviceable asset catalog current.": "Mantenha o histórico de manutenção e o catálogo de ativos atualizados.",
  "Group the things a driver checks, then add a field for each one.": "Agrupe o que o motorista verifica e depois adicione um campo para cada item.",
  "Capture driver inspections, failed items, and repair follow-up.": "Capture inspeções do motorista, itens reprovados e seguimento de reparação.",
  "Signals from schedules, work orders, parts, and equipment.": "Sinais de agendamentos, ordens de serviço, peças e equipamentos.",
  "Equipment records make maintenance planning more complete.": "Os registos de equipamento tornam o planeamento de manutenção mais completo.",
  "Add your first field group to start building this form.": "Adicione o seu primeiro grupo de campos para começar a construir este formulário.",
  "Read the guide before changing maintenance workflows.": "Leia o guia antes de alterar os fluxos de manutenção.",
  "Schedule recurring service before work turns urgent.": "Agende serviço periódico antes de o trabalho se tornar urgente.",
  "Adjust the search or filters to find other devices.": "Ajuste a pesquisa ou os filtros para encontrar outros dispositivos.",
  "Open a defect record when an item fails": "Abrir um registo de defeito quando um item falha",
  "Open a work order when an item fails": "Abrir uma ordem de serviço quando um item falha",
  "Choose an inspection form to begin.": "Escolha um formulário de inspeção para começar.",
  "No devices match your filters": "Nenhum dispositivo corresponde aos filtros",
  "No sensors match your filters": "Nenhum sensor corresponde aos filtros",
  "Create Inspection Submission": "Criar envio de inspeção",
  "Available fuel integrations": "Integrações de combustível disponíveis",
  "What this inspection covers": "O que esta inspeção cobre",
  "Require the driver to sign": "Exigir assinatura do motorista",
  "Daily vehicle inspection": "Inspeção diária do veículo",
  "Connected fuel systems": "Sistemas de combustível ligados",
  "Select inspection form": "Selecionar formulário de inspeção",
  "Current engine hours": "Horas do motor atuais",
  "INSPECTION DETAILS": "DETALHES DA INSPEÇÃO",
  "Loading providers": "A carregar fornecedores",
  "Current odometer": "Odómetro atual",
  "No field groups": "Sem grupos de campos",
  "Select vehicle": "Selecionar veículo",
  "Select driver": "Selecionar motorista",
  "FORM DETAILS": "DETALHES DO FORMULÁRIO",
  "FORM BUILDER": "CONSTRUTOR DE FORMULÁRIO",
  "SETTINGS": "DEFINIÇÕES",
  "Flespi is a robust telematics platform offering device management, data processing, and A...": "A Flespi é uma plataforma de telemática robusta com gestão de dispositivos, processamento de dados e A...",
  "Powered by Fleetbase": "desenvolvido por Makira Tec",
  "Show \\\"Powered by Fleetbase\\\"": "Show \\\"desenvolvido por Makira Tec\\\"",
  "Show \"Powered by Fleetbase\"": "Show \"desenvolvido por Makira Tec\"",
  "Fleetbase Legal Notices": "Avisos legais Faucon",
  "Fleetbase Legal": "Faucon Legal",
  "Open source and commercial licensing": "Licenciamento open source e comercial",
  "Open Source License": "Licença open source",
  "Fleetbase is licensed under the GNU Affero General Public License v3.0 or later, unless you have a separate commercial license from Fleetbase.": "O Faucon está licenciado sob a GNU Affero General Public License v3.0 ou posterior, salvo se tiver uma licença comercial separada.",
  "No Warranty": "Sem garantia",
  "This program is distributed without warranty. You may convey and modify it under the terms of the AGPL-3.0-or-later.": "Este programa é distribuído sem garantia. Pode transmiti-lo e modificá-lo nos termos da AGPL-3.0-or-later.",
  "Commercial License": "Licença comercial",
  "Need to keep proprietary modifications private, build a SaaS product, or white-label Fleetbase? A Fleetbase Commercial License removes AGPL copyleft obligations for covered commercial use.": "Precisa de manter modificações proprietárias privadas, criar um produto SaaS ou white-label do Faucon? Uma Licença Comercial Faucon remove as obrigações de copyleft da AGPL para o uso comercial coberto.",
  " Fleetbase Pte. Ltd.": " Faucon",
  "Fleetbase Pte. Ltd.": "Faucon",
  "View licensing options": "Ver opções de licenciamento",
  "View commercial license": "Ver licença comercial",
  "View source code": "Ver código-fonte",
  "View AGPL license": "Ver licença AGPL",

  "Revenue Trend": "Tendência de receita",
  "Top Drivers": "Melhores motoristas",
  "Maintenance Overview": "Visão geral de manutenção",
  "No driver activity in this period.": "Nenhuma atividade de motorista neste período.",
  "No upcoming maintenance.": "Nenhuma manutenção programada.",
  "Open Radar": "Abrir Radar",
  "Revenue over time with selectable period.": "Receita ao longo do tempo com período selecionável.",
  "No reports yet": "Ainda sem relatórios",
  "Create a Fleet-Ops report to start tracking operational trends, utilization, and performance over time.": "Crie um relatório de Operações da Frota para começar a acompanhar tendências operacionais, utilização e desempenho ao longo do tempo.",
  "Create a Fleet-Ops report to start tracking operational utilization, and performance over time.": "Crie um relatório de Operações da Frota para começar a acompanhar a utilização operacional e o desempenho ao longo do tempo.",
  "New report": "Novo relatório",
  "Select a data source": "Selecionar uma fonte de dados",
  "Group By": "Agrupar por",
  "No grouping": "Sem agrupamento",
  "Select columns first to enable grouping": "Selecione colunas primeiro para ativar o agrupamento",
  "Select columns in the 'Select Fields' section first": "Selecione colunas na secção 'Selecionar campos' primeiro",
  "Sort By": "Ordenar por",
  "No sorting": "Sem ordenação",
  "Select columns first to enable sorting": "Selecione colunas primeiro para ativar a ordenação",
  "Limit Results": "Limitar resultados",
  "Max 50 rows": "Máx. 50 linhas",
  "Maximum rows:": "Máximo de linhas:",
  "Quick options:": "Opções rápidas:",
  "Remove Limit": "Remover limite",
  "No joins": "Sem junções",
  "No relationships available": "Nenhuma relação disponível",
  "This table has no defined relationships to join with other tables": "Esta tabela não tem relações definidas para juntar a outras tabelas",
  "No conditions": "Sem condições",
  "Choose columns to enable filtering": "Escolha colunas para ativar a filtragem",
  "Settings Hub": "Central de definições",
  "App Navigator": "App Navigator",
  "Navigator App": "App Navigator",
  "Scheduling Settings": "Definições de agendamento",
  "Telematics Settings": "Definições de telemática",
  "Orquestrador Settings": "Definições do orquestrador",
  "Configure the operator, driver, routing, notification, and data rules that shape Fleet-Ops workflows.": "Configure as regras de operador, motorista, roteamento, notificação e dados que moldam os fluxos de Operações da Frota.",
  "Read the guide before changing settings.": "Leia o guia antes de alterar as definições.",
  "Start with driver experience": "Comece pela experiência do motorista",
  "Navigator App and Map settings should be reviewed before operators rely on live dispatch defaults.": "As definições do App Navigator e do Mapa devem ser revistas antes de os operadores dependerem dos padrões de despacho ao vivo.",
  "Review automation rules": "Rever regras de automação",
  "Routing, orchestration, and scheduling settings affect assignment and planning behavior.": "As definições de roteamento, orquestração e agendamento afetam a atribuição e o planeamento.",
  "Keep forms focused": "Manter formulários focados",
  "Add custom fields after core workflows are stable so operational screens stay easy to scan.": "Adicione campos personalizados depois de os fluxos principais estarem estáveis para as ecrãs operacionais permanecerem fáceis de ler.",
  "Driver app behavior and workflow defaults.": "Comportamento da app do motorista e padrões de fluxo de trabalho.",
  "Map providers, defaults, and display behavior.": "Fornecedores de mapa, padrões e comportamento de visualização.",
  "Routing engines and routing defaults.": "Motores de roteamento e padrões de rotas.",
  "Dispatch orchestration and assignment behavior.": "Orquestração de despacho e comportamento de atribuição.",
  "Schedule planning and operational timing rules.": "Planeamento de agendas e regras de temporização operacional.",
  "Payment setup for operational commerce workflows.": "Configuração de pagamentos para fluxos comerciais operacionais.",
  "The page your customers use to follow deliveries; address, branding and how they verify.": "A página que os clientes usam para acompanhar entregas; endereço, marca e verificação.",
  "Device event and position history preferences within the system retention policy.": "Preferências de histórico de eventos e posições dos dispositivos dentro da política de retenção do sistema.",
  "Operational metadata fields for Fleet-Ops records.": "Campos de metadados operacionais para registos de Operações da Frota.",
  "Visual assets for driver, vehicle, and map displays.": "Recursos visuais para motorista, veículo e ecrãs de mapa.",
  "Control operational alerts and notification behavior.": "Controle alertas operacionais e comportamento de notificações.",
  "Configure Map": "Configurar mapa",
  "Default Map View": "Vista predefinida do mapa",
  "Map Provider": "Fornecedor de mapa",
  "Leaflet Tile Provider URL": "URL do fornecedor de tiles Leaflet",
  "Leaflet Dark Mode Tile Provider URL": "URL do fornecedor de tiles Leaflet (modo escuro)",
  "Default Center": "Centro predefinido",
  "Default Zoom": "Zoom predefinido",
  "Fit to my vehicles": "Ajustar aos meus veículos",
  "Where the live map and the Mapa da frota ao vivo widget open. A default center is used instead of the browser's location. Without one, the map opens near your active orders or your browser's location, then in your company's country.": "Onde o mapa ao vivo e o widget Mapa da frota ao vivo abrem. É usado um centro predefinido em vez da localização do browser. Sem um, o mapa abre perto das encomendas ativas ou da localização do browser e, depois, no país da empresa.",
  "Where the live map and the Live Fleet Map widget open. A default center is used instead of the browser's location. Without one, the map opens near your active orders or your browser's location, then in your company's country.": "Onde o mapa ao vivo e o widget Mapa da frota ao vivo abrem. É usado um centro predefinido em vez da localização do browser. Sem um, o mapa abre perto das encomendas ativas ou da localização do browser e, depois, no país da empresa.",
  "Allocation Engine": "Motor de alocação",
  "Allocation Constraints": "Restrições de alocação",
  "Active Allocation Engine": "Motor de alocação ativo",
  "Auto-Allocate on Order Creation": "Alocar automaticamente na criação do pedido",
  "Automatically run allocation when a new order is created.": "Executar automaticamente a alocação quando um novo pedido é criado.",
  "Auto-Re-Allocate on Delivery Completion": "Realocar automaticamente no fecho da entrega",
  "Re-run allocation when a delivery is completed to fill freed capacity.": "Voltar a executar a alocação quando uma entrega é concluída para preencher a capacidade libertada.",
  "Max Travel Time (seconds)": "Tempo máximo de viagem (segundos)",
  "Balance Workload": "Equilibrar carga de trabalho",
  "Distribute orders evenly across available drivers and vehicles.": "Distribuir pedidos de forma uniforme pelos motoristas e veículos disponíveis.",
  "Configure which fields are displayed on order cards in the workbench. Fields are grouped by order config so you can tailor the view for each order type.": "Configure quais campos aparecem nos cartões de pedido no workbench. Os campos são agrupados por configuração de pedido para adaptar a vista a cada tipo.",
  "Standard Fields": "Campos padrão",
  "These fields appear on every order card regardless of order type.": "Estes campos aparecem em todos os cartões de pedido, independentemente do tipo.",
  "Save Card Fields": "Guardar campos do cartão",
  "Vehicle Assigned": "Veículo atribuído",
  "Materialisation": "Materialização",
  "Hours of Service Limits": "Limites de horas de serviço",
  "Behaviour": "Comportamento",
  "Reusable Schedule Templates": "Modelos de agenda reutilizáveis",
  "Schedule Horizon (Days)": "Horizonte da agenda (dias)",
  "Default Shift Duration (Hours)": "Duração predefinida do turno (horas)",
  "Daily Driving Limit (Hours)": "Limite diário de condução (horas)",
  "Weekly Driving Limit (Hours)": "Limite semanal de condução (horas)",
  "Auto-Activate Schedule": "Ativar agenda automaticamente",
  "Notify Drivers on Shift Changes": "Notificar motoristas sobre alterações de turno",
  "New Template": "Novo modelo",
  "No reusable templates have been created yet.": "Ainda não foram criados modelos reutilizáveis.",
  "Device Events Retention": "Retenção de eventos do dispositivo",
  "Position History Retention": "Retenção do histórico de posições",
  "Use system default": "Usar padrão do sistema",
  "Keep device events for (days)": "Manter eventos do dispositivo por (dias)",
  "Keep positions for (days)": "Manter posições por (dias)",
  "Choose how long your organization keeps device events and position history within the limits set by your system administrator.": "Escolha por quanto tempo a organização mantém eventos do dispositivo e histórico de posições dentro dos limites definidos pelo administrador do sistema.",
  "Your administrator allows unlimited history. Set the retention period to 0 to keep history forever.": "O administrador permite histórico ilimitado. Defina o período de retenção como 0 para manter o histórico para sempre.",
  "Read the guide on ": "Ler o guia sobre ",
  "Scheduling": "Agendamento",
  "Telematics": "Telemática",
  "Powered by": "desenvolvido por",
  "desenvolvido por Makira Tec": "desenvolvido por Makira Tec",
  "open": "abertos",
  "stopped": "parados",
  "snoozed": "adiados",
  "overdue": "em atraso",
  "wk": "sem",
  "mo": "mês",
  "yr": "ano",
  "CONFIGURE MAP": "CONFIGURAR MAPA",
  "DEFAULT MAP VIEW": "VISTA PREDEFINIDA DO MAPA",
  "ALLOCATION ENGINE": "MOTOR DE ALOCAÇÃO",
  "ALLOCATION CONSTRAINTS": "RESTRIÇÕES DE ALOCAÇÃO",
  "STANDARD FIELDS": "CAMPOS PADRÃO",
  "MATERIALISATION": "MATERIALIZAÇÃO",
  "HOURS OF SERVICE LIMITS": "LIMITES DE HORAS DE SERVIÇO",
  "BEHAVIOUR": "COMPORTAMENTO",
  "DEVICE EVENTS RETENTION": "RETENÇÃO DE EVENTOS DO DISPOSITIVO",
  "POSITION HISTORY RETENTION": "RETENÇÃO DO HISTÓRICO DE POSIÇÕES",
  "Joins": "Junções",
  "Conditions": "Condições",
  "Created": "Criado",
  "Configure system-wide routing engine defaults here. Organizations can optionally override these values from their own routing settings.": "Configure aqui os padrões do motor de roteamento ao nível do sistema. As organizações podem opcionalmente substituir estes valores nas próprias definições de roteamento.",
  "Manage the platform API token used by trusted integrations to access protected platform endpoints such as the organization directory.": "Faça a gestão do token de API da plataforma usado por integrações de confiança para aceder a endpoints protegidos, como o diretório de organizações.",
  "Stripe is not configured. The system administrator must configure Stripe before customer payments can be accepted.": "O Stripe não está configurado. O administrador do sistema deve configurar o Stripe antes de aceitar pagamentos de clientes.",
  "Stripe onboarding must be completed before customer portal payments can be enabled.": "O onboarding Stripe deve ser concluído antes de ativar pagamentos no portal do cliente.",
  "Require Stripe checkout when a customer selects a service quote": "Exigir checkout Stripe quando o cliente seleciona uma cotação de serviço",
  "No service rates are available for this organization.": "Não há tarifas de serviço disponíveis para esta organização.",
  "Start a new chat or adjust your search.": "Inicie uma nova conversa ou ajuste a pesquisa.",
  "No resources match this search.": "Nenhum recurso corresponde a esta pesquisa.",
  "Select one or more teammates": "Selecione um ou mais colegas",
  "Create or join organizations": "Criar ou aderir a organizações",
  "User Accepted Company Invite": "Utilizador aceitou convite da empresa",
  "Complete Payments Onboarding": "Concluir onboarding de pagamentos",
  "Default Fornecedor de mapa": "Fornecedor de mapa predefinido",
  "Default Tracking Provider": "Fornecedor de rastreio predefinido",
  "Customer Portal Settings": "Definições do portal do cliente",
  "No unread notifications": "Sem notificações não lidas",
  "Quoteable Service Rates": "Tarifas de serviço cotáveis",
  "Create new Organization": "Criar nova organização",
  "View all notifications": "Ver todas as notificações",
  "No conversations found": "Nenhuma conversa encontrada",
  "Customer Portal Access": "Acesso ao portal do cliente",
  "Enable Stripe Payments": "Ativar pagamentos Stripe",
  "Organization settings": "Definições da organização",
  "Available Order Types": "Tipos de pedido disponíveis",
  "unread conversations": "conversas não lidas",
  "Search conversations": "Pesquisar conversas",
  "Join an Organization": "Entrar numa organização",
  "Default Map Provider": "Fornecedor de mapa predefinido",
  "Unread Notification": "Notificação não lida",
  "unread conversation": "conversa não lida",
  "Explore extensions": "Explorar extensões",
  "Platform API Token": "Token de API da plataforma",
  "Tracking Defaults": "Padrões de rastreio",
  "Advanced Settings": "Definições avançadas",
  "Search teammates": "Pesquisar colegas",
  "Live Operations": "Operações ao vivo",
  "vehicles online": "veículos online",
  "Organization ID": "ID da organização",
  "drivers online": "motoristas online",
  "Authentication": "Autenticação",
  "No fleets yet": "Ainda sem frotas",
  "Save Settings": "Guardar definições",
  "Google Map ID": "ID do Google Map",
  "User Created": "Utilizador criado",
  "Save Changes": "Guardar alterações",
  "Last rotated": "Última rotação",
  "Rotate Token": "Rodar token",
  "Revoke Token": "Revogar token",
  "Create Chat": "Criar conversa",
  "Two Factor": "Dois fatores",
  "Configured": "Configurado",
  "Chat name": "Nome do chat",
  "Last used": "Última utilização",
  "New Chat": "Nova conversa",
  "Messages": "Mensagens",
  "Logout": "Sair",
  "LIVE OPERATIONS": "OPERAÇÕES AO VIVO",
  "Fleets": "Frotas",
  "Drivers": "Motoristas",
  "Vehicles": "Veículos",
  "Home": "Início",
  "Admin": "Administração",
  "Organization": "Organização",
  "Optional": "Opcional",
  "Never": "Nunca",
  "LAST ROTATED": "ÚLTIMA ROTAÇÃO",
  "LAST USED": "ÚLTIMA UTILIZAÇÃO",
  "PLATFORM API TOKEN": "TOKEN DE API DA PLATAFORMA",
  "CUSTOMER PORTAL SETTINGS": "DEFINIÇÕES DO PORTAL DO CLIENTE",
  "TRACKING DEFAULTS": "PADRÕES DE RASTREIO",
  "0 Unread Notifications": "0 notificações não lidas",
  "Unread Notifications": "Notificações não lidas",
  "0 unread conversations": "0 conversas não lidas",
  "+ New Chat": "+ Nova conversa",
  "Usage includes all telematics data across the system. Row counts marked as estimated are database statistics; these include table data and indexes. Deleting records frees space for reuse within the database; physical disk usage may not decrease immediately.": "A utilização inclui todos os dados de telemática do sistema. Contagens de linhas marcadas como estimadas são estatísticas da base de dados; incluem dados e índices. Eliminar registos liberta espaço para reutilização; o uso físico do disco pode não diminuir de imediato.",
  "Storage usage includes telematics data across all organizations. Cleanup applies system-wide, using the saved system policy and each organization\\'s history preferences within that policy.": "A utilização de armazenamento inclui dados de telemática de todas as organizações. A limpeza aplica-se a todo o sistema, usando a política guardada e as preferências de histórico de cada organização dentro dessa política.",
  "Storage usage includes telematics data across all organizations. Cleanup applies system-wide, using the saved system policy and each organization's history preferences within that policy.": "A utilização de armazenamento inclui dados de telemática de todas as organizações. A limpeza aplica-se a todo o sistema, usando a política guardada e as preferências de histórico de cada organização dentro dessa política.",
  "A maximum takes precedence over organization preferences, inherited defaults and requests to keep history forever. Reducing a maximum can delete existing history at the next cleanup.": "Um máximo prevalece sobre as preferências da organização, os padrões herdados e os pedidos para manter o histórico para sempre. Reduzir um máximo pode apagar histórico existente na próxima limpeza.",
  "Write telemetry-driven device, event and vehicle saves to the activity log for all organizations. Every poll can add several activity rows per device.": "Escrever gravações de dispositivo, evento e veículo da telemetria no registo de atividade de todas as organizações. Cada consulta pode adicionar várias linhas de atividade por dispositivo.",
  "Serves /~/track for every organization that allows it. Organizations can also run their own page from their Fleet-Ops settings.": "Serve /~/track para todas as organizações que o permitam. As organizações também podem ter a própria página nas definições de Operações da Frota.",
  "Shown before a lookup. The logo comes from the instance branding.": "Mostrado antes de uma pesquisa. O logótipo vem da marca da instância.",
  "System Delivery Inbox and Sync Run Retention Policy": "Política de retenção da caixa de entregas e execuções de sincronização (sistema)",
  "The default for organizations that haven\\'t chosen.": "O padrão para organizações que ainda não escolheram.",
  "The default for organizations that haven't chosen.": "O padrão para organizações que ainda não escolheram.",
  "System Device Event Raw Payload Retention": "Retenção de payload bruto de eventos do dispositivo (sistema)",
  "Default Position History Retention (days)": "Retenção predefinida do histórico de posições (dias)",
  "Maximum Position History Retention (days)": "Retenção máxima do histórico de posições (dias)",
  "Device Event Raw Payload Retention (days)": "Retenção de payload bruto de eventos do dispositivo (dias)",
  "System Position History Retention Policy": "Política de retenção do histórico de posições (sistema)",
  "System Device Events Retention Policy": "Política de retenção de eventos do dispositivo (sistema)",
  "Default Device Event Retention (days)": "Retenção predefinida de eventos do dispositivo (dias)",
  "Maximum Device Event Retention (days)": "Retenção máxima de eventos do dispositivo (dias)",
  "Quarantined Delivery Retention (days)": "Retenção de entregas em quarentena (dias)",
  "Sync Run Diagnostics Retention (days)": "Retenção de diagnósticos de sincronização (dias)",
  "Processed Delivery Retention (hours)": "Retenção de entregas processadas (horas)",
  "System Telemetry Activity Logging": "Registo de atividade de telemetria (sistema)",
  "Enable the generic tracking page": "Ativar a página de rastreio genérica",
  "System Telematics Storage Usage": "Utilização de armazenamento de telemática (sistema)",
  "No extensions awaiting publish": "Nenhuma extensão a aguardar publicação",
  "No extensions awaiting review": "Nenhuma extensão a aguardar revisão",
  "Restrict to Workspace domain": "Restringir ao domínio do Workspace",
  "Extensions Awaiting Review": "Extensões a aguardar revisão",
  "Extensions Pending Publish": "Extensões pendentes de publicação",
  "Log Telemetry Activity": "Registar atividade de telemetria",
  "Generic Tracking Page": "Página de rastreio genérica",
  "Save System Policy": "Guardar política do sistema",
  "Run system cleanup": "Executar limpeza do sistema",
  "Estimated size": "Tamanho estimado",
  "Delivery inbox": "Caixa de entregas",
  "Device events": "Eventos do dispositivo",
  "Accent colour": "Cor de destaque",
  "Support phone": "Telefone de suporte",
  "Support email": "Email de suporte",
  "Client Secret": "Segredo do cliente",
  "Display name": "Nome a apresentar",
  "(estimated)": "(estimado)",
  "Oldest row": "Linha mais antiga",
  "Sync runs": "Execuções de sincronização",
  "Client ID": "ID do cliente",
  "n/a": "n/d",
  "SYSTEM DEVICE EVENTS RETENTION POLICY": "POLÍTICA DE RETENÇÃO DE EVENTOS DO DISPOSITIVO (SISTEMA)",
  "SYSTEM POSITION HISTORY RETENTION POLICY": "POLÍTICA DE RETENÇÃO DO HISTÓRICO DE POSIÇÕES (SISTEMA)",
  "SYSTEM DEVICE EVENT RAW PAYLOAD RETENTION": "RETENÇÃO DE PAYLOAD BRUTO DE EVENTOS DO DISPOSITIVO (SISTEMA)",
  "SYSTEM DELIVERY INBOX AND SYNC RUN RETENTION POLICY": "POLÍTICA DE RETENÇÃO DA CAIXA DE ENTREGAS E SINCRONIZAÇÕES (SISTEMA)",
  "SYSTEM TELEMETRY ACTIVITY LOGGING": "REGISTO DE ATIVIDADE DE TELEMETRIA (SISTEMA)",
  "SYSTEM TELEMATICS STORAGE USAGE": "UTILIZAÇÃO DE ARMAZENAMENTO DE TELEMÁTICA (SISTEMA)",
  "GENERIC TRACKING PAGE": "PÁGINA DE RASTREIO GENÉRICA",
  "EXTENSIONS AWAITING REVIEW": "EXTENSÕES A AGUARDAR REVISÃO",
  "EXTENSIONS PENDING PUBLISH": "EXTENSÕES PENDENTES DE PUBLICAÇÃO",
  "TABLE": "TABELA",
  "ROWS": "LINHAS",
  "ESTIMATED SIZE": "TAMANHO ESTIMADO",
  "OLDEST ROW": "LINHA MAIS ANTIGA",
  "Website": "Website",
  "Positions": "Posições",
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

  var _ptExtra = {
  "NUMBER": "NÚMERO",
  "STATUS": "ESTADO",
  "TOTAL": "TOTAL",
  "BALANCE": "SALDO",
  "Number": "Número",
  "Status": "Estado",
  "Balance": "Saldo",
  "Invoice Number": "Número da fatura",
  "Draft": "Rascunho",
  "DATES": "DATAS",
  "Dates": "Datas",
  "QTY": "QTD",
  "Qty": "Qtd",
  "TAX %": "IMPOSTO %",
  "Tax %": "Imposto %",
  "SUBTOTAL": "SUBTOTAL",
  "No line items yet. Add one": "Ainda sem itens de linha. Adicione um",
  "No line items yet.": "Ainda sem itens de linha.",
  "Criar new conta": "Criar nova conta",
  "Create Ledger Account": "Criar conta contabilística",
  "ACCOUNT INFORMATION": "INFORMAÇÕES DA CONTA",
  "Account Information": "Informações da conta",
  "e.g. Cash and Cash Equivalents": "ex.: Caixa e equivalentes de caixa",
  "Optional description of this account...": "Descrição opcional desta conta...",
  "Account Type": "Tipo de conta",
  "Asset": "Ativo",
  "Liability": "Passivo",
  "Equity": "Capital",
  "Expense": "Despesa",
  "Revenue": "Receita",
  "Active": "Ativo",
  "DEBIT ACCOUNT": "CONTA DE DÉBITO",
  "CREDIT ACCOUNT": "CONTA DE CRÉDITO",
  "Debit Account": "Conta de débito",
  "Credit Account": "Conta de crédito",
  "ASSETS": "ATIVOS",
  "LIABILITIES": "PASSIVOS",
  "CAPITAL": "CAPITAL",
  "Assets": "Ativos",
  "Liabilities": "Passivos",
  "No Assets accounts": "Nenhuma conta de ativos",
  "No Liabilities accounts": "Nenhuma conta de passivos",
  "No Capital accounts": "Nenhuma conta de capital",
  "Total Assets": "Total de ativos",
  "Total Liabilities": "Total de passivos",
  "Total Capital": "Total de capital",
  "Total Liabilities & Equity": "Total de passivo e capital",
  "As of date": "Data de referência",
  "As of ": "Em ",
  "Cash Flow Statement": "Demonstração de fluxo de caixa",
  "OPERATING ACTIVITIES": "ATIVIDADES OPERACIONAIS",
  "FINANCING ACTIVITIES": "ATIVIDADES DE FINANCIAMENTO",
  "Operating Activities": "Atividades operacionais",
  "Financing Activities": "Atividades de financiamento",
  "No operating activity data": "Sem dados de atividades operacionais",
  "No financing activity data": "Sem dados de atividades de financiamento",
  "Net Operating Cash Flow": "Fluxo de caixa operacional líquido",
  "Net Financing Cash Flow": "Fluxo de caixa de financiamento líquido",
  "Net Change in Cash": "Variação líquida de caixa",
  "Aging": "Antiguidade",
  "DAYS": "DIAS",
  "Days": "Dias",
  "BUCKET": "FAIXA",
  "Bucket": "Faixa",
  "No outstanding receivables": "Nenhuma conta a receber pendente",
  "WALLETS BY OWNER TYPE": "CARTEIRAS POR TIPO DE PROPRIETÁRIO",
  "Wallets by Owner Type": "Carteiras por tipo de proprietário",
  "OWNER TYPE": "TIPO DE PROPRIETÁRIO",
  "Owner Type": "Tipo de proprietário",
  "COUNT": "QUANTIDADE",
  "Count": "Quantidade",
  "TOTAL BALANCE": "SALDO TOTAL",
  "Total Balance": "Saldo total",
  "TOP WALLETS BY BALANCE": "PRINCIPAIS CARTEIRAS POR SALDO",
  "Top Wallets by Balance": "Principais carteiras por saldo",
  "WALLET": "CARTEIRA",
  "Wallet": "Carteira",
  "user": "utilizador",
  "company": "empresa",
  "INVOICE NUMBERING": "NUMERAÇÃO DE FATURAS",
  "Invoice Numbering": "Numeração de faturas",
  "Invoice Number Prefix": "Prefixo do número da fatura",
  "CURRENCY & PAYMENT TERMS": "MOEDA E CONDIÇÕES DE PAGAMENTO",
  "Currency & Payment Terms": "Moeda e condições de pagamento",
  "Default Payment Terms": "Condições de pagamento predefinidas",
  "DEFAULT INVOICE TEXT": "TEXTO PREDEFINIDO DA FATURA",
  "Default Invoice Text": "Texto predefinido da fatura",
  "Default Terms & Conditions": "Termos e condições predefinidos",
  "e.g. Thank you for your business!": "ex.: Obrigado pela sua preferência!",
  "e.g. Payment is due within 30 days of the invoice date.": "ex.: O pagamento vence no prazo de 30 dias após a data da fatura.",
  "DEFAULT INVOICE TEMPLATE": "MODELO DE FATURA PREDEFINIDO",
  "Default Invoice Template": "Modelo de fatura predefinido",
  "Default Template": "Modelo predefinido",
  "Select an Invoice template": "Selecionar um modelo de fatura",
  "Select an invoice template": "Selecionar um modelo de fatura",
  "no invoice templates found.": "nenhum modelo de fatura encontrado.",
  "No invoice templates found.": "Nenhum modelo de fatura encontrado.",
  "to enable custom invoice branding.": "para ativar a marca personalizada nas faturas.",
  "Select a payment gateway": "Selecionar um gateway de pagamento",
  "No active gateways found.": "Nenhum gateway ativo encontrado.",
  "to enable online payments.": "para ativar pagamentos online.",
  "PAYMENT BEHAVIOUR": "COMPORTAMENTO DE PAGAMENTO",
  "Payment Behaviour": "Comportamento de pagamento",
  "Allow Partial Payments": "Permitir pagamentos parciais",
  "Allow customers to pay a portion of the invoice amount rather than the full balance.": "Permitir que os clientes paguem uma parte do valor da fatura em vez do saldo total.",
  "Auto-Apply Wallet Credit": "Aplicar automaticamente crédito da carteira",
  "Automatically apply available wallet balance toward invoice payments before charging the gateway.": "Aplicar automaticamente o saldo disponível da carteira aos pagamentos de faturas antes de cobrar no gateway.",
  "Send Payment Receipt": "Enviar recibo de pagamento",
  "Email a payment receipt to the customer automatically after a successful payment.": "Enviar automaticamente um recibo de pagamento por email ao cliente após um pagamento bem-sucedido.",
  "CURRENCY & FISCAL YEAR": "MOEDA E ANO FISCAL",
  "Currency & Fiscal Year": "Moeda e ano fiscal",
  "Fiscal Year Start Month": "Mês de início do ano fiscal",
  "January": "Janeiro",
  "These accounts are used automatically when posting transactions unless a specific account is selected on the transaction itself.": "Estas contas são usadas automaticamente ao lançar transações, salvo se for selecionada uma conta específica na própria transação.",
  "Default Revenue Account": "Conta de receita predefinida",
  "Default Expense Account": "Conta de despesa predefinida",
  "Select revenue account": "Selecionar conta de receita",
  "Select expense account": "Selecionar conta de despesa",
  "Select AR account": "Selecionar conta AR",
  "Select AP account": "Selecionar conta AP",
  "JOURNAL ENTRY BEHAVIOUR": "COMPORTAMENTO DOS LANÇAMENTOS DE DIÁRIO",
  "Journal Entry Behaviour": "Comportamento dos lançamentos de diário",
  "Automatically post journal entries to the general ledger when created, without requiring manual approval.": "Publicar automaticamente os lançamentos de diário no razão geral quando criados, sem necessidade de aprovação manual.",
  "Programadores": "Programadores"
  };
  Object.keys(_ptExtra).forEach(function (k) { DICT[k] = _ptExtra[k]; });
  var KEYS = Object.keys(DICT).sort(function (a, b) { return b.length - a.length; });
  PHRASES = Object.keys(DICT).filter(function (k) { return k.length >= 12; }).sort(function (a, b) { return b.length - a.length; });

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

  /** Rename Fleetbase → Faucon in visible copy; leave URLs/hosts/emails untouched. */
  function brandify(text) {
    if (text == null) return text;
    var s = String(text);
    if (!/fleetbase/i.test(s)) return text;
    var parts = s.split(/(https?:\/\/[^\s<>"'`]+|[\w.+-]+@[\w.-]+\.\w+|\/(?:engines-dist|assets|favicon|storage|int|api)\/[^\s<>"'`]*)/gi);
    for (var i = 0; i < parts.length; i++) {
      var p = parts[i];
      if (!p || !/fleetbase/i.test(p)) continue;
      if (/^https?:\/\//i.test(p) || /^[\w.+-]+@/i.test(p) || /^\//.test(p)) continue;
      if (/^[\w.-]*fleetbase\.(io|com|org|dev)[\w.\/?&=%-]*$/i.test(p)) continue;
      if (/@fleetbase\//i.test(p) || /node_modules|fleetbase-api|fleetbase-console/i.test(p)) continue;
      if (/Fleetbase\\|fleetbase\\|Fleetbase\\|Faucon\\/.test(p)) continue;
      // Word only — never kebab/snake/CSS, never PHP namespaces (Fleetbase\...)
      parts[i] = p
        .replace(/(?<![A-Za-z0-9_\\-])FLEETBASE(?![A-Za-z0-9_\\-])/g, "FAUCON")
        .replace(/(?<![A-Za-z0-9_\\-])Fleetbase(?![A-Za-z0-9_\\-])/g, "Faucon")
        .replace(/(?<![A-Za-z0-9_\\-])fleetbase(?![A-Za-z0-9_\\-])/g, "Faucon");
    }
    return parts.join("");
  }

  function translateText(text) {
    if (text == null) return text;
    var m = String(text).match(/^(\s*)([\s\S]*?)(\s*)$/);
    if (!m) return brandify(text);
    var lead = m[1], core = m[2], trail = m[3];
    if (!core) return text;
    if (Object.prototype.hasOwnProperty.call(DICT, core)) return brandify(lead + DICT[core] + trail);
    var num = core.match(/^(\d+)\s+(.+)$/);
    if (num && Object.prototype.hasOwnProperty.call(DICT, num[2])) {
      return brandify(lead + num[1] + " " + DICT[num[2]] + trail);
    }
    var show = core.match(/^Showing\s+(\d+)\s+to\s+(\d+)\s+of\s+(\d+)\s+results$/i);
    if (show) return brandify(lead + "Mostrando " + show[1] + " a " + show[2] + " de " + show[3] + " resultados" + trail);
    var noAcc = core.match(/^No\s+(.+)\s+accounts$/i);
    if (noAcc) {
      var lab = noAcc[1];
      if (Object.prototype.hasOwnProperty.call(DICT, lab)) lab = DICT[lab];
      return brandify(lead + "Nenhuma conta de " + String(lab).toLowerCase() + trail);
    }
    var days = core.match(/^(\d+\+?|\d+-\d+)\s+DAYS$/i);
    if (days) return brandify(lead + days[1] + " DIAS" + trail);
    if (/^YOUR\s+/i.test(core)) {
      var rest = core.replace(/^YOUR\s+/i, "");
      if (Object.prototype.hasOwnProperty.call(DICT, rest)) return brandify(lead + String(DICT[rest]).toUpperCase() + trail);
      if (/organiza/i.test(rest)) return brandify(lead + "AS SUAS ORGANIZAÇÕES" + trail);
    }
    if (core.length >= 12) {
      var out = core;
      for (var i = 0; i < PHRASES.length; i++) {
        var k = PHRASES[i];
        if (out.indexOf(k) !== -1) out = out.split(k).join(DICT[k]);
      }
      if (out !== core) return brandify(lead + out + trail);
    }
    // Activity feed / relative time leftovers
    var ago = core.match(/^(\d+)\s+(minutes?|hours?|days?)\s+ago$/i);
    if (ago) {
      var n = ago[1], u = ago[2].toLowerCase();
      var ut =
        u.indexOf("minute") === 0 ? (n === "1" ? "minuto" : "minutos") :
        u.indexOf("hour") === 0 ? (n === "1" ? "hora" : "horas") :
        (n === "1" ? "dia" : "dias");
      return brandify(lead + "há " + n + " " + ut + trail);
    }
    if (/created a new |deleted a |deleted an |updated /i.test(core) || / with \d+ attributes/i.test(core)) {
      var act = core
        .replace(/\bcreated a new\b/gi, "criou um novo")
        .replace(/\bcreated\b/gi, "criou")
        .replace(/\bdeleted an\b/gi, "eliminou um")
        .replace(/\bdeleted a\b/gi, "eliminou um")
        .replace(/\bdeleted\b/gi, "eliminou")
        .replace(/\bupdated\b/gi, "atualizou")
        .replace(/\buser\b/gi, "utilizador")
        .replace(/\bcontact\b/gi, "contacto")
        .replace(/\bdriver\b/gi, "motorista")
        .replace(/\bvehicle\b/gi, "veículo")
        .replace(/\bwith\b/gi, "com")
        .replace(/\battributes\b/gi, "atributos");
      if (act !== core) return brandify(lead + act + trail);
    }
    return brandify(text);
  }

  function translateNode(node) {
    if (!node || node.nodeType !== 3) return;
    var p = node.parentElement;
    if (!p || SKIP.test(p.tagName) || p.isContentEditable) return;
    if (p.closest && p.closest("[data-no-pt],code,pre,.monaco-editor,.cm-editor,input,textarea")) return;
    var next = translateText(node.nodeValue);
    if (next !== node.nodeValue) node.nodeValue = next;
  }

  function brandNode(node) {
    if (!node || node.nodeType !== 3) return;
    var p = node.parentElement;
    if (!p || SKIP.test(p.tagName) || p.isContentEditable) return;
    if (p.closest && p.closest("code,pre,.monaco-editor,.cm-editor")) return;
    var next = brandify(node.nodeValue);
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

  function brandAttrs(el) {
    if (!el || el.nodeType !== 1) return;
    for (var i = 0; i < ATTRS.length; i++) {
      var a = ATTRS[i];
      if (!el.hasAttribute(a)) continue;
      var v = el.getAttribute(a);
      var nv = brandify(v);
      if (nv !== v) el.setAttribute(a, nv);
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

  function brandWalk(root) {
    if (!root) return;
    if (root.nodeType === 1) brandAttrs(root);
    var tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, null);
    var n;
    while ((n = tw.nextNode())) {
      if (n.nodeType === 3) brandNode(n);
      else if (n.nodeType === 1) brandAttrs(n);
    }
  }

  function brandTitle() {
    try {
      if (document.title && /fleetbase/i.test(document.title)) {
        document.title = brandify(document.title);
      }
    } catch (e) {}
  }

  function run() {
    normalizePtLocale();
    brandTitle();
    if (isPortuguese(getLocale())) walk(document.body);
    else brandWalk(document.body);
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
    var pt = isPortuguese(getLocale());
    brandTitle();
    for (var i = 0; i < muts.length; i++) {
      var m = muts[i];
      if (m.type === "characterData") {
        if (pt) translateNode(m.target);
        else brandNode(m.target);
      } else if (m.type === "childList") {
        m.addedNodes.forEach(function (n) {
          if (n.nodeType === 3) {
            if (pt) translateNode(n);
            else brandNode(n);
          } else if (n.nodeType === 1) {
            if (pt) walk(n);
            else brandWalk(n);
          }
        });
      } else if (m.type === "attributes") {
        if (pt) translateAttrs(m.target);
        else brandAttrs(m.target);
      }
    }
  }).observe(document.documentElement, {
    childList: true, subtree: true, characterData: true,
    attributes: true, attributeFilter: ATTRS
  });

  setInterval(function () {
    brandTitle();
    if (isPortuguese(getLocale())) walk(document.body);
    else brandWalk(document.body);
  }, 3000);


  /* Put Cash Flow Summary beside Recent Financial Activity (same row) */
  var PAIR={
    "ledger-activity-feed":{w:6,x:0},
    "ledger-cash-flow-summary":{w:6,x:6}
  };
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
      '.grid-stack-item[data-id="'+id+'"]',
      '[data-widget-id="'+id+'"]',
      '#'+CSS.escape(id)
    ];
    for(var i=0;i<sels.length;i++){
      try{
        var el=document.querySelector(sels[i]);
        var item=itemOf(el)||(el && el.classList && el.classList.contains("grid-stack-item")?el:null);
        if(item) return item;
        if(el){ var p=itemOf(el); if(p) return p; }
      }catch(e){}
    }
    return null;
  }
  function findByTitle(){
    var found={};
    var titles=document.querySelectorAll(".ledger-widget-title, .ledger-dashboard-widget .ledger-widget-title, h3, h2, .widget-title");
    titles.forEach(function(t){
      var key=(t.textContent||"").replace(/\s+/g," ").trim();
      var id=TITLE_MAP[key];
      if(!id) return;
      var item=itemOf(t);
      if(item) found[id]=item;
    });
    return found;
  }
  function readY(el){
    if(!el) return null;
    if(el.gridstackNode && typeof el.gridstackNode.y==="number") return el.gridstackNode.y;
    var gy=el.getAttribute("gs-y")||el.getAttribute("data-gs-y");
    if(gy!=null && gy!=="") return parseInt(gy,10);
    return null;
  }
  function fixItem(el, cfg, y){
    if(!el||!cfg) return;
    try{
      var opts={w:cfg.w,x:cfg.x,h:10};
      if(typeof y==="number" && !isNaN(y)) opts.y=y;
      el.setAttribute("gs-w", String(opts.w));
      el.setAttribute("gs-x", String(opts.x));
      el.setAttribute("gs-h", String(opts.h));
      if(typeof opts.y==="number") el.setAttribute("gs-y", String(opts.y));
      if(el.gridstackNode){
        el.gridstackNode.w=opts.w;
        el.gridstackNode.x=opts.x;
        el.gridstackNode.h=opts.h;
        if(typeof opts.y==="number") el.gridstackNode.y=opts.y;
      }
      var gs=el.closest(".grid-stack");
      if(gs && gs.gridstack){
        gs.gridstack.update(el, opts);
      } else {
        el.style.width="calc(50% - 8px)";
        el.style.maxWidth="50%";
        el.style.display="inline-block";
        el.style.verticalAlign="top";
        el.style.float="left";
        el.style.boxSizing="border-box";
      }
    }catch(e){}
  }
  function scan(){
    try{
      var byTitle=findByTitle();
      var items={};
      Object.keys(PAIR).forEach(function(id){
        items[id]=findById(id) || byTitle[id] || null;
      });
      var a=items["ledger-activity-feed"];
      var b=items["ledger-cash-flow-summary"];
      if(!a && !b) return;
      var y=readY(a);
      if(y==null) y=readY(b);
      if(y==null) y=0;
      if(a) fixItem(a, PAIR["ledger-activity-feed"], y);
      if(b) fixItem(b, PAIR["ledger-cash-flow-summary"], y);
      if(a && b){
        var gs=(a.closest(".grid-stack")||b.closest(".grid-stack"));
        if(gs && gs.gridstack){
          gs.gridstack.update(a,{w:6,x:0,y:y,h:10});
          gs.gridstack.update(b,{w:6,x:6,y:y,h:10});
        }
      }
    }catch(e){}
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
    /^Faucon documentation$/i,
    /^Documenta[cç][aã]o Faucon$/i,
    /^Open App$/i,
    /^Abrir App$/i,
    /^v?\d+\.\d+\.\d+/
  ];
  var HIDE_HREF = [
    /discord\.gg/i,
    /github\.com\/Faucon\/Faucon/i,
    /Faucon\.io\/docs/i,
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
      // Never scrub the developers engine content pane
      if (location.pathname.indexOf('/developers') === 0 || location.pathname.indexOf('/console/developers') >= 0) {
        // still hide attribution only
      }
      HIDE_CLASS.forEach(function(cls){
        // Do not hide developers engine UI by broad class match
        if (cls === 'developers-user-nav-item') {
          document.querySelectorAll('.developers-user-nav-item, [class*="developers-user-nav-item"]').forEach(hideEl);
          return;
        }
        document.querySelectorAll('.'+cls+', [class*="'+cls+'"]').forEach(hideEl);
      });
      document.querySelectorAll('a,button,li,[role="menuitem"],.next-dd-item,.ember-basic-dropdown-content a,.ember-basic-dropdown-content button').forEach(function(el){
        if(el.getAttribute('data-faucon-hidden')==='1') return;
        // Skip scrubbing inside developers app shell / tables / widgets
        if (el.closest && el.closest('.developers-engine, .dev-engine, [class*="developers-dashboard"], [class*="developers-widget"], .console-developers, main, .next-content-overlay-panel')) {
          // allow only user-nav dropdown items to be hidden
          if (!el.closest('.next-dd-menu, .user-menu, [class*="user-nav"], .ember-basic-dropdown-content')) return;
        }
        var t = textOf(el);
        var href = el.getAttribute('href')||'';
        var id = el.id||'';
        var cls = el.className||'';
        if(HIDE_HREF.some(function(re){ return re.test(href); })) { hideEl(el); return; }
        // Hide Faucon docs nav only — never Faucon "Documentação"
        if(/developers-user-nav|changelog-user-nav|keyboard-shortcuts|discord/i.test(id+' '+cls)) { hideEl(el); return; }
        if(/(^|[\s"'])docs-user-nav-item/i.test(id+' '+cls) && !/faucon-documentation/i.test(id+' '+cls)) { hideEl(el); return; }
        if(/faucon-documentation-nav-item/i.test(id+' '+cls)) return;
        if(/^Documenta[cç][aã]o$/i.test(t) && /\/docs\//i.test(href)) return;
        // Only hide exact short menu labels (avoid wiping page content)
        if(t.length < 48 && HIDE_TEXT.some(function(re){ return re.test(t); })) {
          // Keep WhatsApp support + Faucon documentation
          if(/ajuda e suporte|help & support|help and support/i.test(t) && /wa\.me/i.test(href)) return;
          if(/faucon-documentation-nav-item/i.test(id+' '+cls) || (/^Documenta[cç][aã]o$/i.test(t) && /\/docs\//i.test(href))) return;
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
        if(/\bv?\d+\.\d+\.\d+\b/.test(t) || /^Faucon$/i.test(t) || /Powered by|desenvolvido por|Makira/i.test(t)) {
          el.querySelectorAll('*').forEach(function(n){
            var nt = textOf(n);
            if(/^\s*v?\d+\.\d+\.\d+\s*$/.test(nt) || nt === '·') hideEl(n);
            if(/Powered by\s*Faucon/i.test(nt) || /^Powered by$/i.test(nt) || /^Faucon$/i.test(nt)) {
              if(n.childNodes.length===1 && n.childNodes[0].nodeType===3) n.childNodes[0].nodeValue='desenvolvido por Makira Tec';
              else if(n.childNodes.length===0 && n.nodeType===1) n.textContent='desenvolvido por Makira Tec';
            }
          });
          // whole strip text
          if(/Powered by\s*Faucon/i.test(t) && el.childNodes.length===1 && el.childNodes[0].nodeType===3) {
            el.childNodes[0].nodeValue='desenvolvido por Makira Tec';
          }
        }
      });
      // Global replace leftover Powered by Faucon text nodes
      try {
        var tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
        var node;
        while((node = tw.nextNode())) {
          if(node.nodeValue && /Powered by\s*Faucon/i.test(node.nodeValue)) {
            node.nodeValue = node.nodeValue.replace(/Powered by\s*Faucon/ig, 'desenvolvido por Makira Tec');
          }
        }
      } catch(e){}
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

/* FAUCON_DOCS_MENU_V1 — ensure Documentação appears after Ajuda e suporte */
(function () {
  var DOC_HREF = '/docs/sistema.html';
  var DOC_ID = 'faucon-documentation-nav-item';

  function textOf(el) {
    return (el.textContent || '').replace(/\s+/g, ' ').trim();
  }

  function findSupportLinks() {
    return Array.prototype.slice.call(document.querySelectorAll('a')).filter(function (a) {
      var t = textOf(a);
      var href = a.getAttribute('href') || '';
      return /ajuda e suporte|help & support|help and support/i.test(t) && /wa\.me/i.test(href);
    });
  }

  function alreadyHasDocs(scope) {
    if (!scope) return !!document.getElementById(DOC_ID);
    return !!(
      scope.querySelector('#' + DOC_ID) ||
      scope.querySelector('a[href="' + DOC_HREF + '"]') ||
      Array.prototype.slice.call(scope.querySelectorAll('a')).some(function (a) {
        return /^Documenta[cç][aã]o$/i.test(textOf(a));
      })
    );
  }

  function buildItem(template) {
    var a = document.createElement('a');
    a.id = DOC_ID;
    a.href = DOC_HREF;
    a.className = (template && template.className ? template.className : 'next-dd-item') + ' faucon-documentation-nav-item';
    a.setAttribute('data-faucon-docs', '1');
    // Prefer cloning structure of support link for styling
    if (template) {
      a.innerHTML = template.innerHTML;
      // Replace visible text nodes / last text content
      var replaced = false;
      a.querySelectorAll('span,div').forEach(function (n) {
        if (replaced) return;
        var tt = textOf(n);
        if (/ajuda e suporte|help & support|help and support/i.test(tt) && n.children.length === 0) {
          n.textContent = 'Documentação';
          replaced = true;
        }
      });
      if (!replaced) {
        // fallback: set text on the anchor while keeping icons if any
        var icons = a.querySelectorAll('svg,i,.fa,.fas,.far,.svg-inline--fa');
        a.textContent = '';
        icons.forEach(function (ic) {
          a.appendChild(ic.cloneNode(true));
        });
        var span = document.createElement('span');
        span.textContent = 'Documentação';
        a.appendChild(span);
      }
    } else {
      a.textContent = 'Documentação';
      a.style.cssText = 'display:flex;align-items:center;gap:.5rem;padding:.5rem .75rem;text-decoration:none;';
    }
    return a;
  }

  function inject() {
    try {
      var supports = findSupportLinks();
      if (!supports.length) return;
      supports.forEach(function (support) {
        var menu = support.closest('.next-dd-menu, .ember-basic-dropdown-content, [role="menu"], .user-menu') || support.parentElement;
        if (alreadyHasDocs(menu)) return;
        var item = buildItem(support);
        // Insert immediately after support item (or its wrapper li)
        var anchor = support.closest('li, .next-dd-item-wrapper, [class*="nav-item"]') || support;
        if (anchor.parentNode) {
          if (anchor.nextSibling) anchor.parentNode.insertBefore(item, anchor.nextSibling);
          else anchor.parentNode.appendChild(item);
        }
      });
    } catch (e) {}
  }

  setInterval(inject, 800);
  document.addEventListener('DOMContentLoaded', inject);
  document.addEventListener('click', function () {
    setTimeout(inject, 50);
    setTimeout(inject, 300);
  }, true);
  new MutationObserver(function () {
    inject();
  }).observe(document.documentElement, { childList: true, subtree: true });
})();
/* FAUCON_DOCS_MENU_V1_END */

/* FAUCON_TORRE_MENU_V1 — Torre de Controlo after Documentação */
(function () {
  var HREF = '/torre/';
  var ID = 'faucon-torre-nav-item';
  function textOf(el) { return (el.textContent || '').replace(/\s+/g, ' ').trim(); }
  function findDocsLinks() {
    return Array.prototype.slice.call(document.querySelectorAll('a')).filter(function (a) {
      return a.id === 'faucon-documentation-nav-item' || /^Documenta[cç][aã]o$/i.test(textOf(a)) || (a.getAttribute('href') || '').indexOf('/docs/sistema') === 0;
    });
  }
  function already(scope) {
    return !!(scope && (scope.querySelector('#' + ID) || scope.querySelector('a[href="' + HREF + '"]')));
  }
  function build(template) {
    var a = document.createElement('a');
    a.id = ID;
    a.href = HREF;
    a.target = '_blank';
    a.rel = 'noopener';
    a.className = (template && template.className ? template.className : 'next-dd-item') + ' faucon-torre-nav-item';
    a.setAttribute('data-faucon-torre', '1');
    if (template) {
      a.innerHTML = template.innerHTML;
      var replaced = false;
      a.querySelectorAll('span,div').forEach(function (n) {
        if (replaced || n.children.length) return;
        if (textOf(n)) { n.textContent = 'Torre de Controlo'; replaced = true; }
      });
      if (!replaced) {
        var icons = a.querySelectorAll('svg,i,.fa,.fas,.far,.svg-inline--fa');
        a.textContent = '';
        icons.forEach(function (ic) { a.appendChild(ic.cloneNode(true)); });
        var span = document.createElement('span');
        span.textContent = 'Torre de Controlo';
        a.appendChild(span);
      }
    } else {
      a.textContent = 'Torre de Controlo';
      a.style.cssText = 'display:flex;align-items:center;gap:.5rem;padding:.5rem .75rem;text-decoration:none;';
    }
    return a;
  }
  function inject() {
    try {
      var docs = findDocsLinks();
      if (!docs.length) return;
      docs.forEach(function (doc) {
        var menu = doc.closest('.next-dd-menu, .ember-basic-dropdown-content, [role="menu"], .user-menu') || doc.parentElement;
        if (already(menu)) return;
        var item = build(doc);
        var anchor = doc.closest('li, .next-dd-item-wrapper, [class*="nav-item"]') || doc;
        if (anchor.parentNode) {
          if (anchor.nextSibling) anchor.parentNode.insertBefore(item, anchor.nextSibling);
          else anchor.parentNode.appendChild(item);
        }
      });
    } catch (e) {}
  }
  setInterval(inject, 900);
  document.addEventListener('DOMContentLoaded', inject);
  document.addEventListener('click', function () { setTimeout(inject, 80); setTimeout(inject, 320); }, true);
  new MutationObserver(inject).observe(document.documentElement, { childList: true, subtree: true });
})();
/* FAUCON_TORRE_MENU_V1_END */

/* FAUCON_FAVICON_SYNC_V1 — use branding icon (login/panel) as system favicon */
(function () {
  var applied = '';
  var FALLBACK = '/favicon/favicon-32x32.png?v=faucon-brand';

  function upsertLink(rel, href, attrs) {
    attrs = attrs || {};
    var sel = 'link[rel="' + rel + '"]';
    if (attrs.sizes) sel += '[sizes="' + attrs.sizes + '"]';
    var el = document.head.querySelector(sel);
    if (!el) {
      el = document.createElement('link');
      el.setAttribute('rel', rel);
      if (attrs.sizes) el.setAttribute('sizes', attrs.sizes);
      if (attrs.type) el.setAttribute('type', attrs.type);
      document.head.appendChild(el);
    }
    if (el.getAttribute('href') !== href) el.setAttribute('href', href);
  }

  function applyIcon(url) {
    if (!url || url === applied) return;
    applied = url;
    try { window.__fauconBrandIcon = url; } catch (e) {}
    var bust = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'fav=' + Date.now();
    upsertLink('icon', bust, { type: 'image/png' });
    upsertLink('shortcut icon', bust, {});
    upsertLink('apple-touch-icon', bust, { sizes: '180x180' });
    // Keep PNG size variants pointing at brand mark too
    upsertLink('icon', bust, { type: 'image/png', sizes: '32x32' });
    upsertLink('icon', bust, { type: 'image/png', sizes: '16x16' });
  }

  function fromDom() {
    try {
      var img = document.querySelector(
        '.logo-icon img, .fleetbase-logo-icon img, img.logo-icon, [class*="logo-icon"] img, .auth-wrapper img, .login-wrapper img'
      );
      if (img && img.src && /\/(storage|uploads|favicon|images)\//i.test(img.src)) {
        return img.src;
      }
    } catch (e) {}
    return null;
  }

  function sync() {
    try {
      var fromImg = fromDom();
      if (fromImg) {
        applyIcon(fromImg);
        return;
      }
      // Branding already loaded into Ember? probe common global / meta
      if (!window.__fauconFaviconFetched) {
        window.__fauconFaviconFetched = true;
        var api =
          (window.Faucon && window.Faucon.API_HOST) ||
          (document.querySelector('meta[name="api-host"]') &&
            document.querySelector('meta[name="api-host"]').content) ||
          '';
        var candidates = [];
        try {
          var cfg = window.FleetbaseConsoleConfig || window.fleetbaseConfig;
          if (cfg && cfg.API && cfg.API.host) api = cfg.API.host;
        } catch (e) {}
        if (api) candidates.push(String(api).replace(/\/$/, '') + '/int/v1/settings/branding');
        candidates.push('/int/v1/settings/branding');
        // Relative via console proxy rarely exists; try localhost API from config file fetch
        fetch('/fleetbase.config.json', { cache: 'no-store' })
          .then(function (r) {
            return r.ok ? r.json() : null;
          })
          .then(function (cfg) {
            var host =
              (cfg && cfg.API_HOST) ||
              (cfg && cfg.API && (cfg.API.host || cfg.API.HOST)) ||
              null;
            if (host) candidates.unshift(String(host).replace(/\/$/, '') + '/int/v1/settings/branding');
            return fetchBrand(candidates);
          })
          .catch(function () {
            return fetchBrand(candidates);
          });
      }
      if (!applied) applyIcon(FALLBACK);
    } catch (e) {}
  }

  function fetchBrand(urls) {
    var i = 0;
    function next() {
      if (i >= urls.length) {
        if (!applied) applyIcon(FALLBACK);
        return;
      }
      var u = urls[i++];
      fetch(u, { credentials: 'omit', cache: 'no-store' })
        .then(function (r) {
          return r.ok ? r.json() : null;
        })
        .then(function (data) {
          var icon =
            (data && data.brand && data.brand.icon_url) ||
            (data && data.icon_url) ||
            null;
          if (icon) applyIcon(icon);
          else next();
        })
        .catch(next);
    }
    next();
  }

  applyIcon(FALLBACK);
  document.addEventListener('DOMContentLoaded', sync);
  setInterval(sync, 1500);
  new MutationObserver(function () {
    sync();
  }).observe(document.documentElement, { childList: true, subtree: true });
})();
/* FAUCON_FAVICON_SYNC_V1_END */

/* FAUCON_LEGAL_NOTICE_V1 — hide license link buttons; use login/brand icon */
(function () {
  var FALLBACK = '/images/icon.png';

  function loginIcon() {
    try {
      if (window.__fauconBrandIcon) return window.__fauconBrandIcon;
      var img = document.querySelector(
        '.auth-wrapper img, .login-wrapper img, .logo-icon img, .fleetbase-logo-icon img, img.logo-icon, [class*="logo-icon"] img'
      );
      if (img && img.src && !/fleetbase\.io\/images\/filled-icon/i.test(img.src)) return img.src;
    } catch (e) {}
    return FALLBACK;
  }

  function patch() {
    try {
      document.querySelectorAll('.fleetbase-legal-notice-links').forEach(function (el) {
        el.style.display = 'none';
        el.setAttribute('hidden', 'hidden');
      });
      var icon = loginIcon();
      document.querySelectorAll('img.fleetbase-legal-notice-logo, .fleetbase-legal-notice-logo img, .fleetbase-legal-notice-hero img').forEach(function (img) {
        if (!img || !icon) return;
        if (img.getAttribute('src') !== icon) {
          img.setAttribute('src', icon);
          img.setAttribute('alt', 'Faucon');
        }
      });
    } catch (e) {}
  }

  document.addEventListener('DOMContentLoaded', patch);
  setInterval(patch, 800);
  new MutationObserver(patch).observe(document.documentElement, { childList: true, subtree: true });
})();
/* FAUCON_LEGAL_NOTICE_V1_END */

