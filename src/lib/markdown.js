import { marked } from 'marked';

/** Texto plano de una lista de tokens en línea (para títulos e índice). */
export function plainText(tokens = []) {
  return tokens.map((token) => (token.tokens ? plainText(token.tokens) : token.type === 'html' ? '' : (token.text ?? ''))).join('');
}

/** Id de un título, igual que en GitHub: minúsculas, sin signos, espacios como guiones. */
export function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s/g, '-');
}

/**
 * Convierte el Markdown de un cheatsheet en tokens (con `marked`) y les pone un `id` a los títulos.
 * Devuelve `{ tokens, headings }`; `headings` alimenta el índice: `{ id, text, depth }`.
 */
export function parseMarkdown(source) {
  const tokens = marked.lexer(source);
  const seen = new Map();
  const headings = [];

  for (const token of tokens) {
    if (token.type !== 'heading') continue;
    const text = plainText(token.tokens);
    let id = slugify(text) || 'seccion';
    const repeated = seen.get(id) ?? 0;
    seen.set(id, repeated + 1);
    if (repeated) id = `${id}-${repeated}`;
    token.id = id;
    headings.push({ id, text, depth: token.depth });
  }

  return { tokens, headings };
}
