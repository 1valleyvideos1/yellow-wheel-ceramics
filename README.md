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
| `public/images/pieces/` | Piece images |
| `public/images/studio/` | Process and studio images, plus the home hero |
| `public/images/portrait.svg` | Artist portrait |

## Adding a piece

Add an object to `src/data/pieces.json`:

```json
{
  "id": "blue-teapot",
  "slug": "blue-teapot",
  "title": "Blue Teapot",
  "category": "vases",
  "year": 2026,
  "clay": "Stoneware",
  "glaze": "Cobalt over ash",
  "dimensions": "18 cm × 14 cm × 16 cm",
  "description": "A sentence or two about the piece.",
  "images": ["/images/pieces/blue-teapot-1.jpg"],
  "status": "available",
  "featured": false,
  "price": null
}
```

- `category` must be one of the keys in `categories.js`: `bowls`, `mugs`, `vases`, `plates`, `sculptural`.
- `status` is `available`, `sold`, or `not-for-sale`.
- `featured: true` puts it on the home page (first six shown).
- `images` is a list; the first one is the card image, the rest show as thumbnails on the detail page.
- `price` is unused for now. It is there so a shop can be added later without changing the data.
- `placeholderGlaze` is only read by the placeholder script and can be left out for real pieces.

## Replacing placeholders with real photos

1. Drop the photo into `public/images/pieces/` (JPG or WebP, ideally 4:5 portrait, around 1600×2000 px).
2. Point the piece's `images` entry at it, e.g. `"/images/pieces/ochre-serving-bowl-1.jpg"`.
3. Delete the old `.svg` if you like. The placeholder script skips any image path that does not end in `.svg`, so re-running it will not overwrite real photos.

Studio, process, hero and portrait images are referenced directly in `src/pages/Home.jsx`,
`src/pages/About.jsx` and `src/pages/Process.jsx`. Replace the files or update the paths there.

Gallery cards crop images to a 4:5 box, so landscape photos will be cropped at the sides. The
detail page uses the same box.

## Adding a shop later

The pieces data already carries `status` and `price`. The natural seam is
`src/components/InquireButton.jsx`: replace it with a "Buy" button that talks to Stripe Checkout,
a Shopify Buy Button, or similar, and the rest of the site does not need to change.

## Deploying

The site is static. Any host that serves `dist/` works (Netlify, Vercel, Cloudflare Pages,
GitHub Pages). Because it uses client-side routing, configure the host to serve `index.html` for
unknown paths. For GitHub Pages under a repo subpath, set `base` in `vite.config.js`.
