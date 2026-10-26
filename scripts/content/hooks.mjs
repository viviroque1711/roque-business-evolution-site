// Páginas dos GANCHOS COMERCIAIS (decisão de 22/10/2026, com dados do Planejador de palavras-chave e do Google Trends):
// cada página é dona de UMA busca principal, sem disputar com a home ("empresa de desenvolvimento de software").
//   /criacao-de-sites/               -> criação de sites profissionais (+ criação de site, desenvolvimento de site, criação de sites SP)
//   /desenvolvimento-de-software/    -> software sob medida e sistemas personalizados (+ fábrica de software)
//   /desenvolvimento-de-aplicativos/ -> desenvolvimento de aplicativos (página nova)
//   /seo/                            -> agência de SEO (+ empresa de SEO, consultoria SEO, SEO local)
//   /geo-aeo/                        -> GEO e SEO para IA (+ AEO, como aparecer no ChatGPT)
// Visual: abertura preta com objeto 3D próprio (hook3d.js), listas estruturadas, nada de texto corrido (hook3d.css, classes k3-).
// Regras de verdade: sem números de resultado, sem clientes, sem promessa de posição no Google nem de citação em IA, sem preços.
import fs from 'node:fs';
import path from 'node:path';
import { esc, faq, crumbLd, crumbHtml, wa, pageUrl } from './lib.mjs';
import { AURORA, ENGAGEBOT } from './kit.mjs';
import { org, website, webpage, service, OG } from './schema.mjs';
import { SCENES, DEVICE_CSS, DEVICE_JS } from './devices.mjs';
import { choose as chooseBlock, CHOOSE_CSS } from './choose.mjs';

const read = (f) => fs.readFileSync(path.join(import.meta.dirname, f), 'utf8');
const CSS = read('hook3d.css') + '\n' + DEVICE_CSS + '\n' + CHOOSE_CSS;
const JS = read('hook3d.js') + '\n' + DEVICE_JS;
const Q = (q, a) => ({ q, a: `<p>${a}</p>` });
const S = (d) => `<svg viewBox="0 0 46 46" aria-hidden="true" focusable="false">${d}</svg>`;
const G = '#A87000';
const IC = {
  design: S(`<rect x="5" y="8" width="36" height="28" rx="3" fill="none" stroke="${G}" stroke-width="2"/><path d="M5 15h36" stroke="${G}" stroke-width="2"/><circle cx="16" cy="25" r="4" fill="${G}"/>`),
  text: S(`<path d="M10 14h26M10 21h26M10 28h18" stroke="${G}" stroke-width="2.5" stroke-linecap="round"/>`),
  seo: S(`<circle cx="20" cy="20" r="11" fill="none" stroke="${G}" stroke-width="2.5"/><path d="M28 28l10 10" stroke="${G}" stroke-width="3"/>`),
  ia: S(`<path d="M8 12h30v18H20l-8 7v-7H8z" fill="none" stroke="${G}" stroke-width="2"/><circle cx="17" cy="21" r="2" fill="${G}"/><circle cx="23" cy="21" r="2" fill="${G}"/><circle cx="29" cy="21" r="2" fill="${G}"/>`),
  fast: S(`<path d="M26 5L12 26h10l-3 15 15-22H24z" fill="none" stroke="${G}" stroke-width="2.2" stroke-linejoin="round"/>`),
  wa: S(`<circle cx="23" cy="23" r="15" fill="none" stroke="${G}" stroke-width="2.2"/><path d="M15 34l2-6" stroke="${G}" stroke-width="2.2"/><path d="M18 18c1 6 4 9 10 10" stroke="${G}" stroke-width="2.2" fill="none"/>`),
  lock: S(`<rect x="11" y="20" width="24" height="18" rx="3" fill="none" stroke="${G}" stroke-width="2.2"/><path d="M16 20v-5a7 7 0 0114 0v5" fill="none" stroke="${G}" stroke-width="2.2"/>`),
  chart: S(`<path d="M10 34V20M18 34V14M26 34V22M34 34V10" stroke="${G}" stroke-width="3"/>`),
  code: S(`<path d="M16 14l-8 9 8 9M30 14l8 9-8 9" fill="none" stroke="${G}" stroke-width="2.5"/>`),
  nodes: S(`<circle cx="12" cy="12" r="4" fill="${G}"/><circle cx="34" cy="14" r="4" fill="${G}"/><circle cx="22" cy="34" r="4" fill="${G}"/><path d="M12 12L34 14L22 34Z" fill="none" stroke="${G}" stroke-width="1.5"/>`),
  grid: S(`<rect x="6" y="6" width="14" height="14" rx="2" fill="none" stroke="${G}" stroke-width="2"/><rect x="26" y="6" width="14" height="14" rx="2" fill="${G}"/><rect x="6" y="26" width="14" height="14" rx="2" fill="${G}"/><rect x="26" y="26" width="14" height="14" rx="2" fill="none" stroke="${G}" stroke-width="2"/>`),
  phone: S(`<rect x="14" y="5" width="18" height="36" rx="4" fill="none" stroke="${G}" stroke-width="2.2"/><path d="M20 35h6" stroke="${G}" stroke-width="2.2"/>`),
  bell: S(`<path d="M13 31V21a10 10 0 0120 0v10l3 3H10z" fill="none" stroke="${G}" stroke-width="2.2" stroke-linejoin="round"/><path d="M20 38h6" stroke="${G}" stroke-width="2.2"/>`),
  plug: S(`<path d="M17 6v10M29 6v10M12 16h22v6a11 11 0 01-22 0zM23 33v8" fill="none" stroke="${G}" stroke-width="2.2"/>`),
  pin: S(`<path d="M23 41s-12-11-12-21a12 12 0 0124 0c0 10-12 21-12 21z" fill="none" stroke="${G}" stroke-width="2.2"/><circle cx="23" cy="20" r="4" fill="${G}"/>`),
  link: S(`<path d="M19 27l8-8M15 22l-4 4a6 6 0 008 8l4-4M31 24l4-4a6 6 0 00-8-8l-4 4" fill="none" stroke="${G}" stroke-width="2.2" stroke-linecap="round"/>`),
  doc: S(`<path d="M12 5h16l8 8v28H12z" fill="none" stroke="${G}" stroke-width="2.2"/><path d="M17 22h14M17 28h14M17 34h9" stroke="${G}" stroke-width="2"/>`),
  eye: S(`<path d="M4 23s7-12 19-12 19 12 19 12-7 12-19 12S4 23 4 23z" fill="none" stroke="${G}" stroke-width="2.2"/><circle cx="23" cy="23" r="5" fill="${G}"/>`),
  robot: S(`<rect x="10" y="14" width="26" height="20" rx="4" fill="none" stroke="${G}" stroke-width="2.2"/><circle cx="18" cy="24" r="2.5" fill="${G}"/><circle cx="28" cy="24" r="2.5" fill="${G}"/><path d="M23 8v6" stroke="${G}" stroke-width="2.2"/>`),
};

