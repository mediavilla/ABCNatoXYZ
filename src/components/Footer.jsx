import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.footer 
      className="px-4 py-8 border-t text-sm text-muted-foreground bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      variants={footerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-6xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Column 1: About & Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">About & Info</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/about" 
                  className="hover:text-primary transition-colors duration-200"
                >
                  About ABCNATO
                </Link>
              </li>
              <li>
                <Link 
                  to="/faq" 
                  className="hover:text-primary transition-colors duration-200"
                >
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/freebies" 
                  className="hover:text-primary transition-colors duration-200"
                >
                  Freebies
                </Link>
              </li>
              <li>
                <Link 
                  to="/articles" 
                  className="hover:text-primary transition-colors duration-200"
                >
                  Articles
                </Link>
              </li>
              <li>
                <Link 
                  to="/resources" 
                  className="hover:text-primary transition-colors duration-200"
                >
                  Links and Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Site */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Site</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/feedback" 
                  className="hover:text-primary transition-colors duration-200"
                >
                  Feedback
                </Link>
              </li>
              <li>
                <Link 
                  to="/roadmap" 
                  className="hover:text-primary transition-colors duration-200"
                >
                  Roadmap
                </Link>
              </li>
              <li>
                <Link 
                  to="/design-system" 
                  className="hover:text-primary transition-colors duration-200"
                >
                  Design System
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Personal Branding */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Created by</h3>
            <div className="space-y-2">
              <a 
                href="https://mediavilla.design" 
                className="hover:text-primary transition-colors duration-200 font-medium"
              >
                MediaVilla Design
              </a>
              <p className="text-xs text-muted-foreground">
                Professional design and development services
              </p>
            </div>
          </div>
        </div>

        {/* Legal Links */}
        <div className="border-t border-border pt-6 mb-6">
          <div className="flex flex-wrap gap-6 text-xs">
            <Link 
              to="/privacy" 
              className="hover:text-primary transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <Link 
              to="/terms" 
              className="hover:text-primary transition-colors duration-200"
            >
              Terms and Conditions
            </Link>
            <Link 
              to="/cookies" 
              className="hover:text-primary transition-colors duration-200"
            >
              Cookie Policy
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-xs text-muted-foreground space-y-1">
          <p>© {currentYear} ABCNATO.XYZ All rights reserved.</p>
          <p>Certain assets (NATO alphabet, flags, and fonts) are public domain or freely licensed.</p>
        </div>
      </div>
    </motion.footer>
  );
}
