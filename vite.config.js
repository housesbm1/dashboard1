import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/', // Critical for Vercel asset paths
  
  // Configuración específica para Vercel
  publicDir: 'public',
  appType: 'spa', // Importante para SPA en Vercel

  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html') // Ruta absoluta
      },
      output: {
        entryFileNames: `assets/[name].[hash].js`,
        chunkFileNames: `assets/[name].[hash].js`,
        assetFileNames: `assets/[name].[hash].[ext]`
      }
    }
  },

  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://waebhooksv.pedidosconfirmacion.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false
      }
    }
  }
});
