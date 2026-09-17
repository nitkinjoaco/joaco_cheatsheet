---
title: CSS
description: Selectores, cascada, box model, Flexbox, Grid, responsive y animaciones.
badge: css
order: 2
tags: [web, estilos, layout, responsive]
updated: 2026-09-17
---

## ¿Qué es?

**CSS** (_Cascading Style Sheets_) define **cómo se ve** el HTML: colores, tamaños, espacios,
tipografías y la disposición de los elementos en la pantalla (_layout_).

### Anatomía de una regla

```css
selector {
  propiedad: valor;
  otra-propiedad: valor;
}

/* Ejemplo */
.boton {
  background-color: #f0508f;
  padding: 8px 16px;
}
```

- El **selector** elige a qué elementos se aplica.
- Cada **declaración** es `propiedad: valor;` (no te olvides del `;`).
- Los comentarios son `/* así */` (en CSS **no** existe `//`).

### Dónde se escribe

```html
<!-- 1. Archivo externo ⭐ (lo recomendado) -->
<link rel="stylesheet" href="styles.css" />

<!-- 2. En el <head> -->
<style>
  h1 { color: tomato; }
</style>

<!-- 3. En línea (solo casos puntuales) -->
<p style="color: tomato;">Texto</p>
```

## Selectores

```css
*            { }   /* todos los elementos */
p            { }   /* por etiqueta */
.tarjeta     { }   /* por clase */
#menu        { }   /* por id */
h1, h2       { }   /* varios selectores: coma */

nav a        { }   /* descendiente: <a> en cualquier nivel dentro de <nav> */
ul > li      { }   /* hijo directo */
h2 + p       { }   /* el <p> justo después de un <h2> */
h2 ~ p       { }   /* todos los <p> hermanos después de un <h2> */

.btn.grande  { }   /* elemento con LAS DOS clases (sin espacio) */
a[target="_blank"] { }  /* por atributo */
input[type="email"] { }
```

### Pseudoclases (estados)

```css
a:hover          { }   /* mouse encima */
button:active    { }   /* mientras se aprieta */
input:focus      { }   /* enfocado */
:focus-visible   { }   /* enfocado con teclado (mejor para el anillo de foco) */
input:checked    { }
input:disabled   { }
input:invalid    { }   /* no cumple required, type, pattern… */

li:first-child   { }
li:last-child    { }
li:nth-child(2)  { }   /* el segundo */
li:nth-child(odd) { }  /* impares (even: pares) */
li:not(.activo)  { }   /* los que NO tienen la clase */
.tarjeta:has(img) { }  /* la tarjeta que CONTIENE una imagen */
```

### Pseudoelementos

```css
p::first-line   { }
input::placeholder { color: gray; }
::selection     { background: hotpink; }   /* texto seleccionado */

.requerido::after {        /* agrega contenido al final del elemento */
  content: " *";
  color: red;
}
```

`::before` y `::after` **necesitan** `content` (aunque sea `content: ""`) para aparecer.

## Cascada, especificidad y herencia

Cuando varias reglas le dan un valor distinto a la misma propiedad, CSS decide así:

1. **Importancia:** `!important` gana (evitalo: complica todo después).
2. **Especificidad:** gana el selector más específico.
3. **Orden:** si empatan, gana la regla que está **más abajo**.

### Especificidad

Se cuenta como tres números `(ids, clases, etiquetas)` y se compara de izquierda a derecha.

| Selector                   | Especificidad | Explicación                          |
| -------------------------- | ------------- | ------------------------------------ |
| `p`                        | `0,0,1`       | 1 etiqueta                           |
| `.texto`                   | `0,1,0`       | 1 clase                              |
| `p.texto`                  | `0,1,1`       | 1 clase + 1 etiqueta                 |
| `nav ul li a:hover`        | `0,1,4`       | `:hover` cuenta como clase           |
| `#menu`                    | `1,0,0`       | Un id le gana a cualquier cantidad de clases |
| `style="…"`                | Le gana a todo lo anterior |                          |

> **Tip:** estilá casi todo con **clases**. Así la especificidad queda pareja y el orden del
> archivo es lo que decide.

### Herencia

Algunas propiedades pasan de padre a hijos solas: las de **texto** (`color`, `font-family`,
`font-size`, `line-height`, `text-align`). Las de **caja** (`margin`, `padding`, `border`,
`background`, `width`) no se heredan.

```css
body {
  font-family: system-ui, sans-serif;   /* lo heredan todos */
  color: #222;
}

button, input {
  font: inherit;                         /* los formularios no heredan la fuente: forzalo */
}
```

