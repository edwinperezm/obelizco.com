import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import type { UserConfig, PluginOption } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create a safe wrapper for the runtime error overlay
async function getRuntimeErrorOverlay(): Promise<PluginOption | null> {
  if (process.env.NODE_ENV === 'production') {
    return null;
  }
  try {
    const { default: runtimeErrorOverlay } = await import('@replit/vite-plugin-runtime-error-modal');
    return runtimeErrorOverlay();
  } catch (error) {
    console.warn('Failed to load runtime error overlay:', error);
    return null;
  }
}

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  // Load env file based on `mode` in the current directory
  const env = loadEnv(mode, process.cwd(), '');
  
  const plugins: PluginOption[] = [react()];

  // Add development-only plugins
  if (mode !== 'production') {
    const overlay = await getRuntimeErrorOverlay();
    if (overlay) {
      plugins.push(overlay);
    }

    if (env.REPL_ID) {
      try {
        const { cartographer } = await import('@replit/vite-plugin-cartographer');
        plugins.push(cartographer());
      } catch (error) {
        console.warn('Failed to load cartographer plugin:', error);
      }
    }
  }
  const config: UserConfig = {
    define: {
      'import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY': JSON.stringify(env.VITE_STRIPE_PUBLISHABLE_KEY || ''),
      'import.meta.env.FRONTEND_URL': JSON.stringify(env.FRONTEND_URL || 'http://localhost:5173'),
    },
    plugins,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'client', 'src'),
        '@shared': path.resolve(__dirname, 'shared'),
        '@assets': path.resolve(__dirname, 'attached_assets'),
      },
    },
    root: path.resolve(__dirname, 'client'),
    build: {
      outDir: path.resolve(__dirname, 'dist/public'),
      emptyOutDir: true,
      target: 'es2022',
      minify: 'esbuild',
      sourcemap: mode !== 'production',
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom', 'react-router-dom'],
            vendor: ['lodash', 'date-fns'],
          },
        },
      },
    },
    server: {
      port: 5173,
      strictPort: true,
      fs: {
        strict: true,
        allow: [
          path.resolve(__dirname, 'client'),
          path.resolve(__dirname, 'shared'),
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

  return config;
});
