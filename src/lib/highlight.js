import './prism-manual.js';
import Prism from 'prismjs';
// El orden importa: markup antes que css y javascript (para resaltar <style> y <script>),
// y cada lenguaje después de aquel del que extiende.
import 'prismjs/components/prism-markup.js';
import 'prismjs/components/prism-css.js';
import 'prismjs/components/prism-css-extras.js';
import 'prismjs/components/prism-clike.js';
import 'prismjs/components/prism-javascript.js';
import 'prismjs/components/prism-typescript.js';
import 'prismjs/components/prism-c.js';
import 'prismjs/components/prism-cpp.js';
import 'prismjs/components/prism-json.js';
import 'prismjs/components/prism-python.js';

// Terminal: comandos, banderas, textos y comentarios. Prism no trae uno que distinga el comando de cada línea.
Prism.languages.shell = {
  comment: { pattern: /(^|\s)#.*/m, lookbehind: true, greedy: true },
  string: { pattern: /"(?:\\[\s\S]|[^"\\])*"|'[^']*'/, greedy: true },
  variable: /\$(?:\w+|\{[^}]*\})/,
  parameter: { pattern: /(^|\s)--?\w[\w-]*/m, lookbehind: true },
  command: { pattern: /(^[ \t]*|[|;&]\s*)[\w./~@:+-]+/m, lookbehind: true },
  operator: /&&|\|\||[|;<>]/,
};

const ALIASES = {
  html: 'markup', xml: 'markup', svg: 'markup',
  js: 'javascript', jsx: 'javascript', ts: 'typescript',
  'c++': 'cpp', ino: 'cpp', arduino: 'cpp', py: 'python',
  bash: 'shell', sh: 'shell', zsh: 'shell', console: 'shell', powershell: 'shell', ps1: 'shell', cmd: 'shell',
};

// Lenguajes de programación: ahí las palabras sueltas son variables, constantes o tipos.
const CODE = new Set(['javascript', 'typescript', 'c', 'cpp', 'python']);

// Palabras clave que VS Code pinta como control de flujo (violeta) y no como el resto (azul).
const CONTROL = new Set([
  'if', 'else', 'elif', 'for', 'while', 'do', 'switch', 'case', 'default', 'break', 'continue', 'return',
  'try', 'catch', 'finally', 'throw', 'await', 'yield', 'import', 'export', 'from', 'as', 'goto',
  'except', 'raise', 'with', 'pass',
]);

// Un token ya tiene su propio color: las palabras de adentro se dejan tal cual, salvo en estos, que contienen código.
const CODE_INSIDE = new Set(['parameter', 'expression', 'spread']);

// Palabras sueltas: en CSS pueden llevar guiones (sans-serif, space-between).
const WORD = /[A-Za-z_$][\w$]*/g;
const CSS_WORD = /-{0,2}[A-Za-z_][\w-]*/g;

function wordClass(word) {
  if (/^[A-Z][A-Z0-9_]+$/.test(word)) return 'constant';
  if (/^[A-Z]$/.test(word) || /^[A-Z]\w*[a-z]\w*$/.test(word)) return 'class-name';
  return 'variable';
}

/** Parte un texto sin token en palabras clasificadas y el resto tal cual. */
function splitWords(text, { words, regex }) {
  const out = [];
  let last = 0;
  for (const match of text.matchAll(regex)) {
    if (match.index > last) out.push(text.slice(last, match.index));
    // Las variables CSS (--lime) van como variables, no como valores.
    const className = words === true ? wordClass(match[0]) : match[0].startsWith('--') ? 'variable' : words;
    out.push({ className: `token ${className}`, children: [match[0]] });
    last = match.index + match[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

// `ctx.words`: false (dejar el texto), true (clasificar cada palabra) o la clase con la que pintarlas todas.
function convert(content, ctx) {
  if (typeof content === 'string') return ctx.words ? splitWords(content, ctx) : [content];
  if (Array.isArray(content)) return content.flatMap((item) => convert(item, ctx));

  const classes = ['token', content.type, ...[].concat(content.alias ?? [])];
  if (content.type === 'keyword' && CONTROL.has(content.content)) classes.push('control');
  const words = content.type === 'interpolation' ? ctx.base : CODE_INSIDE.has(content.type) ? ctx.words : false;
  return [{ className: classes.join(' '), children: convert(content.content, { ...ctx, words }) }];
}

/**
 * Resalta `code` según su lenguaje. Devuelve `{ name, nodes }`: el nombre real del lenguaje y un árbol de
 * textos y `{ className, children }`. Devuelve `null` si no conoce el lenguaje (el bloque queda sin colores).
 */
export function highlight(code, language = '') {
  const lang = language.toLowerCase();
  const name = ALIASES[lang] ?? lang;
  const grammar = Object.hasOwn(Prism.languages, name) ? Prism.languages[name] : null;
  if (!grammar || typeof grammar === 'function') return null;

  // En CSS lo que queda sin token son los valores (flex, center, sans-serif).
  const base = CODE.has(name) ? true : name === 'css' ? 'value' : false;
  const ctx = { words: base, base, regex: name === 'css' ? CSS_WORD : WORD };
  return { name, nodes: convert(Prism.tokenize(code, grammar), ctx) };
}
