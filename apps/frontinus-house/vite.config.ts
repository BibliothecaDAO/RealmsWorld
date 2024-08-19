import MillionLint from '@million/lint';
import path from "path";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
const _plugins = [react()];
_plugins.unshift(MillionLint.vite())
export default defineConfig({
  plugins: _plugins,
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  define: {
    "process.env": {}
  },
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: "globalThis"
      }
    }
  }
});