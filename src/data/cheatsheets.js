// Las carpetas y los cheatsheets de NoteFast.
// Para agregar uno: sumalo en `files` (slug = nombre del archivo sin .md, icon = logo en public/icons)
// y, si ya tiene contenido, escribilo en src/data/content.js con la clave "carpeta/slug".

export const FOLDERS = [
  {
    id: 'backend',
    label: 'Backend',
    description: 'Servidores, APIs, bases de datos y control de versiones.',
    topics: 'Node · TypeScript · Express · Git',
    files: [
      {
        slug: 'typescript',
        title: 'TypeScript',
        description: 'JavaScript con tipos. Configuración para Node 24, tipos, uniones, genéricos y errores típicos.',
        tags: ['node', 'tipos', 'javascript'],
        icon: '/icons/typescript.png',
      },
      {
        slug: 'express',
        title: 'Express',
        description: 'APIs REST con Express 5 y TypeScript. Rutas, req/res, middlewares, errores y CORS.',
        tags: ['node', 'api', 'typescript', 'http'],
        icon: '/icons/express.png',
      },
      {
        slug: 'git',
        title: 'Git',
        description: 'Versionar código, trabajar con ramas, resolver conflictos y colaborar en GitHub.',
        tags: ['cli', 'github', 'versiones'],
        icon: '/icons/git.png',
      },
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    description: 'Lo que corre en el navegador: estructura, estilos e interacción.',
    topics: 'HTML · CSS · JavaScript',
    files: [
      {
        slug: 'html',
        title: 'HTML',
        description: 'La estructura de una página: etiquetas, formularios y semántica.',
        tags: ['estructura', 'semantica', 'formularios'],
        icon: '/icons/html.png',
      },
      {
        slug: 'css',
        title: 'CSS',
        description: 'Selectores, modelo de caja, flexbox, grid y diseño responsive.',
        tags: ['estilos', 'layout', 'responsive'],
        icon: '/icons/css.png',
      },
      {
        slug: 'javascript',
        title: 'JavaScript',
        description: 'Sintaxis, funciones, arrays, objetos y manejo del DOM.',
        tags: ['lenguaje', 'dom', 'funciones'],
        icon: '/icons/javascript.png',
      },
    ],
  },
  {
    id: 'hardware',
    label: 'Hardware',
    description: 'Microcontroladores, sensores y protocolos de comunicación.',
    topics: 'Arduino · Sensores',
    soon: true,
    files: [
      {
        slug: 'arduino',
        title: 'Arduino',
        description: 'Pines, sensores y el ciclo setup y loop.',
        tags: ['hardware', 'sensores'],
        icon: '/icons/arduino.png',
      },
    ],
  },
];

export const fileName = (file) => `${file.slug}.md`;
export const hrefFor = (folderId, slug) => `#/${folderId}/${slug}`;
export const folderHref = (folder) => `#/${folder.id}`;

export function findFolder(folderId) {
  return FOLDERS.find((folder) => folder.id === folderId);
}

export function findFile(folderId, slug) {
  return findFolder(folderId)?.files.find((file) => file.slug === slug);
}

/** Entradas para la paleta ⌘K. */
export const PALETTE_ITEMS = FOLDERS.flatMap((folder) =>
  folder.files.map((file) => ({ label: fileName(file), folder: folder.id, href: hrefFor(folder.id, file.slug) })),
);

/** Las carpetas con sus archivos, como los espera FileTree. */
export function treeFolders() {
  return FOLDERS.map((folder) => ({
    id: folder.id,
    files: folder.files.map((file) => ({ name: fileName(file), href: hrefFor(folder.id, file.slug) })),
  }));
}
