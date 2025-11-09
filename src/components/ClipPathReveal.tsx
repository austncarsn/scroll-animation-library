import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface ClipPathRevealProps {
  image: string;
}

export function ClipPathReveal({ image }: ClipPathRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [
      'polygon(0 0, 100% 0, 100% 0, 0 0)',
      'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)'
    ]
  );

  return (
    <section ref={containerRef} className="relative min-h-[250vh] bg-neutral-900">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ clipPath }}
          className="w-[90%] max-w-6xl h-[85vh] relative"
        >
          <img 
            src={image} 
            alt="Reveal" 
            className="w-full h-full object-cover"
          />
          
          {/* Overlay text */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <motion.h2 
              style={{
                opacity: useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 1, 0])
              }}
              className="text-8xl text-white tracking-tighter"
            >
              REVEAL
            </motion.h2>
          </div>
        </motion.div>

        {/* Annotation */}
        <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-sm px-6 py-4 rounded-sm max-w-sm">
          <h3 className="text-neutral-900 mb-2">Variant 10: Clip-Path Reveal</h3>
          <p className="text-sm text-neutral-600">
            Image reveals using CSS clip-path polygon animation for dramatic curtain effect.
          </p>
          <code className="block mt-3 text-xs text-neutral-500 bg-neutral-100 p-2 rounded">
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);<br />
            animation: reveal-down linear;
          </code>
        </div>
      </div>
    </section>
  );
}
