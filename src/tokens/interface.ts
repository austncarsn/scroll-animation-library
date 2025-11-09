/**
 * TypeScript Interface Definitions for Scroll Animation Components
 * Auto-generated from design tokens
 * Version: 1.0.0
 */

// ==================== Base Types ====================

export type Theme = 'light' | 'dark';
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type State = 'rest' | 'hover' | 'focus' | 'active' | 'disabled' | 'loading';
export type Variant = 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'outline';

// ==================== Motion Types ====================

export type MotionDuration = 'instant' | 'fast' | 'normal' | 'slow' | 'slower' | 'long' | 'xlong';
export type MotionEasing = 'standard' | 'emphasized' | 'exit' | 'springLite' | 'sine';

export interface MotionConfig {
  duration: MotionDuration;
  easing: MotionEasing;
  delay?: number;
  reducedMotion?: boolean;
}

export interface SpringConfig {
  type: 'spring';
  stiffness: number;
  damping: number;
  mass?: number;
}

// ==================== Scroll Animation Types ====================

export interface ScrollAnimationProps {
  /** Enable/disable animation */
  enabled?: boolean;
  /** Scroll threshold to trigger (0-1) */
  threshold?: number;
  /** Animation offset configuration */
  offset?: [string, string];
  /** Reduced motion fallback */
  reducedMotion?: boolean;
  /** Custom motion configuration */
  motion?: MotionConfig;
}

export interface ParallaxConfig extends ScrollAnimationProps {
  /** Parallax speed multiplier */
  speed?: 'slow' | 'medium' | 'fast' | number;
  /** Transform axis */
  axis?: 'x' | 'y' | 'z';
}

export interface RevealConfig extends ScrollAnimationProps {
  /** Reveal direction */
  direction?: 'top' | 'bottom' | 'left' | 'right';
  /** Stagger delay between items (ms) */
  stagger?: number;
  /** Initial opacity */
  initialOpacity?: number;
}

// ==================== Component Props ====================

export interface ParallaxGridProps {
  /** Array of image URLs */
  images: string[];
  /** Number of layers (1-5) */
  layers?: number;
  /** Grid gap in rem */
  gap?: number;
  /** Parallax configuration */
  config?: ParallaxConfig;
  /** Accessibility label */
  ariaLabel?: string;
}

export interface FlipBookProps {
  /** Array of image URLs */
  images: string[];
  /** Flip axis */
  axis?: 'x' | 'y';
  /** Flip configuration */
  config?: ScrollAnimationProps;
  /** Card aspect ratio */
  aspectRatio?: string;
}

export interface StackedCardsProps {
  /** Array of card data */
  cards: CardData[];
  /** Stack offset in pixels */
  offset?: number;
  /** Scale factor */
  scale?: number;
  /** Stack configuration */
  config?: ScrollAnimationProps;
}

export interface CardData {
  id: string;
  title: string;
  description?: string;
  image: string;
  href?: string;
}

export interface HorizontalSnapProps {
  /** Array of items */
  items: ReactNode[];
  /** Snap alignment */
  snapAlign?: 'start' | 'center' | 'end';
  /** Gap between items */
  gap?: number;
  /** Enable keyboard navigation */
  keyboardNav?: boolean;
  /** Scroll configuration */
  config?: ScrollAnimationProps;
}

export interface CircularRevealProps {
  /** Center image URL */
  image: string;
  /** Reveal size (viewport units) */
  revealSize?: number;
  /** Reveal configuration */
  config?: RevealConfig;
}

export interface SplitScreenProps {
  /** Left panel content */
  leftContent: ReactNode;
  /** Right panel content */
  rightContent: ReactNode;
  /** Split ratio (0-1) */
  splitRatio?: number;
  /** Slide direction */
  direction?: 'left' | 'right';
  /** Split configuration */
  config?: ScrollAnimationProps;
}

export interface InfiniteLoopProps {
  /** Array of items to loop */
  items: string[];
  /** Loop speed multiplier */
  speed?: number;
  /** Direction */
  direction?: 'left' | 'right';
  /** Gap between items */
  gap?: number;
  /** Loop configuration */
  config?: ScrollAnimationProps;
}

export interface TypewriterRevealProps {
  /** Text to reveal */
  text: string;
  /** Typing speed (characters per second) */
  speed?: number;
  /** Cursor style */
  cursor?: boolean;
  /** Typewriter configuration */
  config?: ScrollAnimationProps;
}

export interface ZoomOutGridProps {
  /** Array of image URLs */
  images: string[];
  /** Grid columns */
  columns?: number;
  /** Zoom scale factor */
  scale?: number;
  /** Grid configuration */
  config?: ScrollAnimationProps;
}

export interface PerspectiveCardsProps {
  /** Array of card images */
  images: string[];
  /** Perspective depth (px) */
  perspective?: number;
  /** Rotation angle (deg) */
  rotation?: number;
  /** 3D configuration */
  config?: ScrollAnimationProps;
}

export interface TextMaskProps {
  /** Background image URL */
  image: string;
  /** Mask text */
  text: string;
  /** Text size */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Mask configuration */
  config?: ParallaxConfig;
}

export interface AccordionRevealProps {
  /** Array of accordion items */
  items: AccordionItem[];
  /** Allow multiple open */
  multiple?: boolean;
  /** Default open indices */
  defaultOpen?: number[];
  /** Accordion configuration */
  config?: ScrollAnimationProps;
}

export interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
  image?: string;
}

// ==================== Annotation Props ====================

export interface AnnotationProps {
  /** Variant number (01-19) */
  variantNumber: string;
  /** Variant name */
  variantName: string;
  /** Variant category */
  category: string;
  /** Description */
  description: string;
  /** CSS code snippet */
  codeSnippet: string;
  /** Position */
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  /** Theme */
  theme?: Theme;
}

// ==================== Navigation Props ====================

export interface VariantsNavProps {
  /** Active section ID */
  activeSection?: string;
  /** Navigation items */
  items?: NavItem[];
  /** Sticky navigation */
  sticky?: boolean;
  /** Theme */
  theme?: Theme;
}

export interface NavItem {
  id: string;
  number: string;
  name: string;
  category: string;
}

// ==================== Accessibility ====================

export interface AccessibilityProps {
  /** ARIA label */
  ariaLabel?: string;
  /** ARIA description */
  ariaDescription?: string;
  /** ARIA live region */
  ariaLive?: 'polite' | 'assertive' | 'off';
  /** Reduced motion preference */
  respectReducedMotion?: boolean;
  /** Keyboard navigation */
  keyboardNav?: boolean;
  /** Focus management */
  focusTrap?: boolean;
}

// ==================== Data Attributes ====================

export interface ScrollDataAttributes {
  /** Current scroll progress (0-1) */
  'data-scroll-progress'?: string;
  /** Scroll state */
  'data-scroll-state'?: 'idle' | 'scrolling' | 'snapping';
  /** Active section */
  'data-active-section'?: string;
  /** Reduced motion */
  'data-reduced-motion'?: 'true' | 'false';
  /** Variant number */
  'data-variant'?: string;
}

// ==================== Export All ====================

export type {
  ReactNode,
} from 'react';
