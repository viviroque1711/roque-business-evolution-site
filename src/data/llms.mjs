// Gera o /llms.txt (índice em texto simples para assistentes de IA). Uma frase por página dizendo o que ela entrega.
export const LLMS_INTRO = {
  title: 'Roque Business Evolution',
  summary: 'Roque Business Evolution é uma agência de IA, de criação de sites e de desenvolvimento de software, com consultoria de transformação digital, SEO e busca com IA. Empresa: Roque Business Evolution Serviços Ltda., CNPJ 47.308.584/0001-20. Fundadora: Viviane Roque.',
  about: 'Contato pelo WhatsApp +55 11 97396-7161 ou contato@roquebusinessevolution.com. Produtos: Aurora Premium (https://aurorapremium.com/), sistema de agendamento e gestão para salões, barbearias, clínicas, spas e pet shops, e EngageBot (https://roquebusinessevolution.com/engagebot/), atendimento com IA no WhatsApp e no site. Fundadora: https://viviroque.com.br/. Não prometemos posição no Google nem citação em respostas de IA.',
};
export const GROUPS = ['Serviços', 'Produtos', 'Empresa e contato'];
export const LLMS = {
  '/': { group: 2, entrega: 'Apresenta a Roque Business Evolution, seus serviços, produtos, metodologia de sete fases e a fundadora.' },
  '/servicos/': { group: 0, entrega: 'Lista os 17 serviços da Roque Business Evolution, em quatro grupos, e a metodologia de trabalho.' },
  '/agencia-de-ia/': { group: 0, entrega: 'Agência de IA: agentes de inteligência artificial, atendimento no WhatsApp e automação de processos.' },
  '/criacao-de-sites/': { group: 0, entrega: 'Criação de sites profissionais com SEO, design responsivo, integrações e manutenção.' },
  '/seo/': { group: 0, entrega: 'SEO técnico, on-page, off-page e local, pesquisa de palavras-chave e GEO/AEO para buscas com IA, sem promessa de posição.' },
  '/desenvolvimento-de-software/': { group: 0, entrega: 'Desenvolvimento de software sob medida: aplicações web, MVPs, dashboards e integrações.' },
  '/saas/': { group: 0, entrega: 'Desenvolvimento de SaaS e plataformas multiempresa, com os produtos Aurora Premium e EngageBot como referência.' },
  '/transformacao-digital/': { group: 0, entrega: 'Consultoria de transformação digital: diagnóstico, PMO, governança e segurança de IA e capacitação de equipes.' },
  '/engagebot/': { group: 1, entrega: 'EngageBot: atendimento com IA no WhatsApp e no site, com caixa de conversas e agente que aprende com o conteúdo da empresa.' },
  '/sobre/': { group: 2, entrega: 'Missão, visão, pilares de atuação, produtos, empresa responsável e a fundadora Viviane Roque.' },
  '/contato/': { group: 2, entrega: 'Como falar com a Roque Business Evolution: WhatsApp, e-mail e Instagram.' },
  '/politica-de-privacidade/': { group: 2, entrega: 'Política de Privacidade do site, em conformidade com a LGPD.' },
  '/termos-de-uso/': { group: 2, entrega: 'Termos de Uso do site.' },
};
