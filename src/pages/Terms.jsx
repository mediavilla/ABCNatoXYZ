import { motion } from 'framer-motion';
import Header from '../components/Header';
import Breadcrumb from '../components/Breadcrumb';
import Footer from '../components/Footer';

export default function Terms() {
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
      <Header title="Terms and Conditions" />
      <Breadcrumb />
      
      <main className="flex-1 p-6 bg-main">
        <div className="max-w-4xl mx-auto">
          <motion.div variants={contentVariants}>
            <h1 className="text-4xl font-bold mb-6">Terms and Conditions</h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-sm text-muted-foreground mb-8">
                Last updated: {new Date().toLocaleDateString()}
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Acceptance of Terms</h2>
                <p className="mb-4">
                  By accessing and using ABCNATO.XYZ ("the Service"), you accept and agree to be bound 
                  by the terms and provision of this agreement. If you do not agree to abide by the 
                  above, please do not use this service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Use License</h2>
                <p className="mb-4">
                  Permission is granted to temporarily use ABCNATO.XYZ for personal, non-commercial 
                  transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose or for any public display</li>
                  <li>Attempt to reverse engineer any software contained on the website</li>
                  <li>Remove any copyright or other proprietary notations from the materials</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Service Availability</h2>
                <p className="mb-4">
                  We strive to maintain the availability of ABCNATO.XYZ, but we do not guarantee 
                  uninterrupted access. The service may be temporarily unavailable due to maintenance, 
                  updates, or technical issues.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">User Conduct</h2>
                <p className="mb-4">You agree not to:</p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>Use the service for any unlawful purpose or to solicit others to perform unlawful acts</li>
                  <li>Violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                  <li>Transmit any worms, viruses, or any code of a destructive nature</li>
                  <li>Attempt to gain unauthorized access to any portion of the service</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
                <p className="mb-4">
                  The NATO phonetic alphabet and related standards are in the public domain. 
                  However, the design, layout, and implementation of ABCNATO.XYZ are proprietary 
                  and protected by copyright and other intellectual property laws.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Disclaimer</h2>
                <p className="mb-4">
                  The information on ABCNATO.XYZ is provided on an "as is" basis. To the fullest 
                  extent permitted by law, we exclude all representations, warranties, conditions, 
                  and terms relating to our website and the use of this website.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
                <p className="mb-4">
                  In no event shall ABCNATO.XYZ or its suppliers be liable for any damages 
                  (including, without limitation, damages for loss of data or profit, or due to 
                  business interruption) arising out of the use or inability to use the materials 
                  on ABCNATO.XYZ.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Accuracy of Materials</h2>
                <p className="mb-4">
                  While we strive for accuracy, the materials appearing on ABCNATO.XYZ could include 
                  technical, typographical, or photographic errors. We do not warrant that any of the 
                  materials on its website are accurate, complete, or current.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Modifications</h2>
                <p className="mb-4">
                  ABCNATO.XYZ may revise these terms of service at any time without notice. 
                  By using this website, you are agreeing to be bound by the then current version 
                  of these terms of service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Governing Law</h2>
                <p className="mb-4">
                  These terms and conditions are governed by and construed in accordance with the 
                  laws of the jurisdiction in which ABCNATO.XYZ operates and you irrevocably submit 
                  to the exclusive jurisdiction of the courts in that state or location.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
                <p className="mb-4">
                  If you have any questions about these Terms and Conditions, please contact us 
                  at legal@abcnato.xyz.
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
