# Logos de las tecnologías

Están en `public/icons/` (PNG de hasta 256 px con fondo transparente) y se usan en las tarjetas de cada carpeta. Los logos son marcas de sus respectivos dueños; se muestran solo para identificar cada cheatsheet.

| Archivo | Tecnología | Origen |
| --- | --- | --- |
| `typescript.png` | TypeScript | Logo oficial, copia del proyecto anterior |
| `express.png` | Express | Icono "Express" de Simple Icons (https://simpleicons.org), en blanco para fondos oscuros |
| `git.png` | Git | Git-Icon-1788C, https://git-scm.com/downloads/logos (CC BY 3.0) |
| `html.png` | HTML5 | HTML5 Badge del W3C, https://www.w3.org/html/logo/ (CC BY 3.0) |
| `css.png` | CSS3 | Logo CSS3, copia del proyecto anterior |
| `javascript.png` | JavaScript | Logo JS, copia del proyecto anterior |
| `arduino.png` | Arduino | Logo Arduino, copia del proyecto anterior |

Para agregar uno nuevo: ponelo en `public/icons/` y referencialo con `icon: '/icons/nombre.png'` en `src/data/cheatsheets.js`. Si no tiene logo, la tarjeta muestra las tres primeras letras del título.
