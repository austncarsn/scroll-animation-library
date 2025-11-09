import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface PathAnimationProps {
  images: string[];
}

export function PathAnimation({ images }: PathAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={containerRef} className="relative min-h-[200vh] bg-neutral-100">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* SVG Path overlay */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M 100 200 Q 400 100, 700 400 T 1400 500 Q 1200 700, 1600 800"
            fill="none"
            stroke="#171717"
            strokeWidth="2"
            strokeDasharray="0 1"
            style={{ 
              pathLength,
              opacity: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
            }}
          />
        </svg>

        {/* Image grid connected by path */}
        <div className="relative grid grid-cols-3 gap-8 p-16 h-full">
          {images.slice(0, 3).map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              style={{
                opacity: useTransform(
                  scrollYProgress, 
                  [index * 0.2, index * 0.2 + 0.3], 
                  [0, 1]
                ),
                y: useTransform(
                  scrollYProgress,
                  [index * 0.2, index * 0.2 + 0.3],
                  [50, 0]
                )
              }}
              className="h-[60vh] rounded-sm overflow-hidden"
            >
              <img src={image} alt={`Connected ${index + 1}`} className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </div>

        {/* Annotation */}
        <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-sm px-6 py-4 rounded-sm max-w-sm">
          <h3 className="text-neutral-900 mb-2">Variant 6: SVG Path Drawing</h3>
          <p className="text-sm text-neutral-600">
            Curves animate to connect scrolled elements, adding custom visual flair with stroke-dasharray.
          </p>
          <code className="block mt-3 text-xs text-neutral-500 bg-neutral-100 p-2 rounded">
            stroke-dasharray: 1000;<br />
            stroke-dashoffset: 1000;<br />
            animation: draw 3s linear forwards;
          </code>
        </div>
      </div>
    </section>
  );
}
