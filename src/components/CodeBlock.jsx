import { useMemo, useState } from 'react';
import { cx } from '../lib/cx.js';
import { highlight } from '../lib/highlight.js';

function Tokens({ nodes }) {
  return nodes.map((node, i) =>
    typeof node === 'string' ? (
      node
    ) : (
      <span key={i} className={node.className}>
        <Tokens nodes={node.children} />
      </span>
    ),
  );
}

/**
 * Bloque de código con botón Copiar ("✓ Copiado" durante 1,6 s) y colores como en VS Code (tema Dark+).
 * `language` (html, css, js, ts, cpp, json, python, bash…) elige el resaltado; sin lenguaje conocido
 * (por ejemplo `text`) el código se muestra en un solo color.
 */
export function CodeBlock({ code, title, language, className }) {
  const [copied, setCopied] = useState(false);
  const result = useMemo(() => highlight(code, language), [code, language]);

  function copy() {
    const done = () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    };
    if (navigator.clipboard?.writeText) navigator.clipboard.writeText(code).then(done, done);
    else done();
  }

  return (
    <figure className={cx('nf-code', className)}>
      <figcaption className="nf-code-bar">
        <span>{title || language || ''}</span>
        <button type="button" className={cx('nf-code-copy', copied && 'is-copied')} onClick={copy} aria-live="polite">
          {copied ? '✓ Copiado' : 'Copiar'}
        </button>
      </figcaption>
      <pre>
        <code className={result ? `language-${result.name}` : undefined}>
          {result ? <Tokens nodes={result.nodes} /> : code}
        </code>
      </pre>
    </figure>
  );
}
