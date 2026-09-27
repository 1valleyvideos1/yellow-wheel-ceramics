import { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import site from '../data/site.json';
import './Header.css';

const links = [
  { to: '/gallery', label: 'Gallery' },
  { to: '/about', label: 'About' },
  { to: '/process', label: 'Process' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link to="/" className="wordmark" aria-label={`${site.name} home`}>
          <span className="wordmark__mark" aria-hidden="true" />
          <span className="wordmark__text">{site.name}</span>
        </Link>

        <button
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="visually-hidden">{open ? 'Close menu' : 'Open menu'}</span>
          <span className={`nav-toggle__bars${open ? ' is-open' : ''}`} aria-hidden="true" />
        </button>

        <nav id="site-nav" className={`site-nav${open ? ' is-open' : ''}`} aria-label="Primary">
          <ul>
            {links.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} className={({ isActive }) => (isActive ? 'is-active' : undefined)}>
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
