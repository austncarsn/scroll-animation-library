import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface CircularRevealProps {
  images: string[];
}

export function CircularReveal({ images }: CircularRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const circleSize = useTransform(scrollYProgress, [0, 0.5, 1], ['0%', '150%', '0%']);

  return (
    <section ref={containerRef} className="relative min-h-[250vh] bg-white">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img 
            src={images[0]} 
            alt="Background" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>

        {/* Circular mask reveal */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            style={{
              width: circleSize,
              height: circleSize,
              borderRadius: '50%'
            }}
            className="relative overflow-hidden"
          >
            <img 
              src={images[1]} 
              alt="Revealed" 
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                width: '100vw',
                height: '100vh',
                transform: 'translate(-50%, -50%)',
                top: '50%',
                left: '50%'
              }}
            />
          </motion.div>
        </div>

        {/* Center text */}
        <motion.div 
          style={{
            opacity: useTransform(scrollYProgress, [0.4, 0.5, 0.6], [0, 1, 0])
          }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <h2 className="text-6xl tracking-tighter text-white mix-blend-difference">
            FOCUS
          </h2>
        </motion.div>

        {/* Annotation */}
        <div className="absolute bottom-8 right-8 bg-neutral-900/90 backdrop-blur-sm px-6 py-4 rounded-sm max-w-sm">
          <h3 className="text-white mb-2">Variant 11: Circular Mask Reveal</h3>
          <p className="text-sm text-neutral-300">
            Expanding circular mask creates an iris-like reveal effect with smooth scaling.
          </p>
          <code className="block mt-3 text-xs text-neutral-400 bg-black/30 p-2 rounded">
            border-radius: 50%;<br />
            width: calc(var(--scroll) * 150%);<br />
            overflow: hidden;
          </code>
        </div>
      </div>
    </section>
  );
}
