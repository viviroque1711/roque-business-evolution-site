// Auditoria "lida como robo" (HTML cru, sem JavaScript) da home e conferencia dos arquivos de busca.
// Roda no deploy e antes de publicar qualquer mudanca de conteudo: `node scripts/audit-robo.mjs [pasta-do-dist | url-base]`.
// Regras (auditoria de 04/11/2026):
//  - exatamente 1 <h1>, em texto corrido, sem links;
//  - nenhum nome ou dominio ficticio em texto visivel ("Sua Empresa", "suaempresa", "guia-local");
//  - blocos de demonstracao com texto repetido existem UMA vez no HTML (copias nascem por JS: data-clone-de);
//  - listas de tags em <ul><li>, nunca spans colados;
//  - rotulo "Simulacao" no card do assistente de IA e data-nosnippet nas animacoes;
//  - nenhum link para engagebot.com.br enquanto o site novo do EngageBot nao estiver publicado;
//  - JSON-LD valido (Organization com CNPJ, ProfessionalService com area atendida, WebSite, FAQPage igual ao FAQ visivel).
import fs from "node:fs";
import path from "node:path";

const alvo = process.argv[2] || path.resolve(import.meta.dirname, "..", "dist");
const falhas = [];
const avisos = [];
const ok = (cond, msg) => { if (!cond) falhas.push(msg); };

async function ler(rota) {
  if (/^https?:\/\//.test(alvo)) {
    const r = await fetch(alvo.replace(/\/$/, "") + rota);
    return { status: r.status, text: await r.text() };
  }
  const f = path.join(alvo, rota, "index.html");
  const g = rota === "/robots.txt" || rota === "/sitemap.xml" || rota === "/llms.txt" ? path.join(alvo, rota) : f;
  return fs.existsSync(g) ? { status: 200, text: fs.readFileSync(g, "utf8") } : { status: 404, text: "" };
}

const home = await ler("/");
ok(home.status === 200, "home nao encontrada");
const h = home.text;
const visivel = h.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<style[\s\S]*?<\/style>/g, "");

const h1s = [...h.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)];
ok(h1s.length === 1, `esperava 1 <h1>, achei ${h1s.length}`);
if (h1s[0]) {
  ok(!/<a\b/.test(h1s[0][1]), "o <h1> nao pode ter links");
  ok(!/data-termo|<span|<i\b/.test(h1s[0][1]), "o <h1> nao pode ter termos animados");
}
ok(!/Sua Empresa|suaempresa|guia-local/.test(visivel), 'a home tem nome/dominio ficticio ("Sua Empresa", "suaempresa", "guia-local")');
const integrado = (visivel.match(/Sistema integrado/g) || []).length;
ok(integrado === 1, `"Sistema integrado" deveria aparecer 1x no HTML cru, aparece ${integrado}x`);
ok(!/<span class="ig-sub"[^>]*>[^<]*<\/span><span class="ig-sub"/.test(h), "tags coladas: as tags precisam estar em <ul><li>");
ok(/<ul class="ig-subs">/.test(h), "lista de tags (ul.ig-subs) ausente");
ok(/Simulação/.test(visivel), 'falta o rotulo "Simulação" no card do assistente de IA');
ok(/<div class="tela-ia"[^>]*data-nosnippet/.test(h), "card do assistente de IA sem data-nosnippet");
ok(!/engagebot\.com\.br/.test(h), "a home ainda aponta para engagebot.com.br (usar /engagebot/ ate o site novo sair)");

// JSON-LD
const blocos = [...h.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
ok(blocos.length >= 1, "sem JSON-LD na home");
let nos = [];
try { nos = blocos.flatMap((b) => { const j = JSON.parse(b[1]); return j["@graph"] || [j]; }); } catch (e) { falhas.push("JSON-LD invalido: " + e.message); }
const tipo = (t) => nos.filter((n) => [].concat(n["@type"]).includes(t));
const org = tipo("Organization")[0];
ok(tipo("Organization").length === 1, "deveria haver 1 Organization");
ok(org && org.taxID === "47.308.584/0001-20", "Organization sem o CNPJ");
ok(org && org.logo, "Organization sem logo");
ok(org && (org.sameAs || []).some((u) => u.includes("instagram.com")), "sameAs sem Instagram");
ok(org && (org.sameAs || []).some((u) => u.includes("viviroque.com.br")), "sameAs sem viviroque.com.br");
if (!(org && (org.sameAs || []).some((u) => u.includes("linkedin.com")))) avisos.push("sameAs ainda sem a pagina da empresa no LinkedIn (aguardando a URL exata)");
const ps = tipo("ProfessionalService")[0] || tipo("LocalBusiness")[0];
ok(ps && JSON.stringify(ps.areaServed || []).includes("Guarulhos") && JSON.stringify(ps.areaServed).includes("São Paulo") && JSON.stringify(ps.areaServed).includes("Brasil"), "ProfessionalService/LocalBusiness sem areaServed (Guarulhos, São Paulo, Brasil)");
ok(tipo("WebSite").length === 1, "deveria haver 1 WebSite");
const faqLd = tipo("FAQPage")[0];
ok(faqLd && faqLd.mainEntity?.length > 0, "FAQPage ausente");
if (faqLd) {
  const norm = (s) => s.replace(/<[^>]+>/g, " ").replace(/&[a-z#0-9]+;/gi, " ").replace(/\s+/g, " ").trim();
  const textoVisivel = norm(visivel);
  for (const q of faqLd.mainEntity) ok(textoVisivel.includes(norm(q.name)), `pergunta do JSON-LD nao esta visivel na pagina: ${q.name}`);
}

// robots / sitemap / llms
const robots = await ler("/robots.txt");
for (const bot of ["Googlebot", "Bingbot", "GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended"]) ok(new RegExp("User-agent: " + bot).test(robots.text), `robots.txt sem ${bot}`);
ok(/Sitemap:\s*\S+sitemap\.xml/.test(robots.text), "robots.txt sem o endereco do sitemap");
const sm = await ler("/sitemap.xml");
const locs = (sm.text.match(/<loc>/g) || []).length;
ok(locs > 0 && locs === (sm.text.match(/<lastmod>/g) || []).length, "sitemap: toda URL precisa de lastmod");
const llms = await ler("/llms.txt");
ok(/^# Roque Business Evolution/.test(llms.text), "llms.txt sem o titulo da empresa");

// Outras paginas: so avisa (mapa de demonstracao com dominio ficticio marcado como exemplo ainda existe nelas)
if (!/^https?:\/\//.test(alvo)) {
  let outras = 0;
  const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).forEach((e) => { const p = path.join(d, e.name); if (e.isDirectory()) walk(p); else if (e.name === "index.html" && p !== path.join(alvo, "index.html")) { if (/suaempresa|guia-local/.test(fs.readFileSync(p, "utf8").replace(/<script[\s\S]*?<\/script>/g, ""))) outras++; } });
  walk(alvo);
  if (outras) avisos.push(`${outras} outra(s) pagina(s) ainda usam "suaempresa.com.br" em telas de exemplo (fora do escopo da home)`);
}

for (const a of avisos) console.log("AVISO  " + a);
if (falhas.length) {
  console.error("audit-robo: FALHOU");
  for (const f of falhas) console.error(" - " + f);
  process.exit(1);
}
console.log("audit-robo: OK (home lida como robo: 1 H1, sem dominio ficticio, bloco unico, JSON-LD valido)");
