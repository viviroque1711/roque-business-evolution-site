// Os 17 serviços do portfólio (5.1 a 5.17) mais desenvolvimento de aplicativos (22/10/2026), em quatro grupos. Fonte única do menu, do rodapé, do índice /servicos/,
// da home e da constelação 3D. Todos têm página própria.
export const SERVICE_GROUPS = [
  {
    id: 'estrategia', name: 'Estratégia e transformação',
    items: [
      { href: '/transformacao-digital/', label: 'Transformação digital', short: 'Diagnóstico, PMO e roteiro para modernizar processos e adotar IA.' },
      { href: '/capacitacao-em-ia/', label: 'Capacitação em IA', short: 'Treinamento prático e políticas de uso responsável para as equipes.' },
      { href: '/governanca-e-seguranca-de-ia/', label: 'Governança e segurança de IA', short: 'Permissões, limites, auditoria e aprovação humana.' },
      { href: '/suporte-e-evolucao-continua/', label: 'Suporte e evolução contínua', short: 'Monitoramento e melhoria do que já está no ar.' },
    ],
  },
  {
    id: 'presenca', name: 'Presença digital e visibilidade',
    items: [
      { href: '/criacao-de-sites/', label: 'Criação de sites profissionais', short: 'Sites profissionais com SEO, GEO, design responsivo e foco em conversão.' },
      { href: '/seo/', label: 'Agência de SEO', short: 'Palavras-chave, SEO técnico, conteúdo e SEO local.' },
      { href: '/pesquisa-de-palavras-chave/', label: 'Pesquisa de palavras-chave', short: 'Intenção de busca, contexto semântico e mapa por página.' },
      { href: '/geo-aeo/', label: 'GEO e SEO para IA', short: 'Conteúdo claro para ChatGPT, Gemini e outras IAs.' },
      { href: '/marketing-de-conteudo/', label: 'Marketing de conteúdo', short: 'Estratégia editorial e autoridade temática.' },
      { href: '/branding-e-identidade-digital/', label: 'Branding e identidade digital', short: 'Posicionamento, identidade visual e tom de voz.' },
    ],
  },
  {
    id: 'aquisicao', name: 'Aquisição, vendas e relacionamento',
    items: [
      { href: '/marketing-digital-e-midia-paga/', label: 'Marketing digital e mídia paga', short: 'Campanhas no Google Ads e na Meta Ads, funis e mensuração.' },
      { href: '/crm-e-vendas/', label: 'CRM e vendas', short: 'Funil de vendas, CRM e automação de follow-ups.' },
      { href: '/reputacao-digital/', label: 'Reputação digital', short: 'Avaliações, feedback, fidelização e reativação.' },
    ],
  },
  {
    id: 'ia-software', name: 'IA, automação, software e dados',
    items: [
      { href: '/agencia-de-ia/', label: 'Agentes de IA', short: 'Agentes de inteligência artificial e automação.' },
      { href: '/automacao-de-processos/', label: 'Automação de processos', short: 'Fluxos e integrações que eliminam tarefas repetitivas.' },
      { href: '/desenvolvimento-de-software/', label: 'Software sob medida', short: 'Sistemas personalizados, MVPs, dashboards e integrações.' },
      { href: '/desenvolvimento-de-aplicativos/', label: 'Desenvolvimento de aplicativos', short: 'Apps Android e iOS, PWA e aplicativos web integrados ao seu sistema.' },
      { href: '/dados-e-business-intelligence/', label: 'Dados e business intelligence', short: 'Dashboards, indicadores e relatórios automáticos.' },
    ],
  },
];
export const SERVICES = SERVICE_GROUPS.flatMap((g) => g.items.map((i) => ({ ...i, group: g.id })));

// Aplicações de agentes de IA e plataformas (páginas de apoio da agência de IA e do desenvolvimento)
export const AI_APPS = [
  { href: '/agentes-de-ia-para-whatsapp/', label: 'Agente de IA para WhatsApp' },
  { href: '/agentes-de-ia-para-vendas/', label: 'Agente de IA para vendas' },
  { href: '/agentes-de-ia-para-suporte/', label: 'Agente de IA para suporte' },
  { href: '/saas/', label: 'SaaS e plataformas' },
];

// Produtos (links externos: o EngageBot e o Aurora Premium têm site próprio)
export const PRODUCTS = [
  { href: 'https://aurorapremium.com/', label: 'Aurora Premium', short: 'Sistema de agendamento e gestão para negócios de serviço.', external: true },
  { href: 'https://engagebot.com.br/', label: 'EngageBot', short: 'Atendimento com IA no WhatsApp e no site.', external: true },
];
