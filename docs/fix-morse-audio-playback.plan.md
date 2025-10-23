# Auto-play Morse Code on Type

## Goal

Play morse code audio and sync animations automatically as the user types each character, with queuing support to ensure smooth sequential playback without interrupting the existing play button functionality.

## Requirements Confirmed

1. ✅ Keep existing play button functionality intact
2. ✅ Maintain letter-by-letter rendering (only new/deleted letters animate)
3. ✅ Auto-play morse as user types each character
4. ✅ Queue characters if typed faster than playback completes
5. ✅ Sync visual animations with auto-played audio

## Implementation Strategy

### 1. Add "append" Mode Support to useMorsePlayer Hook

**File**: `src/hooks/useMorsePlayer.js`

The hook already has append mode logic (lines 96-116), but we need to ensure it works properly:

- When `mode: 'append'` and audio is already playing, new characters get queued
- The visual ticker continues tracking through appended events
- Fix the append mode's tone scheduling to work with the audio context timeline

**Key fix needed**: Line 109 has complex time calculation that may be incorrect:

```javascript
player.scheduleTone(player.now() + (ev.startTime - (player.now() - startTimeRef.current)), ev.duration);
```

Should simplify to use the audio context's absolute time:

```javascript
const audioCtxTime = startTimeRef.current + ev.startTime;
player.scheduleTone(audioCtxTime, ev.duration);
```

### 2. Add Auto-play State Management to App.jsx

**File**: `src/App.jsx`

Add new state and logic:

```javascript
const [autoPlayEnabled, setAutoPlayEnabled] = useState(false); // toggle state
const prevInputTextRef = useRef(''); // track previous input
```

Add effect to detect character additions:

```javascript
useEffect(() => {
  if (!autoPlayEnabled || !showMorse) return;
  
  const prev = prevInputTextRef.current;
  const curr = inputText;
  
  // Detect if a character was added (not removed)
  if (curr.length > prev.length && curr.startsWith(prev)) {
    const newChar = curr[prev.length];
    // Only play if it's a valid morse character
    if (/[A-Za-z0-9]/.test(newChar)) {
      autoPlayMorse.play(newChar);
    }
  }
  
  prevInputTextRef.current = curr;
}, [inputText, autoPlayEnabled, showMorse]);
```

Create separate morse player instance for auto-play:

```javascript
const autoPlayMorse = useMorsePlayer({ wpm: 20, mode: 'append' });
```

### 3. Add Auto-play Toggle to TextInput Component

**File**: `src/components/TextInput.jsx`

Add a new checkbox for auto-play (similar to flags/morse toggles):

```javascript
<label className="flex items-center space-x-2 cursor-pointer">
  <input
    type="checkbox"
    onChange={(e) => onAutoPlayToggle(e.target.checked)}
    className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
    disabled={!showMorse} // Only enable if morse is enabled
  />
  <span className="text-sm text-muted-foreground">auto-play</span>
</label>
```

Add `onAutoPlayToggle` and `showMorse` props to component.

### 4. Wire Auto-play Animations to TranslationResult

**File**: `src/App.jsx`

Pass auto-play morse player state to TranslationResult:

```javascript
<TranslationResult 
  {...staticProps}
  currentLetterIndex={autoPlayEnabled ? autoPlayMorse.currentLetterIndex : morsePlayer.currentLetterIndex}
  currentSymbolIndex={autoPlayEnabled ? autoPlayMorse.currentSymbolIndex : morsePlayer.currentSymbolIndex}
/>
```

This ensures animations sync with whichever player is active (manual play button vs auto-play).

### 5. Handle Edge Cases

**Considerations**:

- **Clear button**: Stop auto-play when input is cleared
- **Backspace**: Don't play when user deletes characters
- **Paste**: Don't play entire pasted text (too many queued chars)
- **Play button conflicts**: Disable play button when auto-play is active, or stop auto-play when play button is clicked

**File**: `src/App.jsx` - Update handlers:

```javascript
const handleClearInput = () => {
  setInputText('');
  morsePlayer.stop();
  autoPlayMorse.stop(); // Also stop auto-play
};

const handleManualPlay = () => {
  autoPlayMorse.stop(); // Stop auto-play before manual play
  morsePlayer.play(inputText);
};
```

## Files to Modify

1. `src/hooks/useMorsePlayer.js` - Fix append mode tone scheduling
2. `src/App.jsx` - Add auto-play state, effect, and second morse player instance
3. `src/components/TextInput.jsx` - Add auto-play toggle checkbox
4. `src/components/MorseControls.jsx` - Optionally show indicator when auto-play is active

## Testing Checklist

- [ ] Type single characters → each plays morse sequentially
- [ ] Type fast → characters queue and play in order
- [ ] Backspace → no sound plays
- [ ] Clear button → stops auto-play
- [ ] Play button → works independently, stops auto-play
- [ ] Auto-play toggle off → no auto-play occurs
- [ ] Morse toggle off → disables auto-play toggle
- [ ] Visual animations sync with auto-played audio