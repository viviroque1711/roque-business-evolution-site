// APARELHOS DA ABERTURA (22/10/2026): notebook e celular realistas, sem marca, com a interface de cada serviço
// montando na tela em câmera lenta. Substitui as formas abstratas (cubos, camadas, esferas) das páginas de serviço
// e as formas da seção de produtos da home. Tudo em HTML e CSS; o JS só inclina com o mouse e pausa fora da tela.
// Regras: nenhum número de resultado, nenhum cliente; os dados das telas são "de exemplo" e o site citado é
// sempre o do cliente ("suaempresa.com.br"). Telas do Aurora Premium são as reais (public/img).
import fs from 'node:fs';
import path from 'node:path';

export const DEVICE_CSS = fs.readFileSync(path.join(import.meta.dirname, 'devices.css'), 'utf8');
export const DEVICE_JS = 'window.RX_TELAS=' + fs.readFileSync(path.join(import.meta.dirname, 'rx-telas.json'), 'utf8').trim() + ';\n' + fs.readFileSync(path.join(import.meta.dirname, 'devices.js'), 'utf8');

const d = (n) => ` style="--d:${n}s"`; // atraso de entrada de cada peça
const lines = (n, w = [92, 78, 64]) => Array.from({ length: n }, (_, i) => `<i class="ln" style="width:${w[i % w.length]}%"></i>`).join('');
const TICK = '<svg viewBox="0 0 16 11" aria-hidden="true"><path d="M1 6l3 3 6-7M6 9l1 1 7-8" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>';

// APARELHOS REALISTAS (27/10/2026, pedido da Viviane: "nada de imagem genérica"): as artes criadas por ela (notebook, celular,
// monitor com tablet), com a tela verde recortada; a interface de cada página (HTML de verdade, em unidades cqw) fica atrás da
// moldura e é encaixada na perspectiva exata da tela (homografia de 4 pontos, devices.js). mac()/phone()/mon()/tab() marcam
// as telas e scene() escolhe a arte: notebook + celular, só notebook, só celular, ou monitor + tablet.
export const RX_TELAS = JSON.parse(fs.readFileSync(path.join(import.meta.dirname, 'rx-telas.json'), 'utf8'));
const RX_SIZE = { M: [680, 425], P: [390, 844], O: [1100, 733], T: [1100, 800] };  // tela do notebook menor = menos pintura por quadro (continua maior que o tamanho na página)
const mac = (screen) => `\u0001M${screen}\u0002`;
const phone = (screen) => `\u0001P${screen}\u0002`;
const mon = (screen) => `\u0001O${screen}\u0002`;
const tab = (screen) => `\u0001T${screen}\u0002`;
const rxTela = (k, i, html) => {
  const [w, h] = RX_SIZE[k];
  const inner = k === 'P' ? `<div class="screen"><div class="status"><b>9:41</b><span></span></div>${html}</div>` : `<div class="screen">${html}</div>`;
  return `<div class="rx-tela ${k === 'P' ? 'dv-phone' : 'dv-mac'} rx-${k}" data-tela="${i}" style="width:${w}px;height:${h}px">${inner}</div>`;
};
const scene = (inner, label, extra = '', more = '') => {
  const parts = {}; let rest = inner.replace(/\u0001([MPOT])([\s\S]*?)\u0002/g, (m, k, html) => { parts[k] = html; return ''; });
  const name = parts.O ? 'monitor-e-tablet' : parts.M && parts.P ? 'notebook-e-celular' : parts.M ? 'notebook' : 'celular-em-pe';
  const order = parts.O ? ['O', 'T'] : parts.M && parts.P ? ['M', 'P'] : parts.M ? ['M'] : ['P'];
  const t = RX_TELAS[name];
  const telas = order.map((k, i) => (parts[k] !== undefined ? rxTela(k, i, parts[k]) : '')).join('');
  const solo = name === 'celular-em-pe' ? ' solo' : '';
  return `<div class="dv-scene rx-scene${solo} ${extra}" data-dv data-rx data-nosnippet role="img" aria-label="${label}"><div class="rx" data-dev="${name}" style="aspect-ratio:${t.w}/${t.h}">${telas}<img class="rx-moldura" src="/img/aparelhos/aparelho-${name}.webp" alt="" width="${t.w}" height="${t.h}" decoding="async"></div>${rest}${more}<i class="dv-floor" aria-hidden="true"></i></div>`;
};

// ---------------------------------------------------------------- telas
const dashboard = (title = 'Painel da operação') => `<div class="ui ui-dash">
<aside${d(.2)}><i class="logo"></i><i class="nav on"></i><i class="nav"></i><i class="nav"></i><i class="nav"></i><i class="nav"></i><i class="nav"></i></aside>
<div class="ui-main"><header${d(.5)}><b>${title}</b><small>Dados de exemplo</small><i class="av"></i></header>
<div class="kpis"><div class="kpi"${d(.9)}><small>Pedidos hoje</small><b>128</b></div><div class="kpi"${d(1.2)}><small>Em andamento</small><b>37</b></div><div class="kpi g"${d(1.5)}><small>Concluídos</small><b>91</b></div></div>
<div class="chart"${d(1.9)}><small>Pedidos por dia</small><div class="bars">${[38, 52, 46, 64, 58, 76, 70, 88].map((h, i) => `<i style="--h:${h}%;--d:${2.2 + i * .15}s"></i>`).join('')}</div></div>
<div class="table">${['Cliente', 'Pedido', 'Status'].map((t) => `<em>${t}</em>`).join('')}${[['Ana M.', '#1042', 'Pago'], ['Carlos R.', '#1043', 'Separando'], ['Beatriz L.', '#1044', 'Enviado']].map((r, i) => `<span class="tr"${d(3.4 + i * .35)}>${r.map((c, j) => `<span${j === 2 ? ' class="tag"' : ''}>${c}</span>`).join('')}</span>`).join('')}</div>
</div></div>`;

