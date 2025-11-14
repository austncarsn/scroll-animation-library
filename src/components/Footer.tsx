export function Footer() {
  return (
    <footer className="relative bg-neutral-900 text-white py-20 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
          {/* Brand */}
          <div>
            <h3 className="text-2xl md:text-3xl italic mb-4 tracking-tight">
              Scroll—Driven Animations
            </h3>
            <p className="text-base text-neutral-400 leading-relaxed">
              Advanced scroll-driven animations for modern web portfolios. Built with accessibility and performance in mind.
            </p>
          </div>

          {/* Technical Stack */}
          <div>
            <h4 className="mb-6 text-xs tracking-[0.2em] uppercase font-['Inter'] text-neutral-500">
              Technical Stack
            </h4>
            <ul className="space-y-3 text-sm text-neutral-400">
              <li className="hover:text-white transition-colors cursor-default">React + TypeScript</li>
              <li className="hover:text-white transition-colors cursor-default">Motion (Framer Motion)</li>
              <li className="hover:text-white transition-colors cursor-default">Tailwind CSS v4</li>
              <li className="hover:text-white transition-colors cursor-default">Instrument Serif + Inter</li>
            </ul>
          </div>

          {/* CSS Features */}
          <div>
            <h4 className="mb-6 text-xs tracking-[0.2em] uppercase font-['Inter'] text-neutral-500">
              CSS Features
            </h4>
            <ul className="space-y-3 text-sm text-neutral-400">
              <li className="hover:text-white transition-colors cursor-default">animation-timeline: scroll()</li>
              <li className="hover:text-white transition-colors cursor-default">@supports (animation-range)</li>
              <li className="hover:text-white transition-colors cursor-default">prefers-reduced-motion</li>
              <li className="hover:text-white transition-colors cursor-default">Custom easing curves</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-800 pt-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
            <p className="text-neutral-500 font-['Inter']">
              © 2025 Created by <span className="text-white italic font-['Instrument_Serif']">Austin Carson</span>
            </p>
            <div className="flex gap-8 text-neutral-400">
              <a href="#parallax" className="hover:text-white transition-colors font-['Inter'] text-xs tracking-wider uppercase">
                View Variants
              </a>
              <span className="text-neutral-700">•</span>
              <span className="text-xs tracking-wider uppercase font-['Inter']">
                19 Variants
              </span>
            </div>
          </div>

          {/* Browser Support Note */}
          <div className="mt-10 p-6 bg-neutral-800/50 border border-neutral-800 rounded-sm">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-1.5 h-1.5 bg-neutral-500 rounded-full mt-2"></div>
              <div className="text-xs text-neutral-400 leading-relaxed">
                <strong className="text-neutral-300 font-['Inter'] tracking-wide uppercase">Browser Support:</strong> 
                <span className="block mt-2">
                  Native scroll-driven animations work in Chromium browsers (Chrome 115+, Edge 115+). 
                  Motion provides polyfills for Firefox and Safari. All animations respect 
                  <code className="mx-1 px-2 py-0.5 bg-neutral-900 text-neutral-300 rounded font-mono">prefers-reduced-motion</code> 
                  for accessibility.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}