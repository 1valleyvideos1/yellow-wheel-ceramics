// Generates placeholder SVG artwork for any piece in src/data/pieces.json that
// still points at an .svg, plus the studio/process images. Run with `npm run placeholders`.
// Real photos can replace these files later; keep the same paths in pieces.json
// (or point the JSON at new .jpg/.webp files).

import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pieces = JSON.parse(readFileSync(join(root, 'src/data/pieces.json'), 'utf8'));

const W = 800;
const H = 1000; // 4:5 aspect, matches the gallery card box

// Deterministic pseudo-random so output is stable across runs.
function rng(seed) {
  let s = 0;
  for (const ch of seed) s = (s * 31 + ch.charCodeAt(0)) >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
}

const glazes = {
  ochre: ['#d9a441', '#b98626'],
  tenmoku: ['#4a2f22', '#2b1a12'],
  celadon: ['#a9c3b3', '#7f9d8b'],
  shino: ['#e6c9a8', '#c98d5a'],
  ash: ['#9c9a8c', '#6f6e62'],
  cobalt: ['#3d5a80', '#293f5a'],
  iron: ['#8f4a29', '#5e2f19'],
  white: ['#f2ede3', '#d8d0c1'],
  speckled: ['#d9cfbd', '#b9ad98'],
  sage: ['#8a9a7b', '#64735a'],
};

const backgrounds = ['#efe7d8', '#e9e0cf', '#f3ede2', '#e4dccb'];

// Vessel silhouettes as closed paths, drawn in a 0..1 unit box (x centred at 0.5).
// Each returns a path string for the given size in px (centered at cx, baseline at by).
function bowl(cx, by, w, h) {
  const l = cx - w / 2;
  const r = cx + w / 2;
  const t = by - h;
  return `M ${l} ${t} Q ${l} ${by} ${cx} ${by} Q ${r} ${by} ${r} ${t} Z`;
}
function mug(cx, by, w, h) {
  const l = cx - w / 2;
  const r = cx + w / 2;
  const t = by - h;
  const body = `M ${l} ${t} L ${l + 6} ${by - 14} Q ${l + 6} ${by} ${l + 20} ${by} L ${r - 20} ${by} Q ${r - 6} ${by} ${r - 6} ${by - 14} L ${r} ${t} Z`;
  const hx = r - 4;
  const handle = `M ${hx} ${t + h * 0.22} C ${hx + w * 0.42} ${t + h * 0.18}, ${hx + w * 0.42} ${by - h * 0.28}, ${hx} ${by - h * 0.32}`;
  return { body, handle };
}
function vase(cx, by, w, h) {
  const l = cx - w / 2;
  const r = cx + w / 2;
  const t = by - h;
  const neck = w * 0.28;
  return `M ${cx - neck} ${t} L ${cx + neck} ${t} C ${cx + neck} ${t + h * 0.22}, ${r} ${t + h * 0.32}, ${r} ${t + h * 0.58} C ${r} ${by - 10}, ${cx + w * 0.34} ${by}, ${cx} ${by} C ${cx - w * 0.34} ${by}, ${l} ${by - 10}, ${l} ${t + h * 0.58} C ${l} ${t + h * 0.32}, ${cx - neck} ${t + h * 0.22}, ${cx - neck} ${t} Z`;
}
function plate(cx, by, w, h) {
  // Plate seen from slightly above: an ellipse with a rim ring.
  const cy = by - h / 2;
  return { cx, cy, rx: w / 2, ry: h / 2 };
}
function sculptural(cx, by, w, h, r) {
  // Stacked, slightly offset lobes.
  const lobes = 3;
  const lobeH = h / lobes;
  let d = '';
  for (let i = 0; i < lobes; i++) {
    const yb = by - i * lobeH;
    const lw = w * (0.6 + r() * 0.4);
    const off = (r() - 0.5) * w * 0.2;
    const l = cx - lw / 2 + off;
    const rr = cx + lw / 2 + off;
    const t = yb - lobeH * 1.05;
    d += `M ${l} ${yb} Q ${l} ${t} ${cx + off} ${t} Q ${rr} ${t} ${rr} ${yb} Z `;
  }
  return d;
}

