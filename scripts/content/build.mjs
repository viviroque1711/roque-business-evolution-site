// Conteúdo do roquebusinessevolution.com. Fonte: portfólio oficial (fontes-originais/portfolio-roque-business-evolution.md) reescrito em
// linguagem de site. Regras de verdade: nenhum depoimento, cliente, case, número de resultado ou avaliação; nenhuma promessa de posição
// no Google nem de citação em IA; sem preços; EngageBot só com o que está no ar (fase 1).
import { SITE } from '../../src/data/site.mjs';
import { esc, faq, crumbLd, crumbHtml, wa, writePage, finish, pageUrl } from './lib.mjs';

const ORG_ID = SITE.url + '/#org';
const SITE_ID = SITE.url + '/#website';
const ENGAGE_ID = SITE.url + '/engagebot/#app';
const OG = (n) => `/og/${n}.jpg`;
const btn = (text, msg) => `<a class="btn" href="${wa(msg)}" rel="noopener">${esc(text)}</a>`;
const li = (items) => `<ul class="facts">${items.map((t) => `<li>${t}</li>`).join('')}</ul>`;
const cols = (items) => `<ul class="cols">${items.map((t) => `<li>${t}</li>`).join('')}</ul>`;
const steps = (items) => `<ol class="steps">${items.map(([b, t]) => `<li><b>${esc(b)}</b>${esc(t)}</li>`).join('')}</ol>`;
const sec = (variant, id, h2, inner) => `<section class="sec ${variant}" id="${id}" aria-labelledby="${id}-h"><div class="wrap"><h2 id="${id}-h">${h2}</h2>${inner}</div></section>`;
const related = (items) => `<ul class="related">${items.map(([href, label]) => `<li><a href="${href}">${esc(label)}</a></li>`).join('')}</ul>`;

const org = () => ({
  '@type': 'Organization',
  '@id': ORG_ID,
  name: 'Roque Business Evolution',
  legalName: SITE.legalName,
  taxID: SITE.cnpj,
  url: SITE.url + '/',
  logo: SITE.url + '/img/roque-logo-fundo-claro.png',
  email: SITE.email,
  description: 'Agência de IA, criação de sites, SEO, desenvolvimento de software e transformação digital para empresas que querem evoluir.',
  contactPoint: { '@type': 'ContactPoint', contactType: 'customer service', telephone: '+55-11-97396-7161', email: SITE.email, availableLanguage: 'pt-BR' },
  sameAs: [SITE.instagram],
  founder: { '@id': SITE.founder.id },
  brand: [{ '@id': SITE.auroraId }, { '@id': ENGAGE_ID }],
});
const website = () => ({ '@type': 'WebSite', '@id': SITE_ID, url: SITE.url + '/', name: 'Roque Business Evolution', inLanguage: 'pt-BR', publisher: { '@id': ORG_ID } });
const webpage = (p, name, type = 'WebPage', extra = {}) => ({ '@type': type, '@id': pageUrl(p) + '#page', url: pageUrl(p), name, inLanguage: 'pt-BR', isPartOf: { '@id': SITE_ID }, about: { '@id': ORG_ID }, ...extra });
const service = (p, name, type, description) => ({ '@type': 'Service', '@id': pageUrl(p) + '#service', name, serviceType: type, description, provider: { '@id': ORG_ID }, areaServed: { '@type': 'Country', name: 'Brasil' }, url: pageUrl(p) });

const finalCta = (h2, p, msg) => `<section class="sec ink" id="conversar" aria-labelledby="cta-h"><div class="wrap"><h2 id="cta-h">${esc(h2)}</h2><p class="read">${esc(p)}</p><div class="btns">${btn('Falar no WhatsApp', msg)}</div></div></section>`;
const hero = (crumb, h1, lead, extra = '') => `<section class="page-hero" aria-labelledby="h1"><div class="wrap">${crumbHtml(crumb)}<h1 id="h1">${esc(h1)}</h1><p class="lead">${lead}</p>${extra}</div></section>`;

// ================================================================== SERVIÇOS (páginas próprias)
function servicePage(c) {
  const crumb = [{ name: 'Início', path: '/' }, { name: c.crumbName, path: c.path }];
  const f = faq(c.faq, { pagePath: c.path });
  const body = `${hero(crumb, c.h1, c.lead, `<div class="btns">${btn('Falar no WhatsApp', c.msg)}<a class="btn ghost" href="/servicos/">Ver todos os serviços</a></div>`)}
${c.sections.map((s, i) => sec(i % 2 === 0 ? 'white' : 'mist', s.id, s.h2, s.html)).join('\n')}
${sec(c.sections.length % 2 === 0 ? 'white' : 'mist', 'relacionados', `Outros serviços da Roque Business Evolution`, related(c.related))}
${f.html.replace('class="sec paper"', `class="sec ${c.sections.length % 2 === 0 ? 'mist' : 'white'}"`)}
${finalCta(c.ctaH2, c.ctaP, c.msg)}`;
  return {
    path: c.path, title: c.title, description: c.description, image: OG(c.og), body,
    get graph() { return [org(), website(), webpage(c.path, c.title.replace(/ \| Roque.*$/, ''), 'WebPage', { mainEntity: { '@id': pageUrl(c.path) + '#service' } }), service(c.path, c.serviceName, c.serviceType, c.serviceDescription), crumbLd(crumb), f.ld]; },
  };
}

const ia = servicePage({
  path: '/agencia-de-ia/', og: 'agencia-de-ia', crumbName: 'Agência de IA',
  title: 'Agência de IA: Agentes de IA e Automação | Roque',
  description: 'Agência de IA da Roque Business Evolution: agentes de inteligência artificial, atendimento no WhatsApp e automação de processos para a sua empresa.',
  h1: 'Agência de IA que coloca agentes de inteligência artificial para trabalhar na sua empresa',
  lead: 'Uma agência de IA projeta, implanta e acompanha agentes de inteligência artificial que atendem clientes e executam tarefas dentro das regras que a sua empresa define. A Roque Business Evolution faz isso com atendimento no WhatsApp, automação de processos e integração com os seus sistemas.',
  msg: 'Olá! Quero conversar com a agência de IA da Roque Business Evolution.',
  serviceName: 'Agência de IA: agentes de inteligência artificial e automação', serviceType: 'Agência de inteligência artificial',
  serviceDescription: 'Projeto, implantação e acompanhamento de agentes de inteligência artificial, atendimento automatizado e automação de processos empresariais.',
  sections: [
    { id: 'o-que-entrega', h2: 'O que uma agência de IA entrega para a sua empresa', html: `<p class="read">Uma agência de IA entrega agentes e automações que trabalham dentro dos sistemas e das regras da sua empresa, com limites e permissões definidos.</p>${li([
      '<b>Atendimento automatizado</b> por WhatsApp e webchat.',
      '<b>Qualificação e classificação de leads</b> e assistentes comerciais.',
      '<b>Agentes de suporte, pós-venda e onboarding.</b>',
      '<b>Agentes de agendamento e confirmação</b> de compromissos.',
      '<b>Consulta a bases de conhecimento</b> da própria empresa.',
      '<b>Integração</b> com CRMs, agendas, bancos de dados e APIs.',
    ])}` },
    { id: 'agentes-whatsapp', h2: 'Agentes de IA para atendimento no WhatsApp e no site', html: `<p class="read">Agentes de IA podem atender clientes no WhatsApp e no webchat, responder dúvidas frequentes e encaminhar a conversa para uma pessoa quando for preciso.</p><p class="read">Para quem quer começar por aqui, a Roque Business Evolution tem o <a href="/engagebot/">EngageBot</a>, atendimento com inteligência artificial no WhatsApp e no site.</p>${li([
      'Recuperação de contatos e acompanhamento comercial.',
      'Encaminhamento para atendentes humanos.',
      'Memória de conversa e recuperação de informações do contexto.',
      'Monitoramento de qualidade, erros, custos e desempenho.',
    ])}` },
    { id: 'automacao', h2: 'Automação de processos com IA: menos tarefa repetitiva', html: `<p class="read">A automação de processos com IA conecta formulários, CRM, agenda e sistemas administrativos para reduzir tarefas repetitivas e dar mais velocidade à operação.</p>${cols([
      'Mapeamento de processos automatizáveis.', 'Fluxos de trabalho entre áreas e ferramentas.', 'Notificações, alertas e lembretes.', 'Propostas e documentos automáticos.',
      'Relatórios periódicos automáticos.', 'Filas, tratamento de falhas e registro de execução.',
    ])}<p class="note">Toda automação prevê tratamento de exceções e a participação de uma pessoa quando necessário, principalmente em operações financeiras, dados sensíveis ou decisões de maior impacto.</p>` },
    { id: 'como-trabalha', h2: 'Como a agência de IA conduz um projeto', html: `<p class="read">Cada projeto começa pelo diagnóstico do negócio e segue etapas curtas, com testes antes de entrar em produção.</p>${steps([
      ['Diagnóstico', 'Entendemos o negócio, os canais de atendimento, os sistemas e os principais gargalos.'],
      ['Arquitetura da solução', 'Definimos escopo, integrações, permissões, indicadores e critérios de aceite.'],
      ['Implementação e testes', 'Construímos o agente ou a automação e testamos qualidade, segurança e comportamento.'],
      ['Publicação e operação', 'Colocamos em produção, acompanhamos o início e capacitamos a equipe.'],
      ['Mensuração e evolução', 'Acompanhamos indicadores como resolução, encaminhamento para pessoas, erros e custo por interação.'],
    ])}<p class="read">O desenho final depende dos canais disponíveis, da infraestrutura, da qualidade dos dados, das permissões de integração e dos requisitos de privacidade.</p>` },
  ],
  faq: [
    { q: 'O que faz uma agência de IA?', a: '<p>Uma agência de IA projeta, implanta e acompanha agentes de inteligência artificial e automações que executam tarefas de atendimento, vendas e operação dentro das regras da empresa.</p>' },
    { q: 'Um agente de IA substitui a minha equipe?', a: '<p>Não. O agente cuida das tarefas repetitivas e das dúvidas frequentes, e a conversa é encaminhada para uma pessoa quando o caso pede atenção humana.</p>' },
    { q: 'A agência de IA atende pelo WhatsApp?', a: '<p>Sim. O atendimento automatizado pode funcionar no WhatsApp e no webchat. Conheça o <a href="/engagebot/">EngageBot</a>, atendimento com IA da Roque Business Evolution.</p>' },
    { q: 'É seguro usar IA com os dados dos meus clientes?', a: '<p>Depende de como o projeto é desenhado. Definimos permissões, limites de execução, controle de acesso e regras de aprovação humana, e orientamos sobre proteção de dados e LGPD conforme o escopo. Veja a página de <a href="/transformacao-digital/">transformação digital</a>.</p>' },
    { q: 'Quanto custa contratar uma agência de IA?', a: '<p>Depende do escopo. A proposta separa implantação, mensalidade, ferramentas de terceiros e suporte. Fale pelo WhatsApp para receber um diagnóstico do seu caso.</p>' },
  ],
  related: [['/engagebot/', 'EngageBot'], ['/desenvolvimento-de-software/', 'Desenvolvimento de software'], ['/transformacao-digital/', 'Transformação digital'], ['/seo/', 'SEO e busca com IA']],
  ctaH2: 'Vamos conversar sobre a agência de IA para a sua empresa', ctaP: 'Conte o que você quer automatizar ou melhorar no atendimento. A Roque Business Evolution responde pelo WhatsApp.',
});

