import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    root: 'client',
    base: '/',
    publicDir: path.resolve(__dirname, 'client/public'),
    plugins: [
      react(),
      {
        name: 'inject-google-fonts',
        transformIndexHtml(html) {
          return html.replace(
            '<head>',
            `<head>
              <link rel="preconnect" href="https://fonts.googleapis.com">
              <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
              <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Geist:wght@300;400;600;700&family=Instrument+Sans:wght@600&family=Inter&display=swap" rel="stylesheet">
            `
          );
        },
      },
    ],
    
    define: {
      'import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY': JSON.stringify(env.VITE_STRIPE_PUBLISHABLE_KEY || ''),
      'import.meta.env.FRONTEND_URL': JSON.stringify(env.FRONTEND_URL || 'http://localhost:5173'),
      'import.meta.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL || 'http://localhost:5001'),
    },
    
    resolve: {
      alias: [
        { find: '@', replacement: path.resolve(__dirname, 'client/src') },
        { find: '@shared', replacement: path.resolve(__dirname, 'shared') },
        { find: '@assets', replacement: path.resolve(__dirname, 'client/public') },
        { find: '@attached_assets', replacement: path.resolve(__dirname, 'attached_assets') }
      ]
    },
    
    build: {
      outDir: 'dist/public',
      emptyOutDir: true,
      sourcemap: mode !== 'production',
      minify: mode === 'production' ? 'esbuild' : false,
      rollupOptions: {
        input: path.resolve(__dirname, 'client/index.html'),
        output: {
          entryFileNames: 'assets/[name]-[hash].js',
          chunkFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash][extname]',
          manualChunks: {
            react: ['react', 'react-dom', 'react-router-dom'],
            vendor: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu']
          }
        }
      },
      base: './',
    },
    
    server: {
      port: 3000,  // Frontend port
      strictPort: true,  // Don't try another port if in use
      host: true,  // Listen on all network interfaces
      open: true,  // Open browser on server start
      proxy: {
        '/api': {
          target: 'http://localhost:5000',  // Backend port
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '/.netlify/functions/api')
        }
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
    
    preview: {
      port: 5173,
      strictPort: true,
    },
    
    optimizeDeps: {
      esbuildOptions: {
        target: 'es2022',
      },
    },
    
    esbuild: {
      target: 'es2022',
    },
  };
});
