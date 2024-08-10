import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Allows access from other devices on the same network
    port: 5173,      // Optional: You can specify the port, otherwise it uses the default 5173
  },
})
