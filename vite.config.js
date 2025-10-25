import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// https://vite.dev/config/
import Sitemap from 'vite-plugin-sitemap'
import fs from 'fs'
import path from 'path'

function getRoutesFromPages() {
  const pagesDir = path.resolve(__dirname, 'src/pages');
  const routes = new Set();

  function walk(dir) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const ent of entries) {
      const full = path.join(dir, ent.name);
      if (ent.isDirectory()) {
        walk(full);
        continue;
      }
      // Only include React page files
      if (!/\.(jsx|tsx)$/.test(ent.name)) continue;

      // Skip files that are intended to be private/utility
      if (ent.name.startsWith('_')) continue;

      // Compute a route from the relative path
      const rel = path.relative(pagesDir, full).split(path.sep).join('/');
      const noExt = rel.replace(/\.(jsx|tsx)$/,'');

      // Handle index files and nested directories
      let route;
      if (/\/index$/.test(noExt)) {
        const dir = noExt.replace(/\/index$/, '');
        route = '/' + dir; // '' -> '/'
      } else {
        route = '/' + noExt;
      }

      // Normalize and skip dynamic routes like [slug] or :id
      if (/[\[\]:]/.test(route)) continue;

      // Collapse multiple slashes and remove trailing slash (except root)
      route = route.replace(/\/+/, '/');
      if (route.length > 1 && route.endsWith('/')) route = route.slice(0, -1);

      routes.add(route);
    }
  }

  walk(pagesDir);

  // Ensure root is present if there is an index page
  if (!routes.size) return ['/'];
  return Array.from(routes).sort((a, b) => a.localeCompare(b));
}

export default defineConfig({
  plugins: [
    react(),
    Sitemap({
      // Use your live site URL so <loc> has absolute URLs
      hostname: process.env.VITE_SITE_URL || 'https://abcnato.xyz',
      // Optional quality-of-life flags
      generateRobotsTxt: true,
      readable: true,
      // Update this list with the routes you want included
      routes: getRoutesFromPages(),
      // Paths you **don’t** want in the sitemap
      exclude: [
        '/api/*'
      ],
      // Hints for crawlers (not all engines use these, but good practice)
      changefreq: 'weekly',
      priority: 0.7
    })
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
