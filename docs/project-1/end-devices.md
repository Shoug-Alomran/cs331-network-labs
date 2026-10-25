---
title: Project 1 · End Devices and Web Server
nav_title: End Devices
summary: Static IPs, gateways and the web page
icon: monitor
description: Static IP configuration of PC A, PC B, PC1, PC2 and Server 1 for CS331 Project 1, and the web server with HTTP and HTTPS on and a custom index.html.
kicker: Project 1 · End devices
hero: Every host knows <span class="grad-text">its way out.</span>
lead: Each host was given a static address, the /26 mask, and a default gateway under <strong>Desktop → IP Configuration → Static</strong>. The gateway is always the R1 interface on that host's own subnet.
layers: [3, 7]
chips:
  - "5 hosts"
  - "Gateway A · .1"
  - "Gateway B · .65"
  - "HTTP + HTTPS on"
---

## Static addressing

| Host     | Network | IP address     | Subnet mask       | Default gateway |
| -------- | ------- | -------------- | ----------------- | --------------- |
| PC A     | A       | `199.19.30.2`  | `255.255.255.192` | `199.19.30.1`   |
| PC B     | A       | `199.19.30.3`  | `255.255.255.192` | `199.19.30.1`   |
| PC1      | B       | `199.19.30.66` | `255.255.255.192` | `199.19.30.65`  |
| PC2      | B       | `199.19.30.67` | `255.255.255.192` | `199.19.30.65`  |
| Server 1 | B       | `199.19.30.68` | `255.255.255.192` | `199.19.30.65`  |

### Network A

<div class="gallery contain" markdown>

![PC A: 199.19.30.2, mask 255.255.255.192, gateway 199.19.30.1](assets/06-pc-a-ip.png)

![PC B: 199.19.30.3, mask 255.255.255.192, gateway 199.19.30.1](assets/07-pc-b-ip.png)

</div>

### Network B

<div class="gallery contain" markdown>

![PC1: 199.19.30.66, gateway 199.19.30.65](assets/08-pc1-ip.png)

![PC2: 199.19.30.67, gateway 199.19.30.65](assets/09-pc2-ip.png)

![Server 1: 199.19.30.68, gateway 199.19.30.65](assets/10-server-ip.png)

</div>

## Web server

On Server 1, under **Services → HTTP**, I turned on **HTTP** and **HTTPS** and edited `index.html` to show my own page:

```{ .html title="index.html" }
<html>
<body>
<h1>CS331 Project 1</h1>
<p>Web Server - Shoug Alomran</p>
</body>
</html>
```

<div class="gallery contain" markdown>

![Services → HTTP: HTTP On, HTTPS On, with index.html in the file manager](assets/11-http-service.png)

![The edited index.html](assets/12-index-html.png)

</div>

The browser test from PC B is on the [Verification](verification.md#web-access-from-pc-b) page.
