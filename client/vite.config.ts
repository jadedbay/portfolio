import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

import dotenv from "dotenv";
dotenv.config()

console.log(process.env.CLIENT_PORT);
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
      "/api": `http://server:${process.env.SERVER_PORT}`,
    },
  },
});
