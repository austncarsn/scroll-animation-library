import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface StackedCardsProps {
  images: string[];
}

export function StackedCards({ images }: StackedCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-neutral-100">
      <div className="sticky top-0 h-screen flex items-center justify-center p-8 overflow-hidden">
        {images.slice(0, 4).map((image, index) => {
          const cardStart = index * 0.2;
          const cardEnd = cardStart + 0.25;
          
          const scale = useTransform(
            scrollYProgress,
            [cardStart, cardEnd],
            [1, 0.95]
          );
          
          const y = useTransform(
            scrollYProgress,
            [cardStart, cardEnd, cardEnd + 0.1],
            [0, -20, -200]
          );
          
          const opacity = useTransform(
            scrollYProgress,
            [cardStart, cardEnd, cardEnd + 0.1],
            [1, 1, 0]
          );

          return (
            <motion.div
              key={index}
              style={{
                scale,
                y,
                opacity,
                zIndex: images.length - index
              }}
              className="absolute w-[600px] h-[700px] rounded-lg overflow-hidden shadow-2xl"
            >
              <img 
                src={image} 
                alt={`Card ${index + 1}`} 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-sm p-6 rounded">
                <span className="text-sm text-neutral-500 tracking-widest">COLLECTION</span>
                <h3 className="text-3xl text-neutral-900 mt-2 tracking-tight">
                  {['SPRING', 'SUMMER', 'AUTUMN', 'WINTER'][index]}
                </h3>
              </div>
            </motion.div>
          );
        })}

        {/* Annotation */}
        <div className="absolute top-8 right-8 bg-neutral-900/90 backdrop-blur-sm px-6 py-4 rounded-sm max-w-sm z-50">
          <h3 className="text-white mb-2">Variant 9: Stacked Cards Peel</h3>
          <p className="text-sm text-neutral-300">
            Cards stack and peel away with scale transforms, creating depth and hierarchy.
          </p>
          <code className="block mt-3 text-xs text-neutral-400 bg-black/30 p-2 rounded">
            transform: scale(0.95) translateY(-200px);<br />
            z-index: stacking context;
          </code>
        </div>
      </div>
    </section>
  );
}
