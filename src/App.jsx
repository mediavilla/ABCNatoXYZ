import { useMemo, useState, useEffect, useRef } from "react";
import { translateToNato } from "./lib/translate";
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './components/ThemeToggle';
import TextInput from './components/TextInput';
import NatoGrid from './components/NatoGrid';
import TranslationResult from './components/TranslationResult';
import CopyButton from './components/CopyButton';
import ShareButton from './components/ShareButton';
import { useFavicon } from './hooks/useFavicon';
import { usePageVisibility } from './hooks/usePageVisibility';

export default function App() {
  const [inputText, setInputText] = useState('');
  const isUpdatingFromUrl = useRef(false);
  const debounceTimeoutRef = useRef(null);
  
  // Track page visibility and last alphabetic character for favicon
  const isPageVisible = usePageVisibility();
  const lastAlphabeticChar = useMemo(() => {
    // Find the last alphabetic character in the input
    const matches = inputText.match(/[A-Za-z]/g);
    return matches ? matches[matches.length - 1].toUpperCase() : null;
  }, [inputText]);
  
  // Update favicon based on visibility and last character
  useFavicon(isPageVisible && lastAlphabeticChar ? lastAlphabeticChar : 'A');

  // Initialize inputText from URL on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const qParam = urlParams.get('q');
    
    if (qParam) {
      try {
        const decodedText = decodeURIComponent(qParam);
        // Limit URL parameter length to prevent issues
        if (decodedText.length <= 500) {
          isUpdatingFromUrl.current = true;
          setInputText(decodedText);
          isUpdatingFromUrl.current = false;
        }
      } catch (error) {
        console.warn('Invalid URL parameter, ignoring:', error);
      }
    }
  }, []);

  // Update URL when inputText changes (debounced)
  useEffect(() => {
    if (isUpdatingFromUrl.current) return;

    // Clear existing timeout
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    // Set new timeout for URL update
    debounceTimeoutRef.current = setTimeout(() => {
      const url = new URL(window.location);
      
      if (inputText.trim()) {
        url.searchParams.set('q', encodeURIComponent(inputText));
      } else {
        url.searchParams.delete('q');
      }
      
      window.history.pushState({}, '', url.toString());
    }, 300); // 300ms debounce

    // Cleanup timeout on unmount
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [inputText]);

  // Handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const qParam = urlParams.get('q');
      
      isUpdatingFromUrl.current = true;
      setInputText(qParam ? decodeURIComponent(qParam) : '');
      isUpdatingFromUrl.current = false;
    };

    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const lines = useMemo(() => translateToNato(inputText), [inputText]);

  const handleInputChange = (value) => {
    setInputText(value);
  };

  const handleClearInput = () => {
    setInputText('');
  };

  // Generate copy-friendly text from translated lines
  const generateCopyText = (translatedLines) => {
    if (!translatedLines || translatedLines.length === 0) return '';
    // Each inner array already contains segments like "H – Hotel"
    return translatedLines.map(parts => parts.join(' / ')).join('\n');
  };

  const copyText = generateCopyText(lines);
  const hasInput = lines.length > 0;

  const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
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
      className="min-h-dvh flex flex-col transition-colors duration-300 ease-in-out"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      <header className="flex items-center justify-between px-4 py-3 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <h1 className="text-lg font-semibold">NATO Alphabet</h1>
        <ThemeToggle />
      </header>

      <main className="flex-1 p-4 flex flex-col items-center justify-center space-y-8 bg-main">
        <motion.div 
          className="w-full flex flex-col items-center space-y-6"
          variants={contentVariants}
        >
          <div className="text-center space-y-2">
            <p className="text-sm sm:text-base max-w-2xl">
              Type any text to instantly see its NATO phonetic alphabet equivalent. 
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
                <TranslationResult lines={lines} />
                <div className="flex flex-col sm:flex-row gap-3 items-center">
                  {copyText && (
                    <CopyButton textToCopy={copyText} />
                  )}
                  <ShareButton />
                </div>
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
        <p>© {new Date().getFullYear()} ABCNATO.XYZ All rights reserved.</p>
        <p>Certain assets (NATO alphabet, flags, and fonts) are public domain or freely licensed.</p>
      </footer>
    </motion.div>
  )
}