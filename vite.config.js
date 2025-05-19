import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  
  // Define explícitamente la raíz del proyecto (donde está index.html)
  root: resolve(__dirname, '.'), // Busca index.html en la raíz
  
  // Carpeta para archivos estáticos (se copiarán tal cual al build)
  publicDir: 'public',

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
  },

  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,

    rollupOptions: {
      // Ruta ABSOLUTA al index.html (usando path.resolve)
      input: resolve(__dirname, 'index.html'),
      
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          vendor: ['axios', 'date-fns'],
          charts: ['recharts'],
          maps: ['leaflet', 'react-leaflet']
        }
      }
    }
  }
});
