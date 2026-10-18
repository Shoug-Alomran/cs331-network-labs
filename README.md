# CS331 · Network Labs

Documentation site and animated presentations for **CS331 Data Communications and
Computer Networks** at Prince Sultan University, Term 261 (1st semester 2026–2027).

- **Author:** Shoug Fawaz Abdullah Alomran
- **Instructor:** Ms. Nada ALALYANI
- **Live site:** <https://networks.shoug-tech.com>

| #   | Project                                                            | Type                   | Status      |
| --- | ------------------------------------------------------------------ | ---------------------- | ----------- |
| 01  | Lab 01: Wireshark Packet Capture and Display Filtering             | Individual · 3 marks   | Complete    |
| 02  | Project 1: Switch and Router Network Design in Cisco Packet Tracer | Individual · 2.5 marks | Complete    |
| 03  | Project 2: Web Server Configuration in Cisco Packet Tracer         | Group · 2.5 marks      | In progress |

Each project has its own section of pages and its own full-screen presentation
(`report/report.html`).

## Run locally

```bash
python3 -m pip install -r requirements.txt
mkdocs serve            # http://127.0.0.1:8000
```

`mkdocs build --strict` writes the static site to `site/`.

The presentations are plain HTML files with no build step. Open
`docs/<project>/report/report.html` directly in a browser, or go to `/<project>/report/report.html`
while `mkdocs serve` is running.

## Structure

```
docs/
  index.md                       landing page: course overview and project cards
  stylesheets/extra.css          theme: mesh, OSI bands, IOS terminal, routing tables, cards
  javascripts/network.js         mesh canvas, OSI stack strips, IOS prompt colouring
  assets/favicon.svg
  wireshark-lab/
    index.md  setup.md  capture-and-filters.md  icmp-analysis.md  findings.md
    report/report.html           presentation (15 slides)
    assets/                      screenshots
  project-1/
    index.md  topology.md  subnetting.md  router-config.md  end-devices.md  verification.md
    report/report.html           presentation (17 slides)
    assets/                      screenshots + Shoug_Alomran_Project1.pkt
  project-2/
    index.md                     in progress, laid out from the brief
    report/report.html           presentation shell, same design
    assets/
mkdocs.yml
requirements.txt
vercel.json                      Vercel build settings
.github/workflows/deploy.yml     GitHub Pages deploy on push to main
```

Only `docs/` is published. The source files in the repository root (assignment PDFs,
the lab report, and the `.pcapng` captures) are not part of the site.

## Screenshots

Every screenshot is a placeholder image that says `[ SCREENSHOT PENDING ]` and shows
its file name. To use a real screenshot, save it over the placeholder **with the same
file name**. No markdown or HTML changes are needed.

| File                                                      | Used on                               |
| --------------------------------------------------------- | ------------------------------------- |
| `docs/wireshark-lab/assets/01-private-wifi-off.png`       | Setup                                 |
| `docs/wireshark-lab/assets/02-ifconfig-en0.png`           | Setup                                 |
| `docs/wireshark-lab/assets/03-wireshark-en0.png`          | Setup                                 |
| `docs/wireshark-lab/assets/04-filter-http.png`            | Capture and Filters, presentation     |
| `docs/wireshark-lab/assets/05-filter-ip-addr.png`         | Capture and Filters                   |
| `docs/wireshark-lab/assets/06-filter-ip-src.png`          | Capture and Filters                   |
| `docs/wireshark-lab/assets/07-filter-ip-dst.png`          | Capture and Filters                   |
| `docs/wireshark-lab/assets/08-filter-ip-dst-and-http.png` | Capture and Filters                   |
| `docs/wireshark-lab/assets/09-filter-dns-or-http.png`     | Capture and Filters                   |
| `docs/wireshark-lab/assets/10-curl-psu-timeout.png`       | Capture and Filters                   |
| `docs/wireshark-lab/assets/11-neverssl-head.png`          | Capture and Filters                   |
| `docs/wireshark-lab/assets/12-nslookup.png`               | Capture and Filters                   |
| `docs/wireshark-lab/assets/13-ping-terminal.png`          | ICMP Analysis                         |
| `docs/wireshark-lab/assets/14-icmp-filter.png`            | ICMP Analysis, presentation           |
| `docs/wireshark-lab/assets/15-frame-228.png`              | ICMP Analysis, presentation           |
| `docs/wireshark-lab/assets/16-rtt-timestamps.png`         | ICMP Analysis                         |
| `docs/project-1/assets/01-topology.png`                   | Topology, presentation                |
| `docs/project-1/assets/02-r1-config.png`                  | Router Config                         |
| `docs/project-1/assets/03-show-ip-int-brief.png`          | Router Config                         |
| `docs/project-1/assets/04-pc-a-ip.png`                    | End Devices                           |
| `docs/project-1/assets/05-pc-b-ip.png`                    | End Devices                           |
| `docs/project-1/assets/06-pc1-pc2-ip.png`                 | End Devices                           |
| `docs/project-1/assets/07-server-ip.png`                  | End Devices                           |
| `docs/project-1/assets/08-http-service.png`               | End Devices                           |
| `docs/project-1/assets/09-ping-failed.png`                | Verification (PC A → PC 2, 100% loss) |
| `docs/project-1/assets/10-cabling-fix.png`                | Verification                          |
| `docs/project-1/assets/11-ping-success.png`               | Verification (PC A → PC 2, TTL=127)   |
| `docs/project-1/assets/12-browser-pc-b.png`               | Verification, presentation            |
| `docs/project-2/assets/01-topology.png`                   | Project 2 overview                    |

