import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface AccordionRevealProps {
  images: string[];
}

export function AccordionReveal({ images }: AccordionRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-neutral-900">
      <div className="sticky top-0 h-screen flex flex-col overflow-hidden">
        {images.slice(0, 4).map((image, index) => {
          const panelStart = index * 0.2;
          const panelEnd = panelStart + 0.25;
          
          const height = useTransform(
            scrollYProgress,
            [panelStart, panelEnd, panelEnd + 0.1],
            ['25%', '70%', '10%']
          );

          return (
            <motion.div
              key={index}
              style={{ height }}
              className="relative w-full overflow-hidden flex-shrink-0"
            >
              <img 
                src={image} 
                alt={`Panel ${index + 1}`} 
                className="absolute inset-0 w-full h-full object-cover"
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Label */}
              <motion.div 
                style={{
                  opacity: useTransform(
                    scrollYProgress,
                    [panelStart, panelEnd],
                    [0.5, 1]
                  )
                }}
                className="absolute bottom-8 left-8 text-white"
              >
                <span className="text-sm tracking-widest">CHAPTER {index + 1}</span>
                <h3 className="text-4xl tracking-tight mt-2">
                  {['BEGINNING', 'JOURNEY', 'CLIMAX', 'RESOLUTION'][index]}
                </h3>
              </motion.div>
            </motion.div>
          );
        })}

        {/* Annotation */}
        <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-sm px-6 py-4 rounded-sm max-w-sm z-10">
          <h3 className="text-neutral-900 mb-2">Variant 19: Accordion Panels</h3>
          <p className="text-sm text-neutral-600">
            Vertical panels expand and contract in sequence, creating accordion effect.
          </p>
          <code className="block mt-3 text-xs text-neutral-500 bg-neutral-100 p-2 rounded">
            height: calc(25% + var(--active) * 45%);<br />
            transition: height 0.6s ease;
          </code>
        </div>
      </div>
    </section>
  );
}
