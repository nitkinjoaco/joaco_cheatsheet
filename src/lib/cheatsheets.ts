import type { ImageMetadata } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';
import { CATEGORY_IDS, isCategoryId, type CategoryId } from './categories';

export type Cheatsheet = CollectionEntry<'cheatsheets'>;

/**
 * Iconos de src/assets/icons/, indexados por nombre de archivo sin extensión.
 * import.meta.glob los busca al compilar: "../assets/icons/css.png" → icons["css"].
 */
const iconFiles = import.meta.glob<ImageMetadata>('../assets/icons/*.{png,jpg,jpeg,webp,svg}', {
  eager: true,
  import: 'default',
});
const icons: Record<string, ImageMetadata> = {};
for (const [path, image] of Object.entries(iconFiles)) {
  const name = path.slice(path.lastIndexOf('/') + 1, path.lastIndexOf('.'));
  icons[name] = image;
}

/**
 * Saca la categoría y el slug del id que arma Astro con la ruta del archivo.
 * "backend/git" (src/content/cheatsheets/backend/git.md) → { category: "backend", slug: "git" }
 */
export function parseId(entry: Cheatsheet): { category: CategoryId; slug: string } {
  const [category, slug, ...extra] = entry.id.split('/');

  if (!category || !slug || extra.length > 0 || !isCategoryId(category)) {
    throw new Error(
      `El cheatsheet "${entry.id}" tiene que estar directamente dentro de una carpeta de ` +
        `categoría (${CATEGORY_IDS.join(', ')}), por ejemplo: backend/git.md`,
    );
  }

  return { category, slug };
}

export function getHref(entry: Cheatsheet): string {
  const { category, slug } = parseId(entry);
  return `/${category}/${slug}`;
}

export function getFileName(entry: Cheatsheet): string {
  return `${parseId(entry).slug}.md`;
}

/** Texto corto de la insignia: el campo "badge" o, si no está, el slug. */
export function getBadge(entry: Cheatsheet): string {
  return entry.data.badge ?? parseId(entry).slug.slice(0, 3);
}

/** Icono del cheatsheet: src/assets/icons/<slug>.png (o .webp, .svg…), si existe. */
export function getIcon(entry: Cheatsheet): ImageMetadata | undefined {
  return icons[parseId(entry).slug];
}

/** Todos los cheatsheets, ordenados por "order" y después por título. */
export async function getCheatsheets(): Promise<Cheatsheet[]> {
  const entries = await getCollection('cheatsheets');
  entries.forEach(parseId); // valida que todos estén en una carpeta de categoría válida

  return entries.sort(
    (a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title, 'es'),
  );
}

export async function getCheatsheetsByCategory(): Promise<Record<CategoryId, Cheatsheet[]>> {
  const grouped = Object.fromEntries(CATEGORY_IDS.map((id) => [id, []])) as unknown as Record<
    CategoryId,
    Cheatsheet[]
  >;

  for (const entry of await getCheatsheets()) {
    grouped[parseId(entry).category].push(entry);
  }

  return grouped;
}
