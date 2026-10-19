# CS331 · Network Labs

Documentation site and animated presentations for **CS331 Data Communications and
Computer Networks** at Prince Sultan University, Term 261 (1st semester 2026–2027).

- **Author:** Shoug Fawaz Abdullah Alomran
- **Instructor:** Ms. Nada ALALYANI
- **Live site:** <https://network.shoug-tech.com>

| # | Project | Type | Status |
|---|---|---|---|
| 01 | Lab 01: Wireshark Packet Capture and Display Filtering | Individual · 3 marks | Complete |
| 02 | Project 1: Switch and Router Network Design in Cisco Packet Tracer | Individual · 2.5 marks | Complete |
| 03 | Project 2: Web Server Configuration in Cisco Packet Tracer | Group · 2.5 marks | In progress |

## Run locally

```bash
python3 -m pip install -r requirements.txt
mkdocs serve            # http://127.0.0.1:8000
```

`mkdocs build --strict` writes the static site to `site/`.

## Design

The site uses the same custom MkDocs theme as the CS330 site
(operating-systems.shoug-tech.com), with no Material. It has a cyan network accent, and amber
for replies and TTL. Network-specific pieces:

- **Home page** (`theme/home.html`): a router console that shows `show ip interface brief` and then
  PC A pinging PC2 across R1, a **ping lab** where you can swap the router uplinks and watch the
  ping fail, the real ICMP frames with live filters, and the wire-vs-`ping` RTT comparison.
- **Page heroes**: front matter (`kicker`, `hero`, `lead`, `chips`, `actions`) plus `layers: [2, 3]`,
  which lights up that page's OSI layers as a strip of port LEDs.
- **Components** (`docs/assets/css/network.css`): link LEDs (`<span class="led"></span>`,
  `.down`, `.wait`), the Wireshark-style packet list (`data-pkt`), topology diagrams
  (`data-topo`), the subnet split, the Ethernet frame header, and the incident timeline.
- **Cisco IOS terminals**: a fenced block with `{ .text .ios title="R1 · console" }`. Prompts
  such as `R1#`, `R1(config-if)#` and `C:\>` are coloured automatically.
- **Icons**: write `:icon-router:` (or `network`, `switch`, `server`, `activity`, …) in
  Markdown. The list is in `hooks/icons.py`.
- **Notes and warnings**: `/// note | Title` … `///` (block syntax, which survives format-on-save).

## Structure

```
mkdocs.yml
theme/                    main.html (header, page hero, footer), home.html, 404.html
hooks/icons.py            :icon-name: → inline SVG
docs/
  index.md                uses theme/home.html
  assets/css/             site.css (shared design system) + network.css
  assets/js/              site.js (theme, nav, search, lightbox) + net.js (topology, ping lab, filters)
  wireshark-lab/          index, setup, capture-and-filters, icmp-analysis, findings, report
    report/report.html    presentation (15 slides)
    assets/               screenshots
  project-1/              index, topology, subnetting, router-config, end-devices, verification, report
    report/report.html    presentation (17 slides)
    assets/               screenshots + Shoug_Alomran_Project1.pkt
  project-2/              index (plan and rubric from the brief), report
    report/report.html    presentation shell (7 slides)
  copyright.md, privacy-notice.md, academic-disclaimer.md   footer pages
```

Only `docs/` is published. The assignment PDFs, the lab report and the `.pcapng`
captures in the repository root are not part of the site.

## Screenshots

The screenshots were extracted from the submitted report PDFs. On the site the Mac's MAC
address appears as `a8:8f:d9:xx:xx:xx`, so it is redacted in the images too: in
`02-ifconfig-en0.png`, `17-frame-228.png` and `18-frame-230.png` (text, hex bytes and
ASCII column). The Wireshark filter screenshots are cropped above the details pane.
Each image's caption is its alt text.

## Presentations

Each project has a `report/` page that embeds its deck, plus the full-screen deck
itself at `report/report.html`. The decks are single self-contained HTML files.

| Key | Action |
|---|---|
| <kbd>→</kbd> <kbd>Space</kbd> | Next slide |
| <kbd>←</kbd> | Previous slide |
| <kbd>Home</kbd> / <kbd>End</kbd> | First / last slide |
| <kbd>F</kbd> | Full screen |
| <kbd>T</kbd> | Light / dark (shared with the site) |

You can also click (the left quarter goes back), swipe, or click a stop on the progress
wire. Every slide's footer reads **Shoug Alomran · CS331** with the slide number. Under
*reduce motion* the animations show their final state. Printing gives one slide per page.

## Adding Arabic

The decks use logical CSS properties and flip arrow keys and swipe direction under
`dir="rtl"`. To add Arabic (Saudi dialect), add `mkdocs-static-i18n` with `*.ar.md`
pages, and copy each deck to `report.ar.html` with `<html lang="ar" dir="rtl">`.

## Deploy

- **GitHub Pages:** push to `main`. `.github/workflows/deploy.yml` runs `mkdocs build --strict`
  and publishes `site/`. Set Pages → Source to *GitHub Actions*. `docs/CNAME` sets
  `network.shoug-tech.com`.
- **Vercel:** `vercel.json` installs `requirements.txt`, builds, and serves `site/`.

---

Shoug Alomran · CS331 · Prince Sultan University
