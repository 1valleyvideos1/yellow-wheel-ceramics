import { statusLabel } from '../data/categories.js';
import './StatusBadge.css';

export default function StatusBadge({ status, size = 'sm', children }) {
  return (
    <span className={`badge badge--${status} badge--${size}`}>
      <span className="badge__dot" aria-hidden="true" />
      {children ?? statusLabel[status] ?? status}
    </span>
  );
}