const sites = servicePage({
  path: '/criacao-de-sites/', og: 'criacao-de-sites', crumbName: 'Criação de sites',
  title: 'Criação de Sites Profissionais com SEO | Roque',
  description: 'Criação de sites profissionais com SEO, design responsivo e foco em conversão. A Roque Business Evolution cria o site da sua empresa.',
  h1: 'Criação de sites profissionais que aparecem no Google e trazem clientes',
  lead: 'A criação de sites profissionais da Roque Business Evolution une design, conteúdo estratégico, SEO e conversão para que o site da sua empresa seja encontrado e transforme visitantes em contatos.',
  msg: 'Olá! Quero conversar sobre a criação do site da minha empresa.',
  serviceName: 'Criação de sites profissionais com SEO', serviceType: 'Criação de sites',
  serviceDescription: 'Planejamento, design, desenvolvimento e otimização de sites institucionais, landing pages, blogs e lojas virtuais com SEO e foco em conversão.',
  sections: [
    { id: 'tipos', h2: 'Que tipo de site profissional a Roque Business Evolution cria', html: `<p class="read">A Roque Business Evolution cria sites institucionais, landing pages, blogs e catálogos digitais para empresas e prestadores de serviço.</p>${cols([
      'Sites institucionais e para empresas.', 'Landing pages para campanhas e ofertas.', 'Sites para prestadores de serviços e negócios locais.', 'Páginas de produtos, serviços e soluções B2B.',
      'Blogs e portais de conteúdo.', 'Catálogos digitais e páginas de apresentação comercial.', 'Lojas virtuais, conforme o escopo.', 'Reformulação de sites existentes.',
    ])}` },
    { id: 'seo-desde-o-inicio', h2: 'Criação de sites com SEO desde o primeiro dia', html: `<p class="read">Um site com SEO nasce com estrutura, conteúdo e desempenho pensados para o Google e para as buscas com IA, e não recebe isso como remendo depois.</p>${li([
      '<b>Conteúdo no HTML.</b> O texto principal fica no código da página, sem depender de JavaScript para ser lido.',
      '<b>URLs, títulos e descrições</b> próprios para cada página e links internos organizados.',
      '<b>Sitemap, robots.txt e dados estruturados</b> compatíveis com o conteúdo visível.',
      '<b>Velocidade, acessibilidade e experiência no celular</b> medidas e otimizadas.',
      '<b>Design responsivo</b> para computador, tablet e celular, com UX/UI e arquitetura da informação.',
    ])}<p class="read">Saiba mais sobre o trabalho de <a href="/seo/">SEO e busca com IA</a>.</p>` },
    { id: 'integracoes', h2: 'Site profissional integrado a WhatsApp, CRM e agendamento', html: `<p class="read">O site profissional se conecta às ferramentas que a empresa já usa, para que cada visita possa virar uma conversa.</p>${li([
      'Integração com WhatsApp, formulários, CRM e ferramentas de marketing.',
      'Integração com sistemas de agendamento, pagamentos e outras APIs.',
      'Configuração de domínio, hospedagem, SSL e ambientes de publicação.',
      'Ferramentas de análise e mensuração de conversões.',
      'Copywriting para páginas institucionais e comerciais.',
    ])}` },
    { id: 'manutencao', h2: 'Manutenção e evolução do seu site profissional', html: `<p class="read">Depois da publicação, o site continua evoluindo com manutenção, atualização de conteúdo e melhorias guiadas pelos números.</p>${li(['Manutenção e atualização de sites.', 'Acompanhamento de desempenho e conversões.', 'Evolução de páginas e conteúdos conforme os dados.'])}` },
  ],
  faq: [
    { q: 'O que é um site profissional?', a: '<p>É um site planejado para apresentar a empresa com clareza, funcionar bem no celular, carregar rápido, ser encontrado nas buscas e levar o visitante a entrar em contato.</p>' },
    { q: 'O site criado já fica pronto para aparecer no Google?', a: '<p>O site é entregue com a base técnica de SEO bem feita. A posição nas buscas depende de mercado, concorrência e conteúdo, e por isso não prometemos um lugar específico no Google.</p>' },
    { q: 'Vocês criam landing pages e lojas virtuais?', a: '<p>Sim, landing pages para campanhas e lojas virtuais, conforme o escopo combinado.</p>' },
    { q: 'Vocês cuidam de domínio, hospedagem e SSL?', a: '<p>Sim. A configuração de domínio, hospedagem, SSL e ambientes de publicação faz parte do serviço.</p>' },
    { q: 'Dá para integrar o site ao WhatsApp?', a: '<p>Dá. O site pode levar direto para uma conversa no WhatsApp e se integrar a formulários, CRM e sistemas de agendamento.</p>' },
  ],
  related: [['/seo/', 'SEO e busca com IA'], ['/agencia-de-ia/', 'Agência de IA'], ['/desenvolvimento-de-software/', 'Desenvolvimento de software'], ['/servicos/', 'Todos os serviços']],
  ctaH2: 'Vamos criar o site profissional da sua empresa', ctaP: 'Conte o que a sua empresa faz e o que o site precisa entregar. A Roque Business Evolution responde pelo WhatsApp.',
});

