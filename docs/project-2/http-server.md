---
title: Project 2 · HTTP Server
nav_title: HTTP Server
summary: HTTP and HTTPS on, defaults deleted, index.html
icon: server
description: Configuring the HTTP service on Server0 for CS331 Project 2. HTTP and HTTPS switched on, the four default files deleted, and index.html rewritten with the group members' names and student IDs.
kicker: Project 2 · HTTP server
hero: One file left, <span class="grad-text">and it's ours.</span>
lead: Under <strong>Services → HTTP</strong> on Server0 we switched both services on, cleared out Packet Tracer's sample site, and rewrote the one page that was left.
layers: [7]
chips:
  - "HTTP · On"
  - "HTTPS · On"
  - "index.html only"
---

## Enabling HTTP and HTTPS

On Server0, **Services → HTTP**, both **HTTP** and **HTTPS** switched to **On**. HTTP serves the page on port 80 and HTTPS on port 443.

<div class="gallery contain single" markdown>

![Services → HTTP: HTTP On and HTTPS On, with the five default files still in the File Manager](assets/03-http-https-on.png)

</div>

## Deleting the default files

Packet Tracer's server ships with a sample site. In the **File Manager** we deleted every default file except `index.html`:

| File | Action |
|---|---|
| `copyrights.html` | Deleted |
| `cscoplogo177x111.jpg` | Deleted |
| `helloworld.html` | Deleted |
| `image.html` | Deleted |
| `index.html` | **Kept and edited** |

<div class="gallery contain single" markdown>

![The File Manager after cleanup: only index.html is left](assets/04-default-files-deleted.png)

</div>

## Customising index.html

We clicked **(edit)** next to `index.html`, replaced its content with the brief's template filled in with our names and student IDs, and clicked **Save**.

``` { .html title="index.html" }
<html>
<body>
<h1>Welcome to our CS331 Project</h1>
<p>Shoug Alomran - 223410392<br>Aljawhara Alruzuq - 223410216</p>
</body>
</html>
```

<div class="gallery contain single tall" markdown>

![Editing index.html on Server0, then Save](assets/05-index-html.png)

</div>
