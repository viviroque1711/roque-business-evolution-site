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
import { IC, spec } from './hooks.mjs';
import { choose, CHOOSE_CSS } from './choose.mjs';
import { homeAurora, homeEngageBot, DEVICE_CSS, DEVICE_JS } from './devices.mjs';

const Q = (q, a) => ({ q, a: `<p>${a}</p>` });
const read = (f) => fs.readFileSync(path.join(import.meta.dirname, f), 'utf8');
const ORC = 'Olá! Quero um orçamento com a Roque Business Evolution.';
const gold = (text, msg = ORC) => `<a class="btn gold" href="${wa(msg)}" rel="noopener">${esc(text)}</a>`;

// ---------------------------------------------------------------- home
// Os cinco termos do H1, exatamente como as pessoas pesquisam, cada um levando à página do serviço.
const TERMOS = [
  // Decisão de 22/10/2026 (Planejador de palavras-chave + Google Trends): a home é dona de "empresa de desenvolvimento de
  // software" (o primeiro termo aponta para a própria página); os outros levam à página dona de cada busca.
  ['#empresa', 'Empresa de desenvolvimento de software'],
  ['/criacao-de-sites/', 'Criação de sites profissionais'],
  ['/desenvolvimento-de-software/', 'Software sob medida e sistemas personalizados'],
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
  app: '<rect x="14" y="5" width="18" height="36" rx="4" fill="none" stroke="#A87000" stroke-width="2.2"/><path d="M20 35h6" stroke="#A87000" stroke-width="2.2"/>',
  td: '<path d="M10 34V20M18 34V14M26 34V22M34 34V10" stroke="#A87000" stroke-width="3"/>',
};
const ANEL = [
  ['/criacao-de-sites/', 'site', 'Criação de sites', 'Site institucional, rápido e pronto para o Google'],
  ['/criacao-de-sites/', 'lp', 'Site profissional e landing page', 'Páginas que transformam visita em contato'],
  ['/desenvolvimento-de-software/', 'code', 'Software sob medida', 'Do MVP ao sistema em produção'],
  ['/desenvolvimento-de-software/', 'sys', 'Sistemas personalizados', 'Feitos para o jeito que sua empresa trabalha'],
  ['/desenvolvimento-de-aplicativos/', 'app', 'Desenvolvimento de aplicativos', 'Apps Android e iOS, PWA e web'],
  ['/saas/', 'saas', 'Plataformas SaaS', 'Sistemas multiempresa com assinatura'],
  ['/seo/', 'seo', 'Agência de SEO', 'Sua empresa encontrada no Google'],
  ['/geo-aeo/', 'geo', 'GEO e SEO para IA', 'Clara para ChatGPT, Gemini e Claude'],
  ['/automacao-de-processos/', 'auto', 'Automação de processos', 'Menos tarefa repetida, mais tempo para vender'],
  ['/transformacao-digital/', 'td', 'Transformação digital', 'Diagnóstico, plano e implantação'],
];
const ETAPAS = [['Diagnóstico', 'Negócio, público e processos'], ['Pesquisa', 'Mercado e palavras-chave'], ['Arquitetura', 'Escopo e tecnologia'], ['Construção', 'Site, sistema e conteúdo'], ['Testes', 'Validação com você'], ['Publicação', 'No ar e monitorado'], ['Evolução', 'Indicadores e melhorias']];