const seo = servicePage({
  path: '/seo/', og: 'seo', crumbName: 'SEO e busca com IA',
  title: 'SEO e Busca com IA (GEO/AEO) | Roque Business Evolution',
  description: 'Agência de SEO: pesquisa de palavras-chave, SEO técnico, conteúdo e GEO/AEO para a sua empresa ser encontrada no Google e nas buscas com IA.',
  h1: 'SEO para sua empresa ser encontrada no Google e nas buscas com IA',
  lead: 'Uma agência de SEO trabalha para que a sua empresa apareça nas buscas certas, com pesquisa de palavras-chave, SEO técnico, conteúdo e organização das informações para buscas com inteligência artificial. A Roque Business Evolution faz esse trabalho com método e sem prometer posição.',
  msg: 'Olá! Quero conversar sobre SEO para a minha empresa.',
  serviceName: 'SEO e busca com IA (GEO e AEO)', serviceType: 'Agência de SEO',
  serviceDescription: 'SEO técnico, on-page, off-page e local, pesquisa de palavras-chave, conteúdo e otimização para buscas com inteligência artificial (GEO e AEO).',
  sections: [
    { id: 'seo-tecnico', h2: 'SEO técnico, on-page, off-page e local', html: `<p class="read">O SEO reúne quatro frentes: técnica, conteúdo da página, autoridade e presença local.</p><div class="group"><h3>SEO técnico</h3>${cols(['Auditoria de rastreamento e indexação.', 'Arquitetura do site e links internos.', 'Sitemap.xml e robots.txt.', 'URLs, títulos e metadescrições.', 'Desempenho, experiência no celular e Core Web Vitals.', 'Dados estruturados validados.', 'Páginas duplicadas, erros e problemas técnicos.', 'Configuração e análise do Google Search Console.'])}</div><div class="group"><h3>SEO on-page, off-page e local</h3>${cols(['Otimização de páginas de serviços e produtos.', 'Títulos, subtítulos e conteúdo na intenção de busca.', 'Imagens, textos alternativos e links internos.', 'Análise de backlinks e referências legítimas.', 'Perfil da Empresa no Google e buscas por proximidade.', 'Páginas por serviço e por região atendida.'])}</div>` },
    { id: 'palavras-chave', h2: 'Pesquisa de palavras-chave e intenção de busca', html: `<p class="read">A pesquisa de palavras-chave descobre o que o público procura, por que procura e em que etapa da decisão está, e não apenas quais termos têm mais volume.</p>${steps([
      ['Mercado e concorrência', 'Quem aparece nas buscas, que páginas vencem e onde há lacunas.'],
      ['Palavras-chave', 'Termos principais e secundários, cauda longa, variações e perguntas reais.'],
      ['Intenção de busca', 'Cada grupo de termos associado à intenção: informacional, comercial, transacional ou navegacional.'],
      ['Contexto semântico', 'Assuntos centrais, subtemas e páginas pilares para construir autoridade.'],
      ['Mapa de palavras-chave por página', 'Cada página com uma finalidade e uma intenção, sem páginas disputando a mesma busca.'],
      ['Monitoramento', 'Impressões, cliques, posições e conversões que vêm da busca.'],
    ])}` },
    { id: 'geo-aeo', h2: 'GEO e AEO: SEO para buscas com inteligência artificial', html: `<p class="read">GEO (Generative Engine Optimization) e AEO (Answer Engine Optimization) são formas de tornar as informações da empresa claras, consistentes e fáceis de entender para buscas tradicionais e para respostas geradas por IA.</p>${li([
      'Páginas que respondem a perguntas específicas sobre serviços, diferenciais e aplicações.',
      'Perguntas frequentes quando realmente úteis, com dados estruturados iguais ao texto visível.',
      'Consistência entre site, perfis da empresa e fontes relevantes.',
      'Conteúdo original, especializado e fundamentado.',
    ])}<p class="note">Seguimos as orientações oficiais de SEO do Google. Não prometemos inclusão em respostas de IA nem vendemos atalho para ser citado: elegibilidade, exibição e frequência dependem de sistemas externos que a agência não controla.</p>` },
    { id: 'conteudo-autoridade', h2: 'Conteúdo e autoridade para a sua agência de SEO sustentar resultado', html: `<p class="read">Conteúdo útil e original atrai o público certo e sustenta o SEO ao longo do tempo.</p>${li(['Estratégia editorial baseada em pesquisa de mercado e calendário de conteúdo.', 'Artigos, guias e páginas de serviços.', 'Atualização de conteúdos existentes.', 'Revisão editorial e verificação factual de textos assistidos por IA.'])}<p class="read">Os resultados dependem de mercado, concorrência, investimento e execução. Os indicadores acompanhados são impressões, cliques, consultas, páginas indexadas e conversões orgânicas.</p>` },
  ],
  faq: [
    { q: 'O que é SEO?', a: '<p>SEO é o conjunto de ações que ajuda o seu site a ser encontrado nos mecanismos de busca, como o Google, por pessoas com intenção relevante para o seu negócio.</p>' },
    { q: 'O que são GEO e AEO?', a: '<p>GEO é a otimização para mecanismos de resposta generativos, e AEO é a otimização para mecanismos de resposta. Ambos complementam o SEO e organizam a informação para buscas com IA.</p>' },
    { q: 'O SEO garante a primeira posição no Google?', a: '<p>Não. Ninguém pode garantir posição. O trabalho aumenta as chances com base técnica, conteúdo e autoridade, e acompanha os resultados com indicadores.</p>' },
    { q: 'A Roque Business Evolution garante que a minha empresa aparece no ChatGPT ou em respostas de IA?', a: '<p>Não. Organizamos as informações para serem claras e verificáveis, mas a exibição em respostas de IA depende de sistemas externos.</p>' },
    { q: 'O site precisa estar bem feito para o SEO funcionar?', a: '<p>Ajuda muito. Por isso a <a href="/criacao-de-sites/">criação de sites</a> da Roque Business Evolution já nasce com SEO técnico e conteúdo no HTML.</p>' },
  ],
  related: [['/criacao-de-sites/', 'Criação de sites'], ['/agencia-de-ia/', 'Agência de IA'], ['/servicos/', 'Todos os serviços'], ['/sobre/', 'Sobre a Roque Business Evolution']],
  ctaH2: 'Vamos fazer a sua empresa ser encontrada', ctaP: 'Conte o que a sua empresa vende e onde seus clientes procuram. A Roque Business Evolution responde pelo WhatsApp.',
});

const soft = servicePage({
  path: '/desenvolvimento-de-software/', og: 'desenvolvimento-de-software', crumbName: 'Desenvolvimento de software',
  title: 'Desenvolvimento de Software Sob Medida | Roque',
  description: 'Desenvolvimento de software sob medida: aplicações web, MVPs, dashboards e integrações. A Roque Business Evolution leva sua ideia do MVP à produção.',
  h1: 'Desenvolvimento de software sob medida, do MVP ao sistema em produção',
  lead: 'O desenvolvimento de software sob medida da Roque Business Evolution cria aplicações web, MVPs, dashboards e integrações para resolver problemas específicos do seu negócio, do protótipo ao sistema em produção.',
  msg: 'Olá! Quero conversar sobre desenvolvimento de software para a minha empresa.',
  serviceName: 'Desenvolvimento de software sob medida', serviceType: 'Desenvolvimento de software',
  serviceDescription: 'Aplicações web, MVPs, portais, dashboards, integrações com APIs e sistemas legados, com testes, documentação, implantação e evolução.',
  sections: [
    { id: 'o-que-desenvolvemos', h2: 'O que o desenvolvimento de software sob medida entrega', html: `<p class="read">O desenvolvimento de software sob medida entrega um sistema desenhado para a rotina da empresa, e não uma ferramenta genérica adaptada.</p>${cols(['Aplicações web.', 'Protótipos e MVPs.', 'Portais de clientes e áreas administrativas.', 'Dashboards e aplicações operacionais.', 'Módulos e funcionalidades específicas.', 'Integração de modelos de linguagem e serviços de IA.', 'Bases de conhecimento para agentes de IA.', 'Plataformas SaaS e sistemas multiempresa.'])}<p class="read">Para plataformas multiempresa, veja a página de <a href="/saas/">desenvolvimento de SaaS</a>.</p>` },
    { id: 'integracoes', h2: 'Integrações de sistemas, APIs e sistemas legados', html: `<p class="read">Integrações ligam o sistema novo ao que a empresa já usa, para que os dados andem juntos.</p>${li(['Integração com APIs de terceiros.', 'Integração de sistemas legados.', 'Autenticação, autorização e segregação de dados entre empresas.', 'Dashboards e indicadores sobre dados operacionais e comerciais.'])}` },
    { id: 'como-desenvolvemos', h2: 'Como o desenvolvimento de software sob medida acontece', html: `<p class="read">O projeto segue etapas claras, com validação a cada entrega.</p>${steps([
      ['Escopo e arquitetura', 'Definimos requisitos, tecnologias, integrações, responsabilidades e critérios de aceite.'],
      ['Prototipação e MVP', 'Validamos a ideia cedo, com a menor versão que já gera valor.'],
      ['Desenvolvimento e testes', 'Construímos e testamos funcionalidades, segurança e desempenho.'],
      ['Implantação e documentação', 'Colocamos em produção, com documentação técnica e capacitação.'],
      ['Monitoramento e evolução', 'Acompanhamos, corrigimos e evoluímos o software depois da entrada em produção.'],
    ])}<p class="note">Escopo, propriedade intelectual, infraestrutura, suporte, manutenção e níveis de serviço são formalizados em cada contrato.</p>` },
    { id: 'produtos-proprios', h2: 'Software que a Roque Business Evolution também opera', html: `<p class="read">A Roque Business Evolution desenvolve e opera os próprios produtos: o <a href="https://aurorapremium.com/">Aurora Premium</a>, sistema de agendamento e gestão, e o <a href="/engagebot/">EngageBot</a>, atendimento com IA. Eles mostram o tipo de plataforma que a equipe sabe construir e manter.</p>` },
  ],
  faq: [
    { q: 'O que é desenvolvimento de software sob medida?', a: '<p>É criar um sistema pensado para o processo e para os dados de uma empresa específica, em vez de adaptar uma ferramenta pronta.</p>' },
    { q: 'O que é um MVP?', a: '<p>MVP é a menor versão de um produto que já permite testar a ideia com usuários reais. Ele reduz risco e investimento antes de construir o sistema completo.</p>' },
    { q: 'Vocês integram com sistemas que já uso?', a: '<p>Sim, por APIs de terceiros e também com sistemas legados, conforme a viabilidade técnica de cada caso.</p>' },
    { q: 'De quem é o software desenvolvido?', a: '<p>Escopo, propriedade intelectual, infraestrutura e suporte são definidos em contrato, projeto a projeto.</p>' },
    { q: 'O software pode usar inteligência artificial?', a: '<p>Pode. Integramos modelos de linguagem e serviços de IA aos sistemas, com controles de acesso e regras de aprovação humana. Veja a <a href="/agencia-de-ia/">agência de IA</a>.</p>' },
  ],
  related: [['/saas/', 'SaaS e plataformas'], ['/agencia-de-ia/', 'Agência de IA'], ['/transformacao-digital/', 'Transformação digital'], ['/servicos/', 'Todos os serviços']],
  ctaH2: 'Vamos desenhar o software da sua empresa', ctaP: 'Conte o problema que você quer resolver. A Roque Business Evolution responde pelo WhatsApp.',
});

