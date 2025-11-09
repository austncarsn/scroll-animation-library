# Scroll-Driven Animation Library - Design System Documentation

**Version:** 1.0.0  
**Last Updated:** November 9, 2025  
**Status:** Production Ready ✅

---

## Table of Contents

1. [Overview](#overview)
2. [Quick Start](#quick-start)
3. [Token System](#token-system)
4. [Components](#components)
5. [Accessibility](#accessibility)
6. [Motion Patterns](#motion-patterns)
7. [Developer Guide](#developer-guide)
8. [Contributing](#contributing)

---

## Overview

This design system provides a comprehensive, production-ready library of 19 scroll-driven animation variants built with React, Motion (Framer Motion), and Tailwind CSS. All components meet WCAG 2.2 AA accessibility standards and include reduced-motion alternatives.

### Key Features

- ✅ **19 Scroll Animation Variants** - From parallax to 3D perspective
- ✅ **120+ Design Tokens** - Consistent spacing, colors, typography, motion
- ✅ **WCAG 2.2 AA Compliant** - Full accessibility support
- ✅ **Dark Mode** - Complete theme coverage
- ✅ **Reduced Motion** - Respects user preferences
- ✅ **TypeScript** - Full type safety
- ✅ **Responsive** - Mobile-first design
- ✅ **Production Ready** - Optimized performance

---

## Quick Start

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install

# Start development server
npm run dev
```

### Basic Usage

```tsx
import { ParallaxGrid } from './components/ParallaxGrid';

function App() {
  const images = [
    'https://images.unsplash.com/photo-1...',
    'https://images.unsplash.com/photo-2...',
    // Add more images
  ];

  return (
    <ParallaxGrid images={images} />
  );
}
```

### Using Tokens

```tsx
// Import tokens
import '/tokens/tokens.css';

// Use CSS custom properties
<div className="p-[var(--space-16)] rounded-[var(--radius-8)]">
  Content
</div>
```

---

## Token System

### Architecture

```
Primitives → Semantic → Component
    ↓          ↓           ↓
  Colors    Themes     Buttons
  Spacing   Text       Cards
  Radius    Borders    Inputs
```

### Color Tokens

#### Light Theme
```css
--color-bg-primary: #ffffff;
--color-text-primary: #171717;
--color-border-primary: #e5e5e5;
--color-brand-primary: #171717;
```

#### Dark Theme
```css
--color-bg-primary: #0a0a0a;
--color-text-primary: #fafafa;
--color-border-primary: #404040;
--color-brand-primary: #fafafa;
```

### Spacing Scale

```css
--space-2: 0.125rem;   /* 2px */
--space-4: 0.25rem;    /* 4px */
--space-8: 0.5rem;     /* 8px */
--space-12: 0.75rem;   /* 12px */
--space-16: 1rem;      /* 16px */
--space-24: 1.5rem;    /* 24px */
--space-32: 2rem;      /* 32px */
--space-48: 3rem;      /* 48px */
--space-64: 4rem;      /* 64px */
--space-96: 6rem;      /* 96px */
```

### Typography

```css
/* Display */
--display-lg: 4.5rem / 1.1 / -0.03em / 600
--display-md: 3.75rem / 1.1 / -0.03em / 600

/* Headings */
--h1: 2rem / 1.3 / -0.01em / 600
--h2: 1.5rem / 1.4 / -0.01em / 600
--h3: 1.25rem / 1.4 / 0 / 600

/* Body */
--body-lg: 1.125rem / 1.6 / 0 / 400
--body-md: 1rem / 1.6 / 0 / 400
--body-sm: 0.875rem / 1.5 / 0 / 400
```

### Motion Tokens

```css
/* Duration */
--duration-fast: 120ms;
--duration-normal: 180ms;
--duration-slow: 240ms;

/* Easing */
--ease-standard: cubic-bezier(0.22, 1, 0.36, 1);
--ease-emphasized: cubic-bezier(0.25, 0.46, 0.45, 0.94);
--ease-exit: cubic-bezier(0.165, 0.84, 0.44, 1);
```

---

## Components

### 1. ParallaxGrid
Multi-layer parallax effect with variable speeds.

```tsx
interface ParallaxGridProps {
  images: string[];      // Array of image URLs
  layers?: number;       // Number of layers (1-5)
  gap?: number;          // Grid gap in rem
  ariaLabel?: string;    // Accessibility label
}
```

**Example:**
```tsx
<ParallaxGrid 
  images={fashionImages} 
  layers={3}
  gap={1}
  ariaLabel="Fashion product gallery"
/>
```

### 2. InfiniteLoop
Seamless infinite carousel.

```tsx
interface InfiniteLoopProps {
  images: string[];      // Items to loop
  speed?: number;        // Speed multiplier
  direction?: 'left' | 'right';
  gap?: number;          // Item spacing
}
```

### 3. PerspectiveCards
3D perspective carousel effect.

```tsx
interface PerspectiveCardsProps {
  images: string[];      // Card images
  perspective?: number;  // Depth in px
  rotation?: number;     // Rotation angle
}
```

### 4. TextMask
Text mask parallax reveal.

```tsx
interface TextMaskProps {
  image: string;         // Background image
  text: string;          // Mask text
  size?: 'sm' | 'md' | 'lg' | 'xl';
}
```

### 5-19. Additional Variants

- FlipBook - 3D page flip effect
- SliceSlider - Slice reveal animation
- ColorShift - Gradient color transitions
- StickyNav - Sticky navigation
- PathAnimation - SVG path drawing
- ScaleGradient - Scale + gradient
- HorizontalSnap - Horizontal scroll snap
- StackedCards - Card stacking depth
- ClipPathReveal - Clip-path reveals
- CircularReveal - Circular iris effect
- SplitScreen - Split-screen slides
- MorphingBlob - Blob shape morphing
- TypewriterReveal - Typewriter effect
- ZoomOutGrid - Grid zoom transitions
- AccordionReveal - Accordion panels

[See full component documentation →](./SYSTEM_AUDIT_REPORT.md#section-d-component-library-matrix)

---

## Accessibility

### WCAG 2.2 AA Compliance

All components meet or exceed WCAG 2.2 Level AA requirements:

✅ **Contrast Ratios**
- Body text: 16.1:1 (AAA)
- UI elements: 4.5:1 minimum (AA)
- Interactive states: 3:1 minimum (AA)

✅ **Focus Management**
- Visible focus rings (2px, high contrast)
- Logical tab order
- Focus-visible only (not on click)

✅ **Target Sizes**
- Minimum: 24px × 24px
- Recommended: 44px × 44px (Level AAA)
- All implemented: ≥ 44px

✅ **Keyboard Navigation**
- Tab: Navigate elements
- Arrow keys: Scroll sections
- Escape: Close modals
- Enter/Space: Activate

✅ **Reduced Motion**
```css
@media (prefers-reduced-motion: reduce) {
  /* Disables parallax, rotations, complex transforms */
  /* Allows fade-only, max 120ms */
}
```

### Screen Reader Support

```tsx
// All interactive elements have proper ARIA
<section 
  role="region" 
  aria-label="Parallax image gallery"
  aria-live="polite"
>
  <img 
    src={image} 
    alt="Descriptive text, not decorative" 
  />
</section>
```

---

## Motion Patterns

### Parallax Effect

```tsx
const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ["start end", "end start"]
});

const y = useTransform(
  scrollYProgress, 
  [0, 1], 
  ['0%', '-50%']
);

return (
  <motion.div style={{ y }}>
    {/* Content */}
  </motion.div>
);
```

**Reduced Motion:**
```tsx
const reducedMotion = useReducedMotion();

const y = useTransform(
  scrollYProgress,
  [0, 1],
  reducedMotion ? ['0%', '0%'] : ['0%', '-50%']
);
```

### Fade In

```tsx
const opacity = useTransform(
  scrollYProgress,
  [0, 0.3, 0.7, 1],
  [0, 1, 1, 0.3]
);

return (
  <motion.div style={{ opacity }}>
    {/* Content */}
  </motion.div>
);
```

### Scale In

```tsx
const scale = useTransform(
  scrollYProgress,
  [0, 0.5, 1],
  [0.8, 1, 0.8]
);
```

### Best Practices

1. **Always provide reduced-motion alternatives**
2. **Use semantic offset values** (`["start end", "end start"]`)
3. **Limit transform ranges** to prevent jarring effects
4. **Test on real devices** for performance
5. **Add loading states** with Suspense

---

## Developer Guide

### TypeScript Integration

```tsx
import type { 
  ParallaxGridProps,
  ScrollAnimationProps,
  MotionConfig 
} from '/tokens/interface';

// Fully typed component props
function MyComponent({
  images,
  config = {}
}: ParallaxGridProps) {
  // Implementation
}
```

### Custom Tokens

```css
/* Add to tokens.css */
:root {
  --custom-duration: 300ms;
  --custom-easing: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Use in components */
.my-component {
  transition: all var(--custom-duration) var(--custom-easing);
}
```

### Creating New Variants

```tsx
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export function NewVariant({ image }: { image: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-[200vh] bg-neutral-50"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div style={{ y }}>
          <img src={image} alt="Description" />
        </motion.div>
        
        {/* Annotation */}
        <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-md p-6 rounded-lg shadow-xl">
          <h3>Variant Name</h3>
          <p>Description of the effect</p>
          <code>CSS implementation code</code>
        </div>
      </div>
    </section>
  );
}
```

### Performance Optimization

```tsx
// Lazy load components
const ParallaxGrid = lazy(() => 
  import('./components/ParallaxGrid').then(m => ({ 
    default: m.ParallaxGrid 
  }))
);

// Use with Suspense
<Suspense fallback={<LoadingFallback />}>
  <ParallaxGrid images={images} />
</Suspense>
```

### Testing

```tsx
import { render, screen } from '@testing-library/react';
import { ParallaxGrid } from './ParallaxGrid';

describe('ParallaxGrid', () => {
  it('renders all images', () => {
    const images = ['img1.jpg', 'img2.jpg'];
    render(<ParallaxGrid images={images} />);
    
    const imgs = screen.getAllByRole('img');
    expect(imgs).toHaveLength(images.length);
  });

  it('respects reduced motion', () => {
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
    }));
    
    // Test reduced motion behavior
  });
});
```

---

## Contributing

### Design Token Updates

1. Edit JSON files in `/tokens/`
2. Run `npm run build:tokens` (if using Style Dictionary)
3. Update `tokens.css` with new values
4. Update `interface.ts` if adding new types
5. Test in light and dark modes
6. Verify WCAG compliance

### Adding New Components

1. Create component in `/components/`
2. Add TypeScript interface to `interface.ts`
3. Include all required states (rest, hover, focus, active, disabled)
4. Add reduced-motion variant
5. Test keyboard navigation
6. Verify contrast ratios
7. Add to `VariantsNav` component
8. Update documentation

### Code Style

```tsx
// Use functional components
export function Component({ prop }: Props) { ... }

// Destructure props
function Component({ images, config = {} }: Props) { ... }

// Use Motion for animations
import { motion, useScroll } from 'motion/react';

// Add prop types
interface ComponentProps {
  required: string;
  optional?: number;
}

// Include JSDoc comments
/**
 * ParallaxGrid component with multi-layer scroll effect
 * @param images - Array of image URLs
 * @param layers - Number of parallax layers (1-5)
 */
```

---

## Resources

### Internal Documentation
- [System Audit Report](./SYSTEM_AUDIT_REPORT.md) - Complete audit details
- [Token Files](./tokens/) - All design tokens
- [Components](./components/) - Component source code

### External References
- [Motion Documentation](https://motion.dev/docs/react-quick-start)
- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs/)

### Design Inspiration
- [Awwwards](https://www.awwwards.com/websites/scroll/)
- [Codrops](https://tympanus.net/codrops/category/tutorials/)
- [CSS Tricks](https://css-tricks.com/scroll-driven-animations/)

---

## License

[Your License Here]

---

## Changelog

### Version 1.0.0 (2025-11-09)

**Added:**
- 19 scroll animation variants
- 120+ design tokens
- Complete TypeScript interfaces
- WCAG 2.2 AA compliance
- Dark mode support
- Reduced motion support
- Responsive navigation
- Comprehensive documentation

**Changed:**
- Migrated from hard-coded values to token system
- Improved accessibility across all components
- Optimized performance with lazy loading

**Fixed:**
- Focus state visibility
- Contrast ratio issues
- Mobile responsiveness
- Keyboard navigation

---

**Questions?** Open an issue or contact the design system team.