const appScreen = `<div class="ui ui-app"><header${d(.3)}><small>Quinta-feira</small><b>Agenda de hoje</b></header>
${[['09:00', 'Avaliação', 'Mariana S.'], ['10:30', 'Retorno', 'Paulo T.'], ['13:00', 'Consulta', 'Júlia P.'], ['15:30', 'Visita técnica', 'Roberto A.']].map(([h, s, n], i) => `<div class="card"${d(.8 + i * .45)}><b>${h}</b><span><strong>${s}</strong><small>${n}</small></span></div>`).join('')}
<div class="toast"${d(3.4)}><i></i><span><strong>Novo agendamento</strong><small>Sexta, 11:00, confirmado</small></span></div>
<nav${d(.3)}><i class="on"></i><i></i><i></i><i></i></nav></div>`;

const siteScreen = `<div class="ui ui-browser"><div class="bar"><i></i><i></i><i></i><span>suaempresa.com.br</span></div>
<div class="site"><div class="nav"${d(.4)}><i class="logo"></i><i class="ln" style="width:12%"></i><i class="ln" style="width:12%"></i><i class="ln" style="width:12%"></i><i class="cta"></i></div>
<div class="hero"><div><b${d(.9)}>Seu negócio encontrado no Google</b><span${d(1.4)}>${lines(2, [90, 70])}</span><i class="btn"${d(1.9)}>Falar no WhatsApp</i></div><i class="img"${d(1.2)}></i></div>
<div class="cols">${[0, 1, 2].map((i) => `<div class="col"${d(2.5 + i * .3)}><i class="ic"></i>${lines(2, [80, 60])}</div>`).join('')}</div></div></div>`;

const siteMobile = `<div class="ui ui-msite"><div class="mnav"${d(.6)}><i class="logo"></i><i class="burger"></i></div><b${d(1.1)}>Seu negócio encontrado no Google</b><span${d(1.6)}>${lines(3, [92, 84, 60])}</span><i class="btn"${d(2.1)}>Falar no WhatsApp</i><i class="img"${d(1.4)}></i><i class="wa"${d(2.8)}></i></div>`;

const serpScreen = `<div class="ui ui-serp"><div class="bar"><i></i><i></i><i></i><span>busca</span></div>
<div class="q"${d(.3)}><i class="mg"></i>criação de sites em guarulhos</div>
<div class="res">${[['guiadosites.com.br', 'Como escolher quem cria o seu site: 7 cuidados', 'Antes de contratar, confira prazo, SEO, domínio no seu nome e quem cuida depois do lançamento.'], ['portaldenegocios.com.br', 'Criação de sites em Guarulhos: o que avaliar', 'Lista de pontos para comparar propostas de criação de sites na região.'], ['construtorweb.com', 'Monte seu site sozinho em minutos', 'Modelos prontos para quem quer montar o próprio site.'], ['blogdomarketing.com.br', 'Quanto custa um site profissional em 2026?', 'Entenda o que muda o preço: páginas, textos, integrações e manutenção.']].map(([u, t, d], i) => `<div class="r r${i}"><small>${u}</small><b>${t}</b><span>${d}</span></div>`).join('')}
<div class="r me"><small>suaempresa.com.br</small><b>Criação de sites em Guarulhos | Sua Empresa</b><span>Sites rápidos, com SEO e WhatsApp, feitos para quem quer ser encontrado. Peça orçamento.</span></div></div></div>`;

const serpMobile = `<div class="ui ui-mserp"><div class="q"${d(.4)}><i class="mg"></i>criação de sites</div><div class="map"${d(.9)}><i class="pin"></i></div><div class="me"${d(1.6)}><b>Sua Empresa</b><small>Criação de sites · Guarulhos</small><span><i>Ligar</i><i>WhatsApp</i><i>Site</i></span></div><div class="r"${d(2.2)}>${lines(2, [70, 90])}</div></div>`;

const aiQuestion = 'Qual empresa faz criação de sites com SEO em Guarulhos?';
const aiScreen = `<div class="ui ui-ai"><aside${d(.2)}><i class="nb"></i><i class="ln"></i><i class="ln"></i><i class="ln"></i><i class="ln"></i></aside>
<div class="ui-main"><div class="u"${d(.6)}>${aiQuestion}</div>
<div class="a"><i class="spark"${d(1.2)}></i><div><p class="txt"${d(1.6)}>Para criação de sites com SEO em Guarulhos, uma opção é a <b>Sua Empresa</b>: cria sites rápidos, com SEO e WhatsApp integrado, e atende presencialmente na região.</p><p class="txt"${d(2.4)}>Antes de decidir, peça uma proposta com escopo, prazo e o que vem incluído.</p><div class="src"${d(3.6)}><small>Fontes</small><span class="me">suaempresa.com.br</span><span>guia-local.com.br</span></div></div></div>
<div class="input"${d(.3)}><i></i></div></div></div>`;

const aiMobile = `<div class="ui ui-mai"><div class="u"${d(.6)}>${aiQuestion}</div><div class="a"><p class="txt"${d(1.6)}>Uma opção é a <b>Sua Empresa</b>: cria sites rápidos, com SEO e WhatsApp, e atende em Guarulhos.</p><span class="me"${d(3.6)}>suaempresa.com.br</span></div></div>`;

