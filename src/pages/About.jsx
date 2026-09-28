import { Link } from 'react-router-dom';
import site from '../content/site.json';
import about from '../content/about.json';
import Section from '../components/Section.jsx';
import './About.css';

export default function About() {
  // The bio is one text box in the dashboard; a blank line starts a new paragraph.
  const bio = about.bio.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

  return (
    <div className="page">
      <Section eyebrow="About" title={site.artist}>
        <div className="about__grid">
          <div className="about__media">
            <img src={site.portrait} alt={`Portrait of ${site.artist}`} width="1200" height="1600" />
          </div>
          <div className="about__copy">
            <span className="eyebrow">In her words</span>
            {bio.map((p, i) => (
              <p key={i} className={i === 0 ? 'lede' : undefined}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="deep" eyebrow="The work" title="Porcelain, form and surface">
        <div className="about__statement">
          {about.statementQuote && <p className="lede">{about.statementQuote}</p>}
          <p>{about.statement}</p>
        </div>
      </Section>

      <Section eyebrow="Timeline" title="How she got here">
        <ol className="about__timeline">
          {about.timeline.map((t, i) => (
            <li key={i}>
              <span className="about__year">{t.year}</span>
              <p>{t.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="ink" eyebrow="The work" title="See what is in the studio">
        <p className="lede">Bowls, mugs, plates and more, each one of a kind.</p>
        <Link to="/gallery" className="btn btn--accent">
          View the gallery
        </Link>
      </Section>
    </div>
  );
}
