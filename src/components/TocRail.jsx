import { cx } from '../lib/cx.js';

/**
 * Índice del riel derecho: títulos del cheatsheet con una línea de progreso cian.
 * `activeId` marca la sección actual; `progress` (0 a 1) es la posición de lectura.
 * Sin `progress` se calcula con la sección activa.
 */
export function TocRail({ items, activeId, progress, label = 'Índice', onSelect, className }) {
  const activeIndex = items.findIndex((item) => item.id === activeId);
  const fraction = progress ?? (items.length > 1 && activeIndex >= 0 ? activeIndex / (items.length - 1) : 0);

  return (
    <nav className={cx('nf-toc', className)} aria-label="En esta página">
      <p className="nf-toc-label">{label}</p>
      <ol style={{ '--p': fraction }}>
        <span className="nf-toc-progress" aria-hidden="true" />
        {items.map((item, i) => {
          const state = i === activeIndex ? 'active' : i < activeIndex ? 'read' : 'next';
          return (
            <li key={item.id} data-depth={item.depth ?? 2}>
              <a
                href={`#${item.id}`}
                className={`is-${state}`}
                aria-current={i === activeIndex ? 'location' : undefined}
                onClick={onSelect ? (e) => onSelect(item, e) : undefined}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
