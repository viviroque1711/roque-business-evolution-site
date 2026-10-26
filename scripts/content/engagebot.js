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
