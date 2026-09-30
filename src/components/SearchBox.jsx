import './SearchBox.css';

export default function SearchBox({ value, onChange }) {
  return (
    <form className="search-box" role="search" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="gallery-search" className="visually-hidden">
        Search pieces
      </label>
      <svg className="search-box__icon" viewBox="0 0 20 20" aria-hidden="true">
        <circle cx="8.5" cy="8.5" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M13 13l4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
      <input
        id="gallery-search"
        type="search"
        className="search-box__input"
        placeholder="Search by name, SKU or keyword"
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button type="button" className="search-box__clear" onClick={() => onChange('')}>
          Clear
        </button>
      )}
    </form>
  );
}
