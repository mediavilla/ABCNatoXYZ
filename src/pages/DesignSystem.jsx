import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Copy, Home, Sun, Moon, Check, VolumeX, Volume2 } from 'lucide-react';
import Header from '../components/Header';
import Breadcrumb from '../components/Breadcrumb';
import Footer from '../components/Footer';
import CopyButton from '../components/CopyButton';
import ShareButton from '../components/ShareButton';

// Color swatch component
const ColorSwatch = ({ name, value, description }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="flex items-center gap-3 p-3 bg-card border border-border rounded-lg">
      <div 
        className="w-12 h-12 rounded-lg border border-border shadow-sm"
        style={{ backgroundColor: `hsl(${value})` }}
      />
      <div className="flex-1">
        <div className="font-medium text-sm">{name}</div>
        <div className="text-xs text-muted-foreground">{description}</div>
        <div className="text-xs font-mono text-muted-foreground mt-1">{value}</div>
      </div>
      <motion.button
        onClick={handleCopy}
        className="p-2 rounded-md hover:bg-muted transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-600" />
        ) : (
          <Copy className="w-4 h-4 text-muted-foreground" />
        )}
      </motion.button>
    </div>
  );
};

// Typography example component
const TypographyExample = ({ className, label, description }) => (
  <div className="space-y-2">
    <div className="text-sm text-muted-foreground">{label}</div>
    <div className={`${className} ${description ? 'text-muted-foreground' : ''}`}>
      {description || 'The quick brown fox jumps over the lazy dog'}
    </div>
    <div className="text-xs font-mono text-muted-foreground">{className}</div>
  </div>
);

// Spacing example component
const SpacingExample = ({ size, label }) => (
  <div className="space-y-2">
    <div className="text-sm text-muted-foreground">{label}</div>
    <div className="flex items-center gap-2">
      <div className="w-4 h-4 bg-primary rounded"></div>
      <div 
        className="bg-muted rounded"
        style={{ width: `${size * 4}px`, height: `${size * 4}px` }}
      />
      <div className="text-xs font-mono text-muted-foreground">{size * 4}px</div>
    </div>
  </div>
);

// Button example component
const ButtonExample = ({ variant, children, disabled = false }) => {
  const baseClasses = "px-4 py-2 rounded-lg font-medium transition-all duration-200";
  
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-muted text-muted-foreground hover:bg-muted/80",
    outline: "border border-border bg-background hover:bg-muted",
    ghost: "hover:bg-muted"
  };

  return (
    <motion.button
      className={`${baseClasses} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
    >
      {children}
    </motion.button>
  );
};

// Custom toggle switch component (from TextInput)
const ToggleSwitch = ({ enabled, onToggle, disabled }) => {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      disabled={disabled}
      className={`relative inline-flex h-6 w-11 items-center rounded-full border border-border transition-colors duration-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background ${
        enabled 
          ? 'bg-primary' 
          : 'bg-muted'
      } ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
      aria-label={enabled ? "Disable toggle" : "Enable toggle"}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
    >
      <motion.span
        className={`inline-flex h-5 w-5 transform rounded-full bg-background shadow-lg items-center justify-center pointer-events-none`}
        animate={{
          x: enabled ? 20 : 2
        }}
        transition={{
          type: "spring",
          stiffness: 800,
          damping: 25,
          duration: 0.15
        }}
      >
        {enabled ? (
          <Volume2 className="h-3 w-3 text-primary" />
        ) : (
          <VolumeX className="h-3 w-3 text-muted-foreground" />
        )}
      </motion.span>
    </motion.button>
  );
};