## Unidades y colores

| Unidad    | Relativa a…                                  | Usala para                            |
| --------- | -------------------------------------------- | ------------------------------------- |
| `px`      | Nada (fija)                                  | Bordes, sombras                       |
| `rem`     | Tamaño de letra del `<html>` (16px por defecto) | ⭐ Tamaños de letra, espacios      |
| `em`      | Tamaño de letra del propio elemento          | Espacios que crecen con el texto (padding de un botón) |
| `%`       | El tamaño del padre                          | Anchos                                |
| `vw` / `vh` | 1 % del ancho / alto de la ventana         | Secciones de pantalla completa        |
| `dvh`     | Alto real visible (en celular descuenta la barra del navegador) | `min-height: 100dvh` |
| `fr`      | Fracción del espacio libre (solo en Grid)    | Columnas                              |
| `ch`      | Ancho del carácter "0"                       | Largo de línea: `max-width: 65ch`     |

```css
color: tomato;                     /* nombre */
color: #f0508f;                    /* hexadecimal */
color: #f0508f80;                  /* con transparencia (80 = 50 %) */
color: rgb(240 80 143);
color: rgb(240 80 143 / 50%);      /* con transparencia */
color: hsl(335 84% 63%);           /* tono, saturación, luminosidad */
background: transparent;
color: currentColor;               /* el mismo color del texto */
```

### Funciones útiles

```css
width: calc(100% - 2rem);
width: min(100%, 60rem);           /* el menor: nunca más de 60rem */
font-size: clamp(1.5rem, 4vw, 3rem);   /* crece con la pantalla, entre un mínimo y un máximo */
```

## Box model

**Todo** elemento es una caja con cuatro capas:

```text
┌────────────────── margin (espacio AFUERA, transparente) ──────────────────┐
│  ┌─────────────── border (el borde) ───────────────────────────────────┐  │
│  │  ┌──────────── padding (espacio ADENTRO, toma el fondo) ─────────┐  │  │
│  │  │                                                               │  │  │
│  │  │                   content (width × height)                    │  │  │
│  │  │                                                               │  │  │
│  │  └───────────────────────────────────────────────────────────────┘  │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────────────────────┘
```

```css
.caja {
  width: 300px;
  padding: 16px;                 /* los 4 lados */
  padding: 8px 16px;             /* arriba/abajo  izquierda/derecha */
  padding: 8px 16px 4px 0;       /* arriba derecha abajo izquierda (sentido del reloj) */
  padding-inline: 16px;          /* izquierda y derecha */
  padding-block: 8px;            /* arriba y abajo */
  border: 2px solid #3d3848;     /* grosor estilo color */
  border-radius: 12px;
  margin: 0 auto;                /* centra horizontalmente un bloque con ancho */
}
```

### `box-sizing: border-box`

Por defecto, `width` es solo el contenido: una caja de `width: 300px` con `padding: 16px` y
borde de 2px mide **336px**. Con `border-box`, `width` incluye padding y borde: mide **300px**.

```css
*, *::before, *::after {
  box-sizing: border-box;        /* ponelo siempre al principio */
}
```

### Colapso de márgenes

Entre dos bloques uno arriba del otro, los márgenes verticales **no se suman**: queda el más
grande. `margin-bottom: 20px` + `margin-top: 30px` = **30px** de separación. No pasa en Flexbox
ni Grid (por eso ahí se usa `gap`).

## Texto y fondos

```css
.texto {
  font-family: "Inter", system-ui, sans-serif;  /* si no está la primera, usa la siguiente */
  font-size: 1rem;
  font-weight: 700;              /* 400 normal, 700 negrita */
  font-style: italic;
  line-height: 1.6;              /* sin unidad: proporcional al tamaño de letra */
  letter-spacing: 0.05em;
  text-align: center;            /* left, right, justify */
  text-transform: uppercase;
  text-decoration: none;         /* saca el subrayado de los links */
  white-space: nowrap;           /* no corta la línea */
}

.recortado {                     /* texto largo con "…" */
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.hero {
  background-color: #0f0a1a;
  background-image: url("../img/fondo.jpg");    /* la ruta es relativa al archivo CSS */
  background-size: cover;        /* cubre todo, recortando si hace falta */
  background-position: center;
  background-repeat: no-repeat;
}

.degradado {
  background: linear-gradient(135deg, #f06be0, #f5a524);   /* un degradado es una imagen */
}

.tarjeta {
  box-shadow: 0 4px 12px rgb(0 0 0 / 0.3);   /* x y desenfoque color */
  opacity: 0.9;
}
```

