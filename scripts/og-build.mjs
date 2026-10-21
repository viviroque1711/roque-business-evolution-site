// Gera favicons e imagens de compartilhamento (1200x630: símbolo + título em fundo tinta) com Chrome headless e as fontes do site.
// Uso: node scripts/og-build.mjs <caminho do puppeteer-core>   (só roda no computador, não no deploy)
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..');
const pup = await import(pathToFileURL(path.resolve(process.argv[2])).href);
const CHROME = process.env.CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
// as fontes entram no HTML como data URI (o Chrome não carrega arquivos locais a partir de setContent)
const fontCss = (f) => {
  const dir = path.join(root, 'node_modules', '@fontsource', f.split('/')[0]);
  const re = /url\(\.\/files\/([^)]+\.woff2)\) format\('woff2'\), url\([^)]+\) format\('woff'\)/g;
  return fs.readFileSync(path.join(dir, f.split('/')[1]), 'utf8').replace(re, (m, file) => `url(data:font/woff2;base64,${fs.readFileSync(path.join(dir, 'files', file)).toString('base64')}) format('woff2')`);
};
const b64 = (p) => 'data:image/png;base64,' + fs.readFileSync(path.join(root, p)).toString('base64');

const PAGES = {
  home: ['Agência de IA, sites e software', 'Roque Business Evolution'],
  'agencia-de-ia': ['Agência de IA', 'Agentes de inteligência artificial e automação'],
  'criacao-de-sites': ['Criação de sites profissionais', 'Com SEO e foco em conversão'],
  seo: ['SEO e busca com IA', 'Para ser encontrado no Google e nas buscas com IA'],
  'desenvolvimento-de-software': ['Desenvolvimento de software sob medida', 'Do MVP ao sistema em produção'],
  saas: ['Desenvolvimento de SaaS', 'Plataformas multiempresa'],
  'transformacao-digital': ['Transformação digital', 'Consultoria para modernizar processos e adotar IA'],
  engagebot: ['EngageBot', 'Atendimento com IA no WhatsApp e no site'],
  servicos: ['Serviços da Roque', 'IA, sites, SEO, software e estratégia'],
  sobre: ['Sobre a Roque Business Evolution', 'E a fundadora Viviane Roque'],
  contato: ['Fale com a Roque', 'WhatsApp +55 11 97396-7161'],
  'pesquisa-de-palavras-chave': ['Pesquisa de palavras-chave', 'Intenção de busca e mapa por página'],
  'geo-aeo': ['GEO e AEO', 'SEO para buscas com inteligência artificial'],
  'marketing-de-conteudo': ['Marketing de conteúdo', 'Estratégia editorial e autoridade temática'],
  'marketing-digital': ['Marketing digital e mídia paga', 'Google Ads, Meta Ads e funis'],
  branding: ['Branding e identidade digital', 'Posicionamento, identidade e tom de voz'],
  'crm-e-vendas': ['CRM e vendas', 'Funil de vendas e follow-ups'],
  'reputacao-digital': ['Reputação digital', 'Avaliações, feedback e fidelização'],
  'automacao-de-processos': ['Automação de processos', 'Fluxos e integrações com IA'],
  'dados-e-bi': ['Dados e business intelligence', 'Dashboards, indicadores e relatórios'],
  'capacitacao-em-ia': ['Capacitação em IA', 'Treinamento e uso responsável'],
  'governanca-de-ia': ['Governança e segurança de IA', 'Controles, auditoria e aprovação humana'],
  'suporte-e-evolucao': ['Suporte e evolução contínua', 'Monitoramento e melhoria'],
  'agentes-de-ia-whatsapp': ['Agente de IA para WhatsApp', 'Atendimento automático'],
  'agentes-de-ia-vendas': ['Agente de IA para vendas', 'Qualificação de leads'],
  'agentes-de-ia-suporte': ['Agente de IA para suporte', 'Pós-venda e onboarding'],
  proposito: ['Propósito e impacto', 'Fortalecer empresas e comunidades'],
  pme: ['Para pequenas e médias empresas', 'Tecnologia e IA no tamanho da sua operação'],
  enterprise: ['Para grandes empresas', 'Transformação digital e governança'],
  metodologia: ['Metodologia em sete fases', 'Do diagnóstico à evolução contínua'],
  'como-contratar': ['Como contratar', 'Projetos, recorrência e consultoria'],
  diagnostico: ['Diagnóstico digital e de IA', 'O primeiro passo para evoluir'],
  produtos: ['Produtos da Roque', 'Aurora Premium e EngageBot'],
  faq: ['Perguntas frequentes', 'Roque Business Evolution'],
  glossario: ['Glossário de IA, SEO e transformação digital', 'Termos explicados de forma simples'],
  blog: ['Blog da Roque', 'IA, SEO, automação e transformação digital'],
};
const css = ['unbounded/latin-500.css', 'instrument-sans/latin-400.css', 'instrument-sans/latin-600.css'].map(fontCss).join('\n');
const html = (t, s) => `<!doctype html><meta charset="utf-8"><style>${css}
*{box-sizing:border-box}body{margin:0;width:1200px;height:630px;background:#16233A;position:relative;overflow:hidden;color:#fff}
.sym{position:absolute;right:70px;top:120px;width:360px;opacity:.95}
.t{position:absolute;left:72px;top:150px;width:660px}
h1{font:500 54px/1.15 "Unbounded";margin:0 0 24px;letter-spacing:-.015em}
p{font:400 30px/1.35 "Instrument Sans";color:#C9D1DE;margin:0}
.n{position:absolute;left:72px;bottom:56px;font:600 26px "Instrument Sans";display:flex;align-items:center;gap:14px}
.n i{display:block;width:44px;height:2px;background:#A87000}
</style><img class="sym" src="${b64('public/img/roque-simbolo.png')}"><div class="t"><h1>${t}</h1><p>${s}</p></div><div class="n"><i></i>roquebusinessevolution.com</div>`;

