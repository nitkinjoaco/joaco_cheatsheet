## ¿Qué es?

**JavaScript** (JS) es el lenguaje de programación de la web: le da **comportamiento** a la
página (responder a un clic, validar un formulario, pedir datos a un servidor). También corre
fuera del navegador con **Node.js**, así que sirve para frontend y backend.

- No tiene nada que ver con Java, más allá del nombre.
- El estándar se llama **ECMAScript** (ES). "ES6" o "ES2015" es la versión que trajo `let`,
  `const`, funciones flecha y clases; desde ahí sale una versión por año.
- **TypeScript** es JavaScript con tipos (ver el cheatsheet de TypeScript).

## Dónde se escribe y cómo se prueba

```html
<!-- En el HTML: con defer, el script corre cuando la página ya está armada -->
<script src="app.js" defer></script>

<!-- Como módulo: permite import/export (también se ejecuta al final, como defer) -->
<script type="module" src="main.js"></script>
```

- **Consola del navegador:** <kbd>F12</kbd> → pestaña _Console_. Ahí ves errores y podés
  escribir JS para probar.
- **Node.js:** `node archivo.js` en la terminal.

```js
console.log("Hola", 42, { a: 1 });   // muestra cualquier cosa
console.error("Algo salió mal");      // en rojo
console.table([{ nombre: "Ana", edad: 17 }]);
```

## Variables

```js
const nombre = "Ana";   // no se puede reasignar
let edad = 17;            // se puede reasignar
edad = 18;

// var edad = 17;         // forma vieja: evitala (tiene reglas de alcance confusas)
```

| Palabra | ¿Reasignar? | Alcance                 | Usala…                                 |
| ------- | ----------- | ----------------------- | -------------------------------------- |
| `const` | No          | El bloque `{ }`         | **Por defecto**                        |
| `let`   | Sí          | El bloque `{ }`         | Cuando el valor va a cambiar (contadores) |
| `var`   | Sí          | La función entera       | Nunca en código nuevo                  |

> **Ojo:** `const` no hace el valor inmutable. Un array u objeto `const` se puede modificar
> por dentro (`lista.push(1)`); lo que no se puede es asignarle otro array.

Nombres: `camelCase` para variables y funciones (`precioTotal`), `PascalCase` para clases
(`Carrito`), `MAYUSCULAS` para constantes fijas (`MAX_INTENTOS`).

## Tipos de datos

| Tipo        | Ejemplo                       | `typeof`      |
| ----------- | ----------------------------- | ------------- |
| `string`    | `"hola"`, `'hola'`, `` `hola` `` | `"string"` |
| `number`    | `42`, `3.14`, `NaN`, `Infinity` | `"number"`  |
| `boolean`   | `true`, `false`               | `"boolean"`   |
| `undefined` | variable sin valor            | `"undefined"` |
| `null`      | "vacío a propósito"           | `"object"` (error histórico) |
| `bigint`    | `123n`                        | `"bigint"`    |
| `object`    | `{ a: 1 }`, `[1, 2]`, `null`  | `"object"`    |
| `function`  | `() => {}`                    | `"function"`  |

```js
Array.isArray([1, 2]);   // true: la forma correcta de saber si algo es un array
```

### Conversiones

```js
Number("42");        // 42
Number("42abc");     // NaN (Not a Number)
parseInt("42px");    // 42: lee hasta donde puede
parseFloat("3.5");   // 3.5
String(42);          // "42"
(3.14159).toFixed(2);  // "3.14" (devuelve string)

"5" + 3;             // "53"  ← + con un string concatena
"5" - 3;             // 2     ← los otros operadores convierten a número
```

### Valores "falsy"

En un `if`, estos valores cuentan como `false`. **Todo lo demás** es `true` (incluso `"0"`,
`[]` y `{}`).

```js
false, 0, -0, 0n, "", null, undefined, NaN
```

## Operadores

