import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumb() {
  const location = useLocation();
  
  // Don't show breadcrumb on home page
  if (location.pathname === '/') {
    return null;
  }

  const pathSegments = location.pathname.split('/').filter(segment => segment !== '');
  
  const breadcrumbVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.nav 
      className="px-4 py-2 bg-muted/30 border-b border-border/50"
      variants={breadcrumbVariants}
      initial="hidden"
      animate="visible"
      aria-label="Breadcrumb"
    >
      <div className="max-w-6xl mx-auto">
        <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
          <li>
            <Link 
              to="/" 
              className="flex items-center hover:text-primary transition-colors duration-200"
            >
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
          </li>
          
          {pathSegments.map((segment, index) => {
            const isLast = index === pathSegments.length - 1;
            const path = '/' + pathSegments.slice(0, index + 1).join('/');
            const displayName = segment.split('-').map(word => 
              word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ');
            
            return (
              <li key={segment} className="flex items-center space-x-2">
                <ChevronRight className="w-4 h-4" />
                {isLast ? (
                  <span className="text-foreground font-medium" aria-current="page">
                    {displayName}
                  </span>
                ) : (
                  <Link 
                    to={path} 
                    className="hover:text-primary transition-colors duration-200"
                  >
                    {displayName}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </motion.nav>
  );
}
