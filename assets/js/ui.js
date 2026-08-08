/* ------------------------------------------------------------------
   Small UI behaviours: scroll fade-in and current-nav marking.
   Progressive enhancement — everything is readable without JS.
   ------------------------------------------------------------------ */
(function () {
  "use strict";

  var reduce = window.matchMedia &&
               window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------------------------------------------------- fade on scroll
  var items = document.querySelectorAll(".reveal");

  if (!items.length) return;

  // No observer support, or the reader asked for less motion: show at once.
  if (reduce || !("IntersectionObserver" in window)) {
    for (var i = 0; i < items.length; i++) items[i].classList.add("is-in");
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add("is-in");
      io.unobserve(e.target);          // one-shot: never re-hide on scroll up
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });

  items.forEach(function (el) { io.observe(el); });
})();