const saas = servicePage({
  path: '/saas/', og: 'saas', crumbName: 'SaaS e plataformas',
  title: 'Desenvolvimento de SaaS e Plataformas | Roque',
  description: 'Desenvolvimento de SaaS: a Roque Business Evolution cria e opera plataformas multiempresa, como o Aurora Premium e o EngageBot.',
  h1: 'Desenvolvimento de SaaS: plataformas que a Roque cria e opera',
  lead: 'O desenvolvimento de SaaS da Roque Business Evolution cria plataformas multiempresa, em que várias empresas usam o mesmo sistema com os dados separados. A Roque também opera os próprios produtos, como o Aurora Premium e o EngageBot.',
  msg: 'Olá! Quero conversar sobre desenvolvimento de uma plataforma SaaS.',
  serviceName: 'Desenvolvimento de SaaS e plataformas multiempresa', serviceType: 'Desenvolvimento de SaaS',
  serviceDescription: 'Plataformas SaaS e sistemas multiempresa com autenticação, autorização, segregação de dados, integrações e evolução contínua.',
  sections: [
    { id: 'o-que-e-saas', h2: 'O que é desenvolvimento de SaaS e plataforma multiempresa', html: `<p class="read">SaaS (software como serviço) é um sistema usado pela internet, em que cada empresa cliente acessa a sua conta sem instalar nada. Em uma plataforma multiempresa, os dados de cada cliente ficam separados dos demais.</p>${li(['Contas de empresas com dados segregados.', 'Autenticação e autorização por perfil de usuário.', 'Portais de clientes e áreas administrativas.', 'Integração com APIs de terceiros.', 'Dashboards para o cliente e para quem opera a plataforma.'])}` },
    { id: 'produtos', h2: 'Plataformas SaaS que a Roque Business Evolution cria e opera', html: `${li(['<b><a href="https://aurorapremium.com/">Aurora Premium</a>.</b> Sistema de agendamento e gestão para salões, barbearias, clínicas, spas e pet shops, lançado em 2025.', '<b><a href="/engagebot/">EngageBot</a>.</b> Atendimento com inteligência artificial no WhatsApp e no site.'])}<p class="read">Operar os próprios produtos dá à equipe a experiência de manter uma plataforma no ar, corrigir, medir e evoluir.</p>` },
    { id: 'como-comecar', h2: 'Como começar o desenvolvimento de uma plataforma SaaS', html: `<p class="read">A forma mais segura de começar um SaaS é validar a ideia com um MVP e crescer por etapas.</p>${steps([['Diagnóstico', 'Entendemos o problema, o público e o modelo de negócio.'], ['MVP', 'Construímos a primeira versão para validar com clientes reais.'], ['Evolução', 'Adicionamos recursos e integrações conforme os dados de uso.'], ['Operação', 'Monitoramos, corrigimos e damos suporte conforme o contrato.']])}` },
  ],
  faq: [
    { q: 'O que é SaaS?', a: '<p>SaaS é a sigla em inglês para software como serviço: um sistema que o cliente usa pela internet, sem instalar, normalmente por assinatura.</p>' },
    { q: 'O que é um sistema multiempresa?', a: '<p>É uma plataforma única usada por várias empresas, com os dados de cada uma separados e protegidos dos demais.</p>' },
    { q: 'A Roque Business Evolution já criou plataformas SaaS?', a: '<p>Sim. Desenvolve e opera o <a href="https://aurorapremium.com/">Aurora Premium</a> e o <a href="/engagebot/">EngageBot</a>.</p>' },
    { q: 'Posso começar com um MVP?', a: '<p>Sim. Começar por um MVP reduz risco e investimento e permite validar a ideia antes de crescer.</p>' },
  ],
  related: [['/desenvolvimento-de-software/', 'Desenvolvimento de software'], ['/engagebot/', 'EngageBot'], ['/agencia-de-ia/', 'Agência de IA'], ['/servicos/', 'Todos os serviços']],
  ctaH2: 'Vamos desenvolver a sua plataforma SaaS', ctaP: 'Conte a ideia e o público. A Roque Business Evolution responde pelo WhatsApp.',
});

const transf = servicePage({
  path: '/transformacao-digital/', og: 'transformacao-digital', crumbName: 'Transformação digital',
  title: 'Consultoria de Transformação Digital e IA | Roque',
  description: 'Consultoria de transformação digital: diagnóstico, PMO, governança de IA e capacitação para modernizar processos da sua empresa com segurança.',
  h1: 'Consultoria de transformação digital para modernizar processos e adotar IA com segurança',
  lead: 'A consultoria de transformação digital da Roque Business Evolution faz o diagnóstico da empresa, define prioridades e conduz a modernização de processos e a adoção de inteligência artificial com governança, segurança e capacitação das equipes.',
  msg: 'Olá! Quero conversar sobre transformação digital na minha empresa.',
  serviceName: 'Consultoria de transformação digital e IA', serviceType: 'Consultoria de transformação digital',
  serviceDescription: 'Diagnóstico de maturidade digital e de IA, planejamento, PMO, governança, segurança e capacitação de equipes.',
  sections: [
    { id: 'diagnostico', h2: 'Consultoria de transformação digital: do diagnóstico ao plano', html: `<p class="read">A consultoria de transformação digital começa entendendo como a empresa funciona hoje e onde há ganho possível.</p>${li(['Diagnóstico de maturidade digital e de IA.', 'Mapeamento de processos e identificação de gargalos.', 'Oportunidades de automação e avaliação de viabilidade técnica, operacional e financeira.', 'Definição de prioridades, indicadores e metas.', 'Seleção de tecnologias e ferramentas.', 'Roadmap de implementação e evolução tecnológica.'])}<p class="read">Entregáveis possíveis, conforme o escopo: diagnóstico, mapa de oportunidades, plano de ação, arquitetura de referência e indicadores de acompanhamento.</p>` },
    { id: 'governanca-pmo', h2: 'Governança, PMO e gestão de projetos na transformação digital', html: `<p class="read">Transformação digital precisa de governança para sair do papel: prioridades claras, responsáveis, prazos e indicadores.</p><p class="read">É uma área que a fundadora, <a href="https://viviroque.com.br/">Viviane Roque</a>, conhece de perto: trabalha com tecnologia e gestão de operações desde 1998 e atuou no PMO de projetos de grande porte.</p>` },
    { id: 'ia-segura', h2: 'Adoção responsável de IA: governança, segurança e confiabilidade', html: `<p class="read">Adotar IA com segurança significa definir quem pode fazer o quê, o que a IA pode executar sozinha e quando uma pessoa precisa aprovar.</p>${cols(['Avaliação de riscos de aplicações de IA.', 'Permissões e limites de execução.', 'Controle de acesso e separação de dados.', 'Proteção de credenciais e segredos.', 'Registro de operações e trilhas de auditoria.', 'Testes de qualidade e avaliação de respostas incorretas.', 'Regras de aprovação humana.', 'Orientação de proteção de dados e LGPD, conforme o escopo.'])}<p class="note">Os serviços não substituem auditoria independente, assessoria jurídica ou certificações especializadas quando exigidas.</p>` },
    { id: 'capacitacao', h2: 'Capacitação em IA e transformação digital para as equipes', html: `<p class="read">A tecnologia só rende quando as pessoas sabem usá-la no dia a dia.</p>${li(['Treinamento prático em ferramentas de IA e engenharia de prompts.', 'Casos de uso por departamento.', 'Oficinas de automação de tarefas.', 'Políticas internas de uso de IA e orientações de privacidade e segurança.', 'Acompanhamento da adoção e da produtividade.'])}` },
  ],
  faq: [
    { q: 'O que é transformação digital?', a: '<p>É modernizar processos, sistemas e a forma de trabalhar com tecnologia para a empresa operar melhor, atender melhor e decidir com mais dados.</p>' },
    { q: 'Por onde começar a transformação digital da minha empresa?', a: '<p>Pelo diagnóstico: entender os processos, os gargalos e as prioridades. A partir dele nasce um plano com indicadores e um roteiro de implementação.</p>' },
    { q: 'Como adotar inteligência artificial com segurança?', a: '<p>Com governança: permissões, limites de execução, controle de acesso, registro das operações e aprovação humana nas decisões de maior impacto.</p>' },
    { q: 'A consultoria também implementa as mudanças?', a: '<p>Conforme o escopo. A Roque Business Evolution também desenvolve <a href="/desenvolvimento-de-software/">software</a>, automações e <a href="/agencia-de-ia/">agentes de IA</a>.</p>' },
    { q: 'Vocês treinam as equipes?', a: '<p>Sim. A capacitação em IA e em novos processos é uma das frentes da consultoria.</p>' },
  ],
  related: [['/agencia-de-ia/', 'Agência de IA'], ['/desenvolvimento-de-software/', 'Desenvolvimento de software'], ['/servicos/', 'Todos os serviços'], ['/sobre/', 'Sobre a Roque Business Evolution']],
  ctaH2: 'Vamos conversar sobre a transformação digital da sua empresa', ctaP: 'Conte onde sua operação trava hoje. A Roque Business Evolution responde pelo WhatsApp.',
});