```js
5 === 5;       // true: igualdad estricta (mismo valor y tipo)
5 === "5";     // false
5 == "5";      // true: convierte tipos. Evitalo
5 !== "5";     // true

true && false; // false (Y)
true || false; // true  (O)
!true;         // false (NO)

10 % 3;        // 1  (resto)
2 ** 3;        // 8  (potencia)
```

### Valores por defecto y acceso seguro

```js
const nombre = usuario.nombre || "Anónimo";  // si es falsy ("", 0, null…) usa "Anónimo"
const cantidad = datos.cantidad ?? 1;        // solo si es null o undefined (respeta el 0)

const ciudad = usuario?.direccion?.ciudad;   // undefined en vez de error si algo no existe
usuario.saludar?.();                         // llama solo si la función existe

const mensaje = edad >= 18 ? "Mayor" : "Menor";   // ternario: if/else en una línea
```

## Strings

```js
const nombre = "Ana";
const saludo = `Hola, ${nombre}. Tenés ${17 + 1} años.`;  // template literal: backticks

const texto = "  Hola Mundo  ";
texto.length;                  // 14
texto.trim();                  // "Hola Mundo"
texto.toLowerCase();           // "  hola mundo  "
texto.includes("Mundo");       // true
texto.startsWith("  Ho");      // true
texto.replace("Mundo", "JS");  // reemplaza la primera aparición (replaceAll: todas)
"a,b,c".split(",");            // ["a", "b", "c"]
"Hola".slice(0, 2);            // "Ho"
"Hola".at(-1);                 // "a" (último carácter)
"5".padStart(3, "0");          // "005"
```

Los strings son **inmutables**: los métodos devuelven un string nuevo, no cambian el original.

## Condicionales y bucles

```js
if (nota >= 6) {
  console.log("Aprobado");
} else if (nota >= 4) {
  console.log("Recuperatorio");
} else {
  console.log("Desaprobado");
}

switch (dia) {
  case "sábado":
  case "domingo":
    console.log("Fin de semana");
    break;
  default:
    console.log("Día de semana");
}
```

```js
for (let i = 0; i < 3; i++) { console.log(i); }       // 0, 1, 2

for (const fruta of ["manzana", "pera"]) { }          // recorre VALORES de un array
for (const clave in { a: 1, b: 2 }) { }               // recorre CLAVES de un objeto

while (intentos < 3) { intentos++; }

break;      // sale del bucle
continue;   // salta a la siguiente vuelta
```

## Funciones

```js
// Declaración: se puede usar antes de la línea donde está escrita
function sumar(a, b) {
  return a + b;
}

// Función flecha: la forma más usada para callbacks
const multiplicar = (a, b) => a * b;          // una expresión: return implícito
const cuadrado = n => n * n;                  // un parámetro: paréntesis opcionales
const crearUsuario = (nombre) => ({ nombre }); // devolver un objeto: entre paréntesis

const saludar = (nombre = "desconocido") => `Hola, ${nombre}`;  // valor por defecto

const promedio = (...numeros) =>                // rest: junta los argumentos en un array
  numeros.reduce((a, b) => a + b, 0) / numeros.length;
promedio(8, 9, 10);  // 9
```

- Una función sin `return` devuelve `undefined`.
- Las funciones son valores: se guardan en variables y se pasan a otras funciones
  (**callbacks**).

```js
const botones = document.querySelectorAll("button");
botones.forEach((boton) => boton.classList.add("listo"));  // la flecha es un callback
```

## Arrays

```js
const numeros = [3, 1, 4, 1, 5];
numeros.length;       // 5
numeros[0];           // 3 (los índices empiezan en 0)
numeros.at(-1);       // 5 (el último)
```

### Métodos que **modifican** el array

| Método                  | Qué hace                                    |
| ----------------------- | ------------------------------------------- |
| `push(x)` / `pop()`     | Agrega / saca **al final**                  |
| `unshift(x)` / `shift()` | Agrega / saca **al principio**             |
| `splice(i, n)`          | Borra `n` elementos desde la posición `i`   |
| `sort()`                | Ordena (¡como texto! ver abajo)             |
| `reverse()`             | Invierte                                    |

