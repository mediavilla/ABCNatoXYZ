import { motion } from 'framer-motion';
import { NATO_ALPHABET } from '../data/natoAlphabet';

const NatoGrid = () => {
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
            className="bg-card border rounded-lg p-3 sm:p-4 text-center hover:bg-accent transition-colors duration-200"
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
            <div className="text-lg sm:text-xl font-bold text-foreground mb-1">
              {letter}
            </div>
            <div className="text-sm sm:text-base text-muted-foreground">
              {word}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default NatoGrid;
