import { motion } from 'framer-motion';
import Header from '../components/Header';
import Breadcrumb from '../components/Breadcrumb';
import Footer from '../components/Footer';

export default function About() {
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
      <Header title="About ABCNATO" />
      <Breadcrumb />
      
      <main className="flex-1 p-6 bg-main">
        <div className="max-w-4xl mx-auto">
          <motion.div variants={contentVariants}>
            <h1 className="text-4xl font-bold mb-6">About ABCNATO.XYZ</h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-foreground mb-8">
                ABCNATO.XYZ is a comprehensive tool for learning and using the NATO phonetic alphabet. 
                Our mission is to make communication clearer and more effective through proper phonetic spelling.
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">What is the NATO Alphabet?</h2>
                <p className="mb-4">
                  The NATO phonetic alphabet, officially known as the International Radiotelephony Spelling Alphabet, 
                  is a set of words used to spell out letters when communicating orally. It was developed to improve 
                  communication clarity, especially in noisy environments or over poor connections.
                </p>
                <p>
                  Each letter of the alphabet is assigned a specific word (like "Alpha" for A, "Bravo" for B) 
                  to ensure that letters are clearly understood regardless of language barriers or audio quality.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Our Features</h2>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>Real-time NATO alphabet translation</li>
                  <li>Visual flag representations for each letter</li>
                  <li>Morse code conversion and audio playback</li>
                  <li>Copy and share functionality</li>
                  <li>Responsive design for all devices</li>
                  <li>Dark and light theme support</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Why Use ABCNATO.XYZ?</h2>
                <p className="mb-4">
                  Whether you're a pilot, air traffic controller, military personnel, or simply someone who wants 
                  to improve their communication skills, ABCNATO.XYZ provides an intuitive and comprehensive tool 
                  for learning and using the NATO phonetic alphabet.
                </p>
                <p>
                  Our tool is designed to be fast, accurate, and easy to use, making it perfect for both learning 
                  and practical application in professional settings.
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </motion.div>
  );
}
