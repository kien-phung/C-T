import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const disableHMR = env.VITE_DISABLE_HMR === 'true';
  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_URL || 'http://localhost:4040',
          changeOrigin: true,
          rewrite: (path) => path
        }
      },
      port: 5173,
      host: true,
      hmr: disableHMR ? false : { overlay: false },
      watch: {
        // Ignore server-side files to avoid accidental reloads
        ignored: ['../sever/**', '**/*.log']
      }
    }
  }
})
