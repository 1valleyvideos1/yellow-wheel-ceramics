import { Link } from 'react-router-dom';
import site from '../data/site.json';
import Section from '../components/Section.jsx';
import './About.css';

const bio = [
  'While I have spent decades in arts education, ceramics has always been at the core of my creative journey. My passion for pottery was sparked as a young girl during a visit to my sister at college, leading me to take classes at the Hackley School and the Rockland Center for the Arts. I went on to formally study ceramics at Skidmore College and Teachers College, Columbia University.',
  'Parallel to my ceramic work, I built a fulfilling 36-year career in Art Education. In 1988, I joined the faculty at Westlake High School in Mt. Pleasant, where I taught traditional fine arts and developed 21st-century art programs. Throughout my tenure, I guided hundreds of students toward pursuing degrees and careers in the arts, many of whom are now successful professionals across film, television, news, and photography.',
  'Though I have maintained a home studio since 2012, my retirement in 2024 allowed me to transition to ceramics as a full-time practice. Working primarily in porcelain, I craft handmade and wheel-thrown pieces that balance form and function. I incorporate underglazes, commercial glazes, and transfer patterns to create distinct, highly expressive surface treatments.',
];

const timeline = [
  {
    year: 'Early years',
    text: 'A visit to her sister at college sparks a passion for pottery. Classes follow at the Hackley School and the Rockland Center for the Arts.',
  },
  {
    year: 'Study',
    text: 'Formal study of ceramics at Skidmore College and Teachers College, Columbia University.',
  },
  {
    year: '1988',
    text: 'Joins the faculty at Westlake High School in Mt. Pleasant, teaching traditional fine arts and developing 21st-century art programs.',
  },
  { year: '2012', text: 'Sets up a home studio and keeps a ceramic practice running alongside teaching.' },
  {
    year: '2024',
    text: 'Retires after 36 years in art education and turns to ceramics full time.',
  },
  {
    year: 'Now',
    text: 'Working primarily in porcelain: wheel-thrown and handbuilt pieces with underglazes, commercial glazes and transfer patterns.',
  },
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
          <p className="lede">
            Ceramics has always been at the core of my creative journey.
          </p>
          <p>
            Claudia works primarily in porcelain, making wheel-thrown and handcrafted pieces that
            balance form and function. Surfaces are built up in layers: underglazes, commercial
            glazes and transfer patterns combine into distinct, highly expressive treatments, so
            that no two pieces carry quite the same finish.
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
        <p className="lede">From porcelain to kiln.</p>
        <Link to="/process" className="btn btn--accent">
          The process
        </Link>
      </Section>
    </div>
  );
}
