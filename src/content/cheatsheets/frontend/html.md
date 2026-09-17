---
title: HTML
description: La estructura de una página web, etiqueta por etiqueta, con formularios y accesibilidad.
badge: </>
order: 1
tags: [web, básico, formularios, accesibilidad]
updated: 2026-09-17
---

## ¿Qué es?

**HTML** (_HyperText Markup Language_) describe **qué es** cada parte de una página: un título,
un párrafo, un link, un formulario. No es un lenguaje de programación (no tiene variables ni
condiciones): es un lenguaje de **marcado**.

Una página web se arma con tres capas:

| Capa           | Responde a…             | Ejemplo                          |
| -------------- | ----------------------- | -------------------------------- |
| **HTML**       | ¿Qué hay?               | "Esto es un botón"               |
| **CSS**        | ¿Cómo se ve?            | "El botón es rosa y redondeado"  |
| **JavaScript** | ¿Qué hace?              | "Al hacer clic, manda el form"   |

> **Tip:** elegí cada etiqueta por lo que **significa**, no por cómo se ve. Si querés un texto
> grande que no es un título, usá un `<p>` y agrandalo con CSS.

## Anatomía de una etiqueta

```text
  etiqueta de apertura        contenido        etiqueta de cierre
 ┌─────────────────────────┐ ┌─────────────┐ ┌──────┐
 <a href="/contacto" class="btn">Escribime</a>
    └──┬─┘ └────┬───┘
   atributo    valor
```

- Un **elemento** es todo junto: apertura + contenido + cierre.
- Los **atributos** van en la apertura y dan información extra: `nombre="valor"`.
- Algunos elementos son **vacíos** (no tienen contenido ni cierre): `<img />`, `<br />`,
  `<hr />`, `<input />`, `<meta />`, `<link />`. La barra final `/>` es opcional.
- Los elementos se **anidan** como cajas: el que se abrió último se cierra primero.

```html
<!-- ✅ bien -->
<p>Texto <strong>importante</strong></p>

<!-- ❌ mal: se cruzan -->
<p>Texto <strong>importante</p></strong>
```

Los comentarios se escriben `<!-- así -->` y no se ven en la página (sí en el código fuente).

## Estructura base

```html
<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="Resumen de la página para Google." />
    <title>Mi página</title>
    <link rel="icon" href="/favicon.svg" />
    <link rel="stylesheet" href="styles.css" />
    <script src="app.js" defer></script>
  </head>
  <body>
    <h1>Hola mundo</h1>
  </body>
</html>
```

| Línea                         | Para qué sirve                                                                 |
| ----------------------------- | ------------------------------------------------------------------------------ |
| `<!doctype html>`             | Le dice al navegador que es HTML moderno. Siempre va primero.                  |
| `<html lang="es">`            | Idioma de la página: lo usan los lectores de pantalla y el traductor.          |
| `<head>`                      | Información **sobre** la página. Nada de acá se ve adentro de la ventana.      |
| `<meta charset="utf-8">`      | Codificación: sin esto, las tildes y la ñ pueden verse como `Ã±`.              |
| `<meta name="viewport" …>`    | Hace que en el celular la página use el ancho real de la pantalla (responsive). |
| `<meta name="description" …>` | El texto que aparece debajo del título en Google.                              |
| `<title>`                     | Texto de la pestaña y del resultado de búsqueda.                               |
| `<link rel="icon">`           | El iconito de la pestaña (favicon).                                            |
| `<link rel="stylesheet">`     | Conecta un archivo CSS.                                                        |
| `<body>`                      | Todo lo que **se ve**.                                                         |

> **Tip:** en VS Code escribí `!` y apretá <kbd>Tab</kbd> para generar esta estructura.

## Texto

```html
<h1>Título principal (uno por página)</h1>
<h2>Sección</h2>
<h3>Subsección</h3>

<p>Un párrafo con <strong>algo importante</strong> y <em>algo enfatizado</em>.</p>
<p>Otro párrafo.<br />Con un salto de línea adentro.</p>

<hr />

<blockquote>Una cita larga de otra persona.</blockquote>
<p>Usá <code>console.log()</code> para debuggear. Apretá <kbd>Ctrl</kbd> + <kbd>S</kbd>.</p>
<pre>Texto    preformateado:
  respeta espacios y saltos</pre>
```

