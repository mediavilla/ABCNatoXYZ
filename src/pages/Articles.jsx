import { motion } from 'framer-motion';
import Header from '../components/Header';
import Breadcrumb from '../components/Breadcrumb';
import Footer from '../components/Footer';

export default function Articles() {
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
      <Header title="Articles" />
      <Breadcrumb />
      
      <main className="flex-1 p-6 bg-main">
        <div className="max-w-4xl mx-auto">
          <motion.div variants={contentVariants}>
            <h1 className="text-4xl font-bold mb-6">Articles & Blog</h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-foreground mb-8">
                Explore articles about communication, the NATO phonetic alphabet, and related topics.
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Coming Soon</h2>
                <p className="mb-4">
                  We're preparing informative articles to help you understand and master effective communication. 
                  Topics will include:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>The history and evolution of the NATO phonetic alphabet</li>
                  <li>Best practices for clear communication</li>
                  <li>Professional applications in aviation and military</li>
                  <li>Common mistakes and how to avoid them</li>
                  <li>Tips for memorizing phonetic alphabets</li>
                  <li>International variations and standards</li>
                  <li>Technology and communication protocols</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Why Read Our Articles?</h2>
                <p className="mb-4">
                  Our articles are written by communication experts and professionals who use phonetic alphabets 
                  in their daily work. You'll get practical insights and real-world applications.
                </p>
                <p>
                  Whether you're a student, professional, or simply curious about effective communication, 
                  our articles will provide valuable knowledge and practical tips.
                </p>
              </section>

              <div className="mt-12 p-6 bg-muted/30 border border-border rounded-lg">
                <h2 className="text-xl font-semibold mb-3">Stay Informed</h2>
                <p className="text-muted-foreground mb-4">
                  Want to be notified when new articles are published? Let us know what topics interest you most.
                </p>
                <a 
                  href="/feedback" 
                  className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200"
                >
                  Suggest Topics
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
