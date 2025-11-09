import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface HorizontalSnapProps {
  images: string[];
}

export function HorizontalSnap({ images }: HorizontalSnapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-80%']);

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-neutral-900">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div 
          style={{ x }}
          className="flex h-full"
        >
          {images.map((image, index) => (
            <div 
              key={index}
              className="flex-shrink-0 w-screen h-full flex items-center justify-center px-16"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: false, amount: 0.8 }}
                className="relative w-full max-w-4xl h-[85vh] rounded-sm overflow-hidden"
              >
                <img 
                  src={image} 
                  alt={`Portfolio ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
                
                {/* Index indicator */}
                <div className="absolute top-8 left-8 text-white mix-blend-difference">
                  <span className="text-8xl tracking-tighter">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Caption */}
                <div className="absolute bottom-8 right-8 text-white mix-blend-difference text-right">
                  <p className="text-sm tracking-widest mb-1">PORTFOLIO</p>
                  <h3 className="text-3xl tracking-tight">
                    {['Classic', 'Modern', 'Heritage', 'Future', 'Timeless'][index % 5]}
                  </h3>
                </div>
              </motion.div>
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 text-white/70 text-sm">
          <span>Scroll horizontally</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="animate-pulse">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>

        {/* Annotation */}
        <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-sm px-6 py-4 rounded-sm max-w-sm">
          <h3 className="text-neutral-900 mb-2">Variant 8: Horizontal Snap</h3>
          <p className="text-sm text-neutral-600">
            Backward horizontal snap transitions between portfolio images with smooth easing.
          </p>
          <code className="block mt-3 text-xs text-neutral-500 bg-neutral-100 p-2 rounded">
            transform: translateX(calc(var(--scroll) * -100%));<br />
            scroll-snap-type: x mandatory;<br />
            easing: cubic-bezier(0.22, 1, 0.36, 1);
          </code>
        </div>
      </div>
    </section>
  );
}
