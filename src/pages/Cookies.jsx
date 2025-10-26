import { motion } from 'framer-motion';
import Header from '../components/Header';
import Breadcrumb from '../components/Breadcrumb';
import Footer from '../components/Footer';

export default function Cookies() {
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
            <h1 className="text-4xl font-bold mb-6">Cookie Policy</h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-sm text-muted-foreground mb-8">
                Last updated: {new Date().toLocaleDateString()}
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">What Are Cookies</h2>
                <p className="mb-4">
                  Cookies are small text files that are placed on your computer or mobile device 
                  when you visit a website. They are widely used to make websites work more efficiently 
                  and to provide information to website owners.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">How We Use Cookies</h2>
                <p className="mb-4">
                  ABCNATO.XYZ uses cookies minimally and only for essential functionality. 
                  We do not use tracking cookies or third-party analytics that collect personal information.
                </p>
                
                <h3 className="text-lg font-medium mb-3">Essential Cookies</h3>
                <p className="mb-4">
                  These cookies are necessary for the website to function properly and cannot be disabled:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li><strong>Theme Preference:</strong> Stores your dark/light theme choice</li>
                  <li><strong>Session Data:</strong> Maintains your session state</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Types of Cookies We Use</h2>
                
                <div className="space-y-6">
                  <div className="bg-card border border-border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Strictly Necessary Cookies</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      These cookies are essential for the website to function properly.
                    </p>
                    <ul className="text-sm space-y-1">
                      <li>• Theme preference storage</li>
                      <li>• Basic session management</li>
                    </ul>
                  </div>
                  
                  <div className="bg-card border border-border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Functional Cookies</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      These cookies enable enhanced functionality and personalization.
                    </p>
                    <ul className="text-sm space-y-1">
                      <li>• User interface preferences</li>
                      <li>• Accessibility settings</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Third-Party Cookies</h2>
                <p className="mb-4">
                  ABCNATO.XYZ does not use third-party tracking cookies, advertising cookies, 
                  or analytics cookies that collect personal information. We respect your privacy 
                  and keep data collection to a minimum.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Managing Cookies</h2>
                <p className="mb-4">
                  You can control and manage cookies in various ways. Please note that removing 
                  or blocking cookies can impact your user experience and some parts of the website 
                  may not function properly.
                </p>
                
                <h3 className="text-lg font-medium mb-3">Browser Settings</h3>
                <p className="mb-4">
                  Most browsers allow you to refuse cookies or delete them. You can usually find 
                  these settings in the "Options" or "Preferences" menu of your browser.
                </p>
                
                <h3 className="text-lg font-medium mb-3">Browser-Specific Instructions</h3>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li><strong>Chrome:</strong> Settings > Privacy and security > Cookies and other site data</li>
                  <li><strong>Firefox:</strong> Options > Privacy & Security > Cookies and Site Data</li>
                  <li><strong>Safari:</strong> Preferences > Privacy > Manage Website Data</li>
                  <li><strong>Edge:</strong> Settings > Cookies and site permissions</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Cookie Duration</h2>
                <p className="mb-4">
                  Our cookies have different lifespans:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li><strong>Session Cookies:</strong> Deleted when you close your browser</li>
                  <li><strong>Persistent Cookies:</strong> Remain for up to 1 year or until manually deleted</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Updates to This Policy</h2>
                <p className="mb-4">
                  We may update this Cookie Policy from time to time to reflect changes in our 
                  practices or for other operational, legal, or regulatory reasons. We will 
                  notify you of any changes by posting the new Cookie Policy on this page.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                <p className="mb-4">
                  If you have any questions about our use of cookies or this Cookie Policy, 
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
