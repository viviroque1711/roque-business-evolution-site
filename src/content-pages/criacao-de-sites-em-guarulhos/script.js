// PÁGINAS DOS GANCHOS: objeto 3D da abertura (um por serviço, desenhado em canvas, girando em câmera lenta)
// e camadas 3D da "anatomia". Todo o texto já está no HTML; isto só dá movimento. Respeita prefers-reduced-motion.
(function () {
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var dpr = Math.min(2, window.devicePixelRatio || 1);
  var GOLD = [192, 138, 30], STEEL = [143, 163, 191];
  var c = document.querySelector('[data-k3-obj]');

  // ---------------------------------------------------------------- formas de cada serviço
  // Cada forma devolve { quads: [[p1,p2,p3,p4, estilo]], lines: [[a,b,estilo]], dots: [[p,r,estilo]] } para o tempo t.
  function rect(cx, cy, cz, w, h) { return [[cx-w/2, cy-h/2, cz], [cx+w/2, cy-h/2, cz], [cx+w/2, cy+h/2, cz], [cx-w/2, cy+h/2, cz]]; }
  var SHAPES = {
    // três janelas de navegador se separando e se juntando: as camadas de um site
    sites: function (t) {
      var q = [], l = [], gap = .42 + .22*Math.sin(t*.35);
      [-1, 0, 1].forEach(function (k, i) {
        var z = k*gap, w = 1.5, h = 1.0;
        q.push(rect(0, 0, z, w, h).concat([i === 2 ? 'front' : 'glass']));
        q.push(rect(0, -h/2 + .07, z, w, .14).concat(['bar']));
        if (i === 0) { q.push(rect(-.32, .05, z, .7, .42).concat(['block'])); q.push(rect(.4, .05, z, .5, .42).concat(['blockg'])); }
        if (i === 1) { [-.18, -.02, .14, .3].forEach(function (y, j) { q.push(rect(-.1, y, z, j === 0 ? 1.1 : .9 - j*.12, .06).concat(['line'])); }); }
        if (i === 2) { q.push(rect(-.25, -.05, z, .8, .12).concat(['blockg'])); q.push(rect(-.38, .2, z, .5, .1).concat(['block'])); q.push(rect(.45, .32, z, .34, .12).concat(['cta'])); }
      });
      [[-.75, -.5], [.75, -.5], [.75, .5], [-.75, .5]].forEach(function (p) { l.push([[p[0], p[1], -gap], [p[0], p[1], gap], 'edge']); });
      return { quads: q, lines: l, dots: [] };
    },
    // módulos (cubos) ligados por linhas: o sistema sob medida montando-se
    software: function (t) {
      var q = [], l = [], d = [], s = .32, pos = [];
      for (var x = -1; x <= 1; x++) for (var z = -1; z <= 1; z++) { var y = ((x + z + 3) % 3 - 1)*.12 + Math.sin(t*.5 + x + z*2)*.06; pos.push([x*.62, y, z*.62]); }
      pos.forEach(function (p, i) {
        var hot = (Math.floor(t/2.4) % pos.length) === i, st = hot ? 'cubeg' : 'cube';
        var x = p[0], y = p[1], z = p[2], h = s/2;
        q.push([[x-h,y-h,z-h],[x+h,y-h,z-h],[x+h,y+h,z-h],[x-h,y+h,z-h], st]);
        q.push([[x-h,y-h,z+h],[x+h,y-h,z+h],[x+h,y+h,z+h],[x-h,y+h,z+h], st]);
        q.push([[x-h,y-h,z-h],[x-h,y-h,z+h],[x-h,y+h,z+h],[x-h,y+h,z-h], st]);
        q.push([[x+h,y-h,z-h],[x+h,y-h,z+h],[x+h,y+h,z+h],[x+h,y+h,z-h], st]);
        q.push([[x-h,y-h,z-h],[x+h,y-h,z-h],[x+h,y-h,z+h],[x-h,y-h,z+h], hot ? 'topg' : 'top']);
      });
      [[0,1],[1,2],[3,4],[4,5],[6,7],[7,8],[0,3],[3,6],[1,4],[4,7],[2,5],[5,8]].forEach(function (e) { l.push([pos[e[0]], pos[e[1]], 'wire']); });
      return { quads: q, lines: l, dots: d };
    },
    // celular com telas e ícones em órbita: o aplicativo
    apps: function (t) {
      var q = [], d = [], w = .78, h = 1.55;
      q.push(rect(0, 0, 0, w, h).concat(['phone']));
      q.push(rect(0, 0, .01, w - .1, h - .16).concat(['screen']));
      q.push(rect(0, -.55, .02, w - .22, .16).concat(['blockg']));
      [-.28, -.05, .18].forEach(function (y, i) { q.push(rect(-.08, y, .02, w - .4, .14).concat([i === 1 ? 'block' : 'line'])); q.push(rect(.22, y, .02, .12, .14).concat(['blockg'])); });
      q.push(rect(0, .52, .02, w - .3, .14).concat(['cta']));
      for (var k = 0; k < 6; k++) { var a = t*.32 + k*Math.PI/3, r = 1.05; var x = Math.cos(a)*r, z = Math.sin(a)*r, y = -.55 + k*.22; q.push(rect(x, y, z, .2, .2).concat([k % 2 ? 'icon' : 'icong'])); }
      return { quads: q, lines: [], dots: d };
    },
    // resultados de busca empilhados; o dourado sobe até o topo em câmera lenta
    seo: function (t) {
      var q = [], n = 6, cyc = (t*.09) % 1, rise = cyc < .7 ? cyc/.7 : 1, ease = 1 - Math.pow(1 - rise, 3);
      var from = n - 1, at = from - ease*from;
      for (var i = 0; i < n; i++) {
        q.push(rect(0, -.85 + i*.34, 0, 1.6, .26).concat(['result']));
        q.push(rect(-.5, -.85 + i*.34 - .05, .01, .42, .05).concat(['line']));
      }
      var gy = -.85 + at*.34;
      q.push(rect(0, gy, .18, 1.66, .28).concat(['resultg']));
      q.push(rect(-.48, gy - .05, .19, .5, .06).concat(['cta']));
      q.push(rect(0, -1.25, 0, 1.6, .2).concat(['search']));
      return { quads: q, lines: [], dots: [] };
    },
    // esfera de pontos com balões de conversa em órbita; um deles cita a empresa (fio dourado)
    geo: function (t) {
      var q = [], l = [], d = [], M = 90;
      for (var k = 0; k < M; k++) { var y = 1 - (k + .5)/M*2, rad = Math.sqrt(1 - y*y), th = k*2.39996; d.push([[Math.cos(th)*rad*.72, y*.72, Math.sin(th)*rad*.72], 2.3, 'pt']); }
      var hub = [.0, .0, .72];
      for (var b = 0; b < 3; b++) {
        var a = t*.25 + b*2.1, r = 1.18, x = Math.cos(a)*r, z = Math.sin(a)*r, yy = -.5 + b*.5;
        q.push(rect(x, yy, z, .52, .3).concat([b === 0 ? 'bubbleg' : 'bubble']));
        q.push(rect(x - .06, yy - .04, z + .001, .3, .04).concat(['line']));
        q.push(rect(x - .1, yy + .05, z + .001, .22, .04).concat(['line']));
        if (b === 0) l.push([[x, yy, z], hub, 'cite']);
      }
      d.push([hub, 4.5, 'hub']);
      return { quads: q, lines: l, dots: d };
    },
    // agente no centro, ligado aos canais (WhatsApp, site, CRM, agenda) que giram em volta; pulsos correm pelos fios
    agents: function (t) {
      var q = [], l = [], d = [], hub = [0, 0, 0];
      for (var k = 0; k < 4; k++) {
        var a = t*.22 + k*Math.PI/2, r = 1.12, x = Math.cos(a)*r, z = Math.sin(a)*r, y = (k % 2 ? .38 : -.38);
        q.push(rect(x, y, z, .5, .34).concat([k === 0 ? 'bubbleg' : 'bubble']));
        q.push(rect(x - .04, y - .05, z + .001, .3, .05).concat(['line']));
        q.push(rect(x - .08, y + .06, z + .001, .22, .05).concat([k === 0 ? 'blockg' : 'line']));
        l.push([hub, [x, y, z], 'cite']);
        var p = (t*.35 + k*.25) % 1; d.push([[x*p, y*p, z*p], 3, 'pulse']);
      }
      for (var m = 0; m < 40; m++) { var yy = 1 - (m + .5)/40*2, rr = Math.sqrt(1 - yy*yy), th = m*2.39996; d.push([[Math.cos(th)*rr*.34, yy*.34, Math.sin(th)*rr*.34], 1.8, 'pt']); }
      d.push([hub, 6, 'hub']);
      return { quads: q, lines: l, dots: d };
    },
  };
  var FILL = {
    glass: [STEEL, .08, .75], front: [STEEL, .14, 1], bar: [STEEL, .3, .6], block: [STEEL, .42, 0], blockg: [GOLD, .8, 0], line: [STEEL, .6, 0], cta: [GOLD, 1, 0],
    cube: [STEEL, .12, .8], cubeg: [GOLD, .35, 1], top: [STEEL, .22, .85], topg: [GOLD, .65, 1], phone: [[40, 50, 68], 1, .9], screen: [[11, 18, 32], 1, 0],
    icon: [STEEL, .5, .8], icong: [GOLD, .8, 1], result: [STEEL, .14, .6], resultg: [GOLD, .32, 1], search: [STEEL, .2, .9], bubble: [STEEL, .2, .8], bubbleg: [GOLD, .38, 1],
  };
  var SCALE = { sites: .36, software: .38, apps: .34, seo: .32, geo: .29, agents: .30 };
  var STROKE_GOLD = { cubeg: 1, topg: 1, resultg: 1, bubbleg: 1, icong: 1, front: 1, glass: 1 };

  if (c) {
    var mode = c.getAttribute('data-k3-obj'), shape = SHAPES[mode] || SHAPES.sites, g = c.getContext('2d');
    var st = { w: 0, tx: 0, ty: 0, ax: 0, ay: 0, t0: performance.now(), run: true, vis: true };
    var size = function () { var b = c.getBoundingClientRect(); st.w = b.width; c.width = b.width*dpr; c.height = b.width*dpr; };
    c.parentElement.addEventListener('pointermove', function (e) { var b = c.getBoundingClientRect(); st.tx = ((e.clientY - b.top)/b.height - .5)*.35; st.ty = ((e.clientX - b.left)/b.width - .5)*.6; });
    c.parentElement.addEventListener('pointerleave', function () { st.tx = 0; st.ty = 0; });
    var col = function (rgb, a) { return 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',' + a + ')'; };
    var frame = function (now) {
      var t = reduce ? 4 : (now - st.t0)/1000, intro = reduce ? 1 : Math.min(1, t/2.4), e = 1 - Math.pow(1 - intro, 3);
      st.ax += (st.tx - st.ax)*.04; st.ay += (st.ty - st.ay)*.04;
      var swing = mode === 'apps' || mode === 'seo' || mode === 'agents' ? Math.sin(t*.22)*.55 : t*(Math.PI*2/40);
      var ay = -.6 + swing + st.ay + (1 - e)*.9, ax = -.32 + st.ax + (mode === 'seo' ? .1 : 0);
      var ca = Math.cos(ay), sa = Math.sin(ay), cb = Math.cos(ax), sb = Math.sin(ax), S = st.w*(SCALE[mode] || .36)*dpr*(.85 + .15*e), ox = c.width/2, oy = c.height/2;
      var P = function (p) { var x = p[0]*ca + p[2]*sa, z = -p[0]*sa + p[2]*ca, y = p[1]*cb - z*sb; z = p[1]*sb + z*cb; var k = 1/(1 - z*.22); return [ox + x*S*k, oy + y*S*k, z]; };
      var sh = shape(t);
      g.clearRect(0, 0, c.width, c.height);
      var halo = g.createRadialGradient(ox, oy, S*.1, ox, oy, Math.min(S*1.7, c.width/2, c.height/2)); halo.addColorStop(0, 'rgba(192,138,30,.10)'); halo.addColorStop(1, 'rgba(192,138,30,0)'); g.fillStyle = halo; g.fillRect(0, 0, c.width, c.height);
      var items = [];
      sh.quads.forEach(function (qd) { var pts = qd.slice(0, 4).map(P), z = (pts[0][2] + pts[1][2] + pts[2][2] + pts[3][2])/4; items.push({ z: z, q: pts, s: qd[4] }); });
      sh.lines.forEach(function (ln) { var a = P(ln[0]), b = P(ln[1]); items.push({ z: (a[2] + b[2])/2 - .001, l: [a, b], s: ln[2] }); });
      sh.dots.forEach(function (dt) { var a = P(dt[0]); items.push({ z: a[2], d: a, r: dt[1], s: dt[2] }); });
      items.sort(function (u, v) { return u.z - v.z; });
      items.forEach(function (it) {
        var depth = (it.z + 1.6)/3.2; depth = Math.max(.25, Math.min(1, depth));
        if (it.q) {
          var f = FILL[it.s] || FILL.glass;
          g.beginPath(); g.moveTo(it.q[0][0], it.q[0][1]); for (var i = 1; i < 4; i++) g.lineTo(it.q[i][0], it.q[i][1]); g.closePath();
          g.fillStyle = col(f[0], f[1]*e); g.fill();
          if (f[2]) { g.strokeStyle = STROKE_GOLD[it.s] ? col(GOLD, f[2]*e*depth) : col(STEEL, f[2]*.6*e*depth); g.lineWidth = 1.5*dpr; g.stroke(); }
        } else if (it.l) {
          g.strokeStyle = it.s === 'cite' ? col(GOLD, .85*e) : col(it.s === 'edge' ? STEEL : GOLD, .35*e*depth); g.lineWidth = (it.s === 'cite' ? 1.6 : 1)*dpr;
          if (it.s === 'cite') g.setLineDash([3*dpr, 5*dpr]);
          g.beginPath(); g.moveTo(it.l[0][0], it.l[0][1]); g.lineTo(it.l[1][0], it.l[1][1]); g.stroke(); g.setLineDash([]);
        } else {
          var hub = it.s === 'hub';
          if (hub) { var gr = g.createRadialGradient(it.d[0], it.d[1], 0, it.d[0], it.d[1], 18*dpr); gr.addColorStop(0, 'rgba(255,214,140,.7)'); gr.addColorStop(1, 'rgba(255,214,140,0)'); g.fillStyle = gr; g.beginPath(); g.arc(it.d[0], it.d[1], 18*dpr, 0, Math.PI*2); g.fill(); }
          g.fillStyle = hub || it.s === 'pulse' ? col(it.s === 'pulse' ? [255, 214, 140] : GOLD, e) : col(it.z > 0 ? GOLD : STEEL, (.25 + .6*depth)*e);
          g.beginPath(); g.arc(it.d[0], it.d[1], it.r*dpr, 0, Math.PI*2); g.fill();
        }
      });
      if ((!reduce || intro < 1) && st.vis) requestAnimationFrame(frame); else st.run = false;
    };
    size(); addEventListener('resize', size);
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { st.vis = es[0].isIntersecting; if (st.vis && !st.run && !reduce) { st.run = true; requestAnimationFrame(frame); } }).observe(c);
    requestAnimationFrame(frame);
  }

  // ---------------------------------------------------------------- anatomia em placas 3D: a pilha monta e desmonta sozinha
  // (sem depender da rolagem); a camada acesa troca a cada 3,5 s; mouse, foco ou toque numa camada vira a placa de frente.
  var box = document.querySelector('[data-cm3]');
  if (box) {
    var placas = [].slice.call(box.querySelectorAll('.cm3-placa')), items = [].slice.call(document.querySelectorAll('[data-k3-layer]'));
    var n = placas.length, vis = false, raf = 0, t0 = performance.now(), fixo = -1, fAtual = 0, ultimo = 'mouse';
    var acende = function (k) { placas.forEach(function (p, i) { p.classList.toggle('acesa', i === k); }); items.forEach(function (it, i) { it.classList.toggle('lit', i === k); }); };
    var vira = function () {
      var br = box.getBoundingClientRect();
      placas.forEach(function (p, i) {
        var on = i === fixo, tela = p.querySelector('.cm-tela'), dev = p.querySelector('.rx');
        p.classList.toggle('vira', on);
        if (on) {
          var dr = dev.getBoundingClientRect(), s = Math.min(br.width * 1.02 / tela.offsetWidth, br.height * .9 / tela.offsetHeight);
          var tx = br.left + br.width / 2 - dr.left - tela.offsetWidth * s / 2, ty = br.top + br.height / 2 - dr.top - tela.offsetHeight * s / 2;
          tela.classList.add('frente'); tela.style.transform = 'matrix3d(' + s + ',0,0,0,0,' + s + ',0,0,0,0,1,0,' + tx.toFixed(1) + ',' + ty.toFixed(1) + ',0,1)';
        } else if (tela.classList.contains('frente')) { tela.classList.remove('frente'); if (tela.dataset.h) tela.style.transform = tela.dataset.h; }
      });
      box.classList.toggle('virou', fixo >= 0);
    };
    var frame = function (now) {
      var w = box.clientWidth, g0 = w * .07, g1 = w * .15, s = (now - t0) / 1000;
      var alvo = fixo >= 0 ? 1 : (reduce ? .5 : .5 - .5 * Math.cos(s / 9 * Math.PI * 2));
      fAtual = reduce ? alvo : fAtual + (alvo - fAtual) * (fixo >= 0 ? .12 : .5);
      var gap = (g0 + (g1 - g0) * fAtual).toFixed(1) + 'px';
      placas.forEach(function (p) { p.style.setProperty('--gap', gap); });
      if (fixo < 0) acende(Math.floor(s / 3.5) % n);
      vira();
      raf = vis && !reduce && !document.hidden ? requestAnimationFrame(frame) : 0;
    };
    var liga = function () { if (!raf) raf = requestAnimationFrame(frame); };
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { vis = es[0].isIntersecting; if (vis) liga(); }, { threshold: .15 }).observe(box); else { vis = true; liga(); }
    document.addEventListener('visibilitychange', function () { if (!document.hidden && vis) liga(); });
    addEventListener('pointerdown', function (e) { ultimo = e.pointerType; }, { capture: true, passive: true });
    items.forEach(function (it, i) {
      var pega = function () { fixo = i; acende(i); liga(); }, solta = function () { fixo = -1; liga(); };
      it.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') pega(); });
      it.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse') solta(); });
      it.addEventListener('focus', pega); it.addEventListener('blur', solta);
      it.addEventListener('click', function () { if (ultimo !== 'mouse') { if (fixo === i) solta(); else pega(); } });
    });
    frame(performance.now());
  }
})();

