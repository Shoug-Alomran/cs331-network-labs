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

| Device | Model | Role |
|---|---|---|
| R1 | Cisco 2901 | Router: G0/0 → Network A, G0/1 → Network B |
| Switch1 | Cisco 2960 | Network A access switch |
| Switch 2 | Cisco 2960 | Network B access switch |
| PC A, PC B | PC | Hosts on Network A |
| PC1, PC2 | PC | Hosts on Network B |
| Web Server (Server 1) | Server | HTTP and HTTPS on Network B |

## The build, step by step

<div class="grid g-3" markdown>

<a class="card card-link" href="topology/" markdown>
<div class="card-icon">:icon-network:</div>

### Topology
Cabling, and which router port faces which LAN.
<span class="go">Open :icon-arrow-right:</span>
</a>

<a class="card card-link" href="subnetting/" markdown>
<div class="card-icon">:icon-grid:</div>

### Subnetting
Borrow 2 bits: four /26 subnets of 62 hosts.
<span class="go">Open :icon-arrow-right:</span>
</a>

<a class="card card-link" href="router-config/" markdown>
<div class="card-icon">:icon-terminal:</div>

### Router config
IOS commands on R1, then `show ip interface brief`.
<span class="go">Open :icon-arrow-right:</span>
</a>

<a class="card card-link" href="end-devices/" markdown>
<div class="card-icon">:icon-monitor:</div>

### End devices
Static IPs, gateways, and the custom web page.
<span class="go">Open :icon-arrow-right:</span>
</a>

<a class="card card-link" href="verification/" markdown>
<div class="card-icon">:icon-check:</div>

### Verification
The 100% loss incident, the fix, and the TTL=127 replies.
<span class="go">Open :icon-arrow-right:</span>
</a>

<a class="card card-link" href="assets/Shoug_Alomran_Project1.pkt" download markdown>
<div class="card-icon hot">:icon-download:</div>

### Packet Tracer file
`Shoug_Alomran_Project1.pkt`, the submitted network.
<span class="go">Download :icon-arrow-right:</span>
</a>

</div>
