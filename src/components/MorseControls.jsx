import { motion } from 'framer-motion';

const MorseControls = ({ isPlaying, onPlay, onStop, disabled }) => {
  // Test function to verify audio works
  const testAudio = async () => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.5);
      
      console.log('Test audio played successfully');
    } catch (error) {
      console.error('Test audio failed:', error);
    }
  };
  const buttonVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 10
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  const iconVariants = {
    hover: { scale: 1.1 },
    tap: { scale: 0.9 }
  };

  if (disabled) return null;

  return (
    <div className="flex items-center gap-2">
      {isPlaying ? (
        <motion.button
          type="button"
          onClick={onStop}
          className="flex items-center justify-center px-3 py-2 text-sm font-medium text-foreground bg-background border border-border rounded-md hover:bg-accent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          whileTap="tap"
          aria-label="Stop morse code playback"
        >
          <svg
            className="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <rect x="6" y="6" width="12" height="12" rx="2" />
          </svg>
          <span className="ml-2">Stop</span>
        </motion.button>
      ) : (
        <motion.button
          type="button"
          onClick={onPlay}
          className="flex items-center justify-center px-3 py-2 text-sm font-medium text-foreground bg-background border border-border rounded-md hover:bg-accent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          whileTap="tap"
          aria-label="Play morse code"
        >
          <svg
            className="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
          <span className="ml-2">Play</span>
        </motion.button>
      )}
    </div>
  );
};

export default MorseControls;
