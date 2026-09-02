# addmaneng.com redesign

A rebuilt front end for **Additive Manufacturing & Engineering, Inc.** (AME), the
HUBZone certified metal LPBF shop in Huntsville, Alabama.

Static HTML, CSS and vanilla JS. No build step, no framework, no dependencies.

```
index.html                 the page
assets/css/styles.css      tokens, layout, motion
assets/js/main.js          theme, nav, reveals, gallery, form
assets/img/                drop real photography here (see below)
tools/build-single-file.js bundles everything into dist/preview.html
```

Open `index.html` directly, or serve the folder:

```sh
npx http-server -p 8080 .
```

## Before this goes live

Two things are stubbed and need real values.

**1. Photography.** Every image slot renders a labelled placeholder until the
file exists. Add these to `assets/img/` and they appear automatically, no markup
changes needed:

| File | Used for | Suggested size |
| --- | --- | --- |
| `hero-build-chamber.jpg` | Hero | 1200 x 1200 |
| `lpbf-machine.jpg` | Capabilities, large tile | 1400 x 900 |
| `grcop-injector.jpg` | GRCop-42 injector feature | 1800 x 1000 |
| `facility.jpg` | About | 1000 x 1250 |
| `gallery-1.jpg` ... `gallery-6.jpg` | Parts gallery | 1000 x 1000 |
| `og-card.jpg` | Social share card | 1200 x 630 |

Update the `data-alt` attribute on each slot to describe the photo you used.

**2. The quote form.** Set `FORM_ENDPOINT` at the top of `assets/js/main.js` to
your handler (Formspree, Netlify Forms, a Lambda). Until it is set the form
validates normally and then tells the visitor to call. The company email address
was not available when this was built, so the contact section leads with the
phone number.

## Notes on the build

**Content.** Copy is written from the company's public facts: HUBZone and Small
Disadvantaged Business certification, incorporated 2018, EOS M400, Inconel 718
and GRCop-42, 35 combined years in additive, the GRCop-42 fuel injector built
with NASA and Marshall Space Flight Center. Verify the EOS M400 envelope and
laser figures in the platform section against the current machine datasheet
before publishing.

**URLs.** This is a single page with anchor sections. The old site's pages map
onto them one to one: `/about/` to `#about`, `/services/` to `#capabilities`,
`/gallery/` to `#gallery`, `/contact/` to `#contact`. If you want to keep the
old URLs for SEO, split the sections back into separate documents or add
redirects. Do not drop the old paths without one or the other.

**Theming.** Light and dark are both first class. The page follows
`prefers-color-scheme` and the toggle in the header overrides it, remembered in
`localStorage`.

**Accessibility.** Skip link, single H1, labels above every input, inline errors
below, visible focus rings, WCAG AA contrast in both themes, and a full
`prefers-reduced-motion` fallback.

**Performance.** No scroll event listeners anywhere. The sticky nav state and
every scroll reveal run on `IntersectionObserver`. Images are lazy loaded into
slots that already reserve their aspect ratio, so nothing shifts.

**Icons.** Material Symbols, revealed only once the font face genuinely loads,
so a blocked or slow stylesheet cannot paint ligature names onto the page.
