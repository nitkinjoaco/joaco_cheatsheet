import { Fragment, useState } from 'react';
import { cx } from '../lib/cx.js';

/**
 * Bloque de código con botón Copiar ("✓ Copiado" durante 1,6 s).
 * Con `shell` (por defecto) la primera palabra de cada línea va en lima y las líneas con # en gris.
 */
export function CodeBlock({ code, title, language, shell = true, className }) {
  const [copied, setCopied] = useState(false);

  function copy() {
    const done = () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    };
    if (navigator.clipboard?.writeText) navigator.clipboard.writeText(code).then(done, done);
    else done();
  }

  const lines = code.split('\n').map((line, i) => {
    let content = line;
    if (shell && /^\s*#/.test(line)) {
      content = <span className="c-muted">{line}</span>;
    } else if (shell) {
      const match = /^(\s*)(\S+)([\s\S]*)$/.exec(line);
      if (match) {
        content = (
          <>
            {match[1]}
            <span className="c-cmd">{match[2]}</span>
            {match[3]}
          </>
        );
      }
    }
    return (
      <Fragment key={i}>
        {i > 0 && '\n'}
        {content}
      </Fragment>
    );
  });

  return (
    <figure className={cx('nf-code', className)}>
      <figcaption className="nf-code-bar">
        <span>{title || language || ''}</span>
        <button type="button" className={cx('nf-code-copy', copied && 'is-copied')} onClick={copy} aria-live="polite">
          {copied ? '✓ Copiado' : 'Copiar'}
        </button>
      </figcaption>
      <pre>
        <code>{lines}</code>
      </pre>
    </figure>
  );
}
