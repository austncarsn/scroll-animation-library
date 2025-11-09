import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface TextMaskProps {
  image: string;
}

export function TextMask({ image }: TextMaskProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <section ref={containerRef} className="relative min-h-[200vh] bg-white overflow-hidden">
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          {/* Large text as mask */}
          <div 
            className="text-[10rem] md:text-[15rem] leading-none tracking-tighter select-none z-10 text-center px-4"
            style={{
              WebkitTextStroke: '2px #e5e5e5',
              color: 'transparent',
              position: 'relative'
            }}
          >
            <div>LUXURY</div>
            <div>BRAND</div>
          </div>

          {/* Image behind text with parallax */}
          <motion.div 
            style={{ y }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <img 
              src={image} 
              alt="Masked" 
              className="w-full h-[120vh] object-cover"
              style={{
                filter: 'contrast(1.1) saturate(1.2)'
              }}
              loading="lazy"
            />
          </motion.div>

          {/* Text mask overlay using blend mode */}
          <div 
            className="absolute inset-0 flex items-center justify-center text-[10rem] md:text-[15rem] leading-none tracking-tighter pointer-events-none px-4 text-center"
            style={{
              color: '#ffffff',
              mixBlendMode: 'screen',
              opacity: 0.8
            }}
          >
            <div>
              <div>LUXURY</div>
              <div>BRAND</div>
            </div>
          </div>
        </div>

        {/* Annotation */}
        <div className="absolute top-4 left-4 md:top-8 md:left-8 bg-neutral-900/90 backdrop-blur-md px-4 py-3 md:px-6 md:py-4 rounded-lg max-w-sm shadow-xl z-20">
          <h3 className="text-white mb-2">Variant 18: Text Mask Parallax</h3>
          <p className="text-sm text-neutral-300">
            Image reveals through large text mask with independent parallax motion.
          </p>
          <code className="block mt-3 text-xs text-neutral-400 bg-black/30 p-2 rounded font-mono">
            -webkit-background-clip: text;<br />
            background-attachment: fixed;<br />
            mix-blend-mode: screen;
          </code>
        </div>
      </div>
    </section>
  );
}