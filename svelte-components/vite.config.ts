import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [svelte(), tailwindcss()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      name: 'BoardProposalComponents',
      fileName: () => 'board-proposal-components.js',
      formats: ['iife']
    },
    outDir: 'dist',
    emptyOutDir: true,
    cssCodeSplit: false
  }
});
