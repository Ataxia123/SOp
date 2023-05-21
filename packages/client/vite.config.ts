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
      '/api': 'http://localhost:3000', // Proxy API requests to your Express server
    },
  },
  build: {
    target: "es2022",
  },
});
