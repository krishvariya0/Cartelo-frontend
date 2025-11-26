import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  // Load .env variables
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      react(),
      tailwindcss(),
    ],
    define: {
      // Makes process.env.* work inside Vite (frontend)
      "process.env": env,
    },
  };
});

