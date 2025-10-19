# Dynamic Favicon with Maritime Signal Flags

## Overview

Add dynamic favicon functionality that shows the maritime signal flag for the last letter typed, reverting to the Alpha (A) flag when the tab is inactive or input is empty.

## Implementation Steps

### 1. Add Flag Assets

- Download 26 maritime signal flag SVGs (A-Z) from Wikipedia
- Place them in `/Users/juan/Github/ABCNatoXYZ/src/assets/flags/`
- Name them consistently: `a.svg`, `b.svg`, ..., `z.svg`
- Set Alpha flag (`a.svg`) as the default

### 2. Create Favicon Manager Hook

Create `/Users/juan/Github/ABCNatoXYZ/src/hooks/useFavicon.js`:

- Hook to dynamically update favicon
- Accept a letter parameter (A-Z)
- Update the `<link rel="icon">` element in the document head
- Import and reference the appropriate flag SVG based on letter
- Handle edge cases (invalid letters, null values)

### 3. Create Page Visibility Hook

Create `/Users/juan/Github/ABCNatoXYZ/src/hooks/usePageVisibility.js`:

- Hook to detect when tab/window becomes visible or hidden
- Use the Page Visibility API (`document.visibilityState`)
- Return a boolean indicating if page is currently visible
- Clean up event listeners on unmount

### 4. Integrate into App Component

Update `/Users/juan/Github/ABCNatoXYZ/src/App.jsx`:

- Import both custom hooks
- Track the last alphabetic character from `inputText`
- Use `usePageVisibility` to detect tab focus changes
- Use `useFavicon` with:
- Last letter when page is visible and input has letters
- 'A' (Alpha) when page is hidden or input is empty
- Add effect to extract last alphabetic character from input

### 5. Update Default Favicon

Update `/Users/juan/Github/ABCNatoXYZ/index.html`:

- Change default favicon link to point to Alpha flag SVG
- Ensure proper fallback if JavaScript hasn't loaded yet

## Technical Notes

- Favicon changes are instant and don't require page refresh
- Page Visibility API has excellent browser support
- SVG favicons work in all modern browsers
- Flag will persist even when typing non-alphabetic characters (spaces, numbers, punctuation)