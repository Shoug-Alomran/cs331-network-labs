---
title: Project 2 · Verification
nav_title: Verification
summary: The page loads in PC0's browser by IP
icon: check
description: Verifying CS331 Project 2. PC0 opened http://192.168.1.10 in its web browser and Server0 returned the group page, with no DNS server involved.
kicker: Project 2 · Verification
hero: Type the IP, <span class="grad-text">get the page.</span>
lead: The service is working when a client can load the page. On PC0 we opened the web browser, typed the server's IP address, and clicked <strong>Go</strong>.
layers: [3, 4, 7]
chips:
  - "http://192.168.1.10"
  - "No DNS"
  - "<span class='led'></span>Pass"
---

## Opening the web browser

On PC0: **Desktop → Web Browser**.

<div class="gallery contain single" markdown>

![PC0's Desktop tab with the Web Browser app](assets/06-pc-web-browser.png)

</div>

## Accessing the server by IP

In the URL field we entered `http://192.168.1.10` and clicked **Go**. Server0 answered with the custom page: **Welcome to our CS331 Project**, followed by both group members' names and student IDs.

<div class="gallery contain single" markdown>

![PC0's browser at http://192.168.1.10 showing "Welcome to our CS331 Project" and both group members](assets/07-browser-result.png)

</div>

<div class="grid g-3" markdown>

<div class="card" markdown>
<div class="card-icon">:icon-globe:</div>

### No DNS needed

The URL uses the IP address directly, so there is no name to resolve. That is why the brief could leave the DNS server out.
</div>

<div class="card" markdown>
<div class="card-icon">:icon-switch:</div>

### No router needed

Both devices are in `192.168.1.0/24`. PC0 learns Server0's MAC with ARP and the switch forwards the frames directly.
</div>

<div class="card" markdown>
<div class="card-icon">:icon-send:</div>

### HTTP end to end

The browser opens a TCP connection to port 80, sends `GET /`, and gets `index.html` back. Every layer from the cable up is working.
</div>

</div>

## Checklist

| Check                                      | Result                        |
| ------------------------------------------ | ----------------------------- |
| Static IPs on Server0 and PC0              | <span class="led"></span>Pass |
| HTTP and HTTPS on                          | <span class="led"></span>Pass |
| Only `index.html` left in the File Manager | <span class="led"></span>Pass |
| `index.html` shows both members and IDs    | <span class="led"></span>Pass |
| PC0 loads `http://192.168.1.10`            | <span class="led"></span>Pass |