// ================================================================== ENGAGEBOT
const engFaq = faq([
  { q: 'O que é o EngageBot?', a: '<p>O EngageBot é um produto da Roque Business Evolution para atendimento com inteligência artificial no WhatsApp e no site da empresa.</p>' },
  { q: 'O EngageBot responde sozinho?', a: '<p>Sim, com resposta automática que identifica a intenção da mensagem. As conversas ficam em uma caixa de conversas, onde a equipe acompanha o atendimento.</p>' },
  { q: 'De onde o agente aprende sobre a minha empresa?', a: '<p>Do site da empresa, de PDFs, documentos e do FAQ. Assim as respostas falam do seu negócio e não são genéricas.</p>' },
  { q: 'O EngageBot funciona junto com o Aurora Premium?', a: '<p>São produtos complementares da mesma empresa. O lembrete de agendamento já vem incluído no <a href="https://aurorapremium.com/">Aurora Premium</a>, e o EngageBot é o atendimento com IA, para conversar com o cliente.</p>' },
  { q: 'Quanto custa o EngageBot?', a: '<p>Fale pelo WhatsApp para receber as condições atuais.</p>' },
], { pagePath: '/engagebot/' });
const engCrumb = [{ name: 'Início', path: '/' }, { name: 'EngageBot', path: '/engagebot/' }];
const engage = {
  path: '/engagebot/', og: 'engagebot',
  title: 'EngageBot: Atendimento com IA no WhatsApp | Roque',
  description: 'EngageBot: atendimento com inteligência artificial no WhatsApp e no site da sua empresa, com caixa de conversas e agente treinado com o seu conteúdo.',
  body: `<!-- REVISAR: aguardando a Viviane confirmar o que está no ar. Só a fase 1 do blueprint entra no texto (atendimento por WhatsApp e webchat, caixa de conversas, resposta automática com detecção de intenção, agente que aprende com o site e documentos, ativação guiada). Fase 2 (agendamentos, captura de leads e orçamentos) e fase 3 (inteligência de negócios) ficam de fora até a confirmação. Sem preço e sem promessa de tempo de ativação. -->
${hero(engCrumb, 'EngageBot: atendimento com inteligência artificial no WhatsApp e no site', 'O EngageBot é o atendimento com inteligência artificial da Roque Business Evolution: responde seus clientes no WhatsApp e no site, aprende com o conteúdo da sua empresa e organiza as conversas em um só lugar.', `<div class="btns">${btn('Falar no WhatsApp', 'Olá! Quero conhecer o EngageBot.')}</div>`)}
${sec('white', 'o-que-faz', 'O que o EngageBot faz no atendimento com IA', `<p class="read">O EngageBot atende clientes por WhatsApp e webchat, entende o que a pessoa quer e responde na hora, com o que a sua empresa já sabe.</p>${li([
  '<b>Atendimento por WhatsApp e webchat.</b> O mesmo agente atende nos dois canais.',
  '<b>Caixa de conversas.</b> Todas as conversas ficam em um só lugar, para a equipe acompanhar.',
  '<b>Resposta automática com detecção de intenção.</b> O agente identifica o que o cliente precisa antes de responder.',
  '<b>Agente que aprende com a sua empresa.</b> Ele estuda o seu site, PDFs, documentos e o FAQ.',
  '<b>Ativação guiada.</b> A configuração acontece passo a passo.',
])}`)}
${sec('mist', 'como-aprende', 'Como o agente de atendimento aprende o seu negócio', `<p class="read">O agente aprende com o que a sua empresa já publica e escreve, para responder de forma coerente com o seu negócio.</p>${steps([['Site da empresa', 'O agente lê as páginas do seu site.'], ['PDFs e documentos', 'Catálogos, tabelas e manuais entram na base de conhecimento.'], ['FAQ', 'Suas respostas frequentes viram respostas do agente.']])}`)}
${sec('white', 'com-aurora', 'EngageBot e Aurora Premium: produtos que se complementam', `<p class="read">O EngageBot e o <a href="https://aurorapremium.com/">Aurora Premium</a> nascem da mesma empresa e cobrem partes diferentes do relacionamento com o cliente.</p>${li(['<b>Aurora Premium.</b> Sistema de agendamento e gestão para salões, barbearias, clínicas, spas e pet shops. O lembrete de agendamento já vem incluído.', '<b>EngageBot.</b> O atendimento com IA para conversar com o cliente no WhatsApp e no site.'])}`)}
${engFaq.html.replace('class="sec paper"', 'class="sec mist"')}
${finalCta('Vamos colocar o EngageBot para atender os seus clientes', 'Conte como é o seu atendimento hoje. A Roque Business Evolution responde pelo WhatsApp.', 'Olá! Quero conhecer o EngageBot.')}`,
  get graph() {
    return [org(), website(), webpage('/engagebot/', 'EngageBot', 'WebPage', { mainEntity: { '@id': ENGAGE_ID } }),
      { '@type': 'SoftwareApplication', '@id': ENGAGE_ID, name: 'EngageBot', applicationCategory: 'BusinessApplication', operatingSystem: 'Web', url: pageUrl('/engagebot/'), description: 'Atendimento com inteligência artificial no WhatsApp e no site, com caixa de conversas e agente que aprende com o conteúdo da empresa.', publisher: { '@id': ORG_ID }, creator: { '@id': ORG_ID }, inLanguage: 'pt-BR' },
      crumbLd(engCrumb), engFaq.ld];
  },
};

// ================================================================== SERVIÇOS (índice dos 17)
const GRUPOS = [
  ['Estratégia e transformação', [
    ['Consultoria estratégica e transformação digital', 'Diagnóstico e planejamento para modernizar processos e incorporar IA de forma estruturada.', '/transformacao-digital/'],
    ['Capacitação, treinamento e adoção de IA', 'Preparação de equipes para usar IA de maneira produtiva e responsável.', '/transformacao-digital/#capacitacao'],
    ['Segurança, governança e confiabilidade de IA', 'Permissões, limites, trilhas de auditoria e regras de aprovação humana.', '/transformacao-digital/#ia-segura'],
    ['Consultoria, suporte e evolução contínua', 'Acompanhamento das soluções para que sigam úteis, estáveis e alinhadas aos objetivos.'],
  ]],
  ['Presença digital e visibilidade', [
    ['Criação de sites, landing pages e presença digital', 'Sites e páginas que unem identidade, experiência, SEO e conversão.', '/criacao-de-sites/'],
    ['SEO: otimização para mecanismos de busca', 'SEO técnico, on-page, off-page e local.', '/seo/'],
    ['Pesquisa de palavras-chave e intenção de busca', 'Entender o que o público procura e mapear palavras-chave para páginas.', '/seo/#palavras-chave'],
    ['GEO, AEO e visibilidade em buscas com IA', 'Informação clara e consistente para buscas tradicionais e respostas de IA, sem promessa de citação.', '/seo/#geo-aeo'],
    ['Marketing de conteúdo e autoridade temática', 'Conteúdo original e útil para atrair o público certo.'],
    ['Branding, identidade digital e comunicação', 'Posicionamento, identidade visual e padronização da comunicação.'],
  ]],
  ['Aquisição, vendas e relacionamento', [
    ['Marketing digital, mídia paga e aquisição', 'Campanhas no Google Ads e na Meta Ads, funis e mensuração de conversões. Verbas de mídia ficam separadas dos honorários.'],
    ['CRM, vendas e inteligência comercial', 'Funil de vendas, CRM, qualificação de leads e automação de follow-ups.'],
    ['Reputação digital e relacionamento com clientes', 'Avaliações, feedback, fidelização e campanhas de reativação.'],
  ]],
  ['IA, automação, software e dados', [
    ['Agentes de IA e automação conversacional', 'Atendimento automatizado, assistentes comerciais e agentes de suporte.', '/agencia-de-ia/'],
    ['Automação de processos empresariais', 'Integração entre áreas e ferramentas para reduzir tarefas repetitivas.', '/agencia-de-ia/#automacao'],
    ['Desenvolvimento de software, SaaS e integrações', 'Aplicações web, MVPs, plataformas SaaS e integrações.', '/desenvolvimento-de-software/'],
    ['Dados, analytics e inteligência de negócios', 'Dashboards, indicadores e relatórios para decidir com dados.'],
  ]],
];
const servCrumb = [{ name: 'Início', path: '/' }, { name: 'Serviços', path: '/servicos/' }];
const servFaq = faq([
  { q: 'Quais serviços a Roque Business Evolution oferece?', a: '<p>Consultoria de transformação digital, criação de sites, SEO e busca com IA, agentes de IA e automação, desenvolvimento de software e SaaS, marketing, CRM, dados e capacitação em IA. Esta página reúne os 17 serviços.</p>' },
  { q: 'Todos os serviços têm página própria?', a: '<p>Os serviços prioritários têm página própria. Os demais aparecem nesta página e podem ser contratados conforme a capacidade e os parceiros de cada projeto.</p>' },
  { q: 'Como a Roque Business Evolution trabalha?', a: '<p>Em sete fases: diagnóstico, pesquisa e estratégia, arquitetura da solução, implementação, testes e validação, publicação e operação, e mensuração e evolução.</p>' },
  { q: 'Como são contratados os serviços?', a: '<p>Em projetos fechados, serviços recorrentes, consultoria especializada ou projetos híbridos de tecnologia e operação. A proposta discrimina implantação, mensalidade, ferramentas de terceiros, infraestrutura, mídia paga e suporte.</p>' },
  { q: 'A Roque Business Evolution garante resultados?', a: '<p>Não garantimos posições no Google, citações em IA nem resultados financeiros sem condições objetivas definidas em contrato. Os resultados dependem de mercado, concorrência, investimento, dados e execução.</p>' },
], { pagePath: '/servicos/' });
const FASES = [['Diagnóstico', 'Entender negócio, objetivos, público, processos e sistemas.'], ['Pesquisa e estratégia', 'Mercado, concorrência, palavras-chave e oportunidades.'], ['Arquitetura da solução', 'Escopo, tecnologias, integrações e critérios de aceite.'], ['Implementação', 'Desenvolvimento, configuração e produção de conteúdo.'], ['Testes e validação', 'Testes técnicos, revisão e aprovação do cliente.'], ['Publicação e operação', 'Entrada em produção, monitoramento e capacitação.'], ['Mensuração e evolução', 'Indicadores, desvios e melhorias priorizadas.']];
const servicos = {
  path: '/servicos/', og: 'servicos',
  title: 'Serviços de IA, Sites, SEO e Software | Roque',
  description: 'Os 17 serviços da Roque Business Evolution: agência de IA, criação de sites, SEO, software, CRM, dados, transformação digital e capacitação em IA.',
  body: `${hero(servCrumb, 'Serviços da Roque Business Evolution', 'A Roque Business Evolution reúne serviços de inteligência artificial, sites, SEO, software e estratégia, para que a empresa evolua com tecnologia que se conecta ao negócio.', `<div class="btns">${btn('Falar no WhatsApp', 'Olá! Quero conhecer os serviços da Roque Business Evolution.')}</div>`)}
<section class="sec white" id="lista" aria-labelledby="lista-h"><div class="wrap"><h2 id="lista-h">Serviços de IA, sites, SEO e software da Roque Business Evolution</h2><p class="read">Os serviços prioritários têm página própria; os demais estão descritos aqui.</p>
${GRUPOS.map(([g, items]) => `<div class="group"><h3>${esc(g)}</h3><ul class="facts">${items.map(([n, d, h]) => `<li><b>${h ? `<a href="${h}">${esc(n)}</a>` : esc(n)}.</b> ${esc(d)}</li>`).join('')}</ul></div>`).join('\n')}
</div></section>
<section class="sec mist" id="metodologia" aria-labelledby="met-h"><div class="wrap"><h2 id="met-h">Metodologia de trabalho da Roque Business Evolution</h2><p class="read">Todo projeto segue sete fases, para reduzir riscos, organizar investimentos e medir a evolução.</p>${steps(FASES)}</div></section>
${servFaq.html.replace('class="sec paper"', 'class="sec white"')}
${finalCta('Vamos conversar sobre os serviços que fazem sentido para você', 'Conte o seu momento e o que você quer melhorar. A Roque Business Evolution responde pelo WhatsApp.', 'Olá! Quero conhecer os serviços da Roque Business Evolution.')}`,
  get graph() { return [org(), website(), webpage('/servicos/', 'Serviços da Roque Business Evolution', 'CollectionPage'), crumbLd(servCrumb), servFaq.ld]; },
};

