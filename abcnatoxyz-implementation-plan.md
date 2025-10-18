# ✅ ABCNatoXYZ — To‑Do Backlog

This is the working backlog for the NATO alphabet app. Items are grouped by milestone and priority. Use the checkboxes to track progress. When creating GitHub Issues, you can link them to these tasks or convert checklist items directly in the GitHub UI.

_Last updated: 18 Oct 2025_

---

## 🔶 M2 — Core UI (Grid + Input)

- [ ] **NATO data constant**: `/src/data/natoAlphabet.js` with A–Z → Alpha…Zulu mapping.
- [ ] **Default grid** (`NatoGrid.jsx`): responsive grid (2–4 columns), theme-aware styles, entry animation (stagger).
- [ ] **Text input** (`TextInput.jsx`): centered, accessible label, helper text “Press space to start a new line”, clear (×) button.

---

## 🔷 M3 — Translation Logic + Animated Results

- [ ] **Normalize input** (`/src/lib/normalize.js`): lowercase, remove diacritics, collapse whitespace, trim.
- [ ] **Translate to NATO** (`/src/lib/translate.js`): letters only; map to `X – Xray` format; ignore punctuation (v1).
- [ ] **Precise word breaks**: space → new line in results; multiple spaces become a single break.
- [ ] **Results component** (`TranslationResult.jsx`): one line per word, ` / ` separators between letters.
- [ ] **Reduced motion**: use `useReducedMotion()` to zero-out motion for users who prefer it.
- [ ] **View transition**: `AnimatePresence` grid → results (fade/slide); `layout` for list stability.

---

## 🟣 M3.5 — URL State (Shareable Queries)

- [ ] **Read query** on mount (`/src/lib/urlState.js`): `?q=hello%20world` → input value.
- [ ] **Write query** on change (debounced 150 ms): keep URL in sync without page reloads.

---

## 🟢 M4 — Utilities & UX Polish

- [ ] **Copy to clipboard**: `CopyButton.jsx` with “Copied!” feedback.
- [ ] **Copy formats** (`/src/lib/format.js`): 
  - [ ] Plain text (`H – Hotel / E – Echo ...` on multiple lines).
  - [ ] Markdown (`- H – Hotel / E – Echo ...`).
- [ ] **A11Y**: 
  - [ ] Results container `role="log" aria-live="polite"`.
  - [ ] Input has clear `aria-label`.
  - [ ] Visible focus styles in both themes.
- [ ] **Theming polish**:
  - [ ] Add `color-scheme: light dark;` on `html`.
  - [ ] Ensure input & buttons use tokenized colors (`bg-card`, `text-foreground`, etc.).
- [ ] **Desktop-only auto‑focus** (optional): focus input on load for desktop devices.

---

## 🟦 M5 — Deployment (GitHub Pages)

- [ ] **vite.config.js**: set `base: "/ABCNatoXYZ/"`.
- [ ] **GitHub Action**: `.github/workflows/deploy.yml` to build & deploy `dist` to `gh-pages`.
- [ ] **Project settings**: enable Pages → deploy from GitHub Actions.

---

## 🟠 Tests & Quality (Optional but recommended)

- [ ] **Vitest**: unit tests for `normalizeInput()` and `translateToNato()`.
- [ ] **ESLint + Prettier**: React hooks rules; Tailwind plugin.
- [ ] **Manual cross‑browser tests**: Chrome, Safari, Firefox; mobile Safari/Chrome.

---

## 🧪 Future (Post‑v1 / Nice‑to‑Have)

- [ ] Handle digits/punctuation policy (e.g., `1 – One`, `- – Dash`) with a configurable map.
- [ ] Audio pronunciation for NATO words.
- [ ] PWA/offline mode.
- [ ] Additional color themes and theme switch animation.
- [ ] Export/share: copy as image or PDF.
- [ ] Keyboard shortcuts: `Cmd/Ctrl+K` to focus input; `Esc` to clear input.

---

## 🔗 How to convert these tasks into GitHub Issues

You have a few options:

1) **Directly in GitHub UI (Tasklists)**  
   - Paste sections of this checklist into a new Issue.  
   - Use the “…” menu on each checklist item → **Convert to issue**.  
   - Converted issues can be auto‑added to your Project (see below).

2) **GitHub Projects (v2) Automation**  
   - Create a **Project** (board or table).  
   - In the Project → **Settings → Workflows → Auto‑add to project**, choose “Issues in this repo”.  
   - Now any new Issue you make (including converted checklist items) flows into the backlog automatically.

3) **GitHub CLI (advanced)**  
   - Create issues from the command line and add them to a project:  
     ```bash
     gh issue create --title "Normalize input" --body "Lowercase, strip diacritics, collapse whitespace." --label "M3" 
     gh project item-add --owner "<your-username>" --number <project-number> --url https://github.com/<your-username>/ABCNatoXYZ/issues/<issue-number>
     ```
   - Requires setting up a GitHub Project and knowing its `<project-number>`.

4) **GitHub Actions (automation)**  
   - If you want automatic issue creation from `TODO.md`, use a community action (e.g., “todo-to-issue” style actions).  
   - Caveat: these will create issues from TODO comments or markdown tasklists on push; review the action’s README and limit scope with paths/filters.

> Recommended: Start with **Tasklists + Convert to issue** and enable **Project auto‑add**. It’s native, simple, and keeps everything linked.