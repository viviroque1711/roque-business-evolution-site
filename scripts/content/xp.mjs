// EXPERIÊNCIA 3D DAS PÁGINAS DE CONTEÚDO (26/10/2026, pedido da Viviane: "o site precisa ser exclusivo, inovador, com 3D e motion").
// Vale para todas as páginas que ainda usavam o molde simples (serviços, agentes, institucionais, blog): o texto, os títulos, o FAQ
// e o JSON-LD não mudam; muda a apresentação. Aplicado no writePage (lib.mjs) às páginas sem CSS próprio.
//  - abertura preta com o aparelho certo de cada página (devices.mjs), montando a interface em câmera lenta e inclinando com o mouse;
//  - seções numeradas, listas viram cartões que entram em 3D, etapas viram linha do tempo que se preenche com a rolagem;
//  - chamada final com o celular digitando a mensagem do WhatsApp daquela página.
// Desempenho: só CSS de transform/opacity, nada roda fora da tela, tudo some com prefers-reduced-motion.
import fs from 'node:fs';
import path from 'node:path';
import { SCENES, SCENES_EXTRA, DEVICE_CSS, DEVICE_JS, waPhone } from './devices.mjs';

const read = (f) => fs.readFileSync(path.join(import.meta.dirname, f), 'utf8');
export const XP_CSS = read('xp.css') + '\n' + DEVICE_CSS;
export const XP_JS = read('xp.js') + '\n' + DEVICE_JS;

const ALL = { ...SCENES, ...SCENES_EXTRA };
// aparelho de cada página (sem cena = abertura só com texto)
const MAP = {
  '/agentes-de-ia-para-whatsapp/': 'agents',
  '/agentes-de-ia-para-vendas/': 'vendas',
  '/agentes-de-ia-para-suporte/': 'suporte',
  '/automacao-de-processos/': 'automacao',
  '/transformacao-digital/': 'plano',
  '/metodologia/': 'plano',
  '/diagnostico/': 'plano',
  '/saas/': 'software',
  '/servicos/': 'software',
  '/sobre/': 'software',
  '/proposito-e-impacto/': 'capacitacao',
  '/produtos/': 'produtos',
  '/engagebot/': 'engagebot',
  '/para-pequenas-e-medias-empresas/': 'sites',
  '/para-grandes-empresas/': 'dados',
  '/como-contratar/': 'contato',
  '/contato/': 'contato',
  '/branding-e-identidade-digital/': 'marca',
  '/crm-e-vendas/': 'crm',
  '/dados-e-business-intelligence/': 'dados',
  '/marketing-de-conteudo/': 'conteudo',
  '/marketing-digital-e-midia-paga/': 'midia',
  '/pesquisa-de-palavras-chave/': 'palavras',
  '/reputacao-digital/': 'seo',
  '/capacitacao-em-ia/': 'capacitacao',
  '/governanca-e-seguranca-de-ia/': 'governanca',
  '/suporte-e-evolucao-continua/': 'evolucao',
  '/perguntas-frequentes/': 'geo',
  '/blog/': 'conteudo',
  '/blog/adotar-ia-na-empresa-com-seguranca/': 'governanca',
  '/blog/agente-de-ia-no-whatsapp/': 'agents',
  '/blog/automacao-de-processos-o-que-automatizar/': 'automacao',
  '/blog/como-criar-um-site-profissional/': 'sites',
  '/blog/geo-e-aeo-seo-para-buscas-com-ia/': 'geo',
  '/blog/o-que-sao-agentes-de-ia/': 'agents',
  '/blog/seo-para-pequenas-empresas/': 'seo',
};

const waMsg = (html) => { const m = html.match(/wa\.me\/\d+\?text=([^"&]+)/); try { return m ? decodeURIComponent(m[1]) : ''; } catch { return ''; } };

/** Reescreve o corpo de uma página do molde simples para a experiência 3D. Sem efeito em páginas que já têm CSS próprio. */
export function xpBody(body, pagePath) {
  const key = MAP[pagePath];
  let out = body.replace(/<section class="page-hero" aria-labelledby="h1"><div class="wrap">([\s\S]*?)<\/div><\/section>/, (all, inner) => {
    const msg = waMsg(inner) || 'Olá! Quero conversar com a Roque Business Evolution.';
    const dev = key ? (key === 'contato' ? ALL.contato(msg) : ALL[key]()) : '';
    return `<section class="page-hero xp-hero${dev ? ' has-dev' : ''}" aria-labelledby="h1"><i class="xp-floor" aria-hidden="true"></i><div class="xp-hero-in"><div class="xp-copy">${inner}</div>${dev ? `<div class="xp-dev">${dev}</div>` : ''}</div></section>`;
  });
  out = out.replace(/<section class="sec ink" id="conversar" aria-labelledby="cta-h"><div class="wrap">([\s\S]*?)<\/div><\/section>/, (all, inner) => {
    const msg = waMsg(inner);
    return `<section class="sec ink xp-cta" id="conversar" aria-labelledby="cta-h"><div class="wrap xp-cta-in"><div>${inner}</div>${msg && key !== 'contato' ? `<div class="xp-cta-dev">${waPhone(msg)}</div>` : ''}</div></section>`;
  });
  return out;
}