window.RX_TELAS={"notebook": {"w": 1400, "h": 933, "telas": [{"tl": [104.8, 76.6], "tr": [815.8, 138.5], "br": [888.7, 567.8], "bl": [174.1, 639.8]}]}, "notebook-e-celular": {"w": 1400, "h": 933, "telas": [{"tl": [464.8, 152.2], "tr": [1138.4, 99.3], "br": [1071.9, 621.6], "bl": [403.8, 561.5]}, {"tl": [1097.4, 249.7], "tr": [1282.4, 251.6], "br": [1328.9, 741.0], "bl": [1133.9, 752.9]}]}, "celular-em-pe": {"w": 720, "h": 1080, "telas": [{"tl": [215.9, 92.8], "tr": [505.5, 120.2], "br": [552.7, 922.5], "bl": [240.5, 936.6]}]}, "celular-inclinado": {"w": 720, "h": 1080, "telas": [{"tl": [150.5, 113.2], "tr": [425.4, 149.1], "br": [602.6, 890.9], "bl": [301.6, 835.3]}]}, "monitor-e-tablet": {"w": 1400, "h": 933, "telas": [{"tl": [86.6, 48.6], "tr": [897.7, 151.1], "br": [913.7, 587.5], "bl": [86.6, 620.8]}, {"tl": [983.1, 482.6], "tr": [1341.9, 473.2], "br": [1292.5, 753.0], "bl": [912.5, 722.1]}]}, "placa": {"w": 1000, "h": 453, "telas": [{"tl": [42.5, 229.3], "tr": [616.2, 25.5], "br": [953.7, 203.1], "bl": [351.4, 392.3]}]}};
// APARELHOS: inclinação suave com o mouse e pausa das animações quando a cena sai da tela. Sem dependências.
(function () {
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var scenes = [].slice.call(document.querySelectorAll('[data-dv]'));
  scenes.forEach(function (s) {
    var tilt = s.querySelector('.dv-tilt');
    if (!reduce && tilt && matchMedia('(pointer: fine)').matches) {
      s.addEventListener('pointermove', function (e) {
        var b = s.getBoundingClientRect(), x = (e.clientX - b.left) / b.width - .5, y = (e.clientY - b.top) / b.height - .5;
        tilt.style.setProperty('--ry', (-16 + x * 14).toFixed(1) + 'deg');
        tilt.style.setProperty('--rx', (7 - y * 8).toFixed(1) + 'deg');
      });
      s.addEventListener('pointerleave', function () { tilt.style.removeProperty('--ry'); tilt.style.removeProperty('--rx'); });
    }
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) { es.forEach(function (en) { s.classList.toggle('dv-paused', !en.isIntersecting); }); }, { threshold: 0 }).observe(s);
    }
  });
})();

