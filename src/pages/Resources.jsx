import { motion } from 'framer-motion';
import Header from '../components/Header';
import Breadcrumb from '../components/Breadcrumb';
import Footer from '../components/Footer';

export default function Resources() {
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
      <Header title="Links and Resources" />
      <Breadcrumb />
      
      <main className="flex-1 p-6 bg-main">
        <div className="max-w-4xl mx-auto">
          <motion.div variants={contentVariants}>
            <h1 className="text-4xl font-bold mb-6">Links and Resources</h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-foreground mb-8">
                Useful links and resources related to the NATO phonetic alphabet and communication.
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Official Standards</h2>
                <div className="space-y-4">
                  <div className="bg-card border border-border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">NATO STANAG 2139</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Official NATO standard for the phonetic alphabet
                    </p>
                    <a href="#" className="text-primary hover:underline">Official Documentation</a>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">ICAO Doc 9432</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      International Civil Aviation Organization standards
                    </p>
                    <a href="#" className="text-primary hover:underline">ICAO Standards</a>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Learning Resources</h2>
                <div className="space-y-4">
                  <div className="bg-card border border-border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Aviation Training Materials</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Professional training resources for aviation communication
                    </p>
                    <a href="#" className="text-primary hover:underline">Training Resources</a>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Military Communication Guides</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Military-grade communication protocols and procedures
                    </p>
                    <a href="#" className="text-primary hover:underline">Military Guides</a>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Related Tools</h2>
                <div className="space-y-4">
                  <div className="bg-card border border-border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Morse Code Translators</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Additional tools for morse code learning and practice
                    </p>
                    <a href="#" className="text-primary hover:underline">Morse Tools</a>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Communication Apps</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Mobile applications for professional communication
                    </p>
                    <a href="#" className="text-primary hover:underline">Mobile Apps</a>
                  </div>
                </div>
              </section>

              <div className="mt-12 p-6 bg-muted/30 border border-border rounded-lg">
                <h2 className="text-xl font-semibold mb-3">Suggest a Resource</h2>
                <p className="text-muted-foreground mb-4">
                  Know of a great resource that should be included? We'd love to hear about it.
                </p>
                <a 
                  href="/feedback" 
                  className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200"
                >
                  Submit Resource
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
