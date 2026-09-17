Photography and the logo. Every file here is referenced directly from the
pages; nothing is generated.

| File | Where it is used |
| --- | --- |
| `ameLogo.png` | Header (cropped to the framed mark with CSS) and footer |
| `amebuilding-1.jpg` | About page header, contact and home social card |
| `printer-1.jpg` | Home capabilities tile, services page header |
| `printer-2.jpg` | About page (team), services card 03 |
| `warehousefloor-1.jpg` | Home page about teaser |
| `warehousefloor-2.jpg` | Not placed yet |
| `offices-1.jpg` | Not placed yet |
| `sample1.jpg` | Home gallery |
| `sample2.jpg` | Home hero, about page photo grid |
| `sample3.jpg` | Home gallery, about page materials |
| `sample4.jpg` | Home gallery, about page photo grid |
| `sample5.jpg` | Home gallery, services card 01 |
| `sample6.jpg` | Home gallery, services card 02 |
| `sample7.jpg` | Home gallery, about page photo grid |
| `sample8.jpg` | Home selected work feature |

Each `<img>` carries `width` and `height` and sits inside a `.shot` frame with
a fixed aspect ratio, so the layout is stable before the file arrives. Adjust
the crop of any photo with an inline `object-position` on the image.

A `.shot` that still carries `data-src` (no file yet) shows a labelled
placeholder until `main.js` finds the file and swaps in a real image.
