import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MorseRenderer from './MorseRenderer';

const TranslationResult = ({ lines, showFlags, showMorse, currentLetterIndex, currentSymbolIndex }) => {
  /**
   * Build a stable structure from `lines`:
   * - words[]: each word has a stable wordIndex, original text, letters[], chunks[], count, and offset
   * - letters[]: each letter has a stable absIndex within its word
   * Chunks are ONLY for layout; keys and highlight logic use offsets + absIndex.
   */
  const processed = useMemo(() => {
    if (!lines || lines.length === 0) return { words: [], totalLetters: 0 };

    const words = lines.map((wordParts, wordIndex) => {
      // letters derived from "X – Xray" parts
      const letters = wordParts.map((part, i) => {
        const [letter, nato] = part.split(' – ');
        return { absIndex: i, letter, nato };
      });

      const original = letters.map(l => l.letter).join('');

      // Chunk ONLY for layout purposes (do not use chunk indices for keys/logic)
      const chunks = [];
      const maxCharsPerRow = 22;
      for (let i = 0; i < letters.length; i += maxCharsPerRow) {
        chunks.push(letters.slice(i, i + maxCharsPerRow));
      }

      return {
        wordIndex,
        original,
        letters,
        chunks,
        count: letters.length,
      };
    });

    // Pre-compute offsets so we can get a global index quickly
    let running = 0;
    const withOffsets = words.map(w => {
      const offset = running;
      running += w.count;
      return { ...w, offset };
    });

    return { words: withOffsets, totalLetters: running };
  }, [lines]);

  if (processed.words.length === 0) {
    return null;
  }

  // Framer Motion: only animate true mounts/unmounts; do not replay on every keystroke.
  const letterVariants = {
    initial: { opacity: 0, y: 6, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.18, ease: 'easeOut' } },
    exit: { opacity: 0, y: -6, scale: 0.98, transition: { duration: 0.12, ease: 'easeIn' } },
  };

  return (
    <div
      className="w-full max-w-7xl mx-auto"
      role="region"
      aria-label="NATO Phonetic Translation Results"
    >
      <div className="space-y-4">
        {processed.words.map((word) => (
          <div
            key={`word-${word.wordIndex}`}
            className="bg-card border rounded-lg p-4 sm:p-6"
            role="group"
            aria-label={`Word: ${word.original}`}
          >
            <div className="mb-4">
              <span className="text-sm text-muted-foreground">Original: </span>
              <span className="font-medium text-foreground">{word.original}</span>
            </div>

            <div className="space-y-4">
              {word.chunks.map((chunk, chunkIndex) => (
                <div
                  key={`chunk-${word.wordIndex}-${chunkIndex}`}
                  className="grid gap-2 sm:gap-3 nato-cards-container"
                  style={{
                    gridTemplateColumns: `repeat(auto-fit, minmax(100px, 1fr))`,
                    maxWidth: '100%',
                    containerType: 'inline-size'
                  }}
                >
                  <AnimatePresence initial={false}>
                    {chunk.map((item) => {
                      const globalIdx = word.offset + item.absIndex;
                      const isActive = globalIdx === currentLetterIndex;

                      return (
                        <motion.div
                          key={`l-${word.wordIndex}-${item.absIndex}`}
                          className={`bg-card border rounded-md p-3 sm:p-4 hover:bg-accent transition-colors duration-200 ${
                            isActive ? 'ring-2 ring-primary' : ''
                          }`}
                          layout="position"
                          variants={letterVariants}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                          whileHover={{ scale: 1.04, transition: { duration: 0.15 } }}
                          whileTap={{ scale: 0.96 }}
                          role="group"
                          aria-label={`${item.letter} for ${item.nato}`}
                        >
                          <div className="grid grid-rows-3 h-full">
                            {/* Top row with 3 columns */}
                            <div className="grid grid-cols-3 items-center">
                              {/* Letter - top left */}
                              <div className="text-lg sm:text-xl text-foreground font-normal">
                                {item.letter}
                              </div>
                              {/* Empty middle column */}
                              <div />
                              {/* Flag - top right */}
                              <div className="flex justify-end">
                                {showFlags && (
                                  <img
                                    src={`/flags/${item.letter.toLowerCase()}.svg`}
                                    alt={`${item.letter} flag`}
                                    className="w-6 h-4 sm:w-8 sm:h-5"
                                    loading="lazy"
                                    decoding="async"
                                  />
                                )}
                              </div>
                            </div>

                            {/* Middle row - codeword */}
                            <div className="flex items-center justify-center">
                              <div className="text-sm sm:text-base text-muted-foreground font-bold">
                                {item.nato.charAt(0).toUpperCase() + item.nato.slice(1).toLowerCase()}
                              </div>
                            </div>

                            {/* Bottom row - morse code */}
                            <div className="flex items-center justify-center">
                              <MorseRenderer
                                char={item.letter}
                                showMorse={showMorse}
                                isActive={isActive}
                                activeSymbolIndex={currentSymbolIndex}
                              />
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TranslationResult;
