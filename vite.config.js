import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  publicDir: 'public',  // Define la carpeta de archivos estáticos

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
    emptyOutDir: true,  // Limpia la carpeta 'dist' antes de construir

    sourcemap: true,   // Si quieres mapas de origen (opcional)

    rollupOptions: {
      input: {
        main: './index.html'  // Ruta relativa desde la raíz para el HTML principal
      },
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
})
