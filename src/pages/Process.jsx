import { Link } from 'react-router-dom';
import Section from '../components/Section.jsx';
import './Process.css';

const steps = [
  {
    key: 'clay',
    n: '01',
    title: 'Porcelain',
    image: '/images/studio/clay.svg',
    alt: 'Wedging a block of porcelain on the bench',
    text: [
      'Claudia works primarily in porcelain. It is a demanding clay to throw, but it rewards the effort with a bright, smooth surface that takes colour cleanly and shows every detail of the decoration.',
      'Each batch is wedged by hand to push out air and even out the moisture before it goes anywhere near the wheel.',
    ],
  },
  {
    key: 'wheel',
    n: '02',
    title: 'Wheel and hand',
    image: '/images/studio/wheel.svg',
    alt: 'Hands centring porcelain on the potter’s wheel',
    text: [
      'Most pieces are thrown on the wheel, trimmed once leather-hard, and finished by hand. Others are handbuilt, and many combine both approaches.',
      'The aim throughout is a balance of form and function: pieces that are good to look at and made to be used.',
    ],
  },
  {
    key: 'surface',
    n: '03',
    title: 'Surface',
    image: '/images/studio/glaze.svg',
    alt: 'Brushing underglaze onto a bisque-fired porcelain bowl',
    text: [
      'Surface is where the work becomes most expressive. Underglazes are painted on, commercial glazes are layered over them, and transfer patterns are applied to build up distinct, highly detailed treatments.',
      'No two pieces carry the same combination, so each one is a small experiment in colour and pattern.',
    ],
  },
  {
    key: 'fire',
    n: '04',
    title: 'Fire',
    image: '/images/studio/kiln.svg',
    alt: 'Loading finished pieces into the kiln',
    text: [
      'Pieces are bisque fired first, which hardens the clay enough to handle and decorate. A second, hotter glaze firing vitrifies the porcelain and brings the colours to life.',
      'The wait between loading the kiln and opening it again is the hardest part of the whole process.',
    ],
  },
];

const studio = [
  { src: '/images/studio/studio-1.svg', alt: 'The throwing bench by the window' },
  { src: '/images/studio/studio-2.svg', alt: 'Drying shelves of freshly trimmed bowls' },
  { src: '/images/studio/studio-3.svg', alt: 'A wall of glaze and underglaze test tiles' },
];

export default function Process() {
  return (
    <div className="page">
      <Section
        eyebrow="Process"
        title="From porcelain to kiln"
        intro="Four stages, a few weeks, and a lot of waiting. Here is how a piece gets made."
      >
        <ol className="process__steps">
          {steps.map((s, i) => (
            <li key={s.key} className={`process__step${i % 2 ? ' process__step--flip' : ''}`}>
              <div className="process__media">
                <img src={s.image} alt={s.alt} loading={i === 0 ? 'eager' : 'lazy'} width="1200" height="900" />
              </div>
              <div className="process__copy">
                <span className="process__n">{s.n}</span>
                <h3>{s.title}</h3>
                {s.text.map((t) => (
                  <p key={t}>{t}</p>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="deep" eyebrow="The studio" title="Where it happens">
        <p className="lede">
          Claudia has kept a home studio since 2012. Since retiring from teaching in 2024 it has
          become a full-time practice.
        </p>
        <ul className="process__studio" role="list">
          {studio.map((s) => (
            <li key={s.src}>
              <img src={s.src} alt={s.alt} loading="lazy" width="1200" height="900" />
            </li>
          ))}
        </ul>
        <p className="process__visit">
          Studio visits are by appointment.{' '}
          <Link to="/contact">Get in touch</Link> to arrange one.
        </p>
      </Section>
    </div>
  );
}
