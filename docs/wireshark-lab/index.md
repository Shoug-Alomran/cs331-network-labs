---
title: Lab 01 · Wireshark Packet Capture and Display Filtering
nav_title: Overview
summary: What was captured, on what, and where to start
icon: activity
description: CS331 Lab 01. Live packet capture on macOS with Wireshark, six display filters, and one ping traced from the Ethernet header to its round-trip time.
kicker: Lab 01 · Overview
hero: Reading real packets <span class="grad-text">off the wire.</span>
lead: I captured live traffic on my MacBook's Wi-Fi interface, filtered it six ways, and followed one ping from its Ethernet header to its round-trip time. The lab sheet was written for Windows, so I used the macOS equivalents.
layers: [2, 3, 7]
chips:
  - "Individual · 3 marks"
  - "MacBook Air M2 · macOS"
  - "Wireshark · en0"
  - "<span class='led'></span>Complete"
actions:
  - label: Open the presentation
    href: report/
    icon: slides
  - label: Start with setup
    href: setup/
    icon: arrow-right
---

## At a glance

<div class="stats">
  <div class="stat"><div class="stat-value">en0</div><div class="stat-label">Wi-Fi interface captured</div></div>
  <div class="stat"><div class="stat-value">6</div><div class="stat-label">Display filters applied</div></div>
  <div class="stat"><div class="stat-value">10</div><div class="stat-label">ICMP packets from one ping</div></div>
  <div class="stat"><div class="stat-value">78.52<small>ms</small></div><div class="stat-label">Round trip on the wire</div></div>
</div>

| Item | Value |
|---|---|
| Machine | MacBook Air (M2), macOS |
| Interface | `en0` (Wi-Fi) |
| IPv4 address | `192.168.1.229` |
| MAC address | `a8:8f:d9:xx:xx:xx` (redacted on this site) |
| Default gateway | `192.168.1.1`, MAC `24:5a:4c:81:24:16`, also the local DNS server |
| Ping target | `google.com.sa` → `172.217.17.35` |

## What's inside

<div class="grid g-2">
  <a class="card card-link" href="setup/"><div class="card-icon">:icon-laptop:</div><h3>Setup</h3><p>The macOS stand-ins for <code>ipconfig /all</code> and <code>ping -4</code>, and turning off Private Wi-Fi Address to see the real MAC.</p><span class="go">Open :icon-arrow-right:</span></a>
  <a class="card card-link" href="capture-and-filters/"><div class="card-icon">:icon-filter:</div><h3>Capture & filters</h3><p>The six display filters, why the PSU site never showed up as HTTP, and two correct DNS answers for one name.</p><span class="go">Open :icon-arrow-right:</span></a>
  <a class="card card-link" href="icmp-analysis/"><div class="card-icon">:icon-activity:</div><h3>ICMP analysis</h3><p>Ten ICMP frames, frame 228's Ethernet and IP headers, and why the wire RTT is lower than <code>ping</code>'s.</p><span class="go">Open :icon-arrow-right:</span></a>
  <a class="card card-link" href="findings/"><div class="card-icon">:icon-check:</div><h3>Findings</h3><p>Six things the capture showed, each in a couple of sentences.</p><span class="go">Open :icon-arrow-right:</span></a>
</div>

/// info | macOS substitutions
The lab sheet assumes Windows. I used `ifconfig en0` in place of `ipconfig /all` and `ping -c 4` in place of `ping -4`. I also turned off **Private Wi-Fi Address** so the capture shows the hardware MAC, not a randomised one.
///
