import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface ScaleGradientProps {
  image: string;
}

export function ScaleGradient({ image }: ScaleGradientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1.2, 0.5]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-[200vh] bg-white">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 opacity-20">
          <img src={image} alt="Background" className="w-full h-full object-cover" />
        </div>

        {/* Scaling gradient text */}
        <motion.div
          style={{ scale, opacity }}
          className="relative text-center"
        >
          <h2 
            className="text-[12rem] tracking-tighter leading-none bg-gradient-to-br from-neutral-900 via-neutral-600 to-neutral-400 bg-clip-text text-transparent"
            style={{
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            CRAFTED
          </h2>
          <motion.p 
            style={{ 
              opacity: useTransform(scrollYProgress, [0.4, 0.5, 0.6], [0, 1, 0])
            }}
            className="text-neutral-600 text-xl tracking-wide mt-4"
          >
            Where precision meets artistry
          </motion.p>
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          style={{ 
            scale: useTransform(scrollYProgress, [0, 1], [0, 1.5]),
            opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.3, 0])
          }}
          className="absolute inset-0 border border-neutral-300 rounded-full"
        />

        {/* Annotation */}
        <div className="absolute top-8 right-8 bg-neutral-900/90 backdrop-blur-sm px-6 py-4 rounded-sm max-w-sm">
          <h3 className="text-white mb-2">Variant 7: Scale-Up Gradients</h3>
          <p className="text-sm text-neutral-300">
            Scroll-triggered scale transforms on gradient text blocks with smooth easing curves.
          </p>
          <code className="block mt-3 text-xs text-neutral-400 bg-black/30 p-2 rounded">
            background: linear-gradient(...);<br />
            -webkit-background-clip: text;<br />
            animation-timeline: scroll(root);
          </code>
        </div>
      </div>
    </section>
  );
}