// ENCAIXE DAS TELAS NAS ARTES REALISTAS: a interface fica atrás da moldura (tela verde recortada) e é deformada com a
// perspectiva exata da tela (homografia de 4 pontos -> matrix3d). Cantos medidos nas imagens (RX_TELAS, devices.mjs).
(function () {
  var T = window.RX_TELAS || {};
  function solve(A, b) { var n = b.length, i, j, k; for (i = 0; i < n; i++) { var mx = i; for (k = i + 1; k < n; k++) if (Math.abs(A[k][i]) > Math.abs(A[mx][i])) mx = k; var t = A[i]; A[i] = A[mx]; A[mx] = t; var tb = b[i]; b[i] = b[mx]; b[mx] = tb; for (k = i + 1; k < n; k++) { var f = A[k][i] / A[i][i]; b[k] -= f * b[i]; for (j = i; j < n; j++) A[k][j] -= f * A[i][j]; } } var x = new Array(n); for (i = n - 1; i >= 0; i--) { var s = b[i]; for (j = i + 1; j < n; j++) s -= A[i][j] * x[j]; x[i] = s / A[i][i]; } return x; }
  function matrix(w, h, q) { var src = [[0, 0], [w, 0], [w, h], [0, h]], A = [], b = []; for (var i = 0; i < 4; i++) { var x = src[i][0], y = src[i][1], u = q[i][0], v = q[i][1]; A.push([x, y, 1, 0, 0, 0, -u * x, -u * y]); b.push(u); A.push([0, 0, 0, x, y, 1, -v * x, -v * y]); b.push(v); } var m = solve(A, b); return 'matrix3d(' + [m[0], m[3], 0, m[6], m[1], m[4], 0, m[7], 0, 0, 1, 0, m[2], m[5], 0, 1].map(function (n) { return +n.toFixed(8); }).join(',') + ')'; }
  function grow(q, f) { var cx = 0, cy = 0; q.forEach(function (p) { cx += p[0] / 4; cy += p[1] / 4; }); return q.map(function (p) { return [cx + (p[0] - cx) * f, cy + (p[1] - cy) * f]; }); }
  function fit(dev) {
    var name = dev.getAttribute('data-dev'), d = T[name]; if (!d) return;
    var img = dev.querySelector('.rx-moldura'); if (!img) return; var sc = img.clientWidth / d.w; if (!sc) return;
    [].slice.call(dev.querySelectorAll('.rx-tela')).forEach(function (el) {
      var k = +el.getAttribute('data-tela') || 0, t = d.telas[k]; if (!t) return;
      var q = grow([t.tl, t.tr, t.br, t.bl], name === 'placa' ? 1.004 : name.indexOf('celular') >= 0 || k === 1 ? 1.035 : 1.012).map(function (p) { return [p[0] * sc, p[1] * sc]; });
      el.dataset.h = matrix(el.offsetWidth, el.offsetHeight, q);
      if (!el.classList.contains('frente')) el.style.transform = el.dataset.h;  // placa que virou de frente fica de frente
    });
    dev.classList.add('rx-ok');
  }
  function all() { [].slice.call(document.querySelectorAll('.rx[data-dev]')).forEach(fit); }
  all(); addEventListener('resize', all); addEventListener('load', all);
  [].slice.call(document.querySelectorAll('.rx .rx-moldura')).forEach(function (im) { if (!im.complete) im.addEventListener('load', all); });
  if ('ResizeObserver' in window) { var ro = new ResizeObserver(all); [].slice.call(document.querySelectorAll('.rx')).forEach(function (el) { ro.observe(el); }); }
})();

// pausa as animações das telas enquanto a pessoa rola a página (ver devices.css, .rx-rolando)
(function () { var de = document.documentElement, t = 0; addEventListener('scroll', function () { if (!t) de.classList.add('rx-rolando'); clearTimeout(t); t = setTimeout(function () { de.classList.remove('rx-rolando'); t = 0; }, 250); }, { passive: true }); })();

// imagens secundárias das telas (data-src): só depois que a página carregou, para a primeira dobra ficar leve
(function () { function solta() { [].slice.call(document.querySelectorAll('.rx img[data-src]')).forEach(function (im) { im.src = im.getAttribute('data-src'); im.removeAttribute('data-src'); }); }
  if (document.readyState === 'complete') setTimeout(solta, 3000); else addEventListener('load', function () { setTimeout(solta, 3000); });
  addEventListener('scroll', solta, { passive: true, once: true }); })();
