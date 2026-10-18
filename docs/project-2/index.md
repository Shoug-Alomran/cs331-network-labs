---
title: Project 2 · Web Server Configuration
nav_title: Overview
summary: In progress · plan and rubric from the brief
icon: server
description: CS331 Project 2, a group project. A web server in Cisco Packet Tracer with HTTP and HTTPS on and a custom page for the group, opened from a client's browser by IP address. In progress.
kicker: Project 2 · Overview
hero: A page for the group, <span class="grad-text">served by IP.</span>
lead: Set up a web server in Packet Tracer with a custom page for the group, then open it from a client's browser using the server's IP address. Only the web server and the host IP settings are in scope. <strong>No DNS server is configured.</strong>
layers: [3, 7]
chips:
  - "Group · 2.5 marks"
  - "HTTP + HTTPS"
  - "No DNS"
  - "<span class='led wait'></span>In progress"
actions:
  - label: Presentation shell
    href: report/
    icon: slides
---

/// info | In progress
This is a group project and the work is still under way. The sections below follow the brief and will be filled in as each part is finished.
///

## Team

| Member | Student ID |
|---|---|
| Shoug Alomran | — |
| — | — |
| — | — |

## Plan

<div class="steps" markdown>

<div class="step" markdown>
#### IP configuration · <span class="led wait"></span>pending
Static IP address and subnet mask on the server and the client, under Desktop → IP Configuration.
</div>

<div class="step" markdown>
#### HTTP service · <span class="led wait"></span>pending
Services → HTTP: switch **HTTP** and **HTTPS** on.
</div>

<div class="step" markdown>
#### Clean up the defaults · <span class="led wait"></span>pending
Delete `copyrights.html`, `cscoplogo177x111.jpg`, `helloworld.html` and `image.html`. Keep only `index.html`.
</div>

<div class="step" markdown>
#### Edit index.html · <span class="led wait"></span>pending
Put every group member's name and student ID on the page.
</div>

<div class="step" markdown>
#### Verify · <span class="led wait"></span>pending
Client → Desktop → Web Browser → the server's IP → **Go**. The page should show the group details.
</div>

</div>

``` { .html title="index.html · template from the brief" }
<html>
    <body>
        <h1>Welcome to our CS331 Project</h1>
        <p>[INSERT GROUP MEMBERS NAMES AND STUDENT IDs HERE]</p>
    </body>
</html>
```

## Rubric

| Criterion | Marks |
|---|---:|
| IP setup and addressing on server and client | 0.5 |
| HTTP service on, default files cleaned up | 0.5 |
| `index.html` shows all group details | 0.5 |
| Page loads in the host's web browser by server IP | 0.5 |
| Valid `.pkt` file and verification screenshots | 0.5 |
| **Total** | **2.5** |
