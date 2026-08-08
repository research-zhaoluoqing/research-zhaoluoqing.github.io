/* ------------------------------------------------------------------
   Interactive background field — three modes.

     network        drifting nodes that link to neighbours
     waves          layered data waves over a faint grid
     constellation  slow stars with sparse links

   Vanilla JS. No dependencies, no network calls, nothing tracked.

   Behaviour that matters on a reading site:
     - canvas never intercepts clicks, selection or scrolling
     - touch scrolling is NOT blocked
     - motion stops for prefers-reduced-motion, and when the tab is hidden
     - field is quieter on article pages than on the home page
     - colours follow the light/dark theme live
   ------------------------------------------------------------------ */
(function () {
  "use strict";

  var canvas = document.getElementById("bg-field");
  if (!canvas || !canvas.getContext) return;

  var ctx = canvas.getContext("2d", { alpha: true });
  var mq   = window.matchMedia;
  var reduceMotion = mq && mq("(prefers-reduced-motion: reduce)").matches;

  // ---------------------------------------------------------- config
  var CFG = {
    network:       { link: 132, mouse: 175, density: 13000, max: 70 },
    constellation: { link: 158, mouse: 215, density: 15000, max: 62, maxLinks: 3 },
    waves:         { lines: 4, dots: 22, grid: 54 }
  };

  // Article pages get a calmer field than the landing page.
  var CALM = document.querySelector(".post") ? 0.55 : 1;

  var STORE = "bg-mode";
  var MODES = ["network", "waves", "constellation"];

  var mode = "network";
  try {
    var saved = localStorage.getItem(STORE);
    if (saved && MODES.indexOf(saved) !== -1) mode = saved;
  } catch (e) { /* storage blocked — fine */ }

  // ----------------------------------------------------------- state
  var W = 0, H = 0, dpr = 1;
  var nodes = [], stars = [];
  var mouse = { x: -9999, y: -9999, active: false };
  var t = 0, raf = null;
  var pal = null;

  // --------------------------------------------------------- palette
  function readVar(name, fallback) {
    var v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return v || fallback;
  }

  function toRgb(h) {
    h = h.replace("#", "");
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    var n = parseInt(h, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }

  function buildPalette() {
    var dark = mq && mq("(prefers-color-scheme: dark)").matches;
    pal = {
      c: [toRgb(readVar("--field-1", "#1f3555")),
          toRgb(readVar("--field-2", "#4a5f8a")),
          toRgb(readVar("--field-3", "#2f7d8a"))],
      node: (dark ? 0.62 : 0.46) * CALM,
      link: (dark ? 0.20 : 0.15) * CALM,
      hot:  (dark ? 0.50 : 0.38) * CALM,
      glow: (dark ? 0.07 : 0.05) * CALM,
      grid: (dark ? 0.05 : 0.035) * CALM
    };
  }

  function rgba(i, a) {
    var c = pal.c[i % pal.c.length];
    return "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + a + ")";
  }

  // ---------------------------------------------------------- sizing
  function seed() {
    var cn = CFG.network;
    var n = Math.max(16, Math.min(Math.round((W * H) / cn.density), cn.max));
    nodes = [];
    for (var i = 0; i < n; i++) {
      nodes.push({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.34,
        vy: (Math.random() - 0.5) * 0.34,
        r: Math.random() * 1.5 + 0.9,
        ci: (Math.random() * 3) | 0,
        p: Math.random() * Math.PI * 2
      });
    }

    var cs = CFG.constellation;
    var m = Math.max(14, Math.min(Math.round((W * H) / cs.density), cs.max));
    stars = [];
    for (var j = 0; j < m; j++) {
      stars.push({
        x: Math.random() * W, y: Math.random() * H,
        r: Math.random() * 1.4 + 0.5,
        a: Math.random() * Math.PI * 2,
        s: Math.random() * 0.018 + 0.004,
        ci: (Math.random() * 3) | 0
      });
    }
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width  = Math.floor(W * dpr);
    canvas.height = Math.floor(H * dpr);
    canvas.style.width  = W + "px";
    canvas.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    seed();
  }

  // ----------------------------------------------------------- modes

  function drawNetwork() {
    var c = CFG.network, i, j, a, b, dx, dy, d2, d, lim2 = c.link * c.link;
    var m2 = c.mouse * c.mouse;

    // move first, then draw — so links match current positions
    if (!reduceMotion) {
      for (i = 0; i < nodes.length; i++) {
        a = nodes[i];
        a.x += a.vx; a.y += a.vy; a.p += 0.028;

        if (mouse.active) {
          dx = mouse.x - a.x; dy = mouse.y - a.y;
          d2 = dx * dx + dy * dy;
          if (d2 < m2 && d2 > 1) {
            d = Math.sqrt(d2);
            var f = (1 - d / c.mouse) * 0.05;
            a.vx += (dx / d) * f;
            a.vy += (dy / d) * f;
          }
        }

        a.vx *= 0.99; a.vy *= 0.99;
        var sp2 = a.vx * a.vx + a.vy * a.vy;
        if (sp2 > 0.81) { var s = 0.9 / Math.sqrt(sp2); a.vx *= s; a.vy *= s; }
        else if (sp2 < 0.0016) {
          a.vx += (Math.random() - 0.5) * 0.05;
          a.vy += (Math.random() - 0.5) * 0.05;
        }

        if (a.x < -20) a.x = W + 20; else if (a.x > W + 20) a.x = -20;
        if (a.y < -20) a.y = H + 20; else if (a.y > H + 20) a.y = -20;
      }
    }

    // links
    ctx.lineWidth = 0.7;
    for (i = 0; i < nodes.length; i++) {
      a = nodes[i];
      for (j = i + 1; j < nodes.length; j++) {
        b = nodes[j];
        dx = a.x - b.x; dy = a.y - b.y;
        d2 = dx * dx + dy * dy;
        if (d2 < lim2) {
          d = Math.sqrt(d2);
          ctx.beginPath();
          ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = rgba(0, pal.link * (1 - d / c.link));
          ctx.stroke();
        }
      }
      if (mouse.active) {
        dx = a.x - mouse.x; dy = a.y - mouse.y;
        d2 = dx * dx + dy * dy;
        if (d2 < m2) {
          d = Math.sqrt(d2);
          ctx.beginPath();
          ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = rgba(1, pal.hot * (1 - d / c.mouse) * 0.8);
          ctx.stroke();
        }
      }
    }

    // nodes
    for (i = 0; i < nodes.length; i++) {
      a = nodes[i];
      var r = Math.max(0.5, a.r + Math.sin(a.p) * 0.4);
      ctx.beginPath(); ctx.arc(a.x, a.y, r, 0, 6.2832);
      ctx.fillStyle = rgba(a.ci, pal.node); ctx.fill();
      ctx.beginPath(); ctx.arc(a.x, a.y, r * 3.2, 0, 6.2832);
      ctx.fillStyle = rgba(a.ci, pal.glow); ctx.fill();
    }
  }

  function drawWaves() {
    var c = CFG.waves, x, y, w, i;

    // grid
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = rgba(0, pal.grid);
    for (x = 0; x < W; x += c.grid) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    for (y = 0; y < H; y += c.grid) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }

    // waves
    ctx.lineWidth = 1.4;
    for (w = 0; w < c.lines; w++) {
      var base = H * 0.24 + w * H * 0.18;
      ctx.beginPath();
      for (x = 0; x <= W; x += 4) {
        y = base
          + Math.sin(x * 0.006 + t * 0.014 + w * 1.3) * 38
          + Math.sin(x * 0.012 + t * 0.023) * 16;
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = rgba(w, pal.link * (1.1 - w * 0.14));
      ctx.stroke();
    }

    // travelling dots
    for (i = 0; i < c.dots; i++) {
      x = (i / c.dots) * W + Math.sin(t * 0.008 + i) * 28;
      y = H * 0.5 + Math.sin(x * 0.008 + t * 0.014) * 46;
      ctx.beginPath(); ctx.arc(x, y, 2.2, 0, 6.2832);
      ctx.fillStyle = rgba(0, pal.node * (0.55 + Math.sin(t * 0.04 + i) * 0.4));
      ctx.fill();
    }

    // cursor ripple
    if (mouse.active) {
      var rp = (t * 1.8) % 72;
      ctx.beginPath(); ctx.arc(mouse.x, mouse.y, rp, 0, 6.2832);
      ctx.strokeStyle = rgba(2, Math.max(0, pal.hot * (1 - rp / 72)));
      ctx.lineWidth = 1.4; ctx.stroke();
    }
  }

  function drawConstellation() {
    var c = CFG.constellation, i, j, a, b, dx, dy, d2, d;
    var lim2 = c.link * c.link, m2 = c.mouse * c.mouse;

    for (i = 0; i < stars.length; i++) {
      a = stars[i];
      if (!reduceMotion) a.a += a.s;
      ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, 6.2832);
      ctx.fillStyle = rgba(a.ci, pal.node * (0.45 + Math.sin(a.a) * 0.45));
      ctx.fill();
    }

    ctx.lineWidth = 0.6;
    for (i = 0; i < stars.length; i++) {
      a = stars[i];
      var made = 0;
      for (j = i + 1; j < stars.length && made < c.maxLinks; j++) {
        b = stars[j];
        dx = a.x - b.x; dy = a.y - b.y;
        d2 = dx * dx + dy * dy;
        if (d2 < lim2) {
          made++;
          d = Math.sqrt(d2);
          ctx.beginPath();
          ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = rgba(0, pal.link * (1 - d / c.link));
          ctx.stroke();
        }
      }
    }

    if (mouse.active) {
      ctx.beginPath(); ctx.arc(mouse.x, mouse.y, 3.6, 0, 6.2832);
      ctx.fillStyle = rgba(2, pal.hot * 1.4); ctx.fill();
      ctx.lineWidth = 0.9;
      for (i = 0; i < stars.length; i++) {
        a = stars[i];
        dx = a.x - mouse.x; dy = a.y - mouse.y;
        d2 = dx * dx + dy * dy;
        if (d2 < m2) {
          d = Math.sqrt(d2);
          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y); ctx.lineTo(a.x, a.y);
          ctx.strokeStyle = rgba(2, pal.hot * (1 - d / c.mouse));
          ctx.stroke();
        }
      }
    }
  }

  // ------------------------------------------------------------ loop
  function frame() {
    t++;
    ctx.clearRect(0, 0, W, H);
    if (mode === "waves") drawWaves();
    else if (mode === "constellation") drawConstellation();
    else drawNetwork();
    raf = requestAnimationFrame(frame);
  }

  function once() {
    ctx.clearRect(0, 0, W, H);
    if (mode === "waves") drawWaves();
    else if (mode === "constellation") drawConstellation();
    else drawNetwork();
  }

  function start() {
    if (reduceMotion) { once(); return; }
    if (raf === null) raf = requestAnimationFrame(frame);
  }
  function stop() {
    if (raf !== null) { cancelAnimationFrame(raf); raf = null; }
  }

  // ---------------------------------------------------------- events
  var rt;
  window.addEventListener("resize", function () {
    clearTimeout(rt);
    rt = setTimeout(function () { resize(); if (reduceMotion) once(); }, 160);
  });

  // listen on window, so the canvas itself stays pointer-events:none
  window.addEventListener("pointermove", function (e) {
    mouse.x = e.clientX; mouse.y = e.clientY; mouse.active = true;
  }, { passive: true });

  // NOTE: no preventDefault — page scrolling must keep working on touch
  window.addEventListener("touchmove", function (e) {
    if (!e.touches.length) return;
    mouse.x = e.touches[0].clientX;
    mouse.y = e.touches[0].clientY;
    mouse.active = true;
  }, { passive: true });

  window.addEventListener("touchend",     function () { mouse.active = false; }, { passive: true });
  window.addEventListener("pointerleave", function () { mouse.active = false; });
  window.addEventListener("blur",         function () { mouse.active = false; });

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) stop(); else start();
  });

  if (mq) {
    var dm = mq("(prefers-color-scheme: dark)");
    var onTheme = function () { buildPalette(); if (reduceMotion) once(); };
    if (dm.addEventListener) dm.addEventListener("change", onTheme);
    else if (dm.addListener) dm.addListener(onTheme);

    var rm = mq("(prefers-reduced-motion: reduce)");
    var onMotion = function (e) {
      reduceMotion = e.matches;
      if (reduceMotion) { stop(); once(); } else start();
    };
    if (rm.addEventListener) rm.addEventListener("change", onMotion);
    else if (rm.addListener) rm.addListener(onMotion);
  }

  // --------------------------------------------------- mode switcher
  function setMode(next) {
    if (MODES.indexOf(next) === -1) return;
    mode = next;
    try { localStorage.setItem(STORE, next); } catch (e) {}
    document.querySelectorAll("[data-field-mode]").forEach(function (b) {
      var on = b.getAttribute("data-field-mode") === next;
      b.classList.toggle("is-on", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
    if (reduceMotion) once();
  }

  document.querySelectorAll("[data-field-mode]").forEach(function (b) {
    b.addEventListener("click", function () {
      setMode(b.getAttribute("data-field-mode"));
    });
  });

  // ------------------------------------------------------------ init
  buildPalette();
  resize();
  setMode(mode);
  start();
})();
