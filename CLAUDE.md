# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Proyecto

Webapp personal de cheatsheets en Markdown con estética de terminal, organizada en tres
categorías: Backend, Frontend y Hardware. Sitio 100 % estático con **Astro 7 + TypeScript
(strict) + Tailwind CSS 4**. Inspirado en `nachovigilante/cheatsheets` (se toma el concepto y la
estética, **no** su código ni sus assets).

`README.md` es la fuente de verdad del plan: investigación, paleta, decisión de stack, roadmap
y glosario. Al terminar una fase, marcá su casilla en el roadmap del README.

## Usuario y convenciones

- El dueño es **principiante**. Cuando introduzcas una herramienta o un concepto nuevo,
  explicalo brevemente (qué es y por qué) y sumalo al glosario del README.
- Todo el texto visible, el contenido y los comentarios del código van en **español rioplatense**
  (voseo).
- Solo tema oscuro.
- Commits con prefijos convencionales (`feat:`, `fix:`, `docs:`…), por ejemplo
  `docs(backend): agrega cheatsheet de express`.

## Comandos

```bash
npm run dev                 # http://localhost:3000
npx astro dev --background  # dev server en segundo plano (astro dev stop | status | logs)
npm run check               # chequeo de tipos de .astro/.ts (astro check)
npm run build               # astro check + build estático a dist/
npm run preview             # sirve dist/
npm run format              # Prettier (con prettier-plugin-astro)
```

No hay tests ni linter; la validación es `npm run build` (tipos + esquema del frontmatter).

## Arquitectura

### Flujo del contenido

1. Los cheatsheets son `.md` en `src/content/cheatsheets/<categoría>/<slug>.md`. **La carpeta
   define la categoría y la URL** (`backend/git.md` → `/backend/git`); la categoría no se repite
   en el frontmatter. Los archivos que empiezan con `_` se ignoran (`_plantilla.md` es la
   plantilla).
2. `src/content.config.ts` define la colección `cheatsheets` (glob loader + esquema Zod:
   `title`, `description`, `badge?` de hasta 4 caracteres, `order` = 100, `tags` = [], `updated?`).
3. `src/lib/cheatsheets.ts` es la **única** capa que lee la colección. `parseId()` separa el id
   `"backend/git"` en `{ category, slug }` y **lanza un error** si el archivo no está directamente
   dentro de una carpeta de categoría válida. Páginas y componentes usan `getCheatsheets()`,
   `getCheatsheetsByCategory()`, `getHref()`, `getFileName()` y `getBadge()`; no llames a
   `getCollection` directamente.
4. Rutas: `src/pages/[category]/index.astro` (una por categoría, incluso vacía) y
   `src/pages/[category]/[slug].astro` (usa `render(entry)` → `<Content />` + `headings`, que
   alimentan el índice automático). No hay que escribir un "Índice" a mano en los `.md`.

### Categorías

Agregar una categoría toca **tres** lugares: la carpeta en `src/content/cheatsheets/`, la entrada
en `CATEGORIES` (`src/lib/categories.ts`, cuyo orden es el orden de la UI) y la variable
`--color-<id>` en `src/styles/global.css`.

### Sistema de color por categoría

`accentStyle(id)` devuelve el estilo inline `--accent: var(--color-<id>)`. Todo lo que cuelga de
ese elemento usa `var(--accent)`: utilidades de Tailwind como `text-(--accent)` y
`hover:border-(--accent)/60`, y las clases propias `.tint`, `.badge` y los estilos de
`.markdown`. Para teñir algo con el color de la categoría, poné `accentStyle` en un ancestro en
vez de agregar clases por categoría.

### Estilos

- No existe `tailwind.config`: Tailwind 4 se configura en CSS. Los tokens de diseño (colores,
  fuentes `font-mono`/`font-ui`/`font-display`) están en `@theme static` dentro de
  `src/styles/global.css`, que también define `.window`, `.card`, `.tint`, `.badge`, `.cursor`,
  `.tree` y la utilidad `no-ligatures`. `static` hace que las variables estén siempre en `:root`
  para que el CSS normal pueda usarlas.
- `src/styles/markdown.css` (importado por `global.css`) estiliza el HTML que sale de los `.md`
  dentro de `.markdown`. Shiki colorea el código al compilar (`astro.config.mjs`, tema
  `github-dark-default`). Si un lenguaje no existe en Shiki (por ejemplo `gitignore`), usá
  `text`.
- Las fuentes se cargan desde Google Fonts en `BaseLayout.astro`.

### Layouts y trampas conocidas

- `BaseLayout` (head, fondo, header, footer; la prop `wide` agranda el contenedor) →
  `CheatsheetLayout` (ventana con 3 columnas: sidebar, contenido e índice; en pantallas chicas
  la sidebar y el índice quedan plegados en `<details>`). Carpetas e índice funcionan sin JS.
- `.window` usa `overflow: clip` y **no** `hidden`: `hidden` crea un contenedor de scroll y
  rompe los `position: sticky` de la sidebar y el índice.
- Astro compacta los espacios del HTML: en elementos inline separados por saltos de línea
  (como `Prompt.astro`) hacen falta `{' '}` explícitos o el texto queda pegado. Después de
  correr Prettier sobre `.astro`, revisá que no haya aparecido ni desaparecido un espacio en
  ese tipo de markup.
