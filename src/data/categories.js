export const categories = [
  { key: 'bowls', label: 'Bowls' },
  { key: 'mugs', label: 'Mugs & Cups' },
  { key: 'plates', label: 'Plates & Platters' },
  { key: 'home', label: 'Home & Kitchen' },
];

export const categoryLabel = (key) =>
  categories.find((c) => c.key === key)?.label ?? key;

export const statusLabel = {
  available: 'Available',
  sold: 'Sold',
  'not-for-sale': 'Not for sale',
};