const chat = (name = 'Sua Empresa') => `<div class="ui ui-chat"><header><i class="av"></i><span><b>${name}</b><small>online</small></span></header>
<div class="msgs"><p class="in"${d(.6)}>Oi! Vocês atendem sábado?</p>
<p class="out"${d(1.6)}>Atendemos sim, das 9h às 14h. Quer que eu reserve um horário?<i>${TICK}</i></p>
<p class="in"${d(2.8)}>Quero, às 10h</p>
<p class="typing"${d(3.4)}><i></i><i></i><i></i></p>
<p class="out"${d(4.3)}>Pronto, reservado: sábado às 10h. A confirmação foi enviada aqui.<i>${TICK}</i></p></div>
<div class="input"><i></i></div></div>`;

const inbox = `<div class="ui ui-inbox"><aside${d(.2)}><i class="logo"></i><i class="nav on"></i><i class="nav"></i><i class="nav"></i><i class="nav"></i></aside>
<div class="ui-main"><header${d(.4)}><b>Caixa de conversas</b><small>Dados de exemplo</small></header>
${[['Mariana S.', 'Quero agendar para sábado', 'Agendado', 'ok'], ['Paulo T.', 'Qual o valor da consulta?', 'Respondido', 'ok'], ['Júlia P.', 'Preciso falar com alguém', 'Com a equipe', 'hu'], ['Roberto A.', 'Vocês entregam em Guarulhos?', 'Respondido', 'ok']].map(([n, m, t, k], i) => `<div class="conv"${d(.9 + i * .4)}><i class="av"></i><span><b>${n}</b><small>${m}</small></span><em class="${k}">${t}</em></div>`).join('')}
</div></div>`;


// ---------------------------------------------------------------- telas novas (26/10/2026)
// EngageBot (só a fase 1): responde no WhatsApp e no site com o conteúdo da empresa, detecta a intenção, caixa de conversas,
// base de conhecimento e ativação guiada. Sem agendamento, sem captura de lead, sem preço.
const engChat = `<div class="ui ui-chat ui-eng"><header><i class="av"></i><span><b>Sua Empresa</b><small>online</small></span></header>
<div class="msgs"><p class="in"${d(.6)}>Oi! Vocês entregam em Guarulhos?</p>
<p class="intent"${d(1.3)}>Intenção: entrega</p>
<p class="out"${d(2)}>Entregamos, sim: Guarulhos e toda a capital. Quer saber as formas de pagamento?<i>${TICK}</i></p>
<p class="src"${d(2.5)}>Resposta com base no FAQ da empresa</p>
<p class="in"${d(3.4)}>Quero</p>
<p class="typing"${d(3.9)}><i></i><i></i><i></i></p>
<p class="out"${d(4.8)}>Pix, cartão e boleto, como está na nossa página de pagamentos.<i>${TICK}</i></p></div>
<div class="input"><i></i></div></div>`;

const webchat = `<div class="ui ui-browser ui-webchat"><div class="bar"><i></i><i></i><i></i><span>suaempresa.com.br</span></div>
<div class="site"><div class="nav"><i class="logo"></i><i class="ln" style="width:12%"></i><i class="ln" style="width:12%"></i><i class="ln" style="width:12%"></i><i class="cta"></i></div>
<div class="hero"><div><b>Catálogo de produtos</b><span>${lines(2, [90, 70])}</span></div><i class="img"></i></div>
<div class="cols">${[0, 1, 2].map(() => `<div class="col"><i class="ic"></i>${lines(2, [80, 60])}</div>`).join('')}</div></div>
<div class="wc"${d(.8)}><header><i class="av"></i><b>Atendimento</b><small>agente com IA</small></header>
<p class="in"${d(1.5)}>Qual o prazo de troca?</p><p class="intent"${d(2.1)}>Intenção: troca</p><p class="out"${d(2.7)}>Até 30 dias após a compra, como diz a nossa política de trocas.</p><i class="field"></i></div>
<i class="launcher"${d(.4)}></i></div>`;

const inboxEng = `<div class="ui ui-inbox ui-inbox-eng"><aside${d(.2)}><i class="logo"></i><i class="nav on"></i><i class="nav"></i><i class="nav"></i><i class="nav"></i></aside>
<div class="ui-main"><header${d(.4)}><b>Caixa de conversas</b><small>Dados de exemplo</small></header>
${[['Mariana S.', 'Vocês entregam em Guarulhos?', 'wa', 'Respondida pelo agente', 'ok'], ['Paulo T.', 'Qual o prazo de troca?', 'web', 'Respondida pelo agente', 'ok'], ['Júlia P.', 'Preciso de um orçamento especial', 'wa', 'Equipe acompanhando', 'hu'], ['Roberto A.', 'Qual o horário de sábado?', 'web', 'Respondida pelo agente', 'ok']].map(([n, m, ch, t, k], i) => `<div class="conv"${d(.9 + i * .4)}><i class="av"></i><span><b>${n} <i class="ch ${ch}">${ch === 'wa' ? 'WhatsApp' : 'Site'}</i></b><small>${m}</small></span><em class="${k}">${t}</em></div>`).join('')}
</div></div>`;

const knowledge = `<div class="ui ui-kb"><aside${d(.2)}><i class="logo"></i><i class="nav"></i><i class="nav on"></i><i class="nav"></i><i class="nav"></i></aside>
<div class="ui-main"><header${d(.4)}><b>O que o agente aprendeu</b><small>Dados de exemplo</small></header>
${[['site', 'suaempresa.com.br', 'Páginas do site'], ['pdf', 'catalogo.pdf', 'Catálogo'], ['pdf', 'politica-de-trocas.pdf', 'Documento'], ['faq', 'Perguntas frequentes', 'FAQ']].map(([k, n, t], i) => `<div class="src"${d(.8 + i * .55)}><i class="ic ${k}">${k === 'faq' ? '?' : k === 'pdf' ? 'PDF' : 'www'}</i><span><b>${n}</b><small>${t}</small></span><i class="bar" style="--d:${1 + i * .55}s"></i><em>Aprendido</em></div>`).join('')}
<div class="ask"${d(3.6)}><small>Teste o agente</small><b>Qual o prazo de troca?</b><span>Até 30 dias após a compra.</span></div>
</div></div>`;

