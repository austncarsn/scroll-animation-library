import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface SliceSliderProps {
  image: string;
}

export function SliceSlider({ image }: SliceSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Staggered slide-in for text slices
  const slice1X = useTransform(scrollYProgress, [0, 0.3], ['100%', '0%']);
  const slice2X = useTransform(scrollYProgress, [0.1, 0.4], ['100%', '0%']);
  const slice3X = useTransform(scrollYProgress, [0.2, 0.5], ['100%', '0%']);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);

  return (
    <section ref={containerRef} className="relative min-h-[200vh] bg-white">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div 
          style={{ scale: imageScale }}
          className="absolute inset-0"
        >
          <img src={image} alt="Editorial" className="w-full h-full object-cover" />
        </motion.div>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

        {/* Text slices */}
        <div className="absolute inset-0 flex flex-col justify-center pl-20 space-y-4 overflow-hidden">
          <motion.div 
            style={{ x: slice1X }}
            className="bg-white px-8 py-4 w-fit"
          >
            <span className="text-6xl text-neutral-900 tracking-tight">TIMELESS</span>
          </motion.div>

          <motion.div 
            style={{ x: slice2X }}
            className="bg-white px-8 py-4 w-fit ml-12"
          >
            <span className="text-6xl text-neutral-900 tracking-tight">ELEGANCE</span>
          </motion.div>

          <motion.div 
            style={{ x: slice3X }}
            className="bg-white px-8 py-4 w-fit ml-24"
          >
            <span className="text-6xl text-neutral-900 tracking-tight">REDEFINED</span>
          </motion.div>
        </div>

        {/* Annotation */}
        <div className="absolute bottom-8 right-8 bg-neutral-900/90 backdrop-blur-sm px-6 py-4 rounded-sm max-w-sm">
          <h3 className="text-white mb-2">Variant 3: Slice Slider Overlays</h3>
          <p className="text-sm text-neutral-300">
            Text slices slide in as images scroll, enhancing narrative flow with staggered delays.
          </p>
          <code className="block mt-3 text-xs text-neutral-400 bg-black/30 p-2 rounded">
            animation-delay: calc(var(--i) * 0.1s);<br />
            transform: translateX(0);
          </code>
        </div>
      </div>
    </section>
  );
}