// ================================================================== SOBRE
const sobreCrumb = [{ name: 'Início', path: '/' }, { name: 'Sobre', path: '/sobre/' }];
const sobreFaq = faq([
  { q: 'Quem é a Roque Business Evolution?', a: '<p>A Roque Business Evolution é uma empresa de consultoria, tecnologia e transformação digital fundada por Viviane Roque. Seu nome empresarial é Roque Business Evolution Serviços Ltda.</p>' },
  { q: 'Quem fundou a Roque Business Evolution?', a: '<p>A fundadora é Viviane Roque, que trabalha com tecnologia e gestão de operações desde 1998. Conheça o <a href="https://viviroque.com.br/">site de Viviane Roque</a>.</p>' },
  { q: 'Quais são a missão e a visão da empresa?', a: '<p>A missão é acelerar a evolução de empresas com inteligência artificial, tecnologia e métodos de gestão. A visão é ser referência em soluções integradas de IA e transformação digital para empresas que crescem de forma estruturada, sustentável e orientada por dados.</p>' },
  { q: 'Que produtos a Roque Business Evolution mantém?', a: '<p>O <a href="https://aurorapremium.com/">Aurora Premium</a>, sistema de agendamento e gestão lançado em 2025, e o <a href="/engagebot/">EngageBot</a>, atendimento com IA.</p>' },
  { q: 'Como falar com a Roque Business Evolution?', a: `<p>Pelo WhatsApp <a href="${wa(SITE.wa.text)}" rel="noopener">+55 11 97396-7161</a> ou pelo e-mail <a href="mailto:${SITE.email}">${SITE.email}</a>.</p>` },
], { pagePath: '/sobre/' });
const sobre = {
  path: '/sobre/', og: 'sobre',
  title: 'Sobre a Roque Business Evolution e a fundadora',
  description: 'Conheça a Roque Business Evolution: missão, visão, pilares de atuação, produtos e a fundadora Viviane Roque, em tecnologia e gestão desde 1998.',
  body: `${hero(sobreCrumb, 'Sobre a Roque Business Evolution', 'A Roque Business Evolution é uma empresa de consultoria, tecnologia e transformação digital que usa inteligência artificial, automação e estratégia digital para ajudar empresas a evoluir, otimizar processos e conquistar clientes.')}
<section class="sec white" id="o-que-fazemos" aria-labelledby="qf-h"><div class="wrap"><div class="prose"><h2 id="qf-h">O que a Roque Business Evolution faz</h2><p>A Roque Business Evolution conecta estratégia empresarial, criação de sites, posicionamento orgânico, marketing digital, inteligência artificial, automação comercial, análise de dados e desenvolvimento de software.</p><p>O trabalho começa pelo entendimento do negócio, do mercado, do público e dos objetivos. A partir desse diagnóstico, estruturamos soluções digitais alinhadas às necessidades reais da operação.</p><p>Veja a lista completa em <a href="/servicos/">serviços</a>.</p></div></div></section>
<section class="sec mist" id="missao-visao" aria-labelledby="mv-h"><div class="wrap"><h2 id="mv-h">Missão e visão da Roque Business Evolution</h2><div class="cols"><div><h3>Missão</h3><p>Acelerar a evolução de empresas por meio da aplicação estratégica de inteligência artificial, tecnologia e métodos de gestão, tornando processos mais eficientes, operações mais inteligentes e negócios mais competitivos.</p></div><div><h3>Visão</h3><p>Ser uma referência em soluções integradas de inteligência artificial e transformação digital para empresas que buscam crescer de forma estruturada, sustentável e orientada por dados.</p></div></div></div></section>
<section class="sec white" id="pilares" aria-labelledby="pil-h"><div class="wrap"><h2 id="pil-h">Os pilares de atuação da Roque Business Evolution</h2>${cols(['<b>Estratégia.</b> Diagnóstico empresarial, planejamento digital e oportunidades.', '<b>Presença digital.</b> Sites, landing pages, conteúdo e posicionamento.', '<b>Visibilidade orgânica.</b> SEO, palavras-chave e busca com IA.', '<b>Aquisição e conversão.</b> Marketing digital, geração de leads e processos comerciais.', '<b>Automação inteligente.</b> Agentes de IA, atendimento e integração de sistemas.', '<b>Tecnologia.</b> Aplicações, plataformas, integrações e soluções personalizadas.', '<b>Inteligência de negócios.</b> Dashboards, indicadores e análises.', '<b>Evolução contínua.</b> Monitoramento, otimização e melhoria dos processos.'])}</div></section>
<section class="sec mist" id="fundadora" aria-labelledby="fund-h"><div class="wrap"><h2 id="fund-h">A fundadora da Roque Business Evolution: Viviane Roque</h2>
<div class="founder"><img src="/img/viviane-roque-retrato-510w.webp" srcset="/img/viviane-roque-retrato-340w.webp 340w, /img/viviane-roque-retrato-510w.webp 510w" sizes="(min-width: 860px) 33vw, 380px" width="510" height="564" alt="Retrato de Viviane Roque, fundadora da Roque Business Evolution" loading="lazy" decoding="async"><div class="prose">
<!-- REVISAR: trajetória contada como história da Viviane, sem números e sem chamar de "cases da Roque". -->
<p>Viviane Roque trabalha com tecnologia e gestão de operações desde 1998. Começou na BCP, depois Claro, estruturando operações digitais quando só existia telefonia analógica, e acompanhou a evolução das redes até o 4G.</p>
<p>Passou pela Ernst & Young e pela NEC, onde atuou em telecomunicações e novas tecnologias, no PMO da Arena Fonte Nova, para a Copa de 2014, e como advisor na Arena Pernambuco. Também trabalhou em manufatura, nos lançamentos de Google e Apple e no desenvolvimento de sistemas para municípios.</p>
<p>Essa experiência está na origem da Roque Business Evolution: levar tecnologia, inteligência e transformação digital ao pequeno e médio empreendedor, gerando emprego e prosperidade. Conheça o <a href="https://viviroque.com.br/">site de Viviane Roque</a>.</p>
</div></div></div></section>
<section class="sec white" id="produtos" aria-labelledby="prod-h"><div class="wrap"><h2 id="prod-h">Produtos da Roque Business Evolution</h2>${li(['<b><a href="https://aurorapremium.com/">Aurora Premium</a>.</b> Sistema de agendamento e gestão para salões, barbearias, clínicas, spas e pet shops, lançado em 2025 e desenvolvido pela Roque Business Evolution.', '<b><a href="/engagebot/">EngageBot</a>.</b> Atendimento com inteligência artificial no WhatsApp e no site.'])}</div></section>
<section class="sec mist" id="empresa" aria-labelledby="emp-h"><div class="wrap"><h2 id="emp-h">Empresa responsável pelo site</h2><p class="read">${esc(SITE.legalName)}, CNPJ ${SITE.cnpj}, nome fantasia Roque Business Evolution. E-mail <a href="mailto:${SITE.email}">${SITE.email}</a>.</p></div></section>
${sobreFaq.html}
${finalCta('Vamos conversar sobre a sua empresa', 'Conte o seu momento. A Roque Business Evolution responde pelo WhatsApp.', 'Olá! Quero conversar com a Roque Business Evolution.')}`,
  get graph() { return [org(), website(), webpage('/sobre/', 'Sobre a Roque Business Evolution', 'AboutPage'), crumbLd(sobreCrumb), sobreFaq.ld]; },
};