const activation = `<div class="ui ui-act"><header${d(.3)}><small>Ativação guiada</small><b>Seu agente em 4 passos</b></header>
${[['Conectar o WhatsApp', 'Número da empresa'], ['Instalar o chat no site', 'Um código no site'], ['Ensinar o agente', 'Site, PDFs e FAQ'], ['Testar e ativar', 'Você aprova antes']].map(([b, sm], i) => `<div class="st${i === 3 ? ' now' : ''}"${d(.7 + i * .55)}><i>${i < 3 ? TICK : i + 1}</i><span><strong>${b}</strong><small>${sm}</small></span></div>`).join('')}
<i class="go"${d(3.2)}>Ativar o agente</i></div>`;

const kanban = `<div class="ui ui-kanban"><div class="bar"><i></i><i></i><i></i><span>CRM · funil de vendas</span></div>
<div class="board"><small class="tag">Dados de exemplo</small>${[['Novo contato', ['Loja Centro', 'Clínica Vida']], ['Proposta', ['Ótica Sol']], ['Negociação', ['Escola Arco']], ['Fechado', ['Pet Amigo']]].map(([h, cs], c) => `<div class="col"${d(.3 + c * .25)}><b>${h}</b>${cs.map((n, i) => `<span class="card"${d(.8 + c * .3 + i * .3)}><strong>${n}</strong><i class="ln" style="width:70%"></i></span>`).join('')}</div>`).join('')}
<span class="card mover"><strong>Mercado Bom</strong><i class="ln" style="width:70%"></i></span></div></div>`;

const flowScreen = `<div class="ui ui-flow"><div class="bar"><i></i><i></i><i></i><span>Automação · novo pedido</span></div>
<div class="canvas"><small class="tag">Exemplo de fluxo</small>
${[['Formulário do site', 'Pedido recebido', 8, 22], ['Sistema', 'Cadastro criado', 38, 22], ['WhatsApp', 'Confirmação ao cliente', 68, 22], ['Planilha', 'Linha registrada', 38, 64], ['E-mail', 'Aviso à equipe', 68, 64]].map(([b, sm, x, y], i) => `<div class="node" style="left:${x}%;top:${y}%;--d:${.4 + i * .5}s"><b>${b}</b><small>${sm}</small></div>`).join('')}
<svg class="wires" viewBox="0 0 100 62.5" preserveAspectRatio="none" aria-hidden="true"><path d="M30 20h8M60 20h8M49 27v17M60 46h8"/><circle r=".9"><animateMotion dur="3s" repeatCount="indefinite" path="M30 20h8 M38 20h22 h8"/></circle><circle r=".9"><animateMotion dur="3s" begin="1.5s" repeatCount="indefinite" path="M49 27v17h19"/></circle></svg></div></div>`;

const auditScreen = `<div class="ui ui-audit"><aside${d(.2)}><i class="logo"></i><i class="nav"></i><i class="nav on"></i><i class="nav"></i><i class="nav"></i></aside>
<div class="ui-main"><header${d(.4)}><b>Regras do agente</b><small>Dados de exemplo</small></header>
<div class="perm">${[['Responder dúvidas', 1], ['Consultar pedidos', 1], ['Emitir reembolso', 0], ['Alterar cadastro', 0]].map(([t, on], i) => `<span${d(.8 + i * .3)}><i class="sw ${on ? 'on' : ''}"></i>${t}${on ? '' : '<em>Aprovação humana</em>'}</span>`).join('')}</div>
<div class="log"><small${d(2)}>Registro de operações</small>${[['10:02', 'Respondeu dúvida sobre prazo'], ['10:05', 'Pedido de reembolso enviado para aprovação'], ['10:07', 'Reembolso aprovado por Ana (equipe)']].map(([h, t], i) => `<p${d(2.4 + i * .5)}><b>${h}</b>${t}</p>`).join('')}</div></div></div>`;

const courseScreen = `<div class="ui ui-course"><div class="bar"><i></i><i></i><i></i><span>Capacitação em IA</span></div>
<div class="body"><div class="player"${d(.4)}><i class="play"></i><small>Módulo 2 · IA no dia a dia da equipe</small><i class="prog"></i></div>
<ol>${['Primeiros passos com IA', 'IA no dia a dia da equipe', 'Escrevendo bons pedidos', 'Privacidade e segurança', 'Casos do seu setor'].map((t, i) => `<li class="${i < 1 ? 'ok' : i === 1 ? 'now' : ''}"${d(.8 + i * .35)}><i>${i < 1 ? TICK : i + 1}</i>${t}</li>`).join('')}</ol></div></div>`;

const ticketsScreen = `<div class="ui ui-tickets"><aside${d(.2)}><i class="logo"></i><i class="nav on"></i><i class="nav"></i><i class="nav"></i><i class="nav"></i></aside>
<div class="ui-main"><header${d(.4)}><b>Suporte e evolução</b><small>Dados de exemplo</small></header>
<div class="up"${d(.8)}><i></i><span><b>Sistema no ar</b><small>Monitorado o tempo todo</small></span></div>
${[['Ajustar relatório mensal', 'Em andamento', 'run'], ['Nova tela de cadastro', 'Planejado', 'plan'], ['Atualizar dependências', 'Concluído', 'ok'], ['Lentidão no login', 'Resolvido', 'ok']].map(([t, st, k], i) => `<div class="tk"${d(1.3 + i * .4)}><i class="${k}"></i><b>${t}</b><em class="${k}">${st}</em></div>`).join('')}</div></div>`;

