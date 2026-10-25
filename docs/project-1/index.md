---
title: Project 1 · Switch and Router Network Design
nav_title: Overview
summary: Two LANs, one router, a subnetted /24
icon: router
description: CS331 Project 1. Two LANs joined by a Cisco 2901 router in Packet Tracer, with 199.19.30.0/24 subnetted into four /26 networks, a web server, and a troubleshooting story.
kicker: Project 1 · Overview
hero: Two LANs, one router, <span class="grad-text">one hop.</span>
lead: I built two LANs in Cisco Packet Tracer and joined them with one router. <code>199.19.30.0/24</code> was split into four <code>/26</code> subnets, two of them in use. The first ping failed. Finding out why is on the <a href="verification/">Verification</a> page.
layers: [1, 2, 3, 7]
chips:
  - "Individual · 2.5 marks"
  - "Cisco 2901 · 2 × 2960"
  - "199.19.30.0/24 → /26"
  - "<span class='led'></span>All links up/up"
actions:
  - label: Open the presentation
    href: report/
    icon: slides
  - label: Download the .pkt
    href: assets/Shoug_Alomran_Project1.pkt
    icon: download
  - label: Report (PDF)
    href: assets/cs331-project-1-switch-router-network-design-report.pdf
    icon: pdf
  - label: Assignment brief
    href: assets/cs331-project-1-switch-router-network-design-brief.pdf
    icon: clipboard
---

## At a glance

<div class="stats">
  <div class="stat"><div class="stat-value">/26</div><div class="stat-label">Mask 255.255.255.192</div></div>
  <div class="stat"><div class="stat-value">4</div><div class="stat-label">Subnets, two in use</div></div>
  <div class="stat"><div class="stat-value">62</div><div class="stat-label">Usable hosts per subnet</div></div>
  <div class="stat"><div class="stat-value">TTL 127</div><div class="stat-label">Replies across one router</div></div>
</div>

<div class="gallery contain single" markdown>

![The finished topology in Packet Tracer: PC A and PC B on Switch1, PC1, PC2 and Server 1 on Switch 2, both switches on the 2901 router](assets/01-topology.png)

</div>

## Devices

| Device                | Model      | Role                                       |
| --------------------- | ---------- | ------------------------------------------ |
| R1                    | Cisco 2901 | Router: G0/0 → Network A, G0/1 → Network B |
| Switch1               | Cisco 2960 | Network A access switch                    |
| Switch 2              | Cisco 2960 | Network B access switch                    |
| PC A, PC B            | PC         | Hosts on Network A                         |
| PC1, PC2              | PC         | Hosts on Network B                         |
| Web Server (Server 1) | Server     | HTTP and HTTPS on Network B                |

## The build, step by step

<div class="grid g-3">
  <a class="card card-link" href="topology/"><div class="card-icon">:icon-network:</div><h3>Topology</h3><p>Cabling, and which router port faces which LAN.</p><span class="go">Open :icon-arrow-right:</span></a>
  <a class="card card-link" href="subnetting/"><div class="card-icon">:icon-grid:</div><h3>Subnetting</h3><p>Borrow 2 bits: four /26 subnets of 62 hosts.</p><span class="go">Open :icon-arrow-right:</span></a>
  <a class="card card-link" href="router-config/"><div class="card-icon">:icon-terminal:</div><h3>Router config</h3><p>IOS commands on R1, then <code>show ip interface brief</code>.</p><span class="go">Open :icon-arrow-right:</span></a>
  <a class="card card-link" href="end-devices/"><div class="card-icon">:icon-monitor:</div><h3>End devices</h3><p>Static IPs, gateways, and the custom web page.</p><span class="go">Open :icon-arrow-right:</span></a>
  <a class="card card-link" href="verification/"><div class="card-icon">:icon-check:</div><h3>Verification</h3><p>The 100% loss incident, the fix, and the TTL=127 replies.</p><span class="go">Open :icon-arrow-right:</span></a>
  <a class="card card-link" href="assets/Shoug_Alomran_Project1.pkt" download><div class="card-icon hot">:icon-download:</div><h3>Packet Tracer file</h3><p><code>Shoug_Alomran_Project1.pkt</code>, the submitted network.</p><span class="go">Download :icon-arrow-right:</span></a>
</div>
