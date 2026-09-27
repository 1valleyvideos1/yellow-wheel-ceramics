import './Section.css';

/**
 * Consistent page section: optional eyebrow, heading, intro text, then children.
 * `tone` = 'default' | 'deep' (slightly darker band) | 'ink' (dark band).
 */
export default function Section({ eyebrow, title, intro, children, tone = 'default', id, className = '' }) {
  return (
    <section id={id} className={`section section--${tone} ${className}`.trim()}>
      <div className="container">
        {(eyebrow || title || intro) && (
          <header className="section__head">
            {eyebrow && <span className="eyebrow">{eyebrow}</span>}
            {title && <h2>{title}</h2>}
            {intro && <p className="lede">{intro}</p>}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
