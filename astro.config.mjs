import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import vue from '@astrojs/vue';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react(), mdx(), vue()],
  site: 'https://appleicat.github.io',
  markdown: {
    remarkRehype: {
      footnoteLabel: ' ',
    },
  },
});
