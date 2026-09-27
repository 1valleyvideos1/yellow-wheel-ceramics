import site from '../data/site.json';

/**
 * A mailto link with a prefilled subject and body for a specific piece.
 * Swap this component for a cart button when a shop is added.
 */
export default function InquireButton({ piece, className = 'btn btn--accent' }) {
  const subject = `Inquiry: ${piece.title}`;
  const details = [piece.year, piece.dimensions].filter(Boolean).join(', ');
  const body = [
    `Hello,`,
    ``,
    `I'm interested in "${piece.title}" (${details}).`,
    `Could you let me know if it is still available and how to purchase?`,
    ``,
    `Thanks,`,
    ``,
  ].join('\n');
  const href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const sold = piece.status !== 'available';
  return (
    <a href={href} className={className}>
      {sold ? 'Ask about similar pieces' : 'Inquire about this piece'}
    </a>
  );
}
