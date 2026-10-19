import { cx } from '../lib/cx.js';
import { CodeBlock } from './CodeBlock.jsx';
import { Kbd } from './Kbd.jsx';

const ENTITIES = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', copy: '©', reg: '®',
  mdash: '—', ndash: '–', hellip: '…', rarr: '→', larr: '←', times: '×',
};

/** Convierte entidades HTML (&copy;, &#169;…) en caracteres. No se usa en código. */
function decode(text = '') {
  return text.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (match, code) => {
    if (code[0] !== '#') return ENTITIES[code.toLowerCase()] ?? match;
    const hex = code[1].toLowerCase() === 'x';
    return String.fromCodePoint(parseInt(code.slice(hex ? 2 : 1), hex ? 16 : 10));
  });
}

/** Los enlaces a #seccion no cambian la ruta (el router usa el hash): hacen scroll hasta el título. */
function scrollToAnchor(event, id) {
  event.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderInline(tokens = [], prefix = '') {
  const out = [];
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const key = `${prefix}${i}`;
    // <kbd>Ctrl</kbd> llega como tres tokens: apertura, contenido y cierre.
    if (token.type === 'html' && /^<kbd>$/i.test(token.raw.trim())) {
      const inner = [];
      while (++i < tokens.length && !(tokens[i].type === 'html' && /^<\/kbd>$/i.test(tokens[i].raw.trim()))) {
        inner.push(tokens[i]);
      }
      out.push(<Kbd key={key}>{renderInline(inner, `${key}-`)}</Kbd>);
      continue;
    }
    out.push(<Inline key={key} token={token} />);
  }
  return out;
}

function Inline({ token }) {
  switch (token.type) {
    case 'text':
      return token.tokens ? renderInline(token.tokens) : decode(token.text);
    case 'escape':
      return token.text;
    case 'strong':
      return <strong>{renderInline(token.tokens)}</strong>;
    case 'em':
      return <em>{renderInline(token.tokens)}</em>;
    case 'del':
      return <del>{renderInline(token.tokens)}</del>;
    case 'codespan':
      return <code>{token.text}</code>;
    case 'br':
      return <br />;
    case 'link': {
      const internal = token.href.startsWith('#');
      const props = internal
        ? { onClick: (event) => scrollToAnchor(event, decodeURIComponent(token.href.slice(1))) }
        : { target: '_blank', rel: 'noopener noreferrer' };
      return (
        <a href={token.href} {...props}>
          {renderInline(token.tokens)}
        </a>
      );
    }
    case 'image':
      return <img src={token.href} alt={token.text} loading="lazy" />;
    case 'html':
      return decode(token.text);
    default:
      return token.raw ?? null;
  }
}

function Block({ token }) {
  switch (token.type) {
    case 'heading': {
      const Tag = `h${Math.min(Math.max(token.depth, 2), 4)}`;
      const mark = token.depth === 2 ? '## ' : token.depth === 3 ? '### ' : null;
      return (
        <Tag id={token.id}>
          {mark && (
            <span className="nf-md-mark" aria-hidden="true">
              {mark}
            </span>
          )}
          {renderInline(token.tokens)}
        </Tag>
      );
    }
    case 'paragraph':
      return <p>{renderInline(token.tokens)}</p>;
    case 'text':
      return token.tokens ? <>{renderInline(token.tokens)}</> : decode(token.text);
    case 'code': {
      const lang = (token.lang || '').split(/\s/)[0].toLowerCase();
      return <CodeBlock code={token.text} title={lang && lang !== 'text' ? lang : undefined} language={lang} />;
    }
    case 'list': {
      const Tag = token.ordered ? 'ol' : 'ul';
      const start = token.ordered && token.start !== '' && token.start !== 1 ? token.start : undefined;
      return (
        <Tag start={start}>
          {token.items.map((item, i) => (
            <li key={i}>
              {item.task && <input type="checkbox" checked={item.checked} readOnly disabled />}
              <Blocks tokens={item.tokens} />
            </li>
          ))}
        </Tag>
      );
    }
    case 'blockquote':
      return (
        <blockquote>
          <Blocks tokens={token.tokens} />
        </blockquote>
      );
    case 'table': {
      const align = (i) => (token.align[i] ? { textAlign: token.align[i] } : undefined);
      return (
        <div className="nf-md-table">
          <table>
            <thead>
              <tr>
                {token.header.map((cell, i) => (
                  <th key={i} style={align(i)}>
                    {renderInline(cell.tokens)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {token.rows.map((row, r) => (
                <tr key={r}>
                  {row.map((cell, i) => (
                    <td key={i} style={align(i)}>
                      {renderInline(cell.tokens)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    case 'hr':
      return <hr />;
    case 'html':
      return <p>{decode(token.text)}</p>;
    default:
      return null;
  }
}

function Blocks({ tokens = [] }) {
  return tokens.map((token, i) => <Block key={i} token={token} />);
}

/**
 * Dibuja un cheatsheet en Markdown con el estilo de NoteFast: títulos con ## y ###, tablas,
 * notas (>), listas, <kbd> y bloques de código con CodeBlock. Recibe los tokens de parseMarkdown.
 */
export function Markdown({ tokens, className }) {
  return (
    <div className={cx('nf-md', className)}>
      <Blocks tokens={tokens} />
    </div>
  );
}
