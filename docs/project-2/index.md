---
title: Project 2 · Web Server Configuration
nav_title: Overview
summary: One server, one PC, a page served by IP
icon: server
description: CS331 Project 2, a group project by Shoug Alomran and Aljawhara Alruzuq. A web server in Cisco Packet Tracer with HTTP and HTTPS on and a custom page for the group, opened from a PC's browser by IP address, with no DNS server.
kicker: Project 2 · Overview
hero: A page for the group, <span class="grad-text">served by IP.</span>
lead: We set up a web server in Cisco Packet Tracer, replaced its default site with a page for our group, and opened it from a PC's browser by typing the server's IP address. As the brief required, no DNS server was configured.
layers: [1, 2, 3, 7]
chips:
  - "Group · 2.5 marks"
  - "192.168.1.0/24"
  - "HTTP + HTTPS"
  - "No DNS"
  - "<span class='led'></span>Complete"
actions:
  - label: Open the presentation
    href: report/
    icon: slides
  - label: Download the .pkt
    href: assets/cs331-project-2-web-server-configuration.pkt
    icon: download
  - label: Report (PDF)
    href: assets/cs331-project-2-web-server-configuration-report.pdf
    icon: pdf
---

## At a glance

<div class="stats">
  <div class="stat"><div class="stat-value">3</div><div class="stat-label">Devices: server, switch, PC</div></div>
  <div class="stat"><div class="stat-value">/24</div><div class="stat-label">One network, no router needed</div></div>
  <div class="stat"><div class="stat-value">4</div><div class="stat-label">Default files deleted</div></div>
  <div class="stat"><div class="stat-value">.10</div><div class="stat-label">The address typed in the browser</div></div>
</div>

## Team

| Member | Role |
|---|---|
| Shoug Fawaz Abdullah Alomran | Group member |
| Aljawhara Mohmmad Nasser Alruzuq | Group member |

## Topology

Server0 and PC0 are both on one Cisco 2960 switch, joined with copper straight-through cables. They share the `192.168.1.0/24` network, so the switch delivers frames directly and **no router or default gateway is needed**.

<div class="panel">
  <div class="panel-head">
    <span class="panel-title">:icon-network: project 2 · logical view</span>
    <span class="legend"><span style="--c: var(--accent)"><i></i>HTTP request</span><span style="--c: var(--hot)"><i></i>response</span></span>
  </div>
  <div class="panel-body topo">
    <svg viewBox="0 0 640 170" role="img" aria-label="PC0 at 192.168.1.20 and Server0 at 192.168.1.10 connected to one 2960 switch">
      <rect class="zone" x="20" y="20" width="600" height="120" rx="14"/>
      <text class="net" x="32" y="160">Network · 192.168.1.0/24 · no gateway, no DNS</text>
      <line class="wire" x1="152" y1="80" x2="272" y2="80"/>
      <line class="wire" x1="368" y1="80" x2="488" y2="80"/>
      <g class="node"><rect x="62" y="60" width="90" height="40" rx="9"/><circle class="ledc" cx="144" cy="68" r="2.6"/><text x="107" y="79" text-anchor="middle">PC0</text><text class="sub" x="107" y="92" text-anchor="middle">.20</text></g>
      <g class="node switch"><rect x="272" y="60" width="96" height="40" rx="9"/><circle class="ledc" cx="360" cy="68" r="2.6"/><text x="320" y="79" text-anchor="middle">Switch</text><text class="sub" x="320" y="92" text-anchor="middle">2960</text></g>
      <g class="node router"><rect x="488" y="60" width="90" height="40" rx="9"/><circle class="ledc" cx="570" cy="68" r="2.6"/><text x="533" y="79" text-anchor="middle">Server0</text><text class="sub" x="533" y="92" text-anchor="middle">.10</text></g>
      <circle class="pkt" r="5"><animateMotion dur="4s" repeatCount="indefinite" keyPoints="0;1;1" keyTimes="0;0.45;1" calcMode="linear" path="M152,80 L488,80"/></circle>
      <circle class="pkt rep" r="5"><animateMotion dur="4s" repeatCount="indefinite" keyPoints="0;0;1;1" keyTimes="0;0.5;0.95;1" calcMode="linear" path="M488,80 L152,80"/></circle>
    </svg>
  </div>
</div>

## The build, step by step

<div class="grid g-3">
  <a class="card card-link" href="ip-configuration/"><div class="card-icon">:icon-grid:</div><h3>IP configuration</h3><p>Static addresses on Server0 and PC0, same /24, no gateway.</p><span class="go">Open :icon-arrow-right:</span></a>
  <a class="card card-link" href="http-server/"><div class="card-icon">:icon-server:</div><h3>HTTP server</h3><p>HTTP and HTTPS on, defaults deleted, <code>index.html</code> rewritten.</p><span class="go">Open :icon-arrow-right:</span></a>
  <a class="card card-link" href="verification/"><div class="card-icon">:icon-check:</div><h3>Verification</h3><p>PC0's browser at <code>http://192.168.1.10</code> shows the group page.</p><span class="go">Open :icon-arrow-right:</span></a>
</div>

## Rubric

| Criterion | Marks | Where |
|---|---:|---|
| IP setup and addressing on server and client | 0.5 | [IP configuration](ip-configuration.md) |
| HTTP service on, default files cleaned up | 0.5 | [HTTP server](http-server.md) |
| `index.html` shows all group details | 0.5 | [HTTP server](http-server.md#customising-indexhtml) |
| Page loads in the host's web browser by server IP | 0.5 | [Verification](verification.md) |
| Valid `.pkt` file and verification screenshots | 0.5 | [Download the .pkt](assets/cs331-project-2-web-server-configuration.pkt) |
| **Total** | **2.5** | |
