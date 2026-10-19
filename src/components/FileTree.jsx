import { cx } from '../lib/cx.js';
import { Kbd } from './Kbd.jsx';

const asItem = (file) => (typeof file === 'string' ? { name: file } : file);

/**
 * Explorador de carpetas del riel izquierdo. Cada carpeta es un <details>:
 * funciona sin JavaScript. La carpeta activa se abre sola y el archivo activo se resalta.
 */
export function FileTree({ folders, activeFolder, activeFile, onSearch, className }) {
  return (
    <nav className={cx('nf-tree', className)} aria-label="Carpetas">
      {folders.map((folder) => (
        <details key={folder.id} data-folder={folder.id} open={folder.open ?? folder.id === activeFolder}>
          <summary>
            <i aria-hidden="true" />
            {folder.id}
            {folder.files && <em>{folder.files.length}</em>}
          </summary>
          <ul>
            {(folder.files ?? []).map((file) => {
              const item = asItem(file);
              const current = folder.id === activeFolder && item.name === activeFile;
              return (
                <li key={item.name}>
                  <a href={item.href ?? '#'} aria-current={current ? 'page' : undefined}>
                    {item.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </details>
      ))}
      {onSearch && (
        <button type="button" className="nf-tree-search" onClick={onSearch}>
          <Kbd>⌘K</Kbd> buscar
        </button>
      )}
    </nav>
  );
}
