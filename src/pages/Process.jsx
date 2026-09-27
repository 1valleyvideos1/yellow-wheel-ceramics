import { Link } from 'react-router-dom';
import Section from '../components/Section.jsx';
import './Process.css';

const steps = [
  {
    key: 'clay',
    n: '01',
    title: 'Clay',
    image: '/images/studio/clay.svg',
    alt: 'Wedging a block of stoneware clay on the bench',
    text: [
      'Everything starts with a bag of stoneware or porcelain, wedged by hand to push out air and line up the particles. It takes ten minutes per batch and is the closest thing the studio has to a morning ritual.',
      'The stoneware has a little iron in it, which is what gives the speckle under lighter glazes and the toasted colour on the unglazed foot.',
    ],
  },
  {
    key: 'wheel',
    n: '02',
    title: 'Wheel',
    image: '/images/studio/wheel.svg',
    alt: 'Hands centring clay on the potter’s wheel',
    text: [
      'Pieces are thrown on an electric wheel, usually in runs of eight to twelve of the same form. Centring, opening, pulling the walls up: the same three moves, thousands of times.',
      'Once leather-hard, each piece is turned upside down and trimmed to cut a foot ring and take out the extra weight. Handles are pulled from a lump of clay and attached the same day.',
    ],
  },
  {
    key: 'glaze',
    n: '03',
    title: 'Glaze',
    image: '/images/studio/glaze.svg',
    alt: 'Dipping a bisque-fired bowl into a bucket of glaze',
    text: [
      'After a first, low bisque firing, pots are dipped or poured with glaze. The palette is deliberately small: an ochre tenmoku, a wood-ash glaze, a celadon, a shino, and a satin white.',
      'Glazes are mixed in the studio from raw materials, and every new batch is tested on tiles before it goes anywhere near finished work.',
    ],
  },
  {
    key: 'fire',
    n: '04',
    title: 'Fire',
    image: '/images/studio/kiln.svg',
    alt: 'The gas kiln glowing during a reduction firing',
    text: [
      'Most work is fired in reduction in a small gas kiln to around 1280 °C, over about twelve hours. Starving the kiln of oxygen partway through pulls colour out of the iron and copper in the glazes.',
      'A handful of pieces each year go into a shared wood kiln, fired for two days straight. Those come out with ash and flame marks that no gas kiln can imitate.',
    ],
  },
];

const studio = [
  { src: '/images/studio/studio-1.svg', alt: 'The throwing bench by the window' },
  { src: '/images/studio/studio-2.svg', alt: 'Drying shelves of freshly trimmed bowls' },
  { src: '/images/studio/studio-3.svg', alt: 'A wall of glaze test tiles' },
];

export default function Process() {
  return (
    <div className="page">
      <Section
        eyebrow="Process"
        title="From clay to kiln"
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