### Métodos que **devuelven algo nuevo** (no tocan el original)

```js
const productos = [
  { nombre: "Mouse", precio: 5000, stock: 3 },
  { nombre: "Teclado", precio: 12000, stock: 0 },
  { nombre: "Monitor", precio: 90000, stock: 2 },
];

productos.map((p) => p.nombre);             // ["Mouse", "Teclado", "Monitor"]
productos.filter((p) => p.stock > 0);       // los que tienen stock
productos.find((p) => p.nombre === "Mouse"); // el primero que cumple (o undefined)
productos.findIndex((p) => p.precio > 10000); // 1 (o -1)
productos.some((p) => p.stock === 0);       // true: ¿alguno cumple?
productos.every((p) => p.precio > 0);       // true: ¿todos cumplen?
productos.reduce((total, p) => total + p.precio, 0);  // 107000: acumula en un valor

[1, 2, 3].includes(2);                      // true
[1, 2, 3].indexOf(3);                       // 2
[1, 2, 3].slice(0, 2);                      // [1, 2]
["a", "b"].join(" - ");                     // "a - b"
[[1, 2], [3]].flat();                       // [1, 2, 3]
[3, 1, 2].toSorted((a, b) => a - b);        // [1, 2, 3] sin modificar el original
```

| Quiero…                                  | Uso        |
| ---------------------------------------- | ---------- |
| Transformar cada elemento                | `map`      |
| Quedarme con algunos                     | `filter`   |
| Encontrar uno                            | `find`     |
| Calcular un total                        | `reduce`   |
| Solo recorrer (sin devolver nada)        | `forEach` o `for…of` |

> **Ojo con `sort()`:** `[10, 9, 1].sort()` da `[1, 10, 9]` porque compara como texto. Para
> números: `sort((a, b) => a - b)`.

### Spread y desestructuración

```js
const a = [1, 2];
const b = [...a, 3];              // [1, 2, 3]: copia y agrega
const copia = [...a];             // copia (superficial)

const [primero, segundo, ...resto] = [10, 20, 30, 40];
// primero = 10, segundo = 20, resto = [30, 40]
```

## Objetos

```js
const usuario = {
  nombre: "Ana",
  edad: 17,
  "color favorito": "verde",       // clave con espacios: entre comillas
  saludar() {
    return `Hola, soy ${this.nombre}`;
  },
};

usuario.nombre;                    // "Ana"
usuario["color favorito"];         // "verde"
const campo = "edad";
usuario[campo];                    // 17: clave en una variable

usuario.email = "ana@mail.com";    // agregar
delete usuario.edad;               // borrar
"nombre" in usuario;               // true
```

### Desestructuración y spread

```js
const { nombre, edad = 0, ...otros } = usuario;   // saca propiedades a variables
const { nombre: nombreUsuario } = usuario;        // con otro nombre

const actualizado = { ...usuario, edad: 18 };      // copia y pisa una propiedad

// Muy usado en parámetros
function mostrar({ nombre, edad }) {
  console.log(`${nombre} tiene ${edad}`);
}
```

### Recorrer un objeto

```js
Object.keys(usuario);      // ["nombre", "edad", …]
Object.values(usuario);    // ["Ana", 17, …]
Object.entries(usuario);   // [["nombre", "Ana"], ["edad", 17], …]

for (const [clave, valor] of Object.entries(usuario)) {
  console.log(clave, valor);
}
```

### Copiar y comparar

```js
const copia = { ...usuario };                // copia superficial: los objetos de adentro se comparten
const profunda = structuredClone(usuario);   // copia completa

{ a: 1 } === { a: 1 };   // false: se comparan por referencia, no por contenido
```

### JSON

Formato de texto para mandar datos (entre el front y el back, o guardarlos).

```js
const texto = JSON.stringify({ nombre: "Ana", edad: 17 });  // objeto → '{"nombre":"Ana","edad":17}'
const objeto = JSON.parse(texto);                           // string → objeto
JSON.stringify(datos, null, 2);                             // con sangría, para leerlo
```