> Privacy: the site shows the Mac's MAC address as `a8:8f:d9:xx:xx:xx`. Crop or blur
> the MAC in `02-ifconfig-en0.png` and `15-frame-228.png` before adding them.

## Presentations

| Key                                           | Action              |
| --------------------------------------------- | ------------------- |
| <kbd>→</kbd> <kbd>Space</kbd> <kbd>PgDn</kbd> | Next slide          |
| <kbd>←</kbd> <kbd>PgUp</kbd>                  | Previous slide      |
| <kbd>Home</kbd> / <kbd>End</kbd>              | First / last slide  |
| <kbd>F</kbd>                                  | Full screen         |
| <kbd>T</kbd>                                  | Toggle light / dark |

You can also click (the right side goes forward, the left quarter goes back), swipe on
touch screens, or click a stop on the progress wire in the footer. The URL hash
tracks the slide (`report.html#7`), so you can link straight to one.

Every slide has the footer **"Shoug Alomran · CS331"** and the slide number. Animations
start when their slide becomes active. With _reduce motion_ turned on in the OS,
they are replaced by their final state. Printing a deck (or saving it as PDF) gives
one slide per landscape page.

To edit a deck, open its `report.html` and change the `<section class="slide">`
blocks. The CSS and JavaScript are inline at the top and bottom of the file.

## Design

- Dark by default (`#050508`). Light mode uses the palette toggle in the header (docs)
  or the theme button (decks). Decks remember the choice in `localStorage`.
- Network theme: a slowly drifting mesh of nodes and links drawn on a canvas. It
  stays still under `prefers-reduced-motion`.
- OSI layer bands: `<div class="osi-stack" data-on="2 3"></div>` at the top of a page,
  and `<div class="osi-divider" data-layer="3" data-label="…"></div>` as a section divider.
- Cisco IOS terminals: a fenced block with `{ .text .ios title="R1 · console" }`. Prompts
  such as `R1#` and `C:\>` are coloured automatically, and a copy button is included.
- Tables are styled as routing tables. Screenshots sit in `device-window` frames.

## Adding Arabic

The CSS uses logical properties (`margin-inline`, `inset-inline-start`, …) and has
`[dir="rtl"]` rules, so it works in both directions. Terminals, code and addresses stay
left-to-right. To add an Arabic (Saudi dialect) version:

1. `pip install mkdocs-static-i18n` and add the `i18n` plugin to `mkdocs.yml` with
   `en` (default) and `ar`.
2. Put translations next to the English pages as `*.ar.md`, for example `docs/project-1/index.ar.md`.
3. Uncomment `extra.alternate` in `mkdocs.yml` to get the language switcher.
4. For a deck, copy `report.html` to `report.ar.html`, set `<html lang="ar" dir="rtl">`,
   and translate the slide text. Arrow keys and swipe directions flip automatically.

## Deploy

**GitHub Pages:** push to `main`. `.github/workflows/deploy.yml` builds with
`mkdocs build --strict` and publishes `site/`. In the repository settings, set Pages
→ Source to _GitHub Actions_. `docs/CNAME` sets the custom domain to
`networks.shoug-tech.com`.

**Vercel:** import the repository. `vercel.json` installs `requirements.txt`, runs
`mkdocs build --strict`, and serves `site/`. Then add the domain in the Vercel project.

For either one, point a `CNAME` record for `networks` at the host
(`<user>.github.io` or `cname.vercel-dns.com`).

---

Shoug Alomran · CS331 · Prince Sultan University
