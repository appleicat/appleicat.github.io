/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  plugins: [typography],
};
