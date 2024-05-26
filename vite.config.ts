import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import dotenv from "dotenv";

dotenv.config();

const port = +(process.env.PORT || 8080);

export default defineConfig({
  plugins: [preact()],
  resolve: {
    alias: {
      "@routes": "/src/routes",
      "@components": "/src/components",
      "@modules": "/src/modules",
    },
  },
  server: {
    port: port,
    strictPort: true,
    host: true,
  },
});
