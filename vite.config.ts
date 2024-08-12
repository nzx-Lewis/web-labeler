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
        //TODO: replace non-hashed-filenames with creating manifest.json
        // https://rollupjs.org/plugin-development/#build-hooks
        entryFileNames: `assets/[name].js`,
        assetFileNames: "assets/[name][extname]",
      },
    },
  },
});
