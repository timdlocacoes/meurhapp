import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: 'dist/stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true
    })
  ],
  base: './', // ✅ caminhos relativos
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          firebase: [
            'firebase/app',
            'firebase/firestore',
            'firebase/auth',
            'firebase/storage'
          ]
          // Removido date-fns e lodash-es pois não estão instalados
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: false, // ✅ desativar sourcemaps em produção
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  server: {
    port: 3000,
    open: true,
    host: true // ✅ permite acesso externo
  },
  preview: {
    port: 3001,
    host: true
  }
})