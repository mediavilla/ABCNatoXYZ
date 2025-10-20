# Add Morse Code Feature

## Overview

Implement a morse code display feature that shows dots and dashes for each letter/number in the card's third row, controlled by a checkbox next to the existing flags checkbox.

## Implementation Steps

### 1. Create Morse Code Data & Renderer Component

- **Add morse code mapping** to `src/data/natoAlphabet.js`:
  - Add `MORSE_CODE` constant with A-Z and 0-9 mappings
  - Add `getMorseCode(char)` helper function

- **Create `src/components/MorseRenderer.jsx`**:
  - Component accepts `char`, `showMorse`, and theme-aware styling props
  - Renders dots (circular, ~6px diameter) and dashes (~18px width) using inline styles + Tailwind classes
  - Uses proper ARIA labels: `aria-label="Morse for A: dot dash"`
  - Returns null if `showMorse` is false
  - Uses `bg-foreground` or similar theme-aware classes for dot/dash colors

### 2. Add Morse State Management

- **Update `src/App.jsx`**:
  - Add `showMorse` state: `const [showMorse, setShowMorse] = useState(false);`
  - Add handler: `const handleMorseToggle = (checked) => { setShowMorse(checked); }`
  - Pass `showMorse` prop to `<TextInput>`, `<NatoGrid>`, and `<TranslationResult>`

### 3. Add Morse Checkbox to Input Component

- **Update `src/components/TextInput.jsx`**:
  - Accept `onMorseToggle` prop
  - Modify the checkbox container (line ~110-124) to display two checkboxes side by side:
    ```jsx
    <div className="mt-4 flex items-center justify-center gap-4">
      <label className="flex items-center space-x-2 cursor-pointer">
        <input type="checkbox" onChange={(e) => onFlagsToggle(e.target.checked)} ... />
        <span className="text-sm text-muted-foreground">flags</span>
      </label>
      <label className="flex items-center space-x-2 cursor-pointer">
        <input type="checkbox" onChange={(e) => onMorseToggle(e.target.checked)} ... />
        <span className="text-sm text-muted-foreground">morse</span>
      </label>
    </div>
    ```


### 4. Integrate Morse into NatoGrid Component

- **Update `src/components/NatoGrid.jsx`**:
  - Accept `showMorse` prop
  - Import `MorseRenderer`
  - Replace empty third row div (line ~93) with:
    ```jsx
    <div className="flex items-center justify-center">
      <MorseRenderer char={letter} showMorse={showMorse} />
    </div>
    ```


### 5. Integrate Morse into TranslationResult Component

- **Update `src/components/TranslationResult.jsx`**:
  - Accept `showMorse` prop
  - Import `MorseRenderer`
  - Replace empty third row div (line ~165) with:
    ```jsx
    <div className="flex items-center justify-center">
      <MorseRenderer char={item.letter} showMorse={showMorse} />
    </div>
    ```


## Key Design Decisions

- **CSS Approach**: Use inline styles for precise dot/dash sizing combined with Tailwind utility classes for theming
- **Theme Integration**: Use Tailwind theme variables (`bg-foreground`, `bg-muted-foreground`) for automatic dark/light mode support
- **Accessibility**: Include descriptive ARIA labels on morse containers
- **Performance**: Morse rendering is lightweight; no need for memoization
- **Extensibility**: Morse data structure supports future addition of more characters (punctuation, special chars)

## Files to Modify

1. `src/data/natoAlphabet.js` - Add morse code data
2. `src/components/MorseRenderer.jsx` - New component
3. `src/App.jsx` - Add state and pass props
4. `src/components/TextInput.jsx` - Add morse checkbox
5. `src/components/NatoGrid.jsx` - Integrate MorseRenderer
6. `src/components/TranslationResult.jsx` - Integrate MorseRenderer