const homeFaq = faq([
  Q('O que é uma empresa de desenvolvimento de software?', 'É a empresa que cria sistemas, aplicativos, sites e integrações sob medida para o processo de outro negócio, do levantamento do que precisa ser feito ao software funcionando, com suporte depois da entrega. A Roque Business Evolution é uma empresa de desenvolvimento de software: faz <a href="/desenvolvimento-de-software/">software sob medida</a>, sistemas personalizados, <a href="/desenvolvimento-de-aplicativos/">aplicativos</a>, plataformas <a href="/saas/">SaaS</a>, integrações e sites, e mantém em produção o Aurora Premium e o EngageBot.'),
  Q('O que faz uma empresa de desenvolvimento de software?', 'Entende o processo do cliente, define o escopo, desenha a arquitetura, programa, testa, publica e continua evoluindo o sistema. Na Roque Business Evolution, esse caminho tem sete etapas, do diagnóstico à evolução contínua, e você aprova cada uma. Veja a <a href="/metodologia/">metodologia</a>.'),
  Q('Quanto custa contratar uma empresa de desenvolvimento de software?', 'Depende do tamanho do sistema, das integrações e do prazo: um sistema simples custa bem menos que uma plataforma com várias áreas e integrações. Na Roque Business Evolution, o valor chega por escrito depois do diagnóstico, separado por etapa, e você aprova cada entrega antes de seguir.'),
  Q('Quanto tempo leva para desenvolver um software?', 'Depende do escopo. Começar por um MVP, a primeira versão com o essencial, coloca o sistema em uso mais cedo e deixa o restante para as versões seguintes. Na Roque Business Evolution, o prazo de cada etapa vem por escrito na proposta, antes de o projeto começar.'),
  Q('Como escolher uma empresa de desenvolvimento de software?', 'Veja se ela entende o seu negócio antes do código, coloca escopo, prazo e valor por escrito, entrega em etapas, integra com o que você já usa, deixa claro de quem é o software e cuida da evolução depois da entrega. É assim que a Roque Business Evolution trabalha.'),
  Q('A empresa de desenvolvimento de software precisa ser da minha cidade?', 'Não. Reuniões online resolvem a maior parte do projeto; o que importa é ter etapas claras e acompanhamento. A Roque Business Evolution vai até a sua empresa em São Paulo e em Guarulhos e atende todo o Brasil com reuniões online.'),
  Q('Quem está por trás da Roque Business Evolution?', 'A fundadora é <a href="https://viviroque.com.br/" rel="noopener">Viviane Roque</a>, que trabalha com tecnologia e gestão de operações desde 1998. A Roque Business Evolution nasceu dessa experiência. Conheça a <a href="/sobre/">história da empresa</a>.'),
], { pagePath: '/', heading: 'Perguntas frequentes sobre empresa de desenvolvimento de software' });

