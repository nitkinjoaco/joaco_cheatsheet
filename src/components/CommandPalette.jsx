import { useState } from 'react';

/**
 * Paleta ⌘K: filtra cheatsheets por nombre. Flechas para moverse, Enter abre, Esc cierra.
 * Con `inline` se dibuja sin fondo, para mostrarla dentro de una página.
 */
export function CommandPalette({ items, open, inline, onSelect, onClose }) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);

  const results = items.filter((item) => `${item.folder}/${item.label}`.toLowerCase().includes(query.toLowerCase()));

  function onKeyDown(e) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelected(Math.min(selected + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelected(Math.max(selected - 1, 0));
    } else if (e.key === 'Enter' && results[selected]) {
      onSelect?.(results[selected]);
    } else if (e.key === 'Escape') {
      onClose?.();
    }
  }

  const body = (
    <div className="nf-palette" role="dialog" aria-label="Buscar cheatsheet" onKeyDown={onKeyDown}>
      <div className="nf-palette-input">
        <span aria-hidden="true">›</span>
        <input
          autoFocus={!inline}
          value={query}
          placeholder="Buscar un cheatsheet…"
          aria-label="Buscar"
          onChange={(e) => {
            setQuery(e.target.value);
            setSelected(0);
          }}
        />
      </div>
      {results.length ? (
        <ul role="listbox">
          {results.map((item, i) => (
            <li
              key={item.folder + item.label}
              role="option"
              aria-selected={i === selected}
              data-folder={item.folder}
              onMouseEnter={() => setSelected(i)}
              onClick={() => onSelect?.(item)}
            >
              <i aria-hidden="true" />
              <span>{item.label}</span>
              <em>{item.folder}/</em>
            </li>
          ))}
        </ul>
      ) : (
        <p className="nf-palette-empty">No hay cheatsheets con ese nombre.</p>
      )}
      <div className="nf-palette-foot">↑↓ mover · Enter abrir · Esc cerrar</div>
    </div>
  );

  if (inline) return body;
  if (!open) return null;
  return (
    <div
      className="nf-palette-backdrop"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      {body}
    </div>
  );
}
