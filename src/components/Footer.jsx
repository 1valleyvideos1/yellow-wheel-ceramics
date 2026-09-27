import { Link } from 'react-router-dom';
import site from '../data/site.json';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__brand">
          <p className="site-footer__name">{site.name}</p>
          <p className="site-footer__tag">{site.tagline}</p>
          <p className="site-footer__loc">{site.location}</p>
        </div>

        <nav className="site-footer__nav" aria-label="Footer">
          <ul>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/process">Process</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>

        <div className="site-footer__contact">
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <ul>
            {site.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer">{s.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container site-footer__legal">
        <small>© {year} {site.name}. All pieces are one of a kind.</small>
      </div>
    </footer>
  );
}
