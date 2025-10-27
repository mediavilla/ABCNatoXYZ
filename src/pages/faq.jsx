import { motion } from 'framer-motion';
import Header from '../components/Header';
import Breadcrumb from '../components/Breadcrumb';
import Footer from '../components/Footer';

export default function FAQ() {
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

  const faqs = [
    {
      question: "What is the NATO phonetic alphabet?",
      answer: "The NATO phonetic alphabet is a standardized set of words used to represent letters when spelling out words orally. It ensures clear communication, especially in noisy environments or over poor audio connections."
    },
    {
      question: "How do I use ABCNATO.XYZ?",
      answer: "Simply type or paste any text into the input field, and our tool will automatically convert it to NATO phonetic alphabet format. You can also enable flags and morse code features for enhanced learning."
    },
    {
      question: "Is this tool free to use?",
      answer: "Yes, ABCNATO.XYZ is completely free to use. There are no subscriptions, fees, or hidden costs."
    },
    {
      question: "Can I copy the results?",
      answer: "Absolutely! Use the copy button to copy the NATO alphabet translation to your clipboard, or use the share button to create a shareable link."
    },
    {
      question: "Does the tool work on mobile devices?",
      answer: "Yes, ABCNATO.XYZ is fully responsive and works on all devices including smartphones, tablets, and desktop computers."
    },
    {
      question: "What languages are supported?",
      answer: "Currently, ABCNATO.XYZ focuses on the English NATO phonetic alphabet. The tool accepts input in any language but converts letters to their NATO phonetic equivalents."
    },
    {
      question: "Can I hear the morse code?",
      answer: "Yes! Enable the morse code feature and use the play button to hear the audio representation of your text in morse code."
    },
    {
      question: "Is my data stored or tracked?",
      answer: "No, we don't store or track your input data. All translations happen locally in your browser, ensuring your privacy."
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
            <h1 className="text-4xl font-bold mb-6">Frequently Asked Questions</h1>
            
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  className="bg-card border border-border rounded-lg p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <h3 className="text-lg font-semibold mb-3 text-primary">
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground">
                    {faq.answer}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-muted/30 border border-border rounded-lg">
              <h2 className="text-xl font-semibold mb-3">Still have questions?</h2>
              <p className="text-muted-foreground mb-4">
                If you can't find the answer you're looking for, feel free to reach out to us.
              </p>
              <a 
                href="/feedback" 
                className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200"
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </motion.div>
  );
}
