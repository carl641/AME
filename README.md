# addmaneng.com redesign

A rebuilt front end for **Additive Manufacturing & Engineering, Inc.** (AME), the
HUBZone certified metal LPBF shop in Huntsville, Alabama.

Static HTML, CSS and vanilla JS. No build step, no framework, no dependencies.

```
index.html                 home
about.html                 about
services.html              services
contact.html               contact: map, phone, address and the quote form
assets/css/styles.css      tokens, layout, motion
assets/js/main.js          theme, nav, reveals, gallery, form
assets/img/                photography and the logo (see below)
tools/build-single-file.js bundles the home page into dist/preview.html
```

Open any page directly, or serve the folder:

```sh
npx http-server -p 8080 .
```

## Brand

Two colours and one gradient, all set as tokens at the top of `styles.css`.

| Token | Value | Used for |
| --- | --- | --- |
| `--accent` | `#19AE8C` | Buttons, icons, rules, the active nav underline |
| `--accent-ink` | `#0D6F59` | The same teal darkened for small text so it clears WCAG AA on light surfaces |
| `--fg-2` | `#616161` | Secondary text |
| `--metal-a` to `--metal-b` | `#FFFFFF` to `#616161` | The inner page headers (`.pagehead__stage`) and the top edge of service cards |
| `--metal-text` | white to `#616161` | Headlines on the dark hero and call to action bands (`.metal`) |

The logo file has a transparent interior, so dark mode backs it with a white
plate (`--logo-plate`). The header shows the framed mark only, cropped with CSS;
the footer shows the full lockup.

## Pages

Every page shares the same header and footer markup. The nav is
Home, About, Services, Contact, and each page marks its own link with
`aria-current="page"`. "Request a quote" everywhere points at
`contact.html#quote`.

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

**3. The selected work photo.** The home page feature about the GRCop-42 fuel
injector currently shows `sample8.jpg`, a copper part with helical channels.
Swap in a photo of the injector itself if one exists.

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
the metallic headline always has a floor.

**Accessibility.** Skip link, single H1 per page, labels above every input,
inline errors below, visible focus rings, WCAG AA contrast in both themes, and a
full `prefers-reduced-motion` fallback. The map iframe carries a `title`.

**Performance.** No scroll event listeners anywhere. The sticky nav state and
every scroll reveal run on `IntersectionObserver`. Images sit in frames that
already reserve their aspect ratio, so nothing shifts as they load.

**Icons.** Material Symbols, revealed only once the font face genuinely loads,
so a blocked or slow stylesheet cannot paint ligature names onto the page.