function svgFor(piece, variant) {
  const r = rng(`${piece.id}-${variant}`);
  const [g1, g2] = glazes[piece.placeholderGlaze] ?? glazes.ochre;
  const bg = backgrounds[Math.floor(r() * backgrounds.length)];
  const cx = W / 2;
  const by = H * 0.72;
  const gradId = `g-${piece.id}-${variant}`;
  const shadowId = `s-${piece.id}-${variant}`;

  let shape = '';
  switch (piece.category) {
    case 'bowls': {
      const w = W * (0.55 + r() * 0.1);
      const h = w * (0.38 + r() * 0.1);
      shape = `<path d="${bowl(cx, by, w, h)}" fill="url(#${gradId})"/>
        <ellipse cx="${cx}" cy="${by - h}" rx="${w / 2}" ry="${w * 0.06}" fill="${g2}" opacity="0.55"/>`;
      break;
    }
    case 'mugs': {
      const w = W * (0.3 + r() * 0.06);
      const h = w * (1.05 + r() * 0.15);
      const m = mug(cx - 30, by, w, h);
      shape = `<path d="${m.handle}" fill="none" stroke="url(#${gradId})" stroke-width="26" stroke-linecap="round"/>
        <path d="${m.body}" fill="url(#${gradId})"/>
        <ellipse cx="${cx - 30}" cy="${by - h}" rx="${w / 2}" ry="${w * 0.08}" fill="${g2}" opacity="0.5"/>`;
      break;
    }
    case 'vases': {
      const w = W * (0.34 + r() * 0.1);
      const h = w * (1.5 + r() * 0.4);
      shape = `<path d="${vase(cx, by, w, h)}" fill="url(#${gradId})"/>
        <ellipse cx="${cx}" cy="${by - h}" rx="${w * 0.28}" ry="${w * 0.05}" fill="${g2}" opacity="0.6"/>`;
      break;
    }
    case 'plates': {
      const w = W * (0.68 + r() * 0.08);
      const p = plate(cx, by - 40, w, w * 0.55);
      shape = `<ellipse cx="${p.cx}" cy="${p.cy}" rx="${p.rx}" ry="${p.ry}" fill="url(#${gradId})"/>
        <ellipse cx="${p.cx}" cy="${p.cy}" rx="${p.rx * 0.72}" ry="${p.ry * 0.72}" fill="none" stroke="${g2}" stroke-width="3" opacity="0.5"/>`;
      break;
    }
    default: {
      const w = W * (0.4 + r() * 0.1);
      const h = H * (0.42 + r() * 0.1);
      shape = `<path d="${sculptural(cx, by, w, h, r)}" fill="url(#${gradId})"/>`;
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Placeholder image for ${piece.title}">
  <defs>
    <linearGradient id="${gradId}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${g1}"/>
      <stop offset="1" stop-color="${g2}"/>
    </linearGradient>
    <radialGradient id="${shadowId}" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="#2b2622" stop-opacity="0.28"/>
      <stop offset="1" stop-color="#2b2622" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="${bg}"/>
  <rect y="${H * 0.72}" width="${W}" height="${H * 0.28}" fill="#2b2622" opacity="0.04"/>
  <ellipse cx="${cx}" cy="${by + 8}" rx="${W * 0.34}" ry="${W * 0.06}" fill="url(#${shadowId})"/>
  ${shape}
  <text x="${W / 2}" y="${H - 44}" text-anchor="middle" font-family="Georgia, serif" font-size="26" fill="#7a716a" opacity="0.8">Placeholder · ${escapeXml(piece.title)}</text>
</svg>
`;
}

function escapeXml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function flatSvg(label, w, h, bg, fg) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${escapeXml(label)}">
  <rect width="${w}" height="${h}" fill="${bg}"/>
  <circle cx="${w * 0.5}" cy="${h * 0.42}" r="${Math.min(w, h) * 0.18}" fill="${fg}" opacity="0.35"/>
  <rect x="${w * 0.2}" y="${h * 0.62}" width="${w * 0.6}" height="${h * 0.16}" rx="${Math.min(w, h) * 0.04}" fill="${fg}" opacity="0.25"/>
  <text x="${w / 2}" y="${h - 32}" text-anchor="middle" font-family="Georgia, serif" font-size="26" fill="#7a716a" opacity="0.85">${escapeXml(label)}</text>
</svg>
`;
}

// --- write files ---
const piecesDir = join(root, 'public/images/pieces');
const studioDir = join(root, 'public/images/studio');
mkdirSync(piecesDir, { recursive: true });
mkdirSync(studioDir, { recursive: true });

let count = 0;
for (const piece of pieces) {
  piece.images.forEach((imgPath, i) => {
    if (!imgPath.endsWith('.svg')) return; // real photo, leave alone
    const file = join(root, 'public', imgPath);
    writeFileSync(file, svgFor(piece, i + 1));
    count++;
  });
}

const studio = [
  ['clay.svg', 'Wedging clay'],
  ['wheel.svg', 'At the wheel'],
  ['glaze.svg', 'Glazing'],
  ['kiln.svg', 'Kiln firing'],
  ['studio-1.svg', 'Studio bench'],
  ['studio-2.svg', 'Drying shelves'],
  ['studio-3.svg', 'Glaze tests'],
];
for (const [file, label] of studio) {
  writeFileSync(join(studioDir, file), flatSvg(label, 1200, 900, '#e4dccb', '#8a9a7b'));
}

console.log(`Wrote ${count} piece placeholders, ${studio.length} studio images.`);
