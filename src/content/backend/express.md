## ¿Qué es?

**Express** es un framework minimalista para crear **servidores web y APIs** con Node.js. Se
encarga de recibir los pedidos HTTP, decidir qué código los atiende (**rutas**) y mandar la
respuesta.

Este machete usa **Express 5** con **TypeScript** corriendo directo en **Node 24** (ver el
cheatsheet de TypeScript).

### Cómo funciona la web: pedido y respuesta

```text
 Cliente (navegador, app, fetch)                     Servidor (Express)
 ───────────────────────────────                     ──────────────────
 GET /api/tareas/3        ───── request ─────►        busca la ruta que coincide
 Headers: Accept: json                                 ejecuta tu función
                          ◄──── response ─────        200 OK
                                                       { "id": 3, "titulo": "…" }
```

| Parte del pedido   | Ejemplo                               |
| ------------------ | ------------------------------------- |
| **Método**         | `GET`, `POST`, `PUT`, `PATCH`, `DELETE` |
| **Ruta** (_path_)  | `/api/tareas/3`                       |
| **Query string**   | `?pagina=2&orden=desc`                |
| **Headers**        | `Content-Type: application/json`, `Authorization: Bearer …` |
| **Body**           | `{ "titulo": "Estudiar" }` (en POST, PUT, PATCH) |

### ¿Qué es una API REST?

Una forma de organizar las URLs alrededor de **recursos** (tareas, usuarios) usando el método
HTTP para indicar la acción:

| Método   | Ruta              | Acción                         | Código si sale bien |
| -------- | ----------------- | ------------------------------ | ------------------- |
| `GET`    | `/api/tareas`     | Listar todas                   | `200 OK`            |
| `GET`    | `/api/tareas/:id` | Ver una                        | `200 OK`            |
| `POST`   | `/api/tareas`     | Crear                          | `201 Created`       |
| `PUT`    | `/api/tareas/:id` | Reemplazar entera              | `200 OK`            |
| `PATCH`  | `/api/tareas/:id` | Modificar algunos campos       | `200 OK`            |
| `DELETE` | `/api/tareas/:id` | Borrar                         | `204 No Content`    |

Las rutas usan **sustantivos en plural** (`/tareas`), no verbos (`/crearTarea`): el verbo es el
método.

## Instalación

```bash
mkdir mi-api && cd mi-api
npm init -y
npm install express
npm install --save-dev typescript @types/node @types/express
```

### `package.json`

```json
{
  "type": "module",
  "scripts": {
    "dev": "node --watch --env-file-if-exists=.env src/index.ts",
    "start": "node --env-file-if-exists=.env src/index.ts",
    "check": "tsc"
  }
}
```

- `--watch`: reinicia el servidor cada vez que guardás.
- `--env-file-if-exists=.env`: carga las variables del archivo `.env` (si existe) en
  `process.env`. No hace falta instalar `dotenv`.
- `npm run check`: chequea los tipos (Node no lo hace).

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

La explicación de cada opción está en el cheatsheet de TypeScript.

## Servidor mínimo

```ts
// src/index.ts
import express from "express";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());   // para poder leer JSON en req.body

app.get("/", (req, res) => {
  res.send("¡Hola desde Express!");
});

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
```

```bash
npm run dev
```

Abrí `http://localhost:3000` en el navegador. Para frenar el servidor: <kbd>Ctrl</kbd> +
<kbd>C</kbd>.

- `app` es tu aplicación.
- `app.get(ruta, función)` registra qué hacer con un `GET` a esa ruta.
- La función recibe **`req`** (el pedido) y **`res`** (la respuesta que vas a armar).
- Dentro de un callback de Express, TS **ya sabe** los tipos de `req` y `res`: no hace falta
  anotarlos.

## Rutas

