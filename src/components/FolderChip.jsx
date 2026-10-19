import { cx } from '../lib/cx.js';

/** Píldora de acceso directo a una carpeta, con su color y la cantidad de cheatsheets. */
export function FolderChip({ folder, count, href, className }) {
  const Tag = href ? 'a' : 'span';
  return (
    <Tag className={cx('nf-chip', className)} data-folder={folder} href={href}>
      <i aria-hidden="true" />
      <span>{folder}/</span>
      {count != null && <b>{count}</b>}
    </Tag>
  );
}
