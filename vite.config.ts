import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/module.ts",
      formats: ["es"],
      fileName: () => "module.js"
    },
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: true,
    target: "esnext",
    cssCodeSplit: false,
    chunkSizeWarningLimit: 4096,
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) =>
          assetInfo.names?.some((n) => n.endsWith(".css"))
            ? "style.css"
            : "assets/[name][extname]"
      }
    }
  },
  worker: {
    format: "es"
  }
});
