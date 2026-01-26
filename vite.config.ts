import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: './' ensures that assets are loaded correctly regardless of the subdirectory on the hosting server
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }
});