// El contenido de cada cheatsheet, por clave "carpeta/slug".
// Cada sección tiene un `id` (para el índice), un `title` y bloques:
//   { type: 'p', text }                          un párrafo
//   { type: 'code', title, code, shell? }        un bloque de código (shell: false apaga el resaltado de comandos)

const CONTENT = {
  'backend/git': {
    sections: [
      {
        id: 'que-es',
        title: '¿Qué es?',
        blocks: [
          {
            type: 'p',
            text: 'Git guarda la historia de tu proyecto: cada cambio queda registrado y podés volver atrás cuando quieras.',
          },
        ],
      },
      {
        id: 'comandos',
        title: 'Comandos',
        blocks: [
          { type: 'p', text: 'Los tres que vas a usar todos los días.' },
          { type: 'code', title: 'bash', code: 'git init\ngit add .\ngit commit -m "primer commit"' },
        ],
      },
      {
        id: 'branches',
        title: 'Branches',
        blocks: [
          { type: 'p', text: 'Una rama es una línea de trabajo paralela: probá cambios sin tocar main.' },
          { type: 'code', title: 'bash', code: 'git switch -c nueva-rama\n# trabajá tranquilo\ngit switch main' },
        ],
      },
      {
        id: 'github',
        title: 'GitHub',
        blocks: [
          { type: 'p', text: 'Subí tu repositorio para tener una copia en la nube.' },
          { type: 'code', title: 'bash', code: 'git remote add origin <url>\ngit push -u origin main' },
        ],
      },
    ],
  },

  'backend/typescript': {
    sections: [
      {
        id: 'que-es',
        title: '¿Qué es?',
        blocks: [
          {
            type: 'p',
            text: 'TypeScript es JavaScript con tipos: el editor te avisa de los errores antes de ejecutar el código.',
          },
        ],
      },
      {
        id: 'tipos-basicos',
        title: 'Tipos básicos',
        blocks: [
          {
            type: 'code',
            title: 'ts',
            shell: false,
            code: "let nombre: string = 'Ana'\nlet edad: number = 30\nlet activo: boolean = true",
          },
        ],
      },
      {
        id: 'interfaces',
        title: 'Interfaces',
        blocks: [
          { type: 'p', text: 'Describen la forma de un objeto. El signo ? marca una propiedad opcional.' },
          { type: 'code', title: 'ts', shell: false, code: 'interface Usuario {\n  nombre: string\n  edad?: number\n}' },
        ],
      },
    ],
  },
};

/** Contenido de un cheatsheet; si todavía no existe, una sección que avisa. */
export function getContent(folderId, slug) {
  return (
    CONTENT[`${folderId}/${slug}`] ?? {
      sections: [
        {
          id: 'pronto',
          title: 'Pronto',
          blocks: [{ type: 'p', text: 'Este cheatsheet todavía no tiene contenido.' }],
        },
      ],
    }
  );
}
