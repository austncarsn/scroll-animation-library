import { motion } from 'motion/react';

interface StickyNavProps {
  images: string[];
}

export function StickyNav({ images }: StickyNavProps) {
  return (
    <section className="relative bg-neutral-50">
      {/* Sticky Navigation */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-neutral-200">
        <nav className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <span className="tracking-tight text-neutral-900">COLLECTION</span>
          <div className="flex gap-8 text-sm text-neutral-600">
            <a href="#watches" className="hover:text-neutral-900 transition-colors">Watches</a>
            <a href="#accessories" className="hover:text-neutral-900 transition-colors">Accessories</a>
            <a href="#lifestyle" className="hover:text-neutral-900 transition-colors">Lifestyle</a>
          </div>
        </nav>
      </div>

      {/* Scroll-snap sections */}
      <div className="snap-y snap-mandatory h-[400vh] overflow-y-scroll">
        {images.slice(0, 4).map((image, index) => (
          <div 
            key={index}
            className="snap-start h-screen flex items-center justify-center relative"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: false, amount: 0.5 }}
              className="w-[90%] max-w-5xl h-[80vh] rounded-sm overflow-hidden"
            >
              <img src={image} alt={`Product ${index + 1}`} className="w-full h-full object-cover" />
            </motion.div>

            <div className="absolute bottom-12 left-12 text-white mix-blend-difference">
              <span className="text-sm tracking-widest">0{index + 1}</span>
              <h2 className="text-5xl tracking-tight mt-2">
                {['PRECISION', 'CRAFTED', 'HERITAGE', 'MODERN'][index]}
              </h2>
            </div>
          </div>
        ))}
      </div>

      {/* Annotation */}
      <div className="absolute top-24 right-8 bg-white/90 backdrop-blur-sm px-6 py-4 rounded-sm max-w-sm z-20">
        <h3 className="text-neutral-900 mb-2">Variant 5: Sticky Nav + Scroll-Snap</h3>
        <p className="text-sm text-neutral-600">
          Sticky navigation bar with scroll-snap sections for full-screen product reveals.
        </p>
        <code className="block mt-3 text-xs text-neutral-500 bg-neutral-100 p-2 rounded">
          scroll-snap-align: start;<br />
          height: 100vh;<br />
          position: sticky; top: 0;
        </code>
      </div>
    </section>
  );
}
