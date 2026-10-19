## ¿Qué es?

**Git** es un sistema de **control de versiones**: guarda "fotos" del proyecto (_commits_) para
que puedas volver atrás, ver qué cambió, quién lo cambió y trabajar en paralelo con **ramas** sin
romper lo que ya anda.

**GitHub** es un sitio que aloja repositorios de Git en internet. Git funciona sin GitHub (todo
es local); GitHub suma copia en la nube, colaboración y _Pull Requests_. Alternativas: GitLab,
Bitbucket.

## Conceptos clave

### Las tres zonas

```text
 carpeta de trabajo ──git add──► staging ──git commit──► repositorio local ──git push──► GitHub
 (lo que editás)                 (lo que va                (el historial,                (remoto)
                                  al próximo commit)        en .git/)
        ◄──────────────────────────────── git pull ◄────────────────────────────────────
```

| Término              | Qué es                                                                   |
| -------------------- | ------------------------------------------------------------------------ |
| **Repositorio**      | Carpeta con historial. Todo vive en la subcarpeta oculta `.git/`.        |
| **Carpeta de trabajo** | Los archivos tal como están ahora en tu disco.                         |
| **Staging** (_index_) | "Sala de espera": lo que elegiste con `git add` para el próximo commit. |
| **Commit**           | Una foto del proyecto con un mensaje, un autor, una fecha y un **hash**. |
| **Hash**             | Identificador único del commit, como `a1b2c3d` (se puede usar abreviado). |
| **Rama** (_branch_)  | Una línea de commits. Es solo un puntero con nombre al último commit.    |
| **`HEAD`**           | "Dónde estás parado": normalmente apunta a la rama actual.               |
| **Remoto**           | Una copia del repo en otro lugar. **`origin`** es el nombre por defecto. |
| **`origin/main`**    | Lo último que sabés de la rama `main` del remoto (se actualiza con `fetch`). |

### Estados de un archivo

| Estado en `git status`   | Significa                                              |
| ------------------------ | ------------------------------------------------------ |
| _Untracked_              | Archivo nuevo que Git nunca vio                        |
| _Changes not staged_     | Modificado, pero todavía no le hiciste `add`           |
| _Changes to be committed_ | Está en staging: va a entrar en el próximo commit     |
| _nothing to commit, working tree clean_ | Todo guardado                           |

## Configuración inicial

Se hace **una sola vez por computadora**.

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"      # el mismo mail que en GitHub
git config --global init.defaultBranch main
git config --global core.editor "code --wait"      # usa VS Code para los mensajes largos
git config --global pull.rebase false              # git pull hace merge (lo más simple)

git config --list                                  # ver la configuración
```

> **Tip (Windows):** `git config --global core.autocrlf true` evita que cada archivo aparezca
> "modificado" por la diferencia de fin de línea entre Windows y Linux.

## Crear o clonar un repo

```bash
git init                                        # convierte la carpeta actual en un repo
git clone https://github.com/usuario/repo.git   # descarga un repo con todo su historial
git clone https://github.com/usuario/repo.git mi-carpeta   # con otro nombre de carpeta
```

> **Ojo:** no hagas `git init` adentro de una carpeta que ya está dentro de otro repo, ni en tu
> carpeta de usuario. Si lo hiciste por error, borrá la carpeta `.git/` que se creó.

## Guardar cambios

```bash
git status                     # qué cambió y qué está en staging (usalo todo el tiempo)
git add archivo.js             # agrega un archivo al staging
git add src/                   # agrega una carpeta entera
git add .                      # agrega todos los cambios desde la carpeta actual
git add -p                     # elige pedacito por pedacito qué agregar

