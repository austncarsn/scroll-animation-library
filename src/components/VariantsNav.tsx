import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronRight } from 'lucide-react';

interface VariantNavItem {
  id: string;
  number: string;
  name: string;
  category: string;
}

const variants: VariantNavItem[] = [
  { id: 'parallax', number: '01', name: 'Multi-Layer Parallax', category: 'Depth' },
  { id: 'flip', number: '02', name: '3D Flip Book', category: '3D' },
  { id: 'slider', number: '03', name: 'Slice Slider', category: 'Reveal' },
  { id: 'color', number: '04', name: 'Color Shift', category: 'Color' },
  { id: 'sticky', number: '05', name: 'Sticky Navigation', category: 'Scroll' },
  { id: 'path', number: '06', name: 'Path Animation', category: 'Motion' },
  { id: 'gradient', number: '07', name: 'Scale Gradient', category: 'Scale' },
  { id: 'horizontal', number: '08', name: 'Horizontal Snap', category: 'Scroll' },
  { id: 'stacked', number: '09', name: 'Stacked Cards', category: 'Depth' },
  { id: 'clipPath', number: '10', name: 'Clip Path Reveal', category: 'Reveal' },
  { id: 'circular', number: '11', name: 'Circular Iris', category: 'Reveal' },
  { id: 'splitScreen', number: '12', name: 'Split Screen', category: 'Layout' },
  { id: 'infiniteLoop', number: '13', name: 'Infinite Loop', category: 'Motion' },
  { id: 'morphingBlob', number: '14', name: 'Morphing Blob', category: 'Shape' },
  { id: 'typewriter', number: '15', name: 'Typewriter', category: 'Text' },
  { id: 'zoomOutGrid', number: '16', name: 'Zoom Out Grid', category: 'Scale' },
  { id: 'perspectiveCards', number: '17', name: '3D Perspective', category: '3D' },
  { id: 'textMask', number: '18', name: 'Text Mask Parallax', category: 'Text' },
  { id: 'accordion', number: '19', name: 'Accordion Panels', category: 'Layout' },
];

export function VariantsNav() {
  const [activeSection, setActiveSection] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      for (const variant of variants) {
        const element = document.getElementById(variant.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(variant.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToVariant = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMenuOpen(false);
    }
  };

  const activeVariant = variants.find(v => v.id === activeSection);

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:block sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs tracking-[0.2em] uppercase font-['Inter'] text-neutral-900">Animation Variants</span>
              {activeVariant && (
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-2xl text-neutral-400">{activeVariant.number}</span>
                  <ChevronRight className="w-4 h-4 text-neutral-300" />
                  <span className="text-base text-neutral-900 italic">{activeVariant.name}</span>
                  <span className="text-xs tracking-[0.15em] uppercase font-['Inter'] text-neutral-400 ml-3 px-3 py-1 border border-neutral-200 rounded-full">
                    {activeVariant.category}
                  </span>
                </div>
              )}
            </div>
            <span className="text-sm font-['Inter'] text-neutral-400">
              {variants.findIndex(v => v.id === activeSection) + 1} / {variants.length}
            </span>
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {variants.map((variant) => (
              <motion.button
                key={variant.id}
                onClick={() => scrollToVariant(variant.id)}
                onMouseEnter={() => setHoveredItem(variant.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className="relative flex-shrink-0 px-4 py-3 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-3">
                  <span className={`text-xl transition-colors ${
                    activeSection === variant.id 
                      ? 'text-neutral-900' 
                      : 'text-neutral-300 hover:text-neutral-600'
                  }`}>
                    {variant.number}
                  </span>
                  {(activeSection === variant.id || hoveredItem === variant.id) && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      className="text-sm text-neutral-600 whitespace-nowrap overflow-hidden italic"
                    >
                      {variant.name}
                    </motion.span>
                  )}
                </div>
                {activeSection === variant.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-px bg-neutral-900"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="lg:hidden sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-neutral-200">
        <div className="px-6 py-5 flex items-center justify-between">
          <div className="flex-1">
            <span className="text-xs tracking-[0.2em] uppercase font-['Inter'] text-neutral-900">Variants</span>
            {activeVariant && (
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-lg text-neutral-400">{activeVariant.number}</span>
                <span className="text-sm text-neutral-900 italic">{activeVariant.name}</span>
              </div>
            )}
          </div>
          
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2.5 hover:bg-neutral-100 rounded-md transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-5 h-5 text-neutral-900" />
            ) : (
              <Menu className="w-5 h-5 text-neutral-900" />
            )}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMenuOpen(false)}
                className="fixed inset-0 bg-black/10 backdrop-blur-sm"
                style={{ top: '73px' }}
              />
              
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                className="absolute top-full left-0 right-0 bg-white border-b border-neutral-200 shadow-2xl max-h-[calc(100vh-73px)] overflow-y-auto"
              >
                <div className="p-6 grid grid-cols-1 gap-1">
                  {variants.map((variant) => (
                    <motion.button
                      key={variant.id}
                      onClick={() => scrollToVariant(variant.id)}
                      className={`flex items-center justify-between p-5 rounded-md text-left transition-all ${
                        activeSection === variant.id
                          ? 'bg-neutral-900 text-white'
                          : 'hover:bg-neutral-50'
                      }`}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-5">
                        <span className={`text-xl ${
                          activeSection === variant.id ? 'text-white/60' : 'text-neutral-400'
                        }`}>
                          {variant.number}
                        </span>
                        <div>
                          <div className={`text-base italic ${
                            activeSection === variant.id ? 'text-white' : 'text-neutral-900'
                          }`}>
                            {variant.name}
                          </div>
                          <div className={`text-xs tracking-[0.15em] uppercase font-['Inter'] mt-1 ${
                            activeSection === variant.id ? 'text-white/60' : 'text-neutral-400'
                          }`}>
                            {variant.category}
                          </div>
                        </div>
                      </div>
                      
                      {activeSection === variant.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-2 h-2 rounded-full bg-white"
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}