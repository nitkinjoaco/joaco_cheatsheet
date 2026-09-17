// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  server: {
    // Puerto del servidor de desarrollo y de `npm run preview`.
    port: 3000,
  },
  markdown: {
    shikiConfig: {
      // Colorea los bloques de código al compilar. Temas: https://shiki.style/themes
      theme: 'github-dark-default',
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
