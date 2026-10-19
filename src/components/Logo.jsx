import { cx } from '../lib/cx.js';

/** Rayo dentro de un cuadrado de esquinas redondeadas. Toma el color del texto (currentColor). */
export function BoltMark({ size = 28 }) {
  return (
    <svg className="nf-logo-mark" width={size} height={size} viewBox="0 0 28 28" aria-hidden="true">
      <rect x="1" y="1" width="26" height="26" rx="7" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <polygon points="16,5 7,16 12.5,16 10.5,24 21,11 15,11" fill="currentColor" />
    </svg>
  );
}

/** El logo de NoteFast: rayo y wordmark. Con `href` es un enlace. */
export function Logo({ href, size, wordmark = true, className }) {
  const Tag = href ? 'a' : 'span';
  return (
    <Tag className={cx('nf-logo', className)} href={href}>
      <BoltMark size={size} />
      {wordmark && <span>NoteFast</span>}
    </Tag>
  );
}
