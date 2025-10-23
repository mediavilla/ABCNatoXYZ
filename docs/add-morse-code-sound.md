# Add Morse Code Audio Playback

## Overview
Implement real-time Morse code audio playback using Web Audio API with visual synchronization. Audio auto-plays as user types (queued), with manual play/stop controls. Handles complex deletion scenarios and highlights cards + symbols during playback.

## Core Architecture

### Timeline-Based System
- **Single source of truth**: Timeline of events (dot/dash/gap) with timestamps
- **Shared by audio & visual**: Both use same timeline for perfect sync
- **Event structure**: `{ type: 'dot'|'dash'|'gap', startTime, duration, letterIndex, symbolIndex }`

### Key Components
1. **Timeline Builder** (`src/lib/morseTimeline.js`) - Converts text → timed events
2. **Audio Player** (`src/lib/morseAudio.js`) - Web Audio API tone scheduler
3. **React Hook** (`src/hooks/useMorsePlayer.js`) - Orchestrates playback & UI updates
4. **Enhanced MorseRenderer** - Adds active state highlighting
5. **Play/Stop Controls** - Manual playback buttons

## Implementation Plan

### 1. Create Morse Timeline Builder (`src/lib/morseTimeline.js`)

**Purpose**: Convert text to timed Morse events

**Key functions**:
- `buildMorseTimeline(text, wpm = 20)` - Main builder
  - Calculate `unitSec = 1.2 / wpm` (PARIS standard)
  - For each letter: convert to dots/dashes with timing
  - Add gaps: 1 unit between symbols, 3 between letters, 7 between words
  - Return array of events with absolute timestamps

**Event structure**:
```javascript
{
  type: 'dot' | 'dash' | 'letter-gap' | 'word-gap',
  startTime: number,  // seconds from start
  duration: number,   // seconds
  letterIndex: number, // which letter in the text
  symbolIndex: number, // which dot/dash within the letter (for highlighting)
  char: string        // the actual character
}
```

### 2. Create Morse Audio Player (`src/lib/morseAudio.js`)

**Purpose**: Web Audio API tone generation

**Class: MorseAudioPlayer**
- `constructor()` - Initialize AudioContext
- `scheduleTimeline(timeline, onComplete)` - Schedule all tones
  - Use `audioContext.currentTime` for precise scheduling
  - Frequency: 600 Hz (standard Morse tone)
  - Gain envelope: slight attack/release for smooth tones
- `stop()` - Stop all scheduled sounds
- `cleanup()` - Close AudioContext

**Implementation notes**:
- Use `OscillatorNode` for tone generation
- Use `GainNode` for volume control and envelope
- Schedule all events upfront using `start(time)` and `stop(time)`
- Store oscillator references for cleanup

### 3. Create Morse Player Hook (`src/hooks/useMorsePlayer.js`)

**Purpose**: Orchestrate playback, manage state, handle UI updates

**Hook signature**:
```javascript
useMorsePlayer(inputText, showMorse, enabled)
```

**State**:
- `isPlaying` - Boolean for UI
- `currentLetterIndex` - Which letter is playing
- `currentSymbolIndex` - Which dot/dash is playing
- `playbackQueue` - Queue of pending text to play

**Key logic**:
- **On text change**: 
  - If morse enabled and text added → queue new letters
  - If text deleted → handle deletion scenarios (see below)
- **Deletion handling**:
  - Track cursor position and deletion point
  - If deleting before current playback → continue
  - If deleting current letter → stop all
  - If deleting after current → ignore, continue queue
  - Clear button → stop all immediately
- **Timeline execution**:
  - Build timeline from queue
  - Start audio playback
  - Use `setTimeout` to update `currentLetterIndex`/`currentSymbolIndex` in sync
  - Clear all timeouts on stop/cleanup

**Methods returned**:
- `play()` - Manual play (for Play button)
- `stop()` - Manual stop (for Stop button)
- `isPlaying`, `currentLetterIndex`, `currentSymbolIndex` - For UI

**Cleanup**:
- `useEffect` cleanup: stop audio, clear all timeouts

### 4. Enhance MorseRenderer Component (`src/components/MorseRenderer.jsx`)

**New props**:
- `isActive` - Boolean, true when this letter is playing
- `activeSymbolIndex` - Number, which dot/dash is currently playing (-1 if none)

**Visual highlighting**:
- Add CSS classes for active states
- Individual symbols: add `morse-symbol-active` class when `activeSymbolIndex` matches
- Use theme-aware colors (e.g., `bg-primary` or `bg-accent` for active)

**CSS approach**:
```jsx
className={`inline-block ${
  index === activeSymbolIndex && isActive 
    ? 'bg-primary' 
    : 'bg-muted-foreground'
}`}
```

### 5. Update TranslationResult for Card Highlighting (`src/components/TranslationResult.jsx`)

