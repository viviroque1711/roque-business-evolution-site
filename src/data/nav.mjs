import { SITE, waHref } from './site.mjs';

export const SERVICOS = [
  { href: '/agencia-de-ia/', label: 'Agência de IA' },
  { href: '/criacao-de-sites/', label: 'Criação de sites' },
  { href: '/seo/', label: 'SEO e busca com IA' },
  { href: '/desenvolvimento-de-software/', label: 'Desenvolvimento de software' },
  { href: '/saas/', label: 'SaaS e plataformas' },
  { href: '/transformacao-digital/', label: 'Transformação digital' },
  { href: '/servicos/', label: 'Todos os serviços' },
];
export const PRODUTOS = [
  { href: SITE.aurora, label: 'Aurora Premium', external: true },
  { href: '/engagebot/', label: 'EngageBot' },
];
export const EMPRESA = [
  { href: '/sobre/', label: 'Sobre' },
  { href: '/contato/', label: 'Contato' },
];
export const LEGAL = [
  { href: '/politica-de-privacidade/', label: 'Política de Privacidade' },
  { href: '/termos-de-uso/', label: 'Termos de Uso' },
];
export const WHATSAPP = { href: waHref(), label: SITE.wa.label };
