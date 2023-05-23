import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    fs: {
      strict: false,
    },
    proxy: {
      '/api': {
        target: 'http://localhost:6001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
  },
  },
  build: {
    target: "es2022",
  },
});