```ts
app.get("/api/tareas", (req, res) => { /* listar */ });
app.post("/api/tareas", (req, res) => { /* crear */ });
app.put("/api/tareas/:id", (req, res) => { /* reemplazar */ });
app.patch("/api/tareas/:id", (req, res) => { /* modificar */ });
app.delete("/api/tareas/:id", (req, res) => { /* borrar */ });
app.all("/api/ping", (req, res) => { /* cualquier método */ });

// Varias rutas iguales con distinto método, encadenadas
app.route("/api/tareas/:id")
  .get((req, res) => { })
  .delete((req, res) => { });
```

### Parámetros en la ruta

```ts
app.get("/api/usuarios/:usuarioId/tareas/:tareaId", (req, res) => {
  const { usuarioId, tareaId } = req.params;   // strings: "7", "3"
  res.json({ usuarioId: Number(usuarioId), tareaId: Number(tareaId) });
});
```

### Sintaxis de rutas en Express 5

| Ruta                     | Coincide con                                  | `req.params`                      |
| ------------------------ | --------------------------------------------- | --------------------------------- |
| `/tareas/:id`            | `/tareas/3`                                   | `{ id: "3" }`                     |
| `/archivos{/:carpeta}`   | `/archivos` y `/archivos/fotos` (opcional)    | `{}` o `{ carpeta: "fotos" }`     |
| `/:archivo{.:ext}`       | `/foto` y `/foto.png`                         | `{ archivo: "foto", ext: "png" }` |
| `/static/*ruta`          | `/static/css/app.css` (todo lo que siga)      | `{ ruta: ["css", "app.css"] }`    |

> **Ojo:** en Express 4 se escribía `/*` y `/:id?`. En Express 5 eso **tira error**: los
> comodines necesitan nombre (`/*ruta`) y los opcionales van entre llaves (`{/:id}`). Muchos
> tutoriales todavía muestran la sintaxis vieja.

Las rutas se revisan **en el orden en que las escribiste**: la primera que coincide gana.
Poné las rutas específicas (`/tareas/pendientes`) **antes** que las genéricas (`/tareas/:id`).

## El pedido: `req`

```ts
app.get("/api/buscar", (req, res) => {
  req.method;               // "GET"
  req.path;                 // "/api/buscar"
  req.params;               // parámetros de la ruta (:id)
  req.query;                // query string: /api/buscar?q=perro&pagina=2 → { q: "perro", pagina: "2" }
  req.body;                 // cuerpo (necesita express.json())
  req.headers;              // todos los headers (en minúscula)
  req.get("Authorization"); // un header
  req.ip;                   // IP del cliente
});
```

> **Todo lo que llega es texto.** `req.params.id` es `"3"`, no `3`. `req.query.pagina` es
> `"2"`. Convertí con `Number()` y revisá que no dé `NaN`.

### Query strings

```ts
app.get("/api/tareas", (req, res) => {
  const pagina = Number(req.query.pagina) || 1;
  const orden = req.query.orden === "desc" ? "desc" : "asc";
  const texto = typeof req.query.q === "string" ? req.query.q : "";
  // ...
});
```

El tipo de `req.query.x` es `string | string[] | ParsedQs | … | undefined` (porque
`?q=a&q=b` manda un array). Por eso conviene revisar con `typeof`.

## La respuesta: `res`

```ts
res.send("texto o HTML");
res.json({ ok: true });                      // manda JSON (y pone el Content-Type)
res.status(201).json(nuevaTarea);            // código + JSON
res.sendStatus(204);                         // solo el código, sin cuerpo
res.status(404).json({ error: "No existe" });
res.redirect("/login");
res.sendFile("index.html", { root: "public" });
res.set("X-Total-Count", "42");              // agregar un header
res.cookie("tema", "oscuro", { httpOnly: true });
```

> **Regla:** **una sola respuesta por pedido**. Después de `res.json()` / `res.send()`, cortá
> con `return` para que no se siga ejecutando código que intente responder de nuevo.

```ts
app.get("/api/tareas/:id", (req, res) => {
  const tarea = tareas.find((t) => t.id === Number(req.params.id));
  if (!tarea) {
    return res.status(404).json({ error: "Tarea no encontrada" });   // return: corta acá
  }
  res.json(tarea);
});
```

### Códigos HTTP más usados

