// Peças de HTML reutilizadas por todas as páginas (botão, listas, passos, seção, links relacionados).
import { esc, wa } from './lib.mjs';

export const btn = (text, msg) => `<a class="btn" href="${wa(msg)}" rel="noopener">${esc(text)}</a>`;
export const li = (items) => `<ul class="facts">${items.map((t) => `<li>${t}</li>`).join('')}</ul>`;
export const cols = (items) => `<ul class="cols">${items.map((t) => `<li>${t}</li>`).join('')}</ul>`;
export const steps = (items) => `<ol class="steps">${items.map(([b, t]) => `<li><b>${esc(b)}</b>${esc(t)}</li>`).join('')}</ol>`;
export const sec = (variant, id, h2, inner) => `<section class="sec ${variant}" id="${id}" aria-labelledby="${id}-h"><div class="wrap"><h2 id="${id}-h">${h2}</h2>${inner}</div></section>`;
export const related = (items) => `<ul class="related">${items.map(([href, label]) => `<li><a href="${href}">${esc(label)}</a></li>`).join('')}</ul>`;
export const p = (t) => `<p class="read">${t}</p>`;
export const group = (h3, inner) => `<div class="group"><h3>${esc(h3)}</h3>${inner}</div>`;
export const note = (t) => `<p class="note">${t}</p>`;

export const ENGAGEBOT = 'https://engagebot.com.br/';
export const AURORA = 'https://aurorapremium.com/';
export const aEngage = (label = 'EngageBot') => `<a href="${ENGAGEBOT}" rel="noopener">${label}</a>`;
export const aAurora = (label = 'Aurora Premium') => `<a href="${AURORA}" rel="noopener">${label}</a>`;

// ---- FAQ em grupos: vários <h2> temáticos, UM FAQPage com o mesmo texto das perguntas visíveis
import { plain, pageUrl } from './lib.mjs';
export function faqGrouped(groups, { pagePath, variants = ['white', 'mist'] }) {
  const all = groups.flatMap((g) => g.items);
  const html = groups.map((g, gi) => `<section class="sec ${variants[gi % variants.length]}" id="${g.id}" aria-labelledby="${g.id}-h"><div class="wrap"><h2 id="${g.id}-h">${esc(g.h2)}</h2><div class="faq">
${g.items.map((it, i) => `<details${gi === 0 && i === 0 ? ' open' : ''}><summary><h3 class="faq-q">${esc(it.q)}</h3></summary><div class="ans">${it.a}</div></details>`).join('\n')}
</div></div></section>`).join('\n');
  const ld = { '@type': 'FAQPage', '@id': pageUrl(pagePath) + '#faq', mainEntity: all.map((it) => ({ '@type': 'Question', name: it.q, acceptedAnswer: { '@type': 'Answer', text: plain(it.a) } })) };
  return { html, ld };
}
