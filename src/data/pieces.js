import { categories } from './categories.js';

// Each piece is one JSON file in src/content/pieces/, edited through the
// dashboard at /admin. The file name is the piece's URL slug.
const files = import.meta.glob('../content/pieces/*.json', { eager: true, import: 'default' });

const categoryOrder = categories.map((c) => c.key);

const pieces = Object.entries(files)
  .map(([path, data]) => {
    const slug = path.split('/').pop().replace(/\.json$/, '');
    // `items` are things sold on their own from one listing, such as each mug
    // in a set, each with its own SKU and quantity. They are independent of the
    // photos: an item may point at one of the photos, a photo of its own, or none.
    const items = (data.items ?? []).map((item) => {
      const quantity = item.quantity ?? 1;
      return {
        name: item.name ?? '',
        sku: item.sku ?? '',
        photo: item.photo ?? '',
        quantity,
        soldAsSet: item.soldAsSet ?? false,
        status: quantity > 0 ? 'available' : 'sold',
      };
    });
    const availableCount = items.filter((item) => item.quantity > 0).length;

    // Photos are the piece's own photos, then any item photo not already among
    // them, so every item photo can be shown in the viewer.
    const photos = (data.images ?? []).map((p) => ({ src: p.image, caption: p.caption ?? '' }));
    for (const item of items) {
      if (item.photo && !photos.some((p) => p.src === item.photo)) photos.push({ src: item.photo, caption: '' });
    }

    // Sold is worked out from stock: the piece's own quantity, or with items,
    // whether any item is left. Only "not for sale" is set by hand.
    const quantity = data.quantity ?? 1;
    const inStock = items.length > 0 ? availableCount > 0 : quantity > 0;
    const status = data.status === 'not-for-sale' ? 'not-for-sale' : inStock ? 'available' : 'sold';

    return {
      sku: '',
      clay: '',
      glaze: '',
      dimensions: '',
      featured: false,
      soldAsSet: false,
      ...data,
      quantity,
      status,
      images: photos.map((p) => p.src),
      photos,
      items,
      availableCount,
      id: slug,
      slug,
    };
  })
  .filter((p) => p.images.length > 0)
  .sort(
    (a, b) =>
      categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category) ||
      b.year - a.year ||
      a.title.localeCompare(b.title)
  );

export default pieces;
