import { motion } from 'framer-motion';
import Header from '../components/Header';
import Breadcrumb from '../components/Breadcrumb';
import Footer from '../components/Footer';

export default function Freebies() {
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
      <Header title="Freebies" />
      <Breadcrumb />
      
      <main className="flex-1 p-6 bg-main">
        <div className="max-w-4xl mx-auto">
          <motion.div variants={contentVariants}>
            <h1 className="text-4xl font-bold mb-6">Free Resources</h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-foreground mb-8">
                Discover free resources to help you master the NATO phonetic alphabet and improve your communication skills.
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Coming Soon</h2>
                <p className="mb-4">
                  We're working on creating valuable free resources for our users. Check back soon for:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>Printable NATO alphabet reference cards</li>
                  <li>Practice exercises and quizzes</li>
                  <li>Audio pronunciation guides</li>
                  <li>Mobile wallpapers with NATO alphabet</li>
                  <li>Study guides for different professions</li>
                  <li>Customizable flashcards</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Current Free Features</h2>
                <p className="mb-4">
                  While we prepare additional resources, you can already enjoy these free features:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>Unlimited NATO alphabet translations</li>
                  <li>Morse code conversion and audio playback</li>
                  <li>Visual flag representations</li>
                  <li>Copy and share functionality</li>
                  <li>Responsive design for all devices</li>
                  <li>Dark and light themes</li>
                </ul>
              </section>

              <div className="mt-12 p-6 bg-muted/30 border border-border rounded-lg">
                <h2 className="text-xl font-semibold mb-3">Stay Updated</h2>
                <p className="text-muted-foreground mb-4">
                  Want to be notified when new free resources are available? Follow our updates.
                </p>
                <a 
                  href="/feedback" 
                  className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200"
                >
                  Get Notified
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </motion.div>
  );
}
