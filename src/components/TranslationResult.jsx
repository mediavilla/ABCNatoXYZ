import { motion } from 'framer-motion';
import { getNatoWord, isAlphabetic } from '../data/natoAlphabet';

const TranslationResult = ({ inputText }) => {
  // Process input text into words and NATO translations
  const processText = (text) => {
    if (!text.trim()) return [];
    
    const words = text.split(/\s+/).filter(word => word.length > 0);
    
    return words.map(word => {
      const letters = word.split('');
      const natoTranslations = letters
        .filter(isAlphabetic)
        .map(letter => ({
          letter: letter.toUpperCase(),
          nato: getNatoWord(letter)
        }))
        .filter(item => item.nato);
      
      return {
        original: word,
        translations: natoTranslations
      };
    });
  };

  const processedWords = processText(inputText);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      x: -20,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const letterVariants = {
    hidden: { 
      opacity: 0, 
      y: 10,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  if (processedWords.length === 0) {
    return null;
  }

  return (
    <motion.div
      className="w-full max-w-4xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      role="region"
      aria-label="NATO Phonetic Translation Results"
    >
      <motion.div className="space-y-4">
        {processedWords.map((wordData, wordIndex) => (
          <motion.div
            key={`word-${wordIndex}`}
            className="bg-card border rounded-lg p-4 sm:p-6"
            variants={wordVariants}
            role="group"
            aria-label={`Word: ${wordData.original}`}
          >
            <div className="mb-3">
              <span className="text-sm text-muted-foreground">Original: </span>
              <span className="font-medium text-foreground">{wordData.original}</span>
            </div>
            
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {wordData.translations.map((item, letterIndex) => (
                <motion.div
                  key={`${wordIndex}-${letterIndex}`}
                  className="flex items-center gap-1 sm:gap-2 bg-accent rounded-md px-2 sm:px-3 py-1 sm:py-2"
                  variants={letterVariants}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                  role="group"
                  aria-label={`${item.letter} for ${item.nato}`}
                >
                  <span className="text-sm sm:text-base font-bold text-foreground">
                    {item.letter}
                  </span>
                  <span className="text-xs sm:text-sm text-muted-foreground">–</span>
                  <span className="text-sm sm:text-base text-foreground">
                    {item.nato}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default TranslationResult;
