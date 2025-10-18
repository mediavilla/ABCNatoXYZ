# ABC NATO.XYZ — NATO Alphabet Web App

ABCNatoXYZ is an interactive web application that allows users to explore and translate any text into the NATO phonetic alphabet.  
It displays the full alphabet by default and dynamically updates to show the phonetic representation of any text entered by the user, one word per line.  
The app is fully responsive, theme‑aware (light/dark/system), and built for smooth, animated interactions.

---

## 🚀 Tech Stack

- **Vite + React** — Lightning‑fast frontend build system and component framework.
- **Tailwind CSS (v3)** — Utility‑first CSS for responsive layout and theming.
- **next‑themes** — Automatic light/dark/system theme detection and persistence.
- **Framer Motion** — Smooth page and component animations.
- **shadcn/ui (planned)** — Polished, accessible UI components built on Tailwind and Radix.
- **GitHub Pages** — Free static hosting for deployment.

---

## 🧰 Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/<your-username>/ABCNatoXYZ.git
   cd ABCNatoXYZ
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the dev server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`.

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview the build**
   ```bash
   npm run preview
   ```

---

## 🌗 Theming

The site automatically follows the user’s system preference (light or dark).  
A theme toggle in the header lets users manually switch or revert to system mode.

Theming is managed with:
- `next-themes` for preference handling
- Tailwind CSS custom properties (`--background`, `--foreground`, etc.)

---

## 🎯 Planned Features

- NATO phonetic grid + dynamic translation
- Character and word‑level animation using Framer Motion
- Copy‑to‑clipboard functionality for results
- Additional color themes and accessibility options
- Progressive enhancement for offline use (PWA)

---

## 🧑‍💻 Author

**Juan Mediavilla**  
Project: [ABCNatoXYZ](https://github.com/<your-username>/ABCNatoXYZ)

---

> Built with ❤️ using Vite, React, and Tailwind.
