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
