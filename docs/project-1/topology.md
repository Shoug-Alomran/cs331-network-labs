---
title: Project 1 · Topology
nav_title: Topology
summary: Devices, cabling and router ports
icon: network
description: The CS331 Project 1 topology. A Cisco 2901 router with G0/0 to Switch1 (Network A) and G0/1 to Switch 2 (Network B), copper straight-through cabling, and five end devices.
kicker: Project 1 · Topology
hero: Every packet between the LANs <span class="grad-text">crosses R1.</span>
lead: Each side of the router is its own LAN with its own switch. R1 is the only path between them, so all traffic from Network A to Network B is routed.
layers: [1, 2]
chips:
  - "8 devices"
  - "7 links"
  - "Copper straight-through"
---

## Logical topology

<div class="panel">
  <div class="panel-head">
    <span class="panel-title">:icon-network: project 1 · logical view</span>
    <span class="legend"><span style="--c: var(--accent)"><i></i>request</span><span style="--c: var(--hot)"><i></i>reply</span></span>
  </div>
  <div class="panel-body topo" data-topo="http" aria-label="R1 G0/0 to Switch1 with PC A and PC B. R1 G0/1 to Switch 2 with PC1, PC2 and Server 1. A packet travels from PC B through R1 to the server and back."><svg></svg></div>
</div>

<div class="gallery contain single" markdown>

![The same network in Packet Tracer, all link lights green](assets/01-topology.png)

</div>

## Cabling

All links are **copper straight-through**: each one joins an end device or the router to a switch.

| From     | Port               | To       |
| -------- | ------------------ | -------- |
| R1       | GigabitEthernet0/0 | Switch1  |
| R1       | GigabitEthernet0/1 | Switch 2 |
| PC A     | FastEthernet0      | Switch1  |
| PC B     | FastEthernet0      | Switch1  |
| PC1      | FastEthernet0      | Switch 2 |
| PC2      | FastEthernet0      | Switch 2 |
| Server 1 | FastEthernet0      | Switch 2 |

/// warning | Which router port goes to which switch matters
G0/0 is Network A's gateway (`.1`) and G0/1 is Network B's (`.65`). If the two uplinks are swapped, each LAN is cabled to a router port on the other subnet. Both ports still show up/up, but nothing crosses. That is what broke the first ping, see [Verification](verification.md#troubleshooting-the-first-ping). You can try it in the [ping lab](../index.md#ping-lab) on the home page.
///

## Switches

The 2960 switches keep their default configuration, so no setup is needed. Every port is in VLAN 1 and the switch learns MAC addresses as frames arrive. Their job is to forward frames **inside** each LAN. Anything leaving the LAN is sent to the router's MAC.
