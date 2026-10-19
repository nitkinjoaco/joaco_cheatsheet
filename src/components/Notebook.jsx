import { cx } from '../lib/cx.js';

/** Libreta negra con rayo lima y cinta rosa. Objeto de la bienvenida. */
export function Notebook({ size = 128, rotate = 22, className }) {
  return (
    <svg
      className={cx('nf-notebook', className)}
      width={size}
      height={(size * 140) / 120}
      viewBox="-60 -60 120 140"
      role="img"
      aria-label="Libreta de NoteFast con un rayo"
    >
      <g transform={`rotate(${rotate})`}>
        <rect x="-28" y="-42" width="64" height="90" rx="4" style={{ fill: 'var(--ink)' }} />
        <line x1="-8" y1="45" x2="-10" y2="62" style={{ stroke: 'var(--pink)', strokeWidth: 2 }} />
        <rect x="-32" y="-45" width="64" height="90" rx="4" style={{ fill: 'var(--surface-1)', stroke: 'var(--line-strong)' }} />
        <rect x="16" y="-45" width="5" height="90" style={{ fill: 'var(--surface-2)' }} />
        <polygon points="0,-22 -12,4 -2,4 -6,22 12,-6 2,-6" style={{ fill: 'var(--lime)' }} />
      </g>
    </svg>
  );
}
