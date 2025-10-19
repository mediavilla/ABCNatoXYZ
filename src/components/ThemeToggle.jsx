import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Set initial theme to system preference if not already set
    if (!theme || theme === 'system') {
      setTheme('system')
    }
  }, [theme, setTheme])

  if (!mounted) return null // avoid hydration mismatch

  const currentTheme = theme === 'system' ? resolvedTheme : theme
  const isDark = currentTheme === 'dark'
  const nextTheme = isDark ? 'light' : 'dark'
  const Icon = isDark ? Sun : Moon
  const ariaLabel = `Switch to ${isDark ? 'light' : 'dark'} theme`

  return (
    <motion.button
      className="p-2 rounded-lg border bg-background hover:bg-accent transition-colors duration-200 relative overflow-hidden"
      onClick={() => setTheme(nextTheme)}
      aria-label={ariaLabel}
      title={ariaLabel}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={isDark ? 'sun' : 'moon'}
          initial={{ opacity: 0, rotate: -90 }}
          animate={{ opacity: 1, rotate: 0 }}
          exit={{ opacity: 0, rotate: 90 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <Icon className="h-5 w-5" />
        </motion.div>
      </AnimatePresence>
    </motion.button>
  )
}