---
title: TypeScript
description: JavaScript con tipos. Configuración para Node 24, tipos, uniones, genéricos y errores típicos.
badge: ts
order: 2
tags: [node, tipos, javascript]
updated: 2026-09-17
---

## ¿Qué es?

**TypeScript** (TS) es **JavaScript con tipos**. Escribís lo mismo que en JS, pero indicando qué
forma tienen los datos, y el editor te avisa los errores **antes** de ejecutar.

```ts
function saludar(nombre: string) {
  return `Hola, ${nombre.toUpperCase()}`;
}

saludar(42);
// ❌ Argument of type 'number' is not assignable to parameter of type 'string'.
```

Ideas clave:

- **Todo JS válido es TS válido.** Los tipos se agregan de a poco.
- Los tipos **desaparecen al ejecutar**: el navegador y Node corren JavaScript. TS no cambia
  cómo funciona tu programa; solo lo revisa.
- Por eso, un tipo **no valida datos que llegan de afuera** (un formulario, una API). Si el
  cliente manda otra cosa, TS no se entera: eso se valida en tiempo de ejecución.
- Hoy va por la **versión 7** (julio 2026), con el compilador reescrito en Go: chequea unas 10
  veces más rápido. Se instala y se usa igual que antes.

## Instalación y configuración (Node 24)

Desde **Node 24**, Node ejecuta archivos `.ts` directamente: **borra los tipos** y corre el JS
que queda (_type stripping_). No hace falta `ts-node` ni `tsx` para proyectos simples.

```bash
mkdir mi-proyecto && cd mi-proyecto
npm init -y
npm install --save-dev typescript @types/node
```

| Paquete        | Para qué                                                      |
| -------------- | ------------------------------------------------------------- |
| `typescript`   | El comando `tsc`, que **chequea** los tipos                   |
| `@types/node`  | Los tipos de Node (`process`, `fs`, `path`…)                  |

### `package.json`

```json
{
  "type": "module",
  "scripts": {
    "dev": "node --watch src/index.ts",
    "start": "node src/index.ts",
    "check": "tsc",
    "check:watch": "tsc --watch"
  }
}
```

- `"type": "module"` → usás `import` / `export`.
- `node --watch` reinicia el programa cada vez que guardás.
- `npm run check` busca errores de tipos. **Node no los chequea**: si hay un error de tipos,
  el programa igual corre. Corré `check` antes de commitear.

### `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "nodenext",
    "types": ["node"],
    "strict": true,
    "noEmit": true,
    "erasableSyntaxOnly": true,
    "verbatimModuleSyntax": true,
    "rewriteRelativeImportExtensions": true,
    "noUncheckedIndexedAccess": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}
```

| Opción                     | Qué hace                                                                 |
| -------------------------- | ------------------------------------------------------------------------ |
| `target: esnext`           | Asume JavaScript moderno (Node 24 lo soporta todo)                       |
| `module: nodenext`         | Resuelve los `import` igual que Node                                     |
| `types: ["node"]`          | Carga los tipos de Node. Desde TS 6 no se cargan solos: sin esto, `process` "no existe" |
| `strict`                   | Activa todos los chequeos importantes (ya viene activado desde TS 6)     |
| `noEmit`                   | `tsc` solo revisa; no genera archivos `.js` (Node corre los `.ts`)       |
| `erasableSyntaxOnly`       | Prohíbe lo que Node no sabe borrar (`enum`, `namespace`…)                |
| `verbatimModuleSyntax`     | Obliga a usar `import type` para los tipos                               |
| `rewriteRelativeImportExtensions` | Permite escribir `import "./archivo.ts"` con extensión            |
| `noUncheckedIndexedAccess` | `lista[0]` puede ser `undefined`: te obliga a revisarlo                  |
| `skipLibCheck`             | No revisa los tipos de las librerías (más rápido)                        |

### Reglas de Node al correr `.ts`

```ts
import { sumar } from "./utils.ts";          // ✅ la extensión es obligatoria
import { sumar } from "./utils";             // ❌ ERR_MODULE_NOT_FOUND

import type { Usuario } from "./tipos.ts";   // ✅ los tipos se importan con "type"
import { type Usuario, crearUsuario } from "./usuarios.ts";  // ✅ mezclado
```

Lo que **no** se puede usar (Node no sabe borrarlo): `enum`, `namespace` con código y las
_parameter properties_ de las clases. Abajo están las alternativas.

## Tipos básicos

```ts
let nombre: string = "Joaco";
let edad: number = 17;           // enteros y decimales: todo es number
let activo: boolean = true;
let nada: null = null;
let sinValor: undefined = undefined;

