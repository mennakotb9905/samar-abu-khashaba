(function () {
  "use strict";
  var root = document.documentElement;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- theme ---------- */
  var themeBtn = $("#themeBtn");
  if (themeBtn) themeBtn.addEventListener("click", function () {
    var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("sak-theme", next); } catch (e) {}
    window.dispatchEvent(new Event("themechange"));
  });

  /* ---------- header, progress, to-top ---------- */
  var header = $("#header"), bar = $("#scrollBar"), toTop = $("#toTop");
  function onScroll() {
    var y = window.scrollY, h = document.documentElement.scrollHeight - window.innerHeight;
    if (header) header.classList.toggle("scrolled", y > 30);
    if (bar) bar.style.transform = "scaleX(" + (h > 0 ? y / h : 0) + ")";
    if (toTop) toTop.classList.toggle("show", y > 700);
    $$(".timeline").forEach(function (t) {
      var r = t.getBoundingClientRect(), f = $(".fillbar", t);
      if (!f) return;
      var p = Math.max(0, Math.min(1, (window.innerHeight * 0.7 - r.top) / r.height));
      f.style.height = "calc(" + (p * 100) + "% - 16px)";
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  if (toTop) toTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });

  var menuBtn = $("#menuBtn"), nav = $("#nav");
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () { nav.classList.toggle("open"); });
    $$("a", nav).forEach(function (a) { a.addEventListener("click", function () { nav.classList.remove("open"); }); });
  }
  var yr = $("#year"); if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- marquee: duplicate for a seamless loop ---------- */
  var mq = $("#marquee"); if (mq) mq.innerHTML += mq.innerHTML;

  /* ---------- typed role ---------- */
  var typed = $("#typed");
  if (typed && !reduced) {
    var words = ["Pharmaceutical Analytical Chemistry", "Green Method Development", "HPLC & Voltammetry", "Quality Management"];
    var wi = 0, ci = words[0].length, del = true;
    (function tick() {
      var w = words[wi];
      ci += del ? -1 : 1;
      typed.textContent = w.slice(0, ci);
      var wait = del ? 28 : 55;
      if (!del && ci === w.length) { del = true; wait = 2400; }
      else if (del && ci === 0) { del = false; wi = (wi + 1) % words.length; wait = 350; }
      setTimeout(tick, wait);
    })();
    // hold the first word before starting to delete
    del = false; ci = words[0].length - 1;
  }

  /* ---------- presentation cards ---------- */
  var ICON = {
    l: '<svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg>',
    r: '<svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>',
    go: '<svg viewBox="0 0 24 24"><path d="M7 17L17 7M8 7h9v9"/></svg>'
  };
  var decksEl = $("#decks");
  if (decksEl && window.DECKS) {
    window.DECKS.forEach(function (d, idx) {
      var slides = window.deckSlides(d), url = "presentation.html?p=" + d.id;
      var el = document.createElement("article");
      el.className = "card deck reveal" + (idx === 0 && document.getElementById("filters") ? " feature" : "");
      el.dataset.group = d.group;
      el.style.setProperty("--d", (idx % 3) * 0.08 + "s");
      el.innerHTML =
        '<div class="deck-mwrap"><a class="deck-media" href="' + url + '" aria-label="Open ' + d.title.replace(/"/g, "") + '">' +
          '<img class="a show" src="' + slides[0].full + '" alt="" loading="lazy">' +
          '<img class="b" alt="">' +
          '<span class="shade"></span><span class="live">Playing</span>' +
          '<span class="hint">Hover to preview</span>' +
          '<span class="count">1 / ' + slides.length + '</span>' +
          '<span class="bar"><i></i></span>' +
        '</a>' +
        '<button class="deck-nav prev" aria-label="Previous slide">' + ICON.l + '</button>' +
        '<button class="deck-nav next" aria-label="Next slide">' + ICON.r + '</button></div>' +
        '<div class="deck-body">' +
          '<span class="kind">' + d.kind + '</span>' +
          '<h3>' + d.title + '</h3>' +
          '<p>' + d.summary + '</p>' +
          '<div class="deck-foot"><span>' + slides.length + ' ' + d.unit + ' · ' + d.fileType + '</span>' +
          '<a href="' + url + '">Open ' + ICON.go + '</a></div>' +
        '</div>';
      decksEl.appendChild(el);

      var a = $("img.a", el), b = $("img.b", el), cnt = $(".count", el), fill = $(".bar i", el);
      var i = 0, front = a, back = b, timer = null;
      function show(n) {
        i = (n + slides.length) % slides.length;
        var pre = new Image();
        pre.onload = function () {
          back.src = pre.src;
          back.classList.add("show"); back.classList.remove("hidden");
          front.classList.remove("show"); front.classList.add("hidden");
          var t = front; front = back; back = t;
        };
        pre.src = slides[i].full;
        cnt.textContent = (i + 1) + " / " + slides.length;
        fill.style.width = ((i + 1) / slides.length * 100) + "%";
        new Image().src = slides[(i + 1) % slides.length].full; // warm the next one
      }
      function play() {
        if (timer) return;
        el.classList.add("playing");
        timer = setInterval(function () { show(i + 1); }, 1700);
        setTimeout(function () { if (timer && i === 0) show(1); }, 350);
      }
      function stop() { clearInterval(timer); timer = null; el.classList.remove("playing"); }
      el.addEventListener("mouseenter", play);
      el.addEventListener("mouseleave", stop);
      $(".prev", el).addEventListener("click", function () { stop(); show(i - 1); });
      $(".next", el).addEventListener("click", function () { stop(); show(i + 1); });
    });

    $$("#filters button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        $$("#filters button").forEach(function (x) { x.classList.toggle("on", x === btn); });
        var f = btn.dataset.f, first = true;
        $$(".deck", decksEl).forEach(function (c) {
          var on = f === "all" || c.dataset.group === f;
          c.classList.toggle("hide", !on);
          c.classList.toggle("feature", on && first && f === "all");
          if (on) first = false;
        });
      });
    });
  }

  /* ---------- reveal on scroll + counters ---------- */
  function countUp(el) {
    var to = parseFloat(el.dataset.count), dec = parseInt(el.dataset.dec || "0", 10), suf = el.dataset.suffix || "", pre = el.dataset.prefix || "";
    if (reduced) { el.textContent = pre + to.toFixed(dec) + suf; return; }
    var t0 = null;
    requestAnimationFrame(function step(t) {
      if (!t0) t0 = t;
      var p = Math.min(1, (t - t0) / 1600), e = 1 - Math.pow(1 - p, 4);
      el.textContent = pre + (to * e).toFixed(dec) + suf;
      if (p < 1) requestAnimationFrame(step);
    });
  }
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add("in");
        $$("[data-count]", en.target).forEach(countUp);
        io.unobserve(en.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    $$(".reveal").forEach(function (el) { io.observe(el); });

    var links = $$(".nav a[href^='#']");
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) links.forEach(function (l) { l.classList.toggle("active", l.getAttribute("href") === "#" + en.target.id); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    $$("section[id]").forEach(function (s) { spy.observe(s); });
  } else {
    $$(".reveal").forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- card spotlight ---------- */
  document.addEventListener("pointermove", function (e) {
    var c = e.target.closest && e.target.closest(".card");
    if (!c) return;
    var r = c.getBoundingClientRect();
    c.style.setProperty("--mx", (e.clientX - r.left) + "px");
    c.style.setProperty("--my", (e.clientY - r.top) + "px");
  }, { passive: true });

  /* ---------- hero: molecular network ---------- */
  var cv = $("#heroCanvas");
  if (cv && !reduced) {
    var ctx = cv.getContext("2d"), W, H, dpr, pts = [], mouse = { x: -999, y: -999 }, rgb;
    function colour() { rgb = root.getAttribute("data-theme") === "light" ? "168,132,47" : "190,202,224"; }
    function size() {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      W = cv.clientWidth; H = cv.clientHeight;
      cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.round(Math.min(90, W * H / 16000));
      pts = [];
      for (var k = 0; k < n; k++) pts.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35, r: Math.random() * 1.8 + .8 });
    }
    function frame() {
      ctx.clearRect(0, 0, W, H);
      for (var a = 0; a < pts.length; a++) {
        var p = pts[a];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        var dm = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        if (dm < 140) { p.x += (p.x - mouse.x) / dm * .6; p.y += (p.y - mouse.y) / dm * .6; }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283);
        ctx.fillStyle = "rgba(" + rgb + ",.55)"; ctx.fill();
        for (var b = a + 1; b < pts.length; b++) {
          var q = pts[b], d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 130) {
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = "rgba(" + rgb + "," + (0.16 * (1 - d / 130)) + ")"; ctx.lineWidth = 1; ctx.stroke();
          }
        }
      }
      if (running) requestAnimationFrame(frame);
    }
    var running = true;
    colour(); size(); frame();
    window.addEventListener("resize", size);
    window.addEventListener("themechange", colour);
    cv.parentElement.addEventListener("pointermove", function (e) { var r = cv.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; });
    cv.parentElement.addEventListener("pointerleave", function () { mouse.x = mouse.y = -999; });
    if ("IntersectionObserver" in window) new IntersectionObserver(function (en) {
      var v = en[0].isIntersecting;
      if (v && !running) { running = true; frame(); } else if (!v) running = false;
    }).observe(cv);
  }
})();

/* ---------- PDCA cycle ---------- */
(function () {
  var list = document.getElementById("pdcaList");
  if (!list) return;
  var items = list.querySelectorAll("li"), segs = document.querySelectorAll(".pdca .seg");
  var name = document.getElementById("pdcaName"), step = document.getElementById("pdcaStep");
  var names = ["Plan", "Do", "Check", "Act"], i = 0, timer;
  function set(n) {
    i = n % 4;
    for (var k = 0; k < 4; k++) { items[k].classList.toggle("on", k === i); segs[k].classList.toggle("on", k === i); }
    name.textContent = names[i]; step.textContent = "STEP " + (i + 1) + " OF 4";
  }
  function run() { clearInterval(timer); timer = setInterval(function () { set(i + 1); }, 2000); }
  for (var k = 0; k < 4; k++) (function (k) { items[k].addEventListener("click", function () { set(k); run(); }); })(k);
  set(0); run();
})();
