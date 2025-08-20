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

  build: {
    // Code splitting and chunk optimization
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunks for better caching
          if (id.includes('node_modules')) {
            // React와 react-dom을 별도로 분리하지 않음 - 다른 vendor들과 함께 처리
            if (id.includes('gsap')) {
              return 'gsap-vendor';
            }
            // React도 여기에 포함되어 하나의 vendor chunk로 처리
            return 'vendor';
          }

          // Component chunks
          if (id.includes('src/components')) {
            return 'components';
          }

          // Utils chunks
          if (id.includes('src/utils') || id.includes('src/hooks')) {
            return 'utils';
          }
        },
        // Optimize asset naming for better caching
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name!.split('.');
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/woff2?|eot|ttf|otf/i.test(ext)) {
            return `assets/fonts/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
    // Enable minification with advanced options
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: mode === 'production',
        pure_funcs:
          mode === 'production' ? ['console.log', 'console.info'] : [],
      },
      mangle: {
        safari10: true,
      },
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    // Source maps for debugging (disabled in production for size)
    sourcemap: mode !== 'production',
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Optimize asset inlining threshold
    assetsInlineLimit: 4096, // 4KB threshold
  },

  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom'],
    exclude: ['gsap/ScrollTrigger', 'gsap/TextPlugin'], // Load these dynamically
    // Force optimization of specific dependencies
    force: mode === 'development',
  },

  // Asset optimization
  assetsInclude: ['**/*.webp', '**/*.avif'],

  // Development server optimization
  server: {
    hmr: {
      overlay: false, // Disable error overlay for better performance
    },
    // Enable compression in dev mode
    middlewareMode: false,
  },

  // Preview server configuration
  preview: {
    port: 4173,
    host: true,
    // Enable compression for preview
    headers: {
      'Cache-Control': 'public, max-age=31536000',
    },
  },

  // Enable experimental features for better performance
  experimental: {
    renderBuiltUrl(filename, { hostType }) {
      if (hostType === 'js') {
        return { js: `/${filename}` };
      }
      return { relative: true };
    },
  },
}));