| Código | Nombre                  | Cuándo                                                  |
| ------ | ----------------------- | ------------------------------------------------------- |
| `200`  | OK                      | Salió bien (por defecto)                                |
| `201`  | Created                 | Se creó algo (POST)                                     |
| `204`  | No Content              | Salió bien y no hay nada que devolver (DELETE)          |
| `400`  | Bad Request             | Los datos que mandó el cliente están mal                |
| `401`  | Unauthorized            | No inició sesión / falta el token                       |
| `403`  | Forbidden               | Inició sesión, pero no tiene permiso                    |
| `404`  | Not Found               | No existe el recurso o la ruta                          |
| `409`  | Conflict                | Choca con algo que ya existe (email repetido)           |
| `422`  | Unprocessable Content   | Formato correcto, pero no pasa la validación            |
| `500`  | Internal Server Error   | Error en **tu** código                                  |

Resumen: **2xx** salió bien, **4xx** error del cliente, **5xx** error del servidor.

## Middlewares

Un **middleware** es una función que se ejecuta **en el medio**, antes de llegar a la ruta.
Puede leer o modificar `req` y `res`, responder y cortar, o pasar al siguiente con `next()`.

```text
request ─► express.json() ─► logger ─► verificarToken ─► ruta ─► response
                                             │
                                             └─► 401 (corta, no llama a next)
```

```ts
import express, { type Request, type Response, type NextFunction } from "express";

// Middleware propio: registra cada pedido
function logger(req: Request, res: Response, next: NextFunction) {
  const inicio = Date.now();
  res.on("finish", () => {
    console.log(`${req.method} ${req.originalUrl} → ${res.statusCode} (${Date.now() - inicio} ms)`);
  });
  next();                      // ¡sin esto el pedido queda colgado!
}

app.use(logger);               // para todas las rutas
app.use("/api", logger);       // solo para las que empiezan con /api
app.get("/api/admin", verificarToken, (req, res) => { });   // solo para esta ruta
```

### Middlewares que vienen con Express

| Middleware                                  | Para qué                                        |
| ------------------------------------------- | ----------------------------------------------- |
| `express.json()`                            | Lee bodies JSON → `req.body`                    |
| `express.urlencoded()`                      | Lee datos de un `<form>` HTML común → `req.body` |
| `express.static("public")`                  | Sirve archivos (HTML, CSS, imágenes) de una carpeta |

> **El orden importa.** Los middlewares se ejecutan en el orden de los `app.use()`. Ponelos
> **antes** de las rutas que los necesitan.

## Estructura de un proyecto

```text
mi-api/
├─ src/
│  ├─ index.ts            ← arranca el servidor (listen)
│  ├─ app.ts              ← crea la app, middlewares y rutas
│  ├─ tipos.ts            ← tipos compartidos
│  ├─ rutas/
│  │  └─ tareas.ts        ← un Router por recurso
│  └─ middlewares/
│     ├─ errores.ts
│     └─ validar.ts
├─ public/                ← archivos estáticos (opcional)
├─ .env                   ← variables de entorno (NO se sube a Git)
├─ .env.example           ← las mismas claves, sin valores reales (sí se sube)
├─ .gitignore
├─ package.json
└─ tsconfig.json
```

### Separar rutas con `Router`

```ts
// src/rutas/tareas.ts
import { Router } from "express";

export const tareasRouter = Router();

tareasRouter.get("/", (req, res) => { /* GET /api/tareas */ });
tareasRouter.get("/:id", (req, res) => { /* GET /api/tareas/:id */ });
```

```ts
// src/app.ts
import express from "express";
import { tareasRouter } from "./rutas/tareas.ts";

export const app = express();
app.use(express.json());
app.use("/api/tareas", tareasRouter);   // el prefijo se pone acá
```

```ts
// src/index.ts
import { app } from "./app.ts";

const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
```

## Ejemplo completo: CRUD de tareas

Guardado **en memoria** (se borra al reiniciar). Para que persista, el array se reemplaza por
una base de datos (ver el cheatsheet de MySQL).

