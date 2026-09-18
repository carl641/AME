Photography and the logo. Every file here is referenced directly from the
pages; nothing is generated.

| File | Where it is used |
| --- | --- |
| `ameLogo.png` | Header (cropped to the framed mark with CSS) and footer |
| `amebuilding-1.jpg` | About page header, Huntsville page header, contact and home social card |
| `printer-1.jpg` | Home capabilities tile, services page header, Huntsville page grid |
| `printer-2.jpg` | About page (team), services card 03, laser powder bed fusion page header |
| `warehousefloor-1.jpg` | Home page about teaser, Huntsville page grid |
| `warehousefloor-2.jpg` | Metal 3D printing service page header |
| `offices-1.jpg` | Huntsville page grid |
| `sample1.jpg` | Home gallery, additive manufacturing and GRCop-42 page grids |
| `sample2.jpg` | Home hero, about page photo grid, Inconel 718 page grid |
| `sample3.jpg` | Home gallery, about page materials, LPBF and GRCop-42 page grids |
| `sample4.jpg` | Home gallery, about page photo grid, cost page header, LPBF page grid |
| `sample5.jpg` | Home gallery, services card 01, additive manufacturing page header, Inconel 718 page grid |
| `sample6.jpg` | Home gallery, services card 02, Inconel 718 page header, additive and LPBF page grids |
| `sample7.jpg` | Home gallery, about page photo grid, FDM page header, several page grids |
| `sample8.jpg` | Home selected work feature, GRCop-42 page header |

Each `<img>` carries `width` and `height` and sits inside a `.shot` frame with
a fixed aspect ratio, so the layout is stable before the file arrives. Adjust
the crop of any photo with an inline `object-position` on the image.

A `.shot` that still carries `data-src` (no file yet) shows a labelled
placeholder until `main.js` finds the file and swaps in a real image.
