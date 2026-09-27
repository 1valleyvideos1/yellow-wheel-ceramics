import { statusLabel } from '../data/categories.js';
import './StatusBadge.css';

export default function StatusBadge({ status, size = 'sm' }) {
  return (
    <span className={`badge badge--${status} badge--${size}`}>
      <span className="badge__dot" aria-hidden="true" />
      {statusLabel[status] ?? status}
    </span>
  );
}
