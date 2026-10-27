import { SITE, waHref } from './site.mjs';
import { SERVICE_GROUPS, SERVICES, AI_APPS, PRODUCTS } from './services.mjs';

export { SERVICE_GROUPS, SERVICES, AI_APPS, PRODUCTS };
export const PARA_QUEM = [
  { href: '/para-pequenas-e-medias-empresas/', label: 'Pequenas e médias empresas' },
  { href: '/para-grandes-empresas/', label: 'Grandes empresas' },
  { href: '/diagnostico/', label: 'Diagnóstico digital e de IA' },
];
export const EMPRESA = [
  { href: '/sobre/', label: 'Sobre a Roque' },
  { href: '/proposito-e-impacto/', label: 'Propósito e impacto' },
  { href: '/metodologia/', label: 'Metodologia' },
  { href: '/como-contratar/', label: 'Como contratar' },
  { href: '/glossario/', label: 'Glossário' },
  { href: '/perguntas-frequentes/', label: 'Perguntas frequentes' },
  { href: '/criacao-de-sites-em-guarulhos/', label: 'Atendimento em Guarulhos' },
  { href: '/contato/', label: 'Contato' },
];
export const LEGAL = [
  { href: '/politica-de-privacidade/', label: 'Política de Privacidade' },
  { href: '/termos-de-uso/', label: 'Termos de Uso' },
];
export const WHATSAPP = { href: waHref(), label: SITE.wa.label };

// RODAPÉ (27/10/2026, pedido da Viviane: "organize e deixe correto, garanta que serviços está em serviços"):
// bloco Serviços em quatro famílias com nomes claros; bloco A Roque com produtos, para quem, empresa, conteúdo e fundadora;
// documentos legais na barra final. Cada página aparece uma vez só.
export const FOOTER_SERVICOS = [
  { name: 'Sites e presença no Google', items: [
    { href: '/criacao-de-sites/', label: 'Criação de sites profissionais' },
    { href: '/seo/', label: 'Agência de SEO, GEO e AEO' },
    { href: '/geo-aeo/', label: 'GEO e SEO para IA' },
    { href: '/pesquisa-de-palavras-chave/', label: 'Pesquisa de palavras-chave' },
    { href: '/marketing-de-conteudo/', label: 'Marketing de conteúdo' },
    { href: '/branding-e-identidade-digital/', label: 'Branding e identidade digital' },
  ] },
  { name: 'Software, aplicativos e IA', items: [
    { href: '/desenvolvimento-de-software/', label: 'Software sob medida' },
    { href: '/desenvolvimento-de-aplicativos/', label: 'Desenvolvimento de aplicativos' },
    { href: '/saas/', label: 'SaaS e plataformas' },
    { href: '/agentes-de-ia/', label: 'Agentes de IA' },
    { href: '/agentes-de-ia-para-whatsapp/', label: 'Agente de IA para WhatsApp' },
    { href: '/agentes-de-ia-para-vendas/', label: 'Agente de IA para vendas' },
    { href: '/agentes-de-ia-para-suporte/', label: 'Agente de IA para suporte' },
    { href: '/automacao-de-processos/', label: 'Automação de processos' },
    { href: '/dados-e-business-intelligence/', label: 'Dados e business intelligence' },
  ] },
  { name: 'Vendas e marketing', items: [
    { href: '/marketing-digital-e-midia-paga/', label: 'Marketing digital e mídia paga' },
    { href: '/crm-e-vendas/', label: 'CRM e vendas' },
    { href: '/reputacao-digital/', label: 'Reputação digital' },
  ] },
  { name: 'Estratégia e evolução', items: [
    { href: '/diagnostico/', label: 'Diagnóstico digital e de IA' },
    { href: '/transformacao-digital/', label: 'Transformação digital' },
    { href: '/capacitacao-em-ia/', label: 'Capacitação em IA' },
    { href: '/governanca-e-seguranca-de-ia/', label: 'Governança e segurança de IA' },
    { href: '/suporte-e-evolucao-continua/', label: 'Suporte e evolução contínua' },
    { href: '/servicos/', label: 'Todos os serviços' },
  ] },
];
export const FOOTER_ROQUE = [
  { name: 'Produtos', items: [
    { href: 'https://aurorapremium.com/', label: 'Aurora Premium', ext: true },
    { href: '/engagebot/', label: 'EngageBot' },
    { href: '/produtos/', label: 'Sobre os produtos' },
  ] },
  { name: 'Para quem', items: [
    { href: '/para-pequenas-e-medias-empresas/', label: 'Pequenas e médias empresas' },
    { href: '/para-grandes-empresas/', label: 'Grandes empresas' },
    { href: '/criacao-de-sites-em-guarulhos/', label: 'Atendimento em Guarulhos' },
  ] },
  { name: 'Empresa', items: [
    { href: '/sobre/', label: 'Sobre a Roque' },
    { href: '/proposito-e-impacto/', label: 'Propósito e impacto' },
    { href: '/metodologia/', label: 'Metodologia' },
    { href: '/como-contratar/', label: 'Como contratar' },
    { href: '/contato/', label: 'Contato' },
  ] },
  { name: 'Conteúdo', items: [
    { href: '/blog/', label: 'Blog' },
    { href: '/perguntas-frequentes/', label: 'Perguntas frequentes' },
    { href: '/glossario/', label: 'Glossário' },
  ] },
];
