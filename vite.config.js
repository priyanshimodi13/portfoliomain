import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        // Use default chunking
      },
    },
    chunkSizeWarningLimit: 800,
  },
  optimizeDeps: {
    // Tell Vite to pre-bundle these so dev server starts faster
    include: ['react', 'react-dom', 'gsap'],
    // Exclude heavy WebGL deps from pre-bundling — they lazy-load on demand
    exclude: ['three'],
  },
})
