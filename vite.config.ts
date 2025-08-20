/// <reference types="vite/client" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  // Simplified build configuration to avoid React chunk issues
  build: {
    // Minimal rollup configuration
    rollupOptions: {
      output: {
        // 간단한 chunk 분할만 사용
        manualChunks: {
          vendor: ['react', 'react-dom'],
          gsap: ['gsap'],
        },
      },
    },
    // Basic minification
    minify: mode === 'production' ? 'terser' : false,
    // Source maps only in development
    sourcemap: mode === 'development',
    // Target modern browsers
    target: 'esnext',
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
  },

  // Simplified dependency optimization
  optimizeDeps: {
    include: ['react', 'react-dom', 'react/jsx-runtime'],
  },

  // Simplified server configuration
  server: {
    port: 5173,
    hmr: true,
  },

  // Simplified preview configuration
  preview: {
    port: 4173,
  },
}));