export const home = {
  path: '/', og: 'home',
  title: 'Empresa de Desenvolvimento de Software e Criação de Sites | Roque',
  description: 'Empresa de desenvolvimento de software e criação de sites profissionais, com SEO, GEO e AEO, software sob medida e aplicativos. Peça orçamento à Roque.',
  themeColor: '#000000',
  css: read('home3d.css') + '\n' + DEVICE_CSS + '\n' + CHOOSE_CSS,
  js: read('home3d.js') + '\n' + DEVICE_JS,
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
<li><a href="/criacao-de-sites/" data-h3d-layer="2"><b>1</b><strong>Presença</strong><small>Criação de sites profissionais</small></a></li>
<li><a href="/desenvolvimento-de-software/" data-h3d-layer="1"><b>2</b><strong>Operação</strong><small>Software sob medida e aplicativos</small></a></li>
<li><a href="/seo/" data-h3d-layer="0"><b>3</b><strong>Descoberta</strong><small>SEO, GEO e AEO no Google e nas IAs</small></a></li>
</ol></div>
<div class="h3d-stack" data-h3d-stack aria-hidden="true"><div class="h3d-stack-rot">
<div class="h3d-plane"><i></i><i></i><i></i><i></i><span>Descoberta</span></div>
<div class="h3d-plane"><i></i><i></i><i></i><i></i><span>Operação</span></div>
<div class="h3d-plane"><i></i><i></i><i></i><i></i><span>Presença</span></div>
</div></div>
</div></section>

<section class="h3d-sec white" id="como-escolher" aria-labelledby="como-escolher-h"><div class="wrap">
<h2 id="como-escolher-h">Qual é a melhor empresa de desenvolvimento de software?</h2>
${choose(
  'A melhor empresa de desenvolvimento de software é a que entende o seu negócio antes de escrever código e entrega em etapas que você aprova. <strong>É assim que a Roque Business Evolution trabalha:</strong> entra na sua operação, desenha a solução com você e entrega o sistema funcionando, do diagnóstico à evolução contínua.',
  [
    [IC.nodes, 'Entende o negócio antes do código?', 'Todo projeto começa pelo diagnóstico do seu processo, antes da proposta.'],
    [IC.doc, 'Escopo e prazo por escrito?', 'Requisitos, etapas, entregas e critérios de aceite definidos no início.'],
    [IC.code, 'Entrega em etapas?', 'Primeiro o MVP, depois versões que você testa e aprova.'],
    [IC.plug, 'Integra com o que você já usa?', 'Integramos com ERP, CRM, WhatsApp, APIs e sistemas legados.'],
    [IC.lock, 'O software é de quem?', 'Propriedade, acessos e suporte ficam definidos no seu contrato.'],
    [IC.chart, 'Cuida depois da entrega?', '<a href="/suporte-e-evolucao-continua/">Suporte e evolução contínua</a> depois que o sistema entra em produção.'],
  ],
  `A prova está no ar: a Roque Business Evolution desenvolve e mantém os próprios produtos, o <a href="${AURORA}" rel="noopener">Aurora Premium</a> e o <a href="${ENGAGEBOT}" rel="noopener">EngageBot</a>.`,
  'Olá! Quero um diagnóstico para desenvolver um sistema para a minha empresa.',
  ['/metodologia/', 'Ver a metodologia'],
)}
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
<div class="h3d-prod">${homeAurora()}
<h3>Aurora Premium</h3><ul><li>Agenda online</li><li>Lembrete no WhatsApp</li><li>Financeiro e comissão</li><li>Salões, clínicas, spas e pet shops</li></ul>
<a class="more" href="${AURORA}" rel="noopener">Conhecer o Aurora Premium</a></div>
<div class="h3d-prod">${homeEngageBot()}
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
  get graph() { return [org(), website(), webpage('/', 'Roque Business Evolution: empresa de desenvolvimento de software e criação de sites'), homeFaq.ld]; },
};

const FASES_HOME = [['Diagnóstico', 'Negócio, público e processos.'], ['Pesquisa e estratégia', 'Mercado e oportunidades.'], ['Arquitetura', 'Escopo e integrações.'], ['Implementação', 'Construção e conteúdo.'], ['Testes', 'Validação e aprovação.'], ['Publicação', 'Produção e operação.'], ['Evolução', 'Indicadores e melhorias.']];
const servicosHtml = `<div class="sv-groups">${SERVICE_GROUPS.map((g) => `<div class="sv-group"><h3>${esc(g.name)}</h3><ul class="svc">${g.items.map((s) => `<li><span class="n"><a href="${s.href}">${esc(s.label)}</a></span><p>${esc(s.short)}</p></li>`).join('')}</ul></div>`).join('')}</div>`;