| Etiqueta                 | Significa                                                     |
| ------------------------ | ------------------------------------------------------------- |
| `<h1>` … `<h6>`          | Títulos por nivel de importancia. No saltees niveles.         |
| `<p>`                    | Párrafo.                                                      |
| `<strong>` / `<b>`       | Importante / solo negrita visual. Preferí `<strong>`.         |
| `<em>` / `<i>`           | Énfasis / solo cursiva visual. Preferí `<em>`.                |
| `<br />`                 | Salto de línea **dentro** de un texto (una dirección, un poema). |
| `<hr />`                 | Cambio de tema.                                               |
| `<code>`, `<kbd>`, `<pre>` | Código, tecla, texto con espacios respetados.               |
| `<small>`, `<mark>`      | Letra chica (aclaraciones legales), texto resaltado.          |

### Espacios y caracteres especiales

HTML **junta los espacios**: diez espacios o un Enter se ven como un solo espacio. Para separar
cosas usá CSS (`margin`), no muchos `<br />` ni `&nbsp;`.

| Escribís | Se ve | Cuándo                                        |
| -------- | ----- | --------------------------------------------- |
| `&lt;`   | `<`   | Mostrar una etiqueta como texto               |
| `&gt;`   | `>`   | Ídem                                          |
| `&amp;`  | `&`   | Un `&` suelto                                 |
| `&nbsp;` | (espacio) | Espacio que no corta línea (`10&nbsp;km`) |
| `&copy;` | `©`   | Pie de página                                 |

## Links y rutas

```html
<a href="https://developer.mozilla.org">Link externo</a>
<a href="contacto.html">Página en la misma carpeta</a>
<a href="#formulario">Salta al elemento con id="formulario"</a>
<a href="mailto:hola@ejemplo.com">Mandar un mail</a>
<a href="tel:+5491112345678">Llamar</a>
<a href="cv.pdf" download>Descargar CV</a>
<a href="https://ejemplo.com" target="_blank" rel="noopener noreferrer">Nueva pestaña</a>
```

### Rutas relativas y absolutas

Supongamos esta estructura:

```text
mi-sitio/
├─ index.html
├─ img/
│  └─ logo.png
└─ blog/
   └─ post.html
```

| Desde `blog/post.html` quiero… | Ruta                  | Tipo                                         |
| ------------------------------ | --------------------- | -------------------------------------------- |
| `logo.png`                     | `../img/logo.png`     | Relativa: `..` sube una carpeta              |
| `index.html`                   | `../index.html`       | Relativa                                     |
| `logo.png`                     | `/img/logo.png`       | Relativa a la **raíz del sitio** (empieza con `/`) |
| Otra web                       | `https://…`           | Absoluta                                     |

> **Ojo:** las rutas que empiezan con `/` necesitan un servidor (Live Server, Vite, etc.). Si
> abrís el `.html` con doble clic, `/` apunta a la raíz del **disco** y la imagen no aparece.

## Imágenes y multimedia

```html
<img src="img/perro.jpg" alt="Un perro marrón corriendo en la playa" width="600" height="400" />

<!-- Imagen con epígrafe -->
<figure>
  <img src="img/grafico.png" alt="Ventas por mes: suben de enero a junio" />
  <figcaption>Ventas del primer semestre.</figcaption>
</figure>

<!-- Imagen que se carga recién cuando está por aparecer en pantalla -->
<img src="img/foto-grande.jpg" alt="…" loading="lazy" />

<video src="video.mp4" controls width="640" poster="miniatura.jpg"></video>
<audio src="tema.mp3" controls></audio>

<iframe
  src="https://www.youtube.com/embed/ID_DEL_VIDEO"
  title="Nombre del video"
  width="560"
  height="315"
  allowfullscreen
></iframe>
```

- `alt` describe la imagen para quien no la ve (lector de pantalla, imagen rota, Google).
- Poner `width` y `height` evita que la página "salte" cuando la imagen termina de cargar.
- Formatos: **JPG/WebP/AVIF** para fotos, **PNG** para capturas con texto o transparencia,
  **SVG** para logos e íconos (escala sin pixelarse).

## Listas

```html
<ul>
  <li>Lista sin orden (viñetas)</li>
  <li>
    Un ítem con una sublista
    <ul>
      <li>La sublista va <strong>adentro</strong> del <code>&lt;li&gt;</code></li>
    </ul>
  </li>
</ul>

<ol start="3">
  <li>Lista numerada que empieza en 3</li>
</ol>

<dl>
  <dt>HTML</dt>
  <dd>Lenguaje de marcado.</dd>
</dl>
```

Un menú de navegación también es una lista: `<nav><ul><li><a>…</a></li></ul></nav>`.

## Contenedores, `id` y `class`

### Bloque vs en línea

