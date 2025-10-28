import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/puppies": "https://puppy-backend-gfc2d7dthfd0g5cg.canadacentral-01.azurewebsites.net"
    }
  }
});

