//import {resolve} from 'path'
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    // outDir: 'dist',
    // assetsDir: '.',
    rollupOptions: {
      input: {
        index: "./index.html",
        contentScript: "./src/contentScript/index.ts",
      },
      output: {
        entryFileNames: `assets/[name].js`,
      },
    },
  },
});
