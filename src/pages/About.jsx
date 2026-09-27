import { Link } from 'react-router-dom';
import site from '../data/site.json';
import Section from '../components/Section.jsx';
import './About.css';

const timeline = [
  { year: '2012', text: 'First evening pottery class. Threw a lopsided cylinder and kept it on the desk for years.' },
  { year: '2015', text: 'Two-year apprenticeship in a production pottery, throwing several hundred mugs a week.' },
  { year: '2018', text: 'Set up a shared studio and bought a second-hand electric kiln.' },
  { year: '2021', text: 'Moved into the current studio, built a small gas kiln for reduction firing.' },
  { year: '2024', text: 'First wood firing with a group of local potters. The Stacked Forms came out of that kiln.' },
  { year: 'Now', text: 'Throwing functional ware most days, with sculptural work in the gaps.' },
];

export default function About() {
  return (
    <div className="page">
      <Section eyebrow="About" title={site.artist}>
        <div className="about__grid">
          <div className="about__media">
            <img src="/images/portrait.svg" alt={`${site.artist}, portrait`} width="800" height="1000" />
          </div>
          <div className="about__copy">
            <p className="lede">{site.shortBio}</p>
            <p>
              The studio takes its name from a yellow-painted kick wheel that came with the first
              shared space. It has since been replaced by an electric wheel, but the name stuck, and
              a swatch of the same yellow still marks the door.
            </p>
            <p>
              Elena works mostly in stoneware, with porcelain for smaller cups and plates. Every
              piece is thrown on the wheel, trimmed by hand, and bisque-fired before glazing. Most of
              the work is fired in reduction in a small gas kiln; a few pieces each year go into a
              communal wood kiln.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="deep" eyebrow="Artist statement" title="Why pots">
        <div className="about__statement">
          <p className="lede">
            A good pot is used, not admired from across the room. It gets chipped, stained with
            tea, put in the dishwasher despite the instructions. I want the things I make to hold up
            to that and to get better with it.
          </p>
          <p>
            I am not interested in perfect symmetry. Throwing rings, a slight lean, a drip of glaze
            that stopped just short of the shelf: these are records of the making, and they are the
            reason a handmade pot feels different in the hand from a factory one. I try to leave them
            in without letting them take over.
          </p>
          <p>
            The glazes come from a small, stubborn palette. Ash from the wood stove, iron from the
            local clay, a celadon that took two years to get right. Each firing shifts them a
            little, so the work changes slowly over time rather than in seasons.
          </p>
        </div>
      </Section>

      <Section eyebrow="Timeline" title="How she got here">
        <ol className="about__timeline">
          {timeline.map((t) => (
            <li key={t.year}>
              <span className="about__year">{t.year}</span>
              <p>{t.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="ink" eyebrow="Process" title="See how the work is made">
        <p className="lede">From wedging clay to unloading the kiln.</p>
        <Link to="/process" className="btn btn--accent">
          The process
        </Link>
      </Section>
    </div>
  );
}