**Changes**:
- Accept `currentLetterIndex` and `currentSymbolIndex` props
- Calculate global letter index across all words
- Pass `isActive` and `activeSymbolIndex` to MorseRenderer
- Add card-level highlighting: add `ring-2 ring-primary` or similar when active

**Example**:
```jsx
<motion.div
  className={`bg-card border rounded-md p-3 ${
    globalLetterIndex === currentLetterIndex ? 'ring-2 ring-primary' : ''
  }`}
>
  <MorseRenderer 
    char={item.letter}
    showMorse={showMorse}
    isActive={globalLetterIndex === currentLetterIndex}
    activeSymbolIndex={currentSymbolIndex}
  />
</motion.div>
```

### 6. Create Play/Stop Button Component (`src/components/MorseControls.jsx`)

**Purpose**: Manual playback controls

**Props**:
- `isPlaying` - Boolean
- `onPlay` - Function
- `onStop` - Function
- `disabled` - Boolean (when no text or morse disabled)

**UI**:
- Two buttons: Play (▶) and Stop (■)
- Show Play when not playing, Stop when playing
- Match styling of CopyButton/ShareButton
- Use Framer Motion for animations

### 7. Integrate into App.jsx

**Changes**:
- Import and use `useMorsePlayer` hook
- Pass `inputText`, `showMorse`, and `enabled` flag
- Get `isPlaying`, `currentLetterIndex`, `currentSymbolIndex`, `play()`, `stop()` from hook
- Pass these to TranslationResult
- Render MorseControls next to Copy/Share buttons
- Only show MorseControls when `hasInput && showMorse`

**Clear button handling**:
- Modify `handleClearInput` to call `stop()` from morse player

### 8. Handle Deletion Scenarios

**Implementation in useMorsePlayer**:
- Track previous text with `useRef`
- On text change, compare with previous:
  - If length increased → queue new letters
  - If length decreased → analyze deletion point
- Use cursor position tracking (may need to pass from TextInput)
- Deletion logic:
  ```javascript
  if (deletionIndex < currentLetterIndex) {
    // Deletion before current - adjust indices, continue
    setCurrentLetterIndex(prev => prev - deletedCount);
  } else if (deletionIndex === currentLetterIndex) {
    // Deleted current letter - stop all
    stop();
  } else {
    // Deletion after current - continue, ignore deleted
    // Remove from queue
  }
  ```

## Technical Specifications

### Timing Constants (20 WPM)
```javascript
const WPM = 20;
const UNIT_SEC = 1.2 / WPM; // = 0.06 seconds

const TIMINGS = {
  DOT: UNIT_SEC,           // 1 unit
  DASH: UNIT_SEC * 3,      // 3 units
  SYMBOL_GAP: UNIT_SEC,    // 1 unit (between dots/dashes)
  LETTER_GAP: UNIT_SEC * 3, // 3 units total (add 2 more after last symbol)
  WORD_GAP: UNIT_SEC * 7    // 7 units total (add 4 more after last symbol)
};
```

### Web Audio Settings
- **Frequency**: 600 Hz (standard CW tone)
- **Gain**: 0.3 (not too loud)
- **Attack/Release**: 5ms (smooth envelope, avoid clicks)

### Visual Highlight Colors
- **Active card**: `ring-2 ring-primary` (Tailwind)
- **Active symbol**: `bg-primary` instead of `bg-muted-foreground`
- Theme-aware: automatically adapts to light/dark mode

## Files to Create/Modify

### New Files
1. `src/lib/morseTimeline.js` - Timeline builder
2. `src/lib/morseAudio.js` - Audio player class
3. `src/hooks/useMorsePlayer.js` - React hook orchestrator
4. `src/components/MorseControls.jsx` - Play/Stop buttons

### Modified Files
1. `src/components/MorseRenderer.jsx` - Add active state props and highlighting
2. `src/components/TranslationResult.jsx` - Pass active states, add card highlighting
3. `src/App.jsx` - Integrate hook, add controls, handle clear button
4. `src/components/TextInput.jsx` - (Optional) Track cursor position for deletion handling

## Edge Cases & Cleanup

- **Unmount during playback**: Hook cleanup stops audio and clears timeouts
- **Text cleared**: Immediately stop all audio and reset state
- **Morse checkbox unchecked during playback**: Stop audio
- **Multiple rapid edits**: Queue system handles gracefully
- **Browser tab hidden**: Audio continues (expected behavior)
- **AudioContext suspended**: Resume on user interaction (Web Audio requirement)

## Testing Checklist

- [ ] Auto-play as typing (queued)
- [ ] Play button works after typing stops
- [ ] Stop button stops audio and highlights
- [ ] Clear button stops audio
- [ ] Delete before current letter continues playback
- [ ] Delete current letter stops playback
- [ ] Delete after current letter continues
- [ ] Visual highlights sync with audio
- [ ] Card and symbol highlighting work
- [ ] Theme colors apply correctly
- [ ] No memory leaks (cleanup works)
- [ ] Morse checkbox toggle stops playback
