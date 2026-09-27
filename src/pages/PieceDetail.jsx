import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import pieces from '../data/pieces.json';
import { categoryLabel } from '../data/categories.js';
import StatusBadge from '../components/StatusBadge.jsx';
import InquireButton from '../components/InquireButton.jsx';
import PieceGrid from '../components/PieceGrid.jsx';
import NotFound from './NotFound.jsx';
import './PieceDetail.css';

export default function PieceDetail() {
  const { slug } = useParams();
  const index = pieces.findIndex((p) => p.slug === slug);
  const piece = pieces[index];
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    setImgIndex(0);
  }, [slug]);

  useEffect(() => {
    if (piece) document.title = `${piece.title} — Yellow Wheel Ceramics`;
    return () => {
      document.title = 'Yellow Wheel Ceramics';
    };
  }, [piece]);

  if (!piece) return <NotFound />;

  const prev = pieces[(index - 1 + pieces.length) % pieces.length];
  const next = pieces[(index + 1) % pieces.length];
  const related = pieces.filter((p) => p.category === piece.category && p.id !== piece.id).slice(0, 3);

  const specs = [
    ['Type', categoryLabel(piece.category)],
    ['Year', piece.year],
    ['Clay', piece.clay],
    ['Glaze', piece.glaze],
    ['Dimensions', piece.dimensions],
  ].filter(([, v]) => v);

  return (
    <div className="page">
      <article className="container detail">
        <nav className="detail__crumbs" aria-label="Breadcrumb">
          <Link to="/gallery">Gallery</Link>
          <span aria-hidden="true"> / </span>
          <Link to={`/gallery?category=${piece.category}`}>{categoryLabel(piece.category)}</Link>
        </nav>

        <div className="detail__grid">
          <div className="detail__media">
            <div className="detail__main">
              <img
                key={piece.images[imgIndex]}
                src={piece.images[imgIndex]}
                alt={
                  piece.images.length > 1
                    ? `${piece.alt ?? piece.title}, view ${imgIndex + 1} of ${piece.images.length}`
                    : piece.alt ?? piece.title
                }
                width="1600"
                height="1200"
              />
            </div>
            {piece.images.length > 1 && (
              <div className="detail__thumbs" role="group" aria-label="More views">
                {piece.images.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    className={`detail__thumb${i === imgIndex ? ' is-active' : ''}`}
                    aria-pressed={i === imgIndex}
                    aria-label={`View ${i + 1}`}
                    onClick={() => setImgIndex(i)}
                  >
                    <img src={src} alt="" width="160" height="120" loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="detail__info">
            <StatusBadge status={piece.status} size="md" />
            <h1 className="detail__title">{piece.title}</h1>
            <p className="lede">{piece.description}</p>

            <dl className="detail__specs">
              {specs.map(([k, v]) => (
                <div key={k} className="detail__spec">
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>

            <div className="detail__actions">
              <InquireButton piece={piece} />
              {piece.status === 'sold' && (
                <p className="detail__note">
                  This piece has found a home. Similar pieces are often available, so feel free to ask.
                </p>
              )}
              {piece.status === 'not-for-sale' && (
                <p className="detail__note">Part of the studio collection and not currently for sale.</p>
              )}
            </div>
          </div>
        </div>

        <nav className="detail__pager" aria-label="Previous and next piece">
          <Link to={`/gallery/${prev.slug}`} rel="prev" className="detail__pager-link">
            <span className="detail__pager-dir">← Previous</span>
            <span className="detail__pager-title">{prev.title}</span>
          </Link>
          <Link to={`/gallery/${next.slug}`} rel="next" className="detail__pager-link detail__pager-link--next">
            <span className="detail__pager-dir">Next →</span>
            <span className="detail__pager-title">{next.title}</span>
          </Link>
        </nav>

        {related.length > 0 && (
          <section className="detail__related" aria-labelledby="related-heading">
            <span className="eyebrow">More {categoryLabel(piece.category).toLowerCase()}</span>
            <h2 id="related-heading">You might also like</h2>
            <PieceGrid pieces={related} />
          </section>
        )}
      </article>
    </div>
  );
}
