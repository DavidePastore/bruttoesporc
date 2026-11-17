import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // Keep the same output folder used by Create React App (and by the Vercel deployment).
    outDir: 'build'
  },
  server: {
    port: 3000,
    open: true
  },
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: './src/setupTests.js'
  }
});
