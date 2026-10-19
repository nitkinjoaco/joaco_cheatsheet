// El contenido de cada cheatsheet vive en src/content/<carpeta>/<slug>.md, en Markdown.
// Se carga recién cuando se abre el cheatsheet: Vite arma un archivo aparte por cada .md.
const FILES = import.meta.glob('../content/*/*.md', { query: '?raw', import: 'default' });

/** Devuelve (con una promesa) el Markdown de un cheatsheet, o null si todavía no tiene archivo. */
export function loadContent(folderId, slug) {
  const load = FILES[`../content/${folderId}/${slug}.md`];
  return load ? load() : Promise.resolve(null);
}
