import { categories } from './categories.js';

// Each piece is one JSON file in src/content/pieces/, edited through the
// dashboard at /admin. The file name is the piece's URL slug.
const files = import.meta.glob('../content/pieces/*.json', { eager: true, import: 'default' });

const categoryOrder = categories.map((c) => c.key);

const pieces = Object.entries(files)
  .map(([path, data]) => {
    const slug = path.split('/').pop().replace(/\.json$/, '');
    return { clay: '', glaze: '', dimensions: '', images: [], featured: false, ...data, id: slug, slug };
  })
  .filter((p) => p.images.length > 0)
  .sort(
    (a, b) =>
      categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category) ||
      b.year - a.year ||
      a.title.localeCompare(b.title)
  );

export default pieces;
