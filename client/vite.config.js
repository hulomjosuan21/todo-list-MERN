import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import envCompatible from 'vite-plugin-env-compatible'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), envCompatible()],
  envPrefix: "REACT_APP_",
  build: {
    outDir: 'dist',
  }
})