// os cinco ganchos, para a faixa "outros serviços principais" no fim de cada página
const HOOKS = {
  sites: ['/criacao-de-sites/', 'Criação de sites profissionais', IC.design],
  software: ['/desenvolvimento-de-software/', 'Software sob medida', IC.code],
  apps: ['/desenvolvimento-de-aplicativos/', 'Desenvolvimento de aplicativos', IC.phone],
  seo: ['/seo/', 'Agência de SEO', IC.seo],
  geo: ['/geo-aeo/', 'GEO e SEO para IA', IC.ia],
};

const spec = (items) => `<ul class="k3-spec">${items.map(([ic, b, s]) => `<li>${IC[ic]}<strong>${b}</strong><span>${s}</span></li>`).join('')}</ul>`;
const flow = (items) => `<ol class="k3-flow" style="--n:${items.length}">${items.map(([b, s]) => `<li><strong>${esc(b)}</strong><span>${esc(s)}</span></li>`).join('')}</ol>`;
const pillars = (items) => `<div class="k3-pillars" style="--n:${items.length}">${items.map(([ic, h, lis]) => `<div class="k3-pillar">${IC[ic]}<h3>${esc(h)}</h3><ul>${lis.map((l) => `<li>${l}</li>`).join('')}</ul></div>`).join('')}</div>`;
const chips = (items, gold = []) => `<ul class="k3-chips">${items.map((t) => `<li${gold.includes(t) ? ' class="g"' : ''}>${esc(t)}</li>`).join('')}</ul>`;
const anatomy = (layers) => `<div class="k3-anat"><ol class="k3-layers">${layers.map(([b, s], i) => `<li data-k3-layer><b>${i + 1}</b><strong>${esc(b)}</strong><small>${esc(s)}</small></li>`).join('')}</ol>
<div class="k3-stack" data-k3-stack aria-hidden="true"><div class="k3-stack-rot">${layers.slice().reverse().map(([b]) => `<div class="k3-plane"><span>${esc(b)}</span></div>`).join('')}</div></div></div>`;
const own = () => `<div class="k3-own"><a href="${AURORA}" rel="noopener"><b>Aurora Premium</b><span>Sistema de agendamento e gestão para salões, barbearias, clínicas, spas e pet shops.</span></a><a href="${ENGAGEBOT}" rel="noopener"><b>EngageBot</b><span>Atendimento com inteligência artificial no WhatsApp e no site.</span></a></div>`;

const choose = (answer, rows, proof, msg, more) => chooseBlock(answer, rows.map(([ic, q, h]) => [IC[ic], q, h]), proof, msg, more);
const BLOCK = { spec, flow, pillars, chips, anatomy, own, choose };
export { IC, spec };

function hookPage(c) {
  const crumb = [{ name: 'Início', path: '/' }, { name: c.crumbName, path: c.path }];
  const f = faq(c.faq, { pagePath: c.path, heading: c.faqH2 });
  const sections = c.blocks.map((b) => `<section class="k3-sec ${b.v === 'black' ? 'k3-black' : b.v === 'white' ? 'white k3-white' : 'mist'}" id="${b.id}" aria-labelledby="${b.id}-h"><div class="wrap">
<h2 id="${b.id}-h">${esc(b.h2)}</h2>${b.one ? `<p class="k3-one">${b.one}</p>` : ''}
${BLOCK[b.kind](...b.args)}${b.after ? `<p class="k3-one k3-after">${b.after}</p>` : ''}
</div></section>`).join('\n');
  const next = Object.entries(HOOKS).filter(([k]) => k !== c.key).map(([, [h, t, ic]]) => `<li><a href="${h}">${ic}<span>${esc(t)}</span></a></li>`).join('');
  const body = `<div class="k3">
<section class="k3-hero" aria-labelledby="h1"><div class="k3-hero-in">
<div>${crumbHtml(crumb)}<h1 id="h1">${esc(c.h1)}</h1><p class="k3-lead">${c.lead}</p>
<div class="k3-btns"><a class="btn gold" href="${wa(c.msg)}" rel="noopener">Pedir orçamento no WhatsApp</a><a class="btn line" href="#${c.jumpTo || c.blocks[0].id}">${esc(c.jump)}</a></div></div>
<div class="k3-obj k3-dev">${SCENES[c.mode]()}</div>
</div></section>
${sections}
</div>
${f.html.replace('class="sec paper"', 'class="sec white"')}
<div class="k3"><section class="k3-sec k3-black" id="conversar" aria-labelledby="cta-h"><div class="wrap">
<h2 id="cta-h">${esc(c.ctaH2)}</h2><p class="k3-one">${esc(c.ctaP)}</p><div class="k3-btns"><a class="btn gold" href="${wa(c.msg)}" rel="noopener">Pedir orçamento no WhatsApp</a></div>
<div class="k3-final"><p class="k3-one" style="margin:0">Outros serviços principais da Roque Business Evolution</p><ul class="k3-next">${next}</ul></div>
</div></section></div>`;
  return {
    path: c.path, title: c.title, description: c.description, image: OG(c.og), themeColor: '#000000', css: CSS, js: JS, body,
    get graph() { return [org(), website(), webpage(c.path, c.title.replace(/ \| Roque.*$/, ''), 'WebPage', { mainEntity: { '@id': pageUrl(c.path) + '#service' } }), service(c.path, c.serviceName, c.serviceType, c.serviceDescription), crumbLd(crumb), f.ld]; },
  };
}

