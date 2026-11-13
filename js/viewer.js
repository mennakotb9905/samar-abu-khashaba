(function () {
  "use strict";
  var $ = function (s) { return document.querySelector(s); };
  var id = new URLSearchParams(location.search).get("p");
  var all = window.DECKS || [];
  var d = all.filter(function (x) { return x.id === id; })[0];
  if (!d) { location.replace("index.html#presentations"); return; }

  // the "more" grid on this page shows every other deck (main.js renders window.DECKS)
  window.DECKS = all.filter(function (x) { return x.id !== d.id; });

  var slides = window.deckSlides(d), N = slides.length;
  document.title = d.title + " — Dr. Samar Abu Khashaba";
  $("#pKind").textContent = d.kind;
  $("#pTitle").textContent = d.title;
  $("#pSub").textContent = d.subtitle;
  $("#pMeta").innerHTML = ['<span class="tag gold">' + N + " " + d.unit + "</span>", '<span class="tag gold">' + d.fileType + "</span>"]
    .concat(d.tags.map(function (t) { return '<span class="tag">' + t + "</span>"; })).join("");
  $("#pDesc").innerHTML = d.description.map(function (p) { return "<p>" + p + "</p>"; }).join("");
  $("#pPoints").innerHTML = d.points.map(function (p) { return "<li>" + p + "</li>"; }).join("");
  var dl = $("#pDownload");
  dl.href = d.file;
  dl.firstChild.textContent = "Download " + d.fileType + " ";

  var frame = $("#frame"), A = $("#imgA"), B = $("#imgB"), front = A, back = B;
  var range = $("#range"), cur = $("#cur"), thumbs = $("#thumbs"), box = $("#viewerBox");
  frame.style.aspectRatio = d.w + " / " + d.h;
  if (d.h > d.w) { frame.style.maxHeight = "none"; frame.style.maxWidth = "820px"; frame.style.margin = "0 auto"; }
  $("#tot").textContent = N;
  range.max = N;

  thumbs.innerHTML = slides.map(function (s, k) {
    return '<button data-i="' + k + '" aria-label="Go to ' + (k + 1) + '"><img loading="lazy" src="' + s.thumb + '" alt=""><i>' + (k + 1) + "</i></button>";
  }).join("");
  var tbtns = thumbs.querySelectorAll("button");

  var i = -1, token = 0;
  function go(n, silent) {
    n = Math.max(0, Math.min(N - 1, n));
    if (n === i) return;
    var dir = n > i ? "from-r" : "from-l", my = ++token;
    i = n;
    var pre = new Image();
    pre.onload = function () {
      if (my !== token) return;
      back.className = dir; back.src = pre.src;
      void back.offsetWidth;
      back.className = "show"; front.className = "";
      var t = front; front = back; back = t;
    };
    pre.src = slides[i].full;
    if (i + 1 < N) new Image().src = slides[i + 1].full;
    cur.textContent = i + 1;
    range.value = i + 1;
    range.style.setProperty("--p", (N > 1 ? i / (N - 1) * 100 : 100) + "%");
    for (var k = 0; k < tbtns.length; k++) tbtns[k].classList.toggle("on", k === i);
    var tb = tbtns[i];
    thumbs.scrollLeft = tb.offsetLeft - thumbs.clientWidth / 2 + tb.clientWidth / 2;
    if (!silent) history.replaceState(null, "", location.pathname + location.search + "#slide=" + (i + 1));
  }

  var m = /slide=(\d+)/.exec(location.hash);
  A.src = slides[0].full;
  go(m ? parseInt(m[1], 10) - 1 : 0, true);

  $("#prev").addEventListener("click", function () { stop(); go(i - 1); });
  $("#next").addEventListener("click", function () { stop(); go(i + 1); });
  range.addEventListener("input", function () { stop(); go(range.value - 1); });
  thumbs.addEventListener("click", function (e) {
    var b = e.target.closest("button"); if (b) { stop(); go(+b.dataset.i); }
  });

  /* autoplay */
  var timer = null, playBtn = $("#playBtn");
  var PLAY = '<svg viewBox="0 0 24 24"><path d="M7 4l13 8-13 8z"/></svg>', PAUSE = '<svg viewBox="0 0 24 24"><path d="M8 5v14M16 5v14"/></svg>';
  function stop() { clearInterval(timer); timer = null; playBtn.classList.remove("on"); playBtn.innerHTML = PLAY; }
  function play() {
    if (i >= N - 1) go(0);
    playBtn.classList.add("on"); playBtn.innerHTML = PAUSE;
    timer = setInterval(function () { if (i >= N - 1) stop(); else go(i + 1); }, 3200);
  }
  playBtn.addEventListener("click", function () { timer ? stop() : play(); });

  /* fullscreen */
  function fs() {
    if (document.fullscreenElement) document.exitFullscreen();
    else if (box.requestFullscreen) box.requestFullscreen();
  }
  $("#fsBtn").addEventListener("click", fs);
  $("#stage").addEventListener("dblclick", fs);

  /* keyboard + swipe */
  document.addEventListener("keydown", function (e) {
    if (e.target.tagName === "INPUT" && e.key !== " ") return;
    if (e.key === "ArrowRight" || e.key === "PageDown") { stop(); go(i + 1); }
    else if (e.key === "ArrowLeft" || e.key === "PageUp") { stop(); go(i - 1); }
    else if (e.key === "Home") { stop(); go(0); }
    else if (e.key === "End") { stop(); go(N - 1); }
    else if (e.key === " ") { e.preventDefault(); timer ? stop() : play(); }
    else if (e.key === "f" || e.key === "F") fs();
  });
  var sx = null;
  $("#stage").addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; }, { passive: true });
  $("#stage").addEventListener("touchend", function (e) {
    if (sx === null) return;
    var dx = e.changedTouches[0].clientX - sx; sx = null;
    if (Math.abs(dx) > 40) { stop(); go(i + (dx < 0 ? 1 : -1)); }
  });

  /* share */
  $("#pShare").addEventListener("click", function () {
    var url = location.href.split("#")[0], t = $("#toast");
    function done() { t.classList.add("show"); setTimeout(function () { t.classList.remove("show"); }, 1800); }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(done, done);
    else { var ta = document.createElement("textarea"); ta.value = url; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); ta.remove(); done(); }
  });
})();