En JSON las claves van **siempre** con comillas dobles y no hay funciones ni `undefined`.

## Clases

```js
class Cuenta {
  #saldo = 0;                       // # = privado: no se puede leer desde afuera

  constructor(titular) {
    this.titular = titular;
  }

  depositar(monto) {
    if (monto <= 0) throw new Error("Monto inválido");
    this.#saldo += monto;
  }

  get saldo() {                     // se lee como propiedad: cuenta.saldo
    return this.#saldo;
  }
}

class CuentaAhorro extends Cuenta {
  constructor(titular, tasa) {
    super(titular);                 // llama al constructor de Cuenta
    this.tasa = tasa;
  }
}

const cuenta = new CuentaAhorro("Ana", 0.05);
cuenta.depositar(1000);
cuenta.saldo;                       // 1000
```

## El DOM

El **DOM** (_Document Object Model_) es el HTML convertido en objetos que JS puede leer y
modificar. `document` es la página entera.

### Seleccionar elementos

```js
const titulo = document.querySelector("h1");            // el PRIMERO que coincide (o null)
const boton = document.querySelector("#enviar");         // por id
const tarjeta = document.querySelector(".tarjeta");      // por clase
const items = document.querySelectorAll(".lista li");    // TODOS (NodeList)

items.forEach((li) => console.log(li.textContent));
const itemsArray = [...items];                           // a array, para usar map/filter
```

Los selectores son los mismos que en CSS.

### Modificar

```js
titulo.textContent = "Nuevo título";          // cambia el texto (seguro)
tarjeta.innerHTML = "<strong>Hola</strong>";  // interpreta HTML (⚠️ nunca con datos del usuario)

boton.classList.add("activo");
boton.classList.remove("activo");
boton.classList.toggle("activo");             // pone o saca
boton.classList.contains("activo");           // true / false

titulo.style.color = "hotpink";               // estilos en línea (mejor: cambiar clases)

const link = document.querySelector("a");
link.getAttribute("href");
link.setAttribute("href", "/nuevo");
boton.disabled = true;

// data-*: <article data-id="42">
tarjeta.dataset.id;                            // "42" (siempre string)

const input = document.querySelector("#email");
input.value;                                   // lo que escribió el usuario (string)
```

### Crear y borrar elementos

```js
const lista = document.querySelector("#lista");

const li = document.createElement("li");
li.textContent = "Nuevo ítem";
li.classList.add("item");
lista.append(li);            // al final (prepend: al principio)

li.remove();                 // lo borra

// Renderizar una lista desde datos
const nombres = ["Ana", "Juan"];
lista.replaceChildren(
  ...nombres.map((nombre) => {
    const item = document.createElement("li");
    item.textContent = nombre;
    return item;
  }),
);
```

## Eventos

```js
const boton = document.querySelector("#contador");
let clics = 0;

boton.addEventListener("click", () => {
  clics++;
  boton.textContent = `Clics: ${clics}`;
});
```

| Evento                  | Cuándo                                         |
| ----------------------- | ---------------------------------------------- |
| `click`                 | Clic (o Enter/Espacio en un botón)             |
| `input`                 | Cada vez que cambia el texto de un campo       |
| `change`                | Al confirmar un cambio (select, checkbox, salir del input) |
| `submit`                | Al enviar un `<form>` (se escucha en el form, no en el botón) |
| `keydown`               | Al apretar una tecla (`event.key`)             |
| `mouseenter` / `mouseleave` | El mouse entra / sale                      |
| `DOMContentLoaded`      | El HTML terminó de cargar                      |

### El objeto `event`

```js
const form = document.querySelector("#form-login");

form.addEventListener("submit", (event) => {
  event.preventDefault();                      // evita que la página se recargue

  const datos = new FormData(form);            // lee los campos por su name
  const email = datos.get("email");
  const todo = Object.fromEntries(datos);      // { email: "...", password: "..." }

  console.log(event.target);                   // el elemento que disparó el evento
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") cerrarModal();
});
```

