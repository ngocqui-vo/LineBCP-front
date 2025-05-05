import fs from "fs";
import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import eslint from "vite-plugin-eslint";

export default defineConfig({
  plugins: [react(), eslint()],
  server: {
    port: 5173,
    https: {
      key: fs.readFileSync(path.resolve(__dirname, "ssl/key.pem")),
      cert: fs.readFileSync(path.resolve(__dirname, "ssl/cert.pem")),
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