// Inferencia: TS deduce el tipo solo. Esto es lo más común:
let ciudad = "Buenos Aires";     // string
const pi = 3.14;                 // 3.14 (const: tipo literal exacto)

ciudad = 42;                     // ❌ Type 'number' is not assignable to type 'string'
```

> **Tip:** no anotes lo que TS ya deduce. Poné tipos en los **parámetros** de las funciones y
> donde los datos entran al programa; el resto dejalo inferir. Pasá el mouse por encima de una
> variable en VS Code para ver su tipo.

### `any`, `unknown` y `never`

| Tipo      | Significa                           | ¿Te deja usarlo sin revisar? |
| --------- | ----------------------------------- | ---------------------------- |
| `any`     | "Apagá el chequeo"                  | Sí (peligroso: evitalo)      |
| `unknown` | "No sé qué es todavía"              | No: primero tenés que revisarlo |
| `never`   | "Esto no puede pasar"               | —                            |

```ts
const dato: unknown = JSON.parse(texto);

dato.nombre;                         // ❌ 'dato' is of type 'unknown'
if (typeof dato === "object" && dato !== null && "nombre" in dato) {
  console.log(dato.nombre);          // ✅ ya lo revisaste
}
```

## Arrays y tuplas

```ts
const numeros: number[] = [1, 2, 3];
const nombres: Array<string> = ["Ana", "Juan"];     // otra forma de escribir lo mismo
const mezcla: (string | number)[] = [1, "dos"];

const punto: [number, number] = [10, 20];           // tupla: largo y tipos fijos
const entrada: [string, number] = ["edad", 17];

const soloLectura: readonly number[] = [1, 2];
soloLectura.push(3);                                 // ❌ no existe push en readonly

const primero = numeros[0];   // number | undefined (con noUncheckedIndexedAccess)
```

## Objetos: `type` e `interface`

```ts
type Usuario = {
  id: number;
  nombre: string;
  email?: string;              // ? = opcional (string | undefined)
  readonly creadoEn: Date;     // no se puede reasignar
};

interface Producto {
  id: number;
  titulo: string;
  precio: number;
}

const ana: Usuario = { id: 1, nombre: "Ana", creadoEn: new Date() };
ana.creadoEn = new Date();     // ❌ Cannot assign to 'creadoEn' because it is a read-only property
```

### ¿`type` o `interface`?

Para objetos, hacen casi lo mismo. Diferencias:

| | `type` | `interface` |
| --- | --- | --- |
| Objetos | ✅ | ✅ |
| Uniones (`"a" \| "b"`), tuplas, primitivos | ✅ | ❌ |
| Extender | `type B = A & { extra: string }` | `interface B extends A { extra: string }` |
| Se puede declarar dos veces y se fusiona | ❌ | ✅ |

Regla práctica: usá **`type`** para todo, salvo que una librería te pida extender una
`interface`. Lo importante es ser consistente.

### Extender y combinar

```ts
type ConId = { id: number };
type Tarea = ConId & { titulo: string; hecha: boolean };   // intersección: tiene todo

interface Animal { nombre: string }
interface Perro extends Animal { raza: string }
```

### Objetos con claves dinámicas

```ts
type Stock = Record<string, number>;          // { [clave: string]: number }
const stock: Stock = { manzana: 10, pera: 3 };

type Notas = { [materia: string]: number };   // lo mismo, escrito a mano
```

## Uniones y tipos literales

```ts
type Id = number | string;                       // puede ser cualquiera de los dos
type Estado = "pendiente" | "en-curso" | "hecha"; // solo esos tres textos exactos
type Dado = 1 | 2 | 3 | 4 | 5 | 6;

let estado: Estado = "pendiente";
estado = "terminada";   // ❌ Type '"terminada"' is not assignable to type 'Estado'
```

Las uniones de strings son la forma recomendada de reemplazar a `enum` (que Node no soporta
al ejecutar `.ts`).

### Narrowing: achicar el tipo revisando

Con una unión, TS solo te deja usar lo que tienen **todos** los tipos. Para usar lo específico,
revisás primero y TS "achica" el tipo dentro del `if`.

```ts
function formatearId(id: number | string) {
  if (typeof id === "number") {
    return id.toFixed(0);         // acá id es number
  }
  return id.toUpperCase();        // acá id es string
}

