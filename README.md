# NoteFast

Cheatsheets de código ordenados en tres carpetas: `backend/`, `frontend/` y `hardware/`. Hecho con **React** y **Vite**, con el design system de NoteFast (tema oscuro, un color por carpeta, barras laterales fijas). Cada cheatsheet es un archivo **Markdown**.

## Cómo correrlo

Necesitás Node 18 o más nuevo.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # genera dist/
npm run preview  # sirve dist/
```

> Si esta carpeta está dentro de Dropbox, `node_modules` se va a sincronizar y pesa mucho. Conviene mover el proyecto fuera de Dropbox o excluir `node_modules` de la sincronización.

## Pantallas

| Ruta | Pantalla |
| --- | --- |
| `#/` | Bienvenida. Debajo están las tres carpetas para elegir una |
| `#/carpetas` | La misma bienvenida, con scroll hasta las tres carpetas (es lo que hace "Ver carpetas") |
| `#/backend` | Una carpeta: sus cheatsheets en tarjetas con el logo de cada tecnología |
| `#/backend/git` | Lector de un cheatsheet (carpetas a la izquierda, índice a la derecha) |
| `#/guia` | Guía rápida |

`⌘K` o `Ctrl+K` abren la búsqueda desde cualquier pantalla.

## Estructura

```
design/tokens.json        los tokens del design system (colores, tipografías, espacios…)
design/icons.md           de dónde salió cada logo
scripts/build-tokens.mjs  genera src/styles/tokens.css desde design/tokens.json
public/icons/             logos de las tecnologías (PNG de hasta 256 px)
src/styles/               tokens.css (generado), components.css (componentes) y app.css (páginas)
src/components/           los 16 componentes: NavBar, FolderCard, CheatsheetCard, WindowFrame, FileTree, TocRail, Markdown…
src/pages/                Bienvenida (con las carpetas), Carpeta, Lector, Guía y Footer
src/content/              los cheatsheets en Markdown: <carpeta>/<slug>.md
src/data/                 las carpetas (cheatsheets.js) y el cargador de los .md (content.js)
src/lib/                  router, lectura del Markdown (con marked) y helpers
```

## Agregar un cheatsheet

1. Escribí el contenido en `src/content/<carpeta>/<slug>.md`, en Markdown y sin encabezado YAML, empezando por un título `## `. Podés usar títulos `##`, `###` y `####`, párrafos, listas, tablas, notas con `>`, enlaces, bloques de código con su lenguaje (`bash`, `ts`, `css`, `cpp`…) y teclas con `<kbd>Ctrl</kbd>`. Los `##` y `###` arman el índice de la derecha.
2. En `src/data/cheatsheets.js`, sumalo en `files` de su carpeta: `slug` (el nombre del archivo sin `.md`), `title`, `description`, `tags` e `icon` (el logo en `public/icons/`, por ejemplo `/icons/git.png`).

Si un cheatsheet todavía no tiene archivo `.md`, el lector muestra "Este cheatsheet todavía no tiene contenido."

## Cambiar colores o tipografías

Editá `design/tokens.json` y corré `npm run tokens`: regenera `src/styles/tokens.css`. No edites `tokens.css` a mano.

Las fuentes (Archivo Black, Space Mono y JetBrains Mono) se cargan desde Google Fonts en `index.html`.
