// vite.config.ts
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig(({ mode }) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    root: 'client',
    base: '/',
    publicDir: 'public',
    plugins: [react()],
    appType: 'spa',
    envDir: '..',
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'client/src')
      },
      {
        find: '@/',
        replacement: path.resolve(__dirname, 'client/src/') + '/'
      },
      {
        find: '@attached_assets',
        replacement: path.resolve(__dirname, 'attached_assets')
      }
    ]
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          vendor: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
        },
      },
    },
    assetsInlineLimit: 0,
  },
  css: {
    devSourcemap: true,
    modules: {
      localsConvention: 'camelCaseOnly',
    },
  },
  server: {
    port: parseInt(process.env.FRONTEND_PORT || '3001'),
    strictPort: true,
    host: true,
    open: true,
    proxy: {
      // Stripe API proxy
      '/api': {
        target: `http://localhost:${process.env.BACKEND_PORT || '4000'}`,
        changeOrigin: true,
        secure: false,
      },
      // Netlify functions proxy (if still needed)
      '/.netlify/functions': {
        target: `http://localhost:${process.env.BACKEND_PORT || '4000'}`,
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
    fs: {
      strict: true,
      allow: [
        path.resolve(__dirname, 'client'),
        path.resolve(__dirname, 'shared'),
        path.resolve(__dirname, 'node_modules'),
        path.resolve(__dirname, 'attached_assets'),
      ],
      deny: ['.env', '.env.*', '*.{pem,crt}'],
    },
  },
  define: {
    'process.env': process.env,
  },
  };
});