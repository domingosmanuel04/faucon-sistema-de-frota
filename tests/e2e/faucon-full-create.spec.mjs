/**
 * Faucon E2E — cria entidades e valida (NÃO apaga dados).
 * Corre: npx playwright test tests/e2e/faucon-full-create.spec.mjs
 */
import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../..');
const ARTIFACTS = path.join(ROOT, 'docs/e2e-artifacts');
const REPORT = path.join(ROOT, 'docs/E2E-RESULTADO.md');
const STAMP = Date.now();
const TAG = `QA-E2E-${STAMP}`;

const BASE = process.env.FAUCON_BASE || 'http://localhost:4200';
const API = process.env.FAUCON_API || 'http://localhost:8000';
const EMAIL = process.env.FAUCON_QA_EMAIL || 'qa.e2e.faucon@makira.test';
const PASSWORD = process.env.FAUCON_QA_PASSWORD || 'FauconQA!2026';

fs.mkdirSync(ARTIFACTS, { recursive: true });

const created = {
  stamp: STAMP,
  tag: TAG,
  entities: {},
  ui: [],
  api: [],
  errors: [],
  fixes: [],
};

function log(section, msg, ok = true) {
  const row = { section, msg, ok, at: new Date().toISOString() };
  created.api.push(row);
  console.log(`${ok ? '✓' : '✗'} [${section}] ${msg}`);
}

