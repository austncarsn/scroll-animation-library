import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface PerspectiveCardsProps {
  images: string[];
}

export function PerspectiveCards({ images }: PerspectiveCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <section ref={containerRef} className="relative min-h-[250vh] bg-neutral-100">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden" style={{ perspective: '2000px' }}>
        <div className="relative w-full max-w-7xl h-[400px] md:h-[600px]">
          {images.slice(0, 3).map((image, index) => {
            const cardProgress = (index - 1) / 2; // -0.5, 0, 0.5
            const rotateY = useTransform(
              scrollYProgress,
              [0, 0.5, 1],
              [cardProgress * -60, 0, cardProgress * 60]
            );
            
            const z = useTransform(
              scrollYProgress,
              [0, 0.5, 1],
              [index === 1 ? 0 : -200, 0, index === 1 ? 0 : -200]
            );
            
            const opacity = useTransform(
              scrollYProgress,
              [0, 0.3, 0.7, 1],
              [0.5, 1, 1, 0.5]
            );

            return (
              <motion.div
                key={index}
                style={{
                  rotateY,
                  z,
                  opacity,
                  transformStyle: 'preserve-3d'
                }}
                className="absolute inset-0 mx-auto w-[280px] md:w-[400px] h-full rounded-lg overflow-hidden shadow-2xl backface-hidden"
              >
                <img 
                  src={image} 
                  alt={`Perspective ${index + 1}`} 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8 bg-white/90 backdrop-blur-sm p-3 md:p-4 rounded shadow-lg">
                  <span className="text-xs md:text-sm text-neutral-500">0{index + 1}</span>
                  <h4 className="text-lg md:text-xl text-neutral-900 mt-1">
                    {['EXPLORE', 'DISCOVER', 'EXPERIENCE'][index]}
                  </h4>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Annotation */}
        <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 bg-neutral-900/90 backdrop-blur-md px-4 py-3 md:px-6 md:py-4 rounded-lg max-w-sm shadow-xl">
          <h3 className="text-white mb-2">Variant 17: 3D Perspective Cards</h3>
          <p className="text-sm text-neutral-300">
            Cards rotate in 3D space with depth, creating carousel-like perspective effect.
          </p>
          <code className="block mt-3 text-xs text-neutral-400 bg-black/30 p-2 rounded font-mono">
            perspective: 2000px;<br />
            transform: rotateY() translateZ();<br />
            transform-style: preserve-3d;
          </code>
        </div>
      </div>
    </section>
  );
}