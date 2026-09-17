/**
 * Las categorías del sitio. El id (backend, frontend, hardware) tiene que coincidir con:
 * - el nombre de la carpeta en src/content/cheatsheets/
 * - la variable de color --color-<id> en src/styles/global.css
 * El orden de este objeto es el orden en que se muestran.
 */
export const CATEGORIES = {
  backend: {
    label: 'Backend',
    description: 'Servidores, APIs, bases de datos y control de versiones.',
    topics: 'Node · TypeScript · Express · Git · MySQL · PHP',
  },
  frontend: {
    label: 'Frontend',
    description: 'Lo que corre en el navegador: estructura, estilos e interacción.',
    topics: 'HTML · CSS · JavaScript · Next.js',
  },
  hardware: {
    label: 'Hardware',
    description: 'Microcontroladores, sensores y protocolos de comunicación.',
    topics: 'Arduino · Sensores · I2C · UART',
  },
} as const satisfies Record<string, { label: string; description: string; topics: string }>;

export type CategoryId = keyof typeof CATEGORIES;

export const CATEGORY_IDS = Object.keys(CATEGORIES) as CategoryId[];

export function isCategoryId(value: string): value is CategoryId {
  return Object.hasOwn(CATEGORIES, value);
}

/** Estilo inline que pinta un elemento (y sus hijos) con el color de la categoría. */
export function accentStyle(id: CategoryId): string {
  return `--accent: var(--color-${id});`;
}
