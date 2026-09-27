import { categories } from '../data/categories.js';
import './FilterBar.css';

export default function FilterBar({ active, onChange, counts }) {
  const all = [{ key: 'all', label: 'All' }, ...categories];
  return (
    <div className="filter-bar" role="group" aria-label="Filter by category">
      {all.map((c) => {
        const isActive = active === c.key;
        return (
          <button
            key={c.key}
            type="button"
            className={`chip${isActive ? ' is-active' : ''}`}
            aria-pressed={isActive}
            onClick={() => onChange(c.key)}
          >
            {c.label}
            {counts && <span className="chip__count">{counts[c.key] ?? 0}</span>}
          </button>
        );
      })}
    </div>
  );
}