// ================================================================== CRIAÇÃO DE SITES PROFISSIONAIS
const sites = hookPage({
  key: 'sites', path: '/criacao-de-sites/', og: 'criacao-de-sites', crumbName: 'Criação de sites', mode: 'sites',
  title: 'Criação de Sites Profissionais com SEO em SP | Roque',
  description: 'Empresa de criação de sites profissionais em São Paulo: site rápido, com SEO, GEO e WhatsApp, pronto para o Google e para as IAs. Peça orçamento.',
  h1: 'Criação de sites profissionais que aparecem no Google e nas IAs',
  lead: 'A Roque Business Evolution é uma empresa de criação de sites profissionais: planejamos, escrevemos, desenhamos e publicamos o site da sua empresa com SEO, GEO e AEO desde o primeiro dia.',
  jump: 'Ver o que entra no site', objLabel: 'Três camadas de um site profissional se separando e se juntando em 3D',
  msg: 'Olá! Quero um orçamento para a criação do site da minha empresa.',
  serviceName: 'Criação de sites profissionais com SEO', serviceType: 'Criação de sites',
  serviceDescription: 'Criação e desenvolvimento de sites profissionais, landing pages, blogs e lojas virtuais com SEO, GEO e AEO, design responsivo, integração com WhatsApp e medição de conversões.',
  jumpTo: 'o-que-entra',
  blocks: [
    // dobra "como escolher": a pergunta principal do Google (As pessoas também perguntam, 22/10/2026) logo depois da abertura
    { kind: 'choose', v: 'white', id: 'como-escolher', h2: 'Qual é o melhor criador de site profissional?', args: [
      'Para um site simples que você mesmo monta, um construtor pronto, como o Wix, resolve. Para o site trazer clientes, o melhor é quem entrega SEO, texto, velocidade e WhatsApp no mesmo projeto. <strong>É assim que a Roque Business Evolution cria sites:</strong> os seis pontos abaixo já vêm no projeto.',
      [
        ['seo', 'Aparece no Google e nas IAs?', 'SEO, GEO e AEO feitos desde o primeiro dia, não depois.'],
        ['text', 'Quem escreve o texto?', 'Nós escrevemos o texto que vende e responde às buscas.'],
        ['fast', 'Abre rápido no celular?', 'Site leve, testado no celular antes de publicar.'],
        ['wa', 'Vira contato?', 'WhatsApp, formulário e medição de cada conversão.'],
        ['lock', 'O domínio é seu?', 'Domínio e acessos ficam no nome da sua empresa.'],
        ['chart', 'Tem quem cuide depois?', 'Medição, ajustes e evolução depois do lançamento.'],
      ],
      'Este site foi feito assim: rápido, com SEO, GEO e AEO, e com o WhatsApp a um toque.',
      'Olá! Quero um diagnóstico para criar o site da minha empresa.',
      ['#o-que-entra', 'Ver o que entra no projeto'],
    ] },
    { kind: 'spec', v: 'mist', id: 'o-que-entra', h2: 'O que entra na criação de sites profissionais', one: 'Tudo o que um site precisa para ser encontrado e virar contato, em um só projeto.', args: [[
      ['design', 'Design sob medida', 'Identidade da sua marca, sem modelo pronto.'],
      ['text', 'Texto que vende', 'Escrito para o seu cliente e para as buscas.'],
      ['seo', 'SEO desde o primeiro dia', 'Títulos, estrutura, sitemap e dados estruturados.'],
      ['ia', 'GEO e AEO', 'Respostas claras para ChatGPT, Gemini e Claude. <a href="/geo-aeo/">Entenda</a>.'],
      ['fast', 'Rápido e pronto para o celular', 'Leve, acessível e responsivo.'],
      ['wa', 'WhatsApp, agenda e CRM', 'Cada visita pode virar uma conversa.'],
      ['lock', 'Domínio, hospedagem e SSL', 'Configurados e publicados por nós.'],
      ['chart', 'Medição de conversões', 'Você sabe de onde vem cada contato.'],
    ]] },
    { kind: 'anatomy', v: 'black', id: 'anatomia', h2: 'Anatomia de um site profissional', one: 'Cinco camadas que trabalham juntas. Passe o mouse para ver cada uma.', args: [[
      ['Design', 'A primeira impressão da sua marca'],
      ['Conteúdo', 'O que você faz, para quem e por quê'],
      ['SEO e GEO', 'Encontrado no Google e nas IAs'],
      ['Velocidade', 'Abre rápido no celular'],
      ['Conversão', 'WhatsApp, formulário e agenda'],
    ]] },
    { kind: 'chips', v: 'white', id: 'tipos', h2: 'Tipos de site que a Roque Business Evolution cria', one: 'Do site institucional à loja virtual, com a mesma base de SEO.', args: [['Site institucional', 'Landing page', 'Site para prestador de serviço', 'Site para clínica e salão', 'Blog e portal de conteúdo', 'Catálogo digital', 'Loja virtual, conforme o escopo', 'Reformulação de site'], ['Site institucional', 'Landing page']] },
    { kind: 'flow', v: 'mist', id: 'como-funciona', h2: 'Como funciona a criação de sites', one: 'Cinco etapas, com a sua aprovação em cada uma.', args: [[
      ['Diagnóstico', 'Negócio, público e palavras-chave'],
      ['Arquitetura e texto', 'Páginas, mensagens e chamadas'],
      ['Design', 'Visual aprovado com você'],
      ['Desenvolvimento e SEO', 'Código leve e pronto para as buscas'],
      ['Publicação e medição', 'No ar, medido e evoluindo'],
    ]] },
  ],
  faqH2: 'Perguntas frequentes sobre criação de sites',
  faq: [
    Q('Quanto custa a criação de um site profissional?', 'Depende do número de páginas, das integrações e do conteúdo. Peça um orçamento pelo WhatsApp e receba a proposta com escopo e prazo.'),
    Q('Quanto tempo leva para criar um site profissional?', 'O prazo depende do escopo e entra na proposta, etapa por etapa, antes do início do projeto.'),
    Q('O site já sai pronto para aparecer no Google?', 'Sim, com a base técnica de <a href="/seo/">SEO</a> e de <a href="/geo-aeo/">GEO e AEO</a> bem feita. A posição nas buscas depende de mercado e concorrência, e ninguém pode garanti-la.'),
    Q('A Roque Business Evolution atende só em São Paulo?', 'Não. A Roque Business Evolution vai até a sua empresa em São Paulo e em Guarulhos e atende todo o Brasil com reuniões online. Veja a <a href="/criacao-de-sites-em-guarulhos/">criação de sites em Guarulhos</a>.'),
    Q('Vocês fazem criação de sites com SEO?', 'Sim. Todo site sai com a base de SEO pronta: títulos, estrutura, velocidade, sitemap e dados estruturados, mais GEO e AEO para as IAs.'),
    Q('Vocês criam landing page?', 'Sim. Landing pages para campanhas e ofertas, com a mesma base de SEO e medição de conversões.'),
    Q('O site fica integrado ao WhatsApp?', 'Sim. O site leva direto para uma conversa no WhatsApp e pode se integrar a formulários, CRM e agenda online.'),
  ],
  ctaH2: 'Vamos criar o site profissional da sua empresa', ctaP: 'Conte o que a sua empresa faz e o que o site precisa entregar.',
});

