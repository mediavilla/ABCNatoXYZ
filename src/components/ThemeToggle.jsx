import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return null // avoid hydration mismatch

  const active = theme === 'system' ? resolvedTheme : theme

  const btn = (label, key, isActive) => (
    <button
      key={key}
      className={`px-2 py-1 rounded-lg border ${isActive ? 'bg-muted' : ''}`}
      onClick={() => setTheme(key)}
      aria-pressed={isActive}
    >
      {label}
    </button>
  )

  return (
    <div className="inline-flex items-center gap-2 rounded-xl border p-1">
      {btn('Light', 'light', active === 'light')}
      {btn('Dark', 'dark', active === 'dark')}
      {btn('System', 'system', theme === 'system')}
    </div>
  )
}