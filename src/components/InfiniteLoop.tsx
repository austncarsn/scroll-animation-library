import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface InfiniteLoopProps {
  images: string[];
}

export function InfiniteLoop({ images }: InfiniteLoopProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);

  // Double the images for seamless loop
  const displayImages = [...images.slice(0, 4), ...images.slice(0, 4)];

  return (
    <section ref={containerRef} className="relative min-h-[200vh] bg-neutral-50 overflow-hidden">
      <div className="sticky top-0 h-screen flex items-center py-8">
        <motion.div 
          style={{ x }}
          className="flex gap-6 md:gap-8 pl-8"
        >
          {displayImages.map((image, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="flex-shrink-0 w-[280px] md:w-[400px] h-[400px] md:h-[500px] rounded-sm overflow-hidden shadow-xl"
            >
              <img 
                src={image} 
                alt={`Item ${(index % 4) + 1}`} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-r from-neutral-50 to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-l from-neutral-50 to-transparent pointer-events-none z-10" />

        {/* Annotation */}
        <div className="absolute top-4 left-4 md:top-8 md:left-8 bg-neutral-900/90 backdrop-blur-md px-4 py-3 md:px-6 md:py-4 rounded-lg max-w-sm shadow-xl z-20">
          <h3 className="text-white mb-2">Variant 13: Infinite Loop Carousel</h3>
          <p className="text-sm text-neutral-300">
            Continuous horizontal scroll with duplicated content for seamless infinite effect.
          </p>
          <code className="block mt-3 text-xs text-neutral-400 bg-black/30 p-2 rounded font-mono">
            transform: translateX(calc(var(--scroll) * -50%));<br />
            content duplication for loop;
          </code>
        </div>
      </div>
    </section>
  );
}