// ================================================================== SOFTWARE SOB MEDIDA
const software = hookPage({
  key: 'software', path: '/desenvolvimento-de-software/', og: 'desenvolvimento-de-software', crumbName: 'Software sob medida', mode: 'software',
  title: 'Software Sob Medida e Sistemas Personalizados | Roque',
  description: 'Desenvolvimento de software sob medida e sistemas personalizados para a sua empresa: do MVP ao sistema em produção, com integrações e IA. Roque.',
  h1: 'Software sob medida e sistemas personalizados para a sua empresa',
  lead: 'Desenvolvimento de software sob medida é criar o sistema que a sua empresa precisa, em vez de adaptar a empresa a um sistema pronto. A Roque Business Evolution faz isso do MVP ao sistema em produção.',
  jump: 'Ver o que desenvolvemos', objLabel: 'Módulos de um sistema sob medida se conectando em 3D',
  msg: 'Olá! Quero um orçamento para desenvolver um software sob medida.',
  serviceName: 'Desenvolvimento de software sob medida e sistemas personalizados', serviceType: 'Desenvolvimento de software',
  serviceDescription: 'Desenvolvimento de software sob medida, sistemas personalizados, sistemas web, portais, dashboards, integrações com APIs e sistemas legados, com IA, testes, implantação e evolução.',
  blocks: [
    { kind: 'spec', v: 'mist', id: 'o-que-desenvolvemos', h2: 'O que a Roque Business Evolution desenvolve em software sob medida', one: 'Sistemas desenhados para a rotina da sua empresa.', args: [[
      ['code', 'Sistemas web', 'Acessados de qualquer lugar, no navegador.'],
      ['design', 'Portais e áreas do cliente', 'Seu cliente resolve sozinho, a qualquer hora.'],
      ['chart', 'Dashboards e indicadores', 'Os números da operação em uma tela.'],
      ['plug', 'Integração de sistemas e APIs', 'O sistema novo conversa com o ERP, o CRM e o que você já usa.'],
      ['nodes', 'Sistemas legados', 'Modernizados sem parar a operação.'],
      ['robot', 'IA dentro do sistema', 'Agentes e automações com regras e aprovação humana.'],
      ['grid', 'Plataformas SaaS', 'Sistemas multiempresa com assinatura. <a href="/saas/">Veja SaaS</a>.'],
      ['phone', 'Aplicativos', 'Para o celular do seu cliente e da sua equipe. <a href="/desenvolvimento-de-aplicativos/">Veja aplicativos</a>.'],
    ]] },
    { kind: 'pillars', v: 'white', id: 'sob-medida-ou-pronto', h2: 'Software sob medida ou sistema pronto?', one: 'As duas escolhas fazem sentido em momentos diferentes.', args: [[
      ['grid', 'Sistema pronto', ['Começa rápido', 'A empresa se adapta ao sistema', 'Funções iguais para todos', 'Bom para processos padrão']],
      ['code', 'Software sob medida', ['Segue o seu processo', 'Integra com o que você já usa', 'Cresce com a empresa', 'Bom quando o processo é o seu diferencial']],
    ]] },
    { kind: 'flow', v: 'mist', id: 'do-mvp-a-producao', h2: 'Do MVP ao sistema em produção', one: 'Cinco etapas, com entregas que você testa.', args: [[
      ['Escopo e arquitetura', 'Requisitos, tecnologia e critérios de aceite'],
      ['Protótipo e MVP', 'A menor versão que já gera valor'],
      ['Desenvolvimento e testes', 'Funções, segurança e desempenho'],
      ['Implantação', 'No ar, documentado e com treinamento'],
      ['Evolução', 'Monitoramento, correções e novas funções'],
    ]] },
    { kind: 'own', v: 'black', id: 'produtos-proprios', h2: 'Software que a Roque Business Evolution desenvolve e opera', one: 'Dois produtos próprios, no ar e em evolução.', args: [] },
  ],
  faqH2: 'Perguntas frequentes sobre software sob medida',
  faq: [
    Q('O que é software sob medida?', 'É um sistema criado para o processo e para os dados de uma empresa específica, em vez de uma ferramenta pronta adaptada.'),
    Q('A Roque Business Evolution é uma empresa de desenvolvimento de software?', 'Sim. A Roque Business Evolution é uma empresa de desenvolvimento de software: cria sistemas personalizados, plataformas SaaS, aplicativos e integrações.'),
    Q('Quanto custa desenvolver um software sob medida?', 'Depende do escopo, das integrações e do prazo. Peça um orçamento pelo WhatsApp; a proposta chega com etapas, entregas e prazo.'),
    Q('O que é um MVP?', 'É a menor versão do sistema que já pode ser usada. Ela testa a ideia com usuários reais antes de investir no sistema completo.'),
    Q('Vocês fazem integração de sistemas?', 'Sim. Integramos o sistema novo ao ERP, ao CRM, ao e-commerce e a outros sistemas por APIs, e também a sistemas legados, conforme a viabilidade técnica de cada caso.'),
    Q('A Roque Business Evolution é uma software house?', 'Sim. Como software house, a Roque Business Evolution desenvolve software sob medida, sistemas web, aplicativos, plataformas SaaS e integrações, do escopo à evolução do sistema.'),
    Q('De quem é o software desenvolvido?', 'Propriedade, infraestrutura, suporte e manutenção são definidos em contrato, projeto a projeto.'),
  ],
  ctaH2: 'Vamos desenhar o software da sua empresa', ctaP: 'Conte o processo que você quer resolver.',
});

// ================================================================== DESENVOLVIMENTO DE APLICATIVOS (nova)
const apps = hookPage({
  key: 'apps', path: '/desenvolvimento-de-aplicativos/', og: 'desenvolvimento-de-aplicativos', crumbName: 'Desenvolvimento de aplicativos', mode: 'apps',
  title: 'Desenvolvimento de Aplicativos para Empresas | Roque',
  description: 'Desenvolvimento de aplicativos para empresas: apps Android e iOS, aplicativo web e PWA integrados ao seu sistema, do protótipo à publicação. Roque.',
  h1: 'Desenvolvimento de aplicativos para empresas, do protótipo à publicação',
  lead: 'A Roque Business Evolution desenvolve aplicativos para empresas: apps para o celular do seu cliente e da sua equipe, ligados ao seu sistema e publicados com segurança.',
  jump: 'Ver o que o app pode fazer', objLabel: 'Celular com as telas de um aplicativo e ícones em órbita, em 3D',
  msg: 'Olá! Quero um orçamento para desenvolver um aplicativo.',
  serviceName: 'Desenvolvimento de aplicativos para empresas', serviceType: 'Desenvolvimento de aplicativos',
  serviceDescription: 'Desenvolvimento de aplicativos Android e iOS, aplicativos web e PWA para empresas, com integração a sistemas e APIs, login, notificações, painel administrativo, testes e publicação.',
  blocks: [
    { kind: 'spec', v: 'mist', id: 'o-que-o-app-faz', h2: 'O que entra no desenvolvimento de aplicativos', one: 'Um app útil no dia a dia, ligado ao resto da empresa.', args: [[
      ['phone', 'App para os seus clientes', 'Agendamento, pedidos e área do cliente.'],
      ['nodes', 'App para a sua equipe', 'Rotina de campo, tarefas e registros.'],
      ['design', 'Telas desenhadas para o polegar', 'Simples de usar no celular.'],
      ['plug', 'Integrado ao seu sistema', 'Mesmos dados do site e do sistema web.'],
      ['bell', 'Notificações', 'Lembretes e avisos na hora certa.'],
      ['lock', 'Login e permissões', 'Cada pessoa vê o que deve ver.'],
      ['chart', 'Painel administrativo', 'Você gerencia tudo pelo navegador.'],
      ['fast', 'Publicação e atualização', 'Nas lojas de aplicativos ou direto no navegador.'],
    ]] },
    { kind: 'pillars', v: 'white', id: 'tipos-de-aplicativo', h2: 'Qual tipo de aplicativo faz sentido para a sua empresa', one: 'Três caminhos. A escolha vem no diagnóstico.', args: [[
      ['phone', 'App Android e iOS', ['Fica nas lojas de aplicativos', 'Usa recursos do celular', 'Ideal para uso frequente']],
      ['fast', 'PWA', ['Instala pelo navegador', 'Funciona no Android e no iPhone', 'Mais rápido de publicar']],
      ['code', 'Aplicativo web', ['Abre em qualquer tela', 'Sem instalação', 'Ideal para painéis e sistemas']],
    ]] },
    { kind: 'flow', v: 'mist', id: 'como-desenvolvemos', h2: 'Como desenvolvemos o seu aplicativo', one: 'Cinco etapas, com o app no seu celular para testar.', args: [[
      ['Ideia e protótipo', 'Telas principais validadas cedo'],
      ['Design das telas', 'Fluxos simples e marca aplicada'],
      ['Desenvolvimento e integrações', 'App, painel e conexão com o sistema'],
      ['Testes no celular', 'Em aparelhos reais, com você'],
      ['Publicação e evolução', 'Nas lojas ou na web, e melhorando'],
    ]] },
  ],
  faqH2: 'Perguntas frequentes sobre desenvolvimento de aplicativos',
  faq: [
    Q('Quanto custa desenvolver um aplicativo?', 'Depende das telas, das integrações e das plataformas. Peça um orçamento pelo WhatsApp e receba a proposta com escopo e prazo.'),
    Q('Qual é a diferença entre PWA e app nativo?', 'O PWA é instalado pelo navegador e funciona no Android e no iPhone. O app nativo fica nas lojas de aplicativos e usa mais recursos do celular.'),
    Q('Vocês publicam o aplicativo na Google Play e na App Store?', 'Sim, quando o projeto prevê app nativo. A publicação usa a conta de desenvolvedor da sua empresa.'),
    Q('O aplicativo se conecta ao meu sistema?', 'Sim. O app usa os mesmos dados do seu sistema por APIs, e a Roque Business Evolution também desenvolve o <a href="/desenvolvimento-de-software/">software sob medida</a> por trás dele.'),
    Q('De quem é o aplicativo?', 'Propriedade, contas nas lojas, suporte e manutenção são definidos em contrato, projeto a projeto.'),
  ],
  ctaH2: 'Vamos tirar o seu aplicativo do papel', ctaP: 'Conte quem vai usar o app e o que ele precisa resolver.',
});