const kwScreen = `<div class="ui ui-kw"><div class="bar"><i></i><i></i><i></i><span>Mapa de palavras-chave</span></div>
<div class="tb"><small class="tag">Dados de exemplo</small><div class="th"><em>Busca</em><em>Intenção</em><em>Página</em></div>
${[['sistema para clínica', 'Comercial', '/sistema/'], ['como escolher sistema', 'Informacional', '/blog/como-escolher/'], ['sistema para clínica preço', 'Transacional', '/planos/'], ['agenda online clínica', 'Comercial', '/agenda/'], ['sua empresa', 'Navegacional', '/']].map(([q, it, pg], i) => `<div class="tr"${d(.6 + i * .45)}><b>${q}</b><span class="it i${i % 4}">${it}</span><code>${pg}</code></div>`).join('')}</div></div>`;

const editorScreen = `<div class="ui ui-editor"><div class="bar"><i></i><i></i><i></i><span>Editor do blog</span></div>
<div class="body"><div class="doc"><b${d(.4)}>Como escolher um sistema para a sua clínica</b><span${d(.9)}>${lines(3, [96, 90, 70])}</span><em${d(1.5)}>Quanto custa um sistema?</em><span${d(1.9)}>${lines(2, [92, 80])}</span><em${d(2.4)}>O que perguntar antes de assinar?</em><span${d(2.8)}>${lines(2, [88, 60])}</span></div>
<aside><small${d(.6)}>Antes de publicar</small>${['Responde à pergunta no início', 'Título com a busca principal', 'Perguntas frequentes', 'Links para os serviços', 'Autor e data'].map((t, i) => `<p${d(1.1 + i * .45)}><i>${TICK}</i>${t}</p>`).join('')}</aside></div></div>`;

const brandScreen = `<div class="ui ui-brand"><div class="bar"><i></i><i></i><i></i><span>Manual da marca</span></div>
<div class="board"><div class="mark"${d(.4)}><i></i><b>Sua Marca</b></div>
<div class="pal">${['#16233A', '#C08A1E', '#F4F6F9', '#2D4466', '#E8B65A'].map((c, i) => `<i style="background:${c};--d:${.9 + i * .25}s"></i>`).join('')}</div>
<div class="type"${d(2.2)}><b>Aa</b><span>${lines(2, [80, 60])}</span></div>
<div class="comp"><i class="b1"${d(2.7)}>Botão principal</i><i class="b2"${d(3)}>Secundário</i></div></div></div>`;

const feedScreen = `<div class="ui ui-feed"><header${d(.3)}><i class="av"></i><b>suamarca</b></header><div class="grid">${Array.from({ length: 9 }, (_, i) => `<i class="p${i % 3}"${d(.7 + i * .2)}></i>`).join('')}</div></div>`;

const roadmapScreen = `<div class="ui ui-road"><div class="bar"><i></i><i></i><i></i><span>Plano de transformação</span></div>
<div class="gantt"><small class="tag">Exemplo de plano</small><div class="months">${['Mês 1', 'Mês 2', 'Mês 3', 'Mês 4', 'Mês 5', 'Mês 6'].map((m) => `<em>${m}</em>`).join('')}</div>
${[['Diagnóstico', 0, 18], ['Prioridades e plano', 14, 20], ['Implantação', 30, 42], ['Capacitação', 48, 30], ['Evolução contínua', 70, 30]].map(([t, x, w], i) => `<div class="row"><b${d(.5 + i * .4)}>${t}</b><span><i style="left:${x}%;width:${w}%;--d:${.8 + i * .45}s"></i></span></div>`).join('')}</div></div>`;

// celular do WhatsApp da Roque Business Evolution digitando a mensagem da página (chamada final)
const waCompose = (msg) => `<div class="ui ui-chat ui-compose"><header><i class="av rq"></i><span><b>Roque Business Evolution</b><small>WhatsApp</small></span></header>
<div class="msgs"><p class="out sent">${msg.replace(/</g, '&lt;')}<i>${TICK}</i></p></div>
<div class="input"><span class="typed" style="--n:${Math.min(msg.length, 90)}">${msg.replace(/</g, '&lt;')}</span><i class="send"></i></div></div>`;

