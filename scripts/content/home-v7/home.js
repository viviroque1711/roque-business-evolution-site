window.TELAS={"monitor-e-tablet": {"w": 1400, "h": 933, "telas": [{"tl": [86.6, 48.6], "tr": [897.7, 151.1], "br": [913.7, 587.5], "bl": [86.6, 620.8]}, {"tl": [983.1, 482.6], "tr": [1341.9, 473.2], "br": [1292.5, 753.0], "bl": [912.5, 722.1]}]}, "placa": {"w": 1000, "h": 453, "telas": [{"tl": [42.5, 229.3], "tr": [616.2, 25.5], "br": [953.7, 203.1], "bl": [351.4, 392.3]}]}, "celular-em-pe": {"w": 720, "h": 1080, "telas": [{"tl": [215.9, 92.8], "tr": [505.5, 120.2], "br": [552.7, 922.5], "bl": [240.5, 936.6]}]}, "celular-inclinado": {"w": 720, "h": 1080, "telas": [{"tl": [150.5, 113.2], "tr": [425.4, 149.1], "br": [602.6, 890.9], "bl": [301.6, 835.3]}]}, "notebook-e-celular": {"w": 1400, "h": 933, "telas": [{"tl": [464.8, 152.2], "tr": [1138.4, 99.3], "br": [1071.9, 621.6], "bl": [403.8, 561.5]}, {"tl": [1097.4, 249.7], "tr": [1282.4, 251.6], "br": [1328.9, 741.0], "bl": [1133.9, 752.9]}]}, "notebook": {"w": 1400, "h": 933, "telas": [{"tl": [104.8, 76.6], "tr": [815.8, 138.5], "br": [888.7, 567.8], "bl": [174.1, 639.8]}]}};window.CONTORNOS={"monitor-e-tablet": [[69, 102], [72, 51], [93, 37], [859, 137], [898, 143], [1358, 468], [1363, 474], [1360, 782], [351, 782], [76, 644], [70, 635], [68, 578]], "notebook": [[148, 745], [88, 280], [73, 84], [79, 60], [101, 48], [314, 55], [802, 114], [820, 124], [1346, 669], [1347, 745]], "celular-inclinado": [[588, 927], [264, 873], [217, 784], [91, 219], [91, 147], [183, 94], [383, 120], [454, 181], [542, 482], [626, 866]], "celular-em-pe": [[170, 949], [164, 943], [154, 351], [157, 138], [195, 69], [470, 95], [518, 115], [541, 192], [577, 922], [552, 949]], "notebook-e-celular": [[45, 676], [458, 140], [480, 130], [950, 80], [1128, 72], [1159, 81], [1311, 269], [1351, 713], [1354, 801], [52, 801]]};
// ENCAIXE DAS TELAS NOS APARELHOS REALISTAS: o conteúdo (HTML de verdade) fica atrás da imagem do aparelho, que tem a tela vazada,
// e é deformado com a perspectiva exata da tela (homografia de 4 pontos -> matrix3d). Recalcula quando o tamanho muda.
window.Telas = (function () {
  var DATA = null;
  function solve(A, b) { // eliminação de Gauss 8x8
    var n = b.length, i, j, k;
    for (i = 0; i < n; i++) {
      var max = i; for (k = i + 1; k < n; k++) if (Math.abs(A[k][i]) > Math.abs(A[max][i])) max = k;
      var t = A[i]; A[i] = A[max]; A[max] = t; var tb = b[i]; b[i] = b[max]; b[max] = tb;
      for (k = i + 1; k < n; k++) { var f = A[k][i] / A[i][i]; b[k] -= f * b[i]; for (j = i; j < n; j++) A[k][j] -= f * A[i][j]; }
    }
    var x = new Array(n);
    for (i = n - 1; i >= 0; i--) { var s = b[i]; for (j = i + 1; j < n; j++) s -= A[i][j] * x[j]; x[i] = s / A[i][i]; }
    return x;
  }
  function matrix(w, h, q) {
    var src = [[0, 0], [w, 0], [w, h], [0, h]], A = [], b = [];
    for (var i = 0; i < 4; i++) {
      var x = src[i][0], y = src[i][1], u = q[i][0], v = q[i][1];
      A.push([x, y, 1, 0, 0, 0, -u * x, -u * y]); b.push(u);
      A.push([0, 0, 0, x, y, 1, -v * x, -v * y]); b.push(v);
    }
    var hh = solve(A, b);
    return 'matrix3d(' + [hh[0], hh[3], 0, hh[6], hh[1], hh[4], 0, hh[7], 0, 0, 1, 0, hh[2], hh[5], 0, 1].map(function (n) { return +n.toFixed(8); }).join(',') + ')';
  }
  function grow(q, f) { // aumenta o quadrilátero a partir do centro (cobre os cantos arredondados; a moldura esconde o excesso)
    var cx = 0, cy = 0; q.forEach(function (p) { cx += p[0] / 4; cy += p[1] / 4; });
    return q.map(function (p) { return [cx + (p[0] - cx) * f, cy + (p[1] - cy) * f]; });
  }
  function fit(dev) {
    var name = dev.getAttribute('data-dev'), d = DATA && DATA[name]; if (!d) return;
    var img = dev.querySelector('.moldura'), scale = img.clientWidth / d.w;
    [].slice.call(dev.querySelectorAll('[data-tela]')).forEach(function (el) {
      var k = +el.getAttribute('data-tela') || 0, t = d.telas[k]; if (!t) return;
      var q = grow([t.tl, t.tr, t.br, t.bl], name === 'placa' ? 1.004 : name.indexOf('celular') >= 0 || k === 1 ? 1.035 : 1.012).map(function (p) { return [p[0] * scale, p[1] * scale]; });
      el.dataset.h = matrix(el.offsetWidth, el.offsetHeight, q);
      if (!el.classList.contains('frente')) el.style.transform = el.dataset.h;  // a placa que virou de frente fica de frente
    });
  }
  function all() { [].slice.call(document.querySelectorAll('[data-dev]')).forEach(fit); }
  function init(data) { DATA = data; all(); addEventListener('resize', all); [].slice.call(document.querySelectorAll('[data-dev] .moldura')).forEach(function (im) { if (!im.complete) im.addEventListener('load', all); }); }
  return { init: init, fit: all };
})();