function largo(texto?: string) {
  if (!texto) return 0;           // descarta undefined y ""
  return texto.length;            // string
}

function procesar(valor: Date | string[]) {
  if (valor instanceof Date) return valor.getFullYear();
  if (Array.isArray(valor)) return valor.length;
}

function hablar(animal: { ladrar(): void } | { maullar(): void }) {
  if ("ladrar" in animal) animal.ladrar();
  else animal.maullar();
}
```

### Uniones discriminadas

Un campo en común (el "discriminante") dice cuál de las opciones es. Muy usado para
respuestas y estados.

```ts
type Resultado =
  | { ok: true; datos: Usuario[] }
  | { ok: false; error: string };

function mostrar(r: Resultado) {
  if (r.ok) {
    console.log(r.datos.length);   // TS sabe que existe datos
  } else {
    console.error(r.error);        // TS sabe que existe error
  }
}
```

Con `switch` y `never`, TS te avisa si te olvidaste de un caso:

```ts
type Forma =
  | { tipo: "circulo"; radio: number }
  | { tipo: "cuadrado"; lado: number };

function area(f: Forma): number {
  switch (f.tipo) {
    case "circulo":
      return Math.PI * f.radio ** 2;
    case "cuadrado":
      return f.lado ** 2;
    default: {
      const imposible: never = f;   // ❌ si agregás "triangulo" y no lo manejás
      return imposible;
    }
  }
}
```

## Funciones

```ts
function sumar(a: number, b: number): number {   // ": number" al final = lo que devuelve
  return a + b;
}

const multiplicar = (a: number, b: number) => a * b;   // el retorno se infiere

function saludar(nombre: string, saludo = "Hola") {    // con valor por defecto: string
  return `${saludo}, ${nombre}`;
}

function buscar(id: number, incluirBorrados?: boolean) { }   // opcional

function loguear(mensaje: string): void {   // void = no devuelve nada útil
  console.log(mensaje);
}

function fallar(mensaje: string): never {   // never = nunca termina normalmente
  throw new Error(mensaje);
}

function promedio(...notas: number[]) {     // rest
  return notas.reduce((a, b) => a + b, 0) / notas.length;
}
```

### Funciones como tipo (callbacks)

```ts
type Comparador = (a: number, b: number) => number;

const ascendente: Comparador = (a, b) => a - b;   // a y b se infieren como number

function repetir(veces: number, accion: (i: number) => void) {
  for (let i = 0; i < veces; i++) accion(i);
}
```

### Parámetros como objeto

```ts
type OpcionesListado = {
  pagina?: number;
  porPagina?: number;
  orden?: "asc" | "desc";
};

function listar({ pagina = 1, porPagina = 20, orden = "asc" }: OpcionesListado = {}) {
  // ...
}

listar({ orden: "desc" });
```

### Funciones async

```ts
async function obtenerUsuario(id: number): Promise<Usuario> {
  const respuesta = await fetch(`https://api.ejemplo.com/usuarios/${id}`);
  if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);
  return (await respuesta.json()) as Usuario;   // ⚠️ "confío en que la API manda esto"
}
```

`response.json()` devuelve `Promise<any>`: TS **no sabe** qué te manda la API. El `as Usuario`
es una promesa tuya, no un chequeo. Para validar de verdad se usan librerías como **Zod**.

## Genéricos

Un **genérico** es un tipo que recibe otro tipo como parámetro, como una función recibe
valores. Sirve para escribir código reutilizable sin perder información.

```ts
// Sin genérico: devuelve unknown y perdés el tipo
function primeroMalo(lista: unknown[]) {
  return lista[0];
}

// Con genérico: T es "el tipo que sea que venga"
function primero<T>(lista: T[]): T | undefined {
  return lista[0];
}

const n = primero([1, 2, 3]);        // number | undefined
const s = primero(["a", "b"]);       // string | undefined
```

```ts
// En tipos
type RespuestaApi<T> = {
  datos: T;
  pagina: number;
  total: number;
};

type ListaUsuarios = RespuestaApi<Usuario[]>;