```ts
// src/tipos.ts
export type Tarea = {
  id: number;
  titulo: string;
  hecha: boolean;
};

export type NuevaTarea = Omit<Tarea, "id">;
```

```ts
// src/rutas/tareas.ts
import { Router } from "express";
import type { Tarea } from "../tipos.ts";

export const tareasRouter = Router();

let tareas: Tarea[] = [
  { id: 1, titulo: "Aprender Express", hecha: false },
];
let siguienteId = 2;

// Valida lo que manda el cliente. El tipo no alcanza: el cliente puede mandar cualquier cosa.
function leerTitulo(body: unknown): string | null {
  if (typeof body !== "object" || body === null || !("titulo" in body)) return null;
  const { titulo } = body;
  if (typeof titulo !== "string" || titulo.trim() === "") return null;
  return titulo.trim();
}

// GET /api/tareas?hecha=true
tareasRouter.get("/", (req, res) => {
  const { hecha } = req.query;
  if (hecha === "true" || hecha === "false") {
    return res.json(tareas.filter((t) => t.hecha === (hecha === "true")));
  }
  res.json(tareas);
});

// GET /api/tareas/:id
tareasRouter.get("/:id", (req, res) => {
  const tarea = tareas.find((t) => t.id === Number(req.params.id));
  if (!tarea) return res.status(404).json({ error: "Tarea no encontrada" });
  res.json(tarea);
});

// POST /api/tareas   body: { "titulo": "…" }
tareasRouter.post("/", (req, res) => {
  const titulo = leerTitulo(req.body);
  if (!titulo) return res.status(400).json({ error: "Falta el título" });

  const nueva: Tarea = { id: siguienteId++, titulo, hecha: false };
  tareas.push(nueva);
  res.status(201).json(nueva);
});

// PATCH /api/tareas/:id   body: { "titulo"?: "…", "hecha"?: true }
tareasRouter.patch("/:id", (req, res) => {
  const tarea = tareas.find((t) => t.id === Number(req.params.id));
  if (!tarea) return res.status(404).json({ error: "Tarea no encontrada" });

  const body: unknown = req.body;
  if (typeof body !== "object" || body === null) {
    return res.status(400).json({ error: "Body inválido" });
  }
  if ("titulo" in body) {
    const titulo = leerTitulo(body);
    if (!titulo) return res.status(400).json({ error: "Título inválido" });
    tarea.titulo = titulo;
  }
  if ("hecha" in body) {
    if (typeof body.hecha !== "boolean") {
      return res.status(400).json({ error: "'hecha' tiene que ser true o false" });
    }
    tarea.hecha = body.hecha;
  }
  res.json(tarea);
});

// DELETE /api/tareas/:id
tareasRouter.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!tareas.some((t) => t.id === id)) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }
  tareas = tareas.filter((t) => t.id !== id);
  res.sendStatus(204);
});
```

> **Tip:** validar a mano se vuelve largo rápido. En proyectos reales se usa **Zod**: describís
> la forma del body una vez y te da la validación **y** el tipo de TypeScript.

### Tipar `req` a mano

Cuando la función del handler está separada (no escrita directo en `app.get`), TS no puede
deducir los tipos. `Request` acepta genéricos en este orden:

```ts
import type { Request, Response } from "express";
import type { NuevaTarea, Tarea } from "../tipos.ts";

type ParamsId = { id: string };
type ErrorApi = { error: string };

//                    Request<Params,   RespuestaBody,      Body,       Query>
export function crear(req: Request<{}, Tarea | ErrorApi, NuevaTarea>, res: Response<Tarea | ErrorApi>) {
  // req.body es NuevaTarea... según TS. Igual hay que validarlo.
}

export function verUna(req: Request<ParamsId>, res: Response) {
  req.params.id;   // string
}
```

## Manejo de errores

### 404 para rutas que no existen

Va **después** de todas las rutas: si ninguna coincidió, llega acá.

```ts
app.use((req, res) => {
  res.status(404).json({ error: `No existe ${req.method} ${req.originalUrl}` });
});
```

### Middleware de errores

