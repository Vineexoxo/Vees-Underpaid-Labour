import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // For Vercel/Netlify deployment
  build: {
    outDir: 'dist',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
})