export default function DesignSystem() {
  const { theme, resolvedTheme } = useTheme();
  const [colors, setColors] = useState({});
  const [toggleEnabled, setToggleEnabled] = useState(false);

  // Extract colors from CSS variables
  useEffect(() => {
    const root = document.documentElement;
    const computedStyle = getComputedStyle(root);
    
    const colorVars = [
      'background', 'foreground', 'main',
      'card', 'card-foreground',
      'primary', 'primary-foreground',
      'muted', 'muted-foreground',
      'border', 'input', 'ring'
    ];

    const extractedColors = {};
    colorVars.forEach(colorVar => {
      const value = computedStyle.getPropertyValue(`--${colorVar}`).trim();
      if (value) {
        extractedColors[colorVar] = value;
      }
    });

    setColors(extractedColors);
  }, [resolvedTheme]);

  const currentTheme = theme === 'system' ? resolvedTheme : theme;

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

  const sectionVariants = {
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
      <Header title="Design System" />
      <Breadcrumb />

      <main className="flex-1 p-6 bg-main">
        <div className="max-w-6xl mx-auto space-y-12">
          
          {/* Introduction */}
          <motion.section variants={sectionVariants}>
            <h1 className="text-4xl font-bold mb-4">Design System</h1>
            <p className="text-lg text-muted-foreground mb-6">
              Complete reference for colors, typography, spacing, and components used in ABCNATO.XYZ
            </p>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Current theme:</span>
                <span className="font-medium capitalize">{currentTheme}</span>
                <span>•</span>
                <span>System font stack</span>
              </div>
            </div>
          </motion.section>

          {/* Color System */}
          <motion.section variants={sectionVariants}>
            <h2 className="text-2xl font-bold mb-6">Color System</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(colors).map(([name, value]) => (
                <ColorSwatch
                  key={name}
                  name={name}
                  value={value}
                  description={`CSS variable: --${name}`}
                />
              ))}
            </div>
          </motion.section>

          {/* Typography */}
          <motion.section variants={sectionVariants}>
            <h2 className="text-2xl font-bold mb-6">Typography</h2>
            <div className="space-y-8">
              
              {/* Font Sizes */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Font Sizes</h3>
                <div className="space-y-4">
                  <TypographyExample className="text-xs" label="Extra Small" />
                  <TypographyExample className="text-sm" label="Small" />
                  <TypographyExample className="text-base" label="Base" />
                  <TypographyExample className="text-lg" label="Large" />
                  <TypographyExample className="text-xl" label="Extra Large" />
                  <TypographyExample className="text-2xl" label="2X Large" />
                  <TypographyExample className="text-3xl" label="3X Large" />
                  <TypographyExample className="text-4xl" label="4X Large" />
                </div>
              </div>

              {/* Font Weights */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Font Weights</h3>
                <div className="space-y-4">
                  <TypographyExample className="font-light" label="Light (300)" />
                  <TypographyExample className="font-normal" label="Normal (400)" />
                  <TypographyExample className="font-medium" label="Medium (500)" />
                  <TypographyExample className="font-semibold" label="Semibold (600)" />
                  <TypographyExample className="font-bold" label="Bold (700)" />
                </div>
              </div>

              {/* Line Heights */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Line Heights</h3>
                <div className="space-y-4">
                  <TypographyExample className="leading-tight" label="Tight" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />
                  <TypographyExample className="leading-normal" label="Normal" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />
                  <TypographyExample className="leading-relaxed" label="Relaxed" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />
                  <TypographyExample className="leading-loose" label="Loose" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />
                </div>
              </div>
            </div>
          </motion.section>

          {/* Spacing System */}
          <motion.section variants={sectionVariants}>
            <h2 className="text-2xl font-bold mb-6">Spacing System</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[0, 1, 2, 3, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96].map(size => (
                <SpacingExample key={size} size={size} label={`${size * 4}px`} />
              ))}
            </div>
          </motion.section>

          {/* Border Radius */}
          <motion.section variants={sectionVariants}>
            <h2 className="text-2xl font-bold mb-6">Border Radius</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { class: 'rounded-none', label: 'None' },
                { class: 'rounded-sm', label: 'Small' },
                { class: 'rounded', label: 'Default' },
                { class: 'rounded-md', label: 'Medium' },
                { class: 'rounded-lg', label: 'Large' },
                { class: 'rounded-xl', label: 'Extra Large (1rem)' },
                { class: 'rounded-2xl', label: '2X Large (1.25rem)' },
                { class: 'rounded-full', label: 'Full' }
              ].map(({ class: className, label }) => (
                <div key={className} className="space-y-2">
                  <div className="text-sm text-muted-foreground">{label}</div>
                  <div className={`w-16 h-16 bg-primary ${className}`}></div>
                  <div className="text-xs font-mono text-muted-foreground">{className}</div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Component Styles */}
          <motion.section variants={sectionVariants}>
            <h2 className="text-2xl font-bold mb-6">Component Styles</h2>
            
            {/* Buttons */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Buttons</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Primary</div>
                  <div className="flex gap-3">
                    <ButtonExample variant="primary">Primary</ButtonExample>
                    <ButtonExample variant="primary" disabled>Disabled</ButtonExample>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Secondary</div>
                  <div className="flex gap-3">
                    <ButtonExample variant="secondary">Secondary</ButtonExample>
                    <ButtonExample variant="secondary" disabled>Disabled</ButtonExample>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Outline</div>
                  <div className="flex gap-3">
                    <ButtonExample variant="outline">Outline</ButtonExample>
                    <ButtonExample variant="outline" disabled>Disabled</ButtonExample>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Ghost</div>
                  <div className="flex gap-3">
                    <ButtonExample variant="ghost">Ghost</ButtonExample>
                    <ButtonExample variant="ghost" disabled>Disabled</ButtonExample>
                  </div>
                </div>
              </div>
            </div>

            {/* Inputs */}
            <div className="space-y-6 mt-8">
              <h3 className="text-lg font-semibold">Inputs</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Text Input</div>
                  <input
                    type="text"
                    placeholder="Placeholder text"
                    className="w-full max-w-md px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-2">With Value</div>
                  <input
                    type="text"
                    value="Sample text"
                    className="w-full max-w-md px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>
            </div>

            {/* Toggle Switches */}
            <div className="space-y-6 mt-8">
              <h3 className="text-lg font-semibold">Toggle Switches</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <ToggleSwitch enabled={toggleEnabled} onToggle={() => setToggleEnabled(!toggleEnabled)} />
                  <span className="text-sm text-muted-foreground">Custom Toggle Switch</span>
                </div>
                <div className="flex items-center gap-4">
                  <ToggleSwitch enabled={false} onToggle={() => {}} disabled />
                  <span className="text-sm text-muted-foreground">Disabled Toggle Switch</span>
                </div>
              </div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-6 mt-8">
              <h3 className="text-lg font-semibold">Checkboxes</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2" />
                  <span className="text-sm">Unchecked</span>
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" checked className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2" />
                  <span className="text-sm">Checked</span>
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" disabled className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2" />
                  <span className="text-sm text-muted-foreground">Disabled</span>
                </div>
              </div>
            </div>

            {/* Cards */}
            <div className="space-y-6 mt-8">
              <h3 className="text-lg font-semibold">Cards</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Card Title</h4>
                  <p className="text-sm text-muted-foreground">This is a card with default styling.</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-4">
                  <h4 className="font-semibold mb-2">Rounded Card</h4>
                  <p className="text-sm text-muted-foreground">This card uses rounded-xl styling.</p>
                </div>
              </div>
            </div>

            {/* Icons */}
            <div className="space-y-6 mt-8">
              <h3 className="text-lg font-semibold">Icons (Lucide React)</h3>
              <div className="grid grid-cols-6 md:grid-cols-12 gap-4">
                {[Home, Copy, Check, Sun, Moon, VolumeX, Volume2].map((Icon, index) => (
                  <div key={index} className="flex flex-col items-center gap-2 p-3 bg-card border border-border rounded-lg">
                    <Icon className="w-6 h-6 text-primary" />
                    <span className="text-xs text-muted-foreground">{Icon.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Interactive Elements */}
          <motion.section variants={sectionVariants}>
            <h2 className="text-2xl font-bold mb-6">Interactive Elements</h2>
            
            {/* Focus States */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Focus States</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Focus Ring</div>
                  <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background">
                    Focus me
                  </button>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Input Focus</div>
                  <input
                    type="text"
                    className="px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Focus this input"
                  />
                </div>
              </div>
            </div>

            {/* Transitions */}
            <div className="space-y-6 mt-8">
              <h3 className="text-lg font-semibold">Transitions</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Color Transition</div>
                  <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200">
                    Hover for color transition
                  </button>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Scale Transition</div>
                  <motion.button
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    Hover for scale transition
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Layout Components */}
          <motion.section variants={sectionVariants}>
            <h2 className="text-2xl font-bold mb-6">Layout Components</h2>
            
            {/* Grid Examples */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Grid Layouts</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Auto-fit Grid</div>
                  <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-3">
                    {Array.from({ length: 6 }, (_, i) => (
                      <div key={i} className="bg-card border border-border rounded-lg p-3 text-center text-sm">
                        Item {i + 1}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Responsive Grid</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {Array.from({ length: 6 }, (_, i) => (
                      <div key={i} className="bg-card border border-border rounded-lg p-3 text-center text-sm">
                        Responsive {i + 1}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Flexbox Examples */}
            <div className="space-y-6 mt-8">
              <h3 className="text-lg font-semibold">Flexbox Patterns</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Space Between</div>
                  <div className="flex justify-between items-center bg-card border border-border rounded-lg p-4">
                    <span className="text-sm">Left</span>
                    <span className="text-sm">Center</span>
                    <span className="text-sm">Right</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Center</div>
                  <div className="flex justify-center items-center bg-card border border-border rounded-lg p-4">
                    <span className="text-sm">Centered Content</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Gap</div>
                  <div className="flex gap-3 bg-card border border-border rounded-lg p-4">
                    {Array.from({ length: 3 }, (_, i) => (
                      <div key={i} className="bg-primary text-primary-foreground px-3 py-1 rounded text-sm">
                        Gap {i + 1}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Real Components */}
          <motion.section variants={sectionVariants}>
            <h2 className="text-2xl font-bold mb-6">Real Components</h2>
            <div className="space-y-6">
              <div>
                <div className="text-sm text-muted-foreground mb-2">Copy Button</div>
                <CopyButton textToCopy="Sample text to copy" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-2">Share Button</div>
                <ShareButton />
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-2">Theme Toggle</div>
                <div className="text-sm text-muted-foreground">Available in header</div>
              </div>
            </div>
          </motion.section>

        </div>
      </main>

      <Footer />
    </motion.div>
  );
}
