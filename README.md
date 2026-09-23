# addmaneng.com redesign

A rebuilt front end for **Additive Manufacturing & Engineering, Inc.** (AME), the
HUBZone certified metal LPBF shop in Huntsville, Alabama.

Static HTML, CSS and vanilla JS. No build step, no framework, no dependencies.

```
index.html                             home
about.html                             about
services.html                          services hub, links to every page below
contact.html                           contact: map, phone, address and the quote form

metal-3d-printing-service.html         service page: what the job includes, specs, choosing a shop
metal-additive-manufacturing.html      primer: process families, standards, where LPBF fits
laser-powder-bed-fusion.html           process page: how the machine works, design rules, LPBF vs PM
inconel-718-3d-printing.html           material page: composition, properties, heat treatment
grcop-42-3d-printing.html              material page: NASA copper alloy, properties, comparisons
metal-3d-printing-cost.html            pricing guide: cost drivers, ranges, how to cut the number
fdm-vs-metal-3d-printing.html          guide: FDM explained, when the part has to be metal
metal-3d-printing-huntsville-al.html   location page: the shop, the local ecosystem, service area

blog.html                              blog index, newest post first
huntsville-universities-metal-3d-printing-talent.html
                                       post: Huntsville universities and the metal AM talent pipeline

sitemap.xml, robots.txt                for search engines
assets/css/styles.css                  tokens, layout, motion, landing page components
assets/js/main.js                      theme, nav and dropdown, reveals, gallery, form
assets/img/                            photography and the logo (see below)
tools/build-single-file.js             bundles the home page into dist/preview.html
```

Open any page directly, or serve the folder:

```sh
npx http-server -p 8080 .
```

## Brand

Two colours and one gradient, all set as tokens at the top of `styles.css`.
Type is always a solid colour; the gradient only ever appears on elements.

| Token | Value | Used for |
| --- | --- | --- |
| `--accent` | `#19AE8C` | Buttons, icons, rules, the active nav underline, every build motif |
| `--accent-ink` | `#0D6F59` | The same teal darkened for small text so it clears WCAG AA on light surfaces |
| `--fg-2` | `#616161` | Secondary text |
| `--metal-a` to `--metal-b` | `#FFFFFF` to `#616161` | The inner page headers (`.pagehead__stage`) and the top edge of service cards |
| `--metal-rule` | white to `#616161` to teal | The vertical rule beside hero, call to action and inner page copy (`.copyrule`), and the left edge of the material cards |

The hero photo also sits in a one pixel frame that fades from white to teal,
and the hero carries a soft teal radial glow behind the copy.

The logo file has a transparent interior, so dark mode backs it with a white
plate (`--logo-plate`). The header shows the framed mark only, cropped with CSS;
the footer shows the full lockup.

## Pages

Every page shares the same header and footer markup. The nav is
Home, Services (with a dropdown of the service, material and guide pages),
About, Contact, and each page marks its own link with `aria-current="page"`.
"Request a quote" everywhere points at `contact.html#quote`.

The footer carries every page in three columns, so each landing page is
linked from every other page.

### Landing pages and the keywords they target

The eight landing pages were built from the Moz keyword list for the site.
Each one targets one cluster; the home page keeps the brand and "Huntsville"
terms it already ranks for.

| Page | Primary keyword | Also targets |
| --- | --- | --- |
| `metal-3d-printing-service.html` | metal 3d printing service | metal 3d printing companies, industrial metal 3d printing, industrial 3D printing, rapid manufacturing 3D printing |
| `metal-additive-manufacturing.html` | metal additive manufacturing | additive manufacturing for metals, additive manufacture |
| `laser-powder-bed-fusion.html` | powder bed fusion 3D printing | powder metal 3d printing, powder metallurgy 3d printing, SLM, DMLS |
| `inconel-718-3d-printing.html` | inconel 718 | inconel 718 3d printing, inconel 3d printing |
| `grcop-42-3d-printing.html` | grcop 42 | GRCop-42 3D printing, NASA copper alloy |
| `metal-3d-printing-cost.html` | metal 3d printing price | metal 3d printing cost |
| `fdm-vs-metal-3d-printing.html` | fused deposition modeling | fused deposition modeling 3D printing |
| `metal-3d-printing-huntsville-al.html` | metal 3D printing Huntsville AL | Huntsville additive manufacture, metal 3D printing Alabama, Madison County |

AME does not offer FDM, so the FDM page is an honest comparison guide that
says so and routes the reader to the metal pages, rather than a fake service
page.

Each landing page has its own title, meta description, canonical, Open Graph
tags, breadcrumbs, a JSON-LD graph (LocalBusiness, Service, BreadcrumbList,
WebPage, FAQPage) and an FAQ. They share the header, footer, call to action
band and build motifs with the rest of the site.

The pages were generated from one script so the shared markup is identical,
but they are committed as plain HTML and can be edited directly like any
other page.

