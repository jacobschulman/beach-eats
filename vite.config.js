import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  server: {
    allowedHosts: ['jasnas'],
  },
  // Base URL for GitHub Pages deployment
  // Update 'beach-eats' to match your repository name
  base: mode === 'production' ? '/beach-eats/' : '/',
  build: {
    // Generate source maps for debugging
    sourcemap: false,
    // Optimize chunk splitting
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          firebase: ['firebase/app', 'firebase/firestore'],
        },
      },
    },
  },
}))