// ================================================================== CONTATO
const contatoCrumb = [{ name: 'Início', path: '/' }, { name: 'Contato', path: '/contato/' }];
const contato = {
  path: '/contato/', og: 'contato',
  title: 'Contato | Roque Business Evolution',
  description: 'Fale com a Roque Business Evolution pelo WhatsApp +55 11 97396-7161 ou pelo e-mail contato@roquebusinessevolution.com e peça um diagnóstico.',
  body: `${hero(contatoCrumb, 'Fale com a Roque Business Evolution', 'A forma mais rápida de falar com a Roque Business Evolution é pelo WhatsApp, no número +55 11 97396-7161. Conte o seu momento e peça um diagnóstico.', `<div class="btns">${btn('Falar no WhatsApp', 'Olá! Quero pedir um diagnóstico com a Roque Business Evolution.')}<a class="btn ghost" href="mailto:${SITE.email}">Enviar e-mail</a></div>`)}
<section class="sec white" id="canais" aria-labelledby="canais-h"><div class="wrap"><h2 id="canais-h">Canais de contato da Roque Business Evolution</h2>${li([`<b>WhatsApp.</b> <a href="${wa(SITE.wa.text)}" rel="noopener">+55 11 97396-7161</a>`, `<b>E-mail.</b> <a href="mailto:${SITE.email}">${SITE.email}</a>`, `<b>Instagram.</b> <a href="${SITE.instagram}" rel="noopener me">@roquebusinessevolution</a>`, `<b>Empresa.</b> ${esc(SITE.legalName)}, CNPJ ${SITE.cnpj}`])}<p class="read">O site não tem formulários: o contato acontece por WhatsApp ou e-mail.</p></div></section>`,
  get graph() { return [org(), website(), webpage('/contato/', 'Contato da Roque Business Evolution', 'ContactPage'), crumbLd(contatoCrumb)]; },
};

// ================================================================== HOME
const NODES = [
  // nome, x, y, href, grande, âncora do texto, dx, dy
  ['Sites', 105, 112, '/criacao-de-sites/', false, 'start', 14, -14],
  ['SEO e busca com IA', 245, 52, '/seo/', false, 'middle', 0, -18],
  ['Agentes de IA', 380, 104, '/agencia-de-ia/', false, 'end', -2, -16],
  ['Automação', 432, 215, '/agencia-de-ia/#automacao', false, 'end', 4, -16],
  ['Software e SaaS', 58, 218, '/desenvolvimento-de-software/', false, 'start', -6, -16],
  ['Transformação digital', 95, 330, '/transformacao-digital/', false, 'start', -4, 30],
  ['Aurora Premium', 372, 322, SITE.aurora, true, 'end', 6, -26],
  ['EngageBot', 218, 385, '/engagebot/', true, 'middle', 0, 34],
];
const C = [240, 218];
const LINKS = [...NODES.map((n) => [C, [n[1], n[2]]]), ...NODES.map((n, i) => [[n[1], n[2]], [NODES[(i + 1) % NODES.length][1], NODES[(i + 1) % NODES.length][2]]])];
const constellation = `<div class="const"><svg viewBox="0 0 480 430" role="group" aria-label="Mapa dos serviços e produtos da Roque Business Evolution" focusable="false">
${LINKS.map(([a, b]) => `<path class="ln" pathLength="1" d="M${a[0]} ${a[1]}L${b[0]} ${b[1]}"/>`).join('\n')}
<circle class="core" cx="${C[0]}" cy="${C[1]}" r="16" aria-hidden="true"/>
${NODES.map(([name, x, y, href, big, anchor, dx, dy]) => `<a class="nd${big ? ' big' : ''}" href="${href}" aria-label="${esc(name)}"${href.startsWith('http') ? ' rel="noopener"' : ''}><circle cx="${x}" cy="${y}" r="${big ? 17 : 10}"/><text x="${x + dx}" y="${y + dy}" text-anchor="${anchor}">${esc(name)}</text></a>`).join('\n')}
</svg></div>
<ul class="const-strip" aria-label="Serviços e produtos">${NODES.map(([name, , , href, big]) => `<li><a${big ? ' class="prod"' : ''} href="${href}"${href.startsWith('http') ? ' rel="noopener"' : ''}>${esc(name)}</a></li>`).join('')}</ul>`;

const homeFaq = faq([
  { q: 'O que é a Roque Business Evolution?', a: '<p>A Roque Business Evolution é uma agência de IA, de criação de sites e de desenvolvimento de software que ajuda empresas a modernizar processos, conquistar clientes e decidir com mais inteligência.</p>' },
  { q: 'Quais serviços a agência de IA oferece?', a: '<p>Agentes de IA e automação, criação de sites, SEO e busca com IA, desenvolvimento de software e SaaS, e consultoria de transformação digital. Veja a <a href="/servicos/">lista completa</a>.</p>' },
  { q: 'A Roque Business Evolution faz criação de sites e SEO?', a: '<p>Sim. A <a href="/criacao-de-sites/">criação de sites</a> já nasce com SEO técnico, e o trabalho de <a href="/seo/">SEO e busca com IA</a> cuida da visibilidade no Google e nas buscas com inteligência artificial.</p>' },
  { q: 'Como começa um projeto com a Roque Business Evolution?', a: '<p>Pelo diagnóstico: entendemos o negócio, o mercado, o público e os objetivos antes de propor qualquer solução. O primeiro contato é pelo WhatsApp.</p>' },
  { q: 'A Roque Business Evolution garante resultados no Google ou em respostas de IA?', a: '<p>Não. Não prometemos posição nas buscas nem citações por ferramentas de IA. Trabalhamos com método, base técnica, conteúdo e indicadores acompanhados ao longo do projeto.</p>' },
  { q: 'Quem está por trás da Roque Business Evolution?', a: '<p>A fundadora é Viviane Roque, que trabalha com tecnologia e gestão de operações desde 1998. Conheça a <a href="/sobre/">história da empresa</a>.</p>' },
], { pagePath: '/' });
const SVC_HOME = [
  ['Agência de IA', 'Agentes de inteligência artificial e automação de processos trabalhando dentro dos seus sistemas.', '/agencia-de-ia/'],
  ['Criação de sites', 'Sites profissionais com SEO, design responsivo e foco em conversão.', '/criacao-de-sites/'],
  ['SEO e busca com IA', 'Pesquisa de palavras-chave, SEO técnico, conteúdo e GEO/AEO para ser encontrado.', '/seo/'],
  ['Desenvolvimento de software', 'Aplicações web, MVPs, dashboards e integrações sob medida.', '/desenvolvimento-de-software/'],
  ['SaaS e plataformas', 'Plataformas multiempresa que a Roque cria e opera.', '/saas/'],
  ['Transformação digital', 'Diagnóstico, PMO, governança de IA e capacitação das equipes.', '/transformacao-digital/'],
];
const FASES_HOME = [['Diagnóstico', 'Negócio, público e processos.'], ['Pesquisa e estratégia', 'Mercado e oportunidades.'], ['Arquitetura', 'Escopo e integrações.'], ['Implementação', 'Construção e conteúdo.'], ['Testes', 'Validação e aprovação.'], ['Publicação', 'Produção e operação.'], ['Evolução', 'Indicadores e melhorias.']];
const home = {
  path: '/', og: 'home',
  title: 'Roque Business Evolution: Agência de IA, Sites e Software',
  description: 'Roque Business Evolution: agência de IA, criação de sites, SEO, software e transformação digital para empresas que querem evoluir. Fale no WhatsApp.',
  body: `<section class="hero" aria-labelledby="h1"><div class="hero-in">
<div><h1 id="h1">Agência de IA, criação de sites e desenvolvimento de software para empresas que querem evoluir</h1>
<p class="lead">A Roque Business Evolution é uma agência de IA, de criação de sites e de desenvolvimento de software que ajuda empresas a modernizar processos, conquistar clientes e decidir com mais inteligência.</p>
<div class="btns">${btn('Falar no WhatsApp', SITE.wa.text)}<a class="btn ghost" href="/servicos/">Ver serviços</a></div></div>
${constellation}
</div></section>

${sec('white', 'servicos', 'Serviços de agência de IA, sites, SEO e software', `<p class="read">Seis frentes que se conectam: o que a Roque Business Evolution faz em cada uma está em uma página própria.</p><ul class="svc">${SVC_HOME.map(([n, d, h]) => `<li><span class="n"><a href="${h}">${esc(n)}</a></span><p>${esc(d)} <a class="go" href="${h}">Ver o serviço</a></p></li>`).join('')}</ul><p class="read" style="margin-top:1.5rem">Veja também os <a href="/servicos/">17 serviços da Roque Business Evolution</a>.</p>`)}

${sec('mist', 'produtos', 'Produtos da Roque Business Evolution: Aurora Premium e EngageBot', `<p class="read">Além dos serviços, a Roque Business Evolution desenvolve e opera dois produtos próprios.</p><div class="prod"><div class="a"><h3>Aurora Premium</h3><p>Sistema de agendamento e gestão para salões, barbearias, clínicas, spas e pet shops, lançado em 2025 e desenvolvido pela Roque Business Evolution.</p><p><a class="btn" href="https://aurorapremium.com/" rel="noopener">Conhecer o Aurora Premium</a></p></div><div class="e"><h3>EngageBot</h3><p>Atendimento com inteligência artificial no WhatsApp e no site.</p><p><a class="more" href="/engagebot/">Conhecer o EngageBot</a></p></div></div>`)}

${sec('white', 'como-trabalhamos', 'Como a Roque Business Evolution trabalha: da estratégia à evolução contínua', `<p class="read">Todo projeto segue sete fases, para reduzir riscos e medir a evolução.</p><ol class="fases">${FASES_HOME.map(([b, t]) => `<li><b>${esc(b)}</b><span>${esc(t)}</span></li>`).join('')}</ol>`)}

${sec('mist', 'fundadora', 'A fundadora da Roque Business Evolution', `<div class="founder"><img src="/img/viviane-roque-retrato-510w.webp" srcset="/img/viviane-roque-retrato-340w.webp 340w, /img/viviane-roque-retrato-510w.webp 510w" sizes="(min-width: 860px) 33vw, 380px" width="510" height="564" alt="Retrato de Viviane Roque, fundadora da Roque Business Evolution" loading="lazy" decoding="async"><div class="prose"><p>A Roque Business Evolution nasceu da experiência de Viviane Roque, que trabalha com tecnologia e gestão de operações desde 1998. Ela passou por operações de telecomunicações, serviços financeiros, grandes arenas da Copa de 2014 e projetos de sistemas para municípios.</p><p>Essa trajetória está por trás de tudo que a Roque Business Evolution faz: levar tecnologia, inteligência e transformação digital ao pequeno e médio empreendedor.</p><p><a href="/sobre/">Conheça a Roque Business Evolution e a fundadora</a></p></div></div>`)}

${homeFaq.html}
${finalCta('Vamos conversar sobre a evolução da sua empresa', 'Conte o seu momento e o que você quer melhorar. A Roque Business Evolution responde pelo WhatsApp.', SITE.wa.text)}`,
  get graph() { return [org(), website(), webpage('/', 'Roque Business Evolution'), homeFaq.ld]; },
};

