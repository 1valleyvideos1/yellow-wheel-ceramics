import { Link } from 'react-router-dom';
import Section from '../components/Section.jsx';

export default function NotFound() {
  return (
    <div className="page">
      <Section eyebrow="404" title="Nothing on this shelf">
        <p className="lede">The page you were after has been moved, sold, or never existed.</p>
        <Link to="/gallery" className="btn">
          Back to the gallery
        </Link>
      </Section>
    </div>
  );
}
