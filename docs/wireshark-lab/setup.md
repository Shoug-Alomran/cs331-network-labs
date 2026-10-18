---
title: Lab 01 · Setup on macOS
nav_title: Setup
summary: macOS commands and the real hardware MAC
icon: laptop
description: Setting up CS331 Lab 01 on a MacBook Air M2. The macOS equivalents of the Windows commands, turning off Private Wi-Fi Address, and starting the Wireshark capture on en0.
kicker: Lab 01 · Setup
hero: Same lab, <span class="grad-text">different OS.</span>
lead: The lab sheet was written for Windows. On a MacBook Air (M2) the same information comes from different commands, and one privacy setting has to change before the capture shows the real hardware address.
layers: [1, 2, 3]
chips:
  - "ifconfig en0"
  - "ping -c 4"
  - "Private Wi-Fi Address · Off"
---

## Windows to macOS

| Lab sheet (Windows) | Used on macOS | Purpose |
|---|---|---|
| `ipconfig /all` | `ifconfig en0` | Show the MAC (`ether`) and IPv4 (`inet`) of the Wi-Fi interface |
| `ping -4 Google.com.sa` | `ping -c 4 google.com.sa` | macOS `ping` is IPv4 already. `-c 4` stops after four echoes, like Windows |
| `nslookup Google.com.sa 8.8.8.8` | `nslookup google.com.sa 8.8.8.8` | Same on both |

## Expose the hardware MAC

macOS gives each Wi-Fi network its own random MAC address by default. With that on, Wireshark would show a made-up address. I turned it off for the lab network under **System Settings → Wi-Fi → Details… → Private Wi-Fi address → Off**.

<div class="gallery contain single" markdown>

![Private Wi-Fi address set to Off, so en0 uses its burned-in MAC](assets/01-private-wifi-off.png)

</div>

## Read the interface

``` { .text .ios title="zsh · ifconfig en0" }
% ifconfig en0
en0: flags=8863<UP,BROADCAST,SMART,RUNNING,SIMPLEX,MULTICAST> mtu 1500
	ether a8:8f:d9:xx:xx:xx
	inet 192.168.1.229 netmask 0xffffff00 broadcast 192.168.1.255
	status: active
! trimmed: options, inet6, nd6 and media lines
```

`ether` is the MAC address (Layer 2) and `inet` is the IPv4 address (Layer 3). The netmask `0xffffff00` is `255.255.255.0`, a /24.

<div class="gallery contain single" markdown>

![ifconfig en0: ether is the MAC (redacted here), inet is 192.168.1.229](assets/02-ifconfig-en0.png)

</div>

## Start the capture

In Wireshark I selected **Wi-Fi: en0** and started capturing. While it ran, I opened www.psu.edu.sa, sent an HTTP request to neverssl.com, and later ran the ping, so every part of the lab came from live traffic.

<div class="gallery contain" markdown>

![Wireshark's capture screen with Wi-Fi: en0 in the interface list](assets/03-wireshark-interfaces.png)

![The capture running on en0, no filter applied yet](assets/04-capture-running.png)

</div>
