import { Link } from 'react-router-dom';
import { categoryLabel } from '../data/categories.js';
import StatusBadge from './StatusBadge.jsx';
import './PieceCard.css';

export default function PieceCard({ piece, eager = false }) {
  return (
    <article className="piece-card">
      <Link to={`/gallery/${piece.slug}`} className="piece-card__link">
        <div className="piece-card__media">
          <img
            src={piece.images[0]}
            alt={`${piece.title}, ${piece.clay.toLowerCase()} with ${piece.glaze.toLowerCase()}`}
            loading={eager ? 'eager' : 'lazy'}
            width="800"
            height="1000"
          />
        </div>
        <div className="piece-card__body">
          <div className="piece-card__row">
            <h3 className="piece-card__title">{piece.title}</h3>
            <StatusBadge status={piece.status} />
          </div>
          <p className="piece-card__meta">
            {categoryLabel(piece.category)} · {piece.year}
          </p>
        </div>
      </Link>
    </article>
  );
}
