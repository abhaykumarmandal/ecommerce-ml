import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Optional: Proxy API requests to backend to avoid CORS issues in dev
    // proxy: {
    //   '/api': 'http://127.0.0.1:5000' 
    // }
  }
})
