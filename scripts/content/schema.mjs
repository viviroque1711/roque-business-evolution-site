// Dados estruturados e moldes de página da Roque Business Evolution (Organization, WebSite, Service, hero, CTA final, página de serviço).
import { SITE } from '../../src/data/site.mjs';
import { esc, faq, crumbLd, crumbHtml, pageUrl } from './lib.mjs';
import { btn, li, cols, steps, sec, related } from './kit.mjs';

export const ORG_ID = SITE.url + '/#org';
export const SITE_ID = SITE.url + '/#website';
export const ENGAGE_ID = SITE.url + '/engagebot/#app';
export const OG = (n) => `/og/${n}.jpg`;

export const org = () => ({
  '@type': 'Organization',
  '@id': ORG_ID,
  name: 'Roque Business Evolution',
  legalName: SITE.legalName,
  taxID: SITE.cnpj,
  url: SITE.url + '/',
  logo: SITE.url + '/img/roque-logo-fundo-claro.png',
  email: SITE.email,
  description: 'Empresa de desenvolvimento de software e criação de sites profissionais: software sob medida, aplicativos, SEO, GEO e AEO e transformação digital.',
  contactPoint: { '@type': 'ContactPoint', contactType: 'customer service', telephone: '+55-11-97396-7161', email: SITE.email, availableLanguage: 'pt-BR' },
  sameAs: [SITE.instagram],
  founder: { '@id': SITE.founder.id },
  brand: [{ '@id': SITE.auroraId }, { '@id': ENGAGE_ID }],
});
export const website = () => ({ '@type': 'WebSite', '@id': SITE_ID, url: SITE.url + '/', name: 'Roque Business Evolution', inLanguage: 'pt-BR', publisher: { '@id': ORG_ID } });
export const webpage = (p, name, type = 'WebPage', extra = {}) => ({ '@type': type, '@id': pageUrl(p) + '#page', url: pageUrl(p), name, inLanguage: 'pt-BR', isPartOf: { '@id': SITE_ID }, about: { '@id': ORG_ID }, ...extra });
export const service = (p, name, type, description) => ({ '@type': 'Service', '@id': pageUrl(p) + '#service', name, serviceType: type, description, provider: { '@id': ORG_ID }, areaServed: { '@type': 'Country', name: 'Brasil' }, url: pageUrl(p) });

export const finalCta = (h2, p, msg) => `<section class="sec ink" id="conversar" aria-labelledby="cta-h"><div class="wrap"><h2 id="cta-h">${esc(h2)}</h2><p class="read">${esc(p)}</p><div class="btns">${btn('Falar no WhatsApp', msg)}</div></div></section>`;
export const hero = (crumb, h1, lead, extra = '') => `<section class="page-hero" aria-labelledby="h1"><div class="wrap">${crumbHtml(crumb)}<h1 id="h1">${esc(h1)}</h1><p class="lead">${lead}</p>${extra}</div></section>`;

// ================================================================== SERVIÇOS (páginas próprias)
export function servicePage(c) {
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

