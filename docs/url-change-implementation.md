# URL State Management for Shareable Links

## Implementation Approach

### 1. URL State Synchronization

**File:** `src/App.jsx`

- Add URL state management using React's built-in `useEffect` hook
- Read query parameter `q` on component mount to initialize `inputText`
- Update URL whenever `inputText` changes using `window.history.pushState()`
- Use `URLSearchParams` API for encoding/decoding

**Key changes:**

- Add `useEffect` to read URL param on mount: `new URLSearchParams(window.location.search).get('q')`
- Add `useEffect` with `[inputText]` dependency to sync state to URL
- Use `decodeURIComponent()` for reading, `encodeURIComponent()` for writing
- Handle empty string case (clear URL param when input is empty)

### 2. Browser History Management

**File:** `src/App.jsx`

- Use `window.history.pushState()` for updating URL without page reload
- Debounce URL updates (300ms) to avoid excessive history entries while typing
- Handle browser back/forward navigation with `popstate` event listener

### 3. Share Button (Optional Enhancement)

**File:** New component `src/components/ShareButton.jsx` (or add to existing CopyButton)

- Add "Share Link" button next to existing Copy button
- Copy current URL to clipboard when clicked
- Show visual feedback (toast/checkmark) on successful copy

### 4. URL Validation & Edge Cases

**File:** `src/App.jsx`

- Limit URL parameter length (e.g., 500 characters) to prevent issues
- Handle special characters and emojis properly
- Clear invalid/malformed query parameters gracefully
- Handle case when user manually edits URL

## Effort Estimate

**Time: 2-3 hours** (Small-Medium task)

**Breakdown:**

- Core URL sync logic: 1 hour
- Debouncing and history management: 30 minutes
- Testing edge cases: 30 minutes
- Optional share button: 30-60 minutes

## Technical Challenges

### Low Complexity Challenges

1. **URL encoding:** Standard URLSearchParams handles this well
2. **State initialization:** Simple useEffect with conditional logic
3. **Browser compatibility:** pushState is widely supported

### Medium Complexity Challenges

1. **Debouncing:** Need to balance responsiveness vs history pollution

- Solution: Use setTimeout/clearTimeout or small debounce utility

2. **Back/forward navigation:** Must listen to popstate events and sync state

- Solution: Add popstate listener that reads URL and updates inputText

3. **Race conditions:** URL updates while user is typing

- Solution: Use useRef to track if change is from URL or user input

### Potential Issues

1. **URL length limits:** Browsers support ~2000 chars, but some proxies/servers limit to 255

- Mitigation: Add length validation, show warning if text too long

2. **Special characters:** Emojis, diacritics, complex Unicode

- Solution: encodeURIComponent handles most cases, normalize input handles diacritics

3. **SEO considerations:** Dynamic URLs might not be crawled properly

- Impact: Minimal - this is a tool, not content site

4. **Multiple tabs:** Changes in one tab don't sync to others

- Acceptable: This is expected browser behavior, not a bug

## Implementation Notes

**No dependencies needed** - Uses native browser APIs:

- `URLSearchParams` for query string manipulation
- `window.history.pushState()` for URL updates
- `window.addEventListener('popstate')` for navigation

**Files to modify:**

1. `src/App.jsx` - Core URL sync logic (main changes)
2. `src/components/CopyButton.jsx` or new `ShareButton.jsx` - Optional share feature

**Testing considerations:**

- Test with special characters: spaces, dashes, quotes, emojis
- Test very long text (500+ characters)
- Test browser back/forward buttons
- Test direct URL access (paste link in new tab)
- Test clearing input (URL should update)
- Test rapid typing (debounce should work)

## Alternative Approaches

**Option A (Recommended):** pushState with debouncing

- Pros: Clean URLs, no page reload, good UX
- Cons: Slightly more complex

**Option B:** Hash-based routing (#q=hello)

- Pros: Simpler, works without server config
- Cons: Less clean URLs, hash visible

**Option C:** Full URL replacement

- Pros: Simplest implementation
- Cons: Creates history entry on every change (bad UX)

Recommendation: Option A provides the best user experience.