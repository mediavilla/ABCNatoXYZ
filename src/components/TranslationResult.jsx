import { motion } from 'framer-motion';
import { getNatoWord, isAlphabetic } from '../data/natoAlphabet';

const TranslationResult = ({ lines }) => {
  // Process lines into display format
  const processLines = (translatedLines) => {
    if (!translatedLines || translatedLines.length === 0) return [];
    
    return translatedLines.map((wordParts, wordIndex) => {
      // Extract original word from the first letter of each part
      const originalWord = wordParts.map(part => part.split(' – ')[0]).join('');
      
      // Convert parts to display format
      const translations = wordParts.map(part => {
        const [letter, nato] = part.split(' – ');
        return { letter, nato };
      });
      
      // Split into chunks of max 22 characters for better layout
      const chunks = [];
      const maxCharsPerRow = 22;
      
      for (let i = 0; i < translations.length; i += maxCharsPerRow) {
        chunks.push(translations.slice(i, i + maxCharsPerRow));
      }
      
      return {
        original: originalWord,
        chunks: chunks
      };
    });
  };

  const processedWords = processLines(lines);

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
      className="w-full max-w-7xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      role="region"
      aria-label="NATO Phonetic Translation Results"
    >
      <motion.div className="space-y-4">
        {processedWords.map((wordData, wordIndex) => (
          <motion.div
            key={`word-${wordIndex}-${wordData.original}`}
            className="bg-card border rounded-lg p-4 sm:p-6"
            variants={wordVariants}
            initial="hidden"
            animate="visible"
            role="group"
            aria-label={`Word: ${wordData.original}`}
          >
            <div className="mb-4">
              <span className="text-sm text-muted-foreground">Original: </span>
              <span className="font-medium text-foreground">{wordData.original}</span>
            </div>
            
            <div className="space-y-4">
              {wordData.chunks.map((chunk, chunkIndex) => (
                <div 
                  key={`chunk-${wordIndex}-${chunkIndex}`}
                  className="grid gap-2 sm:gap-3"
                  style={{
                    gridTemplateColumns: `repeat(auto-fit, minmax(60px, 1fr))`,
                    maxWidth: '100%',
                    containerType: 'inline-size'
                  }}
                >
                  {chunk.map((item, letterIndex) => (
                    <motion.div
                      key={`${wordIndex}-${chunkIndex}-${letterIndex}-${item.letter}-${item.nato}`}
                      className="bg-card border rounded-lg p-3 sm:p-4 text-center hover:bg-accent transition-colors duration-200"
                      variants={letterVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover={{ 
                        scale: 1.05,
                        transition: { duration: 0.2 }
                      }}
                      whileTap={{ scale: 0.95 }}
                      role="group"
                      aria-label={`${item.letter} for ${item.nato}`}
                    >
                      <div className="text-lg sm:text-xl font-bold text-foreground mb-1">
                        {item.letter}
                      </div>
                      <div className="text-sm sm:text-base text-muted-foreground">
                        {item.nato}
                      </div>
                    </motion.div>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default TranslationResult;
