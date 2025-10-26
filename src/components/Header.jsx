import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

export default function Header({ title, showThemeToggle = true, linkToHome = false }) {
  const titleContent = linkToHome ? (
    <motion.a
      href="/"
      className="text-lg font-semibold no-underline"
      whileHover={{ scale: 1.02 }}
    >
      {title}
    </motion.a>
  ) : (
    <motion.h1 
      className="text-lg font-semibold"
      whileHover={{ scale: 1.02 }}
    >
      {title}
    </motion.h1>
  );

  return (
    <header className="flex items-center justify-between px-4 py-3 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {titleContent}
      {showThemeToggle && <ThemeToggle />}
    </header>
  );
}