// A REDE MONTA E DESMONTA (design system Roque, princípio "A rede monta e desmonta").
// Os nós e as linhas do logo formam o globo; a cada termo do H1 a rede se desmonta e se remonta no contorno exato do aparelho
// (notebook, monitor com tablet, celular), e então o aparelho real se materializa no lugar das linhas, com a tela de verdade.
// Canvas 2D, ~110 nós: nada de partículas soltas. Para quando sai da tela, com a aba oculta e com prefers-reduced-motion.
window.Rede = function (box, opts) {
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var cv = box.querySelector('canvas.rede'), g = cv.getContext('2d');
  var dpr = Math.min(2, devicePixelRatio || 1);
  var GOLD = '192,138,30', STEEL = '143,163,191', LIGHT = '242,214,156';
  var EASE = function (t) { // cubic-bezier(.2,.7,.2,1) aproximada
    return 1 - Math.pow(1 - t, 3.2);
  };
  var rnd = (function (s) { return function () { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; })(1998);
  var NMAX = 112;

  // ---------------------------------------------------------------- formas
  // logo: nós e ligações do símbolo da Roque
  var LN = [[166.6,172.8,7.8],[175.1,235.7,5.8],[190.8,190.4,8.0],[210.9,226.4,5.7],[216.8,161.0,8.2],[219.2,115.6,8.1],[225.0,193.7,11.0],[225.0,245.0,5.8],[241.1,132.3,4.1],[249.3,276.8,11.0],[253.4,205.5,4.0],[255.1,160.9,5.8],[264.0,113.0,2.8],[266.4,132.2,4.0],[266.4,226.5,5.4],[273.5,190.4,4.0],[277.5,146.8,4.0],[294.0,125.0,2.2],[302.4,172.9,5.4],[302.4,218.6,5.4],[307.0,143.0,2.2],[310.3,247.4,7.8],[329.9,195.9,4.1],[337.9,165.3,4.1]];
  var LE = [[0,1],[0,4],[0,5],[1,2],[1,3],[1,7],[1,9],[2,3],[2,4],[2,6],[3,6],[3,10],[4,5],[4,8],[4,11],[4,15],[5,8],[6,10],[6,11],[7,9],[7,10],[8,11],[9,10],[9,14],[9,21],[10,14],[10,15],[11,16],[15,16],[15,18],[15,19],[16,18],[18,19],[19,21],[19,22]];
  var GLOBE = (function () {
    var pts = LN.map(function (n) { var x = (n[0] - 252) / 92, y = (n[1] - 195) / 92, d = Math.hypot(x, y); if (d > .97) { x *= .97 / d; y *= .97 / d; } return { x: x, y: y, z: Math.sqrt(Math.max(0, 1 - x * x - y * y)), r: Math.max(2.2, n[2] / 92 * 13), gold: 1 }; });
    var back = [], M = 76;
    for (var k = 0; k < M; k++) { var y = 1 - (k + .5) / M * 2, rad = Math.sqrt(1 - y * y), th = k * 2.39996; var z = Math.sin(th) * rad; if (z < .1) back.push({ x: Math.cos(th) * rad, y: y, z: z, r: 1.6, gold: 0 }); }
    var all = pts.concat(back).slice(0, NMAX), edges = LE.map(function (e) { return [e[0], e[1], 1]; });
    for (var i = pts.length; i < all.length; i++) { var best = [], p = all[i]; for (var j = pts.length; j < all.length; j++) if (j !== i) { var q = all[j], d2 = (p.x - q.x) * (p.x - q.x) + (p.y - q.y) * (p.y - q.y) + (p.z - q.z) * (p.z - q.z); best.push([d2, j]); } best.sort(function (a, b) { return a[0] - b[0]; }); best.slice(0, 2).forEach(function (b) { if (b[1] > i) edges.push([i, b[1], 0]); }); }
    return { pts: all, edges: edges, three: true };
  })();
  // módulos de um sistema (software): seis blocos ligados, girando devagar
  var MODS = (function () {
    var pts = [], edges = [], cards = [];
    var pos = [[-.62, -.42], [.06, -.5], [.66, -.34], [-.6, .34], [.04, .42], [.64, .5]];
    pos.forEach(function (c, m) {
      var w = .44, h = .26, base = pts.length;
      [[-w / 2, -h / 2], [w / 2, -h / 2], [w / 2, h / 2], [-w / 2, h / 2]].forEach(function (o) { pts.push({ x: c[0] + o[0], y: c[1] + o[1], z: (m % 3 - 1) * .18, r: 2, gold: 1 }); });
      pts.push({ x: c[0], y: c[1] + h / 2 + .09, z: (m % 3 - 1) * .18, r: 3.4, gold: 1, hub: 1 });
      edges.push([base, base + 1, 1], [base + 1, base + 2, 1], [base + 2, base + 3, 1], [base + 3, base, 1]);
      cards.push(base);
    });
    var hub = function (m) { return m * 5 + 4; };
    [[0, 1], [1, 2], [0, 3], [1, 4], [2, 5], [3, 4], [4, 5], [0, 4], [2, 4]].forEach(function (l) { edges.push([hub(l[0]), hub(l[1]), 0, 1]); });
    // rede de fundo em aço
    for (var k = 0; k < 40; k++) { var a = rnd() * 6.283, r = .9 + rnd() * .5; pts.push({ x: Math.cos(a) * r * 1.2, y: Math.sin(a) * r * .8, z: -.6 - rnd() * .5, r: 1.3, gold: 0 }); }
    for (var b = 30; b < pts.length - 1; b += 2) edges.push([b, b + 1, 0]);
    return { pts: pts, edges: edges, three: true, cards: cards, wobble: 1 };
  })();
  // aparelhos: contornos medidos nas imagens (coordenadas em pixels da imagem)
  function seg(pts, edges, a, b, n, opt) { var s = pts.length; for (var i = 0; i <= n; i++) { var t = i / n; pts.push({ x: a[0] + (b[0] - a[0]) * t, y: a[1] + (b[1] - a[1]) * t, r: (i === 0 || i === n) ? 2.6 : 1.5, gold: opt && opt.steel ? 0 : 1 }); if (i) edges.push([s + i - 1, s + i, opt && opt.steel ? 0 : 1]); } return [s, s + n]; }
  function quad(pts, edges, q, n, opt) { for (var k = 0; k < 4; k++) seg(pts, edges, q[k], q[(k + 1) % 4], n, opt); }
  function lerpQ(q, u, v) { var top = [q[0][0] + (q[1][0] - q[0][0]) * u, q[0][1] + (q[1][1] - q[0][1]) * u], bot = [q[3][0] + (q[2][0] - q[3][0]) * u, q[3][1] + (q[2][1] - q[3][1]) * u]; return [top[0] + (bot[0] - top[0]) * v, top[1] + (bot[1] - top[1]) * v]; }
  function device(name) {
    var T = window.TELAS[name], pts = [], edges = [];
    if (name === 'notebook') {
      var s = T.telas[0], sq = [s.tl, s.tr, s.br, s.bl];
      quad(pts, edges, sq, 4);
      quad(pts, edges, [[75, 62], [812, 116], [895, 588], [150, 690]], 2, { steel: 1 });       // tampa
      quad(pts, edges, [[150, 690], [900, 594], [1344, 700], [480, 850]], 3);                   // base
      quad(pts, edges, [[270, 666], [1080, 630], [940, 730], [300, 744]], 2, { steel: 1 });     // teclado
      quad(pts, edges, [[620, 704], [1150, 684], [1120, 770], [660, 790]], 1, { steel: 1 });    // trackpad
      // o site montado na tela: barra, título, botão, imagem e três cartões
      var L = function (u0, v0, u1, v1) { seg(pts, edges, lerpQ(sq, u0, v0), lerpQ(sq, u1, v1), 2); };
      L(.04, .08, .96, .08); L(.06, .22, .5, .22); L(.06, .3, .44, .3); L(.06, .38, .3, .38); L(.06, .5, .24, .5);
      quad(pts, edges, [lerpQ(sq, .56, .2), lerpQ(sq, .94, .2), lerpQ(sq, .94, .56), lerpQ(sq, .56, .56)], 1);
      [0, 1, 2].forEach(function (c) { var u = .06 + c * .31; L(u, .7, u + .26, .7); });
    } else {
      var s2 = T.telas[0], q2 = [s2.tl, s2.tr, s2.br, s2.bl], hull = window.CONTORNOS[name];
      for (var h = 0; h < hull.length; h++) seg(pts, edges, hull[h], hull[(h + 1) % hull.length], 1, { steel: 1 });
      quad(pts, edges, q2, 3);
      if (T.telas[1]) { var t3 = T.telas[1]; quad(pts, edges, [t3.tl, t3.tr, t3.br, t3.bl], 2); }  // segunda tela (tablet)
      var M2 = function (u0, v0, u1, v1) { seg(pts, edges, lerpQ(q2, u0, v0), lerpQ(q2, u1, v1), 2); };
      M2(.36, .045, .64, .045); M2(.4, .2, .9, .2); M2(.08, .34, .82, .34); M2(.08, .4, .7, .4); M2(.08, .46, .76, .46); M2(.08, .58, .5, .58);
    }
    return { pts: pts.slice(0, NMAX), edges: edges.filter(function (e) { return e[0] < NMAX && e[1] < NMAX; }), device: name };
  }
  var FORMS = [GLOBE, null, null, null];
  var DEVICES = { 1: 'notebook', 2: 'monitor-e-tablet', 3: 'celular-inclinado' };

  // ---------------------------------------------------------------- tamanho e projeção
  var W = 0, H = 0;
  function size() { W = box.offsetWidth; H = box.offsetHeight; cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); }
  size(); addEventListener('resize', function () { size(); FORMS[1] = FORMS[2] = FORMS[3] = null; });
  var mx = 0, my = 0, tmx = 0, tmy = 0;
  if (matchMedia('(pointer: fine)').matches) addEventListener('pointermove', function (e) { tmx = e.clientX / innerWidth - .5; tmy = e.clientY / innerHeight - .5; }, { passive: true });
  function devRect(name) { var el = box.querySelector('[data-dev="' + name + '"]'); if (!el) return null; var img = el.querySelector('.moldura'); return { x: el.offsetLeft, y: el.offsetTop, s: img.clientWidth / window.TELAS[name].w }; }
  // posições alvo em pixels do canvas para a forma k, no instante t
  function targets(k, t) {
    var f = FORMS[k];
    if (!f && DEVICES[k]) { f = FORMS[k] = device(DEVICES[k]); }
    if (f.three) {
      var R = Math.min(W, H) * (f === GLOBE ? .4 : .36), cx = W / 2, cy = H / 2;
      var yaw = f === GLOBE ? (reduce ? .4 : t * 6.2832 / 48) + mx * .5 : Math.sin(t * .35) * .35 + mx * .5;
      var pitch = -.14 + my * .3;
      var cy_ = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
      return f.pts.map(function (p) {
        var x = p.x * cy_ + p.z * sy, z = -p.x * sy + p.z * cy_, y = p.y * cp - z * sp; z = p.y * sp + z * cp;
        var k2 = 1 / (1 - z * .28); return { x: cx + x * R * k2, y: cy + y * R * k2, d: (z + 1) / 2, r: p.r, gold: p.gold, hub: p.hub };
      });
    }
    var rc = devRect(f.device); if (!rc) return [];
    return f.pts.map(function (p) { return { x: rc.x + p.x * rc.s, y: rc.y + p.y * rc.s, d: 1, r: p.r, gold: p.gold }; });
  }

  // ---------------------------------------------------------------- estado e transições
  var nodes = []; for (var i = 0; i < NMAX; i++) nodes.push({ x: W / 2 + (rnd() - .5) * W, y: H / 2 + (rnd() - .5) * H, a: 0, d: .5, r: 1.5, gold: 0, sx: (rnd() - .5), sy: (rnd() - .5), delay: rnd() * .35 });
  var cur = 0, prev = -1, tStart = performance.now() / 1000, from = null, ready = false, onReady = opts && opts.onReady, onLeave = opts && opts.onLeave;
  var DUR = reduce ? .01 : 1.5, DEVICE_DELAY = reduce ? 0 : .45;
  function go(k) {
    if (k === cur && from) return;
    var leavingDevice = DEVICES[cur] && ready;
    if (onLeave && DEVICES[cur]) onLeave(cur);
    prev = cur; cur = k; ready = false;
    from = nodes.map(function (n) { return { x: n.x, y: n.y, a: n.a, r: n.r, gold: n.gold }; });
    tStart = performance.now() / 1000 + (leavingDevice ? DEVICE_DELAY : 0);
    nodes.forEach(function (n) { n.sx = rnd() - .5; n.sy = rnd() - .5; n.delay = rnd() * .35; });
    wake();
  }

  // ---------------------------------------------------------------- desenho
  var running = false, visible = true, t0 = performance.now() / 1000, pulses = [];
  for (var q = 0; q < 6; q++) pulses.push({ e: q, t: rnd() });
  function frame(nowMs) {
    var now = nowMs / 1000, t = now - t0;
    mx += (tmx - mx) * .05; my += (tmy - my) * .05;
    var tg = targets(cur, t), p = Math.max(0, now - tStart) / DUR, done = true;
    var spread = Math.min(W, H) * .55;
    for (var i = 0; i < NMAX; i++) {
      var n = nodes[i], to = tg[i], f0 = from ? from[i] : n;
      var pi = Math.max(0, Math.min(1, (p - n.delay) / (1 - .35)));
      if (pi < 1) done = false;
      var e = EASE(pi);
      var tx = to ? to.x : f0.x + n.sx * spread * .4, ty = to ? to.y : f0.y + n.sy * spread * .4;
      // caminho em curva: os nós se soltam (desmonta) e voltam a se encaixar (monta)
      var midx = (f0.x + tx) / 2 + n.sx * spread, midy = (f0.y + ty) / 2 + n.sy * spread;
      var u = 1 - e;
      n.x = u * u * f0.x + 2 * u * e * midx + e * e * tx; n.y = u * u * f0.y + 2 * u * e * midy + e * e * ty;
      n.a = to ? f0.a + (1 - f0.a) * e : f0.a * (1 - e);
      if (to) { n.r = to.r; n.gold = to.gold; n.d = to.d; n.hub = to.hub; }
    }
    if (done && !ready) { ready = true; if (onReady) onReady(cur, nodes); }
    // linhas: as da forma de origem somem no começo, as da forma de destino aparecem no fim
    g.setTransform(dpr, 0, 0, dpr, 0, 0); g.clearRect(0, 0, W, H);
    var fNow = FORMS[cur], fPrev = prev >= 0 ? FORMS[prev] : null;
    var devDim = (DEVICES[cur] && ready) ? Math.max(.12, 1 - (now - readyAt(now)) / .9) : 1;
    function drawEdges(form, alpha) {
      if (!form || alpha <= .01) return;
      form.edges.forEach(function (ed) {
        var a = nodes[ed[0]], b = nodes[ed[1]]; if (!a || !b) return;
        var d = ((a.d || .5) + (b.d || .5)) / 2, al = alpha * Math.min(a.a, b.a);
        if (al <= .01) return;
        g.strokeStyle = 'rgba(' + (ed[2] ? GOLD : STEEL) + ',' + (al * (ed[2] ? (.35 + .55 * d) : (.12 + .25 * d))).toFixed(3) + ')';
        g.lineWidth = ed[3] ? 1.6 : ed[2] ? 1.2 : .8;
        g.beginPath(); g.moveTo(a.x, a.y); g.lineTo(b.x, b.y); g.stroke();
      });
    }
    var pIn = Math.max(0, Math.min(1, (p - .55) / .45)), pOut = 1 - Math.max(0, Math.min(1, p / .3));
    drawEdges(fPrev, pOut); drawEdges(fNow, pIn * devDim);
    // pulsos de dados nos módulos
    if (fNow === MODS && ready) pulses.forEach(function (pu, k) {
      var links = MODS.edges.filter(function (e) { return e[3]; }), ed = links[(pu.e + k) % links.length], a = nodes[ed[0]], b = nodes[ed[1]];
      pu.t += .006; if (pu.t > 1) { pu.t = 0; pu.e = (pu.e + 3) % links.length; }
      var x = a.x + (b.x - a.x) * pu.t, y = a.y + (b.y - a.y) * pu.t, gr = g.createRadialGradient(x, y, 0, x, y, 7);
      gr.addColorStop(0, 'rgba(' + LIGHT + ',.95)'); gr.addColorStop(1, 'rgba(' + LIGHT + ',0)'); g.fillStyle = gr; g.beginPath(); g.arc(x, y, 7, 0, 6.2832); g.fill();
    });
    // nós
    nodes.forEach(function (n) {
      if (n.a <= .01) return; var al = n.a * (DEVICES[cur] && ready ? devDim : 1);
      var d = n.d == null ? .5 : n.d;
      if (n.gold && n.r > 3) { var gr2 = g.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 3.2); gr2.addColorStop(0, 'rgba(' + GOLD + ',' + (.32 * al * d).toFixed(3) + ')'); gr2.addColorStop(1, 'rgba(' + GOLD + ',0)'); g.fillStyle = gr2; g.beginPath(); g.arc(n.x, n.y, n.r * 3.2, 0, 6.2832); g.fill(); }
      g.fillStyle = 'rgba(' + (n.gold ? GOLD : STEEL) + ',' + (al * (n.gold ? (.45 + .55 * d) : (.25 + .4 * d))).toFixed(3) + ')';
      g.beginPath(); g.arc(n.x, n.y, n.r * (.75 + .25 * d), 0, 6.2832); g.fill();
    });
    if (opts && opts.onFrame) opts.onFrame(cur, nodes, ready);
    var moving = !done || FORMS[cur] && FORMS[cur].three || (DEVICES[cur] && now - readyAt(now) < 1.2);
    if (visible && !document.hidden && (moving || !reduce)) requestAnimationFrame(frame); else running = false;
  }
  var _ra = 0, _rk = -1;
  function readyAt(now) { if (_rk !== cur || !ready) { _rk = ready ? cur : -1; _ra = now; } return _ra; }
  function wake() { if (!running && visible && !document.hidden) { running = true; requestAnimationFrame(frame); } }
  if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { visible = es[0].isIntersecting; wake(); }).observe(box);
  document.addEventListener('visibilitychange', wake);
  go(0); from = nodes.map(function (n) { return { x: W / 2, y: H / 2, a: 0, r: 1.5, gold: 1 }; }); // entrada: a rede nasce do centro
  return { go: go, nodes: nodes, modsCards: MODS.cards };
};