// ================================================================== AGÊNCIA DE SEO
const seo = hookPage({
  key: 'seo', path: '/seo/', og: 'seo', crumbName: 'Agência de SEO', mode: 'seo',
  title: 'Agência de SEO: Google e Buscas com IA | Roque',
  description: 'Agência de SEO para a sua empresa aparecer no Google: pesquisa de palavras-chave, SEO técnico, conteúdo, SEO local e GEO para as IAs. Roque.',
  h1: 'Agência de SEO para a sua empresa aparecer no Google',
  lead: 'Uma agência de SEO trabalha para a sua empresa aparecer quando o cliente pesquisa o que você vende. A Roque Business Evolution faz isso com pesquisa de palavras-chave, SEO técnico, conteúdo e SEO local, sem prometer posição.',
  jump: 'Ver o que fazemos', objLabel: 'Resultados de busca em 3D, com o resultado dourado subindo até o topo',
  msg: 'Olá! Quero um orçamento de SEO para a minha empresa.',
  serviceName: 'Agência de SEO', serviceType: 'SEO',
  serviceDescription: 'Pesquisa de palavras-chave, mapa de palavras por página, SEO técnico, on-page, off-page e local, conteúdo, Perfil da Empresa no Google, GEO e AEO, com relatórios no Google Search Console.',
  jumpTo: 'o-que-fazemos',
  blocks: [
    // dobra "como escolher": a pergunta principal do Google (As pessoas também perguntam, 22/10/2026) logo depois da abertura
    { kind: 'choose', v: 'white', id: 'como-escolher', h2: 'Qual é a melhor agência de SEO?', args: [
      'A melhor agência de SEO é a que mostra o que vai fazer, mede com os dados da sua empresa e não promete posição garantida. <strong>É assim que a agência de SEO da Roque Business Evolution trabalha</strong>, do diagnóstico ao relatório.',
      [
        ['seo', 'Começa por um diagnóstico?', 'Auditoria técnica e pesquisa de palavras-chave antes da proposta.'],
        ['doc', 'O plano vem por escrito?', 'Frentes, entregas e prazos definidos por escrito.'],
        ['chart', 'Mede com dados que são seus?', 'Search Console e Analytics no nome da sua empresa.'],
        ['lock', 'Promete a primeira posição?', 'Não. Ninguém pode garantir posição no Google, e nós não prometemos.'],
        ['pin', 'Cuida do SEO local?', 'Site e Perfil de Empresa no Google trabalhando juntos.'],
        ['ia', 'Pensa nas buscas com IA?', 'GEO e AEO para as respostas do ChatGPT, do Gemini e do Claude.'],
      ],
      'Uma busca principal por página, sem disputa interna: é o mesmo método usado neste site.',
      'Olá! Quero um diagnóstico de SEO para a minha empresa.',
      ['#o-que-fazemos', 'Ver o que a agência faz'],
    ] },
    { kind: 'spec', v: 'mist', id: 'o-que-fazemos', h2: 'O que a agência de SEO da Roque faz', one: 'Do que o seu cliente pesquisa até o contato no seu site.', args: [[
      ['seo', 'Pesquisa de palavras-chave', 'O que o cliente digita quando quer contratar.'],
      ['doc', 'Mapa de palavras por página', 'Uma busca principal por página, sem disputa interna.'],
      ['code', 'SEO técnico', 'Rastreamento, velocidade, sitemap e dados estruturados.'],
      ['text', 'SEO on-page e conteúdo', 'Títulos, textos e perguntas que respondem.'],
      ['pin', 'SEO local', 'Perfil da Empresa no Google e buscas na sua região.'],
      ['link', 'Autoridade', 'Menções e links legítimos de outros sites.'],
      ['ia', 'GEO e AEO', 'A mesma base preparada para as IAs. <a href="/geo-aeo/">Entenda</a>.'],
      ['chart', 'Relatórios', 'Impressões, cliques e contatos no Search Console.'],
    ]] },
    { kind: 'pillars', v: 'white', id: 'frentes-do-seo', h2: 'As quatro frentes do SEO', one: 'Quando as quatro andam juntas, a empresa aparece.', args: [[
      ['code', 'Técnico', ['Site rápido e rastreável', 'Sitemap e robots corretos', 'Dados estruturados']],
      ['text', 'Conteúdo', ['Uma página por busca', 'Primeira frase que responde', 'Perguntas reais do cliente']],
      ['link', 'Autoridade', ['Menções em sites relevantes', 'Diretórios e parcerias', 'Marca consistente na web']],
      ['pin', 'Local', ['Perfil da Empresa no Google', 'Buscas na sua cidade', 'Avaliações reais']],
    ]] },
    { kind: 'flow', v: 'mist', id: 'como-trabalhamos', h2: 'Como a agência de SEO trabalha', one: 'Cinco etapas, com números que você acompanha.', args: [[
      ['Auditoria', 'O que impede o site de aparecer'],
      ['Palavras-chave', 'Buscas de quem quer contratar'],
      ['Correções técnicas', 'Base pronta para o Google'],
      ['Conteúdo', 'Páginas e respostas certas'],
      ['Acompanhamento', 'Search Console e ajustes'],
    ]] },
  ],
  faqH2: 'Perguntas frequentes sobre agência de SEO',
  faq: [
    Q('O que faz uma agência de SEO?', 'Uma agência de SEO pesquisa o que o seu cliente procura, corrige a parte técnica do site, cria o conteúdo certo e acompanha os resultados nas buscas.'),
    Q('Quanto custa uma agência de SEO?', 'Depende do tamanho do site e do trabalho mensal. Peça um orçamento pelo WhatsApp; a proposta mostra as entregas de cada mês.'),
    Q('A agência de SEO garante a primeira posição no Google?', 'Não. Ninguém pode garantir posição. O trabalho aumenta as chances com base técnica, conteúdo e autoridade, e os resultados são acompanhados no Search Console.'),
    Q('Qual é a diferença entre SEO e Google Ads?', 'No Google Ads você paga por clique enquanto o anúncio roda. No SEO você aparece nos resultados orgânicos, sem pagar por clique.'),
    Q('Vocês fazem SEO local?', 'Sim. Configuramos o Perfil da Empresa no Google e trabalhamos as buscas da sua região.'),
    Q('SEO também ajuda a aparecer no ChatGPT?', 'Ajuda. As IAs buscam na internet e preferem páginas claras e bem posicionadas. Veja <a href="/geo-aeo/">GEO e SEO para IA</a>.'),
  ],
  ctaH2: 'Vamos fazer a sua empresa ser encontrada', ctaP: 'Conte o que você vende e onde estão os seus clientes.',
});

