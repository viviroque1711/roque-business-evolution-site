// APARELHOS DA ABERTURA (22/10/2026): notebook e celular realistas, sem marca, com a interface de cada serviço
// montando na tela em câmera lenta. Substitui as formas abstratas (cubos, camadas, esferas) das páginas de serviço
// e as formas da seção de produtos da home. Tudo em HTML e CSS; o JS só inclina com o mouse e pausa fora da tela.
// Regras: nenhum número de resultado, nenhum cliente; os dados das telas são "de exemplo" e o site citado é
// sempre o do cliente ("suaempresa.com.br"). Telas do Aurora Premium são as reais (public/img).
import fs from 'node:fs';
import path from 'node:path';

export const DEVICE_CSS = fs.readFileSync(path.join(import.meta.dirname, 'devices.css'), 'utf8');
export const DEVICE_JS = fs.readFileSync(path.join(import.meta.dirname, 'devices.js'), 'utf8');

const d = (n) => ` style="--d:${n}s"`; // atraso de entrada de cada peça
const lines = (n, w = [92, 78, 64]) => Array.from({ length: n }, (_, i) => `<i class="ln" style="width:${w[i % w.length]}%"></i>`).join('');
const TICK = '<svg viewBox="0 0 16 11" aria-hidden="true"><path d="M1 6l3 3 6-7M6 9l1 1 7-8" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>';

const mac = (screen, cls = '') => `<div class="dv-mac ${cls}"><div class="lid"><div class="bezel"><i class="cam"></i><div class="screen">${screen}</div></div></div><div class="base"><i></i></div></div>`;
const phone = (screen, cls = '') => `<div class="dv-phone ${cls}"><div class="frame"><div class="screen"><i class="island"></i><div class="status"><b>9:41</b><span></span></div>${screen}</div></div></div>`;
const scene = (inner, label, extra = '') => `<div class="dv-scene ${extra}" data-dv role="img" aria-label="${label}"><div class="dv-tilt"><div class="dv-rig">${inner}</div></div><i class="dv-floor" aria-hidden="true"></i></div>`;

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
<div class="res">${[0, 1, 2, 3].map((i) => `<div class="r r${i}"><small>site${i + 1}.com.br</small><b class="ln" style="width:${[62, 70, 55, 66][i]}%"></b><i class="ln" style="width:88%"></i></div>`).join('')}
<div class="r me"><small>suaempresa.com.br</small><b>Criação de sites em Guarulhos | Sua Empresa</b><i class="ln" style="width:88%"></i></div></div></div>`;

const serpMobile = `<div class="ui ui-mserp"><div class="q"${d(.4)}><i class="mg"></i>criação de sites</div><div class="map"${d(.9)}><i class="pin"></i></div><div class="me"${d(1.6)}><b>Sua Empresa</b><small>Criação de sites · Guarulhos</small><span><i>Ligar</i><i>WhatsApp</i><i>Site</i></span></div><div class="r"${d(2.2)}>${lines(2, [70, 90])}</div></div>`;

const aiQuestion = 'Qual empresa faz criação de sites com SEO em Guarulhos?';
const aiScreen = `<div class="ui ui-ai"><aside${d(.2)}><i class="nb"></i><i class="ln"></i><i class="ln"></i><i class="ln"></i><i class="ln"></i></aside>
<div class="ui-main"><div class="u"${d(.6)}>${aiQuestion}</div>
<div class="a"><i class="spark"${d(1.2)}></i><div>${[96, 88, 92, 70].map((w, i) => `<i class="ln" style="width:${w}%;--d:${1.5 + i * .45}s"></i>`).join('')}<div class="src"${d(3.6)}><small>Fontes</small><span class="me">suaempresa.com.br</span><span>guia-local.com.br</span></div></div></div>
<div class="input"${d(.3)}><i></i></div></div></div>`;

const aiMobile = `<div class="ui ui-mai"><div class="u"${d(.6)}>${aiQuestion}</div><div class="a">${[94, 86, 90, 64].map((w, i) => `<i class="ln" style="width:${w}%;--d:${1.5 + i * .45}s"></i>`).join('')}<span class="me"${d(3.6)}>suaempresa.com.br</span></div></div>`;

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

// ---------------------------------------------------------------- cenas por serviço (abertura das páginas)
export const SCENES = {
  sites: () => scene(mac(siteScreen) + phone(siteMobile), 'Notebook e celular mostrando um site profissional sendo montado: cabeçalho, título, botão do WhatsApp e seções'),
  software: () => scene(mac(dashboard('Sistema de pedidos')) + phone(appScreen), 'Notebook com um sistema sob medida abrindo: menu, indicadores, gráfico e tabela, e o celular com o aplicativo do mesmo sistema'),
  apps: () => scene(mac(dashboard('Painel do aplicativo'), 'back') + phone(appScreen, 'front'), 'Celular com um aplicativo de agenda recebendo um novo agendamento, ligado ao painel no notebook', 'focus-phone'),
  seo: () => scene(mac(serpScreen) + phone(serpMobile), 'Notebook com uma página de resultados de busca em que o site da empresa sobe até a primeira posição, e o celular com o perfil da empresa no mapa'),
  geo: () => scene(mac(aiScreen) + phone(aiMobile), 'Notebook e celular com um assistente de inteligência artificial respondendo a uma pergunta e citando o site da empresa como fonte'),
  agents: () => scene(mac(inbox) + phone(chat()), 'Celular com um agente de IA atendendo no WhatsApp e agendando um horário, e o notebook com a caixa de conversas'),
};

// ---------------------------------------------------------------- home: produtos
export const homeAurora = () => `<div class="dv-scene dv-photo" data-dv role="img" aria-label="Aurora Premium no notebook e no celular: agenda online com os profissionais do dia"><div class="dv-tilt"><div class="dv-rig"><img src="/img/aurora-premium-sistema-de-agendamento.webp" srcset="/img/aurora-premium-sistema-de-agendamento-640w.webp 640w, /img/aurora-premium-sistema-de-agendamento.webp 976w" sizes="(min-width: 900px) 600px, 92vw" width="976" height="673" alt="" loading="lazy" decoding="async"></div></div><i class="dv-floor" aria-hidden="true"></i></div>`;
export const homeEngageBot = () => scene(phone(chat('Sua Empresa')), 'Celular com o EngageBot atendendo no WhatsApp: o cliente pergunta, o agente responde e reserva o horário', 'solo');
