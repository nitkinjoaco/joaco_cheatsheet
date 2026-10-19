import { cx } from '../lib/cx.js';

/** Fondo de manchas de color. `hero` para la bienvenida, `soft` para el resto. */
export function MeshBackground({ variant = 'hero', children, className, style }) {
  return (
    <div className={cx('nf-mesh', className)} data-variant={variant} style={style}>
      {children}
    </div>
  );
}
