import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface MorphingBlobProps {
  image: string;
}

export function MorphingBlob({ image }: MorphingBlobProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const borderRadius = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [
      '30% 70% 70% 30% / 30% 30% 70% 70%',
      '70% 30% 50% 50% / 30% 60% 40% 70%',
      '50% 50% 50% 50% / 50% 50% 50% 50%',
      '40% 60% 60% 40% / 60% 40% 60% 40%',
      '30% 70% 70% 30% / 30% 30% 70% 70%'
    ]
  );

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);

  return (
    <section ref={containerRef} className="relative min-h-[250vh] bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{
            borderRadius,
            rotate,
            scale
          }}
          className="relative w-[600px] h-[600px] overflow-hidden"
        >
          <img 
            src={image} 
            alt="Morphing" 
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Background blobs */}
        <motion.div
          style={{
            borderRadius: useTransform(
              scrollYProgress,
              [0, 0.5, 1],
              [
                '60% 40% 30% 70% / 60% 30% 70% 40%',
                '30% 60% 70% 40% / 50% 60% 30% 60%',
                '60% 40% 30% 70% / 60% 30% 70% 40%'
              ]
            ),
            scale: useTransform(scrollYProgress, [0, 1], [1, 1.5])
          }}
          className="absolute inset-0 bg-gradient-to-br from-neutral-700/30 to-neutral-600/30 blur-3xl"
        />

        {/* Annotation */}
        <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-sm px-6 py-4 rounded-sm max-w-sm z-10">
          <h3 className="text-neutral-900 mb-2">Variant 14: Morphing Blob</h3>
          <p className="text-sm text-neutral-600">
            Organic shape transforms using animated border-radius for fluid motion.
          </p>
          <code className="block mt-3 text-xs text-neutral-500 bg-neutral-100 p-2 rounded">
            border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;<br />
            animation: morph 20s ease-in-out infinite;
          </code>
        </div>
      </div>
    </section>
  );
}
