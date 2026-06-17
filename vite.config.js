import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) return 'vendor';
          if (id.includes('node_modules/framer-motion')) return 'framerMotion';
          if (id.includes('node_modules/react-icons')) return 'icons';
        },
      },
    },
  },
})