// ================================================================== GEO E SEO PARA IA
const geo = hookPage({
  key: 'geo', path: '/geo-aeo/', og: 'geo-aeo', crumbName: 'GEO e SEO para IA', mode: 'geo',
  title: 'GEO e SEO para IA: Como Aparecer no ChatGPT | Roque',
  description: 'GEO, AEO e SEO para IA: organizamos o site da sua empresa para ChatGPT, Gemini, Claude e Copilot entenderem e poderem citar você. Peça orçamento.',
  h1: 'GEO e SEO para IA: como a sua empresa aparece no ChatGPT e no Google',
  lead: 'GEO (Generative Engine Optimization) e AEO (Answer Engine Optimization) organizam o site da sua empresa para as inteligências artificiais entenderem o que você faz e poderem citar você nas respostas.',
  jump: 'Ver como funciona', objLabel: 'Esfera de pontos com balões de conversa em órbita; um deles cita a empresa',
  msg: 'Olá! Quero preparar o site da minha empresa para as buscas com IA (GEO e AEO).',
  serviceName: 'GEO e SEO para IA', serviceType: 'Otimização para buscas com inteligência artificial (GEO e AEO)',
  serviceDescription: 'GEO e AEO: auditoria de como as IAs veem a empresa, conteúdo que responde, perguntas frequentes com dados estruturados, consistência da marca, llms.txt, robôs de IA liberados e monitoramento de citações.',
  blocks: [
    { kind: 'flow', v: 'black', id: 'como-a-ia-escolhe', h2: 'Como uma IA escolhe quem citar', one: 'O caminho de uma pergunta até a resposta.', args: [[
      ['Pergunta', 'O cliente pergunta ao ChatGPT, Gemini ou Claude'],
      ['Busca', 'A IA pesquisa no Bing, no Google e em outros índices'],
      ['Leitura', 'Ela lê as páginas que respondem com clareza'],
      ['Conferência', 'Confere se a informação se repete em outros lugares'],
      ['Citação', 'Responde e pode citar a fonte'],
    ]] },
    { kind: 'spec', v: 'mist', id: 'o-que-fazemos', h2: 'O que fazemos em GEO e AEO', one: 'Cada etapa do caminho, preparada para a sua empresa.', args: [[
      ['eye', 'Auditoria nas IAs', 'Como ChatGPT, Gemini e Claude descrevem a sua empresa hoje.'],
      ['text', 'Primeira frase que responde', 'Cada seção abre com a resposta direta.'],
      ['doc', 'Perguntas frequentes', 'Com dados estruturados iguais ao texto da página.'],
      ['nodes', 'Marca consistente', 'Mesmo nome e mesmos dados no site, no Google, no LinkedIn e no Instagram.'],
      ['robot', 'Robôs de IA liberados', 'robots.txt e llms.txt prontos para as IAs.'],
      ['seo', 'Base de SEO', 'Sem SEO a IA não encontra a página. <a href="/seo/">Veja SEO</a>.'],
      ['link', 'Presença fora do site', 'Diretórios e listas que as IAs consultam.'],
      ['chart', 'Monitoramento', 'Citações no Bing e perguntas de teste todo mês.'],
    ]] },
    { kind: 'pillars', v: 'white', id: 'seo-geo-aeo', h2: 'SEO, GEO e AEO: qual é a diferença', one: 'Três nomes para a mesma base, com focos diferentes.', args: [[
      ['seo', 'SEO', ['Resultados do Google e do Bing', 'Base técnica e conteúdo', 'Medido no Search Console']],
      ['ia', 'GEO', ['Respostas geradas por IA', 'ChatGPT, Gemini, Claude e Copilot', 'Clareza e consistência da marca']],
      ['doc', 'AEO', ['Respostas diretas a perguntas', 'Perguntas frequentes e definições', 'Trechos que a busca destaca']],
    ]] },
  ],
  faqH2: 'Perguntas frequentes sobre GEO e SEO para IA',
  faq: [
    Q('O que é GEO?', 'GEO (Generative Engine Optimization) é preparar o conteúdo do site para ser entendido e citado por inteligências artificiais como ChatGPT, Gemini e Claude.'),
    Q('O que é AEO?', 'AEO (Answer Engine Optimization) é organizar respostas diretas para as perguntas do seu cliente, no formato que buscadores e assistentes destacam.'),
    Q('Como fazer a minha empresa aparecer no ChatGPT?', 'Com um site claro e bem posicionado nas buscas, respostas diretas, dados consistentes em vários lugares e páginas liberadas para os robôs de IA. É o trabalho de GEO.'),
    Q('Dá para garantir que a minha empresa seja citada pelas IAs?', 'Não. Ninguém controla as respostas das IAs. O trabalho aumenta as chances e é acompanhado mês a mês.'),
    Q('Como medir o resultado de GEO?', 'Pelo relatório de citações em IA do Bing Webmaster Tools, por perguntas de teste feitas todo mês às IAs e pelo tráfego que chega de ferramentas de IA.'),
    Q('O que é llms.txt?', 'É um arquivo em texto simples que resume o site para as inteligências artificiais, página por página.'),
  ],
  ctaH2: 'Vamos preparar a sua empresa para as buscas com IA', ctaP: 'Conte o que você vende e como os clientes descrevem você.',
});