export const SCENES_EXTRA = {
  engagebot: () => scene(mac(webchat) + phone(engChat), 'O EngageBot atendendo no site e no WhatsApp: o cliente pergunta, o agente identifica a intenção e responde com o conteúdo da empresa'),
  vendas: () => scene(mac(kanban) + phone(chat()), 'Notebook com o funil de vendas do CRM, um cartão avançando de etapa, e o celular com o agente de IA conversando no WhatsApp'),
  suporte: () => scene(mac(ticketsScreen) + phone(engChat), 'Notebook com o painel de suporte e chamados, e o celular com o agente respondendo uma dúvida'),
  crm: () => scene(mac(kanban) + phone(appScreen), 'Notebook com o funil de vendas do CRM e o celular com a agenda do vendedor'),
  automacao: () => scene(mac(flowScreen) + phone(appScreen), 'Notebook com um fluxo de automação ligando formulário, sistema, WhatsApp, planilha e e-mail, e o celular recebendo a confirmação'),
  governanca: () => scene(mac(auditScreen) + phone(engChat), 'Notebook com as regras do agente de IA, as ações que pedem aprovação humana e o registro de operações'),
  capacitacao: () => scene(mac(courseScreen) + phone(aiMobile), 'Notebook com a trilha de capacitação em IA e o celular com um assistente de IA'),
  evolucao: () => scene(mac(ticketsScreen) + phone(appScreen), 'Notebook com o painel de suporte: sistema no ar e melhorias planejadas, em andamento e concluídas'),
  palavras: () => scene(mac(kwScreen) + phone(serpMobile), 'Notebook com o mapa de palavras-chave por página e intenção de busca, e o celular com a busca no Google'),
  conteudo: () => scene(mac(editorScreen) + phone(siteMobile), 'Notebook com o editor do blog e a lista do que conferir antes de publicar, e o celular com o artigo no ar'),
  midia: () => scene(mac(dashboard('Campanhas e conversões')) + phone(siteMobile), 'Notebook com o painel das campanhas e o celular com a página de destino'),
  marca: () => scene(mac(brandScreen) + phone(feedScreen), 'Notebook com o manual da marca, cores, tipografia e botões, e o celular com o perfil da marca nas redes'),
  dados: () => scene(mon(dashboard('Indicadores da empresa')) + tab(shot('financeiro')), 'Monitor com o painel de indicadores da empresa e o tablet com o controle financeiro, com dados de exemplo'),
  plano: () => scene(mac(roadmapScreen) + phone(appScreen), 'Notebook com o plano de transformação digital em etapas, do diagnóstico à evolução contínua'),
  produtos: () => homeAurora(),
  contato: (msg = 'Olá! Quero conversar com a Roque Business Evolution.') => scene(phone(waCompose(msg)), 'Celular com o WhatsApp da Roque Business Evolution e a mensagem pronta para enviar', 'solo'),
};
// conversa do EngageBot montada a partir de uma lista: ['in'|'out'|'intent'|'src'|'typing', texto]
const chatEng = (items) => { let t = .5; return `<div class="ui ui-chat ui-eng"><header><i class="av"></i><span><b>Sua Empresa</b><small>online</small></span></header>
<div class="msgs">${items.map(([k, txt]) => { const el = k === 'typing' ? `<p class="typing"${d(t)}><i></i><i></i><i></i></p>` : `<p class="${k}"${d(t)}>${txt}${k === 'out' ? `<i>${TICK}</i>` : ''}</p>`; t += k === 'in' ? .8 : k === 'typing' ? .9 : .6; return el; }).join('\n')}</div>
<div class="input"><i></i></div></div>`; };
export const ENG = { engChat, chatEng, webchat, inboxEng, knowledge, activation, mac, phone, mon, tab, scene };
export const waPhone = (msg) => scene(phone(waCompose(msg)), 'Celular com o WhatsApp da Roque Business Evolution e a mensagem pronta para enviar', 'solo dv-cta');


