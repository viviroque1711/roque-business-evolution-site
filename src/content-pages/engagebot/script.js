// EXPERIÊNCIA 3D DAS PÁGINAS DE CONTEÚDO (xp.mjs): parallax do aparelho da abertura, linha do tempo das etapas que se
// preenche com a rolagem e cartões que inclinam com o mouse. Um único ouvinte de rolagem (passivo, uma vez por quadro),
// nada roda fora da tela, nada com prefers-reduced-motion. O texto já está no HTML.
(function () {
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = matchMedia('(pointer: fine)').matches;
  var hero = document.querySelector('.xp-hero');
  var dev = hero && hero.querySelector('.xp-dev');
  var steps = [].slice.call(document.querySelectorAll('.steps'));
  var live = new Set();
  var heroOn = true, ticking = false;

  if ('IntersectionObserver' in window) {
    if (hero) new IntersectionObserver(function (es) { heroOn = es[0].isIntersecting; hero.classList.toggle('xp-off', !heroOn); }).observe(hero);
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) live.add(e.target); else live.delete(e.target); }); frame(); }, { rootMargin: '10% 0px' });
    steps.forEach(function (s) { io.observe(s); });
  } else steps.forEach(function (s) { live.add(s); });

  function frame() {
    ticking = false;
    var vh = innerHeight;
    // primeiro lê tudo, depois escreve (sem forçar o layout a cada lista)
    var work = [];
    live.forEach(function (s) {
      var b = s.getBoundingClientRect(), lis = [].slice.call(s.children);
      work.push([s, b, lis, lis.map(function (li) { return li.getBoundingClientRect().top; })]);
    });
    work.forEach(function (w) {
      var s = w[0], b = w[1], p = reduce ? 1 : Math.max(0, Math.min(1, (vh * .62 - b.top) / Math.max(1, b.height))), mark = b.top + b.height * p;
      s.style.setProperty('--p', p.toFixed(3));
      w[2].forEach(function (li, i) { li.classList.toggle('on', reduce || p >= 1 || w[3][i] + 20 <= mark); });
    });
    if (dev && heroOn && !reduce) { var y = pageYOffset; dev.style.setProperty('--sy', Math.min(120, y * .18).toFixed(1) + 'px'); }
  }
  addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }, { passive: true });
  addEventListener('resize', frame, { passive: true });
  frame();

  // cartões que inclinam na direção do mouse
  if (fine && !reduce) [].slice.call(document.querySelectorAll('.facts li, .related a')).forEach(function (el) {
    el.addEventListener('pointermove', function (e) {
      var b = el.getBoundingClientRect(), x = (e.clientX - b.left) / b.width - .5, y = (e.clientY - b.top) / b.height - .5;
      el.style.setProperty('--tx', (x * 8).toFixed(2) + 'deg'); el.style.setProperty('--ty', (-y * 8).toFixed(2) + 'deg');
    });
    el.addEventListener('pointerleave', function () { el.style.removeProperty('--tx'); el.style.removeProperty('--ty'); });
  });
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

// imagens das dobras de baixo (data-lz): só quando a dobra chega perto da tela (o lazy nativo baixa cedo demais)
(function () { var imgs = [].slice.call(document.querySelectorAll('img[data-lz]')); if (!imgs.length) return;
  function solta(im) { im.src = im.getAttribute('data-lz'); im.removeAttribute('data-lz'); }
  if (!('IntersectionObserver' in window)) { imgs.forEach(solta); return; }
  var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { solta(e.target); io.unobserve(e.target); } }); }, { rootMargin: '200px 0px' });
  imgs.forEach(function (im) { io.observe(im); }); })();

// PÁGINA DO ENGAGEBOT: troca a tela fixa conforme o recurso que está no meio da tela e liga o diagrama "como aprende".
(function () {
  if (!('IntersectionObserver' in window)) return;
  var story = document.querySelector('[data-eb-story]');
  if (story) {
    var items = [].slice.call(story.querySelectorAll('[data-eb]'));
    var screens = [].slice.call(story.querySelectorAll('[data-eb-screen]'));
    var dots = [].slice.call(story.querySelectorAll('.eb-dots i'));
    var cur = 0;
    var show = function (i) {
      if (i === cur) return;
      var old = screens[cur]; if (old) { old.classList.add('leaving'); setTimeout(function () { old.classList.remove('leaving'); }, 950); }
      screens.forEach(function (s, k) { s.classList.toggle('on', k === i); s.classList.toggle('was', k < i); });
      items.forEach(function (li, k) { li.classList.toggle('on', k === i); });
      dots.forEach(function (d, k) { d.classList.toggle('on', k === i); });
      cur = i;
    };
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) show(+e.target.getAttribute('data-eb')); }); }, { rootMargin: '-45% 0px -45% 0px' });
    items.forEach(function (li) { io.observe(li); });
  }
  var learn = document.querySelector('[data-eb-learn]');
  if (learn) new IntersectionObserver(function (es) { var on = es[0].isIntersecting; if (on) learn.classList.add('in'); learn.classList.toggle('eb-off', !on); }, { threshold: .25 }).observe(learn);
})();
