import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface TypewriterRevealProps {
  image: string;
}

export function TypewriterReveal({ image }: TypewriterRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const text = "CRAFTED WITH PRECISION AND PASSION";
  const words = text.split(' ');

  return (
    <section ref={containerRef} className="relative min-h-[250vh] bg-white">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 opacity-10">
          <img src={image} alt="Background" className="w-full h-full object-cover" />
        </div>

        {/* Typewriter text */}
        <div className="absolute inset-0 flex items-center justify-center p-16">
          <div className="max-w-5xl">
            <div className="flex flex-wrap gap-4 text-6xl tracking-tight text-neutral-900">
              {words.map((word, index) => {
                const wordStart = index / words.length;
                const wordEnd = (index + 1) / words.length;
                
                return (
                  <motion.span
                    key={index}
                    style={{
                      opacity: useTransform(
                        scrollYProgress,
                        [wordStart, wordEnd],
                        [0, 1]
                      ),
                      y: useTransform(
                        scrollYProgress,
                        [wordStart, wordEnd],
                        [20, 0]
                      )
                    }}
                  >
                    {word}
                  </motion.span>
                );
              })}
            </div>

            {/* Cursor blink effect */}
            <motion.div
              style={{
                opacity: useTransform(scrollYProgress, [0, 1], [1, 0])
              }}
              className="inline-block w-1 h-16 bg-neutral-900 ml-2 animate-pulse"
            />
          </div>
        </div>

        {/* Annotation */}
        <div className="absolute top-8 right-8 bg-neutral-900/90 backdrop-blur-sm px-6 py-4 rounded-sm max-w-sm">
          <h3 className="text-white mb-2">Variant 15: Typewriter Text Reveal</h3>
          <p className="text-sm text-neutral-300">
            Words appear sequentially as you scroll, mimicking typewriter effect with delays.
          </p>
          <code className="block mt-3 text-xs text-neutral-400 bg-black/30 p-2 rounded">
            animation-delay: calc(var(--index) * 0.1s);<br />
            opacity: 0 to 1 transition;
          </code>
        </div>
      </div>
    </section>
  );
}