### Blog

`blog.html` lists the posts as cards, newest first. Each post is a flat HTML
file at the site root (so asset paths match every other page) built on the
landing page `.article` / `.prose` layout, with a `.postmeta` date line under
the H1 and a JSON-LD `BlogPosting` and `BreadcrumbList`. Blog sits in the main
nav between About and Contact and in the footer's Company column; a post marks
the Blog nav link with `is-within`. To add a post: copy the existing post,
change its title, description, canonical, `og:` tags, date and JSON-LD, add a
card to the top of `.posts` in `blog.html` and an entry to `blogPost` there,
and add the URL to `sitemap.xml`.

The old site's URLs (`/about/`, `/services/`, `/contact/`) now map to
`about.html`, `services.html` and `contact.html`. Add redirects for the old
paths at the host if you want to keep them for SEO. `/gallery/` has no page of
its own; the parts gallery lives on the home page.

## Before this goes live

**1. The quote form.** Set `FORM_ENDPOINT` at the top of `assets/js/main.js` to
your handler (Formspree, Netlify Forms, a Lambda). Until it is set the form
validates normally and then tells the visitor to call. The company email address
was not available when this was built, so the contact page leads with the
phone number.

**2. Photo weight.** The photos in `assets/img/` are used at their original
size (up to 4032 x 3024, about 600 to 850 KB each). Everything below the fold is
lazy loaded, but a resize pass to around 1600 px wide would cut the home page
by several megabytes. `assets/img/README.md` lists where each file is used.

**3. Material figures.** The Inconel 718 and GRCop-42 pages quote typical
published values (ASTM F3055 minimums, NASA characterisation data, common
handbook figures). Each table carries an HTML comment asking for a check
against the powder supplier data sheet and the program specification before
the page goes live.

**4. The selected work photo.** The home page feature about the GRCop-42 fuel
injector currently shows `sample8.jpg`, a copper part with helical channels.
Swap in a photo of the injector itself if one exists.

## Build motifs

The decoration is drawn from the process itself. Everything scroll coupled is
a CSS animation named `px-*` in `styles.css`, bound to a scroll or view
timeline where the browser has them; elsewhere `main.js` seeks the same
animation by scroll position, so the look is identical.

| Piece | Where | What it does |
| --- | --- | --- |
| `.layers` | Hero, call to action bands, inner page headers | Three sheets of teal layer lines at different spacings drift at different rates as you scroll, plus one lit layer with a glow. Parallax depth from the build stack. |
| `.scan` | Between sections | A hairline divider with a laser spot that crosses the page while the line travels the viewport. |
| `.nav::after` and `.nav__z` | Header | A teal build progress line along the foot of the header, and a Z height readout that climbs 0.02 mm per pixel scrolled. |
| `.vol` | Platform stats, home and about | An isometric 400 mm build volume. The current layer plane rises through it and the built layers hatch in beneath as the figure scrolls through. Dimension labels on the edges. |
| `.hatch` | Call to action bands | The scan strategy: stripes that turn 67 degrees, the rotation between one layer and the next, as the band scrolls. |
| `.shot--laser` | Gallery, capability and service photos, about page grid | Hovering sweeps a teal laser line down the photo. |
| `.platform` background | Platform stats | A faint powder bed dot grid. |

All of it is `aria-hidden`. Under `prefers-reduced-motion` the timelines are
never bound: the layer lines, plane and hatch sit at a static mid state, the
progress line and readout are hidden.

## Notes on the build

**Content.** Copy is written from the company's public facts: HUBZone and Small
Disadvantaged Business certification, incorporated 2018, EOS M400, Inconel 718
and GRCop-42, 35 combined years in additive, the GRCop-42 fuel injector built
with NASA and Marshall Space Flight Center. Verify the EOS M400 envelope and
laser figures in the platform section against the current machine datasheet
before publishing.

**Theming.** Light and dark are both first class. The page follows
`prefers-color-scheme` and the toggle in the header overrides it, remembered in
`localStorage`. The hero and call to action bands stay dark in both themes so
the layer lines and the metal rule always have a floor.

**Accessibility.** Skip link, single H1 per page, labels above every input,
inline errors below, visible focus rings, WCAG AA contrast in both themes, and a
full `prefers-reduced-motion` fallback. The map iframe carries a `title`.

**Performance.** The sticky nav state and every scroll reveal run on
`IntersectionObserver`. The build motifs run on CSS scroll driven animations,
off the main thread, in browsers that have them. There is exactly one scroll
listener, passive and frame throttled: it sets the Z readout in the header and,
only where CSS scroll timelines are missing, seeks the motif animations. Images
sit in frames that already reserve their aspect ratio, so nothing shifts as
they load.

**Icons.** Material Symbols, revealed only once the font face genuinely loads,
so a blocked or slow stylesheet cannot paint ligature names onto the page.