### Fuentes de Google Fonts

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet" />
```

```css
body { font-family: "Inter", sans-serif; }
```

## `display`

| Valor          | Comportamiento                                                        |
| -------------- | --------------------------------------------------------------------- |
| `block`        | Ocupa todo el ancho, empieza en línea nueva, respeta `width`/`height` |
| `inline`       | Fluye con el texto, **ignora** `width`, `height` y márgenes verticales |
| `inline-block` | Fluye con el texto, pero respeta `width`, `height` y márgenes        |
| `flex`         | Sus hijos se acomodan con Flexbox                                     |
| `grid`         | Sus hijos se acomodan con Grid                                        |
| `none`         | No se muestra ni ocupa lugar                                          |

`visibility: hidden` también oculta, pero **sigue ocupando** su lugar.

## `position`

| Valor       | Se mueve respecto a…                                   | ¿Deja su lugar?  |
| ----------- | ------------------------------------------------------ | ---------------- |
| `static`    | No se mueve (valor por defecto)                        | —                |
| `relative`  | Su posición normal                                     | Sí               |
| `absolute`  | El ancestro más cercano con `position` distinto de `static` | No          |
| `fixed`     | La ventana: queda fijo al scrollear                    | No               |
| `sticky`    | Normal hasta que llega a `top`, ahí se "pega"          | Sí               |

```css
.tarjeta {
  position: relative;          /* referencia para el hijo absoluto */
}

.tarjeta .etiqueta {
  position: absolute;
  top: 8px;
  right: 8px;                  /* esquina superior derecha de .tarjeta */
}

header {
  position: sticky;
  top: 0;
  z-index: 10;                 /* por encima del resto */
}

.overlay {
  position: fixed;
  inset: 0;                    /* = top, right, bottom y left en 0: cubre toda la pantalla */
}
```

`z-index` decide qué queda encima, pero **solo funciona en elementos con `position`** (o hijos
de flex/grid).

## Flexbox

Acomoda elementos **en una dirección** (fila o columna). Se aplica al **contenedor**.

```css
.contenedor {
  display: flex;
  flex-direction: row;           /* row (→) | column (↓) */
  justify-content: space-between; /* reparto en el eje principal */
  align-items: center;           /* alineación en el eje cruzado */
  gap: 16px;                     /* espacio entre elementos */
  flex-wrap: wrap;               /* si no entran, bajan a otra línea */
}
```

```text
flex-direction: row
eje principal ─────────────────────►  (justify-content)
│  ┌───┐ ┌───┐ ┌───┐
│  │ 1 │ │ 2 │ │ 3 │
▼  └───┘ └───┘ └───┘
eje cruzado (align-items)
```

Con `flex-direction: column` los ejes se **intercambian**: `justify-content` pasa a ser
vertical.

| `justify-content` | Resultado              |
| ----------------- | ---------------------- |
| `flex-start`      | `[123      ]`          |
| `center`          | `[   123   ]`          |
| `flex-end`        | `[      123]`          |
| `space-between`   | `[1    2    3]`        |
| `space-around`    | `[ 1  2  3 ]` (medio espacio en los bordes) |
| `space-evenly`    | `[  1  2  3  ]` (todo igual) |

| `align-items` | Resultado                                     |
| ------------- | --------------------------------------------- |
| `stretch`     | Todos estirados a la misma altura (por defecto) |
| `flex-start`  | Arriba                                        |
| `center`      | Centrados                                     |
| `flex-end`    | Abajo                                         |
| `baseline`    | Alineados por la línea del texto              |

### Propiedades de los hijos

```css
.item {
  flex: 1;                /* crece para repartir el espacio libre en partes iguales */
  flex: 0 0 200px;        /* no crece, no se achica, mide 200px */
  align-self: flex-end;   /* alineación propia */
  order: -1;              /* cambia el orden visual (no el del HTML) */
  min-width: 0;           /* deja que se achique debajo del largo de su contenido */
}
```

### Recetas

```css
/* Centrar cualquier cosa */
.centrar {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100dvh;
}

/* Barra de navegación: logo a la izquierda, links a la derecha */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Footer siempre abajo aunque haya poco contenido */
body {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
}
main {
  flex: 1;
}

