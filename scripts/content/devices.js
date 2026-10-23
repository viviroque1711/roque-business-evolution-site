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
