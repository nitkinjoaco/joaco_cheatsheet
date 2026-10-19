import { cx } from '../lib/cx.js';

/** Tecla de atajo, por ejemplo ⌘K. */
export function Kbd({ children, className }) {
  return <kbd className={cx('nf-kbd', className)}>{children}</kbd>;
}
