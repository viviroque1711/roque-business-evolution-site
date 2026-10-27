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

// HOME v7 (27/10/2026, rodada final aprovada pela Viviane): protótipo sobre o design system (tokens + bundle + home.css,
// com escopo #conteudo), levado para cá por scripts de porta (home-v7/): abertura em quatro momentos (mouse e rotação
// automática), camadas em placas 3D que viram de frente, "Qual é a melhor" com o passo a passo, o que a Roque desenvolve
// (software com as áreas conectadas, sites, aplicativos, IA), EngageBot e o FAQ só da home. FAQ do JSON-LD = FAQ visível.
const V7 = (f) => read('home-v7/' + f);
const HOME_FAQ = JSON.parse(V7('faq.json'));
export const home = {
  path: '/', og: 'home',
  title: 'Empresa de Desenvolvimento de Software e Criação de Sites | Roque',
  description: 'Empresa de desenvolvimento de software e criação de sites profissionais, com SEO, GEO e AEO, software sob medida e aplicativos. Peça orçamento à Roque.',
  themeColor: '#000000',
  css: V7('home.css'),
  js: V7('home.js'),
  body: V7('body.html'),
  get graph() { return [org(), website(), webpage('/', 'Roque Business Evolution: empresa de desenvolvimento de software e criação de sites'), { '@type': 'FAQPage', '@id': pageUrl('/') + '#faq', mainEntity: HOME_FAQ }]; },
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
