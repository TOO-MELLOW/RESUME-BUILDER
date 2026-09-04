import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
export default defineConfig({
  plugins: [react()],
  appType: 'mpa',
  server: { host: '0.0.0.0', port: 3000, strictPort: true },
  preview: { host: '0.0.0.0', port: 4173, strictPort: true },
  build: {
    target: 'es2020',
    sourcemap: true,
    cssCodeSplit: true,
    rollupOptions: {
      input: {
        main: resolve(process.cwd(), 'index.html'),
        gallery: resolve(process.cwd(), 'gallery.html'),
        manager: resolve(process.cwd(), 'manager.html'),
        builder: resolve(process.cwd(), 'builder.html'),
        'cover-letter': resolve(process.cwd(), 'cover-letter.html')
      }
    }
  }
});
