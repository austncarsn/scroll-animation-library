import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface ParallaxGridProps {
  images: string[];
}

export function ParallaxGrid({ images }: ParallaxGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Different parallax speeds for layers
  const layer1Y = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
  const layer2Y = useTransform(scrollYProgress, [0, 1], ['0%', '-35%']);
  const layer3Y = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.3]);

  return (
    <section ref={containerRef} className="relative min-h-[200vh] bg-neutral-50">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div style={{ opacity }} className="absolute inset-0 grid grid-cols-5 gap-4 p-8 md:p-12">
          {/* Layer 1 - Slowest */}
          <motion.div 
            style={{ y: layer1Y }}
            className="col-span-3 md:col-span-2 row-span-2 h-[60vh] overflow-hidden rounded-sm shadow-lg"
          >
            <img 
              src={images[0]} 
              alt="Fashion 1" 
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" 
              loading="lazy"
            />
          </motion.div>

          {/* Layer 2 - Medium speed */}
          <motion.div 
            style={{ y: layer2Y }}
            className="col-start-4 md:col-start-3 col-span-2 row-span-1 h-[35vh] overflow-hidden rounded-sm shadow-lg"
          >
            <img 
              src={images[1]} 
              alt="Fashion 2" 
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
          </motion.div>

          {/* Layer 3 - Fastest */}
          <motion.div 
            style={{ y: layer3Y }}
            className="col-start-3 md:col-start-4 col-span-2 row-start-2 h-[40vh] overflow-hidden rounded-sm shadow-lg"
          >
            <img 
              src={images[2]} 
              alt="Fashion 3" 
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
          </motion.div>

          {/* Additional layer with different timing */}
          <motion.div 
            style={{ y: layer1Y }}
            className="col-start-1 col-span-2 md:col-span-1 row-start-3 h-[30vh] overflow-hidden rounded-sm shadow-lg"
          >
            <img 
              src={images[3]} 
              alt="Fashion 4" 
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
          </motion.div>

          <motion.div 
            style={{ y: layer3Y }}
            className="col-start-3 md:col-start-2 col-span-2 row-start-3 h-[30vh] overflow-hidden rounded-sm shadow-lg"
          >
            <img 
              src={images[4]} 
              alt="Fashion 5" 
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
          </motion.div>
        </motion.div>

        {/* Variant annotation overlay */}
        <div className="absolute top-4 left-4 md:top-8 md:left-8 bg-white/90 backdrop-blur-md px-4 py-3 md:px-6 md:py-4 rounded-lg max-w-sm shadow-xl border border-neutral-200">
          <h3 className="text-neutral-900 mb-2">Variant 1: Multi-Layer Parallax</h3>
          <p className="text-sm text-neutral-600">
            Outer layers move slower (animation-range: entry 100% exit 0%), revealing inner fashion images with staggered depth.
          </p>
          <code className="block mt-3 text-xs text-neutral-500 bg-neutral-100 p-2 rounded font-mono">
            animation-timeline: scroll();
            <br />transform: translateY(calc(var(--scroll) * -50%));
          </code>
        </div>
      </div>
    </section>
  );
}