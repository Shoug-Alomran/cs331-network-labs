/* CS331 · shared site behaviour: theme, navigation, reveal, code, lightbox, search. */
(function () {
  "use strict";

  var root = document.documentElement;
  var body = document.body;
  var BASE = (body.getAttribute("data-base") || ".").replace(/\/?$/, "/");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  root.classList.add("js");

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function svg(paths) {
    return '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">' + paths + "</svg>";
  }
  var ICON_COPY = svg('<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>');
  var ICON_OK = svg('<path d="M20 6 9 17l-5-5"/>');

  /* ---- Theme ------------------------------------------------------------ */
  $$(".theme-toggle").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("cs331-theme", next); } catch (e) {}
    });
  });

  /* ---- Header: scrolled state, progress bar, back-to-top ---------------- */
  var header = $(".site-header");
  var progress = $(".progress");
  var toTop = $(".to-top");
  var ticking = false;
  function onScroll() {
    var y = window.scrollY;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    if (header) header.classList.toggle("scrolled", y > 8);
    if (progress) progress.style.setProperty("--p", max > 0 ? Math.min(1, y / max) : 0);
    if (toTop) toTop.classList.toggle("show", y > 900);
    ticking = false;
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();
  if (toTop) toTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }); });

  /* ---- Dropdowns (click/keyboard support on top of CSS hover) ----------- */
  $$(".nav-item").forEach(function (item) {
    var btn = $(".nav-link", item);
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = !item.classList.contains("open");
      $$(".nav-item.open").forEach(function (o) { o.classList.remove("open"); $(".nav-link", o).setAttribute("aria-expanded", "false"); });
      item.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", String(open));
    });
  });
  document.addEventListener("click", function () {
    $$(".nav-item.open").forEach(function (o) { o.classList.remove("open"); $(".nav-link", o).setAttribute("aria-expanded", "false"); });
  });

  /* ---- Mobile menu ------------------------------------------------------- */
  var menuBtn = $(".menu-btn");
  if (menuBtn) {
    menuBtn.addEventListener("click", function () {
      var open = !body.classList.contains("menu-open");
      body.classList.toggle("menu-open", open);
      menuBtn.setAttribute("aria-expanded", String(open));
      menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    $$(".mobile-nav a").forEach(function (a) {
      a.addEventListener("click", function () { body.classList.remove("menu-open"); });
    });
  }

  /* ---- Prose enhancements ------------------------------------------------ */
  var prose = $(".prose");
  if (prose) {
    // Wrap tables so they scroll horizontally on small screens.
    $$("table", prose).forEach(function (t) {
      if (t.parentElement.classList.contains("table-wrap")) return;
      var wrap = document.createElement("div");
      wrap.className = "table-wrap reveal";
      var head = t.querySelector("tr");
      if (head && head.children.length > 8) t.classList.add("dense");
      t.parentNode.insertBefore(wrap, t);
      wrap.appendChild(t);
    });

    // Turn "Completed" cells into status pills; colour signed numbers.
    $$("td", prose).forEach(function (td) {
      var txt = td.textContent.trim();
      if (txt === "Completed" || txt === "Complete") td.innerHTML = '<span class="status-done">' + txt + "</span>";
      if (/^-\d/.test(txt) && td.getAttribute("align") === "right") td.classList.add("neg");
    });

    // Glossary: wrap each dt/dd pair in a card.
    $$("dl", prose).forEach(function (dl) {
      var kids = Array.prototype.slice.call(dl.children);
      var card = null;
      kids.forEach(function (el) {
        if (el.tagName === "DT") {
          card = document.createElement("div");
          card.className = "gloss";
          dl.insertBefore(card, el);
        }
        if (card) card.appendChild(el);
      });
    });

    // Reveal the main building blocks as they scroll in.
    $$(".prose > h2, .prose > p, .prose > ul, .prose > ol, .prose > .highlight, .prose > .admonition, .prose > details, .prose > .grid > *, .prose .cmd, .prose .gloss, .prose > .panel, .prose > .stats, .prose > .embed, .prose > .steps > .step").forEach(function (el) {
      el.classList.add("reveal");
    });
  }

  /* ---- Code blocks: header with dots, language and copy button ---------- */
  $$(".highlight").forEach(function (block) {
    var pre = $("pre", block);
    if (!pre) return;
    var lang = "";
    var m = (block.className + " " + (($("code", block) || {}).className || "")).match(/language-([\w-]+)/);
    if (m) lang = m[1];
    var title = $(".filename", block);
    var head = document.createElement("div");
    head.className = "code-head";
    head.innerHTML = '<span class="dots" aria-hidden="true"><i></i><i></i><i></i></span>' +
      '<span class="name"></span><span class="lang"></span>';
    $(".name", head).textContent = title ? title.textContent : "";
    $(".lang", head).textContent = lang === "text" ? "" : lang;
    if (title) title.remove();
    var copy = document.createElement("button");
    copy.type = "button";
    copy.className = "copy-btn";
    copy.innerHTML = ICON_COPY + "<span>Copy</span>";
    copy.setAttribute("aria-label", "Copy code");
    copy.addEventListener("click", function () {
      var code = $("code", pre) || pre;
      var text = code.innerText.replace(/\n$/, "");
      var done = function () {
        copy.classList.add("done");
        copy.innerHTML = ICON_OK + "<span>Copied</span>";
        setTimeout(function () { copy.classList.remove("done"); copy.innerHTML = ICON_COPY + "<span>Copy</span>"; }, 1600);
      };
      if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, function () {});
    });
    head.appendChild(copy);
    block.insertBefore(head, block.firstChild);
  });

  /* ---- Galleries: turn Markdown images into captioned figures ---------- */
  $$(".gallery").forEach(function (g) {
    $$("img", g).forEach(function (img) {
      var p = img.closest("p");
      var fig = document.createElement("figure");
      fig.className = "reveal";
      var cap = document.createElement("figcaption");
      cap.textContent = img.getAttribute("alt") || "";
      img.setAttribute("loading", "lazy");
      fig.appendChild(img);
      fig.appendChild(cap);
      if (p && p.parentElement === g) g.replaceChild(fig, p); else g.appendChild(fig);
    });
  });

  /* ---- Lightbox ------------------------------------------------------- */
  var lb = $(".lightbox");
  if (lb) {
    var lbImg = $("img", lb);
    var lbCap = $(".lightbox-cap", lb);
    var lastFocus = null;
    var openLb = function (src, alt) {
      lastFocus = document.activeElement;
      lbImg.src = src;
      lbImg.alt = alt || "";
      lbCap.textContent = alt || "";
      lb.hidden = false;
      requestAnimationFrame(function () { lb.classList.add("open"); });
      $(".lightbox-close", lb).focus();
    };
    var closeLb = function () {
      lb.classList.remove("open");
      setTimeout(function () { lb.hidden = true; lbImg.src = ""; }, 220);
      if (lastFocus) lastFocus.focus();
    };
    document.addEventListener("click", function (e) {
      var fig = e.target.closest(".gallery figure, .shot, .prose > p > img");
      if (!fig) return;
      var img = fig.tagName === "IMG" ? fig : $("img", fig);
      if (img) openLb(img.currentSrc || img.src, img.alt);
    });
    lb.addEventListener("click", function (e) { if (e.target !== lbImg) closeLb(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !lb.hidden) closeLb(); });
  }

  /* ---- Pointer spotlight on cards -------------------------------------- */
  document.addEventListener("pointermove", function (e) {
    var card = e.target.closest && e.target.closest(".card");
    if (!card) return;
    var r = card.getBoundingClientRect();
    card.style.setProperty("--mx", (e.clientX - r.left) + "px");
    card.style.setProperty("--my", (e.clientY - r.top) + "px");
  }, { passive: true });

  /* ---- Reveal on scroll + counters ------------------------------------- */
  function countUp(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var dec = parseInt(el.getAttribute("data-dec") || "0", 10);
    var comma = el.getAttribute("data-format") === "comma";
    var fmt = function (v) {
      var s = v.toFixed(dec);
      return comma ? Number(s).toLocaleString("en-US", { minimumFractionDigits: dec }) : s;
    };
    if (reduceMotion) { el.textContent = fmt(target); return; }
    var start = null;
    var dur = 1400;
    var step = function (t) {
      if (!start) start = t;
      var p = Math.min(1, (t - start) / dur);
      var eased = 1 - Math.pow(1 - p, 4);
      el.textContent = fmt(target * eased);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  var revealables = $$(".reveal, .bars, .chart, .dumbbell, [data-count]");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        el.classList.add("in");
        if (el.hasAttribute("data-count")) countUp(el);
        el.dispatchEvent(new CustomEvent("reveal"));
        io.unobserve(el);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    revealables.forEach(function (el) { io.observe(el); });
  } else {
    root.classList.add("no-js");
    revealables.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- Table of contents scrollspy ------------------------------------- */
  var tocLinks = $$(".toc nav a");
  if (tocLinks.length) {
    var targets = tocLinks.map(function (a) {
      return document.getElementById(decodeURIComponent(a.getAttribute("href").slice(1)));
    });
    var spy = function () {
      var y = window.scrollY + 140;
      var idx = 0;
      targets.forEach(function (t, i) { if (t && t.offsetTop <= y) idx = i; });
      tocLinks.forEach(function (a, i) { a.classList.toggle("active", i === idx); });
    };
    window.addEventListener("scroll", spy, { passive: true });
    spy();
  }

  /* ---- Filterable blocks (commands, glossary) -------------------------- */
  $$("[data-filter]").forEach(function (box) {
    var input = $("input", box);
    var count = $(".count", box);
    var scope = document.querySelector(box.getAttribute("data-filter"));
    var itemSel = box.getAttribute("data-items");
    var empty = $(".filter-empty");
    if (!scope || !input) return;
    var items = $$(itemSel, scope);
    var sections = $$("h2", scope);
    var update = function () {
      var q = input.value.trim().toLowerCase();
      var shown = 0;
      items.forEach(function (it) {
        var hit = !q || it.textContent.toLowerCase().indexOf(q) !== -1;
        it.classList.toggle("is-filtered-out", !hit);
        if (hit) shown++;
      });
      // Hide section headings whose group is empty.
      sections.forEach(function (h) {
        var group = [];
        var n = h.nextElementSibling;
        while (n && n.tagName !== "H2") { group.push(n); n = n.nextElementSibling; }
        var any = group.some(function (g) {
          var its = g.matches(itemSel) ? [g] : $$(itemSel, g);
          return its.some(function (x) { return !x.classList.contains("is-filtered-out"); });
        });
        var hasItems = group.some(function (g) { return g.matches(itemSel) || $$(itemSel, g).length; });
        h.classList.toggle("is-filtered-out", q && hasItems && !any);
        group.forEach(function (g) {
          if (g.matches(itemSel)) return;
          var its = $$(itemSel, g);
          var visible = its.some(function (x) { return !x.classList.contains("is-filtered-out"); });
          // Containers hide when all their items are filtered out; loose content
          // (intro paragraphs) hides with its section heading.
          g.classList.toggle("is-filtered-out", !!(q && (its.length ? !visible : hasItems && !any)));
        });
      });
      if (count) count.textContent = shown + " / " + items.length;
      if (empty) empty.classList.toggle("show", shown === 0);
    };
    input.addEventListener("input", update);
    update();
  });

  /* ---- Search palette (uses MkDocs' search_index.json) ----------------- */
  var palette = $(".palette");
  if (palette) {
    var pInput = $("input", palette);
    var pResults = $(".palette-results", palette);
    var index = null;
    var sel = 0;
    var loadIndex = function () {
      if (index) return Promise.resolve(index);
      return fetch(BASE + "search/search_index.json").then(function (r) { return r.json(); }).then(function (data) {
        index = (data.docs || []).map(function (d) {
          var page = d.location.split("#")[0];
          return { loc: d.location, page: page, title: d.title || "", text: (d.text || "").replace(/<[^>]+>/g, " ").replace(/\s#(?=\s|$)/g, " ").replace(/\s+/g, " ").trim() };
        });
        return index;
      }).catch(function () { index = []; return index; });
    };
    var pageTitles = {};
    var esc = function (s) { return s.replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
    var hl = function (s, terms) {
      var out = esc(s);
      terms.forEach(function (t) {
        if (t.length < 2) return;
        out = out.replace(new RegExp("(" + t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "ig"), "<mark>$1</mark>");
      });
      return out;
    };
    var snippet = function (text, terms) {
      var lower = text.toLowerCase();
      var pos = -1;
      terms.some(function (t) { pos = lower.indexOf(t); return pos !== -1; });
      if (pos < 0) return text.slice(0, 140);
      var start = Math.max(0, pos - 50);
      return (start ? "…" : "") + text.slice(start, start + 150) + "…";
    };
    var render = function () {
      var q = pInput.value.trim().toLowerCase();
      if (!q) {
        pResults.innerHTML = '<div class="palette-empty">Try “TTL”, “subnet”, “icmp” or “show ip”.</div>';
        return;
      }
      var terms = q.split(/\s+/);
      index.forEach(function (d) { if (d.loc === d.page) pageTitles[d.page] = d.title; });
      var scored = [];
      index.forEach(function (d) {
        var t = d.title.toLowerCase();
        var x = d.text.toLowerCase();
        var score = 0;
        var all = terms.every(function (term) {
          var inT = t.indexOf(term) !== -1;
          var inX = x.indexOf(term) !== -1;
          if (inT) score += 10;
          if (inX) score += 2;
          return inT || inX;
        });
        if (!all) return;
        if (d.loc === d.page) score += 3;
        scored.push({ d: d, s: score });
      });
      scored.sort(function (a, b) { return b.s - a.s; });
      var seen = {};
      var html = "";
      var n = 0;
      scored.forEach(function (r) {
        if (n >= 12 || seen[r.d.loc]) return;
        seen[r.d.loc] = 1;
        var parent = pageTitles[r.d.page] || "";
        var crumb = "~/" + r.d.page.replace(/\/$/, "") + (parent && parent !== r.d.title ? " · " + parent : "");
        html += '<a role="option" href="' + BASE + r.d.loc + '"><b>' + hl(r.d.title, terms) + "</b><small>" + esc(crumb) + "</small><span>" + hl(snippet(r.d.text, terms), terms) + "</span></a>";
        n++;
      });
      pResults.innerHTML = html || '<div class="palette-empty">No results for “' + esc(q) + "”.</div>";
      sel = 0;
      mark();
    };
    var mark = function () {
      $$("a", pResults).forEach(function (a, i) {
        a.classList.toggle("sel", i === sel);
        if (i === sel) a.scrollIntoView({ block: "nearest" });
      });
    };
    var openP = function () {
      palette.hidden = false;
      body.style.overflow = "hidden";
      pInput.value = "";
      loadIndex().then(render);
      setTimeout(function () { pInput.focus(); }, 10);
    };
    var closeP = function () {
      palette.hidden = true;
      body.style.overflow = "";
    };
    $$("[data-search-open]").forEach(function (b) { b.addEventListener("click", openP); });
    $$("[data-search-close]", palette).forEach(function (b) { b.addEventListener("click", closeP); });
    pInput.addEventListener("input", function () { if (index) render(); });
    palette.addEventListener("click", function (e) { if (e.target.closest(".palette-results a")) closeP(); });
    document.addEventListener("keydown", function (e) {
      var k = e.key;
      if ((e.metaKey || e.ctrlKey) && k.toLowerCase() === "k") { e.preventDefault(); palette.hidden ? openP() : closeP(); return; }
      if (k === "/" && palette.hidden && !/input|textarea|select/i.test((document.activeElement || {}).tagName || "")) { e.preventDefault(); openP(); return; }
      if (palette.hidden) return;
      var links = $$("a", pResults);
      if (k === "Escape") closeP();
      else if (k === "ArrowDown") { e.preventDefault(); sel = Math.min(links.length - 1, sel + 1); mark(); }
      else if (k === "ArrowUp") { e.preventDefault(); sel = Math.max(0, sel - 1); mark(); }
      else if (k === "Enter" && links[sel]) { e.preventDefault(); window.location.href = links[sel].href; closeP(); }
    });
  }
})();
