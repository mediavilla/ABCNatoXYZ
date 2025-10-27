import { motion } from 'framer-motion';
import Header from '../components/Header';
import Breadcrumb from '../components/Breadcrumb';
import Footer from '../components/Footer';

export default function Roadmap() {
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

  const roadmapItems = [
    {
      phase: "Phase 1 - Current",
      status: "completed",
      items: [
        "Core NATO alphabet translation",
        "Morse code conversion and audio",
        "Visual flag representations",
        "Copy and share functionality",
        "Responsive design",
        "Dark/light theme support"
      ]
    },
    {
      phase: "Phase 2 - Q1 2024",
      status: "in-progress",
      items: [
        "Enhanced audio controls",
        "Customizable playback speed",
        "Multiple language support",
        "Improved mobile experience",
        "Keyboard shortcuts",
        "Offline functionality"
      ]
    },
    {
      phase: "Phase 3 - Q2 2024",
      status: "planned",
      items: [
        "Practice mode with quizzes",
        "Progress tracking",
        "User accounts and preferences",
        "Advanced morse code features",
        "API for developers",
        "Browser extension"
      ]
    },
    {
      phase: "Phase 4 - Q3 2024",
      status: "planned",
      items: [
        "Mobile app development",
        "Voice recognition input",
        "Custom phonetic alphabets",
        "Team collaboration features",
        "Advanced analytics",
        "Integration with communication tools"
      ]
    }
  ];

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
            <h1 className="text-4xl font-bold mb-6">Product Roadmap</h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-foreground mb-8">
                Our roadmap outlines the planned features and improvements for ABCNATO.XYZ. 
                We're committed to continuously enhancing the tool based on user feedback.
              </p>

              <div className="space-y-8">
                {roadmapItems.map((phase, index) => (
                  <motion.div
                    key={phase.phase}
                    className="bg-card border border-border rounded-lg p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-semibold">{phase.phase}</h2>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        phase.status === 'completed' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : phase.status === 'in-progress'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                      }`}>
                        {phase.status === 'completed' ? 'Completed' : 
                         phase.status === 'in-progress' ? 'In Progress' : 'Planned'}
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {phase.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start space-x-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            phase.status === 'completed' 
                              ? 'bg-green-500' 
                              : phase.status === 'in-progress'
                              ? 'bg-blue-500'
                              : 'bg-gray-400'
                          }`}></div>
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>

              <section className="mt-12 p-6 bg-muted/30 border border-border rounded-lg">
                <h2 className="text-xl font-semibold mb-3">Have Suggestions?</h2>
                <p className="text-muted-foreground mb-4">
                  We're always open to new ideas and feature requests. Your input helps shape our roadmap.
                </p>
                <a 
                  href="/feedback" 
                  className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200"
                >
                  Share Your Ideas
                </a>
              </section>

              <section className="mt-8 p-6 bg-card border border-border rounded-lg">
                <h2 className="text-xl font-semibold mb-3">Stay Updated</h2>
                <p className="text-muted-foreground">
                  Roadmap items and timelines may change based on user feedback, technical considerations, 
                  and resource availability. We'll keep this page updated as we progress.
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