Tiene **cuatro** parámetros (así Express sabe que es de errores) y va **al final de todo**.

```ts
// src/middlewares/errores.ts
import type { Request, Response, NextFunction } from "express";

export function manejarErrores(err: unknown, req: Request, res: Response, next: NextFunction) {
  console.error(err);
  const mensaje = err instanceof Error ? err.message : "Error desconocido";
  res.status(500).json({ error: "Error interno del servidor", detalle: mensaje });
}
```

```ts
// src/app.ts, al final
app.use(manejarErrores);
```

En producción no mandes `detalle` al cliente: puede mostrar información interna.

### Errores en funciones `async`

En **Express 5**, si una función `async` tira un error o una promesa falla, Express lo manda
**solo** al middleware de errores. No hace falta `try/catch` en cada ruta.

```ts
app.get("/api/usuarios/:id", async (req, res) => {
  const usuario = await buscarUsuarioEnLaBase(req.params.id);   // si falla → manejarErrores
  if (!usuario) return res.status(404).json({ error: "No existe" });
  res.json(usuario);
});
```

Para errores con código propio:

```ts
export class ErrorHttp extends Error {
  status: number;
  constructor(status: number, mensaje: string) {
    super(mensaje);
    this.status = status;
  }
}

// en una ruta
throw new ErrorHttp(403, "No tenés permiso");

// en manejarErrores
const status = err instanceof ErrorHttp ? err.status : 500;
```

## CORS

Por seguridad, el navegador **bloquea** los `fetch` a un dominio distinto al de la página, salvo
que el servidor lo permita. Tu front en `http://localhost:5173` y tu API en
`http://localhost:3000` son **orígenes distintos** (cambia el puerto).

```bash
npm install cors
npm install --save-dev @types/cors
```

```ts
import cors from "cors";

app.use(cors({ origin: "http://localhost:5173" }));   // solo tu front
// app.use(cors());                                    // cualquiera (solo para pruebas)
```

- CORS lo aplica **el navegador**. Desde Postman, `curl` u otro servidor no hay error de CORS.
- Se arregla **en el backend**, nunca en el front.

## Archivos estáticos

```ts
app.use(express.static("public"));
// public/index.html  →  http://localhost:3000/
// public/css/app.css →  http://localhost:3000/css/app.css

app.use("/uploads", express.static("uploads"));
// uploads/foto.jpg   →  http://localhost:3000/uploads/foto.jpg
```

La ruta `"public"` es relativa a la carpeta desde donde corrés `node` (la raíz del proyecto si
usás `npm run dev`).

## Variables de entorno

Datos que cambian según dónde corre la app (puerto, contraseña de la base de datos, claves) y
que **no** van en el código.

```text
# .env
PORT=3000
DB_PASSWORD=super-secreta
FRONTEND_URL=http://localhost:5173
```

```ts
const PORT = Number(process.env.PORT) || 3000;
const dbPassword = process.env.DB_PASSWORD;   // string | undefined

if (!dbPassword) {
  throw new Error("Falta DB_PASSWORD en el .env");   // mejor fallar al arrancar que después
}
```

- Se cargan con `node --env-file-if-exists=.env` (ya está en los scripts de arriba).
- Agregá `.env` al `.gitignore` y subí un `.env.example` con las claves vacías.
- Todos los valores son **strings**.

## Probar la API

### Desde el navegador

Solo sirve para `GET`: abrí `http://localhost:3000/api/tareas`.

### Con `curl` (terminal)

```bash
curl http://localhost:3000/api/tareas

curl -X POST http://localhost:3000/api/tareas \
  -H "Content-Type: application/json" \
  -d '{"titulo": "Probar la API"}'

curl -X DELETE http://localhost:3000/api/tareas/1 -i   # -i muestra el código y los headers
```

> **Windows:** en PowerShell usá `curl.exe` (no `curl`) y es más fácil mandar el body con un
> cliente gráfico.

### Con un cliente gráfico

**Thunder Client** o **REST Client** (extensiones de VS Code), **Bruno**, **Postman** o
**Insomnia**. Elegís método, URL, headers y body, y ves la respuesta.