git commit -m "feat: agrega login"
git commit                     # abre el editor para escribir un mensaje largo
git commit -am "fix: typo"     # add + commit de archivos YA seguidos (no incluye nuevos)
```

### ¿Qué es un buen commit?

- **Un cambio lógico por commit**: "agrega el formulario de login", no "cambios varios".
- Mensaje en presente e imperativo, que complete la frase "este commit…": `agrega`, `corrige`.
- Hacé commits **chicos y seguidos**: es más fácil volver atrás.

### Mover y borrar archivos

```bash
git mv viejo.js nuevo.js       # renombra y Git lo registra como renombre
git rm archivo.js              # lo borra del disco y del repo
git rm --cached archivo.js     # deja de seguirlo, pero NO lo borra del disco
```

## Ver el historial

```bash
git log                        # historial completo (salí con q)
git log --oneline --graph --all   # compacto, con todas las ramas dibujadas
git log -5                     # los últimos 5
git log -- archivo.js          # solo commits que tocaron ese archivo
git log --author="Ana"

git show a1b2c3d               # qué cambió en ese commit
git diff                       # cambios que todavía NO están en staging
git diff --staged              # cambios que SÍ están en staging
git diff main..mi-rama         # diferencias entre dos ramas
git blame archivo.js           # quién cambió cada línea y en qué commit
```

> **Tip:** `git log`, `git diff` y otros se abren en un visor. Moverse: flechas o
> <kbd>Espacio</kbd>. Salir: <kbd>q</kbd>.

## Ramas

Una rama te deja probar algo sin tocar `main`. Si sale bien, la unís; si sale mal, la borrás.

```text
main:        A───B───────E        (E = merge)
                  \     /
mi-rama:           C───D
```

| Comando                          | Qué hace                                         |
| -------------------------------- | ------------------------------------------------ |
| `git branch`                     | Lista las ramas locales (la actual tiene `*`)    |
| `git branch -a`                  | Incluye las remotas                              |
| `git switch -c nueva-rama`       | Crea una rama y se mueve a ella                  |
| `git switch main`                | Se mueve a `main`                                |
| `git switch -`                   | Vuelve a la rama anterior                        |
| `git branch -m nuevo-nombre`     | Renombra la rama actual                          |
| `git branch -d nueva-rama`       | Borra una rama ya mergeada                       |
| `git branch -D nueva-rama`       | La borra **aunque no esté mergeada** (se pierden sus commits) |

> **Tip:** `git switch` es el comando moderno para cambiar de rama. En tutoriales viejos vas a
> ver `git checkout nombre` y `git checkout -b nombre`: hacen lo mismo.

### Flujo típico con una rama

```bash
git switch main
git pull                          # arrancá desde lo último
git switch -c feat/formulario     # rama para la funcionalidad
# ...editás, git add, git commit (varias veces)...
git push -u origin feat/formulario
# en GitHub: abrís un Pull Request y lo mergeás
git switch main
git pull                          # traés el merge
git branch -d feat/formulario     # limpiás
```

## Merge y conflictos

```bash
git switch main
git merge mi-rama        # trae los commits de mi-rama a main
```

- Si `main` no cambió desde que creaste la rama, Git solo "adelanta" el puntero
  (**fast-forward**) y no hay commit de merge.
- Si las dos ramas cambiaron, crea un **commit de merge**.
- Si las dos cambiaron **las mismas líneas**, hay un **conflicto**: Git no sabe cuál quedarse.

### Resolver un conflicto paso a paso

1. Git avisa: `CONFLICT (content): Merge conflict in index.html`.
2. `git status` lista los archivos en conflicto (_both modified_).
3. Abrí el archivo. Vas a ver esto:

```text
<<<<<<< HEAD
<h1>Bienvenido</h1>
=======
<h1>Hola, bienvenida</h1>
>>>>>>> mi-rama
```

| Parte                   | Es                                  |
| ----------------------- | ----------------------------------- |
| Entre `<<<<<<<` y `=======` | Lo que hay en tu rama actual (`HEAD`) |
| Entre `=======` y `>>>>>>>` | Lo que viene de la otra rama        |

4. Editá dejando el resultado final que querés (una versión, la otra o una mezcla) y **borrá las
   tres líneas de marcas**. VS Code muestra botones _Accept Current / Incoming / Both_.
5. Marcalo como resuelto y terminá el merge:

```bash
git add index.html
git commit               # Git ya propone el mensaje "Merge branch 'mi-rama'"
```

Para cancelar todo y volver a como estabas antes del merge:

```bash
git merge --abort
```

> **Tip:** los conflictos no son errores ni rompen nada. Son Git preguntándote qué hacer.
> Para tener menos: commits chicos, `git pull` seguido y ramas que duren poco.

### ¿Y `rebase`?

`git rebase main` "muda" tus commits para que queden encima de lo último de `main`, dejando un
historial en línea recta. Es útil, pero reescribe commits: **no hagas rebase de commits que ya
subiste y otra persona usa**. Para empezar, alcanza con `merge`.

## Remotos: fetch, pull y push

```bash
git remote -v                                            # lista los remotos
git remote add origin https://github.com/usuario/repo.git
git remote set-url origin https://github.com/usuario/otro.git   # cambiar la URL

