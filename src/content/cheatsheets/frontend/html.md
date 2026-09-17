---
title: HTML
description: La estructura de una página web, etiqueta por etiqueta.
badge: </>
order: 1
tags: [web, básico]
updated: 2026-09-16
---

## ¿Qué es?

**HTML** (HyperText Markup Language) describe **qué es** cada parte de una página: un título,
un párrafo, un link, un formulario. El estilo lo pone CSS y el comportamiento JavaScript.

## Estructura base

```html
<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Mi página</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <h1>Hola mundo</h1>
    <script src="app.js"></script>
  </body>
</html>
```

> **Tip:** en VS Code escribí `!` y apretá <kbd>Tab</kbd> para generar esta estructura.

## Texto

```html
<h1>Título principal (uno por página)</h1>
<h2>Subtítulo</h2>
<p>Un párrafo con <strong>algo importante</strong> y <em>algo enfatizado</em>.</p>
<br />  <!-- salto de línea -->
<hr />  <!-- separador -->
```

## Links e imágenes

```html
<a href="https://developer.mozilla.org">MDN</a>
<a href="/contacto">Página interna</a>
<a href="#seccion">Ir a una sección</a>
<a href="https://ejemplo.com" target="_blank" rel="noopener noreferrer">Nueva pestaña</a>

<img src="foto.jpg" alt="Descripción de la foto" width="300" />
```

## Listas

```html
<ul>
  <li>Lista sin orden</li>
</ul>

<ol>
  <li>Lista numerada</li>
</ol>
```

## Etiquetas semánticas

Dicen **qué rol** cumple cada bloque. Ayudan a buscadores y lectores de pantalla.

| Etiqueta    | Para qué                                        |
| ----------- | ----------------------------------------------- |
| `<header>`  | Encabezado de la página o de una sección        |
| `<nav>`     | Menú de navegación                              |
| `<main>`    | Contenido principal (uno por página)            |
| `<section>` | Sección temática con su propio título           |
| `<article>` | Contenido que tiene sentido solo (un post)      |
| `<aside>`   | Contenido secundario (sidebar)                  |
| `<footer>`  | Pie de página                                   |

## Formularios

```html
<form action="/login" method="post">
  <label for="email">Email</label>
  <input id="email" name="email" type="email" required />

  <label for="pass">Contraseña</label>
  <input id="pass" name="password" type="password" minlength="8" required />

  <select name="rol">
    <option value="alumno">Alumno</option>
    <option value="profe">Profe</option>
  </select>

  <button type="submit">Entrar</button>
</form>
```

Tipos de `input` útiles: `text`, `email`, `password`, `number`, `date`, `checkbox`, `radio`,
`file`.

## Tablas

```html
<table>
  <thead>
    <tr><th>Nombre</th><th>Edad</th></tr>
  </thead>
  <tbody>
    <tr><td>Ana</td><td>17</td></tr>
  </tbody>
</table>
```

## Accesibilidad básica

- Toda `<img>` lleva `alt` (vacío `alt=""` si es decorativa).
- Cada `<input>` tiene su `<label for="…">`.
- Usá `<button>` para acciones y `<a>` para navegar.
- No saltees niveles de títulos (`h1` → `h2` → `h3`).

## Fuentes

- [MDN: HTML](https://developer.mozilla.org/es/docs/Web/HTML)