| Tipo          | Comportamiento                                    | Ejemplos                                 |
| ------------- | ------------------------------------------------- | ---------------------------------------- |
| **Bloque**    | Ocupa todo el ancho y empieza en una línea nueva. | `div`, `p`, `h1`, `ul`, `section`, `form` |
| **En línea**  | Ocupa solo lo que mide su contenido.              | `span`, `a`, `strong`, `em`, `img`, `code` |

`<div>` y `<span>` son **genéricos**: no significan nada. Se usan solo para agrupar y aplicar
estilos cuando ninguna etiqueta semántica encaja.

```html
<div class="tarjeta">
  <p>Precio: <span class="precio">$1500</span></p>
</div>
```

### `id` vs `class`

|                   | `id`                                  | `class`                                   |
| ----------------- | ------------------------------------- | ----------------------------------------- |
| ¿Cuántas veces?   | **Único** en toda la página           | Se repite en todos los elementos que quieras |
| ¿Varios valores?  | No                                    | Sí: `class="btn btn-grande"`              |
| En CSS            | `#menu { }`                           | `.btn { }`                                |
| Usos típicos      | Anclas (`href="#menu"`), `label for`, JS | Estilos                                |

## Etiquetas semánticas

Dicen **qué rol** cumple cada bloque. Ayudan a buscadores, a lectores de pantalla y a vos cuando
leés el código.

| Etiqueta    | Para qué                                                    |
| ----------- | ----------------------------------------------------------- |
| `<header>`  | Encabezado de la página o de una sección (logo, título)     |
| `<nav>`     | Grupo de links de navegación principal                      |
| `<main>`    | Contenido principal. **Uno** por página                     |
| `<section>` | Sección temática, normalmente con su propio título          |
| `<article>` | Algo que tiene sentido solo: un post, una tarjeta de producto |
| `<aside>`   | Contenido secundario (sidebar, "también te puede interesar") |
| `<footer>`  | Pie de la página o de un artículo                           |

### Esqueleto típico

```html
<body>
  <header>
    <a href="/"><img src="logo.svg" alt="Inicio" /></a>
    <nav>
      <ul>
        <li><a href="/">Inicio</a></li>
        <li><a href="/proyectos">Proyectos</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <h1>Mis proyectos</h1>
    <section>
      <h2>Destacados</h2>
      <article>
        <h3>Cheatsheets</h3>
        <p>Machetes de programación.</p>
      </article>
    </section>
  </main>

  <footer>
    <p>&copy; 2026 Joaco</p>
  </footer>
</body>
```

### ¿`section`, `article` o `div`?

- ¿Tendría sentido copiarlo solo en otra página (un post, un comentario)? → `<article>`.
- ¿Es una parte con título de algo más grande? → `<section>`.
- ¿Lo agrupás solo para darle estilo? → `<div>`.

## Formularios

```html
<form action="/registro" method="post">
  <fieldset>
    <legend>Tus datos</legend>

    <label for="nombre">Nombre</label>
    <input id="nombre" name="nombre" type="text" required autocomplete="name" />

    <label for="email">Email</label>
    <input id="email" name="email" type="email" required placeholder="vos@ejemplo.com" />

    <label for="pass">Contraseña</label>
    <input id="pass" name="password" type="password" minlength="8" required />

    <label for="edad">Edad</label>
    <input id="edad" name="edad" type="number" min="13" max="120" />
  </fieldset>

  <fieldset>
    <legend>Nivel</legend>
    <!-- Los radio con el MISMO name son un grupo: solo uno puede estar marcado -->
    <label><input type="radio" name="nivel" value="principiante" checked /> Principiante</label>
    <label><input type="radio" name="nivel" value="intermedio" /> Intermedio</label>
  </fieldset>

  <label for="rol">Rol</label>
  <select id="rol" name="rol">
    <option value="">Elegí uno</option>
    <option value="alumno">Alumno</option>
    <option value="profe">Profe</option>
  </select>

  <label for="mensaje">Mensaje</label>
  <textarea id="mensaje" name="mensaje" rows="4"></textarea>

  <label><input type="checkbox" name="acepto" required /> Acepto los términos</label>

  <button type="submit">Registrarme</button>
  <button type="reset">Borrar</button>
</form>
```

### Lo que hay que entender

- **`name`** es la clave con la que viaja el dato. Sin `name`, el campo **no se envía**.
- **`value`** es lo que se manda. En `radio`, `checkbox` y `option` lo definís vos.
- **`action`** es a dónde se manda; **`method`** es cómo:

| `method` | Los datos van…                           | Usalo para                          |
| -------- | ---------------------------------------- | ----------------------------------- |
| `get`    | En la URL: `/buscar?q=perros&page=2`     | Búsquedas y filtros (se puede compartir el link) |
| `post`   | En el cuerpo del pedido (no se ven en la URL) | Crear cosas, login, datos sensibles |

