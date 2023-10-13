import { defineConfig } from "vite";
import { viteMockServe } from "vite-plugin-mock";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteMockServe({
      enable: true,
      mockPath: "./src/mock/",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
