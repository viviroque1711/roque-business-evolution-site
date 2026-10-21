// Constelação 3D da home. Cada serviço e cada produto é um nó (um link de verdade); pontos decorativos adensam a rede.
// Gira sozinha (some com movimento reduzido), gira com o arrasto, pausa no mouse e no foco, mostra o nome no foco.
(function () {
  var root = document.querySelector('[data-c3d]'); if (!root) return;
  var nodes = [].slice.call(root.querySelectorAll('.n3')), N = nodes.length;
  var svg = root.querySelector('.c3d-lines');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var NS = 'http://www.w3.org/2000/svg';
  document.documentElement.classList.add('c3d-on');

  // pontos na esfera (espiral de Fibonacci): serviços do mesmo grupo ficam vizinhos
  function sphere(n, off) { var a = [], ga = Math.PI * (3 - Math.sqrt(5)); for (var i = 0; i < n; i++) { var y = 1 - ((i + off) / (n - 1 + off * 2)) * 2, r = Math.sqrt(Math.max(0, 1 - y * y)), th = ga * i; a.push([Math.cos(th) * r, y, Math.sin(th) * r]); } return a; }
  var pts = sphere(N, 0);
  var M = 30, dpts = sphere(M, 0.5).map(function (p) { return [p[0] * 0.78, p[1] * 0.78, p[2] * 0.78]; });
  var decWrap = document.createElement('div'); decWrap.className = 'c3d-decor'; decWrap.setAttribute('aria-hidden', 'true'); root.insertBefore(decWrap, root.querySelector('.c3d-nodes'));
  var decs = dpts.map(function () { var s = document.createElement('i'); decWrap.appendChild(s); return s; });
  var all = pts.concat(dpts), T = all.length;

  // arestas: cada ponto se liga aos 2 mais próximos; o miolo (Roque) se liga aos produtos
  var E = [], seen = {};
  function addE(a, b) { var k = a < b ? a + '-' + b : b + '-' + a; if (!seen[k]) { seen[k] = 1; E.push([a, b]); } }
  for (var i = 0; i < T; i++) {
    var d = [];
    for (var j = 0; j < T; j++) if (j !== i) { var dx = all[i][0] - all[j][0], dy = all[i][1] - all[j][1], dz = all[i][2] - all[j][2]; d.push([dx * dx + dy * dy + dz * dz, j]); }
    d.sort(function (a, b) { return a[0] - b[0]; }); addE(i, d[0][1]); addE(i, d[1][1]); if (i < N && d[0][0] > 0.9) addE(i, d[2][1]);
  }
  nodes.forEach(function (n, k) { if (n.classList.contains('nprod')) addE(k, -1); });
  var lines = E.map(function () { var l = document.createElementNS(NS, 'line'); svg.appendChild(l); return l; });

  var W = 0, H = 0, R = 0;
  function size() { W = root.clientWidth; H = root.clientHeight; R = Math.min(W, H) * 0.39; svg.setAttribute('viewBox', (-W / 2) + ' ' + (-H / 2) + ' ' + W + ' ' + H); svg.setAttribute('width', W); svg.setAttribute('height', H); }
  size(); window.addEventListener('resize', function () { size(); draw(); });

  var ry = 0.6, rx = 0.32, vy = reduce ? 0 : 0.0035, vx = 0, paused = false, dragging = false, moved = 0, last = 0, visible = true;
  var P = new Array(T), widths = {};
  function proj(p) { var cy = Math.cos(ry), sy = Math.sin(ry), x = p[0] * cy + p[2] * sy, z = -p[0] * sy + p[2] * cy, cx = Math.cos(rx), sx = Math.sin(rx), y2 = p[1] * cx - z * sx, z2 = p[1] * sx + z * cx, s = 1 / (1 - z2 * 0.24); return { x: x * R * s, y: y2 * R * s, z: z2 }; }
  function draw() {
    var i, q, t;
    for (i = 0; i < N; i++) {
      q = P[i] = proj(all[i]); t = (q.z + 1) / 2;
      var n = nodes[i];
      n.style.transform = 'translate3d(' + q.x.toFixed(1) + 'px,' + q.y.toFixed(1) + 'px,0) scale(' + (0.72 + 0.5 * t).toFixed(3) + ')';
      n.style.opacity = (0.3 + 0.7 * t).toFixed(2); n.parentNode.style.zIndex = Math.round(t * 100);
      var left = q.x > 0; if (left !== n._l) { n._l = left; n.classList.toggle('left', left); }
    }
    // rótulos: só os que cabem sem sobrepor outro; produtos primeiro, depois os mais próximos de quem olha
    var order = [];
    for (i = 0; i < N; i++) if (P[i].z > 0.05 || (nodes[i].classList.contains('nprod') && P[i].z > -0.3)) order.push(i);
    order.sort(function (a, b) { var pa = nodes[a].classList.contains('nprod') ? 2 : 0, pb = nodes[b].classList.contains('nprod') ? 2 : 0; return (P[b].z + pb) - (P[a].z + pa); });
    var rects = [], shown = {};
    order.forEach(function (i) {
      var q2 = P[i], w = (widths[i] || (widths[i] = nodes[i].querySelector('.lb').offsetWidth || 90)) + 6, left = q2.x > 0, x0 = left ? q2.x - 14 - w : q2.x + 10, r = [x0, q2.y - 11, x0 + w, q2.y + 11], ok = true;
      for (var m = 0; m < rects.length; m++) { var o = rects[m]; if (r[0] < o[2] && r[2] > o[0] && r[1] < o[3] && r[3] > o[1]) { ok = false; break; } }
      if (ok) { rects.push(r); shown[i] = true; }
    });
    for (i = 0; i < N; i++) { var fr = !!shown[i]; if (fr !== nodes[i]._f) { nodes[i]._f = fr; nodes[i].classList.toggle('front', fr); } }
    for (i = N; i < T; i++) {
      q = P[i] = proj(all[i]); t = (q.z + 1) / 2; var s = decs[i - N];
      s.style.transform = 'translate3d(' + q.x.toFixed(1) + 'px,' + q.y.toFixed(1) + 'px,0) scale(' + (0.6 + 0.6 * t).toFixed(2) + ')'; s.style.opacity = (0.2 + 0.7 * t).toFixed(2);
    }
    var c0 = { x: 0, y: 0, z: 0 };
    for (var k = 0; k < E.length; k++) {
      var a = P[E[k][0]], b = E[k][1] < 0 ? c0 : P[E[k][1]], l = lines[k];
      l.setAttribute('x1', a.x.toFixed(1)); l.setAttribute('y1', a.y.toFixed(1)); l.setAttribute('x2', b.x.toFixed(1)); l.setAttribute('y2', b.y.toFixed(1));
      var z = E[k][1] < 0 ? a.z : (a.z + b.z) / 2; l.style.strokeOpacity = (0.1 + 0.5 * ((z + 1) / 2)).toFixed(2);
    }
  }
  function tick(ts) {
    if (visible && !document.hidden) {
      var dt = Math.min(48, ts - (last || ts)); last = ts;
      if (!dragging) { if (!paused) ry += vy * dt; ry += vx * dt * 0.06; vx *= 0.94; }
      draw();
    } else last = 0;
    requestAnimationFrame(tick);
  }
  draw(); if (!reduce) requestAnimationFrame(tick);

  // arrasto: gira o conjunto; um arrasto não deve abrir link
  var sx0 = 0, sy0 = 0;
  root.addEventListener('pointerdown', function (e) { if (e.pointerType === 'mouse' && e.button !== 0) return; dragging = true; moved = 0; sx0 = e.clientX; sy0 = e.clientY; vx = 0; try { root.setPointerCapture(e.pointerId); } catch (x) {} });
  root.addEventListener('pointermove', function (e) {
    if (!dragging) return; var dx = e.clientX - sx0, dy = e.clientY - sy0; sx0 = e.clientX; sy0 = e.clientY; moved += Math.abs(dx) + Math.abs(dy);
    ry += dx * 0.009; rx = Math.max(-1.1, Math.min(1.1, rx + dy * 0.006)); vx = dx * 0.09; if (reduce) draw();
  });
  function up() { dragging = false; }
  root.addEventListener('pointerup', up); root.addEventListener('pointercancel', up);
  root.addEventListener('click', function (e) { if (moved > 6) { e.preventDefault(); e.stopPropagation(); } }, true);
  root.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') paused = true; });
  root.addEventListener('pointerleave', function () { paused = false; });
  root.addEventListener('focusin', function () { paused = true; });
  root.addEventListener('focusout', function () { paused = false; });
  root.addEventListener('keydown', function (e) { if (e.key === 'ArrowLeft') { ry -= 0.18; draw(); } else if (e.key === 'ArrowRight') { ry += 0.18; draw(); } });
  if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { visible = es[0].isIntersecting; }, { threshold: 0 }).observe(root);
})();