// Con restricción: T tiene que tener id
function buscarPorId<T extends { id: number }>(items: T[], id: number) {
  return items.find((item) => item.id === id);
}
```

Ya usás genéricos sin darte cuenta: `Array<string>`, `Promise<Usuario>`, `Record<string, number>`.

## Utility types

Tipos que vienen con TS para **transformar** otros tipos.

```ts
type Usuario = {
  id: number;
  nombre: string;
  email: string;
  password: string;
};
```

| Utility                     | Resultado                                        | Uso típico                           |
| --------------------------- | ------------------------------------------------ | ------------------------------------ |
| `Partial<Usuario>`          | Todas las propiedades opcionales                 | Datos para **actualizar** (PATCH)    |
| `Required<T>`               | Todas obligatorias                               |                                      |
| `Readonly<T>`               | Todas de solo lectura                            | Configuración                        |
| `Pick<Usuario, "id" \| "nombre">` | Solo esas propiedades                      | Una vista reducida                   |
| `Omit<Usuario, "password">` | Todas menos esas                                 | Lo que se **devuelve** al cliente    |
| `Omit<Usuario, "id">`       | Todo menos `id`                                  | Datos para **crear**                 |
| `Record<K, V>`              | Objeto con claves `K` y valores `V`              | Diccionarios                         |
| `ReturnType<typeof fn>`     | El tipo que devuelve una función                 |                                      |
| `Awaited<Promise<T>>`       | `T`                                              | Lo que da un `await`                 |
| `NonNullable<T>`            | Saca `null` y `undefined`                        |                                      |

```ts
type NuevoUsuario = Omit<Usuario, "id">;
type UsuarioPublico = Omit<Usuario, "password">;
type CambiosUsuario = Partial<NuevoUsuario>;
```

## Trucos con `typeof`, `keyof`, `as const` y `satisfies`

```ts
// typeof: saca el tipo de un VALOR
const configInicial = { puerto: 3000, host: "localhost" };
type Config = typeof configInicial;   // { puerto: number; host: string }

// keyof: la unión de las claves de un tipo
type ClaveUsuario = keyof Usuario;    // "id" | "nombre" | "email" | "password"

function obtener<T, K extends keyof T>(obj: T, clave: K): T[K] {
  return obj[clave];
}
```

### `as const`: la alternativa a `enum`

```ts
const ROLES = ["alumno", "profe", "admin"] as const;   // readonly y con valores exactos
type Rol = (typeof ROLES)[number];                     // "alumno" | "profe" | "admin"

const ESTADO = {
  PENDIENTE: "pendiente",
  HECHA: "hecha",
} as const;
type Estado = (typeof ESTADO)[keyof typeof ESTADO];    // "pendiente" | "hecha"

ESTADO.PENDIENTE;   // se usa como un enum, y existe al ejecutar
ROLES.includes(valor as Rol);   // se puede recorrer
```

### `satisfies`: chequear sin perder el tipo exacto

```ts
type Colores = Record<string, `#${string}`>;

const colores = {
  backend: "#a6e22e",
  frontend: "#f06be0",
} satisfies Colores;        // ✅ revisa que cumpla Colores…

colores.backend;            // …y TS sigue sabiendo que existe "backend"
colores.hardware;           // ❌ no existe (con ": Colores" no te hubiera avisado)
```

## Clases

```ts
class Cuenta {
  readonly titular: string;
  private saldo = 0;             // private: solo accesible dentro de la clase (lo chequea TS)
  #pin: string;                  // # = privado de verdad, también al ejecutar

  constructor(titular: string, pin: string) {
    this.titular = titular;
    this.#pin = pin;
  }

  depositar(monto: number): void {
    if (monto <= 0) throw new Error("Monto inválido");
    this.saldo += monto;
  }

  get total(): number {
    return this.saldo;
  }
}

interface Notificador {
  enviar(mensaje: string): Promise<void>;
}

class NotificadorEmail implements Notificador {   // implements: TS revisa que cumpla
  async enviar(mensaje: string) {
    console.log("Mail:", mensaje);
  }
}
```

> **Ojo:** la forma corta `constructor(private saldo: number) {}` (_parameter property_) **no
> funciona** al correr `.ts` con Node. Declará la propiedad y asignala en el constructor.

## Chequeos de `null` y `undefined`

Con `strict`, TS te obliga a considerar que algo puede no existir.

```ts
const usuario = usuarios.find((u) => u.id === 1);   // Usuario | undefined

usuario.nombre;              // ❌ 'usuario' is possibly 'undefined'

