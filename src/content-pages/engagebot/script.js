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
