// Home e índice de serviços. A HOME é a versão 3D aprovada pela Viviane em 21/10/2026: primeira dobra preta com o H1
// formado pelos cinco termos comerciais (acendem um a um na rolagem) e o globo do logo girando em câmera lenta; cada seção
// tem um objeto em 3D e nada de texto corrido. Estilo em home3d.css, movimento em home3d.js.
import fs from 'node:fs';
import path from 'node:path';
import { SITE } from '../../src/data/site.mjs';
import { SERVICE_GROUPS, SERVICES, AI_APPS, PRODUCTS } from '../../src/data/services.mjs';
import { esc, faq, crumbLd, crumbHtml, pageUrl, wa } from './lib.mjs';
import { btn, li, cols, steps, sec, related, p, ENGAGEBOT, AURORA } from './kit.mjs';
import { org, website, webpage, finalCta, hero } from './schema.mjs';

const Q = (q, a) => ({ q, a: `<p>${a}</p>` });
const read = (f) => fs.readFileSync(path.join(import.meta.dirname, f), 'utf8');
const ORC = 'Olá! Quero um orçamento com a Roque Business Evolution.';
const gold = (text, msg = ORC) => `<a class="btn gold" href="${wa(msg)}" rel="noopener">${esc(text)}</a>`;

// ---------------------------------------------------------------- home
// Os cinco termos do H1, exatamente como as pessoas pesquisam, cada um levando à página do serviço.
const TERMOS = [
  ['/criacao-de-sites/', 'Criação de sites'],
  ['/criacao-de-sites/', 'Desenvolvimento de site profissional'],
  ['/desenvolvimento-de-software/', 'Empresa de desenvolvimento de software'],
  ['/desenvolvimento-de-software/', 'Desenvolvimento de sistemas personalizados'],
  ['/seo/', 'SEO, GEO e AEO'],
];
const I = {
  site: '<rect x="4" y="8" width="38" height="28" rx="3" fill="none" stroke="#A87000" stroke-width="2"/><circle cx="12" cy="15" r="2.5" fill="#A87000"/>',
  lp: '<rect x="4" y="8" width="38" height="28" rx="3" fill="none" stroke="#A87000" stroke-width="2"/><path d="M10 28h26M10 22h16" stroke="#A87000" stroke-width="2"/>',
  code: '<path d="M16 14l-8 9 8 9M30 14l8 9-8 9" fill="none" stroke="#A87000" stroke-width="2.5"/>',
  sys: '<circle cx="12" cy="12" r="4" fill="#A87000"/><circle cx="34" cy="14" r="4" fill="#A87000"/><circle cx="22" cy="34" r="4" fill="#A87000"/><path d="M12 12L34 14L22 34Z" fill="none" stroke="#A87000" stroke-width="1.5"/>',
  saas: '<rect x="6" y="6" width="14" height="14" rx="2" fill="none" stroke="#A87000" stroke-width="2"/><rect x="26" y="6" width="14" height="14" rx="2" fill="#A87000"/><rect x="6" y="26" width="14" height="14" rx="2" fill="#A87000"/><rect x="26" y="26" width="14" height="14" rx="2" fill="none" stroke="#A87000" stroke-width="2"/>',
  seo: '<circle cx="20" cy="20" r="11" fill="none" stroke="#A87000" stroke-width="2.5"/><path d="M28 28l10 10" stroke="#A87000" stroke-width="3"/>',
  geo: '<path d="M8 12h30v18H20l-8 7v-7H8z" fill="none" stroke="#A87000" stroke-width="2"/><circle cx="17" cy="21" r="2" fill="#A87000"/><circle cx="23" cy="21" r="2" fill="#A87000"/><circle cx="29" cy="21" r="2" fill="#A87000"/>',
  auto: '<circle cx="23" cy="23" r="7" fill="none" stroke="#A87000" stroke-width="2.5"/><path d="M23 6v6M23 34v6M6 23h6M34 23h6M11 11l4 4M31 31l4 4M35 11l-4 4M15 31l-4 4" stroke="#A87000" stroke-width="2.5"/>',
  td: '<path d="M10 34V20M18 34V14M26 34V22M34 34V10" stroke="#A87000" stroke-width="3"/>',
};
const ANEL = [
  ['/criacao-de-sites/', 'site', 'Criação de sites', 'Site institucional, rápido e pronto para o Google'],
  ['/criacao-de-sites/', 'lp', 'Site profissional e landing page', 'Páginas que transformam visita em contato'],
  ['/desenvolvimento-de-software/', 'code', 'Desenvolvimento de software', 'Do MVP ao sistema em produção'],
  ['/desenvolvimento-de-software/', 'sys', 'Sistemas personalizados', 'Feitos para o jeito que sua empresa trabalha'],
  ['/saas/', 'saas', 'Plataformas SaaS', 'Sistemas multiempresa com assinatura'],
  ['/seo/', 'seo', 'SEO', 'Sua empresa encontrada no Google'],
  ['/geo-aeo/', 'geo', 'GEO e AEO', 'Citada nas respostas do ChatGPT, Gemini e Claude'],
  ['/automacao-de-processos/', 'auto', 'Automação de processos', 'Menos tarefa repetida, mais tempo para vender'],
  ['/transformacao-digital/', 'td', 'Transformação digital', 'Diagnóstico, plano e implantação'],
];
const ETAPAS = [['Diagnóstico', 'Negócio, público e processos'], ['Pesquisa', 'Mercado e palavras-chave'], ['Arquitetura', 'Escopo e tecnologia'], ['Construção', 'Site, sistema e conteúdo'], ['Testes', 'Validação com você'], ['Publicação', 'No ar e monitorado'], ['Evolução', 'Indicadores e melhorias']];

