import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// Auto-discover routes from src/pages (React Router SPA)
function getRoutesFromPages() {
  const pagesDir = path.resolve(__dirname, 'src/pages')
  const routes = new Set()

  function walk(dir) {
    if (!fs.existsSync(dir)) return
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    for (const ent of entries) {
      const full = path.join(dir, ent.name)
      if (ent.isDirectory()) { walk(full); continue }
      if (!/\.(jsx|tsx)$/.test(ent.name)) continue
      if (ent.name.startsWith('_')) continue

      const rel = path.relative(pagesDir, full).split(path.sep).join('/')
      const noExt = rel.replace(/\.(jsx|tsx)$/,'')
      let route = /\/index$/.test(noExt) ? '/' + noExt.replace(/\/index$/, '') : '/' + noExt
      if (/^[\s]*$/.test(route) || /[\[\]:]/.test(route)) continue
      route = route.replace(/\/+/, '/')
      if (route.length > 1 && route.endsWith('/')) route = route.slice(0, -1)
      routes.add(route.toLowerCase())
    }
  }

  walk(pagesDir)
  return routes.size ? Array.from(routes).sort() : ['/']
}

export default defineConfig({
  plugins: [
    react(),
  ],
  base: process.env.VITE_BASE_PATH || '/',
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          animations: ['framer-motion']
        }
      }
    }
  }
})