const b = await (pup.default ?? pup).launch({ executablePath: CHROME, headless: 'new' });
const pg = await b.newPage(); await pg.setViewport({ width: 1200, height: 630 });
fs.mkdirSync(path.join(root, 'public', 'og'), { recursive: true });
for (const [k, [t, s]] of Object.entries(PAGES)) {
  await pg.setContent(html(t, s), { waitUntil: 'load', timeout: 60000 });
  await pg.evaluate(() => document.fonts.ready);
  await pg.screenshot({ path: path.join(root, 'public', 'og', k + '.jpg'), type: 'jpeg', quality: 82 });
}
await b.close();
// ícones: o símbolo (ouro) sobre transparente para o favicon; sobre tinta para apple-touch e Android
const pub = path.join(root, 'public');
const sym = path.join(pub, 'img', 'roque-simbolo.png');
const square = (size, pad, bg) => sharp(sym).resize(Math.round(size * (1 - pad * 2)), Math.round(size * (1 - pad * 2)), { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).extend({ top: Math.round(size * pad), bottom: Math.round(size * pad), left: Math.round(size * pad), right: Math.round(size * pad), background: bg }).resize(size, size).png().toBuffer();
const clear = { r: 0, g: 0, b: 0, alpha: 0 }, ink = { r: 22, g: 35, b: 58, alpha: 1 };
fs.writeFileSync(path.join(pub, 'favicon-32x32.png'), await square(32, .04, clear));
fs.writeFileSync(path.join(pub, 'favicon-16x16.png'), await square(16, .02, clear));
fs.writeFileSync(path.join(pub, 'apple-touch-icon.png'), await square(180, .16, ink));
fs.writeFileSync(path.join(pub, 'android-chrome-192x192.png'), await square(192, .16, ink));
fs.writeFileSync(path.join(pub, 'android-chrome-512x512.png'), await square(512, .16, ink));
const png48 = await square(48, .04, clear);
const hdr = Buffer.alloc(22); hdr.writeUInt16LE(0, 0); hdr.writeUInt16LE(1, 2); hdr.writeUInt16LE(1, 4);
hdr.writeUInt8(48, 6); hdr.writeUInt8(48, 7); hdr.writeUInt16LE(1, 10); hdr.writeUInt16LE(32, 12); hdr.writeUInt32LE(png48.length, 14); hdr.writeUInt32LE(22, 18);
fs.writeFileSync(path.join(pub, 'favicon.ico'), Buffer.concat([hdr, png48]));
console.log('og e ícones gerados');
