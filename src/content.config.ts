import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Colección "cheatsheets": todos los .md dentro de src/content/cheatsheets/<categoría>/.
 * Los archivos que empiezan con "_" (como _plantilla.md) se ignoran.
 * Si el frontmatter no cumple este esquema, `npm run dev` / `npm run build` muestran el error.
 */
const cheatsheets = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/cheatsheets' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    /**
     * Texto corto para la insignia (ej. "git", "</>"). Solo se ve si no hay un icono en
     * src/assets/icons/<slug>.png. Si falta, se usa el nombre del archivo.
     */
    badge: z.string().max(4).optional(),
    /** Orden dentro de la categoría (más chico = primero). */
    order: z.number().default(100),
    tags: z.array(z.string()).default([]),
    updated: z.coerce.date().optional(),
  }),
});

export const collections = { cheatsheets };
