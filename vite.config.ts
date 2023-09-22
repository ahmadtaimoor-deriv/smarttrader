import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

const ALIASES = {
  Components: resolve(__dirname, "./src/components"),
  Constants: resolve(__dirname, "./src/constants"),
  Contexts: resolve(__dirname, "./src/contexts"),
  Hooks: resolve(__dirname, "./src/hooks"),
  Images: resolve(__dirname, "./src/images"),
  Utils: resolve(__dirname, "./src/utils"),
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  /* Absoloute path */
  resolve: { alias: ALIASES },
});
