# joaco://cheatsheets

Webapp personal de **cheatsheets** (machetes) en Markdown para repasar mientras aprendo
programación. Organizada en tres categorías: **Backend**, **Frontend** y **Hardware**.

> **Estado:** setup y diseño base terminados (fases 1–4). Hay un cheatsheet de ejemplo por
> categoría. Ver el [roadmap](#9-roadmap).

## Cómo correrlo

Necesitás [Node.js](https://nodejs.org) 22.12 o más nuevo.

```bash
npm install        # instala las dependencias (solo la primera vez)
npm run dev        # servidor de desarrollo en http://localhost:3000 (se recarga solo)
npm run build      # chequea tipos y genera el sitio final en dist/
npm run preview    # sirve dist/ para verlo como quedaría publicado
npm run format     # ordena el código con Prettier
```

Extensiones de VS Code recomendadas (el editor las sugiere al abrir la carpeta): Astro,
Tailwind CSS IntelliSense y Prettier.

Inspirado en [nachovigilante/cheatsheets](https://github.com/nachovigilante/cheatsheets)
([demo](https://cheatsheets-nv.vercel.app/)). Tomo el **concepto y la estética**, pero no
el código ni los assets (logos, imágenes, fondos): todo se escribe de cero.

---

## Índice

1. [Investigación del proyecto de referencia](#1-investigación-del-proyecto-de-referencia)
2. [Estilo visual](#2-estilo-visual)
3. [Decisión de stack](#3-decisión-de-stack)
4. [Contenido: categorías](#4-contenido-categorías)
5. [Estructura de carpetas](#5-estructura-de-carpetas)
6. [Cómo se cargan y renderizan los Markdown](#6-cómo-se-cargan-y-renderizan-los-markdown)
7. [Navegación](#7-navegación)
8. [Cómo agregar un cheatsheet nuevo](#8-cómo-agregar-un-cheatsheet-nuevo)
9. [Roadmap](#9-roadmap)
10. [Glosario para principiantes](#10-glosario-para-principiantes)

---

## 1. Investigación del proyecto de referencia

### Stack que usa

| Pieza | Qué usa | Para qué |
| --- | --- | --- |
| Framework | **Next.js 12** (Pages Router) + React 18 | Páginas y rutas |
| Lenguaje | TypeScript 4 | Tipos |
| Estilos | Tailwind CSS 3 + SCSS (`globals.scss`) | Utilidades + estilos del Markdown |
| Markdown | `gray-matter` (lee el frontmatter) + `marked` (MD → HTML) | Parsear los `.md` |
| Resaltado de código | `highlight.js` (tema `github-dark`) | Colorear bloques de código |
| Extras | KaTeX (fórmulas), `next-pwa` (instalable), Font Awesome, husky + commitlint | — |

### Estructura de carpetas (rama `main`)

```text
cheatsheets/            ← un .md por tema, todos en la misma carpeta (bash.md, git.md, ino.md…)
components/
  layout/               ← Header, Background, Section, FloatingButtons
  utils/Terminal/       ← Terminal, Command, Autocomplete, useCommandList
contexts/               ← Theme, Loading, Terminal (estado global con React Context)
pages/
  index.tsx             ← landing
  cheatsheet/[slug].tsx ← página dinámica de cada cheatsheet
public/assets/images/   ← un logo .svg por cheatsheet, mismo nombre que el .md
styles/globals.scss
```

### Cómo renderiza los `.md`

1. **Landing** (`pages/index.tsx` → `getStaticProps`): en tiempo de *build* lee la carpeta
   `cheatsheets/` con `fs.readdirSync`, saca el `slug` del nombre del archivo y el
   frontmatter (`title`, `image`) con `gray-matter`.
2. **Página del cheatsheet** (`pages/cheatsheet/[slug].tsx`): `getStaticPaths` genera una ruta
   por archivo; `getStaticProps` lee el `.md`; en el componente se convierte a HTML con
   `marked` y se inyecta con `dangerouslySetInnerHTML`. Los estilos del contenido viven en
   la clase `.cheatsheet` de `globals.scss`.
3. Todo es **estático**: se genera una vez al compilar y se sirve desde Vercel.

### Cómo se agrega un cheatsheet (según su README)

- Crear `cheatsheets/<nombre>.md` con frontmatter `title` (y opcionalmente `image`).
- Agregar `public/assets/images/<nombre>.svg` con el mismo nombre.
- La primera sección tiene que ser un **"Índice"** escrito a mano (generado con una extensión
  de VS Code).

### Lo que hay en la demo

- **Landing:** header con logo y `<TIC_Cheatsheets/>`; hero con el título gigante
  "TIC / CHEATSHEETS" y un botón `> Ir a la terminal`; una caja de vidrio ("glassbox") con el
  "¿Qué es?"; y abajo una **ventana de terminal** estilo macOS.
- **La terminal:** barra de título con los tres "semáforos" y el texto `tic://cheatsheets`;
  **sidebar** "▾ CHEATSHEETS" con la lista de archivos (`bash.md`, `git.md`…) con iconito;
  consola con prompt `~/ORT/TIC/cheatsheets git:(main)` y `>` que acepta comandos
  (`help`, `ls`, `open git.md`, `cat`, `man`, `cls`…) con autocompletado por Tab.
- **Página del cheatsheet:** panel centrado con el título, índice de links, secciones `h2`
  con línea inferior, bloques de código oscuros, switch de tema claro/oscuro y botón flotante
  "volver arriba".

**Aclaración:** la demo **no tiene una grilla de tarjetas** en la landing; la navegación es
la sidebar de la terminal más los comandos. La grilla de tarjetas por categoría es algo
**que agrego yo** en este proyecto, porque con tres categorías hace falta agrupar.

### Qué tomo y qué cambio

| Tomo | Cambio / mejoro |
| --- | --- |
| Estética de terminal (ventana, semáforos, `xxx://cheatsheets`, prompt) | Todo en **tema oscuro** (la referencia muestra el contenido en un panel gris claro por defecto) |
| Sidebar tipo explorador de archivos | Sidebar **agrupada por categoría** (`backend/`, `frontend/`, `hardware/`) |
| Fondo con manchas de color difuminadas + vidrio | Landing con **tarjetas por categoría** |
| Un `.md` = un cheatsheet, con frontmatter | **Índice automático** a partir de los títulos (no hace falta escribirlo a mano) |
| Sitio 100% estático | Frontmatter **validado**: si falta el `title`, el build avisa |

---

## 2. Estilo visual

Colores medidos en la demo (con las devtools) y la paleta que propongo para este proyecto.
Mantengo el espíritu (violeta profundo + acentos neón), pero con valores propios.

### Paleta

| Rol | Referencia | **joaco://cheatsheets** |
| --- | --- | --- |
| Fondo de página | `#1f0739` + manchas magenta / teal / naranja | `#0f0a1a` + manchas suaves (gradientes CSS, sin imágenes) |
| Ventana (vidrio) | `#2322256d` + `backdrop-blur` | `#1c1826cc` + `backdrop-blur` |
| Barra de título | `#2a2831` | `#26222f` |
| Sidebar | `#242229` | `#1f1b28` |
| Borde de ventana | `#504e54`, 3px, radio 15px | `#3d3848`, 2px, radio 14px |
| Texto principal | `#e2e2e2` | `#e7e3ee` |
| Texto secundario | — | `#9a93a8` |
| Semáforos | `#ff5f56` `#ffbd2e` `#27c93f` | iguales (es un "estándar" de macOS) |
| Prompt: ruta | `#ED57EC` (rosa) | `#f06be0` |
| Prompt: `git:` | `#9FEA18` (verde lima) | `#a6e22e` |
| Acento / botones | `#e61366` | `#f0508f` |
| Bloques de código | `#0d1117` | `#0d1117` (tema de Shiki oscuro) |

**Colores por categoría** (para tarjetas, iconos y la carpeta activa en la sidebar):

| Categoría | Color | Por qué |
| --- | --- | --- |
| Backend | verde `#a6e22e` | Como el `git:` del prompt: servidor, consola |
| Frontend | rosa `#f06be0` | Como la ruta del prompt: lo visual |
| Hardware | ámbar `#f5a524` | Como un LED / placa |

### Tipografía (Google Fonts)

| Uso | Referencia | Propuesta |
| --- | --- | --- |
| Texto y código | Fira Code | **JetBrains Mono** (monoespaciada, muy legible en código) |
| UI (header, títulos de ventana, sidebar) | Space Mono | **Space Mono** |
| Título grande del hero | Raleway 900 | **Space Grotesk 700** (más "tech", combina con Space Mono) |

### Elementos de la estética terminal

- **Ventana:** barra superior con 3 círculos + título centrado tipo URL:
  `joaco://cheatsheets/backend/git.md`.
- **Prompt:** `joaco@cheatsheets ~/backend git:(main) $` arriba de cada página.
- **Cursor parpadeante** (`▌`) en el hero.
- **Sidebar tipo árbol:** `▾ backend/` → `git.md`, `node.md`…
- **Sin ligaduras** en textos tipo código (que `->` no se convierta en flecha).

### Mockups

Landing:

```text
 ▣ joaco://cheatsheets                                                   [gh]
 ─────────────────────────────────────────────────────────────────────────────

   joaco@cheatsheets ~ $ ls --categorias▌

   ┌─ ● ● ● ─ backend/ ──┐  ┌─ ● ● ● ─ frontend/ ─┐  ┌─ ● ● ● ─ hardware/ ─┐
   │ [verde] Backend     │  │ [rosa] Frontend     │  │ [ámbar] Hardware    │
   │ node.md             │  │ html.md             │  │ arduino.md          │
   │ express.md          │  │ css.md              │  │ i2c.md              │
   │ git.md  mysql.md …  │  │ javascript.md …     │  │ uart.md             │
   │ 5 cheatsheets    →  │  │ 4 cheatsheets    →  │  │ 4 cheatsheets    →  │
   └─────────────────────┘  └─────────────────────┘  └─────────────────────┘
```

Página de un cheatsheet:

```text
┌─ ● ● ● ─────────────── joaco://cheatsheets/backend/git.md ───────────────────────┐
│ ▾ backend/     │ joaco@cheatsheets ~/backend git:(main) $ cat git.md │ EN ESTA   │
│   express.md   │                                                     │ PÁGINA    │
│ ▸ git.md  ◀    │ # Git                                               │ ¿Qué es?  │
│   mysql.md     │ ## ¿Qué es?                                         │ Comandos  │
│   node.md      │ ...                                                 │ Branches  │
│ ▸ frontend/    │ ┌─────────────────────────┐                         │ GitHub    │
│ ▸ hardware/    │ │ git commit -m "mensaje" │                         │           │
│                │ └─────────────────────────┘                         │           │
└────────────────┴─────────────────────────────────────────────────────┴───────────┘
```

En celular la sidebar se esconde detrás de un botón `☰ ls` y el índice de la derecha pasa
arriba del contenido.

---

## 3. Decisión de stack

### Opciones evaluadas

| | **Astro + TS + Tailwind** ⭐ | Next.js + TS + Tailwind (como la referencia) | HTML + CSS + JS puro |
| --- | --- | --- | --- |
| Markdown | **Viene incluido**: los `.md` son contenido de primera clase | Hay que armarlo: `gray-matter` + `remark`/`rehype` + highlighter | Hay que convertirlo a mano o con una librería en el navegador |
| Resaltado de código | **Incluido** (Shiki) | Instalar y configurar | Instalar y configurar |
| Validar frontmatter | **Incluido** (Content Collections + Zod) | A mano | No |
| Índice automático | `render()` devuelve la lista de títulos | A mano (plugin de rehype) | A mano |
| Conceptos nuevos | Componentes `.astro` (HTML + un bloque de JS arriba) | React, JSX, Server vs Client Components, App Router | Pocos, pero mucho código repetido |
| JavaScript que llega al navegador | **Casi nada** (sitio estático) | El runtime de React | Lo que escribas |
| Sirve para practicar | HTML/CSS/TS, componentes, routing | React/Next.js (está en tu roadmap de Frontend) | HTML/CSS/JS de base |
| Deploy | Vercel / Netlify / GitHub Pages | Vercel | Cualquiera |

### Decisión: **Astro + TypeScript + Tailwind CSS**

**Por qué:** esta app es básicamente *"una carpeta de Markdown → un sitio lindo"*, y Astro
está hecho justo para eso. Lo que en Next.js te lleva 4 librerías y bastante código
"de pegamento" (leer archivos, parsear frontmatter, convertir a HTML, resaltar código, armar
el índice), en Astro ya viene resuelto. Así el esfuerzo va a **escribir cheatsheets y
aprender HTML/CSS/TS**, no a pelear con la configuración.

**Trade-off que acepto:** no practico React/Next.js con este proyecto. Lo mitigo así:

- La sintaxis de los componentes `.astro` es muy parecida a JSX, así que el salto a React
  después es chico.
- Si más adelante quiero la **terminal interactiva** (comandos `ls`, `open`, `help`), Astro
  permite meter un componente de **React** solo en esa parte (lo que se llama una "isla").
  Ahí practico React sin reescribir todo.
- Si en algún momento quiero migrar a Next.js, los `.md` se llevan tal cual: el contenido no
  depende del framework.

**Versiones al momento del plan (sep 2026):** Astro 7.x, Tailwind CSS 4.x (vía
`@tailwindcss/vite`), TypeScript en modo `strict`, Node 24.

### Otras herramientas

| Herramienta | Qué es | Por qué |
| --- | --- | --- |
| **Shiki** | Resaltador de sintaxis que colorea el código al compilar | Viene con Astro, no manda JS al navegador, usa los mismos temas que VS Code |
| **Zod** | Librería para describir "la forma" que tienen que tener los datos | Astro la usa para validar el frontmatter y avisar si algo falta |
| **Vercel** | Hosting gratis para sitios estáticos | Deploy automático con cada `git push` (igual que la referencia) |
| **Prettier** (+ plugin de Astro) | Formateador automático de código | Mantiene el código prolijo sin pensarlo |

Lo que **no** uso de la referencia, a propósito: SCSS (Tailwind 4 + CSS normal alcanza),
`marked`/`gray-matter`/`highlight.js` (Astro ya lo resuelve), PWA, KaTeX, husky/commitlint
(para un proyecto personal agregan fricción; se pueden sumar después).

---

## 4. Contenido: categorías

Los cheatsheets se van agregando a medida que los necesito. Lista inicial:

| Categoría | Cheatsheets | Contenido tentativo |
| --- | --- | --- |
| **Backend** | `node.md` | Módulos, `npm`, `package.json`, `fs`, variables de entorno |
| | `typescript.md` | Tipos, `tsconfig` para Node 24, uniones, genéricos, utility types |
| | `express.md` | Express 5 + TypeScript: rutas, `req`/`res`, middlewares, errores, CORS |
| | `git.md` | `init`/`add`/`commit`/`push`, branches, merge, GitHub |
| | `mysql.md` | `SELECT`/`INSERT`/`UPDATE`/`DELETE`, `JOIN`, conexión desde Node (`mysql2`) |
| | `php.md` | Sintaxis, arrays, formularios, conexión a MySQL (PDO) |
| **Frontend** | `html.md` | Estructura, etiquetas semánticas, formularios, accesibilidad básica |
| | `css.md` | Selectores, box model, Flexbox, Grid, responsive |
| | `javascript.md` | Tipos, funciones, arrays, DOM, `fetch`, `async/await` |
| | `nextjs-react.md` | Componentes, props, estado, hooks, App Router |
| **Hardware** | `arduino.md` | `setup`/`loop`, `pinMode`, `digitalRead/Write`, `analogRead`, `Serial` |
| | `sensores.md` | Lectura de sensores comunes, pull-up/pull-down, debounce |
| | `i2c.md` | Qué es, SDA/SCL, direcciones, librería `Wire` |
| | `uart.md` | TX/RX, baud rate, `Serial` / `SoftwareSerial` |

---

## 5. Estructura de carpetas

```text
joaco_cheatsheet/
├─ .vscode/                     ← extensiones y ajustes recomendados para VS Code
├─ public/
│  └─ favicon.svg
├─ src/
│  ├─ assets/
│  │  └─ icons/                 ← logo de cada cheatsheet, con el mismo nombre que el .md
│  │                              (css.png ↔ css.md). Astro los achica al compilar
│  ├─ content/
│  │  ├─ plan.md                ← plan de contenido: qué tiene y qué le falta a cada cheatsheet
│  │  │                            (no se publica: está afuera de cheatsheets/)
│  │  └─ cheatsheets/           ← EL CONTENIDO: la subcarpeta ES la categoría
│  │     ├─ _plantilla.md       ← plantilla (el "_" hace que no se publique)
│  │     ├─ backend/
│  │     │  ├─ typescript.md    ← tipos, tsconfig para Node 24, genéricos (order 2)
│  │     │  ├─ express.md       ← APIs REST con Express 5 + TypeScript (order 3)
│  │     │  └─ git.md           ← ramas, conflictos, GitHub, deshacer (order 4)
│  │     ├─ frontend/
│  │     │  ├─ html.md          ← etiquetas, formularios, accesibilidad (order 1)
│  │     │  ├─ css.md           ← cascada, box model, Flexbox, Grid, responsive (order 2)
│  │     │  └─ javascript.md    ← DOM, eventos, fetch, async/await (order 3)
│  │     └─ hardware/
│  │        └─ arduino.md       ← UNO R3: pines, #define, millis, puerto serie (order 1)
│  ├─ content.config.ts         ← define la colección y valida el frontmatter
│  ├─ components/
│  │  ├─ TerminalWindow.astro   ← marco de ventana (semáforos + título tipo URL)
│  │  ├─ Prompt.astro           ← línea "joaco@cheatsheets ~/backend $ …"
│  │  ├─ Header.astro
│  │  ├─ Sidebar.astro          ← árbol de carpetas/archivos
│  │  ├─ TableOfContents.astro  ← índice automático ("en esta página")
│  │  ├─ CategoryCard.astro     ← tarjeta de la landing
│  │  ├─ CheatsheetIcon.astro   ← logo del cheatsheet (imagen o insignia de texto)
│  │  └─ CheatsheetCard.astro   ← tarjeta de la página de categoría
│  ├─ layouts/
│  │  ├─ BaseLayout.astro       ← <html>, <head>, fuentes, fondo, header
│  │  └─ CheatsheetLayout.astro ← ventana + sidebar + contenido + índice
│  ├─ lib/
│  │  ├─ categories.ts          ← nombre, descripción y orden de cada categoría
│  │  └─ cheatsheets.ts         ← helpers: traer, ordenar y agrupar cheatsheets
│  ├─ pages/                    ← cada archivo acá = una URL
│  │  ├─ index.astro            ← /                       (landing con tarjetas)
│  │  ├─ 404.astro              ← "bash: command not found"
│  │  └─ [category]/
│  │     ├─ index.astro         ← /backend                (lista de esa categoría)
│  │     └─ [slug].astro        ← /backend/git            (el cheatsheet)
│  └─ styles/
│     ├─ global.css             ← Tailwind + variables de color + fuentes
│     └─ markdown.css           ← estilos del contenido (h2, tablas, código…)
├─ astro.config.mjs             ← config de Astro (Tailwind, tema de Shiki)
├─ .prettierrc                  ← config del formateador
├─ tsconfig.json
├─ package.json
├─ CLAUDE.md                    ← memoria del proyecto para Claude Code (se genera con /init)
└─ README.md
```

**Decisión clave: la categoría sale de la carpeta.** Un archivo en
`src/content/cheatsheets/backend/git.md` pertenece a Backend y su URL es `/backend/git`. No
hay que repetir la categoría en el frontmatter, así no puede quedar desincronizada. Si alguien
crea una carpeta que no está en `lib/categories.ts`, el build falla con un mensaje claro.

**Formato de los cheatsheets:** todos siguen la misma forma: `¿Qué es?` → secciones de uso de
lo básico a lo avanzado → `Errores comunes` → `Preguntas frecuentes` → `Fuentes`. Las secciones
van con `##` y `###` (arman el índice de la derecha); cada error y cada pregunta va con `####`,
que se ve como título pero no llena el índice. El orden de trabajo y las decisiones tomadas
están en `src/content/plan.md`.

**Iconos:** cada cheatsheet muestra su logo si hay una imagen en `src/assets/icons/` con **el
mismo nombre que el `.md`** (`css.md` → `css.png`; sirve `.png`, `.jpg`, `.webp` o `.svg`). Si
no hay imagen (como pasa con `git.md`), se usa una **insignia de texto** (`git`) pintada con el
color de su categoría. Las imágenes van en `src/assets/` y no en `public/` porque así Astro las
**optimiza** al compilar: las achica al tamaño en que se ven y las pasa a WebP (el logo de Arduino
pasa de 268 kB a 3 kB).

---

## 6. Cómo se cargan y renderizan los Markdown

Todo pasa **al compilar** (`npm run build`), no en el navegador:

```text
 src/content/cheatsheets/backend/git.md
          │
          ▼
 content.config.ts ── glob("**/*.md") encuentra los archivos
          │           Zod valida el frontmatter (title, description, badge…)
          ▼
 getCollection("cheatsheets") ── lista de entradas con id "backend/git"
          │
          ├──► lib/cheatsheets.ts agrupa por categoría → landing, sidebar, /backend
          │
          ▼
 [category]/[slug].astro
   getStaticPaths() → una página por archivo  (/backend/git, /frontend/html…)
   render(entry)    → { Content, headings }
          │                    │
          │                    └──► TableOfContents (índice automático con h2/h3)
          ▼
 <Content /> → HTML + código coloreado con Shiki + estilos de markdown.css
          │
          ▼
 dist/backend/git/index.html  (HTML estático listo para Vercel)
```

### Frontmatter de cada cheatsheet

```yaml
---
title: Git                      # obligatorio
description: Versionar código y trabajar con GitHub   # obligatorio (se ve en la tarjeta)
badge: git                      # opcional → texto de la insignia si no hay icono, hasta 4 caracteres
order: 3                        # opcional → orden dentro de la categoría (default 100)
tags: [cli, github]             # opcional
updated: 2026-09-16             # opcional → "actualizado el…"
---
```

---

## 7. Navegación

| Pantalla | URL | Qué muestra |
| --- | --- | --- |
| **Landing** | `/` | Hero con prompt y cursor + **grilla de 3 tarjetas** (una por categoría, con sus archivos y cantidad) |
| **Categoría** | `/backend` | Prompt `ls backend/` + grilla de tarjetas, una por cheatsheet (insignia, título, descripción) |
| **Cheatsheet** | `/backend/git` | Ventana de terminal: **sidebar** a la izquierda, contenido al centro, **índice** a la derecha |
| **404** | cualquier otra | `bash: <ruta>: command not found` + link a inicio |

- **Sidebar:** se arma sola con `getCollection`. Muestra las 3 carpetas; la categoría actual
  abierta y el archivo actual resaltado con el color de la categoría. Usa `<details>` de HTML
  para abrir/cerrar carpetas **sin JavaScript**.
- **Índice ("en esta página"):** se arma con los `headings` que devuelve `render()`.
- **Título de la ventana:** refleja la ruta: `joaco://cheatsheets/backend/git.md`.
- **Mobile:** sidebar colapsable con un botón; índice arriba del contenido.

---

## 8. Cómo agregar un cheatsheet nuevo

1. Copiar `src/content/cheatsheets/_plantilla.md` a la carpeta de su categoría, sin el guion
   bajo, por ejemplo `src/content/cheatsheets/backend/express.md`.
2. Completar el frontmatter (`title` y `description` como mínimo).
3. Escribir el contenido usando `##` para secciones y `###` para subsecciones (el índice se
   genera solo; **no** escribir un "Índice" a mano).
4. (Opcional) Poner su logo en `src/assets/icons/express.png` (mismo nombre que el `.md`). Si no
   hay logo, se muestra una insignia de texto: `badge: exp`.
5. `npm run dev` y abrir `http://localhost:3000/backend/express`.
6. `git add` + `git commit -m "docs(backend): agrega cheatsheet de express"` + `git push`.

Para una categoría nueva: crear la carpeta, sumarla en `src/lib/categories.ts` y agregar su
color `--color-<id>` en `src/styles/global.css`.

---

## 9. Roadmap

- [x] **Fase 0 — Plan:** investigación, stack, estructura (este README).
- [x] **Fase 1 — Setup:** Astro 7 + TypeScript `strict` + Tailwind 4 + Prettier, estructura de
  carpetas, `CLAUDE.md` con `/init`.
- [x] **Fase 2 — Diseño base:** tokens de color y fuentes, fondo con gradientes, `BaseLayout`,
  `Header`, `TerminalWindow`, `Prompt`.
- [x] **Fase 3 — Pipeline de contenido:** `content.config.ts` con Zod, `lib/categories.ts`,
  ruta `[category]/[slug].astro`, `markdown.css`, tema de Shiki.
- [x] **Fase 4 — Navegación:** landing con tarjetas y árbol de archivos, página de categoría,
  `Sidebar`, `TableOfContents`, 404, responsive.
- [ ] **Fase 5 — Contenido:** escritos como guías extensas: `html.md`, `css.md`,
  `javascript.md`, `typescript.md`, `express.md`, `git.md` y `arduino.md` (plan en
  `src/content/plan.md`). Faltan: Node, MySQL, PHP, Next.js/React, sensores, I2C, UART.
- [ ] **Fase 6 — Deploy:** subir a GitHub y conectar con Vercel.
- [ ] **Fase 7 — Extras (cuando quiera):**
  - Botón "copiar" en los bloques de código.
  - Buscador (Pagefind: busca en el sitio estático sin servidor).
  - Terminal interactiva con comandos `help`, `ls`, `cd`, `open` (isla de React).
  - Atajos de teclado (`/` para buscar, `g h` para ir al inicio).
  - Exportar un cheatsheet a PDF / modo impresión.

---

## 10. Glosario para principiantes

| Término | Qué es |
| --- | --- |
| **Markdown (`.md`)** | Formato de texto simple: `#` es un título, `**x**` es negrita, tres backticks abren un bloque de código. Se convierte a HTML. |
| **Frontmatter** | El bloque entre `---` al principio de un `.md`, con datos (título, descripción) en formato YAML. |
| **Cheatsheet** | "Machete": resumen corto con lo que más se usa de una herramienta. |
| **Framework** | Conjunto de herramientas y reglas que te resuelve lo repetitivo (rutas, build, etc.). |
| **Astro** | Framework para sitios web centrados en contenido. Genera HTML estático y manda muy poco JavaScript al navegador. |
| **Next.js / React** | React es una librería para armar interfaces con componentes; Next.js es un framework encima de React. Lo usa la referencia. |
| **Componente** | Pedazo de interfaz reutilizable (ej. `CategoryCard`) que se usa como una etiqueta: `<CategoryCard />`. |
| **Sitio estático (SSG)** | Las páginas se generan **una vez** al compilar y quedan como archivos HTML. Rápido, barato y sin servidor. |
| **Build** | El proceso que transforma el código fuente en el sitio final (`npm run build` → carpeta `dist/`). |
| **TypeScript** | JavaScript con **tipos**: el editor te avisa errores (ej. usar un número donde va un texto) antes de ejecutar. |
| **Tailwind CSS** | CSS con clases chiquitas ya hechas (`p-4`, `text-pink-400`, `rounded-xl`) que combinás directo en el HTML. |
| **Content Collections** | Sistema de Astro para tratar una carpeta de `.md` como una "base de datos" tipada. |
| **Zod** | Librería para declarar la forma que deben tener los datos y validarlos. |
| **Shiki** | Colorea el código de los bloques usando los mismos temas que VS Code. |
| **`astro:assets` / `<Image>`** | Componente de Astro que optimiza imágenes al compilar: las achica al tamaño en que se muestran y las convierte a un formato liviano. |
| **`import.meta.glob`** | Función de Vite (la herramienta que usa Astro por debajo) que busca archivos con un patrón, por ejemplo `../assets/icons/*.png`, y los importa todos juntos. |
| **WebP** | Formato de imagen moderno que pesa bastante menos que PNG o JPG con la misma calidad. |
| **Slug** | La parte "amigable" de la URL que sale del nombre del archivo: `git.md` → `/backend/git`. |
| **Routing basado en archivos** | Cada archivo en `src/pages/` es una URL. `[slug]` entre corchetes es una ruta **dinámica**. |
| **Isla (island)** | Componente interactivo (ej. React) dentro de una página que es estática en todo lo demás. |
| **npm** | Gestor de paquetes de Node: instala librerías (`npm install`) y corre scripts (`npm run dev`). |
| **Vercel** | Servicio que publica tu sitio gratis y lo actualiza cada vez que hacés `git push`. |
| **Commit convencional** | Forma de escribir mensajes de commit con prefijo: `feat:`, `fix:`, `docs:`. Ordena el historial. |
| **`CLAUDE.md`** | Archivo con el contexto del proyecto (stack, convenciones) que Claude Code lee al empezar cada sesión. |
