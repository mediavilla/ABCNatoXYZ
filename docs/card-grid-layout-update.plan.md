# Card Grid Layout and Flags Feature

## Overview

Restructure the NATO alphabet cards with a new grid layout and add a checkbox to toggle flag visibility.

## Card Layout Changes

### 1. Update Both Card Components

**Files:** `src/components/NatoGrid.jsx` and `src/components/TranslationResult.jsx`

Changes to card structure:

- Reduce `rounded-lg` to `rounded-md` for less rounded corners
- Create internal grid with 3 rows, first row has 3 columns
- **Top row, left column:** Letter in uppercase, regular font weight (not bold)
- **Top row, right column:** Flag SVG (conditional on flags state)
- **Middle row (spans all columns):** Codeword with only first letter capitalized, bold font
- Keep three-column layout even when flags are hidden (empty space in top-right)

### 2. Add Flags Checkbox

**File:** `src/components/TextInput.jsx`

- Add checkbox below the input field with label "flags"
- Default state: unchecked
- Pass state up to parent via new `onFlagsToggle` prop
- Include appropriate styling to match existing design

### 3. State Management

**File:** `src/App.jsx`

- Add `showFlags` state (default: `false`)
- Pass `showFlags` prop to both `NatoGrid` and `TranslationResult`
- Pass `onFlagsToggle` handler to `TextInput`

### 4. Flag Integration

**Both card components:**

- Import flag SVGs from `/flags/[letter].svg` 
- Conditionally render flag in top-right grid cell based on `showFlags` prop
- Ensure flags scale appropriately within the card grid

## Implementation Details

Card grid structure:

```jsx
<div className="grid grid-rows-3">
  <div className="grid grid-cols-3">
    <div>{/* Letter - uppercase, regular weight */}</div>
    <div>{/* Empty middle */}</div>
    <div>{/* Flag if showFlags */}</div>
  </div>
  <div>{/* Codeword - bold, capitalize first letter only */}</div>
  <div>{/* Empty bottom row for future features */}</div>
</div>
```