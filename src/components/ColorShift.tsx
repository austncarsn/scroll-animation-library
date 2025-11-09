import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface ColorShiftProps {
  image: string;
}

export function ColorShift({ image }: ColorShiftProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 1],
    ['#f5f5f5', '#e5e5e5', '#525252', '#171717']
  );

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

  return (
    <section ref={containerRef} className="relative min-h-[250vh]">
      <motion.div 
        style={{ backgroundColor }}
        className="sticky top-0 h-screen flex items-center justify-center overflow-hidden"
      >
        <motion.div 
          style={{ scale: imageScale, opacity: imageOpacity }}
          className="relative w-[700px] h-[500px] rounded-sm overflow-hidden"
        >
          <img src={image} alt="Product showcase" className="w-full h-full object-cover" />
        </motion.div>

        {/* Floating label */}
        <motion.div 
          style={{ 
            opacity: useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 1, 0])
          }}
          className="absolute top-1/4 left-1/4 text-white/90 text-8xl tracking-tighter"
        >
          LUXURY
        </motion.div>

        {/* Annotation */}
        <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-sm px-6 py-4 rounded-sm max-w-sm">
          <h3 className="text-neutral-900 mb-2">Variant 4: Color Shift & Zoom</h3>
          <p className="text-sm text-neutral-600">
            Background gradients morph; images zoom tied to scroll progress for dramatic reveals.
          </p>
          <code className="block mt-3 text-xs text-neutral-500 bg-neutral-100 p-2 rounded">
            @keyframes gradient-shift {'{'}<br />
            &nbsp;&nbsp;0% {'{ background-position: 0% 50%; }'}<br />
            &nbsp;&nbsp;100% {'{ background-position: 100% 50%; }'}<br />
            {'}'}
          </code>
        </div>
      </motion.div>
    </section>
  );
}
