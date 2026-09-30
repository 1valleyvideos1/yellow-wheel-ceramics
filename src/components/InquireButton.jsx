import site from '../content/site.json';

/**
 * A mailto link with a prefilled subject and body for a specific piece, or for
 * one item from it (such as one mug from a set) when `item` is given.
 * Swap this component for a cart button when a shop is added.
 */
export default function InquireButton({ piece, item, className = 'btn btn--accent' }) {
  const name = item?.name ? `${piece.title}: ${item.name}` : piece.title;
  const subject = `Inquiry: ${name}${item?.sku ? ` (${item.sku})` : ''}`;
  const details = [
    item?.sku && `SKU ${item.sku}`,
    (item ?? piece).soldAsSet && 'sold as a set',
    piece.year,
    piece.dimensions,
  ]
    .filter(Boolean)
    .join(', ');
  const body = [
    `Hello,`,
    ``,
    `I'm interested in "${name}" (${details}).`,
    `Could you let me know if it is still available and how to purchase?`,
    ``,
    `Thanks,`,
    ``,
  ].join('\n');
  const href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const sold = (item ?? piece).status !== 'available';
  return (
    <a href={href} className={className}>
      {sold ? 'Ask about similar pieces' : item ? 'Inquire about this one' : 'Inquire about this piece'}
    </a>
  );
}
