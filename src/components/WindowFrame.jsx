import { cx } from '../lib/cx.js';

/**
 * Ventana de terminal con semáforos, título y un cuerpo de tres columnas:
 * `left` (riel de carpetas), `children` (contenido) y `right` (índice).
 * Sin `height` los rieles quedan sticky debajo de la NavBar; con `height` el contenido hace scroll adentro.
 */
export function WindowFrame({ title, left, right, height, paneRef, onPaneScroll, children, className, style }) {
  const fixed = height != null;
  const frameStyle = { ...style };
  if (fixed) frameStyle['--nf-h'] = typeof height === 'number' ? `${height}px` : height;

  return (
    <div className={cx('nf-window', fixed && 'nf-window-fixed', className)} style={frameStyle}>
      <div className="nf-window-bar">
        <div className="nf-dots" aria-hidden="true">
          <i style={{ background: 'var(--dot-red)' }} />
          <i style={{ background: 'var(--dot-yellow)' }} />
          <i style={{ background: 'var(--dot-green)' }} />
        </div>
        <p className="nf-window-title">{title}</p>
      </div>
      <div className="nf-window-body">
        {left && (
          <aside className="nf-rail nf-rail-left">
            <div className="nf-sticky">{left}</div>
          </aside>
        )}
        <div className="nf-pane" ref={paneRef} onScroll={onPaneScroll}>
          {children}
        </div>
        {right && (
          <aside className="nf-rail nf-rail-right">
            <div className="nf-sticky">{right}</div>
          </aside>
        )}
      </div>
    </div>
  );
}