const homeFaq = faq([
  Q('Quanto custa a criação de um site profissional?', 'Depende do número de páginas, das integrações e do conteúdo. Peça um orçamento pelo WhatsApp e receba a proposta com escopo e prazo. Veja como funciona a <a href="/criacao-de-sites/">criação de sites</a>.'),
  Q('A Roque Business Evolution é uma empresa de desenvolvimento de software?', 'Sim. A Roque Business Evolution faz <a href="/desenvolvimento-de-software/">desenvolvimento de software</a> e de sistemas personalizados, plataformas <a href="/saas/">SaaS</a> e integrações, além da criação de sites.'),
  Q('O que é SEO, GEO e AEO?', '<a href="/seo/">SEO</a> coloca o site da sua empresa no Google. <a href="/geo-aeo/">GEO e AEO</a> organizam o conteúdo para as IAs, como ChatGPT, Gemini e Claude, entenderem e citarem a sua empresa.'),
  Q('A Roque Business Evolution garante a primeira posição no Google?', 'Não. Ninguém pode garantir posição no Google nem citação em respostas de IA. Garantimos o trabalho feito seguindo as orientações oficiais dos buscadores, com indicadores acompanhados.'),
  Q('Quem está por trás da Roque Business Evolution?', 'A fundadora é <a href="https://viviroque.com.br/" rel="noopener">Viviane Roque</a>, que trabalha com tecnologia e gestão de operações desde 1998. Conheça a <a href="/sobre/">história da empresa</a>.'),
], { pagePath: '/' });

