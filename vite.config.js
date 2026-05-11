import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    target: "es2020",
    cssCodeSplit: true,
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        // Lista apenas dependências realmente importadas pelo app.
        // Listar libs não usadas (swiper/slick/etc.) força o Rollup a
        // criar chunks desnecessários ou quebra o build.
        manualChunks: {
          react: ["react", "react-dom"],
          gsap: ["gsap"],
          fontawesome: [
            "@fortawesome/fontawesome-svg-core",
            "@fortawesome/free-solid-svg-icons",
            "@fortawesome/react-fontawesome",
          ],
        },
      },
    },
  },
});
