import { useState } from 'react';
import site from '../content/site.json';
import pieces from '../data/pieces.js';
import Section from '../components/Section.jsx';
import './Contact.css';

/**
 * No backend yet: the form composes a mailto: link and opens the visitor's
 * email client. Swap `onSubmit` for a fetch() to Formspree, Netlify Forms,
 * or your own endpoint when one exists.
 */
export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', piece: '', message: '' });
  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    const subject = form.piece ? `Inquiry: ${form.piece}` : 'Hello from the website';
    const body = [
      form.message,
      '',
      `— ${form.name}`,
      form.email ? `(${form.email})` : '',
    ].join('\n');
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="page">
      <Section
        eyebrow="Contact"
        title="Say hello"
        intro="Questions about a piece, a commission, or a studio visit are all welcome. Expect a reply within a few days; the kiln sometimes comes first."
      >
        <div className="contact__grid">
          <form className="contact__form" onSubmit={onSubmit}>
            <div className="field">
              <label htmlFor="name">Name</label>
              <input id="name" type="text" autoComplete="name" required value={form.name} onChange={update('name')} />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" autoComplete="email" required value={form.email} onChange={update('email')} />
            </div>
            <div className="field">
              <label htmlFor="piece">About a specific piece? <span className="field__opt">(optional)</span></label>
              <select id="piece" value={form.piece} onChange={update('piece')}>
                <option value="">— General enquiry —</option>
                {pieces.map((p) => (
                  <option key={p.id} value={p.title}>
                    {p.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="message">Message</label>
              <textarea id="message" rows="6" required value={form.message} onChange={update('message')} />
            </div>
            <button type="submit" className="btn">
              Open in your email app
            </button>
            <p className="contact__hint">
              This opens a pre-filled email in your mail client. Or write directly to{' '}
              <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
          </form>

          <aside className="contact__aside">
            <div className="contact__block">
              <h3>Studio</h3>
              <p>{site.location}</p>
              <p className="contact__muted">{site.studioVisits}</p>
            </div>
            <div className="contact__block">
              <h3>Elsewhere</h3>
              <ul>
                {site.socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noreferrer">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {site.commissions && (
              <div className="contact__block">
                <h3>Commissions</h3>
                <p className="contact__muted">{site.commissions}</p>
              </div>
            )}
          </aside>
        </div>
      </Section>
    </div>
  );
}