if (usuario) usuario.nombre; // ✅ narrowing
usuario?.nombre;             // ✅ string | undefined
usuario?.nombre ?? "Anónimo"; // ✅ string
usuario!.nombre;             // ⚠️ "te juro que existe": si no, explota al ejecutar
```

## Módulos y librerías

```ts
// tipos.ts
export type Tarea = { id: number; titulo: string; hecha: boolean };

// tareas.ts
import type { Tarea } from "./tipos.ts";
export const tareas: Tarea[] = [];
```

Muchas librerías traen sus tipos incluidos. Las que no, los tienen en paquetes `@types/…`:

```bash
npm install express
npm install --save-dev @types/express
```

Si el editor dice `Could not find a declaration file for module 'x'`, buscá si existe
`@types/x`.

## Errores comunes

#### `Type 'X' is not assignable to type 'Y'` (TS2322)

El valor no tiene la forma que el tipo pide. Leé el mensaje **de abajo hacia arriba**: la
última línea dice qué propiedad concreta no coincide.

#### `Argument of type 'X' is not assignable to parameter of type 'Y'` (TS2345)

Lo mismo, pero al llamar una función. Muy común: `Number(input)` que falta, o
`string | undefined` pasado donde va `string`.

#### `'x' is possibly 'undefined'` (TS18048)

Revisalo antes con un `if`, `?.` o `??`.

#### `Property 'x' does not exist on type 'Y'` (TS2339)

Nombre mal escrito, o la propiedad falta en el tipo. Si es una unión, primero hacé narrowing.

#### `Parameter 'x' implicitly has an 'any' type` (TS7006)

A un parámetro le falta el tipo y TS no lo puede deducir. Anotalo.

#### `Cannot find name 'process'`

Faltan `@types/node` o `"types": ["node"]` en el `tsconfig.json`.

#### Node: `ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX` / `… is not supported in strip-only mode`

Usaste `enum`, `namespace` o una _parameter property_. Reemplazalos por `as const`, módulos y
propiedades comunes. `erasableSyntaxOnly` te avisa esto en el editor.

#### Node: `does not provide an export named 'Usuario'`

Importaste un **tipo** sin `import type`. Node borra los tipos, así que ese export no existe al
ejecutar.

#### `'error' is of type 'unknown'` (TS18046)

En un `catch`, el error es `unknown` (se puede lanzar cualquier cosa). Revisalo:

```ts
try {
  // ...
} catch (error) {
  const mensaje = error instanceof Error ? error.message : String(error);
  console.error(mensaje);
}
```

## Preguntas frecuentes

#### ¿Tengo que aprender JavaScript primero?

Sí, lo básico. TS no reemplaza a JS: le agrega tipos arriba. Si entendés JS, TS se aprende
rápido.

#### ¿El programa corre si hay errores de tipos?

Sí. Node borra los tipos sin mirarlos. Por eso existe `npm run check` (`tsc`): usalo seguido y
antes de cada commit.

#### ¿Por qué no uso `any` y listo?

Porque apaga justo lo que TS hace por vos. Si no sabés el tipo, usá `unknown` y revisalo.

#### ¿Cuándo uso `as`?

Lo menos posible: le dice a TS "confiá en mí" y saltea el chequeo. Es aceptable con datos que
vienen de afuera **si** los validás, o con `as const`.

#### ¿Necesito compilar a `.js` para producción?

Con Node 24 no hace falta para un backend simple: corre los `.ts`. Si alguna vez lo necesitás
(otra plataforma, código con `enum`), se saca `noEmit`, se agrega `"outDir": "dist"` y `tsc`
genera los `.js`.

#### ¿Y `ts-node` o `tsx`?

Herramientas que ejecutan `.ts` antes de que Node lo soportara. `tsx` sigue siendo útil si
necesitás sintaxis que Node no puede borrar, pero para empezar no hace falta.

#### ¿TypeScript sirve para el frontend también?

Sí: Astro, Next.js, React y Vite lo soportan directamente. Este mismo sitio está hecho con TS.

## Fuentes

- [Documentación oficial de TypeScript](https://www.typescriptlang.org/docs/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Playground (probar en el navegador)](https://www.typescriptlang.org/play)
- [Node.js: Ejecutar TypeScript de forma nativa](https://nodejs.org/en/learn/typescript/run-natively)
- [Node.js: Módulos TypeScript (limitaciones)](https://nodejs.org/api/typescript.html)
- [Novedades de TypeScript 6.0 (nuevos valores por defecto)](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-6-0.html)
- [Total TypeScript: tutoriales gratis](https://www.totaltypescript.com/tutorials)
