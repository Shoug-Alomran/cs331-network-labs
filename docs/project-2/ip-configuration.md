---
title: Project 2 · IP Configuration
nav_title: IP Configuration
summary: Static addresses on Server0 and PC0
icon: grid
description: Static IP configuration for CS331 Project 2. Server0 at 192.168.1.10 and PC0 at 192.168.1.20, both /24 on one switch, with no default gateway and no DNS server.
kicker: Project 2 · IP configuration
hero: Same network, <span class="grad-text">no gateway needed.</span>
lead: Both devices were given static addresses in <code>192.168.1.0/24</code> under <strong>Desktop → IP Configuration → Static</strong>. Because they are on the same subnet, traffic never has to leave the switch, so the gateway and DNS fields stay at <code>0.0.0.0</code>.
layers: [3]
chips:
  - "Server0 · .10"
  - "PC0 · .20"
  - "255.255.255.0"
---

## Addressing table

| Device  | Interface     | IP address     | Subnet mask     | Default gateway |
| ------- | ------------- | -------------- | --------------- | --------------- |
| Server0 | FastEthernet0 | `192.168.1.10` | `255.255.255.0` | N/A             |
| PC0     | FastEthernet0 | `192.168.1.20` | `255.255.255.0` | N/A             |

## Web server

On Server0: **Desktop → IP Configuration → Static**, IPv4 address `192.168.1.10`, subnet mask `255.255.255.0`.

<div class="gallery contain single" markdown>

![Server0: static, 192.168.1.10 / 255.255.255.0, gateway and DNS left at 0.0.0.0](assets/01-server-ip.png)

</div>

## Client PC

On PC0: the same steps with `192.168.1.20` and the same mask, which puts the PC on the server's network.

<div class="gallery contain single" markdown>

![PC0: static, 192.168.1.20 / 255.255.255.0 on FastEthernet0](assets/02-pc-ip.png)

</div>

/// tip | Why no gateway?
A default gateway is only used for destinations outside the host's own subnet. With a /24 mask, `192.168.1.10` and `192.168.1.20` share the first three octets, so PC0 finds Server0's MAC with ARP and sends to it directly through the switch. Compare [Project 1](../project-1/subnetting.md), where the hosts are on different /26 subnets and every packet between them goes through R1.
///
