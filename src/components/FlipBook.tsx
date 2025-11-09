import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface FlipBookProps {
  images: string[];
}

export function FlipBook({ images }: FlipBookProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [0, 180, 360]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);

  return (
    <section ref={containerRef} className="relative min-h-[200vh] bg-neutral-900">
      <div className="sticky top-0 h-screen flex items-center justify-center p-12">
        <motion.div 
          style={{ 
            rotateY,
            scale,
            transformStyle: 'preserve-3d'
          }}
          className="relative w-[600px] h-[800px]"
        >
          {/* Front face */}
          <div className="absolute inset-0 backface-hidden overflow-hidden rounded-sm">
            <img 
              src={images[0]} 
              alt="Product front" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Back face */}
          <div 
            className="absolute inset-0 backface-hidden overflow-hidden rounded-sm"
            style={{ transform: 'rotateY(180deg)' }}
          >
            <img 
              src={images[1]} 
              alt="Product back" 
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Annotation */}
        <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-sm px-6 py-4 rounded-sm max-w-sm">
          <h3 className="text-neutral-900 mb-2">Variant 2: 3D Flip & Zoom</h3>
          <p className="text-sm text-neutral-600">
            Rotates elements on scroll for immersive reveals, ideal for product shots.
          </p>
          <code className="block mt-3 text-xs text-neutral-500 bg-neutral-100 p-2 rounded">
            @keyframes flip {'{'}<br />
            &nbsp;&nbsp;0% {'{ transform: rotateY(0deg) scale(1); }'}<br />
            &nbsp;&nbsp;100% {'{ rotateY(180deg) scale(1.2); }'}<br />
            {'}'}
          </code>
        </div>
      </div>
    </section>
  );
}
