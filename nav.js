document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', function () {
  var btn = document.querySelector('.hamburger');
  var nav = document.querySelector('nav.mainnav');
  var header = document.querySelector('header.site');

  if (btn && nav) {
    btn.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('open'); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') nav.classList.remove('open');
    });
  }

  if (header) {
    var onScroll = function () { header.classList.toggle('scrolled', window.scrollY > 8); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // gentle fade-up for glass surfaces as they enter the viewport
  var items = document.querySelectorAll('.card, .proj, .mk-list li, .plate');
  if (!('IntersectionObserver' in window)) { return; }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  items.forEach(function (el, i) {
    el.classList.add('reveal');
    el.style.transitionDelay = (i % 5) * 60 + 'ms';
    io.observe(el);
  });
});