// HOME (protótipo v3): a rolagem acende os termos do H1 (HeroTerms) e a rede monta a forma de cada termo; o aparelho real se
// materializa quando a rede termina de montar. Depois: portfólio que rola com a página, etapas, EngageBot. O texto todo já está no HTML.
// imagens das dobras de baixo: só carregam quando a dobra está entra na tela (o lazy nativo baixa cedo demais)
(function () {
  var imgs = [].slice.call(document.querySelectorAll('img[data-lz]'));
  function solta(im) { im.src = im.getAttribute('data-lz'); im.removeAttribute('data-lz'); im.addEventListener('load', function () { if (window.Telas) Telas.fit(); }); }
  if (!('IntersectionObserver' in window)) { imgs.forEach(solta); return; }
  var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { var sec = e.target; [].slice.call(sec.querySelectorAll('img[data-lz]')).forEach(solta); io.unobserve(sec); } }); }, { rootMargin: '0px 0px -2px 0px' });
  var secs = []; imgs.forEach(function (im) { var s = im.closest('section') || im.parentNode; if (secs.indexOf(s) < 0) { secs.push(s); io.observe(s); } });
})();
(function () {
  var doc = document.documentElement;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) doc.classList.add('rm');
  if (window.Telas) Telas.init(window.TELAS);
  var mb = document.querySelector('[data-menu]'), nav = document.getElementById('menu');
  if (mb && nav) mb.addEventListener('click', function () { var on = nav.classList.toggle('aberto'); mb.setAttribute('aria-expanded', on ? 'true' : 'false'); });

  // ---------------------------------------------------------------- abertura
  var ab = document.querySelector('[data-abertura]'), obj = ab && ab.querySelector('[data-objeto]');
  var termos = ab ? [].slice.call(ab.querySelectorAll('[data-termo]')) : [];
  var fio = ab && ab.querySelector('[data-fio]'), fioPath = fio && fio.querySelector('path');
  var devs = { 1: obj && obj.querySelector('.dev-note'), 2: obj && obj.querySelector('.dev-mt'), 3: obj && obj.querySelector('.dev-cel') };
  var modLabels = obj ? [].slice.call(obj.querySelectorAll('[data-modulo]')) : [];
  // imagens dos aparelhos da abertura: só quando a pessoa começa a rolar (ou depois de 2,5 s)
  var carregou = false;
  function carregar() { if (carregou) return; carregou = true; [].slice.call(ab.querySelectorAll('img[data-src]')).forEach(function (im) { im.src = im.getAttribute('data-src'); im.removeAttribute('data-src'); im.addEventListener('load', function () { Telas.fit(); }); }); }
  // as imagens dos aparelhos da abertura só carregam quando a pessoa interage (rolagem, mouse num termo) ou o momento troca
  if (ab) { addEventListener('scroll', carregar, { passive: true, once: true }); ab.addEventListener('pointerover', carregar, { once: true }); }

  var iaTimers = [];
  function iaTocar() {
    var ia = obj.querySelector('[data-ia]'); if (!ia) return; iaTimers.forEach(clearTimeout); iaTimers = [];
    var passos = [].slice.call(ia.querySelectorAll('[data-passo]'));
    passos.forEach(function (el) { el.classList.remove('on', 'fora'); });
    passos.forEach(function (el, i) { iaTimers.push(setTimeout(function () { el.classList.add('on'); if (el.hasAttribute('data-some')) iaTimers.push(setTimeout(function () { el.classList.add('fora'); }, 1100)); }, reduce ? 0 : 500 + i * 750)); });
  }
  var rede = obj && window.Rede ? Rede(obj, {
    onReady: function (k) {
      if (devs[k]) { carregar(); devs[k].classList.add('on'); Telas.fit(); if (k === 3) iaTocar(); }
      obj.classList.remove('mods');
    },
    onLeave: function (k) { if (devs[k]) devs[k].classList.remove('on'); obj.classList.remove('mods'); },
    onFrame: function (k, nodes, ready) {
      return;
      rede.modsCards.forEach(function (idx, m) { var n = nodes[idx], el = modLabels[m]; if (n && el) el.style.transform = 'translate3d(' + (n.x - 4).toFixed(1) + 'px,' + (n.y - 34).toFixed(1) + 'px,0)'; });
    },
  }) : null;

  // a abertura não depende da rolagem: o momento troca ao passar o mouse, focar ou tocar no termo,
  // e roda sozinho por todos (pausa enquanto o mouse está sobre os termos ou o objeto, e fora da tela)
  var atual = -1, DUR = 6500, timer = 0, pausado = false, visivel = true, h1 = ab && ab.querySelector('.termos');
  termos.forEach(function (el) { var t = document.createElement('i'); t.className = 'tempo'; t.setAttribute('aria-hidden', 'true'); el.appendChild(t); });
  if (h1) h1.style.setProperty('--dur', DUR / 1000 + 's');
  function fioFrame() {
    var k = atual; if (!fio || !termos[k] || !obj || innerWidth < 900) return;
    var fr = ab.getBoundingClientRect(), orc = obj.getBoundingClientRect();
    var rg = document.createRange(); rg.selectNodeContents(termos[k].firstChild || termos[k]); var rr = rg.getClientRects(), last = rr[rr.length - 1] || termos[k].getBoundingClientRect();
    var x1 = last.right - fr.left + 18, y1 = last.top - fr.top + last.height / 2;
    var x2 = orc.left - fr.left + orc.width * .32, y2 = orc.top - fr.top + orc.height / 2, mx = x1 + (x2 - x1) * .55;
    fioPath.setAttribute('d', 'M' + x1 + ' ' + y1 + ' C' + mx + ' ' + y1 + ' ' + mx + ' ' + y2 + ' ' + x2 + ' ' + y2);
    fio.classList.add('on');
  }
  function ir(k) {
    k = (k + termos.length) % termos.length; if (k === atual) return; atual = k; if (k > 0) carregar();
    termos.forEach(function (el, i) { el.classList.toggle('on', i === k); el.classList.toggle('seen', i < k); });
    if (rede) rede.go(k); fioFrame(); agenda();
  }
  function agenda() { clearTimeout(timer); if (reduce || pausado || !visivel) return; timer = setTimeout(function () { ir(atual + 1); }, DUR); }
  function pausa(on) { pausado = on; if (h1) h1.classList.toggle('pausa', on); if (on) clearTimeout(timer); else { /* reinicia a barra do termo aceso */ var t = termos[atual] && termos[atual].querySelector('.tempo'); if (t) { t.style.display = 'none'; t.offsetWidth; t.style.display = ''; } agenda(); } }
  function abFrame() { fioFrame(); }
  if (ab) {
    var ultimo = 'mouse'; addEventListener('pointerdown', function (e) { ultimo = e.pointerType; }, { capture: true, passive: true });
    termos.forEach(function (el, i) {
      el.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') { ir(i); pausa(true); } });
      el.addEventListener('focus', function () { if (el.matches(':focus-visible')) { ir(i); pausa(true); } });
      el.addEventListener('blur', function () { pausa(false); });
      // no celular: o 1º toque mostra o termo; o 2º toque (no termo já aceso) abre a página
      el.addEventListener('click', function (e) { if (ultimo !== 'mouse' && i !== atual) { e.preventDefault(); ir(i); } });
    });
    if (h1) h1.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse') pausa(false); });
    if (obj) { obj.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') pausa(true); }); obj.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse') pausa(false); }); }
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { visivel = es[0].isIntersecting; if (visivel) agenda(); else clearTimeout(timer); }, { threshold: .25 }).observe(ab);
    document.addEventListener('visibilitychange', function () { if (document.hidden) clearTimeout(timer); else agenda(); });
    ir(0);
  }

  // ---------------------------------------------------------------- o que a Roque desenvolve: cada frente troca as telas do notebook e do celular;
  // roda sozinho, o mouse (ou o toque) escolhe, e nada anda fora da tela
  var port = document.querySelector('[data-port]');
  if (port) (function () {
    var fr = [].slice.call(port.querySelectorAll('[data-frente]')), ul = port.querySelector('.frentes');
    var cn = [].slice.call(port.querySelectorAll('.tela-site [data-cena]')), cc = [].slice.call(port.querySelectorAll('.tela-cel [data-cena]'));
    var url = port.querySelector('[data-url]'), URLS = ['aurorapremium.com', 'roquebusinessevolution.com', 'aurorapremium.com', 'engagebot.com.br'];
    var k = -1, t = 0, pausado = false, vis = false, ultimo = 'mouse';
    addEventListener('pointerdown', function (e) { ultimo = e.pointerType; }, { capture: true, passive: true });
    function ir(i) {
      i = (i + fr.length) % fr.length; if (i === k) return; k = i;
      fr.forEach(function (a, n) { a.classList.toggle('on', n === i); });
      [cn, cc].forEach(function (l) { l.forEach(function (c, n) { c.classList.toggle('on', n === i); }); });
      if (url) url.textContent = URLS[i]; agenda();
    }
    function agenda() { clearTimeout(t); if (reduce || pausado || !vis) return; t = setTimeout(function () { ir(k + 1); }, 6500); }
    function pausa(on) { pausado = on; ul.classList.toggle('pausa', on); if (on) clearTimeout(t); else agenda(); }
    fr.forEach(function (a, i) {
      a.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') { ir(i); pausa(true); } });
      a.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse') pausa(false); });
      a.addEventListener('focus', function () { if (a.matches(':focus-visible')) { ir(i); pausa(true); } });
      a.addEventListener('blur', function () { pausa(false); });
      a.addEventListener('click', function (e) { if (ultimo !== 'mouse' && i !== k) { e.preventDefault(); ir(i); } });
    });
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { vis = es[0].isIntersecting; port.classList.toggle('visivel', vis); if (vis) agenda(); else clearTimeout(t); }, { threshold: .3 }).observe(port);
    else vis = true;
    [].slice.call(port.querySelectorAll('img')).forEach(function (im) { if (!im.complete) im.addEventListener('load', function () { Telas.fit(); }); });
    ir(0);
  })();
  function portFrame() {}

  // ---------------------------------------------------------------- etapas: o fio se preenche com a leitura
  var etapas = document.querySelector('[data-etapas]'), lis = etapas ? [].slice.call(etapas.children) : [];
  function etapasFrame() {
    if (!etapas) return; var b = etapas.getBoundingClientRect();
    var p = reduce ? 1 : Math.max(0, Math.min(1, (innerHeight * .8 - b.top) / (innerHeight * .55)));
    lis.forEach(function (li, i) { li.classList.toggle('on', p >= (i + .5) / lis.length || p >= 1); });
  }

  var tick = false;
  function onScroll() { if (!tick) { tick = true; requestAnimationFrame(function () { tick = false; abFrame(); portFrame(); etapasFrame(); if (ab) doc.classList.toggle('na-abertura', ab.getBoundingClientRect().bottom > innerHeight); }); } }
  addEventListener('scroll', onScroll, { passive: true }); addEventListener('resize', onScroll); onScroll();

  // ---------------------------------------------------------------- EngageBot: conversa com respostas de exemplo
  var msgs = document.querySelector('[data-msgs]'), btns = [].slice.call(document.querySelectorAll('[data-perg]'));
  var R = {
    entrega: ['Vocês entregam em Guarulhos?', 'Intenção: entrega', 'Entregamos, sim: Guarulhos e toda a capital, em até 2 dias úteis.', 'Resposta com base no FAQ da loja'],
    troca: ['Qual o prazo de troca?', 'Intenção: troca', 'Até 30 dias após a compra, com a etiqueta no produto.', 'Resposta com base na política de trocas (PDF)'],
    feriado: ['Vocês abrem no feriado?', 'Intenção: horário', 'Abrimos das 9h às 13h, como está no aviso do nosso site.', 'Resposta com base no site da loja'],
    pessoa: ['Quero falar com uma pessoa', 'Intenção: atendimento humano', 'Claro! A sua conversa já está na caixa de conversas da equipe.', 'A equipe acompanha pela caixa de conversas'],
  };
  function add(cls, txt, ms) { return new Promise(function (ok) { setTimeout(function () { var p = document.createElement('p'); p.className = cls; if (cls === 'digit') p.innerHTML = '<i></i><i></i><i></i>'; else p.textContent = txt; msgs.appendChild(p); while (msgs.children.length > 9) msgs.removeChild(msgs.firstChild); ok(p); }, reduce ? 0 : ms); }); }
  var ocupado = false, ultimoToque = 0, ebVis = false, ebIdx = 0, ebT = 0;
  // a conversa anda sozinha dentro do celular enquanto a seção está na tela; quem tocar numa pergunta assume o controle
  function ebAuto() { clearTimeout(ebT); if (reduce || !ebVis) return; ebT = setTimeout(function () { if (!ocupado && Date.now() - ultimoToque > 15000) { var b = btns[ebIdx++ % btns.length]; b.classList.add('auto'); b.click(); setTimeout(function () { b.classList.remove('auto'); }, 4000); } ebAuto(); }, 6500); }
  var ebSec = document.getElementById('engagebot');
  if (ebSec && 'IntersectionObserver' in window) new IntersectionObserver(function (es) { ebVis = es[0].isIntersecting; if (ebVis) { if (!ocupado && Date.now() - ultimoToque > 15000 && ebIdx === 0) { ebIdx = 1; btns[0].click(); } ebAuto(); } else clearTimeout(ebT); }, { threshold: .4 }).observe(ebSec);
  btns.forEach(function (b) { b.addEventListener('pointerdown', function () { ultimoToque = Date.now(); }); });
  btns.forEach(function (b) {
    b.addEventListener('click', function () {
      if (ocupado) return; ocupado = true; var r = R[b.getAttribute('data-perg')];
      if (msgs.children.length > 5) [].slice.call(msgs.children).forEach(function (m) { m.remove(); });
      btns.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); x.disabled = true; });
      add('in', r[0], 0).then(function () { return add('intent', r[1], 500); }).then(function () { return add('digit', '', 400); })
        .then(function (dg) { return new Promise(function (ok) { setTimeout(function () { dg.remove(); ok(); }, reduce ? 0 : 1100); }); })
        .then(function () { return add('out', r[2], 0); }).then(function () { return add('src', r[3], 350); })
        .then(function () { ocupado = false; btns.forEach(function (x) { x.disabled = false; }); });
    });
  });
})();

