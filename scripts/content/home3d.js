// HOME 3D: globo do logo (nós e linhas do próprio logo projetados numa esfera, sempre girando em câmera lenta),
// campo de dados da primeira dobra, termos do H1 acendendo com a rolagem, camadas, anel de serviços, aparelhos
// que inclinam, escada e plano de rede do retrato. Todo o texto já está no HTML; isto só dá movimento.
(function () {
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var dpr = Math.min(2, window.devicePixelRatio || 1);
  var hero = document.querySelector('[data-h3d-hero]');
  if (!hero) return;
  if (!reduce) hero.classList.add('pin');

  // ---------------------------------------------------------------- globo
  var N = [[166.6,172.8,7.8],[175.1,235.7,5.8],[190.8,190.4,8.0],[210.9,226.4,5.7],[216.8,161.0,8.2],[219.2,115.6,8.1],[225.0,193.7,11.0],[225.0,245.0,5.8],[241.1,132.3,4.1],[249.3,276.8,11.0],[253.4,205.5,4.0],[255.1,160.9,5.8],[264.0,113.0,2.8],[266.4,132.2,4.0],[266.4,226.5,5.4],[273.5,190.4,4.0],[277.5,146.8,4.0],[294.0,125.0,2.2],[302.4,172.9,5.4],[302.4,218.6,5.4],[307.0,143.0,2.2],[310.3,247.4,7.8],[329.9,195.9,4.1],[337.9,165.3,4.1]];
  var E = [[0,1],[0,4],[0,5],[1,2],[1,3],[1,7],[1,9],[2,3],[2,4],[2,6],[3,6],[3,10],[4,5],[4,8],[4,11],[4,15],[5,8],[6,10],[6,11],[7,9],[7,10],[8,11],[9,10],[9,14],[9,21],[10,14],[10,15],[11,16],[15,16],[15,18],[15,19],[16,18],[18,19],[19,21],[19,22]];
  var FREE = [12,13,17,20,23];
  var REGION = [[0,1,2,3],[4,5,8,11],[6,10,14,15],[16,18,19,22],[7,9,21]];

  function makeGlobe(canvas, opts) {
    opts = opts || {};
    var g = canvas.getContext('2d');
    var pts = N.map(function (n, i) { var nx = (n[0]-252)/92, ny = (n[1]-195)/92, d = Math.hypot(nx, ny); if (d > .97) { nx *= .97/d; ny *= .97/d; } return { x: nx, y: ny, z: Math.sqrt(Math.max(0, 1-nx*nx-ny*ny)), r: n[2], free: FREE.indexOf(i) >= 0, logo: true }; });
    var back = [], M = 70;
    for (var k = 0; k < M; k++) { var y = 1-(k+.5)/M*2, rad = Math.sqrt(1-y*y), th = k*2.39996, x = Math.cos(th)*rad, z = Math.sin(th)*rad; if (z < -.05) back.push({ x: x, y: y, z: z, r: 1.8 + ((k*7)%5)/3 }); }
    var all = pts.concat(back);
    var edges = E.map(function (e) { return { a: e[0], b: e[1], logo: true }; });
    back.forEach(function (p, i) {
      back.map(function (q, j) { return { j: j, d: (p.x-q.x)*(p.x-q.x)+(p.y-q.y)*(p.y-q.y)+(p.z-q.z)*(p.z-q.z) }; })
        .filter(function (o) { return o.j !== i; }).sort(function (u, v) { return u.d - v.d; }).slice(0, 2)
        .forEach(function (o) { if (o.j > i) edges.push({ a: pts.length+i, b: pts.length+o.j, logo: false }); });
    });
    var ring = []; for (var r = 0; r < 120; r++) { var t = r/120*Math.PI*2; ring.push({ x: Math.cos(t), y: 0, z: Math.sin(t) }); }
    var pulses = []; for (var q = 0; q < 7; q++) pulses.push({ e: Math.floor(Math.random()*E.length), t: Math.random(), v: .0025 + Math.random()*.002 });
    var st = { active: -1, glow: [0,0,0,0,0], angle: opts.angle || 0, extra: 0, from: 0, to: 0, et: 1, tx: 0, ty: 0, tiltX: 0, tiltY: 0, w: 0, region: null, t0: performance.now(), last: performance.now(), visible: true, running: true };
    var spin = Math.PI*2/(opts.period || 48);
    function size() { var b = canvas.getBoundingClientRect(); st.w = b.width; canvas.width = b.width*dpr; canvas.height = b.width*dpr; }
    canvas.parentElement.addEventListener('pointermove', function (e) { var b = canvas.getBoundingClientRect(); st.tx = ((e.clientY-b.top)/b.height-.5)*.3; st.ty = ((e.clientX-b.left)/b.width-.5)*.4; });
    canvas.parentElement.addEventListener('pointerleave', function () { st.tx = 0; st.ty = 0; });
    function regionAngle(i) { var sx = 0, sz = 0; REGION[i].forEach(function (k) { sx += pts[k].x; sz += pts[k].z; }); return Math.atan2(sx, sz); }
    function setActive(i) {
      if (i === st.active) return; st.active = i; if (i < 0 || reduce) return;
      var cur = st.angle + st.extra, want = -regionAngle(i);
      var delta = ((want - cur) % (Math.PI*2) + Math.PI*3) % (Math.PI*2) - Math.PI;
      st.from = st.extra; st.to = st.extra + delta + .35; st.et = 0;
    }
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { st.visible = es[0].isIntersecting; if (st.visible && !st.running && !reduce) { st.running = true; st.last = performance.now(); requestAnimationFrame(frame); } }).observe(canvas);
    function frame(now) {
      var t = (now - st.t0)/1000, dt = Math.min(.05, (now - st.last)/1000); st.last = now;
      var intro = reduce ? 1 : Math.min(1, t/3.2), ease = 1 - Math.pow(1-intro, 3);
      if (!reduce && t > 2.2) st.angle += spin*dt;
      if (st.et < 1) { st.et = Math.min(1, st.et + dt/2.6); var kk = st.et < .5 ? 4*Math.pow(st.et,3) : 1-Math.pow(-2*st.et+2,3)/2; st.extra = st.from + (st.to-st.from)*kk; }
      for (var i = 0; i < 5; i++) st.glow[i] += ((i === st.active ? 1 : 0) - st.glow[i]) * Math.min(1, dt*1.6);
      st.tiltX += (st.tx - st.tiltX)*.03; st.tiltY += (st.ty - st.tiltY)*.03;
      var ay = st.angle + st.extra + st.tiltY, ax = -.14 + st.tiltX;
      var ca = Math.cos(ay), sa = Math.sin(ay), cb = Math.cos(ax), sb = Math.sin(ax);
      var S = st.w*.37*dpr, ox = canvas.width/2, oy = canvas.height/2;
      function proj(p) { var x = p.x*ca + p.z*sa, z = -p.x*sa + p.z*ca, y = p.y*cb - z*sb; z = p.y*sb + z*cb; var k = 1/(1 - z*.3); return { X: ox + x*S*k, Y: oy + y*S*k, z: z, k: k }; }
      g.clearRect(0, 0, canvas.width, canvas.height);
      var halo = g.createRadialGradient(ox, oy, S*.2, ox, oy, Math.min(S*1.3, canvas.width/2, canvas.height/2)); halo.addColorStop(0, 'rgba(192,138,30,.09)'); halo.addColorStop(1, 'rgba(192,138,30,0)'); g.fillStyle = halo; g.fillRect(0, 0, canvas.width, canvas.height);
      g.lineWidth = 1.2*dpr; g.strokeStyle = 'rgba(192,138,30,' + (.5*ease) + ')'; g.beginPath(); g.arc(ox, oy, S*1.03, Math.PI*.55, Math.PI*.55 + Math.PI*2*ease); g.stroke();
      g.beginPath(); ring.forEach(function (p, j) { var c = proj(p); if (j) g.lineTo(c.X, c.Y); else g.moveTo(c.X, c.Y); }); g.closePath(); g.strokeStyle = 'rgba(143,163,191,' + (.14*ease) + ')'; g.lineWidth = dpr; g.stroke();
      var P = all.map(proj);
      var hot = pts.map(function () { return 0; }); REGION.forEach(function (ids, rr) { ids.forEach(function (k) { hot[k] = Math.max(hot[k], st.glow[rr]); }); });
      edges.forEach(function (ed, j) {
        var pa = P[ed.a], pb = P[ed.b], depth = ((pa.z + pb.z)/2 + 1)/2;
        var local = ed.logo ? Math.min(1, Math.max(0, ease*E.length*1.15 - j*.5)) : ease; if (local <= 0) return;
        if (ed.logo) { var h = Math.min(hot[ed.a], hot[ed.b]); g.strokeStyle = 'rgba(' + (192+50*h) + ',' + (138+60*h) + ',' + (30+60*h) + ',' + (((.16+.6*depth)+.3*h)*local) + ')'; g.lineWidth = (.6+.9*depth+1.2*h)*dpr; }
        else { g.strokeStyle = 'rgba(143,163,191,' + ((.05+.16*depth)*local) + ')'; g.lineWidth = .7*dpr; }
        g.beginPath(); g.moveTo(pa.X, pa.Y); g.lineTo(pa.X + (pb.X-pa.X)*local, pa.Y + (pb.Y-pa.Y)*local); g.stroke();
      });
      if (!reduce && intro >= 1) pulses.forEach(function (pu) {
        pu.t += pu.v; if (pu.t > 1) { pu.t = 0; pu.e = Math.floor(Math.random()*E.length); }
        var ed = E[pu.e], pa = P[ed[0]], pb = P[ed[1]], depth = ((pa.z+pb.z)/2+1)/2; if (depth < .35) return;
        var X = pa.X + (pb.X-pa.X)*pu.t, Y = pa.Y + (pb.Y-pa.Y)*pu.t, gr = g.createRadialGradient(X, Y, 0, X, Y, 6*dpr);
        gr.addColorStop(0, 'rgba(255,226,160,' + (.9*depth) + ')'); gr.addColorStop(1, 'rgba(255,226,160,0)'); g.fillStyle = gr; g.beginPath(); g.arc(X, Y, 6*dpr, 0, Math.PI*2); g.fill();
      });
      all.map(function (p, j) { return { p: p, q: P[j], i: j }; }).sort(function (u, v) { return u.q.z - v.q.z; }).forEach(function (o) {
        var p = o.p, c = o.q, X = c.X, Y = c.Y, front = (c.z+1)/2;
        if (p.free && !reduce) { var dr = (Math.sin(t*.22 + o.i) + 1)*.5; X += dr*S*.12; Y -= dr*S*.08; }
        if (!p.logo) { g.fillStyle = 'rgba(143,163,191,' + ((.12+.45*front)*ease) + ')'; g.beginPath(); g.arc(X, Y, p.r*dpr*c.k*.7, 0, Math.PI*2); g.fill(); return; }
        var h = hot[o.i] || 0, rr = Math.max(1.2*dpr, p.r/92*S*.6*c.k)*(.55+.45*ease)*(1+.35*h);
        if (h > .05) { var gr = g.createRadialGradient(X, Y, 0, X, Y, rr*4); gr.addColorStop(0, 'rgba(255,200,90,' + (.45*h) + ')'); gr.addColorStop(1, 'rgba(255,200,90,0)'); g.fillStyle = gr; g.beginPath(); g.arc(X, Y, rr*4, 0, Math.PI*2); g.fill(); }
        g.fillStyle = 'rgba(' + Math.round(150+60*front+40*h) + ',' + Math.round(100+45*front+50*h) + ',' + Math.round(10+25*front+40*h) + ',' + ((.3+.7*front)*ease) + ')'; g.beginPath(); g.arc(X, Y, rr, 0, Math.PI*2); g.fill();
      });
      if (st.active >= 0) { var sx = 0, sy = 0; REGION[st.active].forEach(function (k) { sx += P[k].X; sy += P[k].Y; }); var b = canvas.getBoundingClientRect(); st.region = { x: b.left + sx/REGION[st.active].length/dpr, y: b.top + sy/REGION[st.active].length/dpr }; } else st.region = null;
      if ((!reduce || intro < 1) && st.visible) requestAnimationFrame(frame); else st.running = false;
    }
    size(); addEventListener('resize', size); requestAnimationFrame(frame);
    return { setActive: setActive, st: st };
  }
  var globe = makeGlobe(hero.querySelector('[data-h3d-globe]'));
  var miniC = document.querySelector('[data-h3d-mini]');
  if (miniC) makeGlobe(miniC, { period: 30, angle: 2 });

  // ---------------------------------------------------------------- campo de dados e fio termo -> globo
  var stage = hero.querySelector('.h3d-stage'), fc = hero.querySelector('.h3d-field'), f = fc.getContext('2d');
  var fw = 0, fh = 0, dots = [], wire = 0, terms = [].slice.call(hero.querySelectorAll('h1 .t')), fieldOn = true, fieldRun = true;
  function sizeField() { var b = fc.getBoundingClientRect(); fw = b.width; fh = b.height; fc.width = fw*dpr; fc.height = fh*dpr; var n = Math.round(Math.min(90, fw*fh/14000)); dots = []; for (var i = 0; i < n; i++) dots.push({ x: Math.random()*fw, y: Math.random()*fh, vx: (Math.random()-.5)*.07, vy: -(.03+Math.random()*.07), s: Math.random() }); }
  function drawField() {
    f.setTransform(dpr, 0, 0, dpr, 0, 0); f.clearRect(0, 0, fw, fh);
    f.strokeStyle = 'rgba(143,163,191,.06)'; f.lineWidth = 1; var hz = fh*.64, vx0 = fw*.72, i, j;
    for (i = -12; i <= 12; i++) { f.beginPath(); f.moveTo(vx0, hz); f.lineTo(vx0 + i*fw*.12, fh); f.stroke(); }
    for (j = 1; j < 8; j++) { var yy = hz + (fh-hz)*Math.pow(j/8, 1.8); f.beginPath(); f.moveTo(0, yy); f.lineTo(fw, yy); f.stroke(); }
    dots.forEach(function (d) { if (!reduce) { d.x += d.vx; d.y += d.vy; if (d.y < -10) { d.y = fh+10; d.x = Math.random()*fw; } if (d.x < -10) d.x = fw+10; if (d.x > fw+10) d.x = -10; } });
    for (i = 0; i < dots.length; i++) for (j = i+1; j < dots.length; j++) { var a = dots[i], b = dots[j], dd = Math.hypot(a.x-b.x, a.y-b.y); if (dd < 120) { f.strokeStyle = 'rgba(143,163,191,' + ((1-dd/120)*.16) + ')'; f.beginPath(); f.moveTo(a.x, a.y); f.lineTo(b.x, b.y); f.stroke(); } }
    dots.forEach(function (d) { f.fillStyle = d.s > .85 ? 'rgba(192,138,30,.8)' : 'rgba(143,163,191,.5)'; f.beginPath(); f.arc(d.x, d.y, d.s > .85 ? 1.8 : 1.1, 0, Math.PI*2); f.fill(); });
    var act = globe.st.active, reg = globe.st.region;
    wire += (((act >= 0 && reg && innerWidth >= 900 && !reduce) ? 1 : 0) - wire)*.04;
    if (wire > .02 && act >= 0 && reg) {
      var sr = stage.getBoundingClientRect(), range = document.createRange(); range.selectNodeContents(terms[act]); var rs = range.getClientRects(), lr = rs[rs.length-1] || terms[act].getBoundingClientRect();
      var x1 = lr.right - sr.left + 18, y1 = lr.top + lr.height/2 - sr.top, x2 = reg.x - sr.left, y2 = reg.y - sr.top, mx = x1 + (x2-x1)*.55;
      f.strokeStyle = 'rgba(192,138,30,' + (.55*wire) + ')'; f.lineWidth = 1.2; f.setLineDash([2, 5]); f.beginPath(); f.moveTo(x1, y1); f.bezierCurveTo(mx, y1, mx, y2, x1 + (x2-x1)*wire, y1 + (y2-y1)*wire); f.stroke(); f.setLineDash([]);
      f.fillStyle = 'rgba(255,214,140,' + wire + ')'; f.beginPath(); f.arc(x1, y1, 3, 0, Math.PI*2); f.fill();
    }
    if (!reduce && fieldOn) requestAnimationFrame(drawField); else fieldRun = false;
  }
  sizeField(); addEventListener('resize', sizeField); requestAnimationFrame(drawField);
  if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { fieldOn = es[0].isIntersecting; if (fieldOn && !fieldRun && !reduce) { fieldRun = true; requestAnimationFrame(drawField); } }).observe(fc);

  function onHero() {
    if (reduce) return;
    var b = hero.getBoundingClientRect(), total = b.height - stage.offsetHeight;
    var p = Math.min(1, Math.max(0, -b.top/Math.max(1, total))), n = Math.max(1, terms.length), i = Math.min(n - 1, Math.floor(p*(n + .2)));
    terms.forEach(function (el, k) { el.classList.toggle('on', k === i); el.classList.toggle('seen', k < i); });
    globe.setActive(i);
  }

  // ---------------------------------------------------------------- camadas
  var stackEl = document.querySelector('[data-h3d-stack]'), stackRot = stackEl && stackEl.firstElementChild;
  var planes = stackRot ? [].slice.call(stackRot.children) : [];
  [].slice.call(document.querySelectorAll('[data-h3d-layer]')).forEach(function (a) {
    var pl = planes[+a.getAttribute('data-h3d-layer')];
    a.addEventListener('pointerenter', function () { a.classList.add('lit'); pl && pl.classList.add('lit'); });
    a.addEventListener('pointerleave', function () { a.classList.remove('lit'); pl && pl.classList.remove('lit'); });
    a.addEventListener('focus', function () { pl && pl.classList.add('lit'); });
    a.addEventListener('blur', function () { pl && pl.classList.remove('lit'); });
  });
  function onStack() {
    if (!stackEl) return; var b = stackEl.getBoundingClientRect(), p = Math.min(1, Math.max(0, 1 - (b.top + b.height/2)/innerHeight));
    stackEl.classList.toggle('open', p > .3);
    if (!reduce) stackRot.style.transform = 'rotateX(' + (58 - p*10) + 'deg) rotateZ(' + (-38 + p*24) + 'deg)';
  }

  // ---------------------------------------------------------------- anel de serviços
  var wrap = document.querySelector('[data-h3d-ring]');
  if (wrap && !reduce) {
    var ringEl = wrap.firstElementChild, tiles = [].slice.call(ringEl.children), step = 360/tiles.length;
    var ang = 0, target = 0, dragging = false, dx = 0, d0 = 0, auto = true, R = 0;
    wrap.classList.add('on');
    var layout = function () { var w = tiles[0].offsetWidth; R = Math.round((w + 24)/2/Math.tan(Math.PI/tiles.length)); tiles.forEach(function (t, i) { t.style.transform = 'rotateY(' + (i*step) + 'deg) translateZ(' + R + 'px)'; }); };
    var front = []; var facing = function () { tiles.forEach(function (t, i) { var on = Math.cos((i*step + ang)*Math.PI/180) > .8; if (front[i] !== on) { front[i] = on; t.style.pointerEvents = on ? '' : 'none'; } }); };
    var tick = function () { if (auto && !dragging) target -= .04; ang += (target - ang)*.06; facing(); ringEl.style.transform = 'translateZ(-' + Math.max(0, R - 170) + 'px) rotateX(-6deg) rotateY(' + ang + 'deg)'; requestAnimationFrame(tick); };
    var ctrl = wrap.nextElementSibling;
    ctrl.querySelector('[data-prev]').addEventListener('click', function () { auto = false; target = Math.round(target/step)*step + step; });
    ctrl.querySelector('[data-next]').addEventListener('click', function () { auto = false; target = Math.round(target/step)*step - step; });
    wrap.addEventListener('pointerdown', function (e) { if (e.target.closest('a') && e.pointerType !== 'mouse') return; dragging = true; auto = false; dx = e.clientX; d0 = target; });
    addEventListener('pointermove', function (e) { if (dragging) target = d0 + (e.clientX - dx)*.3; });
    addEventListener('pointerup', function () { if (dragging) { dragging = false; target = Math.round(target/step)*step; } });
    tiles.forEach(function (t, i) { t.addEventListener('focusin', function () { auto = false; target = -i*step; }); });
    layout(); addEventListener('resize', layout); requestAnimationFrame(tick);
  }

  // ---------------------------------------------------------------- objetos que inclinam
  [].slice.call(document.querySelectorAll('[data-h3d-tilt]')).forEach(function (sc) {
    var obj = sc.firstElementChild;
    sc.addEventListener('pointermove', function (e) { if (reduce) return; var b = sc.getBoundingClientRect(), x = (e.clientX-b.left)/b.width-.5, y = (e.clientY-b.top)/b.height-.5; obj.style.transform = 'rotateY(' + (x*30) + 'deg) rotateX(' + (-y*18) + 'deg)'; });
    sc.addEventListener('pointerleave', function () { obj.style.transform = ''; });
  });

  // ---------------------------------------------------------------- escada
  var steps = document.querySelector('[data-h3d-steps]');
  if (steps && !reduce && 'IntersectionObserver' in window) {
    steps.classList.add('wait');
    new IntersectionObserver(function (es, ob) { es.forEach(function (e) { if (e.isIntersecting) { steps.classList.add('in'); ob.disconnect(); } }); }, { threshold: .3 }).observe(steps);
    setTimeout(function () { steps.classList.add('in'); }, 8000);
  }

  // ---------------------------------------------------------------- rede atrás do retrato
  var pc = document.querySelector('[data-h3d-pnet]');
  if (pc) {
    var px = pc.getContext('2d');
    var drawNet = function () { var b = pc.getBoundingClientRect(); pc.width = b.width*dpr; pc.height = b.height*dpr; px.setTransform(dpr, 0, 0, dpr, 0, 0);
      var ps = []; for (var i = 0; i < 26; i++) ps.push({ x: ((i*97)%100)/100*b.width, y: ((i*61)%100)/100*b.height });
      px.strokeStyle = 'rgba(168,112,0,.35)'; px.lineWidth = 1;
      ps.forEach(function (p, i) { ps.forEach(function (q, j) { if (j > i && Math.hypot(p.x-q.x, p.y-q.y) < b.width*.28) { px.beginPath(); px.moveTo(p.x, p.y); px.lineTo(q.x, q.y); px.stroke(); } }); });
      px.fillStyle = '#A87000'; ps.forEach(function (p) { px.beginPath(); px.arc(p.x, p.y, 3, 0, Math.PI*2); px.fill(); }); };
    drawNet(); addEventListener('resize', drawNet);
  }

  var ticking = false;
  addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(function () { ticking = false; onHero(); onStack(); }); } }, { passive: true });
  onHero(); onStack();
})();
