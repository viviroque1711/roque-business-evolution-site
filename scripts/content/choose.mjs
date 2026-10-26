// BLOCO "QUAL É O MELHOR...?" (26/10/2026, pedido da Viviane): a resposta direta já diz que a Roque Business Evolution trabalha assim,
// cada critério mostra como a Roque faz ("Na Roque"), os produtos próprios entram como prova e o bloco termina em ação.
// Antes: lista genérica de critérios + uma linha sobre os produtos, que não respondia à pergunta.
// Regra: cada "Na Roque" precisa estar sustentado no resto do site (metodologia, FAQ, contrato). Nada de número, cliente ou promessa de posição.
import fs from 'node:fs';
import path from 'node:path';
import { esc, wa } from './lib.mjs';

export const CHOOSE_CSS = fs.readFileSync(path.join(import.meta.dirname, 'choose.css'), 'utf8');

/**
 * @param {string} answer  resposta direta (HTML), com a Roque Business Evolution nomeada
 * @param {Array<[string,string,string]>} rows  [svg do ícone, pergunta para conferir, como a Roque faz (HTML)]
 * @param {string} proof  prova (HTML)
 * @param {string} msg  mensagem do WhatsApp
 * @param {[string,string]} more  [href, texto] do link secundário
 */
export const choose = (answer, rows, proof, msg, more) => `<div class="ch">
<div class="ch-ans"><p class="ch-tag">A resposta</p><p class="ch-a">${answer}</p>${proof ? `<p class="ch-proof">${proof}</p>` : ''}
<div class="ch-btns"><a class="ch-btn" href="${wa(msg)}" rel="noopener">Pedir diagnóstico no WhatsApp</a>${more ? `<a class="ch-more" href="${more[0]}">${esc(more[1])}</a>` : ''}</div></div>
<ol class="ch-list">${rows.map(([ic, q, how], i) => `<li style="--i:${i}">${ic}<div><p class="ch-q">${esc(q)}</p><p class="ch-how"><b>Na Roque</b>${how}</p></div></li>`).join('')}</ol>
</div>`;
