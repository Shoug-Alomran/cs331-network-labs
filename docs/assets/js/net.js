/* CS331 · network behaviour on top of site.js:
   1. Cisco IOS / shell prompt colouring in code blocks
   2. Topology diagram (drawn once, reused by the hero console and the ping lab)
   3. Hero console: R1 status, then PC A pings PC2 across the router
   4. Ping lab: pick source, destination and cabling, watch the packet
   5. Packet list filters (Wireshark-style rows with live counts) */
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var SVGNS = "http://www.w3.org/2000/svg";
  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }
  function sleep(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
  function el(tag, attrs, parent) {
    var n = document.createElementNS(SVGNS, tag);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  }

  /* ---------- 1. Prompt colouring ------------------------------------------ */
  var PROMPT = /^((?:[\w.-]+(?:\([\w-]+\))?(?:#|&gt;))|C:\\&gt;|% )/gm;
  $$(".highlight").forEach(function (block) {
    if (!/\bios\b/.test(block.className)) return;
    var code = $("code", block);
    if (!code || code.querySelector("*:not(span)")) return;
    code.innerHTML = code.innerHTML
      .replace(PROMPT, '<span class="ios-prompt">$1</span>')
      .replace(/(\(100% loss\)|Request timed out\.|Operation timed out)/g, '<span class="ios-bad">$1</span>')
      .replace(/(\bup(\s+)up\b|200 OK|TTL=127|\(0% loss\))/g, '<span class="ios-ok">$1</span>')
      .replace(/^(!.*)$/gm, '<span class="ios-dim">$1</span>');
  });

  /* ---------- 2. Topology ---------------------------------------------------- */
  // Project 1: R1 (2901) with G0/0 → Switch1 (Network A) and G0/1 → Switch2 (Network B)
  var NODES = {
    R1: { x: 320, y: 44, w: 104, label: "R1", sub: "2901", kind: "router" },
    SW1: { x: 160, y: 140, w: 96, label: "Switch1", sub: "2960", kind: "switch" },
    SW2: { x: 480, y: 140, w: 96, label: "Switch 2", sub: "2960", kind: "switch" },
    PCA: { x: 70, y: 238, w: 84, label: "PC A", sub: ".2", net: "A", ip: "199.19.30.2" },
    PCB: { x: 220, y: 238, w: 84, label: "PC B", sub: ".3", net: "A", ip: "199.19.30.3" },
    PC1: { x: 390, y: 238, w: 84, label: "PC1", sub: ".66", net: "B", ip: "199.19.30.66" },
    PC2: { x: 480, y: 238, w: 84, label: "PC2", sub: ".67", net: "B", ip: "199.19.30.67" },
    SRV: { x: 570, y: 238, w: 84, label: "Server 1", sub: ".68", net: "B", ip: "199.19.30.68" }
  };
  var PORT = { G00: { x: 290, y: 64 }, G01: { x: 350, y: 64 } };

  function drawTopo(svg, opts) {
    opts = opts || {};
    svg.setAttribute("viewBox", "0 0 640 290");
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    var g = el("g", {}, svg);
    el("rect", { class: "zone", x: 22, y: 112, width: 266, height: 160, rx: 14 }, g);
    el("rect", { class: "zone", x: 342, y: 112, width: 278, height: 160, rx: 14 }, g);
    el("text", { class: "net", x: 34, y: 284 }, g).textContent = "Network A · 199.19.30.0/26";
    el("text", { class: "net", x: 354, y: 284 }, g).textContent = "Network B · 199.19.30.64/26";
    var swapped = !!opts.swapped;
    // Router uplinks: correct = Switch1→G0/0, Switch2→G0/1; swapped crosses them
    var a = swapped ? PORT.G01 : PORT.G00, b = swapped ? PORT.G00 : PORT.G01;
    var up1 = el("path", { class: "wire trunk", d: "M160,122 C160,92 " + a.x + ",96 " + a.x + "," + a.y }, g);
    var up2 = el("path", { class: "wire trunk", d: "M480,122 C480,92 " + b.x + ",96 " + b.x + "," + b.y }, g);
    if (swapped) { up1.setAttribute("stroke-dasharray", "6 5"); up2.setAttribute("stroke-dasharray", "6 5"); }
    ["PCA", "PCB"].forEach(function (k) { el("line", { class: "wire", x1: 160, y1: 158, x2: NODES[k].x, y2: 220 }, g); });
    ["PC1", "PC2", "SRV"].forEach(function (k) { el("line", { class: "wire", x1: 480, y1: 158, x2: NODES[k].x, y2: 220 }, g); });
    el("text", { class: "sub", x: 246, y: 72, "text-anchor": "end" }, g).textContent = "G0/0 · .1";
    el("text", { class: "sub", x: 394, y: 72 }, g).textContent = "G0/1 · .65";
    var nodes = {};
    Object.keys(NODES).forEach(function (k) {
      var n = NODES[k], h = 36;
      var ng = el("g", { class: "node" + (n.kind ? " " + n.kind : "") + (opts.src === k ? " src" : "") + (opts.dst === k ? " dst" : "") }, g);
      el("rect", { x: n.x - n.w / 2, y: n.y - h / 2, width: n.w, height: h, rx: 9 }, ng);
      el("circle", { class: "ledc", cx: n.x + n.w / 2 - 8, cy: n.y - h / 2 + 8, r: 2.6 }, ng);
      el("text", { x: n.x, y: n.y - 1, "text-anchor": "middle" }, ng).textContent = n.label;
      el("text", { class: "sub", x: n.x, y: n.y + 12, "text-anchor": "middle" }, ng).textContent = n.sub;
      nodes[k] = ng;
    });
    return { g: g, nodes: nodes, swapped: swapped };
  }

  // Waypoints for a packet between two hosts (or to the gateway)
  function route(from, to, swapped) {
    var f = NODES[from], sw = f.net === "A" ? NODES.SW1 : NODES.SW2;
    var pts = [[f.x, 220], [sw.x, 158], [sw.x, 122]];
    var ownPort = f.net === "A" ? (swapped ? PORT.G01 : PORT.G00) : (swapped ? PORT.G00 : PORT.G01);
    if (to === "GW") { pts.push([ownPort.x, ownPort.y]); return pts; }
    var t = NODES[to];
    if (t.net === f.net) return [[f.x, 220], [sw.x, 158], [t.x, 220]];
    var sw2 = t.net === "A" ? NODES.SW1 : NODES.SW2;
    var farPort = t.net === "A" ? (swapped ? PORT.G01 : PORT.G00) : (swapped ? PORT.G00 : PORT.G01);
    pts.push([ownPort.x, ownPort.y], [farPort.x, farPort.y], [sw2.x, 122], [sw2.x, 158], [t.x, 220]);
    return pts;
  }

  function animatePacket(svg, pts, cls, ms, onPoint) {
    if (reduce) return Promise.resolve();
    var dot = el("circle", { class: "pkt" + (cls ? " " + cls : ""), r: 5.5, cx: pts[0][0], cy: pts[0][1] }, svg);
    var segs = [], total = 0;
    for (var i = 1; i < pts.length; i++) {
      var d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
      segs.push(d); total += d;
    }
    return new Promise(function (resolve) {
      var start = null, lastIdx = 0;
      function frame(t) {
        if (!start) start = t;
        var p = Math.min(1, (t - start) / ms), dist = p * total, acc = 0;
        for (var s = 0; s < segs.length; s++) {
          if (acc + segs[s] >= dist || s === segs.length - 1) {
            var q = segs[s] ? Math.min(1, (dist - acc) / segs[s]) : 1;
            dot.setAttribute("cx", pts[s][0] + (pts[s + 1][0] - pts[s][0]) * q);
            dot.setAttribute("cy", pts[s][1] + (pts[s + 1][1] - pts[s][1]) * q);
            if (s + 1 > lastIdx && q >= 1) { lastIdx = s + 1; if (onPoint) onPoint(pts[s + 1]); }
            break;
          }
          acc += segs[s];
        }
        if (p < 1) requestAnimationFrame(frame);
        else { dot.remove(); resolve(); }
      }
      requestAnimationFrame(frame);
    });
  }

  function flashText(svg, x, y, text, cls) {
    if (reduce) return;
    var t = el("text", { x: x, y: y, "text-anchor": "middle", class: "sub", style: "fill:var(" + (cls || "--hot") + ");font-weight:600;transition:opacity .6s" }, svg);
    t.textContent = text;
    setTimeout(function () { t.style.opacity = "0"; }, 900);
    setTimeout(function () { t.remove(); }, 1600);
  }

  /* ---------- 3. Hero console ---------------------------------------------- */
  var hero = $("[data-net-hero]");
  if (hero) {
    var hsvg = $(".topo svg", hero), term = $(".term", hero), tag = $("[data-term-phase]", hero), file = $("[data-term-file]", hero);
    var topo = drawTopo(hsvg, { src: "PCA", dst: "PC2" });
    var ports = {};
    $$("[data-port]", hero).forEach(function (p) { ports[p.getAttribute("data-port")] = p; });
    var lines = [];
    var render = function (cursor) {
      term.innerHTML = lines.slice(-9).join("\n") + (cursor ? '<span class="cursor"></span>' : "");
    };
    var esc = function (s) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); };
    var type = function (prompt, cmd) {
      lines.push('<span class="p">' + esc(prompt) + "</span>");
      var i = 0;
      return new Promise(function (res) {
        (function step() {
          lines[lines.length - 1] = '<span class="p">' + esc(prompt) + '</span><span class="c">' + esc(cmd.slice(0, i)) + "</span>";
          render(true);
          if (i++ < cmd.length) setTimeout(step, 38 + Math.random() * 40); else res();
        })();
      });
    };
    var out = function (html) { lines.push(html); render(true); };
    var blink = function (keys) {
      keys.forEach(function (k) {
        var p = ports[k]; if (!p) return;
        p.classList.add("tx"); setTimeout(function () { p.classList.remove("tx"); }, 260);
      });
    };
    var hit = function (pt) {
      // Light the port of whichever device the packet just reached
      var near = { "70,220": "PCA", "290,64": "G00", "350,64": "G01", "480,220": "PC2" };
      var k = near[Math.round(pt[0]) + "," + Math.round(pt[1])];
      if (k) blink([k]);
    };
    var replies = ["time=32ms", "time=11ms", "time<1ms", "time<1ms"];
    var finalText = function () {
      lines = [
        '<span class="p">R1#</span><span class="c">show ip interface brief</span>',
        '<span class="o">Interface            IP-Address    Status  Protocol</span>',
        '<span class="o">GigabitEthernet0/0   199.19.30.1   </span><span class="a">up      up</span>',
        '<span class="o">GigabitEthernet0/1   199.19.30.65  </span><span class="a">up      up</span>',
        '<span class="p">C:\\&gt;</span><span class="c">ping 199.19.30.67</span>'
      ];
      replies.forEach(function (t) { lines.push('<span class="o">Reply from 199.19.30.67: bytes=32 ' + t + ' </span><span class="h">TTL=127</span>'); });
      render(false);
    };
    if (reduce) {
      finalText();
      if (tag) tag.textContent = "pc a → pc2";
    } else {
      (async function loop() {
        for (;;) {
          lines = [];
          if (file) file.textContent = "R1 · console";
          if (tag) tag.textContent = "router";
          await type("R1#", "show ip interface brief");
          await sleep(250);
          out('<span class="o">Interface            IP-Address    Status  Protocol</span>');
          await sleep(140);
          out('<span class="o">GigabitEthernet0/0   199.19.30.1   </span><span class="a">up      up</span>'); blink(["G00"]);
          await sleep(140);
          out('<span class="o">GigabitEthernet0/1   199.19.30.65  </span><span class="a">up      up</span>'); blink(["G01"]);
          await sleep(1100);
          if (file) file.textContent = "PC A · Command Prompt";
          if (tag) tag.textContent = "pc a → pc2";
          await type("C:\\>", "ping 199.19.30.67");
          await sleep(300);
          out('<span class="o">Pinging 199.19.30.67 with 32 bytes of data:</span>');
          for (var n = 0; n < 4; n++) {
            await animatePacket(hsvg, route("PCA", "PC2", false), "", 1500, function (pt) {
              hit(pt);
              if (pt[0] === 350 && pt[1] === 64) flashText(hsvg, 320, 108, "TTL 128 → 127");
            });
            await animatePacket(hsvg, route("PC2", "PCA", false), "rep", 1400, hit);
            out('<span class="o">Reply from 199.19.30.67: bytes=32 ' + replies[n] + ' </span><span class="h">TTL=127</span>');
            await sleep(260);
          }
          out('<span class="o">    Packets: Sent = 4, Received = 4, Lost = 0 </span><span class="a">(0% loss)</span>');
          await sleep(3400);
        }
      })();
    }
  }

  /* ---------- 4. Ping lab ---------------------------------------------------- */
  var lab = $("[data-ping-lab]");
  if (lab) {
    var lsvg = $(".topo svg", lab), lout = $(".term-out", lab), note = $(".lab-note", lab);
    var state = { src: "PCA", dst: "PC2", cab: "ok" };
    var busy = 0;
    var LABEL = { PCA: "PC A", PCB: "PC B", PC2: "PC2", SRV: "Server 1", GW: "its gateway" };
    var setOut = function (k, html, cls) {
      var dd = $('[data-out="' + k + '"]', lab);
      dd.innerHTML = html;
      dd.className = cls || "";
    };
    var resolveDst = function () {
      if (state.dst === "LAN") return state.src === "PCA" ? "PCB" : "PCA";
      return state.dst;
    };
    var run = async function () {
      var id = ++busy;
      var src = state.src, dst = resolveDst(), swapped = state.cab === "swap";
      drawTopo(lsvg, { src: src, dst: dst === "GW" ? "R1" : dst, swapped: swapped });
      var f = NODES[src];
      var gwIp = f.net === "A" ? "199.19.30.1" : "199.19.30.65";
      var dIp = dst === "GW" ? gwIp : NODES[dst].ip;
      var sameLan = dst !== "GW" && NODES[dst].net === f.net;
      var ok = !swapped || sameLan;
      var ttl = dst === "GW" ? 255 : (sameLan ? 128 : 127);
      var hops = dst === "GW" || sameLan ? "0" : "1";
      var txt = ['<span style="color:var(--accent)">C:\\&gt;</span>ping ' + dIp, ""];
      lout.innerHTML = txt.join("\n");
      ["ttl", "hops", "res"].forEach(function (k) { setOut(k, "…"); });
      note.style.setProperty("--c", "var(--line-2)");
      note.innerHTML = "Sending four echo requests from <b>" + LABEL[src] + "</b> (" + f.ip + ") to <b>" + (dst === "GW" ? "its gateway" : LABEL[dst] || NODES[dst].label) + "</b> (" + dIp + ")…";
      var times = (src === "PCA" && dst === "PC2" && !swapped) ? ["time=32ms", "time=11ms", "time<1ms", "time<1ms"] : ["time<1ms", "time<1ms", "time<1ms", "time<1ms"];
      var pts = route(src, dst, swapped);
      for (var n = 0; n < 4; n++) {
        if (id !== busy) return;
        if (ok) {
          await animatePacket(lsvg, pts, "", 1100, function (pt) {
            if (!sameLan && dst !== "GW" && (pt[0] === 290 || pt[0] === 350) && pt[1] === 64 && pt === pts[4]) flashText(lsvg, 320, 108, "TTL −1");
          });
          if (id !== busy) return;
          await animatePacket(lsvg, pts.slice().reverse(), "rep", 1000);
          txt.push("Reply from " + dIp + ": bytes=32 " + times[n] + " TTL=" + ttl);
        } else {
          await animatePacket(lsvg, pts.slice(0, 4), "", 900, function (pt) {
            if (pt === pts[3]) flashText(lsvg, pt[0], pt[1] - 14, "ARP: no reply", "--link-down");
          });
          await sleep(reduce ? 0 : 500);
          txt.push("Request timed out.");
        }
        if (id !== busy) return;
        lout.innerHTML = txt.join("\n").replace(/(Request timed out\.)/g, '<span style="color:var(--link-down)">$1</span>').replace(/(TTL=\d+)/g, '<span style="color:var(--hot)">$1</span>');
      }
      setOut("ttl", ok ? String(ttl) : "—");
      setOut("hops", ok ? hops : "—");
      setOut("res", ok ? "4 / 4" : "0 / 4", ok ? "good" : "bad");
      if (!ok) {
        note.style.setProperty("--c", "var(--link-down)");
        note.innerHTML = "<b>100% loss.</b> With the uplinks swapped, " + LABEL[src] + "'s gateway (" + gwIp + ") is on a router port that is cabled to the other LAN. ARP for the gateway gets no answer, so the request never leaves the switch. This is the fault from the first Project 1 ping.";
      } else if (dst === "GW") {
        note.style.setProperty("--c", "var(--link-up)");
        note.innerHTML = "<b>The gateway answers itself.</b> R1 generates the reply with its own starting TTL of 255, so nothing is subtracted on the way back.";
      } else if (sameLan) {
        note.style.setProperty("--c", "var(--link-up)");
        note.innerHTML = "<b>Same subnet, no router.</b> Both hosts are in 199.19.30.0/26, so the switch delivers the frame directly. TTL stays at 128" + (swapped ? ", even with the uplinks swapped: the switch never needs the router." : ".");
      } else {
        note.style.setProperty("--c", "var(--link-up)");
        note.innerHTML = "<b>One router hop.</b> The reply leaves the destination with TTL 128 and R1 subtracts 1 while forwarding it, so it arrives with <b>TTL=127</b>.";
      }
    };
    $$("[data-ctl]", lab).forEach(function (group) {
      var key = group.getAttribute("data-ctl");
      $$("button", group).forEach(function (b) {
        b.addEventListener("click", function () {
          $$("button", group).forEach(function (o) { o.setAttribute("aria-pressed", String(o === b)); });
          state[key] = b.getAttribute("data-v");
          run();
        });
      });
    });
    var replay = $("[data-lab-replay]", lab);
    if (replay) replay.addEventListener("click", run);
    // Start when the lab scrolls into view
    if ("IntersectionObserver" in window) {
      var seen = false;
      new IntersectionObserver(function (es, obs) {
        if (es[0].isIntersecting && !seen) { seen = true; obs.disconnect(); run(); }
      }, { threshold: 0.3 }).observe(lab);
    } else run();
    drawTopo(lsvg, { src: "PCA", dst: "PC2" });
  }

  /* ---------- 5. Packet list filters ----------------------------------------- */
  $$("[data-pkt]").forEach(function (box) {
    var rows = $$(".pkt-row:not(.head)", box);
    var bar = $(".pkt-filter .bar span", box);
    var count = $(".pkt-filter .count b", box);
    var apply = function (f, label) {
      var shown = 0;
      rows.forEach(function (r, i) {
        var hit = f === "all" || r.getAttribute("data-src") === f;
        r.classList.toggle("out", !hit);
        if (hit) shown++;
        r.classList.remove("slide"); void r.offsetWidth; r.style.setProperty("--i", i); r.classList.add("slide");
      });
      if (bar) bar.textContent = label;
      if (count) count.textContent = shown;
    };
    $$(".pkt-buttons button", box).forEach(function (b) {
      b.addEventListener("click", function () {
        $$(".pkt-buttons button", box).forEach(function (o) { o.setAttribute("aria-pressed", String(o === b)); });
        apply(b.getAttribute("data-f"), b.textContent.trim());
      });
    });
  });
  /* ---------- 6. Topology diagrams on doc pages ------------------------------ */
  $$("[data-topo]").forEach(function (box) {
    var svg = $("svg", box);
    drawTopo(svg, { src: "PCB", dst: "SRV" });
    if (reduce || box.getAttribute("data-topo") !== "http") return;
    var running = false;
    var loop = async function () {
      if (running) return; running = true;
      for (;;) {
        await animatePacket(svg, route("PCB", "SRV", false), "", 1700, function (pt) {
          if (pt[0] === 350 && pt[1] === 64) flashText(svg, 320, 108, "GET / → TTL 127");
        });
        await animatePacket(svg, route("SRV", "PCB", false), "rep", 1600);
        await sleep(900);
      }
    };
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (es, obs) { if (es[0].isIntersecting) { obs.disconnect(); loop(); } }, { threshold: 0.2 }).observe(box);
    } else loop();
  });
})();
