---
title: Git
description: Versionar código, trabajar con ramas y sincronizar con GitHub.
badge: git
order: 3
tags: [cli, github]
updated: 2026-09-16
---

## ¿Qué es?

**Git** es un sistema de control de versiones: guarda "fotos" (_commits_) del proyecto para
poder volver atrás, ver qué cambió y trabajar en paralelo con **ramas**. **GitHub** es un sitio
que aloja repositorios de Git en internet.

```text
archivos ──add──► staging ──commit──► repo local ──push──► GitHub
```

## Configuración inicial

Se hace una sola vez por computadora.

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
git config --global init.defaultBranch main
```

## Flujo básico

### Crear o clonar un repo

```bash
git init                                   # convierte la carpeta actual en un repo
git clone https://github.com/usuario/repo  # descarga un repo existente
```

### Guardar cambios

```bash
git status                  # qué cambió y qué está listo para commitear
git add archivo.js          # agrega un archivo al staging
git add .                   # agrega todos los cambios
git commit -m "feat: agrega login"
```

### Ver el historial

```bash
git log --oneline --graph   # historial compacto, con las ramas dibujadas
git diff                    # cambios que todavía no agregaste con add
git diff --staged           # cambios que ya están en staging
```

## Ramas

| Comando                    | Qué hace                                  |
| -------------------------- | ----------------------------------------- |
| `git branch`               | Lista las ramas locales                   |
| `git switch -c nueva-rama` | Crea una rama y se mueve a ella           |
| `git switch main`          | Se mueve a `main`                         |
| `git merge nueva-rama`     | Trae los cambios de `nueva-rama` a la actual |
| `git branch -d nueva-rama` | Borra una rama ya mergeada                |

> **Tip:** trabajá cada funcionalidad en su propia rama y mergeala a `main` cuando funcione.

## Remotos (GitHub)

```bash
git remote add origin https://github.com/usuario/repo.git
git push -u origin main   # primer push: vincula la rama local con la remota
git push                  # los siguientes
git pull                  # trae y mergea los cambios del remoto
```

## Deshacer cosas

```bash
git restore archivo.js           # descarta cambios sin agregar de un archivo
git restore --staged archivo.js  # lo saca del staging (no pierde cambios)
git commit --amend -m "mensaje"  # corrige el último commit (si todavía no hiciste push)
git revert <hash>                # crea un commit nuevo que deshace otro (seguro después de push)
```

## Commits convencionales

Un prefijo en el mensaje que dice **qué tipo de cambio** es.

| Prefijo     | Cuándo                                   |
| ----------- | ---------------------------------------- |
| `feat:`     | Nueva funcionalidad                      |
| `fix:`      | Arreglo de un bug                        |
| `docs:`     | Solo documentación                       |
| `style:`    | Formato, sin cambiar la lógica           |
| `refactor:` | Reestructura código sin cambiar qué hace |
| `chore:`    | Configuración, dependencias, tareas      |

## .gitignore

Archivo con lo que Git **no** tiene que seguir:

```text
node_modules/
dist/
.env
```

## Fuentes

- [Pro Git (libro oficial, en español)](https://git-scm.com/book/es/v2)
- [Conventional Commits](https://www.conventionalcommits.org/es/v1.0.0/)
