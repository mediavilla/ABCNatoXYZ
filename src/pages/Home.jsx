import { useMemo, useState, useEffect, useRef } from "react";
import { translateToNato } from "../lib/translate";
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from '../components/ThemeToggle';
import TextInput from '../components/TextInput';
import NatoGrid from '../components/NatoGrid';
import TranslationResult from '../components/TranslationResult';
import CopyButton from '../components/CopyButton';
import ShareButton from '../components/ShareButton';
import MorseControls from '../components/MorseControls';
import { useFavicon } from '../hooks/useFavicon';
import { usePageVisibility } from '../hooks/usePageVisibility';
import { useMorsePlayer } from '../hooks/useMorsePlayer';

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [showFlags, setShowFlags] = useState(false);
  const [showMorse, setShowMorse] = useState(false);
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(false);
  const isUpdatingFromUrl = useRef(false);
  const debounceTimeoutRef = useRef(null);
  const prevInputTextRef = useRef('');
  const currentGlobalLetterIndexRef = useRef(0); // Track current global letter position
  
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
    morsePlayer.stop();
    autoPlayMorse.stop();
    currentGlobalLetterIndexRef.current = 0;
  };

  const handleFlagsToggle = (checked) => {
    setShowFlags(checked);
  };

  const handleMorseToggle = (checked) => {
    setShowMorse(checked);
    if (!checked) {
      setAutoPlayEnabled(false);
    }
  };

  const handleAutoPlayToggle = (checked) => {
    setAutoPlayEnabled(checked);
  };

  // Morse player hooks
  const morsePlayer = useMorsePlayer({ wpm: 20, mode: 'replace' });
  const autoPlayMorse = useMorsePlayer({ wpm: 20, mode: 'append' });

  // Auto-play effect: detect character additions and play morse
  useEffect(() => {
    if (!autoPlayEnabled || !showMorse) return;
    
    const prev = prevInputTextRef.current;
    const curr = inputText;
    
    // Detect if a character was added (not removed)
    if (curr.length > prev.length && curr.startsWith(prev)) {
      const newChar = curr[prev.length];
      // Only play if it's a valid morse character
      if (/[A-Za-z0-9]/.test(newChar)) {
        // Update global letter index for the new character
        currentGlobalLetterIndexRef.current = prev.length;
        autoPlayMorse.play(newChar);
      }
    }
    
    prevInputTextRef.current = curr;
  }, [inputText, autoPlayEnabled, showMorse, autoPlayMorse]);

  // Memoize static props to prevent unnecessary re-renders
  const staticProps = useMemo(() => ({
    lines,
    showFlags,
    showMorse
  }), [lines, showFlags, showMorse]);

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

          <TextInput 
            value={inputText}
            onChange={handleInputChange}
            onClear={handleClearInput}
            onFlagsToggle={handleFlagsToggle}
            onMorseToggle={handleMorseToggle}
            onAutoPlayToggle={handleAutoPlayToggle}
            showMorse={showMorse}
            autoPlayEnabled={autoPlayEnabled}
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
                <TranslationResult 
                  {...staticProps}
                  currentLetterIndex={morsePlayer.isPlaying ? morsePlayer.currentLetterIndex : (autoPlayEnabled ? currentGlobalLetterIndexRef.current : morsePlayer.currentLetterIndex)}
                  currentSymbolIndex={morsePlayer.isPlaying ? morsePlayer.currentSymbolIndex : (autoPlayEnabled ? autoPlayMorse.currentSymbolIndex : morsePlayer.currentSymbolIndex)}
                />
                <div className="flex flex-col sm:flex-row gap-3 items-center">
                  {copyText && (
                    <CopyButton textToCopy={copyText} />
                  )}
                  <ShareButton />
                  <MorseControls
                    isPlaying={morsePlayer.isPlaying}
                    onPlay={() => {
                      autoPlayMorse.stop();
                      morsePlayer.play(inputText);
                    }}
                    onStop={morsePlayer.stop}
                    disabled={!hasInput || !showMorse}
                  />
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
                <NatoGrid showFlags={showFlags} showMorse={showMorse} />
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
