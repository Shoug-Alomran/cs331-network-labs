---
title: Project 1 · Subnetting
nav_title: Subnetting
summary: /24 to four /26, the working and the table
icon: grid
description: Subnetting 199.19.30.0/24 into four /26 networks for CS331 Project 1. Two borrowed bits, 62 usable hosts per subnet, block size 64, and the full addressing plan.
kicker: Project 1 · Subnetting
hero: One /24 becomes <span class="grad-text">four /26.</span>
lead: The brief gives the block <code>199.19.30.0/24</code> and a <code>/26</code> mask. Two subnets go to Network A and Network B, and the other two are kept for future use.
layers: [3]
chips:
  - "255.255.255.192"
  - "2 borrowed bits"
  - "Block size 64"
---

## The split

<div class="subnets reveal">
  <div class="blk a" style="--i:0"><em>Network A · G0/0</em><b>.0 /26</b><span>usable .1 – .62<br>broadcast .63</span></div>
  <div class="blk b" style="--i:1"><em>Network B · G0/1</em><b>.64 /26</b><span>usable .65 – .126<br>broadcast .127</span></div>
  <div class="blk f" style="--i:2"><em>Future</em><b>.128 /26</b><span>usable .129 – .190<br>broadcast .191</span></div>
  <div class="blk f" style="--i:3"><em>Future</em><b>.192 /26</b><span>usable .193 – .254<br>broadcast .255</span></div>
</div>

<p class="bits">Last octet of the mask: <span class="n">11</span><span class="h">000000</span> = 128 + 64 = <b>192</b> · <span class="n">2 subnet bits</span> · <span class="h">6 host bits</span></p>

## The working

<div class="steps" markdown>

<div class="step" markdown>
#### Borrow 2 bits
/26 − /24 = 2 bits taken from the host part. 2² = **4 subnets**.
</div>

<div class="step" markdown>
#### Mask
The last octet becomes `11000000` = 128 + 64 = **192**, so the mask is `255.255.255.192`.
</div>

<div class="step" markdown>
#### Hosts
32 − 26 = 6 host bits. 2⁶ = 64 addresses, minus the network and broadcast addresses = **62 usable**.
</div>

<div class="step" markdown>
#### Block size
256 − 192 = **64**, so subnets start at .0, .64, .128 and .192.
</div>

</div>

<div class="stats">
  <div class="stat"><div class="stat-value">2</div><div class="stat-label">Borrowed bits</div></div>
  <div class="stat"><div class="stat-value">4</div><div class="stat-label">Subnets</div></div>
  <div class="stat"><div class="stat-value">62</div><div class="stat-label">Usable hosts each</div></div>
  <div class="stat"><div class="stat-value">64</div><div class="stat-label">Block size</div></div>
</div>

## Subnet table

| Subnet | Network | Usable range | Broadcast | Use |
|---:|---|---|---|---|
| 1 | `199.19.30.0/26` | `.1` – `.62` | `.63` | **Network A** (R1 G0/0) |
| 2 | `199.19.30.64/26` | `.65` – `.126` | `.127` | **Network B** (R1 G0/1) |
| 3 | `199.19.30.128/26` | `.129` – `.190` | `.191` | Future use |
| 4 | `199.19.30.192/26` | `.193` – `.254` | `.255` | Future use |

## Addressing plan

The first usable address of each subnet goes to the router interface, which is the default gateway for that subnet. Hosts follow in order.

| Device | Interface | IP address | Subnet mask | Default gateway |
|---|---|---|---|---|
| R1 | G0/0 | `199.19.30.1` | `255.255.255.192` | N/A |
| R1 | G0/1 | `199.19.30.65` | `255.255.255.192` | N/A |
| PC A | NIC | `199.19.30.2` | `255.255.255.192` | `199.19.30.1` |
| PC B | NIC | `199.19.30.3` | `255.255.255.192` | `199.19.30.1` |
| PC1 | NIC | `199.19.30.66` | `255.255.255.192` | `199.19.30.65` |
| PC2 | NIC | `199.19.30.67` | `255.255.255.192` | `199.19.30.65` |
| Web Server | NIC | `199.19.30.68` | `255.255.255.192` | `199.19.30.65` |

/// tip | Quick check: same subnet?
With a /26, two addresses share a subnet only if they fall in the same block of 64. PC A (`.2`) is in 0–63 and PC2 (`.67`) is in 64–127. They are on different subnets, so PC A sends its ping to its gateway, `.1`, and R1 routes it.
///
