import { dirname, resolve } from "path"
import { fileURLToPath } from "url"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import checker from "vite-plugin-checker"

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  build: {
    manifest: true,
    sourcemap: false,
    minify: "esbuild",
  },
  base: "/invite",
  plugins: [
    react(),
    checker({
      typescript: true,
      overlay: {
        initialIsOpen: false,
        position: "bl",
      },
    }),
  ],
  resolve: {
    alias: {
      "@src": resolve(__dirname, "./src"),
      "@shared": resolve(__dirname, "./src/shared"),
      "@assets": resolve(__dirname, "./src/assets"),
      "@ui": resolve(__dirname, "./src/shared/ui"),
      "@features": resolve(__dirname, "./src/features"),
      "@pages": resolve(__dirname, "./src/pages"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@assets/styles/variables" as *;',
      },
    },
  },
})
