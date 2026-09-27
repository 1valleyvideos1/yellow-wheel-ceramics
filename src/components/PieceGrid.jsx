import PieceCard from './PieceCard.jsx';
import './PieceGrid.css';

export default function PieceGrid({ pieces, eagerCount = 0 }) {
  if (!pieces.length) {
    return <p className="piece-grid__empty">No pieces in this category yet.</p>;
  }
  return (
    <ul className="piece-grid" role="list">
      {pieces.map((p, i) => (
        <li key={p.id}>
          <PieceCard piece={p} eager={i < eagerCount} />
        </li>
      ))}
    </ul>
  );
}
