import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface SplitScreenProps {
  images: string[];
}

export function SplitScreen({ images }: SplitScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const leftX = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);
  const rightX = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-neutral-900">
      <div className="sticky top-0 h-screen flex overflow-hidden">
        {/* Left panel */}
        <motion.div 
          style={{ x: leftX }}
          className="w-1/2 h-full relative"
        >
          <img 
            src={images[0]} 
            alt="Left panel" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <h2 className="text-6xl text-white tracking-tighter">BEFORE</h2>
          </div>
        </motion.div>

        {/* Right panel */}
        <motion.div 
          style={{ x: rightX }}
          className="w-1/2 h-full relative"
        >
          <img 
            src={images[1]} 
            alt="Right panel" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <h2 className="text-6xl text-white tracking-tighter">AFTER</h2>
          </div>
        </motion.div>

        {/* Center divider */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-full bg-white/50 z-10" />
        
        {/* Center circle indicator */}
        <motion.div 
          style={{
            scale: useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.5, 1])
          }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-2 border-white bg-neutral-900/50 backdrop-blur-sm z-20"
        />

        {/* Annotation */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-6 py-4 rounded-sm max-w-sm z-30">
          <h3 className="text-neutral-900 mb-2">Variant 12: Split Screen Slide</h3>
          <p className="text-sm text-neutral-600">
            Dual panels slide apart to reveal center content with synchronized motion.
          </p>
          <code className="block mt-3 text-xs text-neutral-500 bg-neutral-100 p-2 rounded">
            transform: translateX(calc(var(--scroll) * -50%));<br />
            split-screen effect;
          </code>
        </div>
      </div>
    </section>
  );
}
