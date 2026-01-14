import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  base: "./",
  plugins: [vue(), tailwindcss()],
  clearScreen: false,
  envPrefix: ["VITE_", "TAURI_"],

  server: {
    port: 5173,
    strictPort: true,
    watch: {
      ignored: ["**/src-tauri/**"],
    },
  },

  build: {
    outDir: "app",
    emptyOutDir: true,
    target: process.env.TAURI_PLATFORM == "windows" ? "chrome105" : "safari13",
    minify: !process.env.TAURI_DEBUG ? "esbuild" : false,
    sourcemap: !!process.env.TAURI_DEBUG,
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@views": path.resolve(__dirname, "./src/views"),
      "@layouts": path.resolve(__dirname, "./src/layouts"),
      "@components": path.resolve(__dirname, "./src/components"),
    },
  },
});
