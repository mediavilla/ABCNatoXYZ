import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

export default function Header({ title, showThemeToggle = true }) {
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <motion.h1 
        className="text-lg font-semibold"
        whileHover={{ scale: 1.02 }}
      >
        {title}
      </motion.h1>
      {showThemeToggle && <ThemeToggle />}
    </header>
  );
}