- `<label for="x">` se conecta con el `id="x"` del input: hacer clic en el texto enfoca el
  campo. Otra forma es envolver: `<label><input /> Texto</label>`.
- `placeholder` **no reemplaza** a `label`: desaparece al escribir y muchos lectores de pantalla
  no lo leen.

### Tipos de `input`

| `type`                 | Qué muestra                                         |
| ---------------------- | --------------------------------------------------- |
| `text`                 | Texto común                                         |
| `email`, `url`, `tel`  | Texto validado; en el celular muestra el teclado adecuado |
| `password`             | Oculta lo que escribís                              |
| `number`               | Números, con `min`, `max` y `step`                  |
| `date`, `time`, `datetime-local` | Selector de fecha / hora                  |
| `checkbox`             | Casilla de sí/no                                    |
| `radio`                | Una opción de un grupo                              |
| `range`                | Barra deslizable                                    |
| `color`                | Selector de color                                   |
| `file`                 | Subir archivos (`accept="image/*"`, `multiple`)     |
| `search`               | Campo de búsqueda                                   |
| `hidden`               | No se ve, pero se envía                             |

### Validación sin JavaScript

| Atributo            | Qué exige                                              |
| ------------------- | ------------------------------------------------------ |
| `required`          | Que no esté vacío                                      |
| `minlength` / `maxlength` | Largo del texto                                  |
| `min` / `max` / `step` | Rango de números y fechas                           |
| `pattern="[0-9]{4}"` | Que coincida con una expresión regular (acá: 4 dígitos) |
| `type="email"`      | Que tenga forma de email                               |
| `disabled`          | Campo bloqueado **y no se envía**                      |
| `readonly`          | No se puede editar, pero **sí se envía**               |

> **Ojo:** la validación del navegador es para ayudar al usuario. El servidor **siempre** tiene
> que volver a validar, porque cualquiera puede saltearla.

### Tipos de `button`

| `type`   | Hace                                                         |
| -------- | ------------------------------------------------------------ |
| `submit` | Envía el formulario. **Es el valor por defecto** dentro de un `<form>`. |
| `button` | Nada: para acciones con JavaScript                           |
| `reset`  | Vuelve los campos a su valor inicial                         |

## Tablas

Solo para **datos en filas y columnas** (horarios, precios). Nunca para maquetar la página.

```html
<table>
  <caption>Notas del trimestre</caption>
  <thead>
    <tr>
      <th scope="col">Alumno</th>
      <th scope="col">Matemática</th>
      <th scope="col">Programación</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Ana</th>
      <td>8</td>
      <td>10</td>
    </tr>
    <tr>
      <th scope="row">Juan</th>
      <td colspan="2">Ausente</td> <!-- ocupa 2 columnas -->
    </tr>
  </tbody>
</table>
```

| Etiqueta               | Qué es                                          |
| ---------------------- | ----------------------------------------------- |
| `<tr>`                 | Fila (_table row_)                              |
| `<th>`                 | Celda de encabezado (`scope` dice si es de columna o de fila) |
| `<td>`                 | Celda de datos                                  |
| `<thead>`, `<tbody>`, `<tfoot>` | Agrupan filas                          |
| `colspan` / `rowspan`  | Celda que ocupa varias columnas / filas         |

## CSS y JavaScript en el HTML

```html
<head>
  <!-- CSS: siempre en el head, para que la página no aparezca sin estilos -->
  <link rel="stylesheet" href="styles.css" />

  <!-- JS con defer: se descarga en paralelo y se ejecuta cuando el HTML ya está armado -->
  <script src="app.js" defer></script>

  <!-- JS como módulo (permite import/export). Los módulos ya se comportan como defer -->
  <script type="module" src="main.js"></script>
</head>
```

| Dónde / cómo                   | ¿El script encuentra los elementos del `<body>`? |
| ------------------------------ | ------------------------------------------------ |
| `<script>` en el `<head>`, sin nada | ❌ No: corre antes de que existan              |
| `<script defer>` en el `<head>` | ✅ Sí (la opción recomendada)                   |
| `<script type="module">`       | ✅ Sí                                            |
| `<script>` al final del `<body>` | ✅ Sí (la forma vieja)                          |

## Atributos globales útiles

Sirven en cualquier etiqueta.

