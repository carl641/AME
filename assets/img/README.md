Facility photography and the logo. The part photos live on Uploadcare (below).

| File | Where it is used |
| --- | --- |
| `ameLogo.png` | Header (cropped to the framed mark with CSS) and footer |
| `amebuilding-1.jpg` | About page header, Huntsville page header, contact and home social card |
| `printer-1.jpg` | Home capabilities tile, services page header, Huntsville page grid |
| `printer-2.jpg` | About page (team), services card 03, laser powder bed fusion page header |
| `warehousefloor-1.jpg` | Home page about teaser, Huntsville page grid |
| `warehousefloor-2.jpg` | Metal 3D printing service page header |
| `offices-1.jpg` | Huntsville page grid |

`sample1.jpg` to `sample8.jpg` are no longer on any page. They stay here so
they can be put back; `PHOTO-MAP.md` records where each one was.

## Part photos (Uploadcare)

The printed part photos are cutouts on transparent backgrounds, served from
Uploadcare at `https://4u94xzxt80.ucarecd.net/<uuid>/-/format/auto/-/quality/smart/`,
which sends AVIF or WebP to browsers that take it (about 55 KB each instead of
the 750 KB PNG). Social cards use `-/setfill/141414/-/format/jpeg/` instead,
since not every network reads AVIF or transparency. Their frames carry
`.shot--cutout`, which fits the whole part on a dark stage rather than cropping.

| File | Shows | Where it is used |
| --- | --- | --- |
| `AME 1.png` (`7c30dc75`) | Thrust chamber with a bell top, external feed lines, scalloped flange | About photo grid, Inconel 718 grid |
| `AME 2.png` (`a419fdb0`) | Copper chamber liner, honeycomb and helical channels | Home selected work feature, GRCop-42 grid |
| `AME 3.png` (`5f3d024a`) | Same style copper liner, seen from the top | About materials, GRCop-42 header and social card |
| `AME 4.png` (`766b79c7`) | Two injector bodies with AME lettering, one cut away | About photo grid, GRCop-42 grid, LPBF grid |
| `AME 5.png` (`1d83eb2b`) | Rocket thrust chamber with a ribbed coolant manifold | Services card 01, additive manufacturing header and social card, Inconel 718 grid |
| `AME 6.png` (`43cd6fdf`) | Manifold housing with angled port bosses | Home gallery, Inconel 718 header and social card |
| `AME 7.png` (`a6ab3e6c`) | Curved blade with visible layer lines and edge channels | Home gallery, additive manufacturing grid, LPBF grid, cost header and social card |
| `AME 8.png` (`31efe934`) | Head with a honeycomb lattice face on its build plate | Additive manufacturing grid |
| `AME 9.png` (`fcf1db4d`) | Golf wedge head on its build plate | Home gallery, LPBF grid |
| `AME 10.png` (`c355e778`) | Sectioned silver injector block | Home gallery, services card 02, additive manufacturing grid, GRCop-42 grid |
| `AME 11.png` (`f4594b79`) | Side of the sectioned rocket shaped part | Inconel 718 grid |
| `AME 12.png` (`4d5d1a37`) | Front of the sectioned rocket shaped part | About photo grid, FDM header and social card |


Each `<img>` carries `width` and `height` and sits inside a `.shot` frame with
a fixed aspect ratio, so the layout is stable before the file arrives. Adjust
the crop of any photo with an inline `object-position` on the image.

A `.shot` that still carries `data-src` (no file yet) shows a labelled
placeholder until `main.js` finds the file and swaps in a real image.
