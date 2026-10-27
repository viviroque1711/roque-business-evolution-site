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
