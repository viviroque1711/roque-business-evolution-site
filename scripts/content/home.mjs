// Home e índice de serviços. O hero tem a constelação em 3D com TODOS os serviços e os dois produtos (a única animação ousada
// do site): gira sozinha, gira com o arrasto, mostra o nome no foco e leva à página de cada serviço.
import fs from 'node:fs';
import path from 'node:path';
import { SITE } from '../../src/data/site.mjs';
import { SERVICE_GROUPS, SERVICES, AI_APPS, PRODUCTS } from '../../src/data/services.mjs';
import { esc, faq, crumbLd, crumbHtml, pageUrl } from './lib.mjs';
import { btn, li, cols, steps, sec, related, p, ENGAGEBOT, AURORA } from './kit.mjs';
import { org, website, webpage, finalCta, hero } from './schema.mjs';
import { ARTIGOS } from './blog.mjs';

const Q = (q, a) => ({ q, a: `<p>${a}</p>` });

// ---------------------------------------------------------------- constelação 3D
const NODES = [...SERVICES.map((s) => ({ ...s, kind: 'nsvc' })), ...PRODUCTS.map((s) => ({ ...s, kind: 'nprod' }))];
const c3d = `<div class="c3d" data-c3d role="group" aria-label="Mapa em 3D dos serviços e produtos da Roque Business Evolution. Arraste para girar.">
<svg class="c3d-lines" aria-hidden="true" focusable="false"></svg>
<img class="c3d-core" src="/img/roque-simbolo.png" width="185" height="182" alt="" aria-hidden="true">
<ul class="c3d-nodes">
${NODES.map((n) => `<li><a class="n3 ${n.kind}" href="${n.href}"${n.external ? ' rel="noopener"' : ''}><span class="dot" aria-hidden="true"></span><span class="lb">${esc(n.label)}</span></a></li>`).join('\n')}
</ul>
<p class="c3d-hint" aria-hidden="true">Arraste para girar · toque em um nó para abrir</p>
</div>
<ul class="const-strip" aria-label="Serviços e produtos">${NODES.map((n) => `<li><a${n.kind === 'nprod' ? ' class="chip-prod"' : ''} href="${n.href}"${n.external ? ' rel="noopener"' : ''}>${esc(n.label)}</a></li>`).join('')}</ul>`;

const C3D_JS = fs.readFileSync(path.join(import.meta.dirname, 'c3d.js'), 'utf8');

// ---------------------------------------------------------------- home
const homeFaq = faq([
  Q('O que é a Roque Business Evolution?', 'A Roque Business Evolution é uma agência de IA, de criação de sites e de desenvolvimento de software que ajuda empresas a modernizar processos, conquistar clientes e decidir com mais inteligência.'),
  Q('Quais serviços a agência de IA oferece?', 'Agentes de IA e automação, criação de sites, SEO, GEO e AEO, marketing digital, CRM, dados, desenvolvimento de software e SaaS, e consultoria de transformação digital. Veja os <a href="/servicos/">17 serviços</a>.'),
  Q('A Roque Business Evolution faz criação de sites e SEO?', 'Sim. A <a href="/criacao-de-sites/">criação de sites</a> já nasce com SEO técnico, e o trabalho de <a href="/seo/">SEO</a> e de <a href="/geo-aeo/">GEO e AEO</a> cuida da visibilidade no Google e nas buscas com inteligência artificial.'),
  Q('Como começa um projeto com a Roque Business Evolution?', 'Pelo <a href="/diagnostico/">diagnóstico</a>: entendemos o negócio, o mercado, o público e os objetivos antes de propor qualquer solução. O primeiro contato é pelo WhatsApp.'),
  Q('A Roque Business Evolution garante resultados no Google ou em respostas de IA?', 'Não. Não prometemos posição nas buscas nem citações por ferramentas de IA. Trabalhamos com método, base técnica, conteúdo e indicadores acompanhados ao longo do projeto.'),
  Q('Quem está por trás da Roque Business Evolution?', 'A fundadora é <a href="https://viviroque.com.br/" rel="noopener">Viviane Roque</a>, que trabalha com tecnologia e gestão de operações desde 1998. Conheça a <a href="/sobre/">história da empresa</a>.'),
], { pagePath: '/' });

