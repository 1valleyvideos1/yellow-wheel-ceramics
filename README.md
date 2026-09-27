# Yellow Wheel Ceramics

A portfolio website for a studio ceramist. Presentation first; no cart. Each piece can be marked
available, sold, or not for sale, with an inquiry link that opens an email.

Built with React 18, Vite 6 and React Router. Plain CSS with design tokens, no UI framework.

## Run it

Requires Node 18 or newer. On this machine, switch with `nvm use 18.13.0`.

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

- `npm run build` writes a production bundle to `dist/`
- `npm run preview` serves that bundle locally
- `npm run placeholders` regenerates placeholder artwork (see below)

## Where things live

| Path | What |
| --- | --- |
| `src/data/site.json` | Artist name, tagline, email, location, socials, bio |
| `src/data/pieces.json` | Every piece in the gallery |
| `src/data/categories.js` | Category order and labels, status labels |
| `src/styles/tokens.css` | Colours, type scale, spacing. Change the palette here. |
| `src/pages/` | One file per page: Home, Gallery, PieceDetail, About, Process, Contact |
| `src/components/` | Header, Footer, PieceCard, FilterBar, StatusBadge, InquireButton, etc. |
| `public/images/pieces/` | Piece photos (web-sized JPEGs) |
| `public/images/studio/` | Process and studio images (still placeholders) |
| `public/images/portrait.jpg` | Artist portrait |
| `Photos/` | Original full-size photos. Git-ignored: they contain GPS location data |

## Adding a piece

Add an object to `src/data/pieces.json`:

```json
{
  "id": "blue-teapot",
  "slug": "blue-teapot",
  "title": "Blue Teapot",
  "category": "plates",
  "year": 2026,
  "clay": "Stoneware",
  "glaze": "Cobalt over ash",
  "dimensions": "18 cm × 14 cm × 16 cm",
  "description": "A sentence or two about the piece.",
  "alt": "What the photo shows, for screen readers",
  "images": ["/images/pieces/blue-teapot-1.jpg"],
  "status": "available",
  "featured": false,
  "price": null
}
```

- `category` must be one of the keys in `categories.js`: `bowls`, `mugs`, `plates`, `home`. Add a new
  category there (and it shows up in the filters and on the home page).
- `status` is `available`, `sold`, or `not-for-sale`.
- `featured: true` puts it on the home page (first six shown).
- `images` is a list; the first one is the card image, the rest show as thumbnails on the detail page.
- `clay`, `glaze` and `dimensions` can be left as `""`; empty ones are hidden on the detail page.
- `alt` describes the photo for screen readers. Falls back to the title.
- `imagePosition` (optional) is a CSS `object-position` such as `"50% 75%"`, to steer the
  gallery-card crop when the piece is not centred in the photo.
- `price` is unused for now. It is there so a shop can be added later without changing the data.
- `placeholderGlaze` is only read by the placeholder script and can be left out for real pieces.

## Adding photos

1. Keep the original in `Photos/`.
2. Save a web copy into `public/images/pieces/`: JPG, about 1600 px on the long edge, with
   metadata stripped. Phone photos embed GPS coordinates, which would reveal where they were taken.
   Any export tool that resizes and drops EXIF works.
3. Point the piece's `images` entry at it, e.g. `"/images/pieces/blue-teapot-1.jpg"`.

Gallery cards crop to a 4:3 landscape box, which suits most of the current photography. The
detail page shows the whole photo uncropped.

Studio and process images are still placeholders from `npm run placeholders`, referenced in
`src/pages/Process.jsx`. The home hero and portrait are set in `src/pages/Home.jsx` and
`src/pages/About.jsx`.

## Adding a shop later

The pieces data already carries `status` and `price`. The natural seam is
`src/components/InquireButton.jsx`: replace it with a "Buy" button that talks to Stripe Checkout,
a Shopify Buy Button, or similar, and the rest of the site does not need to change.

## Deploying

The site is static. Any host that serves `dist/` works (Netlify, Vercel, Cloudflare Pages,
GitHub Pages). Because it uses client-side routing, configure the host to serve `index.html` for
unknown paths. For GitHub Pages under a repo subpath, set `base` in `vite.config.js`.
