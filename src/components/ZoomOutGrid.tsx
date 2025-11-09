import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface ZoomOutGridProps {
  images: string[];
}

export function ZoomOutGrid({ images }: ZoomOutGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [3, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 1]);

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-neutral-900">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden p-8">
        <motion.div 
          style={{ scale, opacity }}
          className="grid grid-cols-3 gap-4 w-full max-w-6xl"
        >
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              style={{
                opacity: useTransform(
                  scrollYProgress,
                  [0.1 + index * 0.05, 0.3 + index * 0.05],
                  [0, 1]
                )
              }}
              className="aspect-square rounded-sm overflow-hidden"
            >
              <img 
                src={image} 
                alt={`Grid item ${index + 1}`} 
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Center text overlay */}
        <motion.div 
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 1, 0]),
            scale: useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
          }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <h2 className="text-9xl text-white tracking-tighter">
            GALLERY
          </h2>
        </motion.div>

        {/* Annotation */}
        <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-sm px-6 py-4 rounded-sm max-w-sm z-10">
          <h3 className="text-neutral-900 mb-2">Variant 16: Zoom-Out Gallery Grid</h3>
          <p className="text-sm text-neutral-600">
            Grid scales from close-up to full view, revealing multiple items simultaneously.
          </p>
          <code className="block mt-3 text-xs text-neutral-500 bg-neutral-100 p-2 rounded">
            transform: scale(calc(3 - var(--scroll) * 2));<br />
            grid-template-columns: repeat(3, 1fr);
          </code>
        </div>
      </div>
    </section>
  );
}
