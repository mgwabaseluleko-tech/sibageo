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

// WhatsApp quick-chat button (Lindokuhle, 076 254 2554)
(function () {
  var msg = encodeURIComponent("Hi Lindokuhle, I found you on sibageo.co.za and would like to enquire about a land survey.");
  var a = document.createElement('a');
  a.className = 'wa-float';
  a.href = 'https://wa.me/27762542554?text=' + msg;
  a.target = '_blank'; a.rel = 'noopener';
  a.setAttribute('aria-label', 'Chat with Lindokuhle on WhatsApp');
  a.innerHTML = '<svg viewBox="0 0 32 32" width="26" height="26" aria-hidden="true"><path fill="#fff" d="M16 3C9 3 3.3 8.6 3.3 15.5c0 2.2.6 4.4 1.7 6.3L3 29l7.4-1.9c1.8 1 3.8 1.500 5.900 1.500h.0c7 0 12.700-5.600 12.700-12.500S23 3 16 3zm0 22.900c-1.900 0-3.700-.5-5.300-1.500l-.4-.2-4.400 1.100 1.200-4.200-.3-.4a10.300 10.300 0 0 1-1.600-5.500C5.200 9.700 10 5.100 16 5.100s10.800 4.600 10.800 10.400S22 25.900 16 25.900zm5.900-7.700c-.3-.2-1.900-.9-2.200-1-.3-.1-.5-.2-.7.200-.2.300-.8 1-1 1.200-.2.200-.4.200-.7.100-.3-.2-1.400-.5-2.600-1.600-1-.9-1.600-1.900-1.800-2.200-.2-.3 0-.5.100-.7l.5-.6c.2-.2.200-.3.300-.5.100-.2.100-.4 0-.5l-1-2.300c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.100-.8.400-.3.300-1.100 1.100-1.100 2.600s1.100 3 1.300 3.200c.2.200 2.200 3.300 5.300 4.600.7.3 1.300.5 1.800.7.700.2 1.400.2 2 .1.600-.1 1.900-.8 2.100-1.500.3-.7.300-1.400.2-1.500-.1-.2-.3-.2-.6-.4z"/></svg><span>WhatsApp</span>';
  document.body.appendChild(a);
})();