/* Input que ocupa todo + botón al lado */
.buscador { display: flex; gap: 8px; }
.buscador input { flex: 1; }
```

## Grid

Acomoda elementos **en dos dimensiones** (filas y columnas). También se aplica al contenedor.

```css
.grilla {
  display: grid;
  grid-template-columns: 200px 1fr 1fr;    /* 3 columnas: fija + dos que reparten */
  grid-template-rows: auto 1fr auto;
  gap: 16px;                                /* o row-gap / column-gap */
}
```

```css
grid-template-columns: repeat(3, 1fr);                       /* 3 columnas iguales */
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); /* ⭐ responsive sin media queries */
```

La última línea significa: "poné **tantas columnas como entren**, de al menos 250px cada una, y
estiralas para llenar". En el celular queda 1 columna; en la compu, 3 o 4.

### Ubicar elementos

```css
.destacado {
  grid-column: 1 / 3;          /* desde la línea 1 hasta la 3: ocupa 2 columnas */
  grid-column: span 2;         /* lo mismo, sin importar dónde empieza */
  grid-row: 1 / -1;            /* de la primera a la última línea */
}
```

```text
línea: 1       2       3       4
       │ col 1 │ col 2 │ col 3 │
```

### Layout con áreas con nombre

```css
.pagina {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header  header"
    "sidebar main"
    "footer  footer";
  min-height: 100dvh;
}

header  { grid-area: header; }
aside   { grid-area: sidebar; }
main    { grid-area: main; }
footer  { grid-area: footer; }
```

### Centrar con Grid

```css
.centrar {
  display: grid;
  place-items: center;
}
```

### ¿Flexbox o Grid?

| Situación                                               | Usá       |
| ------------------------------------------------------- | --------- |
| Elementos en **una fila o una columna** (navbar, botones) | Flexbox |
| El tamaño lo decide el **contenido**                    | Flexbox   |
| **Filas y columnas** a la vez (galería, layout de página) | Grid    |
| Querés que todo **se alinee** en columnas prolijas      | Grid      |

Se combinan: una grilla de tarjetas (Grid) donde cada tarjeta ordena su contenido con Flexbox.

## Responsive

Que la página se adapte a cualquier pantalla.

1. `<meta name="viewport" content="width=device-width, initial-scale=1" />` en el HTML.
2. Anchos flexibles (`%`, `fr`, `max-width`) en vez de fijos.
3. Media queries para los cambios grandes.

### Media queries y mobile first

**Mobile first:** escribís los estilos para celular y **agregás** cambios para pantallas más
grandes con `min-width`.

```css
.tarjetas {
  display: grid;
  gap: 1rem;                   /* celular: 1 columna */
}

@media (min-width: 640px) {    /* tablet en adelante */
  .tarjetas { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1024px) {   /* compu */
  .tarjetas { grid-template-columns: repeat(3, 1fr); }
}
```

| Ancho aprox. | Dispositivo  |
| ------------ | ------------ |
| < 640px      | Celular      |
| 640–1024px   | Tablet       |
| > 1024px     | Compu        |

Otras consultas útiles:

```css
@media (hover: hover) { }                      /* dispositivos con mouse */
@media (prefers-reduced-motion: reduce) { }    /* el usuario pidió menos animaciones */
@media (prefers-color-scheme: dark) { }        /* el sistema está en modo oscuro */
```

### Imágenes fluidas

```css
img {
  max-width: 100%;             /* nunca más ancha que su contenedor */
  height: auto;                /* mantiene la proporción */
  display: block;              /* saca el espacio fantasma de abajo */
}

.miniatura {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;           /* recorta sin deformar */
}
```

## Variables (custom properties)

```css
:root {
  --color-fondo: #0f0a1a;
  --color-acento: #f0508f;
  --radio: 12px;
  --espacio: 1rem;
}

.boton {
  background: var(--color-acento);
  border-radius: var(--radio);
  padding: var(--espacio);
  color: var(--color-texto, white);   /* valor por defecto si la variable no existe */
}

.boton.secundario {
  --color-acento: #a6e22e;             /* se pueden cambiar para un elemento y sus hijos */
}
```

Desde JS: `elemento.style.setProperty("--color-acento", "red")`.

## Transiciones y animaciones

### Transiciones: animar un cambio de estado

```css
.boton {
  background: #f0508f;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.boton:hover {
  background: #d63d7a;
  transform: translateY(-2px);
}
```

### `transform`

```css
transform: translate(10px, 20px);   /* mover (no afecta a los demás elementos) */
transform: scale(1.1);              /* agrandar */
transform: rotate(45deg);
transform: translate(-50%, -50%);   /* clásico para centrar un absolute */
```

### Animaciones con `@keyframes`

```css
@keyframes aparecer {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}

.tarjeta {
  animation: aparecer 0.4s ease-out;
}

@keyframes parpadeo {
  50% { opacity: 0; }
}

.cursor {
  animation: parpadeo 1s steps(1) infinite;
}

@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}
```

> **Tip:** animá preferentemente `transform` y `opacity`: son las propiedades que el navegador
> mueve más fluido.

## Anidamiento

El CSS moderno permite escribir reglas adentro de otras (como en Sass):

```css
.tarjeta {
  padding: 1rem;

  & h3 {                 /* = .tarjeta h3 */
    margin: 0;
  }

  &:hover {              /* = .tarjeta:hover */
    border-color: var(--color-acento);
  }

  @media (min-width: 640px) {
    padding: 2rem;
  }
}
```

## Reset mínimo

Los navegadores traen estilos propios que cambian entre sí. Un punto de partida:

```css
*, *::before, *::after {
  box-sizing: border-box;
}