// ================================================================== AGENTES DE IA PARA EMPRESAS (antes /agencia-de-ia/)
// "agência de IA" tem de 10 a 100 buscas por mês; "agentes de IA" e "chatbot WhatsApp" têm de 1 mil a 10 mil cada.
const agents = hookPage({
  key: 'agents', path: '/agentes-de-ia/', og: 'agentes-de-ia', crumbName: 'Agentes de IA para empresas', mode: 'agents',
  title: 'Agentes de IA para Empresas: WhatsApp e Automação | Roque',
  description: 'Agentes de IA para empresas: atendimento no WhatsApp, vendas, suporte e automação de processos, com regras, limites e pessoas no controle. Roque.',
  h1: 'Agentes de IA para empresas que atendem, vendem e automatizam',
  lead: 'Agentes de IA são assistentes de inteligência artificial que conversam com os seus clientes e executam tarefas nos sistemas da empresa, dentro das regras que você define. A Roque Business Evolution projeta, implanta e acompanha esses agentes.',
  jump: 'Ver o que eles fazem', objLabel: 'Agente de IA no centro, ligado ao WhatsApp, ao site, ao CRM e à agenda, em 3D',
  msg: 'Olá! Quero um orçamento de agentes de IA para a minha empresa.',
  serviceName: 'Agentes de IA para empresas', serviceType: 'Agentes de inteligência artificial',
  serviceDescription: 'Projeto, implantação e acompanhamento de agentes de inteligência artificial para atendimento no WhatsApp e no site, vendas, suporte, agendamento e automação de processos, com regras, limites e escalonamento humano.',
  jumpTo: 'o-que-fazem',
  blocks: [
    // dobra "como escolher": a pergunta principal do Google (As pessoas também perguntam, 22/10/2026) logo depois da abertura
    { kind: 'choose', v: 'white', id: 'como-escolher', h2: 'Qual é o melhor agente de IA para empresas?', args: [
      'O melhor agente de IA é o que conhece as informações da sua empresa, atende onde o seu cliente já está e deixa as pessoas no controle. <strong>É assim que a Roque Business Evolution cria agentes de IA:</strong> pronto, com o EngageBot, ou sob medida para a sua operação.',
      [
        ['doc', 'Aprende com a sua empresa?', 'O agente usa o seu site, documentos e perguntas frequentes como base.'],
        ['wa', 'Atende onde o cliente está?', 'WhatsApp e site no mesmo atendimento.'],
        ['plug', 'Faz tarefas, além de responder?', 'No agente sob medida: agenda, registra pedidos e consulta sistemas.'],
        ['eye', 'Passa o caso para uma pessoa?', 'A sua equipe assume quando o atendimento pede.'],
        ['lock', 'Tem regras e limites?', 'Só informações autorizadas, com aprovação humana onde importa.'],
        ['chart', 'Dá para acompanhar?', 'As conversas ficam visíveis para a sua equipe.'],
      ],
      `A Roque Business Evolution também opera o próprio agente de atendimento, o <a href="${ENGAGEBOT}" rel="noopener">EngageBot</a>.`,
      'Olá! Quero um diagnóstico para usar agentes de IA na minha empresa.',
      ['#o-que-fazem', 'Ver o que os agentes fazem'],
    ] },
    { kind: 'spec', v: 'mist', id: 'o-que-fazem', h2: 'O que os agentes de IA fazem na sua empresa', one: 'Tarefas que se repetem todos os dias, feitas a qualquer hora.', args: [[
      ['wa', 'Atendimento no WhatsApp', 'Responde dúvidas e encaminha pedidos. <a href="/agentes-de-ia-para-whatsapp/">Veja</a>.'],
      ['chart', 'Vendas e qualificação de leads', 'Separa quem está pronto para comprar. <a href="/agentes-de-ia-para-vendas/">Veja</a>.'],
      ['doc', 'Suporte e pós-venda', 'Responde com base nos seus documentos. <a href="/agentes-de-ia-para-suporte/">Veja</a>.'],
      ['bell', 'Agendamento e confirmação', 'Marca, confirma e lembra horários.'],
      ['eye', 'Consulta à base de conhecimento', 'Site, PDFs, perguntas frequentes e manuais.'],
      ['nodes', 'Automação de processos', 'Dados andando sozinhos entre sistemas. <a href="/automacao-de-processos/">Veja</a>.'],
      ['plug', 'Integração com CRM e agenda', 'O agente registra o que acontece na conversa.'],
      ['robot', 'Passagem para uma pessoa', 'Casos difíceis vão para a sua equipe.'],
    ]] },
    { kind: 'flow', v: 'black', id: 'como-funciona', h2: 'Como um agente de IA funciona', one: 'Do recebimento da mensagem à tarefa feita.', args: [[
      ['Recebe', 'A mensagem chega pelo WhatsApp ou pelo site'],
      ['Entende', 'Identifica o que o cliente quer'],
      ['Consulta', 'Busca nos seus documentos e sistemas'],
      ['Executa', 'Responde, agenda ou registra'],
      ['Encaminha', 'Passa para uma pessoa quando precisa'],
    ]] },
    { kind: 'pillars', v: 'white', id: 'com-controle', h2: 'Agentes de IA com controle', one: 'A inteligência artificial trabalha dentro das regras da sua empresa.', args: [[
      ['lock', 'Regras e limites', ['O que o agente pode e não pode fazer', 'Aprovação humana nas decisões sensíveis', 'Registro de cada operação']],
      ['eye', 'Privacidade', ['Dados dos clientes protegidos', 'Acesso só ao que é autorizado', 'Cuidados da LGPD']],
      ['chart', 'Medição', ['Conversas resolvidas sozinho', 'Conversas passadas para a equipe', 'Tempo de resposta']],
    ]] },
    { kind: 'own', v: 'black', id: 'pronto-para-usar', h2: 'Quer começar com um produto pronto?', one: 'O EngageBot é o atendimento com IA da Roque, no WhatsApp e no site.', args: [] },
  ],
  faqH2: 'Perguntas frequentes sobre agentes de IA',
  faq: [
    Q('O que são agentes de IA?', 'São assistentes de inteligência artificial que entendem mensagens, consultam as informações autorizadas da empresa e executam tarefas, como responder, agendar ou registrar pedidos.'),
    Q('Qual é a diferença entre chatbot e agente de IA?', 'O chatbot segue um roteiro de botões. O agente de IA entende a pergunta escrita do jeito do cliente, consulta informações e executa tarefas em outros sistemas.'),
    Q('Agente de IA funciona no WhatsApp?', 'Funciona. O atendimento pode ser feito no WhatsApp e no site, com passagem para uma pessoa quando necessário. Veja o <a href="/agentes-de-ia-para-whatsapp/">agente de IA para WhatsApp</a>.'),
    Q('O agente de IA substitui a minha equipe?', 'Não. Ele assume as tarefas repetitivas, e a equipe fica com os casos que pedem atenção humana.'),
    Q('Quanto custa ter agentes de IA na empresa?', 'Depende dos canais, das integrações e do volume. Peça um orçamento pelo WhatsApp; a proposta separa implantação, mensalidade e ferramentas de terceiros.'),
    Q('A Roque Business Evolution é uma empresa de inteligência artificial?', 'A Roque Business Evolution é uma empresa de desenvolvimento de software que cria agentes de IA e automação de processos com IA para empresas, ligados ao WhatsApp, ao site e aos sistemas que você já usa.'),
    Q('Agência de IA e agentes de IA são a mesma coisa?', 'Não. Agentes de IA são os assistentes que trabalham na empresa. A Roque Business Evolution é a empresa que cria, implanta e acompanha esses agentes.'),
  ],
  ctaH2: 'Vamos colocar agentes de IA para trabalhar na sua empresa', ctaP: 'Conte o que você quer automatizar ou melhorar no atendimento.',
});


