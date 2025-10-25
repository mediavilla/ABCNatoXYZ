import { motion } from 'framer-motion';
import Header from '../components/Header';
import Breadcrumb from '../components/Breadcrumb';
import Footer from '../components/Footer';

export default function Privacy() {
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
      <Header title="Privacy Policy" />
      <Breadcrumb />
      
      <main className="flex-1 p-6 bg-main">
        <div className="max-w-4xl mx-auto">
          <motion.div variants={contentVariants}>
            <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-sm text-muted-foreground mb-8">
                Last updated: {new Date().toLocaleDateString()}
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
                <p className="mb-4">
                  ABCNATO.XYZ ("we," "our," or "us") is committed to protecting your privacy. 
                  This Privacy Policy explains how we collect, use, and safeguard your information 
                  when you use our website and services.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
                <h3 className="text-lg font-medium mb-3">Information You Provide</h3>
                <p className="mb-4">
                  When you use ABCNATO.XYZ, you may provide text input for translation. 
                  This information is processed locally in your browser and is not stored on our servers.
                </p>
                
                <h3 className="text-lg font-medium mb-3">Automatically Collected Information</h3>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>Browser type and version</li>
                  <li>Operating system</li>
                  <li>IP address (anonymized)</li>
                  <li>Pages visited and time spent on site</li>
                  <li>Referral source</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
                <p className="mb-4">We use collected information to:</p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>Provide and improve our services</li>
                  <li>Analyze usage patterns and optimize performance</li>
                  <li>Ensure security and prevent abuse</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Data Storage and Security</h2>
                <p className="mb-4">
                  Your text input is processed entirely in your browser and is not transmitted 
                  to or stored on our servers. We implement appropriate security measures to 
                  protect any data we do collect.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Cookies and Tracking</h2>
                <p className="mb-4">
                  We use minimal cookies for essential functionality such as theme preferences. 
                  We do not use tracking cookies or third-party analytics that collect personal information.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Third-Party Services</h2>
                <p className="mb-4">
                  ABCNATO.XYZ may contain links to third-party websites. We are not responsible 
                  for the privacy practices of these external sites. We encourage you to review 
                  their privacy policies.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
                <p className="mb-4">You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>Access any personal information we hold about you</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Object to processing of your information</li>
                  <li>Data portability</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
                <p className="mb-4">
                  We may update this Privacy Policy from time to time. We will notify you of 
                  any changes by posting the new Privacy Policy on this page and updating the 
                  "Last updated" date.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                <p className="mb-4">
                  If you have any questions about this Privacy Policy or our privacy practices, 
                  please contact us at privacy@abcnato.xyz.
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
