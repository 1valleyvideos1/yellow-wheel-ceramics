import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import pieces from '../data/pieces.js';
import { categoryLabel, stockLabel } from '../data/categories.js';
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
  const [itemIndex, setItemIndex] = useState(null);

  useEffect(() => {
    setImgIndex(0);
    setItemIndex(null);
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
    ['SKU', piece.sku],
    ['Type', categoryLabel(piece.category)],
    ['Year', piece.year],
    ['Clay', piece.clay],
    ['Glaze', piece.glaze],
    ['Dimensions', piece.dimensions],
  ].filter(([, v]) => v);

  const { items } = piece;
  const photo = piece.photos[imgIndex];
  const item = items[itemIndex];
  const itemsFor = (src) => items.filter((it) => it.photo === src);

  // Clicking a photo selects the item it shows, when exactly one item uses it.
  const showPhoto = (i) => {
    setImgIndex(i);
    const matches = items.map((it, n) => (it.photo === piece.photos[i].src ? n : -1)).filter((n) => n >= 0);
    setItemIndex(matches.length === 1 ? matches[0] : null);
  };

  // Clicking an item selects it and shows its photo, if it has one.
  const showItem = (n) => {
    setItemIndex(n);
    const i = piece.photos.findIndex((p) => p.src === items[n].photo);
    if (i >= 0) setImgIndex(i);
  };

  const soldPhoto = (src) => itemsFor(src).length > 0 && itemsFor(src).every((it) => it.quantity === 0);


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
            {photo.caption && (
              <p className="detail__caption" aria-live="polite">
                {photo.caption}
              </p>
            )}
            {piece.images.length > 1 && (
              <div className="detail__thumbs" role="group" aria-label="More views">
                {piece.photos.map((p, i) => (
                  <button
                    key={p.src}
                    type="button"
                    className={`detail__thumb${i === imgIndex ? ' is-active' : ''}`}
                    aria-pressed={i === imgIndex}
                    aria-label={[`View ${i + 1}`, p.caption, soldPhoto(p.src) && 'sold'].filter(Boolean).join(', ')}
                    onClick={() => showPhoto(i)}
                  >
                    <img src={p.src} alt="" width="160" height="120" loading="lazy" />
                    {soldPhoto(p.src) && (
                      <span className="detail__thumb-sold" aria-hidden="true">
                        Sold
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="detail__info">
            <div className="detail__badges">
              <StatusBadge status={piece.status} size="md">
                {piece.items.length === 0 ? stockLabel(piece.status, piece.quantity) : undefined}
              </StatusBadge>
              {piece.soldAsSet && <span className="detail__set">Sold as a set</span>}
            </div>
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

            {items.length > 0 && (
              <section className="detail__items" aria-labelledby="items-heading">
                <h2 id="items-heading" className="detail__items-title">
                  Sold individually
                  <span>
                    {piece.availableCount} of {items.length} available
                  </span>
                </h2>
                <ul>
                  {items.map((it, n) => (
                    <li key={it.sku || n}>
                      <button
                        type="button"
                        className={`detail__item${n === itemIndex ? ' is-active' : ''}`}
                        aria-pressed={n === itemIndex}
                        onClick={() => showItem(n)}
                      >
                        {it.photo ? (
                          <img src={it.photo} alt="" width="160" height="120" loading="lazy" />
                        ) : (
                          <span className="detail__item-nophoto" aria-hidden="true" />
                        )}
                        <span className="detail__item-text">
                          <span className="detail__item-name">{it.name || `Item ${n + 1}`}</span>
                          {(it.sku || it.soldAsSet) && (
                            <span className="detail__item-sku">
                              {[it.sku && `SKU ${it.sku}`, it.soldAsSet && 'Sold as a set'].filter(Boolean).join(' · ')}
                            </span>
                          )}
                        </span>
                        <StatusBadge status={it.status}>{stockLabel(it.status, it.quantity)}</StatusBadge>
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <div className="detail__actions">
              <InquireButton piece={piece} item={item} />
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
