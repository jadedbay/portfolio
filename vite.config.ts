import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

export default defineConfig({
  plugins: [preact()],
  resolve: {
    alias: {
      "@routes": "/src/routes",
      "@components": "/src/components",
      "@modules": "/src/modules",
    },
  },
});
