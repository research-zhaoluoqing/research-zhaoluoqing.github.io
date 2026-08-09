/* ------------------------------------------------------------------
   Small UI behaviours. Everything here is progressive enhancement —
   the page is complete and readable with JavaScript switched off.
   ------------------------------------------------------------------ */
(function () {
  "use strict";

  var reduce = window.matchMedia &&
               window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------------------------------------------------- fade on scroll
  var items = document.querySelectorAll(".reveal");

  if (items.length) {
    if (reduce || !("IntersectionObserver" in window)) {
      for (var i = 0; i < items.length; i++) items[i].classList.add("is-in");
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          e.target.classList.add("is-in");
          io.unobserve(e.target);        // one-shot: never re-hide on scroll up
        });
      }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });
      items.forEach(function (el) { io.observe(el); });
    }
  }

  // ------------------------------------------------- copy a citation
  // <button class="cite" data-copy="Zhao, L. (2026). …">Copy citation</button>
  var copyButtons = document.querySelectorAll("[data-copy]");
  if (!copyButtons.length) return;

  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.top = "-1000px";
    document.body.appendChild(ta);
    ta.select();
    var ok = false;
    try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
    document.body.removeChild(ta);
    return ok;
  }

  function flash(btn, message) {
    if (btn.dataset.busy) return;
    var original = btn.textContent;
    btn.dataset.busy = "1";
    btn.textContent = message;
    btn.classList.add("is-done");
    setTimeout(function () {
      btn.textContent = original;
      btn.classList.remove("is-done");
      delete btn.dataset.busy;
    }, 1800);
  }

  copyButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var text = btn.getAttribute("data-copy");
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(
          function () { flash(btn, "Copied"); },
          function () { flash(btn, fallbackCopy(text) ? "Copied" : "Press Ctrl+C"); }
        );
      } else {
        flash(btn, fallbackCopy(text) ? "Copied" : "Press Ctrl+C");
      }
    });
  });
})();
