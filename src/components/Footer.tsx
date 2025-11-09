export function Footer() {
  return (
    <footer className="relative bg-neutral-900 text-white py-16 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              {/* Bear icon SVG */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                <circle cx="8" cy="6" r="2" fill="currentColor" />
                <circle cx="16" cy="6" r="2" fill="currentColor" />
                <path 
                  d="M12 4C9.79 4 8 5.79 8 8V14C8 16.21 9.79 18 12 18C14.21 18 16 16.21 16 14V8C16 5.79 14.21 4 12 4Z" 
                  fill="currentColor" 
                />
                <circle cx="10" cy="11" r="1" fill="#171717" />
                <circle cx="14" cy="11" r="1" fill="#171717" />
                <path d="M10 14 Q12 15 14 14" stroke="#171717" strokeWidth="1" fill="none" />
              </svg>
              <span className="tracking-tight text-xl">Scroll Innovations</span>
            </div>
            <p className="text-sm text-neutral-400">
              Advanced scroll-driven animations for modern web portfolios
            </p>
          </div>

          {/* Resources */}
          <div>
            <h4 className="mb-4 tracking-wide text-sm">RESOURCES</h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li><a href="#" className="hover:text-white transition-colors">CSS Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Motion React</a></li>
              <li><a href="#" className="hover:text-white transition-colors">GSAP ScrollTrigger</a></li>
              <li><a href="#" className="hover:text-white transition-colors">View Transitions API</a></li>
            </ul>
          </div>

          {/* Technical */}
          <div>
            <h4 className="mb-4 tracking-wide text-sm">IMPLEMENTATION</h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>animation-timeline: scroll()</li>
              <li>@supports (animation-range)</li>
              <li>prefers-reduced-motion</li>
              <li>cubic-bezier easing</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-500">
            <p>© 2025 Scroll Innovations. Optimized for portfolio integration.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">GitHub</a>
              <a href="#" className="hover:text-white transition-colors">CodePen</a>
              <a href="#" className="hover:text-white transition-colors">austincarson.dev</a>
            </div>
          </div>

          {/* Browser support note */}
          <div className="mt-8 p-4 bg-neutral-800 rounded-sm text-xs text-neutral-400">
            <strong className="text-neutral-300">Browser Support:</strong> Native scroll-driven animations work in Chromium browsers (Chrome 115+, Edge 115+). 
            GSAP ScrollTrigger provides fallbacks for Firefox and Safari. Include: <code className="text-neutral-300">@supports (animation-timeline: scroll())</code>
          </div>
        </div>
      </div>
    </footer>
  );
}
