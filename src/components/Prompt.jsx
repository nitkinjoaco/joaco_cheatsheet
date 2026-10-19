import { cx } from '../lib/cx.js';

/** Línea de prompt: `notefast ~ $ comando`. La ruta va en rosa; `cursor` agrega el bloque lima. */
export function Prompt({ host = 'notefast', path = '~', command, cursor, className }) {
  return (
    <p className={cx('nf-prompt', className)}>
      {host} <span className="p-path">{path}</span> {'$ '}
      {command && <span className="p-cmd">{command}</span>}
      {cursor && <span className="nf-cursor" aria-hidden="true" />}
    </p>
  );
}
