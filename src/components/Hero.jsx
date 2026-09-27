import { Link } from 'react-router-dom';
import './Hero.css';

export default function Hero({ eyebrow, title, text, image, imageAlt, primary, secondary }) {
  return (
    <section className="hero">
      <div className="container hero__inner">
        <div className="hero__copy">
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h1>{title}</h1>
          <p className="lede">{text}</p>
          <div className="hero__actions">
            {primary && (
              <Link to={primary.to} className="btn">
                {primary.label}
              </Link>
            )}
            {secondary && (
              <Link to={secondary.to} className="btn btn--ghost">
                {secondary.label}
              </Link>
            )}
          </div>
        </div>
        <div className="hero__media">
          <img src={image} alt={imageAlt} width="1600" height="1100" fetchpriority="high" />
        </div>
      </div>
    </section>
  );
}
