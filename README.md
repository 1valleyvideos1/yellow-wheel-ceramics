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

## Where things live

| Path | What |
| --- | --- |
| `src/content/pieces/` | One JSON file per piece; the file name is its URL slug |
| `src/content/site.json` | Artist name, home page copy, portrait, email, location, socials |
| `src/content/about.json` | About page bio, statement and timeline |
| `public/admin/` | The editing dashboard (Sveltia CMS) and its field setup, `config.yml` |
| `src/data/categories.js` | Category order and labels, status labels |
| `src/styles/tokens.css` | Colours, type scale, spacing. Change the palette here. |
| `src/pages/` | One file per page: Home, Gallery, PieceDetail, About, Contact |
| `src/components/` | Header, Footer, PieceCard, FilterBar, StatusBadge, InquireButton, etc. |
| `public/images/pieces/` | Piece photos (web-sized JPEGs) |
| `public/images/portrait.jpg` | Artist portrait |
| `Photos/` | Original full-size photos. Git-ignored: they contain GPS location data |

## Editing content (the dashboard)

Go to `/admin` on the live site (e.g. `https://your-site.netlify.app/admin/`) and sign in with
GitHub. From there you can add pieces with photos, mark pieces sold, and edit the bio, home page
text and contact details. Saving commits to the `main` branch on GitHub; Netlify then rebuilds
and the change is live in a minute or two.

Photos uploaded through the dashboard are resized to 1600 px and converted to WebP in the browser
before they are saved. On every build, `scripts/strip-metadata.mjs` also removes EXIF and XMP
(camera details and GPS location) from every JPEG and WebP under `public/images`, keeping only the
orientation, so a phone photo never reaches the live site with its location attached.

Because the dashboard commits to GitHub, run `git pull` before making changes locally.

### One-time setup

1. On Netlify, create a site from the GitHub repo. `netlify.toml` already sets the build command
   and output folder.
2. On GitHub, create an OAuth app (Settings → Developer settings → OAuth Apps → New): homepage URL
   is the Netlify site URL, callback URL is `https://api.netlify.com/auth/done`.
3. On Netlify, open Site configuration → Access & security → OAuth → Install provider → GitHub,
   and paste the OAuth app's client ID and secret.
4. Anyone who edits needs a GitHub account with write access to the repo (Settings →
   Collaborators on GitHub).

## Piece files

Each piece is a file in `src/content/pieces/`, for example `blue-teapot.json`:

```json
{
  "title": "Blue Teapot",
  "category": "plates",
  "year": 2026,
  "status": "available",
  "featured": false,
  "description": "A sentence or two about the piece.",
  "alt": "What the photo shows, for screen readers",
  "images": ["/images/pieces/blue-teapot-1.jpg"],
  "dimensions": "7 in tall",
  "clay": "",
  "glaze": "",
  "price": null
}
```

- `category` must be one of the keys in `categories.js`: `bowls`, `mugs`, `plates`, `kitchen`, `home`.
  A new category also needs adding to the `category` options in `public/admin/config.yml`.
- `status` is `available`, `sold`, or `not-for-sale`.
- `featured: true` puts it on the home page (first six shown).
- `images` is a list; the first one is the card image, the rest show as thumbnails on the detail page.
  A piece with no images is left out of the site.
- `clay`, `glaze` and `dimensions` can be left empty; empty ones are hidden on the detail page.
- `alt` describes the photo for screen readers. Falls back to the title.
- `imagePosition` (optional) is a CSS `object-position` such as `"50% 75%"`, to steer the
  gallery-card crop when the piece is not centred in the photo.
- `price` is unused for now. It is there so a shop can be added later without changing the data.

Pieces are ordered by category, then newest year first, then title.

## Photos

Keep originals in `Photos/` (git-ignored). Gallery cards crop to a 4:3 landscape box, which
suits most of the current photography. The detail page shows the whole photo uncropped.

The home page photo and the portrait are set in `src/content/site.json` (or in the dashboard).

## Adding a shop later

The pieces data already carries `status` and `price`. The natural seam is
`src/components/InquireButton.jsx`: replace it with a "Buy" button that talks to Stripe Checkout,
a Shopify Buy Button, or similar, and the rest of the site does not need to change.

## Deploying

The site is set up for Netlify: `netlify.toml` holds the build settings and `public/_redirects`
sends unknown paths to `index.html` for client-side routing. `npm run build` runs the metadata
stripper first, then writes the site to `dist/`.
