import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './components/ThemeToggle';
import TextInput from './components/TextInput';
import NatoGrid from './components/NatoGrid';
import TranslationResult from './components/TranslationResult';
import CopyButton from './components/CopyButton';
import { getNatoWord, isAlphabetic } from './data/natoAlphabet';

export default function App() {
  const [inputText, setInputText] = useState('');

  const handleInputChange = (value) => {
    setInputText(value);
  };

  const handleClearInput = () => {
    setInputText('');
  };

  // Generate copy-friendly text
  const generateCopyText = (text) => {
    if (!text.trim()) return '';
    
    const words = text.split(/\s+/).filter(word => word.length > 0);
    
    return words.map(word => {
      const letters = word.split('');
      const natoTranslations = letters
        .filter(isAlphabetic)
        .map(letter => `${letter.toUpperCase()} - ${getNatoWord(letter)}`)
        .filter(item => item.includes(' - '));
      
      return natoTranslations.join(' / ');
    }).join('\n');
  };

  const copyText = generateCopyText(inputText);
  const hasInput = inputText.trim().length > 0;

  const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className="min-h-dvh flex flex-col"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      <header className="flex items-center justify-between px-4 py-3 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <h1 className="text-lg font-semibold">NATO Alphabet</h1>
        <ThemeToggle />
      </header>

      <main className="flex-1 p-4 flex flex-col items-center justify-center space-y-8">
        <motion.div 
          className="w-full flex flex-col items-center space-y-6"
          variants={contentVariants}
        >
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              NATO Phonetic Alphabet Translator
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
              Type any text to instantly see its NATO phonetic alphabet equivalent. 
              Perfect for learning, communication, and reference.
            </p>
          </div>

          <TextInput 
            value={inputText}
            onChange={handleInputChange}
            onClear={handleClearInput}
          />
        </motion.div>

        <div className="w-full flex flex-col items-center space-y-6">
          <AnimatePresence mode="wait">
            {hasInput ? (
              <motion.div
                key="translation"
                className="w-full flex flex-col items-center space-y-4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <TranslationResult inputText={inputText} />
                {copyText && (
                  <CopyButton textToCopy={copyText} />
                )}
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                className="w-full"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <NatoGrid />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <footer className="px-4 py-3 border-t text-xs text-muted-foreground bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        © {new Date().getFullYear()} ABCNATO.XYZ
      </footer>
    </motion.div>
  )
}