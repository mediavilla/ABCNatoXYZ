import { useState } from 'react';
import { motion } from 'framer-motion';

const TextInput = ({ value, onChange, onClear }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    onClear();
    // Refocus the input after clearing
    setTimeout(() => {
      const input = document.getElementById('nato-input');
      if (input) input.focus();
    }, 100);
  };

  const inputVariants = {
    unfocused: { 
      scale: 1,
      boxShadow: "0 0 0 0px transparent"
    },
    focused: { 
      scale: 1.02,
      boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  const clearButtonVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      x: 10
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      x: 0,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <motion.input
          id="nato-input"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Type any text to see NATO phonetic translation..."
          className="w-full px-4 py-3 sm:px-6 sm:py-4 text-base sm:text-lg bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
          aria-label="Text input for NATO phonetic alphabet translation"
          aria-describedby="input-help"
          autoComplete="off"
          spellCheck="false"
          variants={inputVariants}
          animate={isFocused ? "focused" : "unfocused"}
          inputMode="text"
          autoCapitalize="off"
        />
        
        {value && (
          <motion.button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-accent transition-colors duration-200"
            aria-label="Clear input"
            variants={clearButtonVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg
              className="w-5 h-5 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </motion.button>
        )}
      </div>
      
      <motion.p
        id="input-help"
        className="mt-2 text-sm text-muted-foreground text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Press space to separate words. Only letters will be translated.
      </motion.p>
    </div>
  );
};

export default TextInput;
