# Improve Flag Image Alt Text for Accessibility and SEO

## Changes Required

Update the `alt` attribute on flag images in two components to follow the format: `"Alpha flag – NATO phonetic alphabet letter A"`

### 1. Update NatoGrid.jsx

**File:** `src/components/NatoGrid.jsx` (line 79)

Change from:

```jsx
alt={`${letter} flag`}
```

To:

```jsx
alt={`${word} flag – NATO phonetic alphabet letter ${letter}`}
```

The `word` variable is already available in this component's map function.

### 2. Update TranslationResult.jsx

**File:** `src/components/TranslationResult.jsx` (line 127)

Change from:

```jsx
alt={`${item.letter} flag`}
```

To:

```jsx
alt={`${item.nato.charAt(0).toUpperCase() + item.nato.slice(1).toLowerCase()} flag – NATO phonetic alphabet letter ${item.letter}`}
```

The `item.nato` contains the NATO word (already available in the component).

## Result

This will produce alt text like:

- "Alpha flag – NATO phonetic alphabet letter A"
- "Bravo flag – NATO phonetic alphabet letter B"
- "Charlie flag – NATO phonetic alphabet letter C"

This improvement enhances:

- **Accessibility**: Screen readers will announce meaningful descriptions
- **SEO**: Search engines can better index and understand the flag images
- **User Experience**: Better context when images fail to load