### Desde el frontend

```ts
const respuesta = await fetch("http://localhost:3000/api/tareas", {
  method: "POST",
  headers: { "Content-Type": "application/json" },   // sin esto, req.body llega vacío
  body: JSON.stringify({ titulo: "Desde el front" }),
});

if (!respuesta.ok) {
  const { error } = await respuesta.json();
  throw new Error(error);
}

const tarea = await respuesta.json();
```

## Errores comunes

#### `req.body` es `undefined`

Falta `app.use(express.json())` **antes** de las rutas, o el cliente no mandó el header
`Content-Type: application/json`. En Express 5, sin body, `req.body` es `undefined` (en
Express 4 era `{}`).

#### `Cannot set headers after they are sent to the client`

Respondiste dos veces en el mismo pedido. Casi siempre falta un `return` antes de
`res.status(...).json(...)` dentro de un `if`.

#### `EADDRINUSE: address already in use :::3000`

Ya hay algo corriendo en ese puerto (seguramente otro `npm run dev` en otra terminal). Cerralo o
cambiá `PORT`.

#### El pedido queda "cargando" para siempre

Un middleware no llama a `next()` ni responde, o una ruta no responde en algún camino del
`if`.

#### `Access to fetch … has been blocked by CORS policy`

Falta configurar `cors` en el servidor con el origen de tu front.

#### `Missing parameter name at index 2: /*` o `Unexpected ? at index 4: /:id?`

Sintaxis de rutas de Express 4. En Express 5: `/*ruta` en vez de `/*`, y `{/:id}` en vez de
`/:id?`.

#### `Cannot GET /api/tarea`

La ruta no existe con ese método y ese path. Revisá plural/singular, el prefijo del `Router` y
el método (`GET` vs `POST`).

#### Cambié el código y no pasa nada

No estás corriendo con `--watch`, o el error de tipos no frena la ejecución: mirá la terminal
del servidor y corré `npm run check`.

## Preguntas frecuentes

#### ¿Express 4 o Express 5?

**5**: es la versión actual y maneja solo los errores de `async`. Si seguís un tutorial de
Express 4, casi todo funciona igual salvo la sintaxis de rutas con `*` y `?`.

#### ¿`app.use` o `app.get`?

`app.get` (y `post`, etc.) responde a **un método** y a la **ruta exacta**. `app.use` corre para
**todos los métodos** y para toda ruta que **empiece** con ese prefijo: es para middlewares y
routers.

#### ¿`res.send` o `res.json`?

Para una API, `res.json`: siempre manda JSON válido con el header correcto.

#### ¿`PUT` o `PATCH`?

`PUT` reemplaza el recurso entero (mandás todos los campos). `PATCH` cambia solo los campos que
mandás. En la práctica, `PATCH` es lo más usado para editar.

#### ¿Dónde guardo los datos de verdad?

En una base de datos (MySQL, PostgreSQL, MongoDB). El array en memoria es solo para aprender.

#### ¿Cómo hago login?

Lo típico: una ruta `POST /api/login` que revisa la contraseña (guardada con **bcrypt**, nunca
en texto plano) y devuelve un **token** (JWT) o crea una **sesión** con cookie. Después, un
middleware revisa el token en las rutas protegidas.

#### ¿Por qué no uso `ts-node` o `nodemon`?

Node 24 ya corre `.ts` y tiene `--watch`, que es lo que hacía `nodemon`. Menos dependencias.

## Fuentes

- [Documentación oficial de Express](https://expressjs.com/es/)
- [Migrar a Express 5 (cambios importantes)](https://expressjs.com/en/guide/migrating-5.html)
- [Express: manejo de errores](https://expressjs.com/en/guide/error-handling.html)
- [MDN: Códigos de estado HTTP](https://developer.mozilla.org/es/docs/Web/HTTP/Status)
- [MDN: CORS](https://developer.mozilla.org/es/docs/Web/HTTP/CORS)
- [Node.js: Ejecutar TypeScript de forma nativa](https://nodejs.org/en/learn/typescript/run-natively)