git push -u origin main    # primer push de una rama: la sube y la vincula (-u)
git push                   # los siguientes

git fetch                  # descarga novedades del remoto SIN tocar tus archivos
git pull                   # fetch + merge: descarga Y aplica en tu rama

git push origin --delete vieja-rama   # borra una rama en GitHub
```

| Comando     | Descarga | Cambia tus archivos | Cuándo                                    |
| ----------- | -------- | ------------------- | ----------------------------------------- |
| `git fetch` | Sí       | No                  | Ver qué hay nuevo antes de mezclarlo      |
| `git pull`  | Sí       | Sí                  | Actualizar tu rama con lo del remoto      |
| `git push`  | —        | —                   | Subir tus commits                         |

## GitHub

### Autenticarse

GitHub **no acepta tu contraseña** al hacer `push` por HTTPS. Opciones, de la más fácil a la
más manual:

1. **GitHub CLI:** instalá `gh` y corré `gh auth login`. Configura todo solo.
2. **Git Credential Manager** (viene con Git para Windows): la primera vez abre el navegador
   para iniciar sesión.
3. **Token personal:** GitHub → _Settings → Developer settings → Personal access tokens_. Se
   pega en lugar de la contraseña.
4. **SSH:**

```bash
ssh-keygen -t ed25519 -C "tu@email.com"   # genera la clave (Enter a todo)
cat ~/.ssh/id_ed25519.pub                 # copiá esto en GitHub → Settings → SSH keys
ssh -T git@github.com                     # probar la conexión
git remote set-url origin git@github.com:usuario/repo.git
```

### Subir un proyecto que ya tenés

1. En GitHub: _New repository_, **sin** README ni `.gitignore` (así no hay conflicto).
2. En tu carpeta:

```bash
git init
git add .
git commit -m "chore: primer commit"
git branch -M main
git remote add origin https://github.com/usuario/repo.git
git push -u origin main
```

### Pull Requests y forks

- **Pull Request (PR):** pedido para mergear una rama en otra. Sirve para revisar el código
  antes de que entre a `main`. Se abre en GitHub después de hacer `push` de tu rama.
- **Fork:** tu copia de un repo **ajeno**, para proponer cambios sin tener permiso de escritura.

```text
fork en GitHub → git clone de TU fork → rama → commits → push a tu fork → PR al repo original
```

Para traer las novedades del repo original a tu fork:

```bash
git remote add upstream https://github.com/autor-original/repo.git
git fetch upstream
git switch main
git merge upstream/main
```

## Guardar para después: stash

Tenés cambios a medias y necesitás cambiar de rama o hacer `pull`:

```bash
git stash                    # guarda los cambios y deja la carpeta limpia
git stash -u                 # incluye archivos nuevos (untracked)
git stash list               # ver lo guardado
git stash pop                # recupera lo último y lo saca de la lista
git stash apply              # recupera sin sacarlo de la lista
git stash drop               # descarta lo último
```

## Deshacer cosas

| Quiero…                                                    | Comando                               | ¿Peligroso? |
| ---------------------------------------------------------- | ------------------------------------- | ----------- |
| Descartar cambios de un archivo (sin `add`)                | `git restore archivo.js`              | ⚠️ Se pierden |
| Sacar un archivo del staging (sin perder cambios)          | `git restore --staged archivo.js`     | No          |
| Cambiar el mensaje o sumar algo al **último** commit       | `git commit --amend`                  | Solo antes de `push` |
| Deshacer el último commit, dejando los cambios en staging  | `git reset --soft HEAD~1`             | No          |
| Deshacer el último commit, dejando los cambios sin `add`   | `git reset HEAD~1`                    | No          |
| Borrar el último commit **y sus cambios**                  | `git reset --hard HEAD~1`             | ⚠️ Sí       |
| Deshacer un commit que ya subiste                          | `git revert <hash>`                   | No: crea un commit nuevo |
| Volver todo al último commit                               | `git reset --hard`                    | ⚠️ Sí       |
| Borrar archivos nuevos sin seguir                          | `git clean -n` (ver) → `git clean -fd` | ⚠️ Sí      |

`HEAD~1` significa "un commit antes de `HEAD`"; `HEAD~3`, tres antes.

### Mirar un commit viejo

```bash
git switch --detach a1b2c3d   # tus archivos quedan como en ese commit
git switch main               # volver
```

Mientras estás ahí, Git dice _detached HEAD_: podés mirar y probar, pero si querés guardar
cambios creá una rama (`git switch -c rescate`).

### Recuperar algo "perdido"

`git reflog` lista **todo** lo que hizo `HEAD` (incluso commits borrados con `reset`):

```bash
git reflog                   # buscá el hash de antes del error
git reset --hard a1b2c3d     # volvé a ese punto
```

> **Regla de oro:** `reset`, `--amend` y `rebase` reescriben la historia. Usalos solo en commits
> que **todavía no subiste**. Para lo que ya está en GitHub, usá `revert`.

## .gitignore

Archivo en la raíz del repo con lo que Git **no** tiene que seguir.

```text
# Dependencias (se reinstalan con npm install)
node_modules/

