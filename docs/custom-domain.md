# Fix GitHub Pages Custom Domain Deployment

## Problem

The site currently has `base: '/ABCNatoXYZ/'` in `vite.config.js`, which works for standard GitHub Pages deployment (`username.github.io/ABCNatoXYZ/`) but breaks with a custom domain where the site is served from the root path.

## Solution

Configure Vite to use a dynamic base path that:

- Uses `/` (root) for production builds (GitHub Pages with custom domain)
- Uses `/` for local development
- Can be overridden if needed for non-custom domain deployments

## Changes

### 1. Update `vite.config.js`

Change the base path from hardcoded `/ABCNatoXYZ/` to dynamically use environment variables:

```7:7:vite.config.js
  base: process.env.VITE_BASE_PATH || '/',
```

This will default to `/` (root path) which works for both:

- Custom domain: `ABCNATO.XYZ` → serves from root
- Localhost: `localhost:5173` → serves from root

### 2. Update `package.json` build script (optional)

Add a script for building with a custom base path if ever needed:

```json
"build:gh-path": "VITE_BASE_PATH=/ABCNatoXYZ/ vite build"
```

This provides flexibility to build with the repo path if you ever disable the custom domain.

### 3. Clean and rebuild

After making changes:

1. Delete the current `dist` folder
2. Run `npm run build` to create a fresh production build
3. The GitHub Action will automatically deploy on next push to main

## Result

- ✅ Works with custom domain `ABCNATO.XYZ`
- ✅ Works on localhost during development
- ✅ Can optionally build with base path if custom domain is removed
- ✅ No changes needed to GitHub Actions workflow