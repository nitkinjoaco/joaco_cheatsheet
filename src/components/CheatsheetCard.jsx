import { cx } from '../lib/cx.js';

/**
 * Tarjeta de un cheatsheet dentro de una carpeta: logo, título, archivo, descripción y tags.
 * El color sale de la carpeta (`folder`). Sin `icon` muestra las tres primeras letras del título.
 */
export function CheatsheetCard({ folder, title, file, description, tags = [], icon, href = '#', className }) {
  return (
    <a className={cx('nf-ccard', className)} data-folder={folder} href={href}>
      <div className="nf-ccard-head">
        <span className="nf-badge" aria-hidden="true">
          {icon ? <img src={icon} alt="" width="28" height="28" loading="lazy" /> : <span>{title.slice(0, 3)}</span>}
        </span>
        <div>
          <h3>{title}</h3>
          <p className="nf-ccard-file">{file}</p>
        </div>
      </div>
      <p className="nf-ccard-desc">{description}</p>
      {tags.length > 0 && (
        <ul className="nf-ccard-tags">
          {tags.map((tag) => (
            <li key={tag}>#{tag}</li>
          ))}
        </ul>
      )}
    </a>
  );
}