### Delegación de eventos

En lugar de un listener por cada botón (y que no funcione con los que agregues después),
escuchás en el contenedor:

```js
lista.addEventListener("click", (event) => {
  const boton = event.target.closest("button.borrar");
  if (!boton) return;                      // el clic no fue en un botón "borrar"
  boton.closest("li").remove();
});
```

## Asincronía

JS ejecuta **una cosa a la vez**. Las tareas lentas (pedir datos a un servidor, esperar un
timer) no frenan la página: se programan y su resultado llega **después**.

```js
console.log("1");
setTimeout(() => console.log("2"), 0);   // se ejecuta cuando termine lo actual
console.log("3");
// 1, 3, 2

const id = setInterval(() => console.log("tic"), 1000);   // cada 1 segundo
clearInterval(id);                                          // lo frena
```

### Promesas

Una **promesa** es un valor que va a estar disponible más adelante. Puede terminar
**cumplida** (con un resultado) o **rechazada** (con un error).

```js
fetch("/api/usuarios")
  .then((respuesta) => respuesta.json())
  .then((usuarios) => console.log(usuarios))
  .catch((error) => console.error(error));
```

### `async` / `await`

La misma lógica, escrita como si fuera código en orden. `await` solo se puede usar dentro de una
función `async` (o en el nivel superior de un módulo).

```js
async function cargarUsuarios() {
  try {
    const respuesta = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!respuesta.ok) {                     // fetch NO falla con 404 o 500: hay que revisar
      throw new Error(`Error HTTP ${respuesta.status}`);
    }

    const usuarios = await respuesta.json();
    return usuarios;
  } catch (error) {
    console.error("No se pudieron cargar:", error);
    return [];
  } finally {
    ocultarSpinner();                        // corre siempre
  }
}

const usuarios = await cargarUsuarios();     // una función async siempre devuelve una promesa
```

### Enviar datos con `fetch`

```js
const respuesta = await fetch("/api/tareas", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ titulo: "Estudiar JS", hecha: false }),
});
const tareaCreada = await respuesta.json();
```

### Varias a la vez

```js
const [usuarios, posts] = await Promise.all([
  fetch("/api/usuarios").then((r) => r.json()),
  fetch("/api/posts").then((r) => r.json()),
]);   // espera a las dos; si una falla, falla todo (Promise.allSettled no)
```

## Errores y `try/catch`

```js
try {
  const datos = JSON.parse(textoQuizasRoto);
} catch (error) {
  console.error(error.message);
}

function dividir(a, b) {
  if (b === 0) throw new Error("No se puede dividir por cero");
  return a / b;
}
```

| Error                                    | Suele significar                                 |
| ---------------------------------------- | ------------------------------------------------ |
| `ReferenceError: x is not defined`       | Variable mal escrita o fuera de alcance          |
| `TypeError: x is not a function`         | Llamás a algo que no es función (nombre mal escrito, dato equivocado) |
| `TypeError: Cannot read properties of undefined (reading 'y')` | `x.y` pero `x` es `undefined` |
| `SyntaxError: Unexpected token`          | Falta o sobra un `}`, `)` o `,`                  |

## Módulos

Separar el código en archivos.

```js
// utils.js
export const IVA = 0.21;
export function conIva(precio) {
  return precio * (1 + IVA);
}
export default function formatearPrecio(n) {
  return `$${n.toLocaleString("es-AR")}`;
}
```

```js
// main.js
import formatearPrecio, { conIva, IVA } from "./utils.js";  // default sin llaves, nombrados con llaves
import * as utils from "./utils.js";

console.log(formatearPrecio(conIva(1000)));   // "$1.210"
```

- En el navegador necesitás `<script type="module">` y la extensión `.js` en la ruta.
- Los módulos no funcionan abriendo el HTML con doble clic: usá Live Server o Vite.

## Guardar datos en el navegador