// ---------------------------------------------------------------- índice dos serviços
const servCrumb = [{ name: 'Início', path: '/' }, { name: 'Serviços', path: '/servicos/' }];
const servFaq = faq([
  Q('Quais serviços a Roque Business Evolution oferece?', 'Criação de sites profissionais, software sob medida, desenvolvimento de aplicativos, SEO, GEO e AEO, agentes de IA e automação, SaaS, transformação digital, marketing, CRM, dados e capacitação em IA. Esta página reúne os ' + SERVICES.length + ' serviços, e cada um tem página própria.'),
  Q('Como a Roque Business Evolution trabalha?', 'Em sete fases: diagnóstico, pesquisa e estratégia, arquitetura da solução, implementação, testes e validação, publicação e operação, e mensuração e evolução. Veja a <a href="/metodologia/">metodologia</a>.'),
  Q('Como são contratados os serviços?', 'Em projetos fechados, serviços recorrentes, consultoria especializada ou projetos híbridos. A proposta discrimina implantação, mensalidade, ferramentas de terceiros, infraestrutura, mídia paga e suporte. Veja <a href="/como-contratar/">como contratar</a>.'),
  Q('Por onde começar?', 'Pelo <a href="/diagnostico/">diagnóstico digital e de IA</a>, que mostra onde há ganho possível e quais serviços fazem sentido.'),
  Q('A Roque Business Evolution garante resultados?', 'Não garantimos posições no Google, citações em IA nem resultados financeiros sem condições objetivas definidas em contrato. Os resultados dependem de mercado, concorrência, investimento, dados e execução.'),
], { pagePath: '/servicos/' });
export const servicos = {
  path: '/servicos/', og: 'servicos',
  title: 'Serviços: Sites, Software, Aplicativos e SEO | Roque',
  description: `Os ${SERVICES.length} serviços da Roque Business Evolution: criação de sites, software sob medida, aplicativos, SEO, GEO e AEO, agentes de IA, CRM e dados.`,
  body: `${hero(servCrumb, 'Serviços da Roque Business Evolution', 'A Roque Business Evolution é uma empresa de desenvolvimento de software e criação de sites que reúne serviços de sites, software, aplicativos, SEO, GEO e AEO, inteligência artificial e estratégia. São ' + SERVICES.length + ' serviços, cada um com página própria.', `<div class="btns">${btn('Falar no WhatsApp', 'Olá! Quero conhecer os serviços da Roque Business Evolution.')}</div>`)}
<section class="sec white" id="lista" aria-labelledby="lista-h"><div class="wrap"><h2 id="lista-h">Os ${SERVICES.length} serviços de sites, software, aplicativos e SEO da Roque Business Evolution</h2>${servicosHtml}</div></section>
${sec('mist', 'aplicacoes', 'Serviços de agentes de IA e plataformas', `<p class="read">Páginas de apoio que detalham os agentes de IA e o desenvolvimento de plataformas.</p>${related(AI_APPS.map((a) => [a.href, a.label]))}`)}
${sec('white', 'produtos', 'Serviços e produtos próprios da Roque Business Evolution', `<p class="read">Além dos serviços, a Roque Business Evolution desenvolve e opera o <a href="${AURORA}" rel="noopener">Aurora Premium</a> e o <a href="${ENGAGEBOT}" rel="noopener">EngageBot</a>. Veja <a href="/produtos/">os produtos</a>.</p>`)}
${sec('mist', 'metodologia', 'Metodologia de trabalho da Roque Business Evolution', `<p class="read">Todo projeto segue sete fases, para reduzir riscos, organizar investimentos e medir a evolução. <a href="/metodologia/">Veja a metodologia completa</a>.</p><ol class="fases">${FASES_HOME.map(([b, t]) => `<li><b>${esc(b)}</b><span>${esc(t)}</span></li>`).join('')}</ol>`)}
${servFaq.html.replace('class="sec paper"', 'class="sec white"')}
${finalCta('Vamos conversar sobre os serviços que fazem sentido para você', 'Conte o seu momento e o que você quer melhorar. A Roque Business Evolution responde pelo WhatsApp.', 'Olá! Quero conhecer os serviços da Roque Business Evolution.')}`,
  get graph() { return [org(), website(), webpage('/servicos/', 'Serviços da Roque Business Evolution', 'CollectionPage'), crumbLd(servCrumb), { '@type': 'ItemList', name: 'Serviços da Roque Business Evolution', itemListElement: SERVICES.map((s, i) => ({ '@type': 'ListItem', position: i + 1, name: s.label, url: pageUrl(s.href) })) }, servFaq.ld]; },
};