| Atributo            | Para qué                                                           |
| ------------------- | ------------------------------------------------------------------ |
| `id`, `class`       | Identificar y agrupar                                              |
| `title`             | Cartelito al pasar el mouse                                        |
| `hidden`            | Oculta el elemento                                                 |
| `data-*`            | Guardar datos propios para JS: `data-id="42"` → `elemento.dataset.id` |
| `lang`              | Idioma de ese fragmento: `<span lang="en">cheatsheet</span>`       |
| `tabindex="0"`      | Hace que se pueda enfocar con <kbd>Tab</kbd>                       |
| `aria-label`        | Nombre accesible cuando no hay texto visible (un botón con ícono)  |

### Elementos interactivos sin JS

```html
<details>
  <summary>¿Qué es un cheatsheet?</summary>
  <p>Un machete con lo más usado de una herramienta.</p>
</details>
```

`<details>` se abre y cierra solo. `<dialog>` crea ventanas modales (se abren con JS:
`dialog.showModal()`).

## Accesibilidad

Hacer la página usable para todas las personas (lectores de pantalla, solo teclado, poca
visión). Con HTML bien escrito ya tenés el 80 %.

- Toda `<img>` lleva `alt`. Si es decorativa, `alt=""` (vacío, pero presente).
- Cada campo tiene su `<label>`.
- `<button>` para **acciones**, `<a>` para **ir a otro lugar**. Nunca un `<div>` con `onclick`:
  no se puede usar con teclado.
- Un solo `<h1>` y los títulos en orden (`h1` → `h2` → `h3`).
- Los links dicen a dónde van: "Ver el cheatsheet de Git", no "clic acá".
- `lang="es"` en el `<html>`.
- Probá navegar la página solo con <kbd>Tab</kbd>, <kbd>Enter</kbd> y <kbd>Espacio</kbd>.

## Cómo ver y validar tu página

- **Doble clic** en el `.html`: sirve para empezar, pero las rutas con `/` y los módulos JS no
  funcionan.
- **Live Server** (extensión de VS Code): clic derecho → _Open with Live Server_. Levanta un
  servidor local y recarga al guardar.
- **DevTools** (<kbd>F12</kbd>): pestaña _Elements_ para ver el HTML real, _Console_ para errores.
- **Validador:** [validator.w3.org](https://validator.w3.org/) encuentra etiquetas mal cerradas.

## Errores comunes

#### La imagen no aparece

Revisá la ruta (mayúsculas incluidas: `Foto.JPG` ≠ `foto.jpg` en un servidor Linux) y abrí
_DevTools → Network_: si dice **404**, la ruta está mal.

#### El formulario recarga la página y "no manda nada"

Te falta `name` en los campos, o el botón hace _submit_ sin querer. Si solo querés ejecutar JS,
usá `type="button"` o `event.preventDefault()` en el evento `submit`.

#### El JavaScript no encuentra los elementos (`null`)

El `<script>` está en el `<head>` sin `defer`. Agregale `defer`.

#### Tildes raras (`Ã³`)

Falta `<meta charset="utf-8" />` o el archivo no está guardado en UTF-8.

#### En el celular se ve todo chiquito

Falta la etiqueta `<meta name="viewport" …>`.

#### Un `<p>` adentro de otro `<p>` (o un `<div>` adentro de un `<p>`)

No se puede: el navegador cierra el primer `<p>` solo y la estructura queda distinta a la que
escribiste. Un `<p>` solo puede contener elementos en línea.

## Preguntas frecuentes

#### ¿Hay que cerrar `<img>` con `/>`?

No es obligatorio en HTML. Es válido con o sin barra; elegí un estilo y mantenelo (en JSX de
React sí es obligatorio).

#### ¿Mayúsculas o minúsculas en las etiquetas?

Da igual para el navegador, pero la convención es **minúsculas**.

#### ¿Comillas simples o dobles en los atributos?

Las dos funcionan. Lo común es dobles: `class="btn"`.

#### ¿Puedo tener dos `<h1>`?

Técnicamente sí, pero la recomendación es uno por página: el título principal.

#### ¿Cuál es la diferencia entre `<b>` y `<strong>`?

Se ven igual. `<strong>` dice "esto es importante" (un lector de pantalla puede enfatizarlo);
`<b>` solo es estilo visual.

#### ¿Dónde pongo los estilos: en el HTML o en un `.css`?

En un archivo `.css` aparte. El atributo `style="…"` es para casos puntuales.

## Fuentes

- [MDN: HTML (en español)](https://developer.mozilla.org/es/docs/Web/HTML)
- [MDN: Referencia de elementos](https://developer.mozilla.org/es/docs/Web/HTML/Element)
- [MDN: Formularios web](https://developer.mozilla.org/es/docs/Learn/Forms)
- [web.dev: Learn HTML](https://web.dev/learn/html)
- [Validador del W3C](https://validator.w3.org/)
