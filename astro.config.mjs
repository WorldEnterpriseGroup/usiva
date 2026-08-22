import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://usiva.org',
  output: 'static',
  trailingSlash: 'never',
  build: {
    assets: 'assets',
    format: 'file',
  },
});
