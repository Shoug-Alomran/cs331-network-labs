---
title: Lab 01 · Findings
nav_title: Findings
summary: Six things the capture showed
icon: check
description: The six findings from CS331 Lab 01. HTTPS-only sites, DNS answers that depend on the resolver, ten ICMP packets from one ping, hop-by-hop MAC addressing, and wire vs application RTT.
kicker: Lab 01 · Findings
hero: What the capture <span class="grad-text">actually showed.</span>
lead: Six findings, each backed by frames in the capture files.
layers: [2, 3, 4, 7]
actions:
  - label: Open the presentation
    href: ../report/
    icon: slides
  - label: ICMP analysis
    href: ../icmp-analysis/
    icon: activity
---

## Application layer

<div class="grid g-2" markdown>

<div class="card" markdown>
<div class="card-icon">:icon-lock:</div>

### HTTPS hides HTTP
www.psu.edu.sa got **53 SYNs on port 80 and no reply**. All its traffic was TLS on 443, so the `http` filter had nothing to show. neverssl.com gave a readable `HEAD /` → `200 OK`.
</div>

<div class="card" markdown>
<div class="card-icon">:icon-globe:</div>

### DNS depends on who asks
For google.com.sa, the router (`192.168.1.1`) answered `172.217.17.35` and `8.8.8.8` answered `142.250.203.3`. Both are correct: Google picks a front end near the resolver, and 8.8.8.8 is anycast.
</div>

</div>

## Network layer

<div class="grid g-2" markdown>

<div class="card" markdown>
<div class="card-icon">:icon-activity:</div>

### 10 ICMP packets, not 8
Four requests and four replies, plus two port unreachables my Mac sent for UDP that hit closed ports: a late DNS reply (frame 321) and a Cloudflare packet (frame 419). Six from my IP, four from `172.217.17.35`.
</div>

<div class="card" markdown>
<div class="card-icon">:icon-clock:</div>

### Wire RTT is lower than `ping`'s
78.52 ms between frames 228 and 230, vs 121.913 ms in `ping`. The gap was 43 ms on the first echo and about 2 ms on the others. That extra time is spent inside the Mac.
</div>

</div>

## Data link layer

<div class="grid g-2" markdown>

<div class="card" markdown>
<div class="card-icon">:icon-switch:</div>

### The destination MAC is the router's
Frame 228 was framed for `24:5a:4c:81:24:16` (the gateway) while its IP destination was Google's `172.217.17.35`. MAC changes every hop, IP stays end to end. `0x0800` marks IPv4.
</div>

<div class="card" markdown>
<div class="card-icon">:icon-laptop:</div>

### Same concepts on macOS
`ifconfig en0` replaces `ipconfig /all` and `ping -c 4` replaces `ping -4`. Private Wi-Fi Address had to be off to see the real hardware MAC.
</div>

</div>

## Answers to the lab questions

| Question | Answer |
|---|---|
| IP address of Google.com.sa (via 8.8.8.8) | `142.250.203.3` |
| Time for the first echo | `121.913 ms` (ping) |
| Active interface | MAC `a8:8f:d9:xx:xx:xx` · IP `192.168.1.229` |
| ICMP from Google.com.sa | `icmp and ip.src == 172.217.17.35` → 4 packets |
| All ICMP | `icmp` → 10 packets |
| ICMP from my machine | `icmp and ip.src == 192.168.1.229` → 6 packets |
| Frame 228 source / destination MAC | `a8:8f:d9:xx:xx:xx` → `24:5a:4c:81:24:16` |
| Is the destination MAC Google's? | No, it is the default gateway's |
| Ethernet type field | `0x0800`, IPv4 |
| Source / destination IP | `192.168.1.229` → `172.217.17.35` |
| Echo response time | `10.092348 − 10.013828 = 0.078520 s = 78.52 ms`, lower than ping's 121.913 ms |
