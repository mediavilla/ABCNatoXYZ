# Background Color Differentiation Plan

## Overview

Add a new CSS variable `--main` to create visual separation between header/footer and the main content area. Use #F1F1F1 (light grey) for light mode and an equivalent darker shade for dark mode.

## Changes Required

### 1. Add new CSS variable in `src/index.css`

Add a new `--main` color variable to the existing theme tokens:

```6:23:src/index.css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --main: 0 0% 94.5%;  /* Add this - #F1F1F1 equivalent */
    
    /* ... rest of variables */
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --main: 217.2 32.6% 12%;  /* Add this - darker than background */
    
    /* ... rest of variables */
  }
}
```

### 2. Configure Tailwind to use the new variable in `tailwind.config.js`

Add `main` to the theme colors so it can be used with Tailwind classes.

### 3. Update main element in `src/App.jsx`

Change the main element's background from the default to use the new `bg-main` class:

```139:139:src/App.jsx
<main className="flex-1 p-4 flex flex-col items-center justify-center space-y-8 bg-main">
```

## Result

- Light mode: Header/footer remain white (#FFFFFF), main area becomes light grey (#F1F1F1)
- Dark mode: Header/footer remain the current dark background, main area becomes slightly darker
- Smooth transitions when toggling between themes
- Better visual hierarchy and content separation