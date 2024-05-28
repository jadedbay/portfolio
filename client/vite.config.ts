import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import dotenv from "dotenv";

dotenv.config();

const port = +(process.env.CLIENT_PORT || 8080);

export default defineConfig({
  plugins: [preact()],
  resolve: {
    alias: {
      "@routes": "/src/routes",
      "@components": "/src/components",
      "@modules": "/src/modules",
      "@assets": "/src/assets",
    },
  },
  server: {
    port: port,
    strictPort: true,
    host: true,
    proxy: {
      "/api": `http://localhost:${process.env.SERVER_PORT}`,
    },
  },
});