// ================================================================== LEGAL
const privCrumb = [{ name: 'Início', path: '/' }, { name: 'Política de Privacidade', path: '/politica-de-privacidade/' }];
const priv = {
  path: '/politica-de-privacidade/', og: 'home',
  title: 'Política de Privacidade | Roque Business Evolution',
  description: 'Como o site da Roque Business Evolution trata dados pessoais, conforme a LGPD: quais dados, para quê, por quanto tempo e como exercer seus direitos.',
  body: `${hero(privCrumb, 'Política de Privacidade', 'Esta política explica como o site roquebusinessevolution.com trata dados pessoais, de acordo com a Lei Geral de Proteção de Dados (Lei 13.709/2018). Última atualização: 21 de outubro de 2026.')}
<section class="sec white"><div class="wrap"><div class="prose">
<!-- REVISAR: texto jurídico escrito a partir do que o site faz hoje (sem formulários); recomenda-se revisão jurídica antes da virada. -->
<h2>1. Quem é a controladora</h2>
<p>A controladora dos dados é a ${esc(SITE.legalName)}, CNPJ ${SITE.cnpj}, nome fantasia Roque Business Evolution. Contato sobre dados pessoais: <a href="mailto:${SITE.email}">${SITE.email}</a> ou WhatsApp +55 11 97396-7161.</p>
<h2>2. Quais dados tratamos</h2>
<p>O site é informativo e não tem formulários, cadastro nem área de login. Tratamos:</p>
<ul><li><b>Dados técnicos de acesso</b> (endereço IP, navegador, data e hora), registrados pelo provedor de hospedagem, o GitHub Pages, para manter o site no ar e seguro.</li><li><b>Dados que você envia por WhatsApp ou e-mail</b> (nome, telefone, e-mail e conteúdo da mensagem), usados para responder ao seu contato.</li></ul>
<p>O site não usa cookies de publicidade nem de rastreamento de comportamento.</p>
<h2>3. Para que usamos e em que base legal</h2>
<ul><li>Responder ao seu contato e apresentar serviços: execução de procedimentos preliminares relacionados a um possível contrato, a pedido do titular (LGPD, art. 7º, V), e legítimo interesse (art. 7º, IX).</li><li>Manter a segurança e o funcionamento do site: legítimo interesse (art. 7º, IX).</li></ul>
<h2>4. Com quem compartilhamos</h2>
<p>Não vendemos dados. Podem tratá-los prestadores necessários ao serviço: o provedor de hospedagem (GitHub Pages), o WhatsApp (Meta) e o provedor de e-mail. Cada um tem a própria política de privacidade.</p>
<h2>5. Por quanto tempo guardamos</h2>
<p>Mantemos as conversas pelo tempo necessário ao atendimento e ao cumprimento de obrigações legais. Os registros técnicos seguem a política do provedor de hospedagem.</p>
<h2>6. Seus direitos</h2>
<p>Você pode pedir confirmação do tratamento, acesso, correção, anonimização, portabilidade, eliminação e informação sobre compartilhamento, e revogar consentimentos (LGPD, art. 18). Para exercer qualquer direito, escreva para <a href="mailto:${SITE.email}">${SITE.email}</a>.</p>
<h2>7. Segurança</h2>
<p>O site é servido por conexão segura (HTTPS). Adotamos medidas razoáveis de proteção, mas nenhum sistema é totalmente imune a falhas.</p>
<h2>8. Links para outros sites</h2>
<p>O site tem links para o Aurora Premium, o site da fundadora, o Instagram e o WhatsApp. Cada um tem a própria política de privacidade.</p>
<h2>9. Mudanças nesta política</h2>
<p>Podemos atualizar esta política. A data da última atualização fica no topo da página.</p>
</div></div></section>`,
  get graph() { return [org(), website(), webpage('/politica-de-privacidade/', 'Política de Privacidade'), crumbLd(privCrumb)]; },
};
const termCrumb = [{ name: 'Início', path: '/' }, { name: 'Termos de Uso', path: '/termos-de-uso/' }];
const term = {
  path: '/termos-de-uso/', og: 'home',
  title: 'Termos de Uso | Roque Business Evolution',
  description: 'Termos de uso do site roquebusinessevolution.com: finalidade informativa, propriedade intelectual, limites de responsabilidade e contato.',
  body: `${hero(termCrumb, 'Termos de Uso', 'Estes termos explicam as regras de uso do site roquebusinessevolution.com. Ao navegar por ele, você concorda com o que está escrito aqui. Última atualização: 21 de outubro de 2026.')}
<section class="sec white"><div class="wrap"><div class="prose">
<!-- REVISAR: texto jurídico escrito a partir do que o site faz hoje; recomenda-se revisão jurídica antes da virada. -->
<h2>1. Sobre o site</h2>
<p>O site apresenta os serviços e produtos da ${esc(SITE.legalName)}, CNPJ ${SITE.cnpj}. O conteúdo é informativo e não constitui proposta comercial, que é feita por escrito para cada projeto.</p>
<h2>2. Uso adequado</h2>
<p>Você pode navegar e compartilhar os links do site. Não é permitido tentar comprometer a segurança do site, copiar o conteúdo para fins comerciais sem autorização ou se passar pela empresa.</p>
<h2>3. Propriedade intelectual</h2>
<p>Textos, imagens, marcas e demais materiais do site pertencem à ${esc(SITE.legalName)}. Para reproduzir qualquer parte, peça autorização.</p>
<h2>4. Limites de responsabilidade</h2>
<p>Buscamos manter as informações corretas e atualizadas, mas o site é oferecido no estado em que está. Resultados de serviços de SEO, marketing, IA ou automação dependem de fatores como mercado, concorrência, investimento, dados e execução, e não são garantidos pelo conteúdo do site.</p>
<h2>5. Links para outros sites</h2>
<p>Os links para sites de terceiros e para os produtos da empresa levam a ambientes com regras próprias, pelos quais este site não responde.</p>
<h2>6. Contato</h2>
<p>Dúvidas sobre estes termos: <a href="mailto:${SITE.email}">${SITE.email}</a> ou WhatsApp +55 11 97396-7161.</p>
<h2>7. Lei aplicável</h2>
<p>Estes termos seguem a legislação brasileira.</p>
</div></div></section>`,
  get graph() { return [org(), website(), webpage('/termos-de-uso/', 'Termos de Uso'), crumbLd(termCrumb)]; },
};

for (const p of [home, ia, sites, seo, soft, saas, transf, engage, servicos, sobre, contato, priv, term]) { p.image = p.image || OG(p.og); writePage(p); }
finish();