```js
localStorage.setItem("tema", "oscuro");         // queda guardado aunque cierres el navegador
localStorage.getItem("tema");                    // "oscuro" (o null si no existe)
localStorage.removeItem("tema");

// Solo guarda strings: para objetos, JSON
localStorage.setItem("carrito", JSON.stringify(carrito));
const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) ?? [];
```

`sessionStorage` funciona igual, pero se borra al cerrar la pestaña. No guardes contraseñas ni
tokens sensibles ahí.

## Fechas y números

```js
const ahora = new Date();
ahora.getFullYear();                       // 2026
ahora.getMonth();                          // 0 = enero (¡empieza en 0!)
ahora.toLocaleDateString("es-AR");         // "17/9/2026"

Math.round(4.6);   // 5
Math.floor(4.6);   // 4
Math.ceil(4.1);    // 5
Math.max(1, 5, 3); // 5
Math.floor(Math.random() * 6) + 1;   // entero al azar del 1 al 6

(1234567.891).toLocaleString("es-AR");   // "1.234.567,891"
0.1 + 0.2;                               // 0.30000000000000004 (limitación de los decimales)
```

## Errores comunes

#### `Cannot read properties of null (reading 'addEventListener')`

`querySelector` no encontró el elemento: el selector está mal escrito o el script corre antes
de que exista el HTML. Agregá `defer` al `<script>`.

#### El formulario recarga la página

Falta `event.preventDefault()` en el listener de `submit`.

#### Sumar da `"105"` en vez de `15`

Los valores de un `input` son **strings**. Convertí: `Number(input.value)`.

#### `await` devuelve una `Promise {<pending>}` o da error

Olvidaste el `await`, o estás usando `await` fuera de una función `async`.

#### Error de CORS al hacer `fetch`

El servidor no permite pedidos desde tu dominio. No se arregla en el front: el backend tiene que
habilitarlo (ver el cheatsheet de Express).

#### `x is not a function` con `forEach` sobre un `getElementsByClassName`

Esa colección no tiene `forEach`. Usá `querySelectorAll` o convertila con `[...coleccion]`.

#### Un `for` con `setTimeout` muestra siempre el último número

Estás usando `var`. Con `let`, cada vuelta tiene su propia variable.

## Preguntas frecuentes

#### ¿Punto y coma sí o no?

JS los agrega solo en casi todos los casos, pero hay excepciones raras. Lo más simple: ponelos
siempre y dejá que Prettier formatee.

#### ¿Comillas simples, dobles o backticks?

Simples y dobles son iguales; elegí una. Backticks solo cuando necesitás `${}` o varias líneas.

#### ¿`function` o flecha?

Flecha para callbacks y funciones cortas. `function` si necesitás usarla antes de declararla o
un `this` propio (métodos de objetos).

#### ¿`null` o `undefined`?

`undefined` es "nunca tuvo valor" (lo pone JS). `null` es "vacío a propósito" (lo ponés vos).

#### ¿`for…of` o `forEach`?

Hacen lo mismo. `for…of` permite `break`, `continue` y `await` adentro; `forEach` no.

#### ¿Por qué `this` vale `undefined` en mi función?

En una función flecha, `this` es el del lugar donde se escribió. En una función común depende
de **cómo** se la llama. Si pasás un método como callback, se pierde: usá una flecha
(`() => obj.metodo()`).

#### ¿Necesito jQuery?

No. Todo lo que hacía (seleccionar, eventos, pedidos) hoy viene incluido en JS.

## Fuentes

- [MDN: JavaScript (en español)](https://developer.mozilla.org/es/docs/Web/JavaScript)
- [javascript.info (en español)](https://es.javascript.info/)
- [MDN: Usando Fetch](https://developer.mozilla.org/es/docs/Web/API/Fetch_API/Using_Fetch)
- [MDN: Introducción al DOM](https://developer.mozilla.org/es/docs/Web/API/Document_Object_Model/Introduction)
- [JSONPlaceholder: API falsa para practicar `fetch`](https://jsonplaceholder.typicode.com/)
