import ThemeToggle from './components/ThemeToggle'

export default function App() {
  return (
    <div className="min-h-dvh flex flex-col">
      <header className="flex items-center justify-between px-4 py-3 border-b">
        <h1 className="text-lg font-semibold">NATO Alphabet</h1>
        <ThemeToggle />
      </header>

      <main className="flex-1 p-4 flex items-center justify-center">
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">Theming test</p>
          <p>Toggle light/dark/system and check OS preference.</p>
        </div>
      </main>

      <footer className="px-4 py-3 border-t text-xs text-muted-foreground">
        © {new Date().getFullYear()} ABCNATO.XYZ
      </footer>
    </div>
  )
}