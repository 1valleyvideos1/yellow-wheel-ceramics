import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import pieces from '../data/pieces.js';
import { categories } from '../data/categories.js';
import Section from '../components/Section.jsx';
import FilterBar from '../components/FilterBar.jsx';
import PieceGrid from '../components/PieceGrid.jsx';

const validKeys = new Set(['all', ...categories.map((c) => c.key)]);

export default function Gallery() {
  const [params, setParams] = useSearchParams();
  const raw = params.get('category') ?? 'all';
  const active = validKeys.has(raw) ? raw : 'all';

  const counts = useMemo(() => {
    const c = { all: pieces.length };
    for (const p of pieces) c[p.category] = (c[p.category] ?? 0) + 1;
    return c;
  }, []);

  const shown = useMemo(
    () => (active === 'all' ? pieces : pieces.filter((p) => p.category === active)),
    [active]
  );

  const onChange = (key) => {
    if (key === 'all') setParams({});
    else setParams({ category: key });
  };

  return (
    <div className="page">
      <Section
        eyebrow="Gallery"
        title="All work"
        intro="Every piece is thrown or built by hand and fired in small batches, so no two are quite the same. Use the filters to browse by type."
      >
        <FilterBar active={active} onChange={onChange} counts={counts} />
        <p className="visually-hidden" aria-live="polite">
          Showing {shown.length} pieces
        </p>
        <PieceGrid pieces={shown} eagerCount={3} />
      </Section>
    </div>
  );
}
