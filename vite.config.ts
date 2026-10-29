import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/* One HTML entry per page, so each page has its own address (/venue/,
   /events/, ...) and works on any static host without rewrite rules. */
const page = (dir: string) => resolve(__dirname, dir, 'index.html')

export default defineConfig({
  /* '/' locally; the GitHub Pages workflow sets BASE_PATH to the repo path. */
  base: process.env.BASE_PATH || '/',
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'index.html'),
        venue: page('venue'),
        events: page('events'),
        gallery: page('gallery'),
        reviews: page('reviews'),
        contact: page('contact'),
      },
    },
  },
})
