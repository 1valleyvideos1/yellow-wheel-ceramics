import { categoryLabel, statusLabel } from './categories.js';

// Lowercase, and a compact form without spaces or dashes so "yw0021" and
// "0021" both find "YW-0021". Only words with a digit are checked against
// SKUs, so a plain word like "a" does not match every "-A" item.
const norm = (s) => String(s ?? '').toLowerCase();
const compact = (s) => norm(s).replace(/[^a-z0-9]/g, '');

// Precomputed text for each piece, split by how strongly a match counts.
const index = new WeakMap();
function fields(piece) {
  let f = index.get(piece);
  if (!f) {
    const skus = [piece.sku, ...piece.items.map((it) => it.sku)].filter(Boolean);
    const rest = [
      piece.description,
      piece.alt,
      categoryLabel(piece.category),
      piece.clay,
      piece.glaze,
      piece.dimensions,
      piece.year,
      statusLabel[piece.status],
      piece.soldAsSet && 'set',
      ...piece.items.map((it) => it.name),
      ...piece.photos.map((p) => p.caption),
    ];
    f = {
      skus: skus.map(compact),
      title: norm(piece.title),
      rest: norm(rest.filter(Boolean).join(' ')),
    };
    index.set(piece, f);
  }
  return f;
}

/**
 * Pieces matching every word of `query`, best matches first: SKU matches,
 * then title matches, then matches anywhere else (description, glaze, item
 * names, captions and so on). An empty query returns `pieces` unchanged.
 */
export function searchPieces(pieces, query) {
  const words = norm(query).split(/\s+/).filter(Boolean);
  if (words.length === 0) return pieces;

  const scored = [];
  for (const piece of pieces) {
    const f = fields(piece);
    let score = 0;
    for (const word of words) {
      const c = compact(word);
      if (/\d/.test(c) && f.skus.some((sku) => sku.includes(c))) score += 3;
      else if (f.title.includes(word)) score += 2;
      else if (f.rest.includes(word)) score += 1;
      else {
        score = 0;
        break;
      }
    }
    if (score > 0) scored.push({ piece, score });
  }
  // Array sort is stable, so equal scores keep the gallery order.
  return scored.sort((a, b) => b.score - a.score).map((s) => s.piece);
}
