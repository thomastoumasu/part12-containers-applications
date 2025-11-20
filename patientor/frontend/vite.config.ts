import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "frontend-dev",
    // host: true, 
    // allowedHosts: ["frontend-dev"],
    // strictPort: true,
    // port: 8080,
  },
})
