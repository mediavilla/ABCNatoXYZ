import { motion } from 'framer-motion';
import Header from '../components/Header';
import Breadcrumb from '../components/Breadcrumb';
import Footer from '../components/Footer';

export default function Feedback() {
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
      <Header title="NATO Alphabet" linkToHome={true} />
      <Breadcrumb />
      
      <main className="flex-1 p-6 bg-main">
        <div className="max-w-4xl mx-auto">
          <motion.div variants={contentVariants}>
            <h1 className="text-4xl font-bold mb-6">Feedback</h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-foreground mb-8">
                We value your feedback and suggestions. Help us improve ABCNATO.XYZ by sharing your thoughts.
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">How to Reach Us</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-card border border-border rounded-lg p-6">
                    <h3 className="font-semibold mb-3">General Feedback</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Share your thoughts about the tool, suggest improvements, or report any issues you've encountered.
                    </p>
                    <a 
                      href="mailto:feedback@abcnato.xyz" 
                      className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200"
                    >
                      Send Email
                    </a>
                  </div>
                  
                  <div className="bg-card border border-border rounded-lg p-6">
                    <h3 className="font-semibold mb-3">Feature Requests</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Have an idea for a new feature? We'd love to hear about it and consider it for future updates.
                    </p>
                    <a 
                      href="mailto:features@abcnato.xyz" 
                      className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200"
                    >
                      Suggest Feature
                    </a>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">What We're Looking For</h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium">Bug Reports</h4>
                      <p className="text-sm text-muted-foreground">
                        Help us identify and fix any issues you encounter while using the tool.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium">Usability Feedback</h4>
                      <p className="text-sm text-muted-foreground">
                        Share your experience and suggest ways to make the interface more intuitive.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium">Content Suggestions</h4>
                      <p className="text-sm text-muted-foreground">
                        Recommend additional resources, articles, or features that would be valuable.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium">Professional Use Cases</h4>
                      <p className="text-sm text-muted-foreground">
                        Tell us how you use the NATO alphabet in your profession and what features would help.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Response Time</h2>
                <p className="mb-4">
                  We typically respond to feedback within 24-48 hours during business days. 
                  We appreciate your patience and will make sure to address all inquiries.
                </p>
                <p>
                  For urgent issues or technical problems, please include "URGENT" in your subject line 
                  to help us prioritize your message.
                </p>
              </section>

              <div className="mt-12 p-6 bg-muted/30 border border-border rounded-lg">
                <h2 className="text-xl font-semibold mb-3">Thank You</h2>
                <p className="text-muted-foreground">
                  Your feedback helps us make ABCNATO.XYZ better for everyone. We appreciate you taking 
                  the time to share your thoughts and suggestions.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </motion.div>
  );
}
