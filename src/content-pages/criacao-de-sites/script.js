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

  // ---------------------------------------------------------------- anatomia em camadas
  var stack = document.querySelector('[data-k3-stack]');
  if (stack) {
    var rot = stack.firstElementChild, planes = [].slice.call(rot.children), items = [].slice.call(document.querySelectorAll('[data-k3-layer]'));
    var n = planes.length;
    var place = function (open) { planes.forEach(function (p, i) { p.style.transform = 'translateZ(' + ((i - (n - 1)/2)*(open ? 70 : 34)) + 'px)'; }); };
    var light = function (i) { planes.forEach(function (p, k) { p.classList.toggle('lit', k === i); }); items.forEach(function (it, k) { it.classList.toggle('lit', k === i); }); };
    items.forEach(function (it, i) { it.addEventListener('pointerenter', function () { light(i); }); it.addEventListener('pointerleave', function () { light(-1); }); });
    place(false);
    var onScroll = function () {
      var b = stack.getBoundingClientRect(), p = Math.min(1, Math.max(0, 1 - (b.top + b.height/2)/innerHeight));
      place(p > .25);
      if (!reduce) { rot.style.transform = 'rotateX(' + (60 - p*12) + 'deg) rotateZ(' + (-36 + p*20) + 'deg)'; var i = Math.min(n - 1, Math.floor(Math.max(0, p - .3)/.5*n)); if (p > .3 && p < .85) light(n - 1 - i); }
    };
    addEventListener('scroll', onScroll, { passive: true }); onScroll();
  }
})();

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