// ================================================================== GUARULHOS (intenção local, 22/10/2026)
// Busca principal: criação de sites em Guarulhos (+ desenvolvimento de sites em Guarulhos). Uma página por cidade, nunca
// uma página por serviço e cidade. A Roque vai até o cliente; não recebe clientes em escritório próprio.
const guarulhosBase = hookPage({
  key: 'local', path: '/criacao-de-sites-em-guarulhos/', og: 'criacao-de-sites', crumbName: 'Criação de sites em Guarulhos', mode: 'sites',
  title: 'Criação de Sites em Guarulhos e Software Sob Medida | Roque',
  description: 'Criação de sites em Guarulhos e desenvolvimento de software e sistemas personalizados, com SEO e IA. Vamos até a sua empresa. Peça orçamento.',
  h1: 'Criação de sites e desenvolvimento de software em Guarulhos',
  lead: 'A Roque Business Evolution faz criação de sites em Guarulhos, desenvolvimento de sites e software sob medida para as empresas da cidade. Vamos até a sua empresa para entender o negócio, e o projeto segue com reuniões presenciais e online.',
  jump: 'Ver o que fazemos em Guarulhos', objLabel: 'Três camadas de um site profissional se separando e se juntando em 3D',
  msg: 'Olá! Minha empresa é de Guarulhos e quero um orçamento.',
  serviceName: 'Criação de sites e desenvolvimento de software em Guarulhos', serviceType: 'Criação de sites e desenvolvimento de software',
  serviceDescription: 'Criação e desenvolvimento de sites, software sob medida, sistemas personalizados, aplicativos, integração de sistemas, SEO local e agentes de IA para empresas de Guarulhos, com atendimento no endereço do cliente.',
  blocks: [
    { kind: 'spec', v: 'mist', id: 'o-que-fazemos', h2: 'O que a Roque Business Evolution faz em Guarulhos', one: 'Site, sistema e presença no Google, com a mesma equipe.', args: [[
      ['design', 'Criação de sites', 'Site profissional com SEO. <a href="/criacao-de-sites/">Veja como funciona</a>.'],
      ['text', 'Desenvolvimento e reformulação de sites', 'Seu site atual mais rápido e pronto para as buscas.'],
      ['code', 'Software sob medida', 'Sistemas personalizados para o seu processo. <a href="/desenvolvimento-de-software/">Veja</a>.'],
      ['phone', 'Aplicativos', 'Para o seu cliente e a sua equipe. <a href="/desenvolvimento-de-aplicativos/">Veja</a>.'],
      ['pin', 'SEO local', 'Site e Perfil de Empresa no Google trabalhando juntos. <a href="/seo/">Veja SEO</a>.'],
      ['ia', 'GEO e AEO', 'Respostas claras para as IAs. <a href="/geo-aeo/">Entenda</a>.'],
      ['robot', 'Agentes de IA e automação', 'Atendimento e tarefas no WhatsApp e no site. <a href="/agentes-de-ia/">Veja</a>.'],
      ['plug', 'Integração de sistemas', 'ERP, CRM e loja conversando entre si.'],
    ]] },
    { kind: 'pillars', v: 'white', id: 'como-atendemos', h2: 'Como a Roque Business Evolution atende em Guarulhos', one: 'No seu endereço quando precisa, online no dia a dia.', args: [[
      ['pin', 'No seu endereço', ['Visita à sua empresa para o diagnóstico', 'Reuniões presenciais nas etapas principais', 'Treinamento da equipe no local, quando fizer sentido']],
      ['wa', 'Online', ['Reuniões por vídeo no dia a dia', 'Cada etapa aprovada com você pelo WhatsApp', 'Atendimento também em São Paulo e em todo o Brasil']],
    ]] },
    { kind: 'chips', v: 'mist', id: 'para-quem', h2: 'Para quem fazemos sites e sistemas em Guarulhos', one: 'Pequenas, médias e grandes empresas.', args: [['Prestadores de serviço', 'Comércio e varejo', 'Clínicas e consultórios', 'Salões, estética e bem-estar', 'Indústria', 'Logística e transporte', 'Startups e novos negócios', 'Pequenas e médias empresas'], ['Pequenas e médias empresas']] },
    { kind: 'flow', v: 'white', id: 'como-funciona', h2: 'Como funciona o projeto em Guarulhos', one: 'Cinco etapas, com a sua aprovação em cada uma.', args: [[
      ['Visita e diagnóstico', 'Na sua empresa, em Guarulhos'],
      ['Proposta', 'Escopo, etapas e prazo por escrito'],
      ['Design e desenvolvimento', 'Entregas que você vê e aprova'],
      ['Publicação e treinamento', 'No ar, com a equipe pronta para usar'],
      ['Evolução', 'SEO, medição e melhorias contínuas'],
    ]] },
  ],
  faqH2: 'Perguntas frequentes sobre criação de sites em Guarulhos',
  faq: [
    Q('A Roque Business Evolution atende em Guarulhos?', 'Sim. Vamos até a sua empresa em Guarulhos para o diagnóstico e as reuniões principais; o restante do projeto segue online.'),
    Q('Vocês têm escritório para receber clientes?', 'Não recebemos clientes em escritório próprio. O atendimento acontece no seu endereço ou em reunião online.'),
    Q('Quanto custa a criação de um site em Guarulhos?', 'Depende do número de páginas, das integrações e do conteúdo. Peça um orçamento pelo WhatsApp e receba a proposta com escopo e prazo.'),
    Q('Vocês desenvolvem sistemas personalizados para empresas de Guarulhos?', 'Sim. Desenvolvemos software sob medida, sistemas web, aplicativos e integrações de sistemas para empresas de Guarulhos e região.'),
    Q('Vocês ajudam a aparecer no Google Maps em Guarulhos?', 'Sim. Cuidamos do SEO local do site e orientamos o Perfil de Empresa no Google. A posição no mapa depende de vários fatores, e ninguém pode garanti-la.'),
    Q('Vocês atendem também em São Paulo e em outras cidades?', 'Sim. Atendemos presencialmente em Guarulhos e em São Paulo e online em todo o Brasil.'),
  ],
  ctaH2: 'Vamos conversar sobre o projeto da sua empresa em Guarulhos', ctaP: 'Conte o que a sua empresa faz e o que precisa resolver.',
});
const AREAS = [{ '@type': 'City', name: 'Guarulhos', containedInPlace: { '@type': 'State', name: 'São Paulo' } }, { '@type': 'City', name: 'São Paulo' }];
const guarulhos = {
  ...guarulhosBase,
  get graph() {
    return guarulhosBase.graph.map((n) => (n && n['@type'] === 'Service' ? { ...n, areaServed: AREAS } : n));
  },
};

export const HOOK_PAGES = [sites, software, apps, seo, geo, agents, guarulhos];