// SEGUNDA DOBRA (v5): as três placas montam e desmontam sozinhas enquanto a seção está na tela (sem depender da rolagem);
// a placa acesa troca a cada 4 s, e o item da lista acende a sua com mouse, foco ou toque.
(function () {
  var box = document.querySelector('[data-camadas]'); if (!box) return;
  var placas = [].slice.call(box.querySelectorAll('.placa3d')), links = [].slice.call(document.querySelectorAll('[data-camada]'));
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches, vis = false, raf = 0, t0 = performance.now(), fixo = -1, ultimo = 'mouse', fAtual = 0;
  function acende(k) { if (fixo >= 0) liga(); placas.forEach(function (p) { p.classList.toggle('acesa', +p.getAttribute('data-placa') === k); }); links.forEach(function (a, i) { a.classList.toggle('on', i === k); }); }
  function gapBase() { var w = box.clientWidth; return [w * .1, w * .25]; }
  function frame(now) {
    var g = gapBase(), s = (now - t0) / 1000;
    var alvo = fixo >= 0 ? 1 : (reduce ? .5 : .5 - .5 * Math.cos(s / 8 * Math.PI * 2)); // 0 = montada, 1 = desmontada (ciclo de 8 s); com o mouse numa camada, abre
    fAtual = reduce ? alvo : fAtual + (alvo - fAtual) * (fixo >= 0 ? .12 : .5); var f = fAtual;
    box.style.setProperty('--gap', (g[0] + (g[1] - g[0]) * f).toFixed(1) + 'px');
    placas.forEach(function (p) { p.style.setProperty('--gap', (g[0] + (g[1] - g[0]) * f).toFixed(1) + 'px'); });
    if (fixo < 0) acende(Math.floor(s / 4) % 3);
    vira();
    raf = vis && !reduce && !document.hidden ? requestAnimationFrame(frame) : 0;
  }
  function liga() { if (!raf) raf = requestAnimationFrame(frame); }
  // a placa escolhida (mouse, foco ou toque) sai da pilha e vira de frente, do tamanho da área, com o conteúdo legível
  function vira() {
    var br = box.getBoundingClientRect();
    placas.forEach(function (p) {
      var on = fixo >= 0 && +p.getAttribute('data-placa') === fixo, tela = p.querySelector('.tela-placa'), dev = p.querySelector('.dev-placa');
      p.classList.toggle('vira', on);
      if (on) {
        var dr = dev.getBoundingClientRect(), s = Math.min(br.width * 1.02 / tela.offsetWidth, br.height * .92 / tela.offsetHeight);
        var tx = br.left + br.width / 2 - dr.left - tela.offsetWidth * s / 2, ty = br.top + br.height / 2 - dr.top - tela.offsetHeight * s / 2;
        tela.classList.add('frente'); tela.style.transform = 'matrix3d(' + s + ',0,0,0,0,' + s + ',0,0,0,0,1,0,' + tx.toFixed(1) + ',' + ty.toFixed(1) + ',0,1)';
      } else if (tela.classList.contains('frente')) { tela.classList.remove('frente'); if (tela.dataset.h) tela.style.transform = tela.dataset.h; }
    });
    box.classList.toggle('virou', fixo >= 0);
  }
  if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { vis = es[0].isIntersecting; if (vis) liga(); }, { threshold: .15 }).observe(box);
  else { vis = true; liga(); }
  document.addEventListener('visibilitychange', function () { if (!document.hidden && vis) liga(); });
  frame(performance.now());
  addEventListener('pointerdown', function (e) { ultimo = e.pointerType; }, { capture: true, passive: true });
  links.forEach(function (a, i) {
    a.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') { fixo = i; acende(i); } });
    a.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse') { fixo = -1; liga(); } });
    a.addEventListener('focus', function () { if (a.matches(':focus-visible')) { fixo = i; acende(i); } });
    a.addEventListener('blur', function () { fixo = -1; liga(); });
    a.addEventListener('click', function (e) { if (ultimo !== 'mouse' && fixo !== i) { e.preventDefault(); fixo = i; acende(i); } });
  });
  [].slice.call(box.querySelectorAll('img')).forEach(function (im) { if (!im.complete) im.addEventListener('load', function () { if (window.Telas) Telas.fit(); }); });
})();

// pausa as animações das telas enquanto a pessoa rola a página (ver home.css, .rolando)
(function () { var de = document.documentElement, t = 0; addEventListener('scroll', function () { if (!t) de.classList.add('rolando'); clearTimeout(t); t = setTimeout(function () { de.classList.remove('rolando'); t = 0; }, 250); }, { passive: true }); })();