# Builds
dist/
build/

# Variables de entorno: ¡contraseñas y claves!
.env
.env.*
!.env.example

# Sistema y editor
.DS_Store
Thumbs.db
.vscode/*
!.vscode/extensions.json

# Logs
*.log
```

| Patrón            | Ignora                                           |
| ----------------- | ------------------------------------------------ |
| `archivo.txt`     | Ese archivo, en cualquier carpeta                |
| `carpeta/`        | Esa carpeta entera                               |
| `*.log`           | Todo lo que termine en `.log`                    |
| `/config.js`      | Solo el de la raíz                               |
| `!importante.log` | Excepción: este **sí** se sigue                  |
| `# texto`         | Comentario                                       |

Si el archivo **ya estaba commiteado**, agregarlo al `.gitignore` no alcanza:

```bash
git rm --cached .env          # deja de seguirlo (no lo borra del disco)
git commit -m "chore: deja de seguir .env"
```

> **Ojo:** si subiste una contraseña o clave a GitHub, borrarla con un commit **no alcanza**:
> queda en el historial. Cambiá la clave (generá una nueva) cuanto antes.

## Commits convencionales

Un prefijo en el mensaje que dice **qué tipo de cambio** es. Ordena el historial y permite
generar changelogs automáticos.

```text
tipo(alcance opcional): descripción corta

Cuerpo opcional explicando el porqué.
```

| Prefijo     | Cuándo                                         | Ejemplo                                   |
| ----------- | ---------------------------------------------- | ----------------------------------------- |
| `feat:`     | Nueva funcionalidad                            | `feat: agrega buscador`                   |
| `fix:`      | Arreglo de un bug                              | `fix(login): valida email vacío`          |
| `docs:`     | Solo documentación                             | `docs(backend): agrega cheatsheet de git` |
| `style:`    | Formato, sin cambiar la lógica                 | `style: aplica prettier`                  |
| `refactor:` | Reestructura código sin cambiar qué hace       | `refactor: separa rutas en archivos`      |
| `test:`     | Tests                                          | `test: agrega tests del carrito`          |
| `chore:`    | Configuración, dependencias, tareas            | `chore: actualiza astro`                  |

## Errores comunes

#### `fatal: not a git repository`

No estás dentro de un repo. Revisá la carpeta con `pwd` / `ls`, o hacé `git init`.

#### `! [rejected] main -> main (fetch first)` o `non-fast-forward`

El remoto tiene commits que vos no tenés. Traelos primero y después subí:

```bash
git pull
git push
```

**No** uses `git push --force` para "arreglarlo": pisa el trabajo de otras personas.

#### `error: Your local changes would be overwritten by checkout/merge`

Tenés cambios sin commitear que chocan. Hacé commit, o `git stash` → la operación →
`git stash pop`.

#### `fatal: refusing to merge unrelated histories`

Creaste el repo en GitHub **con** README y también hiciste `git init` local. Solución:

```bash
git pull origin main --allow-unrelated-histories
```

#### `Support for password authentication was removed`

GitHub ya no acepta contraseña. Ver [Autenticarse](#autenticarse).

#### Se abrió una pantalla rara al hacer `git commit` (Vim)

Te falta el `-m`. Para salir guardando: <kbd>Esc</kbd>, escribí `:wq` y <kbd>Enter</kbd>. Para
que no pase más: `git config --global core.editor "code --wait"`.

#### `src refspec main does not match any`

Intentaste hacer `push` sin haber hecho ningún commit, o tu rama se llama `master`. Revisá con
`git branch`.

#### Subí `node_modules/` por error

Agregalo al `.gitignore`, `git rm -r --cached node_modules` y commit.

## Preguntas frecuentes

#### ¿Cada cuánto hago commit?

Cada vez que algo funciona y podrías describirlo en una frase. Mejor muchos commits chicos
que uno gigante.

#### ¿`git add .` o archivo por archivo?

`git add .` es cómodo, pero mirá antes `git status` para no incluir cosas que no querías.

#### ¿Qué diferencia hay entre `main` y `master`?

Ninguna técnica: es solo el nombre de la rama principal. Hoy se usa `main` por defecto.

#### ¿`git pull` o `git fetch`?

`pull` si querés actualizarte ya. `fetch` si primero querés mirar qué cambió
(`git log main..origin/main`).

#### ¿Git guarda archivos vacíos o carpetas vacías?

Carpetas vacías no. Si necesitás que exista, poné adentro un archivo vacío llamado `.gitkeep`.

#### ¿Puedo usar Git desde VS Code?

Sí: la pestaña _Source Control_ (<kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>G</kbd>) hace add,
commit, push, pull y resuelve conflictos con botones. Igual conviene saber los comandos para
entender qué pasa.

#### ¿Borré un archivo sin querer, lo recupero?

Si estaba commiteado: `git restore archivo.js`. Si nunca lo commiteaste, Git no lo tiene.

## Fuentes

- [Pro Git (libro oficial, en español)](https://git-scm.com/book/es/v2)
- [Referencia de comandos de Git](https://git-scm.com/docs)
- [GitHub Docs: Autenticación](https://docs.github.com/es/authentication)
- [Conventional Commits](https://www.conventionalcommits.org/es/v1.0.0/)
- [Oh Shit, Git!?! (cómo salir de los líos típicos)](https://ohshitgit.com/es)
- [gitignore.io: generador de `.gitignore`](https://www.toptal.com/developers/gitignore)