export const home = {
  path: '/', og: 'home',
  title: 'Criação de Sites e Desenvolvimento de Software | Roque',
  description: 'Criação de sites, site profissional, desenvolvimento de software e sistemas personalizados, SEO, GEO e AEO. Peça orçamento à Roque Business Evolution.',
  themeColor: '#000000',
  css: read('home3d.css'),
  js: read('home3d.js'),
  body: `<div class="h3d">
<section class="h3d-hero" data-h3d-hero aria-labelledby="h1"><div class="h3d-stage">
<canvas class="h3d-field" aria-hidden="true"></canvas>
<div class="h3d-stage-in">
<div class="h3d-copy"><h1 id="h1">${TERMOS.map(([h, t]) => `<a class="t" href="${h}">${esc(t)}</a>`).join('\n')}</h1>
${gold('Pedir orçamento no WhatsApp')}</div>
<div class="h3d-globe" role="img" aria-label="Logo da Roque Business Evolution: uma rede de nós girando em 3D"><canvas data-h3d-globe></canvas></div>
</div></div></section>

<section class="h3d-sec h3d-black" id="empresa" aria-labelledby="empresa-h"><div class="wrap h3d-layers">
<div><h2 id="empresa-h">A Roque Business Evolution é uma empresa de transformação digital</h2>
<p class="h3d-one">Três camadas que trabalham juntas na sua empresa.</p>
<ol class="h3d-layer-list">
<li><a href="/criacao-de-sites/" data-h3d-layer="2"><b>1</b><strong>Presença</strong><small>Criação de sites e site profissional</small></a></li>
<li><a href="/desenvolvimento-de-software/" data-h3d-layer="1"><b>2</b><strong>Operação</strong><small>Software e sistemas personalizados</small></a></li>
<li><a href="/seo/" data-h3d-layer="0"><b>3</b><strong>Descoberta</strong><small>SEO, GEO e AEO no Google e nas IAs</small></a></li>
</ol></div>
<div class="h3d-stack" data-h3d-stack aria-hidden="true"><div class="h3d-stack-rot">
<div class="h3d-plane"><i></i><i></i><i></i><i></i><span>Descoberta</span></div>
<div class="h3d-plane"><i></i><i></i><i></i><i></i><span>Operação</span></div>
<div class="h3d-plane"><i></i><i></i><i></i><i></i><span>Presença</span></div>
</div></div>
</div></section>

<section class="h3d-sec mist" id="servicos" aria-labelledby="servicos-h"><div class="wrap">
<h2 id="servicos-h">Serviços de criação de sites, software, SEO, GEO e AEO</h2>
<p class="h3d-one">Gire o anel e escolha por onde começar. Veja <a href="/servicos/">todos os serviços</a>.</p>
<div class="h3d-ring-wrap" data-h3d-ring><ul class="h3d-ring">
${ANEL.map(([h, ic, t, s]) => `<li><a class="h3d-tile" href="${h}"><svg viewBox="0 0 46 46" aria-hidden="true">${I[ic]}</svg><span><strong>${esc(t)}</strong><small>${esc(s)}</small></span></a></li>`).join('\n')}
</ul></div>
<div class="h3d-ring-ctrl"><button type="button" data-prev aria-label="Serviço anterior">‹</button><button type="button" data-next aria-label="Próximo serviço">›</button></div>
</div></section>

<section class="h3d-sec h3d-black" id="produtos" aria-labelledby="produtos-h"><div class="wrap">
<h2 id="produtos-h">Produtos da Roque Business Evolution</h2>
<p class="h3d-one">Dois SaaS que nós criamos e operamos.</p>
<div class="h3d-prods">
<div class="h3d-prod"><div class="h3d-scene" data-h3d-tilt aria-hidden="true"><div class="h3d-laptop"><div class="scr"><div class="h3d-cal-side"><i></i><i></i><i></i><i></i><i></i></div><div class="h3d-cal">${'a,,b,c,,a,c,,b,,a,c,c,b,,a'.split(',').map((c) => `<i${c ? ` class="${c}"` : ''}></i>`).join('')}</div></div><div class="base"></div></div></div>
<h3>Aurora Premium</h3><ul><li>Agenda online</li><li>Lembrete no WhatsApp</li><li>Financeiro e comissão</li><li>Salões, clínicas, spas e pet shops</li></ul>
<a class="more" href="${AURORA}" rel="noopener">Conhecer o Aurora Premium</a></div>
<div class="h3d-prod"><div class="h3d-scene" data-h3d-tilt aria-hidden="true"><div class="h3d-phone"><div class="h3d-bubble in">Vocês atendem sábado?</div><div class="h3d-bubble out">Sim, das 9h às 14h. Quer que eu reserve um horário?</div><div class="h3d-bubble in">Quero, às 10h</div></div></div>
<h3>EngageBot</h3><ul><li>Atendimento com IA</li><li>WhatsApp e site</li><li>Aprende com seus documentos</li></ul>
<a class="more" href="${ENGAGEBOT}" rel="noopener">Conhecer o EngageBot</a></div>
</div>
</div></section>

<section class="h3d-sec mist" id="como-trabalhamos" aria-labelledby="como-h"><div class="wrap">
<h2 id="como-h">Como a Roque Business Evolution trabalha</h2>
<p class="h3d-one">Sete etapas, do diagnóstico à evolução contínua.</p>
<div class="h3d-steps-scene"><ol class="h3d-steps" data-h3d-steps>${ETAPAS.map(([b, t], i) => `<li><b>${i + 1}</b><strong>${esc(b)}</strong><small>${esc(t)}</small></li>`).join('')}</ol></div>
<a class="h3d-more" href="/metodologia/">Ver a metodologia</a>
</div></section>

<section class="h3d-sec white" id="fundadora" aria-labelledby="fundadora-h"><div class="wrap h3d-founder">
<div class="h3d-pscene" data-h3d-tilt><div class="h3d-portrait"><canvas class="h3d-pnet" data-h3d-pnet aria-hidden="true"></canvas><img src="/img/viviane-roque-retrato-510w.webp" srcset="/img/viviane-roque-retrato-340w.webp 340w, /img/viviane-roque-retrato-510w.webp 510w" sizes="(min-width: 900px) 360px, 80vw" width="510" height="564" alt="Viviane Roque, fundadora da Roque Business Evolution" loading="lazy" decoding="async"></div></div>
<div><h2 id="fundadora-h">Viviane Roque, fundadora da Roque Business Evolution</h2>
<ol class="h3d-marks">
<li><b>1998</b><span>Tecnologia e operações, da telefonia analógica ao 4G</span></li>
<li><b>2014</b><span>Telecomunicações e novas tecnologias nas arenas da Copa</span></li>
<li><b>Depois</b><span>Lançamentos de Google e Apple e sistemas para municípios</span></li>
<li><b>2025</b><span>Lança o Aurora Premium</span></li>
</ol>
<a class="h3d-more" href="/sobre/">Conhecer a história</a></div>
</div></section>
</div>

${homeFaq.html.replace('class="sec paper"', 'class="sec mist"')}

<div class="h3d"><section class="h3d-sec h3d-black h3d-final" id="conversar" aria-labelledby="cta-h"><div class="wrap h3d-final-in">
<div><h2 id="cta-h">Vamos tirar o seu projeto do papel</h2><p class="h3d-one">Site, sistema ou SEO: conte o que você precisa.</p>${gold('Pedir orçamento no WhatsApp')}</div>
<canvas data-h3d-mini aria-hidden="true"></canvas>
</div></section></div>`,
  get graph() { return [org(), website(), webpage('/', 'Roque Business Evolution: criação de sites e desenvolvimento de software'), homeFaq.ld]; },
};

const FASES_HOME = [['Diagnóstico', 'Negócio, público e processos.'], ['Pesquisa e estratégia', 'Mercado e oportunidades.'], ['Arquitetura', 'Escopo e integrações.'], ['Implementação', 'Construção e conteúdo.'], ['Testes', 'Validação e aprovação.'], ['Publicação', 'Produção e operação.'], ['Evolução', 'Indicadores e melhorias.']];
const servicosHtml = `<div class="sv-groups">${SERVICE_GROUPS.map((g) => `<div class="sv-group"><h3>${esc(g.name)}</h3><ul class="svc">${g.items.map((s) => `<li><span class="n"><a href="${s.href}">${esc(s.label)}</a></span><p>${esc(s.short)}</p></li>`).join('')}</ul></div>`).join('')}</div>`;

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
