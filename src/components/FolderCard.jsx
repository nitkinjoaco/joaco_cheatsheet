import { cx } from '../lib/cx.js';

const asItem = (file) => (typeof file === 'string' ? { name: file } : file);

/**
 * Tarjeta de una carpeta: pestaña de color, nombre, cantidad, archivos y "abrir →".
 * Los archivos pueden ser strings o `{ name, soon }` (los `soon` no cuentan).
 */
export function FolderCard({ folder, files = [], count, href = '#', className }) {
  const total = count ?? files.filter((f) => !asItem(f).soon).length;
  return (
    <a className={cx('nf-card', className)} data-folder={folder} href={href}>
      <span className="nf-card-tab" aria-hidden="true" />
      <h3>{folder}/</h3>
      <p className="nf-card-count">
        {total} {total === 1 ? 'cheatsheet' : 'cheatsheets'}
      </p>
      <ul>
        {files.map((file, i) => {
          const item = asItem(file);
          return (
            <li key={i} className={item.soon ? 'soon' : undefined}>
              {item.name}
            </li>
          );
        })}
      </ul>
      <span className="nf-card-open">abrir →</span>
    </a>
  );
}
