# Plan de contenido de los cheatsheets

Este archivo **no se publica**: la colección solo lee `src/content/cheatsheets/`. Sirve para
anotar qué tiene cada cheatsheet, qué le falta y en qué orden se trabaja.

## Criterios de evaluación

Para cada archivo me pregunto:

1. **¿Es extensa?** ¿Cubre lo que se usa en un curso o proyecto real, o solo lo mínimo?
2. **¿Es útil?** ¿Los ejemplos se pueden copiar y funcionan? ¿Explica el _porqué_ y no solo el
   _qué_?
3. **¿Responde las preguntas de alguien que recién empieza?** Las dudas típicas ("¿por qué no
   anda?", "¿cuál es la diferencia entre X e Y?", "¿qué significa este error?").

Y cada cheatsheet debería seguir una forma parecida (la de `_plantilla.md`):

```text
¿Qué es? → conceptos clave → secciones de uso (de lo básico a lo avanzado)
→ Errores comunes → Preguntas frecuentes → Fuentes
```

## Orden de trabajo

| # | Archivo                  | Antes           | Estado                            |
| - | ------------------------ | --------------- | --------------------------------- |
| 1 | `frontend/html.md`       | 126 líneas      | ✅ Reescrito y ampliado           |
| 2 | `backend/git.md`         | 112 líneas      | ✅ Reescrito y ampliado           |
| 3 | `hardware/arduino.md`    | 125 líneas      | ✅ Reescrito y ampliado; después se sumaron puerto serie y `#define` |
| 4 | `frontend/javascript.md` | No existía      | ✅ Creado                         |
| 5 | `frontend/css.md`        | No existía      | ✅ Creado                         |
| 6 | `backend/typescript.md`  | No existía      | ✅ Creado (ejemplos chequeados con TS 7.0.2) |
| 7 | `backend/express.md`     | No existía      | ✅ Creado (CRUD probado con Express 5.2 y Node 24) |

Próximos (según el README): `backend/node.md`, `backend/mysql.md`, `backend/php.md`,
`frontend/nextjs-react.md`, `hardware/sensores.md`, `hardware/i2c.md`, `hardware/uart.md`.

Orden dentro de cada categoría (campo `order`):

- **Frontend:** html 1 · css 2 · javascript 3 · nextjs-react 4
- **Backend:** node 1 · typescript 2 · express 3 · git 4 · mysql 5 · php 6

---

## 1. `frontend/html.md` (existe)

### Qué encontré

Estructura base, texto, links e imágenes, listas, etiquetas semánticas, un formulario,
tablas y accesibilidad básica.

| Criterio | Evaluación |
| --- | --- |
| Extensión | **Corta.** Es un buen índice de etiquetas, pero cada tema tiene un solo ejemplo. |
| Utilidad | **Media.** Los ejemplos están bien, pero casi no explica _por qué_ (qué hace `<meta viewport>`, para qué sirve `name` en un input). |
| Preguntas que responde | **Pocas.** No aclara las dudas típicas del principio. |

### Qué falta

- **Anatomía de una etiqueta:** etiqueta de apertura/cierre, atributos, elementos vacíos
  (`<img />`), anidado correcto, comentarios.
- **`id` vs `class`**, y **`div` vs `span`** (elementos de bloque vs en línea).
- **Rutas relativas vs absolutas** (`./img/foto.jpg`, `../`, `/`): la causa número uno de
  "no se ve la imagen".
- Explicar cada línea del `<head>`: `charset`, `viewport`, `description`, favicon.
- Entidades (`&lt;`, `&amp;`, `&nbsp;`).
- Multimedia: `<figure>`/`<figcaption>`, `<video>`, `<audio>`, `<iframe>`.
- Formularios completos: `name` (qué se manda al servidor), `GET` vs `POST`, `radio` con el
  mismo `name`, `checkbox`, `<textarea>`, `<fieldset>`/`<legend>`, atributos de validación
  (`required`, `min`, `max`, `pattern`), `placeholder` no reemplaza a `label`, tipos de
  `<button>` (un `<button>` dentro de un form hace _submit_ por defecto).
- Tablas: `colspan`/`rowspan`, `<caption>`.
- Dónde poner `<script>` y qué hace `defer`.
- Atributos `data-*` (puente con JavaScript).
- Cómo abrir la página (doble clic vs Live Server).
- **Errores comunes** y **Preguntas frecuentes** (no existen).

### Estructura propuesta

¿Qué es? · Anatomía de una etiqueta · Estructura base (explicada) · Texto · Links y rutas ·
Imágenes y multimedia · Listas · Contenedores (`div`/`span`, bloque vs en línea, `id`/`class`)
· Etiquetas semánticas (con un esqueleto de página) · Formularios · Tablas · Scripts y estilos ·
Atributos globales útiles · Accesibilidad · Errores comunes · Preguntas frecuentes · Fuentes

---

## 2. `backend/git.md` (existe)

### Qué encontré

Diagrama del flujo, configuración, init/clone, add/commit, log/diff, tabla de ramas,
remotos, deshacer, commits convencionales y `.gitignore`.

| Criterio | Evaluación |
| --- | --- |
| Extensión | **Media.** Cubre el flujo feliz, pero no lo que pasa cuando algo sale mal. |
| Utilidad | **Buena.** Comandos correctos y comentados. |
| Preguntas que responde | **Pocas.** Falta justo lo que más asusta al empezar. |

### Qué falta

- **Conceptos:** working directory / staging / repositorio, qué es un commit y su _hash_,
  `HEAD`, `origin`, rama local vs remota.
- **Conflictos de merge:** cómo se ven (`<<<<<<<`, `=======`, `>>>>>>>`) y cómo resolverlos
  paso a paso. Es la duda número uno.
- `git fetch` vs `git pull`.
- `git stash` (guardar cambios a medias para cambiar de rama).
- `git reset` (`--soft`, `--mixed`, `--hard`) y cuándo es peligroso; `git reflog` para
  recuperar cosas "perdidas".
- Ver un commit viejo (`git switch --detach` / `git checkout <hash>`) y volver.
- `.gitignore` de un archivo que **ya** estaba commiteado (`git rm --cached`).
- Autenticación con GitHub (token o SSH, `gh auth login`).
- Flujo de colaboración: fork → rama → push → Pull Request → merge.
- Renombrar/borrar ramas remotas, `git push` rechazado (_non-fast-forward_).
- Salir de `git log` (<kbd>q</kbd>) y del editor Vim si te abre uno al commitear.
- **Errores comunes** y **Preguntas frecuentes** (no existen).

### Estructura propuesta

¿Qué es? · Conceptos clave (las 3 zonas, commit, HEAD, remoto) · Configuración inicial ·
Crear o clonar · Guardar cambios · Ver historial · Ramas · Merge y conflictos · Remotos
(fetch/pull/push) · GitHub (autenticación, fork, Pull Request) · Guardar para después (stash)
· Deshacer cosas (tabla "quiero… → comando") · `.gitignore` · Commits convencionales ·
Errores comunes · Preguntas frecuentes · Fuentes

---

## 3. `hardware/arduino.md` (existe)

### Qué encontré

Qué es, estructura del sketch, pines digitales con `INPUT_PULLUP`, `analogRead` y `map`, PWM,
tiempo con `millis()`, monitor serie y tabla de tipos del UNO.

| Criterio | Evaluación |
| --- | --- |
| Extensión | **Media.** Buen resumen de la API, pero sin la parte de electrónica ni de C++. |
| Utilidad | **Buena.** El ejemplo de `millis()` es muy útil. |
| Preguntas que responde | **Pocas.** No dice cómo cargar el programa ni qué hacer cuando falla. |

### Qué falta

- **Cómo cargar un sketch:** Arduino IDE, elegir placa y puerto, compilar vs subir.
- **Mapa de pines del UNO:** digitales, analógicos, PWM, 5V/3.3V/GND/VIN, pines 0 y 1 (serie),
  LED integrado en 13, límites de corriente (~20 mA recomendado, 40 mA máximo por pin).
- **Electrónica mínima:** ley de Ohm, resistencia para un LED (cálculo), protoboard, GND común.
- **Entradas:** por qué un pin "flota", `INPUT` + resistencia pull-down vs `INPUT_PULLUP`,
  _debounce_ básico (el detalle va en `sensores.md`).
- **C++ para Arduino:** variables y alcance, `const` y `#define`, `if`/`for`/`while`/`switch`,
  funciones propias, arrays, `String` vs `char[]`.
- `Serial` para **leer**: `Serial.available()`, `Serial.read()`, `Serial.parseInt()`.
  Serial Plotter.
- Funciones útiles: `constrain`, `random`/`randomSeed`, `tone`/`noTone`.
- Librerías: `#include`, gestor de librerías, ejemplo con `Servo`.
- Interrupciones básicas (`attachInterrupt`, pines 2 y 3, `volatile`).
- Más tipos: `char`, `long`, `double` (en el UNO es igual a `float`), desbordamiento de `int`.
- **Errores comunes:** puerto que no aparece, `avrdude: stk500_getsync()`, algo conectado a
  0/1 al subir, `delay` que bloquea todo, `int` en vez de `unsigned long` con `millis()`.
- **Preguntas frecuentes** (no existen).

### Estructura propuesta

¿Qué es? · Cómo cargar un sketch · Pines del UNO · Electrónica mínima · Estructura de un sketch
· C++ para Arduino · Salidas digitales · Entradas digitales (pull-up/pull-down) · Entradas
analógicas · PWM · Tiempo (`delay` vs `millis`) · Monitor serie (escribir y leer) · Funciones
útiles · Librerías · Interrupciones · Tipos de datos · Errores comunes · Preguntas frecuentes
· Fuentes

---

### Ampliación pedida: puerto serie y `#define`

- **Puerto serie (`Serial`):** cómo funciona la UART (TX/RX cruzados, GND común, baud rate,
  8N1, buffer de 64 bytes), opciones del monitor serie, `print` vs `write`, `snprintf` (sin
  `%f` en el UNO → `dtostrf`), funciones de lectura y cuáles bloquean, lector de comandos sin
  bloquear, números separados por comas, Serial Plotter, leer el puerto desde Python,
  `SoftwareSerial` con un HC-05, dos Arduinos conectados y niveles de 3,3 V vs 5 V.
- **Preprocesador:** `#define` para constantes y macros con parámetros (y sus trampas), defines
  que trae `Arduino.h` (`HIGH`, `min`, `constrain`…, verificados en el código fuente del núcleo
  AVR), modo debug con `#if`, `#include` y pestañas `.h` con `#pragma once`, tabla
  `#define` vs `const` vs `constexpr`.
- Errores nuevos: puerto ocupado, monitor vacío, `parseInt` que devuelve 0, `print` que frena,
  `;` en un `#define` y nombres que chocan con un define.
- El protocolo UART en detalle (tramas, paridad, osciloscopio) queda para `hardware/uart.md`.

---

## 4. `frontend/javascript.md` (nuevo)

Frontmatter: `title: JavaScript`, `badge: js`, `order: 3`, `tags: [web, dom]`.

Contenido planeado:

- ¿Qué es? Dónde corre (navegador y Node), cómo se conecta al HTML (`<script defer>`),
  la consola del navegador.
- Variables: `const` / `let` (y por qué no `var`).
- Tipos: `string`, `number`, `boolean`, `null`, `undefined`, `object`, `array`; `typeof`.
- Operadores: `===` vs `==`, `&&`, `||`, `??`, `?.`, ternario.
- Strings: template literals y métodos útiles.
- Condicionales y bucles (`for`, `for…of`, `while`).
- Funciones: declaración, flecha, parámetros por defecto, `return`.
- Arrays: `push`/`pop`, `map`, `filter`, `find`, `reduce`, `forEach`, `includes`, spread.
- Objetos: acceso, desestructuración, spread, `Object.keys/values/entries`, JSON.
- DOM: seleccionar (`querySelector`), modificar texto/clases/atributos, crear elementos.
- Eventos: `addEventListener`, `event.preventDefault()` en formularios, delegación.
- Asincronía: qué es una promesa, `fetch` + `async/await`, `try/catch`.
- Módulos: `import`/`export`.
- `localStorage`.
- Errores comunes (`undefined is not a function`, `Cannot read properties of null`, script
  antes del HTML, comparar con `==`) · Preguntas frecuentes · Fuentes.

## 5. `frontend/css.md` (nuevo)

Frontmatter: `title: CSS`, `badge: css`, `order: 2`, `tags: [web, estilos]`.

Contenido planeado:

- ¿Qué es? Las 3 formas de agregarlo (y cuál usar), anatomía de una regla.
- Selectores: tipo, clase, id, descendiente, hijo, atributo, pseudoclases (`:hover`,
  `:nth-child`), pseudoelementos (`::before`).
- **Cascada, especificidad y herencia:** por qué "mi estilo no se aplica".
- Unidades: `px`, `%`, `rem`, `em`, `vw`/`vh`; colores (`#hex`, `rgb`, `hsl`).
- **Box model:** `margin`, `border`, `padding`, `box-sizing: border-box`; colapso de márgenes.
- Tipografía y fondos.
- `display` (block, inline, inline-block, none) y `position` (relative, absolute, fixed,
  sticky) con `z-index`.
- **Flexbox** con los casos típicos (centrar, barra de navegación, repartir espacio).
- **Grid** con los casos típicos (grilla de tarjetas responsive, layout de página).
- Responsive: `@media`, mobile-first, imágenes fluidas.
- Variables (`--color`), transiciones y animaciones básicas.
- Un reset mínimo.
- Errores comunes (centrar un div, `height: 100%` que no anda, el `z-index` que no funciona,
  overflow horizontal en celular) · Preguntas frecuentes · Fuentes.

## 6. `backend/typescript.md` (nuevo)

Frontmatter: `title: TypeScript`, `badge: ts`, `order: 2`, `tags: [node, tipos]`.

Contenido planeado:

- ¿Qué es? Qué agrega a JavaScript, que los tipos desaparecen al compilar.
- Instalación y cómo correrlo: `node archivo.ts` (Node 24) + `tsc --noEmit` para chequear;
  `tsconfig.json` explicado línea por línea.
- Tipos básicos, inferencia, `any` vs `unknown`.
- Arrays y tuplas, objetos, `type` vs `interface`, opcionales y `readonly`.
- Uniones, tipos literales y _narrowing_ (`typeof`, `in`, discriminadas).
- Funciones tipadas, `void`, `never`.
- Genéricos básicos.
- Utility types: `Partial`, `Pick`, `Omit`, `Record`.
- Enums vs uniones de strings, `as const`, `satisfies`.
- Clases con modificadores de acceso.
- Módulos e `import type`, tipos de librerías (`@types/...`).
- Errores comunes (`Object is possibly 'undefined'`, `Type X is not assignable to type Y`,
  abusar de `as` y `any`) · Preguntas frecuentes · Fuentes.

## 7. `backend/express.md` (nuevo)

Frontmatter: `title: Express`, `badge: exp`, `order: 3`, `tags: [node, api]`.

Contenido planeado:

- ¿Qué es? Cliente/servidor, request/response, qué es una API REST.
- Instalación con TypeScript (`express`, `@types/express`, `@types/node`), `package.json` con
  `"type": "module"`, scripts `dev` (`node --watch`) y `check` (`tsc --noEmit`).
- Servidor mínimo tipado y puerto con variable de entorno (`--env-file`).
- Rutas y métodos HTTP (GET, POST, PUT, PATCH, DELETE) con tabla de cuándo usar cada uno.
- `req`: `params`, `query`, `body`, `headers`, y cómo tiparlos (`Request<Params, …, Body>`).
- Validar lo que llega (el tipo no garantiza que el cliente mande eso).
- `res`: `json`, `send`, `status`, códigos HTTP más comunes.
- Middlewares: qué son, `next()`, `express.json()`, uno propio (logger), orden.
- `express.Router` para separar rutas en archivos, estructura de carpetas sugerida.
- CRUD de ejemplo completo (en memoria).
- Manejo de errores y 404 (en Express 5 los errores de funciones `async` llegan solos).
- CORS, archivos estáticos, variables de entorno (`.env`, `process.env`).
- Probar la API (Thunder Client / Postman / `curl`, `fetch` desde el front).
- Errores comunes (`req.body` es `undefined`, `Cannot set headers after they are sent`,
  `EADDRINUSE`, error de CORS) · Preguntas frecuentes · Fuentes.

---

## Preguntas hechas y decisiones (sep 2026)

| Pregunta | Respuesta |
| --- | --- |
| ¿Qué placas cubre `arduino.md`? | **Solo UNO** (R3 como base; una nota corta sobre las diferencias del R4). |
| ¿En qué lenguaje van los ejemplos de Express? | **TypeScript.** |
| ¿Qué profundidad? | **Guía extensa:** explica el porqué, ejemplos completos, errores comunes y preguntas frecuentes. |
| ¿Temas del curso obligatorios? | Ninguno fijo: **investigar** qué está vigente y qué suele preguntarse. |

### Convenciones de formato

- `##` para secciones y `###` para subsecciones (salen en el índice de la derecha).
- `####` para cada error común y cada pregunta frecuente: se ven como título pero **no**
  llenan el índice.
- `> **Tip:**` / `> **Ojo:**` para notas; tablas "quiero… → uso…" donde ayuden a escanear.

### Hallazgos de la investigación

- **TypeScript 7.0** (julio 2026) trae el compilador reescrito en Go; se instala igual
  (`npm i -D typescript`) y el comando sigue siendo `tsc`. Desde **TS 6.0** cambian los valores
  por defecto: `strict: true`, `module: esnext`, `target` = ES del año, **`types: []`** (hay que
  poner `"types": ["node"]` para que reconozca `process`) y `rootDir` = carpeta del
  `tsconfig.json`. `baseUrl` y `target: es5` ya no existen.
- **Node 24** (LTS) ejecuta `.ts` directamente (_type stripping_, estable desde 24.12): borra los
  tipos y corre lo que queda, **sin chequearlos**. Reglas: los imports llevan extensión
  (`./rutas.ts`), los imports de solo tipos llevan `import type`, y no se pueden usar `enum`,
  `namespace` con código ni _parameter properties_. `tsconfig` recomendado:
  `erasableSyntaxOnly`, `verbatimModuleSyntax`, `rewriteRelativeImportExtensions`, `noEmit`.
  Por eso Express se corre con `node --watch src/index.ts` y los tipos se chequean con
  `tsc --noEmit`, sin `ts-node` ni `tsx`.
- **Express 5** es la versión actual (`@types/express@5`). Para principiantes cambia: rutas
  comodín con nombre (`/*splat`), opcionales con llaves (`/:archivo{.:ext}`), `req.body` es
  `undefined` si no usás `express.json()`, los errores de funciones `async` llegan solos al
  manejador de errores, `res.sendStatus()` en vez de `res.send(404)`, y
  `express.urlencoded` usa `extended: false` por defecto.
- **Arduino UNO R3:** ATmega328P, 5 V, 16 MHz, 32 KB de flash, 2 KB de SRAM, 1 KB de EEPROM,
  14 pines digitales (PWM en 3, 5, 6, 9, 10, 11), 6 analógicos, 20 mA recomendados por pin,
  interrupciones en 2 y 3, I2C en A4/A5, SPI en 10–13. En el **UNO R4** `int` ocupa 4 bytes y
  el chip es otro, así que las tablas de tipos cambian.
- **Git:** `git switch` / `git restore` son los comandos recomendados en lugar de los usos
  múltiples de `git checkout`. GitHub no acepta contraseña al hacer push: token o SSH.
