import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import pieces from '../data/pieces.js';
import { categories } from '../data/categories.js';
import { searchPieces } from '../data/search.js';
import Section from '../components/Section.jsx';
import SearchBox from '../components/SearchBox.jsx';
import FilterBar from '../components/FilterBar.jsx';
import PieceGrid from '../components/PieceGrid.jsx';

const validKeys = new Set(['all', ...categories.map((c) => c.key)]);

export default function Gallery() {
  const [params, setParams] = useSearchParams();
  const raw = params.get('category') ?? 'all';
  const active = validKeys.has(raw) ? raw : 'all';
  const query = params.get('q') ?? '';

  // Search first, so the category counts show how many results are in each.
  const found = useMemo(() => searchPieces(pieces, query), [query]);

  const counts = useMemo(() => {
    const c = { all: found.length };
    for (const p of found) c[p.category] = (c[p.category] ?? 0) + 1;
    return c;
  }, [found]);

  const shown = useMemo(
    () => (active === 'all' ? found : found.filter((p) => p.category === active)),
    [active, found]
  );

  // Keep the search and the category in the address, so a search can be
  // bookmarked or shared. Typing replaces the history entry instead of adding one.
  const update = (next, replace) => {
    const merged = { category: active, q: query, ...next };
    const out = {};
    if (merged.category !== 'all') out.category = merged.category;
    if (merged.q) out.q = merged.q;
    setParams(out, { replace });
  };

  return (
    <div className="page">
      <Section
        eyebrow="Gallery"
        title="All work"
        intro="Every piece is thrown or built by hand and fired in small batches, so no two are quite the same. Search, or use the filters to browse by type."
      >
        <SearchBox value={query} onChange={(q) => update({ q }, true)} />
        <FilterBar active={active} onChange={(category) => update({ category }, false)} counts={counts} />
        <p className="visually-hidden" aria-live="polite">
          Showing {shown.length} pieces
        </p>
        {query && shown.length === 0 ? (
          <p className="piece-grid__empty">
            Nothing matches “{query}”
            {active !== 'all' && ' in this category'}. Try fewer words, or a SKU such as YW-0021.
          </p>
        ) : (
          <PieceGrid pieces={shown} eagerCount={3} />
        )}
      </Section>
    </div>
  );
}