const FASES_HOME = [['Diagnóstico', 'Negócio, público e processos.'], ['Pesquisa e estratégia', 'Mercado e oportunidades.'], ['Arquitetura', 'Escopo e integrações.'], ['Implementação', 'Construção e conteúdo.'], ['Testes', 'Validação e aprovação.'], ['Publicação', 'Produção e operação.'], ['Evolução', 'Indicadores e melhorias.']];

const servicosHtml = `<div class="sv-groups">${SERVICE_GROUPS.map((g) => `<div class="sv-group"><h3>${esc(g.name)}</h3><ul class="svc">${g.items.map((s) => `<li><span class="n"><a href="${s.href}">${esc(s.label)}</a></span><p>${esc(s.short)}</p></li>`).join('')}</ul></div>`).join('')}</div>`;

export const home = {
  path: '/', og: 'home',
  title: 'Roque Business Evolution: Agência de IA, Sites e Software',
  description: 'Roque Business Evolution: agência de IA, criação de sites, SEO, software e transformação digital para empresas que querem evoluir. Fale no WhatsApp.',
  js: C3D_JS,
  body: `<section class="hero" aria-labelledby="h1"><div class="hero-in">
<div class="hero-text"><h1 id="h1">Agência de IA, criação de sites e desenvolvimento de software para empresas que querem evoluir</h1>
<p class="lead">A Roque Business Evolution é uma agência de IA, de criação de sites e de desenvolvimento de software que ajuda empresas a modernizar processos, conquistar clientes e decidir com mais inteligência.</p>
<div class="btns">${btn('Falar no WhatsApp', SITE.wa.text)}<a class="btn ghost" href="/servicos/">Ver os 17 serviços</a></div></div>
<div class="hero-viz">${c3d}</div>
</div></section>

${sec('white', 'servicos', 'Serviços de agência de IA, criação de sites, SEO e software', `<p class="read">Quatro frentes que se conectam. Cada serviço tem uma página própria, com o que é entregue, como funciona e as dúvidas mais comuns.</p>${servicosHtml}<p class="read" style="margin-top:1.5rem">Veja também o <a href="/servicos/">índice completo dos 17 serviços</a> e a <a href="/metodologia/">metodologia de trabalho</a>.</p>`)}

<section class="sec ink" id="agencyai" aria-labelledby="ai-h"><div class="wrap"><div class="ai-split"><div><h2 id="ai-h">Agência de IA: agentes de inteligência artificial trabalhando dentro da sua empresa</h2>
<p class="read">A Roque Business Evolution (AgencyAI) projeta agentes de IA que atendem clientes, qualificam leads, dão suporte e executam tarefas nos seus sistemas, com limites claros e participação humana quando necessário.</p>
<div class="btns"><a class="btn" href="/agencia-de-ia/">Conhecer a agência de IA</a><a class="btn ghost" href="${ENGAGEBOT}" rel="noopener">Conhecer o EngageBot</a></div></div>
<ul class="ai-apps">
<li><a href="/agentes-de-ia-para-whatsapp/"><b>Agente de IA para WhatsApp</b><span>Atendimento automático com encaminhamento para pessoas.</span></a></li>
<li><a href="/agentes-de-ia-para-vendas/"><b>Agente de IA para vendas</b><span>Qualificação de leads e acompanhamento comercial.</span></a></li>
<li><a href="/agentes-de-ia-para-suporte/"><b>Agente de IA para suporte</b><span>Suporte, pós-venda e onboarding com a sua base de conhecimento.</span></a></li>
<li><a href="/automacao-de-processos/"><b>Automação de processos</b><span>Fluxos e integrações que eliminam tarefas repetitivas.</span></a></li>
</ul></div></div></section>

${sec('mist', 'para-quem', 'Para quem a Roque Business Evolution trabalha', `<div class="duo"><div><h3><a href="/para-pequenas-e-medias-empresas/">Pequenas e médias empresas</a></h3><p>Organizar processos, automatizar tarefas, atender melhor e acompanhar os números, com soluções no tamanho da operação.</p></div><div><h3><a href="/para-grandes-empresas/">Grandes empresas</a></h3><p>Transformação digital, governança e PMO, integração de sistemas e adoção responsável de IA, com agilidade e robustez.</p></div></div><p class="read" style="margin-top:1.5rem">Não sabe por onde começar? Peça um <a href="/diagnostico/">diagnóstico digital e de IA</a>.</p>`)}

${sec('white', 'produtos', 'Produtos da Roque Business Evolution: Aurora Premium e EngageBot', `<p class="read">Além dos serviços, a Roque Business Evolution desenvolve e opera dois produtos próprios.</p><div class="prod"><div class="a"><h3>Aurora Premium</h3><p>Sistema de agendamento e gestão para salões, barbearias, clínicas, spas e pet shops, lançado em 2025 e desenvolvido pela Roque Business Evolution.</p><p><a class="btn" href="${AURORA}" rel="noopener">Conhecer o Aurora Premium</a></p></div><div class="e"><h3>EngageBot</h3><p>Atendimento com inteligência artificial no WhatsApp e no site.</p><p><a class="btn ghost" href="${ENGAGEBOT}" rel="noopener">Conhecer o EngageBot</a></p></div></div><p class="read" style="margin-top:1.5rem"><a href="/produtos/">Saiba mais sobre os produtos</a> e sobre o <a href="/saas/">desenvolvimento de SaaS</a>.</p>`)}

${sec('mist', 'como-trabalhamos', 'Como a Roque Business Evolution trabalha: da estratégia à evolução contínua', `<p class="read">Todo projeto segue sete fases, para reduzir riscos e medir a evolução. <a href="/metodologia/">Veja a metodologia completa</a>.</p><ol class="fases">${FASES_HOME.map(([b, t]) => `<li><b>${esc(b)}</b><span>${esc(t)}</span></li>`).join('')}</ol>`)}

${sec('white', 'blog', 'Blog: guias sobre agência de IA, SEO, GEO e automação', `<ul class="posts">${ARTIGOS.slice(0, 3).map((a) => `<li><h3><a href="${a.path}">${esc(a.title.replace(/ \| Roque$/, ''))}</a></h3><p>${esc(a.lead)}</p></li>`).join('')}</ul><p class="read" style="margin-top:1.2rem"><a href="/blog/">Ver todos os artigos</a></p>`)}

${sec('mist', 'fundadora', 'A fundadora da Roque Business Evolution', `<div class="founder"><img src="/img/viviane-roque-retrato-510w.webp" srcset="/img/viviane-roque-retrato-340w.webp 340w, /img/viviane-roque-retrato-510w.webp 510w" sizes="(min-width: 860px) 33vw, 380px" width="510" height="564" alt="Retrato de Viviane Roque, fundadora da Roque Business Evolution" loading="lazy" decoding="async"><div class="prose"><p>A Roque Business Evolution nasceu da experiência de Viviane Roque, que trabalha com tecnologia e gestão de operações desde 1998. Ela passou por operações de telecomunicações, serviços financeiros, grandes arenas da Copa de 2014 e projetos de sistemas para municípios.</p><p>Essa trajetória está por trás de tudo que a Roque Business Evolution faz: levar tecnologia, inteligência e transformação digital ao pequeno e médio empreendedor.</p><p><a href="/sobre/">Conheça a Roque Business Evolution e a fundadora</a></p></div></div>`)}

${homeFaq.html.replace('class="sec paper"', 'class="sec white"')}
${finalCta('Vamos conversar sobre a evolução da sua empresa', 'Conte o seu momento e o que você quer melhorar. A Roque Business Evolution responde pelo WhatsApp.', SITE.wa.text)}`,
  get graph() { return [org(), website(), webpage('/', 'Roque Business Evolution'), homeFaq.ld]; },
};

