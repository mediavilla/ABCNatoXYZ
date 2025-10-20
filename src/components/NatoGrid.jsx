import { motion } from 'framer-motion';
import { NATO_ALPHABET } from '../data/natoAlphabet';
import MorseRenderer from './MorseRenderer';

const NatoGrid = ({ showFlags, showMorse }) => {
  const letters = Object.entries(NATO_ALPHABET);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
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

  return (
    <motion.div
      className="w-full max-w-4xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      role="region"
      aria-label="NATO Phonetic Alphabet Reference Grid"
    >
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4"
        variants={containerVariants}
        role="grid"
        aria-label="Alphabet letters and their NATO phonetic equivalents"
      >
        {letters.map(([letter, word]) => (
          <motion.div
            key={letter}
            className="bg-card border rounded-md p-3 sm:p-4 hover:bg-accent transition-colors duration-200"
            variants={itemVariants}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
            role="gridcell"
            aria-label={`${letter} for ${word}`}
            tabIndex={0}
          >
            <div className="grid grid-rows-3 h-full">
              {/* Top row with 3 columns */}
              <div className="grid grid-cols-3 items-center">
                {/* Letter - top left */}
                <div className="text-lg sm:text-xl text-foreground font-normal">
                  {letter}
                </div>
                {/* Empty middle column */}
                <div></div>
                {/* Flag - top right */}
                <div className="flex justify-end">
                  {showFlags && (
                    <img
                      src={`/flags/${letter.toLowerCase()}.svg`}
                      alt={`${letter} flag`}
                      className="w-6 h-4 sm:w-8 sm:h-5"
                    />
                  )}
                </div>
              </div>
              
              {/* Middle row - codeword */}
              <div className="flex items-center justify-center">
                <div className="text-sm sm:text-base text-muted-foreground font-bold">
                  {word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()}
                </div>
              </div>
              
              {/* Bottom row - morse code */}
              <div className="flex items-center justify-center">
                <MorseRenderer char={letter} showMorse={showMorse} />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default NatoGrid;