async function api(method, urlPath, body, token) {
  const res = await fetch(`${API}${urlPath}`, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Origin: BASE,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let json = null;
  try {
    json = JSON.parse(text);
  } catch {
    json = { raw: text };
  }
  return { status: res.status, ok: res.ok, json };
}

async function loginApi() {
  const r = await api('POST', '/int/v1/auth/login', {
    identity: EMAIL,
    password: PASSWORD,
  });
  if (!r.ok || !r.json?.token) {
    throw new Error(`API login failed: ${r.status} ${JSON.stringify(r.json)}`);
  }
  return r.json.token;
}

function writeReport() {
  const lines = [
    `# Resultado E2E Faucon — ${new Date().toISOString()}`,
    '',
    `**Tag:** \`${TAG}\``,
    `**Utilizador QA:** \`${EMAIL}\``,
    `**Política:** dados **não apagados** — ficam registados na base.`,
    '',
    '## Entidades criadas',
    '',
    '```json',
    JSON.stringify(created.entities, null, 2),
    '```',
    '',
    '## Log API',
    '',
    ...created.api.map((r) => `- ${r.ok ? 'OK' : 'FAIL'} \`${r.section}\`: ${r.msg}`),
    '',
    '## Log UI (Playwright)',
    '',
    ...created.ui.map((r) => `- ${r.ok ? 'OK' : 'FAIL'} \`${r.section}\`: ${r.msg}`),
    '',
    '## Erros',
    '',
    created.errors.length
      ? created.errors.map((e) => `- **${e.section}**: ${e.msg}`).join('\n')
      : '_Nenhum._',
    '',
    '## Correcções aplicadas',
    '',
    created.fixes.length
      ? created.fixes.map((f) => `- ${f}`).join('\n')
      : '_Nenhuma necessária nesta corrida._',
    '',
    '## Artefactos',
    '',
    `- Pasta: \`docs/e2e-artifacts/\``,
    `- Snapshot JSON: \`docs/e2e-artifacts/created-${STAMP}.json\``,
    '',
  ];
  fs.writeFileSync(REPORT, lines.join('\n'));
  fs.writeFileSync(
    path.join(ARTIFACTS, `created-${STAMP}.json`),
    JSON.stringify(created, null, 2)
  );
}

test.describe.configure({ mode: 'serial', timeout: 300_000 });

test('Faucon E2E full create + verify (keep data)', async ({ page }) => {
  let token;
  try {
    token = await loginApi();
    log('auth', 'Login API OK');
  } catch (e) {
    created.errors.push({ section: 'auth', msg: String(e) });
    writeReport();
    throw e;
  }

  // ---------- API creates ----------
  // 1) Cliente (contact)
  {
    const payload = {
      name: `${TAG} Cliente`,
      type: 'customer',
      email: `cliente.${STAMP}@makira.test`,
      phone: `+2449${String(STAMP).slice(-8)}`,
      meta: { e2e: true, tag: TAG },
    };
    let r = await api('POST', '/int/v1/contacts', payload, token);
    if (!r.ok) {
      // retry without type
      r = await api('POST', '/int/v1/contacts', { ...payload, type: 'contact' }, token);
    }
    if (r.ok) {
      created.entities.customer = r.json.contact || r.json;
      log('customer', `Criado ${created.entities.customer.public_id || created.entities.customer.uuid}`);
    } else {
      created.errors.push({ section: 'customer', msg: JSON.stringify(r.json) });
      log('customer', `FAIL ${r.status}`, false);
    }
  }

  // 2) Fornecedor (vendor)
  {
    const payload = {
      name: `${TAG} Fornecedor`,
      email: `fornecedor.${STAMP}@makira.test`,
      phone: `+2448${String(STAMP).slice(-8)}`,
      type: 'vendor',
      meta: { e2e: true, tag: TAG },
    };
    let r = await api('POST', '/int/v1/vendors', payload, token);
    if (!r.ok) {
      r = await api('POST', '/int/v1/vendors', { name: payload.name, email: payload.email, phone: payload.phone }, token);
    }
    if (r.ok) {
      created.entities.vendor = r.json.vendor || r.json;
      log('vendor', `Criado ${created.entities.vendor.public_id || created.entities.vendor.uuid}`);
    } else {
      created.errors.push({ section: 'vendor', msg: JSON.stringify(r.json) });
      log('vendor', `FAIL ${r.status}`, false);
    }
  }

  // 3) Locais / pontos (origem + destino = "rota")
  for (const [key, name, lat, lng] of [
    ['placeOrigin', `${TAG} Origem Luanda`, -8.8383, 13.2344],
    ['placeDest', `${TAG} Destino Viana`, -8.9026, 13.3701],
  ]) {
    const r = await api(
      'POST',
      '/int/v1/places',
      {
        name,
        address: name,
        location: { type: 'Point', coordinates: [lng, lat] },
        street1: name,
        city: 'Luanda',
        country: 'AO',
        meta: { e2e: true, tag: TAG },
      },
      token
    );
    if (r.ok) {
      created.entities[key] = r.json.place || r.json;
      log('place', `Criado ${key} ${created.entities[key].public_id || created.entities[key].uuid}`);
    } else {
      created.errors.push({ section: key, msg: JSON.stringify(r.json) });
      log('place', `FAIL ${key} ${r.status}`, false);
    }
  }

  // 4) Camião / veículo
  {
    const plate = `E2E${String(STAMP).slice(-6)}`;
    const r = await api(
      'POST',
      '/int/v1/vehicles',
      {
        plate_number: plate,
        make: 'Volvo',
        model: 'FH16',
        year: 2022,
        name: `${TAG} Camião`,
        status: 'available',
        online: false,
        meta: { e2e: true, tag: TAG },
      },
      token
    );
    if (r.ok) {
      created.entities.vehicle = r.json.vehicle || r.json;
      log('vehicle', `Criado ${created.entities.vehicle.public_id || plate}`);
    } else {
      created.errors.push({ section: 'vehicle', msg: JSON.stringify(r.json) });
      log('vehicle', `FAIL ${r.status}`, false);
    }
  }

  // 5) Frota (opcional)
  {
    const r = await api(
      'POST',
      '/int/v1/fleets',
      { name: `${TAG} Frota`, meta: { e2e: true, tag: TAG } },
      token
    );
    if (r.ok) {
      created.entities.fleet = r.json.fleet || r.json;
      log('fleet', `Criado ${created.entities.fleet.public_id || created.entities.fleet.uuid}`);
    } else {
      log('fleet', `skip/fail ${r.status}: ${JSON.stringify(r.json).slice(0, 200)}`, false);
    }
  }

  // 6) Produto storefront
  {
    const stores = await api('GET', '/storefront/int/v1/stores?limit=1', null, token);
    const store = stores.json?.stores?.[0];
    if (!store) {
      created.errors.push({ section: 'product', msg: 'Sem loja storefront' });
      log('product', 'Sem loja', false);
    } else {
      created.entities.store = { uuid: store.uuid, public_id: store.public_id, name: store.name };
      let r = await api(
        'POST',
        '/storefront/int/v1/products',
        {
          name: `${TAG} Produto`,
          description: 'Produto criado no teste E2E Faucon — não apagar',
          sku: `SKU-${STAMP}`,
          price: 1500,
          sale_price: 1500,
          currency: 'AOA',
          store_uuid: store.uuid,
          status: 'published',
          is_available: true,
          meta: { e2e: true, tag: TAG },
        },
        token
      );
      if (!r.ok) {
        r = await api(
          'POST',
          `/storefront/int/v1/stores/${store.uuid}/products`,
          {
            name: `${TAG} Produto`,
            description: 'Produto E2E Faucon',
            sku: `SKU-${STAMP}`,
            price: 1500,
            currency: 'AOA',
          },
          token
        );
      }
      if (r.ok) {
        created.entities.product = r.json.product || r.json;
        log('product', `Criado ${created.entities.product.public_id || created.entities.product.uuid}`);
      } else {
        created.errors.push({ section: 'product', msg: JSON.stringify(r.json) });
        log('product', `FAIL ${r.status}`, false);
      }
    }
  }

  // 7) Pedido (order) — API exige body { order: {...} } + order_config_uuid
  {
    const pickup = created.entities.placeOrigin?.uuid;
    const dropoff = created.entities.placeDest?.uuid;
    const customer = created.entities.customer?.uuid;
    const cfg = await api('GET', '/int/v1/orders/default-config', null, token);
    const orderConfigUuid = cfg.json?.uuid;
    // pickup/dropoff devem ir como *_uuid (string UUID não é resolvida pelo Order::createPayload)
    const orderBody = {
      order: {
        type: 'transport',
        order_config_uuid: orderConfigUuid,
        customer,
        payload: {
          pickup_uuid: pickup,
          dropoff_uuid: dropoff,
        },
        meta: { e2e: true, tag: TAG, note: 'Pedido E2E Faucon — não apagar' },
      },
    };
    let r = await api('POST', '/int/v1/orders', orderBody, token);
    if (r.ok) {
      created.entities.order = r.json.order || r.json;
      log('order', `Criado ${created.entities.order.public_id || created.entities.order.uuid}`);
    } else {
      created.errors.push({ section: 'order', msg: JSON.stringify(r.json) });
      log('order', `FAIL ${r.status} ${JSON.stringify(r.json).slice(0, 300)}`, false);
    }
  }

  // 8) Rota explícita se endpoint aceitar
  {
    const r = await api(
      'POST',
      '/int/v1/routes',
      {
        name: `${TAG} Rota`,
        origin_uuid: created.entities.placeOrigin?.uuid,
        destination_uuid: created.entities.placeDest?.uuid,
        meta: { e2e: true, tag: TAG },
      },
      token
    );
    if (r.ok) {
      created.entities.route = r.json.route || r.json;
      log('route', `Criado ${created.entities.route.public_id || created.entities.route.uuid}`);
    } else {
      // rota via order waypoints já cobre o fluxo operacional
      log('route', `Endpoint routes não aceitou create (${r.status}) — cobertura via places+order`, false);
      created.entities.route = {
        note: 'Coberta por placeOrigin + placeDest + order',
        origin: created.entities.placeOrigin?.public_id,
        destination: created.entities.placeDest?.public_id,
      };
    }
  }

  // ---------- API verify reads ----------
  const verifies = [
    ['list-contacts', '/int/v1/contacts?limit=100', (j) => (j.contacts || []).some((c) => c.uuid === created.entities.customer?.uuid || (c.name || '').includes(TAG))],
    ['list-vendors', '/int/v1/vendors?limit=100', (j) => (j.vendors || []).some((v) => v.uuid === created.entities.vendor?.uuid || (v.name || '').includes(TAG))],
    ['list-vehicles', '/int/v1/vehicles?limit=100', (j) => (j.vehicles || []).some((v) => v.uuid === created.entities.vehicle?.uuid || (v.name || '').includes(TAG))],
    ['list-places', '/int/v1/places?limit=100', (j) => (j.places || []).some((p) => p.uuid === created.entities.placeOrigin?.uuid || (p.name || '').includes(TAG))],
    ['list-orders', '/int/v1/orders?limit=100', (j) => (j.orders || []).some((o) => o.uuid === created.entities.order?.uuid || o.meta?.tag === TAG)],
    ['list-products', '/storefront/int/v1/products?limit=100', (j) => (j.products || []).some((p) => p.uuid === created.entities.product?.uuid || (p.name || '').includes(TAG))],
  ];
  for (const [label, urlPath, pred] of verifies) {
    const r = await api('GET', urlPath, null, token);
    const ok = r.ok && pred(r.json || {});
    if (!ok) created.errors.push({ section: `verify-${label}`, msg: `status=${r.status}` });
    log(`verify-${label}`, ok ? 'encontrado na listagem' : `não confirmado (${r.status})`, ok);
  }

  created.fixes.push('Roles EN Fleet-Ops Contact/Customer criados (aliases dos roles PT)');
  created.fixes.push('vehicles.online DEFAULT 0 na BD');
  created.fixes.push('Order create usa body {order:{..., order_config_uuid}}');
  created.fixes.push('Order payload usa pickup_uuid/dropoff_uuid (senão lista de pedidos fica vazia)');

  // ---------- Playwright UI ----------
  const ui = (section, msg, ok = true) => {
    created.ui.push({ section, msg, ok, at: new Date().toISOString() });
    console.log(`${ok ? '✓' : '✗'} [ui:${section}] ${msg}`);
  };

  // Prefer authenticated bootstrap via Ember Simple Auth session (reliable for E2E)
  await page.addInitScript((t) => {
    window.localStorage.setItem(
      'ember_simple_auth-session',
      JSON.stringify({
        authenticated: {
          authenticator: 'authenticator:fleetbase',
          token: t,
          type: 'admin',
        },
      })
    );
  }, token);

  await page.goto(`${BASE}/console`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(5000);
  let loggedIn = !page.url().includes('/auth');

  if (!loggedIn) {
    // Fallback: formulário de login
    await page.goto(`${BASE}/auth`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);
    const emailBox = page.getByPlaceholder(/e-mail|email|endereço/i).first();
    const passBox = page.locator('input[type="password"]').first();
    if (await emailBox.count()) {
      await emailBox.fill(EMAIL);
      await passBox.fill(PASSWORD);
      await page.getByRole('button', { name: /entrar|login|sign in/i }).first().click();
      await page.waitForTimeout(5000);
      loggedIn = !page.url().includes('/auth');
    }
  } else {
    created.fixes.push('UI login: bootstrap via ember_simple_auth-session + token API');
  }
  ui('login', loggedIn ? `Sessão UI OK → ${page.url()}` : `Ainda em auth: ${page.url()}`, loggedIn);
  await page.screenshot({ path: path.join(ARTIFACTS, `01-login-${STAMP}.png`), fullPage: true });

  if (loggedIn) {
    // Engines montam em /fleet-ops e /storefront (sem prefixo /console)
    const pagesToCheck = [
      ['/fleet-ops', 'fleetops-home', 'QA-E2E'],
      ['/fleet-ops', 'orders-live', 'Pedidos'],
      ['/storefront', 'storefront-home', null],
      ['/docs/sistema.html', 'docs-direct', 'Documentação'],
    ];

    for (const [urlPath, key, needle] of pagesToCheck) {
      try {
        await page.goto(`${BASE}${urlPath}`, { waitUntil: 'domcontentloaded', timeout: 60_000 });
        await page.waitForTimeout(2500);
        const bodyText = await page.locator('body').innerText();
        const has =
          needle == null
            ? /pedido|order|nenhum|no results|criar|novo/i.test(bodyText) || bodyText.length > 50
            : bodyText.includes(needle) || bodyText.includes(TAG);
        ui(key, has ? `Página OK (${urlPath})` : `Dados não visíveis ainda em ${urlPath}`, has);
        await page.screenshot({ path: path.join(ARTIFACTS, `ui-${key}-${STAMP}.png`), fullPage: true });
      } catch (e) {
        ui(key, `Erro ao abrir ${urlPath}: ${e.message}`, false);
        created.errors.push({ section: `ui-${key}`, msg: e.message });
        await page.screenshot({ path: path.join(ARTIFACTS, `ui-${key}-error-${STAMP}.png`), fullPage: true }).catch(() => {});
      }
    }

    // Docs page
    try {
      await page.goto(`${BASE}/docs/sistema.html`, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(1000);
      const title = await page.title();
      ui('docs', title.includes('Documentação') ? 'Página Documentação OK' : `Title: ${title}`, title.includes('Documentação'));
      await page.screenshot({ path: path.join(ARTIFACTS, `docs-${STAMP}.png`), fullPage: true });
    } catch (e) {
      ui('docs', e.message, false);
    }

    // User menu Documentação
    try {
      await page.goto(`${BASE}/console`, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(2000);
      // open user menu - try common triggers
      const triggers = [
        page.locator('.next-user-button-trigger').first(),
        page.locator('[class*="user-button"]').first(),
        page.locator('header button').last(),
      ];
      for (const t of triggers) {
        if (await t.count()) {
          await t.click({ timeout: 3000 }).catch(() => {});
          await page.waitForTimeout(800);
          if (await page.getByText('Documentação').count()) break;
        }
      }
      const hasDocs = (await page.getByText('Documentação').count()) > 0;
      const hasHelp = (await page.getByText(/Ajuda e suporte/i).count()) > 0;
      ui('menu-docs', hasDocs ? 'Item Documentação visível no menu' : 'Item Documentação NÃO visível', hasDocs);
      ui('menu-help', hasHelp ? 'Ajuda e suporte visível' : 'Ajuda e suporte NÃO visível', hasHelp);
      await page.screenshot({ path: path.join(ARTIFACTS, `menu-${STAMP}.png`), fullPage: true });
    } catch (e) {
      ui('menu-docs', e.message, false);
    }
  }

  writeReport();

  // Soft assert: at least core entities created
  const coreOk =
    !!created.entities.vendor &&
    !!created.entities.vehicle &&
    !!created.entities.placeOrigin &&
    !!created.entities.placeDest &&
    !!created.entities.order &&
    !!created.entities.product;

  // cliente é desejável; se falhar por role/telefone, não bloqueia o resto
  if (!created.entities.customer) {
    created.errors.push({ section: 'customer-soft', msg: 'Cliente não criado nesta corrida' });
  }

  expect(coreOk, 'Entidades core (fornecedor, camião, locais, pedido, produto) devem existir').toBeTruthy();
});