// ---------------------------------------------------------------- índice dos serviços
const servCrumb = [{ name: 'Início', path: '/' }, { name: 'Serviços', path: '/servicos/' }];
const servFaq = faq([
  Q('Quais serviços a Roque Business Evolution oferece?', 'Consultoria de transformação digital, criação de sites, SEO, GEO e AEO, agentes de IA e automação, desenvolvimento de software e SaaS, marketing, CRM, dados e capacitação em IA. Esta página reúne os 17 serviços, e cada um tem página própria.'),
  Q('Como a Roque Business Evolution trabalha?', 'Em sete fases: diagnóstico, pesquisa e estratégia, arquitetura da solução, implementação, testes e validação, publicação e operação, e mensuração e evolução. Veja a <a href="/metodologia/">metodologia</a>.'),
  Q('Como são contratados os serviços?', 'Em projetos fechados, serviços recorrentes, consultoria especializada ou projetos híbridos. A proposta discrimina implantação, mensalidade, ferramentas de terceiros, infraestrutura, mídia paga e suporte. Veja <a href="/como-contratar/">como contratar</a>.'),
  Q('Por onde começar?', 'Pelo <a href="/diagnostico/">diagnóstico digital e de IA</a>, que mostra onde há ganho possível e quais serviços fazem sentido.'),
  Q('A Roque Business Evolution garante resultados?', 'Não garantimos posições no Google, citações em IA nem resultados financeiros sem condições objetivas definidas em contrato. Os resultados dependem de mercado, concorrência, investimento, dados e execução.'),
], { pagePath: '/servicos/' });
export const servicos = {
  path: '/servicos/', og: 'servicos',
  title: 'Serviços de IA, Sites, SEO e Software | Roque',
  description: 'Os 17 serviços da Roque Business Evolution: agência de IA, sites, SEO, GEO e AEO, software, CRM, dados, transformação digital e capacitação em IA.',
  body: `${hero(servCrumb, 'Serviços da Roque Business Evolution', 'A Roque Business Evolution reúne serviços de inteligência artificial, sites, SEO, software e estratégia, para que a empresa evolua com tecnologia que se conecta ao negócio. São 17 serviços, cada um com página própria.', `<div class="btns">${btn('Falar no WhatsApp', 'Olá! Quero conhecer os serviços da Roque Business Evolution.')}</div>`)}
<section class="sec white" id="lista" aria-labelledby="lista-h"><div class="wrap"><h2 id="lista-h">Os 17 serviços de IA, sites, SEO e software da Roque Business Evolution</h2>${servicosHtml}</div></section>
${sec('mist', 'aplicacoes', 'Serviços de agentes de IA e plataformas', `<p class="read">Páginas de apoio que detalham aplicações da agência de IA e do desenvolvimento de plataformas.</p>${related(AI_APPS.map((a) => [a.href, a.label]))}`)}
${sec('white', 'produtos', 'Serviços e produtos próprios da Roque Business Evolution', `<p class="read">Além dos serviços, a Roque Business Evolution desenvolve e opera o <a href="${AURORA}" rel="noopener">Aurora Premium</a> e o <a href="${ENGAGEBOT}" rel="noopener">EngageBot</a>. Veja <a href="/produtos/">os produtos</a>.</p>`)}
${sec('mist', 'metodologia', 'Metodologia de trabalho da Roque Business Evolution', `<p class="read">Todo projeto segue sete fases, para reduzir riscos, organizar investimentos e medir a evolução. <a href="/metodologia/">Veja a metodologia completa</a>.</p><ol class="fases">${FASES_HOME.map(([b, t]) => `<li><b>${esc(b)}</b><span>${esc(t)}</span></li>`).join('')}</ol>`)}
${servFaq.html.replace('class="sec paper"', 'class="sec white"')}
${finalCta('Vamos conversar sobre os serviços que fazem sentido para você', 'Conte o seu momento e o que você quer melhorar. A Roque Business Evolution responde pelo WhatsApp.', 'Olá! Quero conhecer os serviços da Roque Business Evolution.')}`,
  get graph() { return [org(), website(), webpage('/servicos/', 'Serviços da Roque Business Evolution', 'CollectionPage'), crumbLd(servCrumb), { '@type': 'ItemList', name: 'Serviços da Roque Business Evolution', itemListElement: SERVICES.map((s, i) => ({ '@type': 'ListItem', position: i + 1, name: s.label, url: pageUrl(s.href) })) }, servFaq.ld]; },
};
