import { Link } from 'react-router-dom';
import site from '../data/site.json';
import pieces from '../data/pieces.json';
import { categories } from '../data/categories.js';
import Hero from '../components/Hero.jsx';
import Section from '../components/Section.jsx';
import PieceGrid from '../components/PieceGrid.jsx';
import './Home.css';

export default function Home() {
  const featured = pieces.filter((p) => p.featured).slice(0, 6);

  return (
    <div className="page">
      <Hero
        eyebrow={site.artist}
        title={site.heroTitle}
        text={site.heroText}
        image="/images/pieces/nesting-bowls-1.jpg"
        imageAlt="Three nesting bowls with navy, sage and cream glaze streaks"
        primary={{ to: '/gallery', label: 'View the gallery' }}
        secondary={{ to: '/about', label: 'About the artist' }}
      />

      <Section eyebrow="Selected work" title="Recent pieces">
        <PieceGrid pieces={featured} eagerCount={3} />
        <div className="home__more">
          <Link to="/gallery" className="btn btn--ghost">
            See all pieces
          </Link>
        </div>
      </Section>

      <Section tone="deep">
        <div className="home__intro">
          <div className="home__intro-media">
            <img src="/images/portrait.jpg" alt={`Portrait of ${site.artist}`} loading="lazy" width="1200" height="1600" />
          </div>
          <div className="home__intro-copy">
            <span className="eyebrow">The maker</span>
            <h2>{site.artist}</h2>
            <p className="lede">{site.shortBio}</p>
            <Link to="/about" className="home__textlink">
              Read her story
            </Link>
          </div>
        </div>
      </Section>

      <Section eyebrow="Browse" title="By type">
        <ul className="home__cats" role="list">
          {categories.map((c) => {
            const count = pieces.filter((p) => p.category === c.key).length;
            const cover = pieces.find((p) => p.category === c.key);
            return (
              <li key={c.key}>
                <Link to={`/gallery?category=${c.key}`} className="home__cat">
                  <div className="home__cat-media">
                    {cover && <img src={cover.images[0]} alt="" loading="lazy" width="1600" height="1200" />}
                  </div>
                  <span className="home__cat-label">
                    {c.label} <span className="home__cat-count">{count}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section tone="ink" eyebrow="Get in touch" title="Interested in a piece?">
        <p className="lede">
          Everything shown here is one of a kind. If something catches your eye, send a note and{' '}
          {site.artist.split(' ')[0]} will let you know whether it is still available.
        </p>
        <Link to="/contact" className="btn btn--accent">
          Contact the studio
        </Link>
      </Section>
    </div>
  );
}