// ---------------------------------------------------------------- PORTFÓLIO REAL (26/10/2026, pedido da Viviane: "nada de imagem genérica")
// Sites criados pela Roque, capturados de verdade e rolando dentro dos aparelhos: roquebusinessevolution.com e aurorapremium.com.
// Sistema real: telas do Aurora Premium, desenvolvido e operado pela Roque. Imagens em public/img/portfolio.
const IMG = '/img/portfolio/';
const realScreens = (kind) => `<div class="ui ui-real${kind === 'm' ? ' m' : ''}">${kind === 'd' ? `<div class="bar"><i></i><i></i><i></i><span><em class="u1">roquebusinessevolution.com</em><em class="u2">aurorapremium.com</em></span></div>` : ''}
<div class="vp"><img class="s1" src="${IMG}site-roque-business-evolution-${kind === 'd' ? 'desktop' : 'celular'}-tela.webp" alt="" width="${kind === 'd' ? 680 : 390}" height="${kind === 'd' ? 1500 : 2200}" decoding="async"><img class="s2" data-src="${IMG}site-aurora-premium-${kind === 'd' ? 'desktop' : 'celular'}-tela.webp" alt="" width="${kind === 'd' ? 680 : 390}" height="${kind === 'd' ? 1500 : 2200}" decoding="async"></div></div>`;
const chipsSites = `<div class="rs-chips" aria-hidden="true"><span class="c1">SEO, GEO e AEO desde o primeiro dia</span><span class="c2">WhatsApp a um toque</span><span class="c3">Rápido no celular</span></div>`;
export const realSites = () => scene(mac(realScreens('d')) + phone(realScreens('m')), 'Notebook e celular navegando em sites criados pela Roque Business Evolution: roquebusinessevolution.com e aurorapremium.com, rolando da primeira dobra até as seções seguintes', 'dv-real', chipsSites + '<span class="dv-cap" aria-hidden="true">Sites criados pela Roque: <b class="u1">roquebusinessevolution.com</b><b class="u2">aurorapremium.com</b></span>');
const shot = (name) => `<div class="ui ui-shot"><img src="${IMG}aurora-premium-${name}.webp" alt="" width="1100" height="733" loading="lazy" decoding="async"></div>`;
const shotSite = () => `<div class="ui ui-real m"><div class="vp"><img class="s2 solo-s" src="${IMG}site-aurora-premium-celular-tela.webp" alt="" width="390" height="2200" loading="lazy" decoding="async"></div></div>`;
export const auroraStack = (front = 'financeiro') => scene(mac(shot(front)) + phone(shotSite()), `Telas reais do Aurora Premium, sistema de agendamento e gestão desenvolvido e operado pela Roque Business Evolution, no notebook e no celular`, 'dv-real-aurora', '<span class="dv-cap" aria-hidden="true">Aurora Premium: sistema desenvolvido e operado pela Roque</span>');
// SOFTWARE SOB MEDIDA (27/10/2026, pedido da Viviane): não é o Aurora; é o sistema que conecta as áreas da empresa.
// Um pedido de exemplo passa por Marketing, Comercial, Suprimentos, Operações, Pessoas, Financeiro, Atendimento e TI (ig- em devices.css).
export const IG_MAPA = `<div class="ig ig-mapa ig2" style="--cyc:22.0s;--step:2.25s"><div class="ig-top"><b>Sistema integrado</b><span class="ig-cap"><em style="--i:0"><b>Marketing</b> Lead captado no site</em><em style="--i:1"><b>Comercial</b> Proposta aprovada</em><em style="--i:2"><b>Suprimentos</b> Material reservado no estoque</em><em style="--i:3"><b>Operações</b> Execução agendada</em><em style="--i:4"><b>Pessoas</b> Equipe escalada</em><em style="--i:5"><b>Financeiro</b> Cobrança emitida</em><em style="--i:6"><b>Atendimento</b> Cliente avisado no WhatsApp</em><em style="--i:7"><b>TI</b> Acessos e integrações ativos</em><em class="fim"><b>Tudo conectado</b> pela Roque Business Evolution</em></span><small>Dados de exemplo</small></div><svg class="ig-svg" viewBox="0 0 1100 733" aria-hidden="true"><line class="anel" x1="550" y1="240" x2="735" y2="290"/><line class="anel" x1="735" y1="290" x2="812" y2="410"/><line class="anel" x1="812" y1="410" x2="735" y2="530"/><line class="anel" x1="735" y1="530" x2="550" y2="580"/><line class="anel" x1="550" y1="580" x2="365" y2="530"/><line class="anel" x1="365" y1="530" x2="288" y2="410"/><line class="anel" x1="288" y1="410" x2="365" y2="290"/><line class="anel" x1="365" y1="290" x2="550" y2="240"/><line class="sl" x1="550" y1="240" x2="381" y2="190" style="--i:0"/><line class="sl" x1="550" y1="240" x2="480" y2="122" style="--i:0"/><line class="sl" x1="550" y1="240" x2="620" y2="122" style="--i:0"/><line class="sl" x1="550" y1="240" x2="719" y2="190" style="--i:0"/><line class="sl" x1="735" y1="290" x2="736" y2="162" style="--i:1"/><line class="sl" x1="735" y1="290" x2="865" y2="199" style="--i:1"/><line class="sl" x1="735" y1="290" x2="919" y2="289" style="--i:1"/><line class="sl" x1="812" y1="410" x2="966" y2="333" style="--i:2"/><line class="sl" x1="812" y1="410" x2="1002" y2="410" style="--i:2"/><line class="sl" x1="812" y1="410" x2="966" y2="487" style="--i:2"/><line class="sl" x1="735" y1="530" x2="919" y2="531" style="--i:3"/><line class="sl" x1="735" y1="530" x2="865" y2="621" style="--i:3"/><line class="sl" x1="735" y1="530" x2="736" y2="658" style="--i:3"/><line class="sl" x1="550" y1="580" x2="679" y2="671" style="--i:4"/><line class="sl" x1="550" y1="580" x2="550" y2="708" style="--i:4"/><line class="sl" x1="550" y1="580" x2="421" y2="671" style="--i:4"/><line class="sl" x1="365" y1="530" x2="364" y2="658" style="--i:5"/><line class="sl" x1="365" y1="530" x2="235" y2="621" style="--i:5"/><line class="sl" x1="365" y1="530" x2="181" y2="531" style="--i:5"/><line class="sl" x1="288" y1="410" x2="134" y2="487" style="--i:6"/><line class="sl" x1="288" y1="410" x2="98" y2="410" style="--i:6"/><line class="sl" x1="288" y1="410" x2="134" y2="333" style="--i:6"/><line class="sl" x1="365" y1="290" x2="181" y2="289" style="--i:7"/><line class="sl" x1="365" y1="290" x2="235" y2="199" style="--i:7"/><line class="sl" x1="365" y1="290" x2="364" y2="162" style="--i:7"/><line class="lk k0" x1="550" y1="410" x2="550" y2="240" style="--i:0"/><line class="lk k1" x1="550" y1="410" x2="735" y2="290" style="--i:1"/><line class="lk k2" x1="550" y1="410" x2="812" y2="410" style="--i:2"/><line class="lk k3" x1="550" y1="410" x2="735" y2="530" style="--i:3"/><line class="lk k4" x1="550" y1="410" x2="550" y2="580" style="--i:4"/><line class="lk k5" x1="550" y1="410" x2="365" y2="530" style="--i:5"/><line class="lk k6" x1="550" y1="410" x2="288" y2="410" style="--i:6"/><line class="lk k7" x1="550" y1="410" x2="365" y2="290" style="--i:7"/></svg><span class="ig-sub" style="left:381px;top:190px;--i:0">SEO</span><span class="ig-sub" style="left:480px;top:122px;--i:0">Mídia paga</span><span class="ig-sub" style="left:620px;top:122px;--i:0">Conteúdo</span><span class="ig-sub" style="left:719px;top:190px;--i:0">Redes sociais</span><span class="ig-sub" style="left:736px;top:162px;--i:1">CRM</span><span class="ig-sub" style="left:865px;top:199px;--i:1">Propostas</span><span class="ig-sub" style="left:919px;top:289px;--i:1">Contratos</span><span class="ig-sub" style="left:966px;top:333px;--i:2">Compras</span><span class="ig-sub" style="left:1002px;top:410px;--i:2">Estoque</span><span class="ig-sub" style="left:966px;top:487px;--i:2">Fornecedores</span><span class="ig-sub" style="left:919px;top:531px;--i:3">Produção</span><span class="ig-sub" style="left:865px;top:621px;--i:3">Logística</span><span class="ig-sub" style="left:736px;top:658px;--i:3">Qualidade</span><span class="ig-sub" style="left:679px;top:671px;--i:4">Recrutamento</span><span class="ig-sub" style="left:550px;top:708px;--i:4">Escalas</span><span class="ig-sub" style="left:421px;top:671px;--i:4">Folha</span><span class="ig-sub" style="left:364px;top:658px;--i:5">A receber</span><span class="ig-sub" style="left:235px;top:621px;--i:5">A pagar</span><span class="ig-sub" style="left:181px;top:531px;--i:5">Fluxo de caixa</span><span class="ig-sub" style="left:134px;top:487px;--i:6">WhatsApp</span><span class="ig-sub" style="left:98px;top:410px;--i:6">Chat do site</span><span class="ig-sub" style="left:134px;top:333px;--i:6">Pós-venda</span><span class="ig-sub" style="left:181px;top:289px;--i:7">Integrações</span><span class="ig-sub" style="left:235px;top:199px;--i:7">Segurança</span><span class="ig-sub" style="left:364px;top:162px;--i:7">Acessos</span><span class="ig-hub" style="left:550px;top:410px"><i class="h1">Dados<br>integrados</i><i class="h2"><img src="/img/roque-simbolo-168.webp" alt="" width="84" height="84" loading="lazy"><b>Roque Business Evolution</b></i></span><span class="ig-no n0" style="left:550px;top:240px;--i:0">Marketing</span><span class="ig-no n1" style="left:735px;top:290px;--i:1">Comercial</span><span class="ig-no n2" style="left:812px;top:410px;--i:2">Suprimentos</span><span class="ig-no n3" style="left:735px;top:530px;--i:3">Operações</span><span class="ig-no n4" style="left:550px;top:580px;--i:4">Pessoas</span><span class="ig-no n5" style="left:365px;top:530px;--i:5">Financeiro</span><span class="ig-no n6" style="left:288px;top:410px;--i:6">Atendimento</span><span class="ig-no n7" style="left:365px;top:290px;--i:7">TI</span></div>`;
export const IG_PAINEL = `<div class="ig ig-painel" style="--n:8"><div class="ig-top"><b>Painel por área</b><span>tudo no mesmo sistema</span><small>Dados de exemplo</small></div><div class="ig-grid"><div class="ig-card" style="--i:1"><b>Comercial</b><strong>18</strong><span>propostas abertas</span><i>sincronizado</i></div><div class="ig-card" style="--i:0"><b>Marketing</b><strong>240</strong><span>leads no mês</span><i>sincronizado</i></div><div class="ig-card" style="--i:2"><b>Suprimentos</b><strong>96%</strong><span>itens em estoque</span><i>sincronizado</i></div><div class="ig-card" style="--i:3"><b>Operações</b><strong>32</strong><span>ordens em andamento</span><i>sincronizado</i></div><div class="ig-card" style="--i:5"><b>Financeiro</b><strong>R$ 48 mil</strong><span>a receber hoje</span><i>sincronizado</i></div><div class="ig-card" style="--i:4"><b>Pessoas</b><strong>14</strong><span>pessoas escaladas</span><i>sincronizado</i></div><div class="ig-card" style="--i:6"><b>Atendimento</b><strong>1 min</strong><span>tempo de resposta</span><i>sincronizado</i></div><div class="ig-card" style="--i:7"><b>TI</b><strong>8/8</strong><span>integrações ativas</span><i>sincronizado</i></div></div></div>`;
export const IG_FEED = `<div class="ig ig-feed" style="--n:8"><div class="ig-top"><b>Pedido de exemplo</b><small>Dados de exemplo</small></div><ol><li style="--i:0"><b>Marketing</b><span>Lead captado no site</span></li><li style="--i:1"><b>Comercial</b><span>Proposta aprovada</span></li><li style="--i:2"><b>Suprimentos</b><span>Material reservado no estoque</span></li><li style="--i:3"><b>Operações</b><span>Execução agendada</span></li><li style="--i:4"><b>Pessoas</b><span>Equipe escalada</span></li><li style="--i:5"><b>Financeiro</b><span>Cobrança emitida</span></li><li style="--i:6"><b>Atendimento</b><span>Cliente avisado no WhatsApp</span></li><li style="--i:7"><b>TI</b><span>Acessos e integrações ativos</span></li></ol></div>`;
export const areas = () => scene(mon(IG_MAPA) + tab(IG_PAINEL), 'Monitor e tablet com um sistema sob medida conectando as áreas da empresa: marketing, comercial, suprimentos, operações, pessoas, financeiro, atendimento e TI, com dados de exemplo');

// ---------------------------------------------------------------- cenas por serviço (abertura das páginas)
export const SCENES = {
  sites: () => realSites(),
  software: () => areas(),
  apps: () => scene(mac(shot('agenda')) + phone(appScreen), 'Notebook com o painel do sistema e o celular com o aplicativo de agendamento ligado a ele, com dados de exemplo'),
  seo: () => scene(mac(serpScreen) + phone(serpMobile), 'Notebook com uma página de resultados de busca em que o site da empresa sobe até a primeira posição, e o celular com o perfil da empresa no mapa'),
  geo: () => scene(mac(aiScreen) + phone(aiMobile), 'Notebook e celular com um assistente de inteligência artificial respondendo a uma pergunta e citando o site da empresa como fonte'),
  agents: () => scene(mac(inbox) + phone(chat()), 'Celular com um agente de IA atendendo no WhatsApp e agendando um horário, e o notebook com a caixa de conversas'),
};

// ---------------------------------------------------------------- home: produtos
export const homeAurora = () => auroraStack('agenda');
export const homeEngageBot = () => scene(phone(engChat), 'Celular com o EngageBot atendendo no WhatsApp: o cliente pergunta, o agente identifica a intenção e responde com o conteúdo da empresa', 'solo');
