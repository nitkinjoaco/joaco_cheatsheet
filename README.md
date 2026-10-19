# NoteFast

Cheatsheets de código ordenados en tres carpetas: `backend/`, `frontend/` y `hardware/`. Hecho con **React** y **Vite**, con el design system de NoteFast (tema oscuro, un color por carpeta, barras laterales fijas).

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
src/components/           los 15 componentes: NavBar, FolderCard, CheatsheetCard, WindowFrame, FileTree, TocRail…
src/pages/                Bienvenida (con las carpetas), Carpeta, Lector, Guía y Footer
src/data/                 las carpetas (cheatsheets.js) y el contenido (content.js)
```

## Agregar un cheatsheet

1. En `src/data/cheatsheets.js`, sumalo en `files` de su carpeta: `slug` (el nombre del archivo sin `.md`), `title`, `description`, `tags` e `icon` (el logo en `public/icons/`, por ejemplo `/icons/git.png`).
2. En `src/data/content.js`, escribí su contenido con la clave `"carpeta/slug"`: secciones con párrafos y bloques de código. Mientras no tenga contenido, se muestra "Este cheatsheet todavía no tiene contenido."

## Cambiar colores o tipografías

Editá `design/tokens.json` y corré `npm run tokens`: regenera `src/styles/tokens.css`. No edites `tokens.css` a mano.

Las fuentes (Archivo Black, Space Mono y JetBrains Mono) se cargan desde Google Fonts en `index.html`.
