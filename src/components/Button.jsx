import { cx } from '../lib/cx.js';

/**
 * Botón. `primary` es lima y va uno solo por pantalla; `ghost` lleva borde.
 * Con `prompt` antepone ">" (por ejemplo "> Ir a la terminal"). Con `href` es un enlace.
 */
export function Button({ variant = 'primary', size, prompt, href, type = 'button', onClick, children, className }) {
  const classes = cx('nf-btn', `nf-btn-${variant}`, size === 'sm' && 'nf-btn-sm', className);
  const content = (
    <>
      {prompt && <span aria-hidden="true">&gt;</span>}
      {children}
    </>
  );

  if (href) {
    return (
      <a className={classes} href={href} onClick={onClick}>
        {content}
      </a>
    );
  }
  return (
    <button className={classes} type={type} onClick={onClick}>
      {content}
    </button>
  );
}