* {
  margin: 0;
}

body {
  min-height: 100dvh;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}

input, button, textarea, select {
  font: inherit;
}

p, h1, h2, h3 {
  overflow-wrap: break-word;
}
```

## Errores comunes

#### Mi estilo no se aplica

En orden: ¿el `<link>` apunta bien al archivo (_DevTools → Network_)? ¿El selector está bien
escrito (`.clase` con punto, `#id` con numeral)? ¿Otra regla más específica lo pisa? En
_DevTools → Elements → Styles_ las reglas pisadas aparecen **tachadas**.

#### Hay scroll horizontal en el celular

Algo es más ancho que la pantalla: un `width` fijo, una imagen sin `max-width: 100%`, o
`100vw` (incluye la barra de scroll). Para encontrarlo, temporalmente:
`* { outline: 1px solid red; }`.

#### `height: 100%` no hace nada

El porcentaje es del alto del **padre**, y el padre no tiene alto definido. Usá
`min-height: 100dvh` o Flexbox/Grid.

#### `z-index` no funciona

El elemento no tiene `position` (distinto de `static`), o está dentro de un padre que crea su
propio "contexto" (por ejemplo, con `transform` u `opacity` menor a 1) y compite solo adentro.

#### `margin-top` en un hijo mueve al padre

Colapso de márgenes con el padre. Dale `padding` al padre o hacelo `display: flex` / `grid`.

#### El `width` de un `<span>` o `<a>` no cambia nada

Son elementos `inline`. Usá `display: inline-block` o `block`.

#### `position: sticky` no se pega

Falta `top: 0`, o algún ancestro tiene `overflow: hidden` / `auto`.

#### Hay un espacio de unos píxeles debajo de las imágenes

Las imágenes son `inline` y dejan lugar para las letras que bajan (g, p). `display: block`.

## Preguntas frecuentes

#### ¿Cómo centro un div?

Horizontal con ancho: `margin: 0 auto`. En las dos direcciones: en el **padre**,
`display: grid; place-items: center;` o `display: flex; justify-content: center; align-items: center;`.

#### ¿Clases o ids para estilar?

Clases. Los ids tienen especificidad muy alta y no se pueden reutilizar.

#### ¿`px` o `rem`?

`rem` para tamaños de letra y espacios: respeta el tamaño de letra que eligió el usuario en su
navegador. `px` para detalles finos como bordes.

#### ¿`margin` o `padding`?

`padding` es espacio **adentro** (toma el color de fondo y agranda el área clickeable).
`margin` es espacio **afuera**, entre elementos. Para separar hijos de un flex/grid, mejor `gap`.

#### ¿Cómo nombro las clases?

Que describan **qué es**, no cómo se ve: `.alerta-error` mejor que `.texto-rojo`. Una
convención popular es **BEM**: `.tarjeta`, `.tarjeta__titulo`, `.tarjeta--destacada`.

#### ¿Y Tailwind?

Es una forma distinta de escribir CSS: clases chiquitas ya hechas (`flex`, `p-4`,
`text-pink-400`) directo en el HTML. Conviene entender CSS primero, porque cada clase de
Tailwind es una propiedad de CSS.

## Fuentes

- [MDN: CSS (en español)](https://developer.mozilla.org/es/docs/Web/CSS)
- [web.dev: Learn CSS](https://web.dev/learn/css)
- [CSS-Tricks: A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [CSS-Tricks: A Complete Guide to CSS Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Flexbox Froggy (juego para practicar)](https://flexboxfroggy.com/#es)
- [Grid Garden (juego para practicar)](https://cssgridgarden.com/#es)
- [Can I use: ver qué soporta cada navegador](https://caniuse.com/)
