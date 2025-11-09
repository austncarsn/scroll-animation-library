import { useRef, Suspense, lazy } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ScrollProgress } from './components/ScrollProgress';
import { VariantsNav } from './components/VariantsNav';

// Lazy load components for better performance
const ParallaxGrid = lazy(() => import('./components/ParallaxGrid').then(m => ({ default: m.ParallaxGrid })));
const FlipBook = lazy(() => import('./components/FlipBook').then(m => ({ default: m.FlipBook })));
const SliceSlider = lazy(() => import('./components/SliceSlider').then(m => ({ default: m.SliceSlider })));
const ColorShift = lazy(() => import('./components/ColorShift').then(m => ({ default: m.ColorShift })));
const StickyNav = lazy(() => import('./components/StickyNav').then(m => ({ default: m.StickyNav })));
const PathAnimation = lazy(() => import('./components/PathAnimation').then(m => ({ default: m.PathAnimation })));
const ScaleGradient = lazy(() => import('./components/ScaleGradient').then(m => ({ default: m.ScaleGradient })));
const HorizontalSnap = lazy(() => import('./components/HorizontalSnap').then(m => ({ default: m.HorizontalSnap })));
const StackedCards = lazy(() => import('./components/StackedCards').then(m => ({ default: m.StackedCards })));
const ClipPathReveal = lazy(() => import('./components/ClipPathReveal').then(m => ({ default: m.ClipPathReveal })));
const CircularReveal = lazy(() => import('./components/CircularReveal').then(m => ({ default: m.CircularReveal })));
const SplitScreen = lazy(() => import('./components/SplitScreen').then(m => ({ default: m.SplitScreen })));
const InfiniteLoop = lazy(() => import('./components/InfiniteLoop').then(m => ({ default: m.InfiniteLoop })));
const MorphingBlob = lazy(() => import('./components/MorphingBlob').then(m => ({ default: m.MorphingBlob })));
const TypewriterReveal = lazy(() => import('./components/TypewriterReveal').then(m => ({ default: m.TypewriterReveal })));
const ZoomOutGrid = lazy(() => import('./components/ZoomOutGrid').then(m => ({ default: m.ZoomOutGrid })));
const PerspectiveCards = lazy(() => import('./components/PerspectiveCards').then(m => ({ default: m.PerspectiveCards })));
const TextMask = lazy(() => import('./components/TextMask').then(m => ({ default: m.TextMask })));
const AccordionReveal = lazy(() => import('./components/AccordionReveal').then(m => ({ default: m.AccordionReveal })));
const Footer = lazy(() => import('./components/Footer').then(m => ({ default: m.Footer })));

// Loading component
function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50">
      <div className="flex flex-col items-center gap-4">
        <motion.div
          className="w-12 h-12 border-2 border-neutral-300 border-t-neutral-900 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
        <span className="text-sm text-neutral-500">Loading...</span>
      </div>
    </div>
  );
}

export default function App() {
  const heroRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  // Image collections for each variant
  const images = {
    parallax: [
      'https://images.unsplash.com/photo-1664891419647-5dfe3d310226?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjI2MjYyODN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1670177257750-9b47927f68eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3YXRjaCUyMHByb2R1Y3R8ZW58MXx8fHwxNzYyNjMyODQwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1495121553079-4c61bcce1894?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwY2FtZXJhfGVufDF8fHx8MTc2MjYwODc1Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1705899853374-d91c048b81d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwcGVyZnVtZSUyMGJvdHRsZXxlbnwxfHx8fDE3NjI2MzI5MDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1645996830739-8fe3df27c33f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwZWRpdG9yaWFsfGVufDF8fHx8MTc2MjU1NjczMHww&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    flip: [
      'https://images.unsplash.com/photo-1519662978799-2f05096d3636?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzYyNjIzMjQ4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1725368844213-c167fe556f98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhY2Nlc3Nvcmllc3xlbnwxfHx8fDE3NjI2MTk1MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    slider: 'https://images.unsplash.com/photo-1616837874254-8d5aaa63e273?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwamV3ZWxyeXxlbnwxfHx8fDE3NjI2MDE0NTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    colorShift: 'https://images.unsplash.com/photo-1670177257750-9b47927f68eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3YXRjaCUyMHByb2R1Y3R8ZW58MXx8fHwxNzYyNjMyODQwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    stickyNav: [
      'https://images.unsplash.com/photo-1664891419647-5dfe3d310226?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjI2MjYyODN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1495121553079-4c61bcce1894?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwY2FtZXJhfGVufDF8fHx8MTc2MjYwODc1Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1705899853374-d91c048b81d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwcGVyZnVtZSUyMGJvdHRsZXxlbnwxfHx8fDE3NjI2MzI5MDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1725368844213-c167fe556f98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhY2Nlc3Nvcmllc3xlbnwxfHx8fDE3NjI2MTk1MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    path: [
      'https://images.unsplash.com/photo-1645996830739-8fe3df27c33f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwZWRpdG9yaWFsfGVufDF8fHx8MTc2MjU1NjczMHww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1519662978799-2f05096d3636?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzYyNjIzMjQ4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1616837874254-8d5aaa63e273?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwamV3ZWxyeXxlbnwxfHx8fDE3NjI2MDE0NTV8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    scaleGradient: 'https://images.unsplash.com/photo-1495121553079-4c61bcce1894?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwY2FtZXJhfGVufDF8fHx8MTc2MjYwODc1Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    horizontal: [
      'https://images.unsplash.com/photo-1664891419647-5dfe3d310226?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjI2MjYyODN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1670177257750-9b47927f68eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3YXRjaCUyMHByb2R1Y3R8ZW58MXx8fHwxNzYyNjMyODQwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1645996830739-8fe3df27c33f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwZWRpdG9yaWFsfGVufDF8fHx8MTc2MjU1NjczMHww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1725368844213-c167fe556f98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhY2Nlc3Nvcmllc3xlbnwxfHx8fDE3NjI2MTk1MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1616837874254-8d5aaa63e273?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwamV3ZWxyeXxlbnwxfHx8fDE3NjI2MDE0NTV8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    stacked: [
      'https://images.unsplash.com/photo-1653640869615-e9878a2c8344?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwcG9ydHJhaXQlMjBzdHVkaW98ZW58MXx8fHwxNzYyNTcwNTM3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1591348278863-a8fb3887e2aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBoYW5kYmFnfGVufDF8fHx8MTc2MjYxNTAwOXww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1756725520224-8fe4bdd87983?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzdW5nbGFzc2VzfGVufDF8fHx8MTc2MjYzMzYwMnww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1653869225353-8101df710ff4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwc2hvZXN8ZW58MXx8fHwxNzYyNjA0NDM0fDA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    clipPath: 'https://images.unsplash.com/photo-1620905970337-faf5ed7cdbe3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3NtZXRpY3MlMjBtaW5pbWFsfGVufDF8fHx8MTc2MjYzMzYwM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    circular: [
      'https://images.unsplash.com/photo-1654512697655-b2899afacae5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMGNsb3RoaW5nfGVufDF8fHx8MTc2MjYxMTc5N3ww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1581784878214-8d5596b98a01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjI2MzM2MDN8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    splitScreen: [
      'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHRleHR1cmV8ZW58MXx8fHwxNzYyNjAwNjQ1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1580136607993-fd598cf5c4f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwYXJ0fGVufDF8fHx8MTc2MjU3NjcxM3ww&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    infiniteLoop: [
      'https://images.unsplash.com/photo-1593821684772-6865bb9413a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwYWNjZXNzb3JpZXMlMjBmbGF0JTIwbGF5fGVufDF8fHx8MTc2MjYzMzYwNXww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1653640869615-e9878a2c8344?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwcG9ydHJhaXQlMjBzdHVkaW98ZW58MXx8fHwxNzYyNTcwNTM3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1591348278863-a8fb3887e2aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBoYW5kYmFnfGVufDF8fHx8MTc2MjYxNTAwOXww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1756725520224-8fe4bdd87983?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzdW5nbGFzc2VzfGVufDF8fHx8MTc2MjYzMzYwMnww&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    morphingBlob: 'https://images.unsplash.com/photo-1653869225353-8101df710ff4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwc2hvZXN8ZW58MXx8fHwxNzYyNjA0NDM0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    typewriter: 'https://images.unsplash.com/photo-1620905970337-faf5ed7cdbe3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3NtZXRpY3MlMjBtaW5pbWFsfGVufDF8fHx8MTc2MjYzMzYwM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    zoomOutGrid: [
      'https://images.unsplash.com/photo-1654512697655-b2899afacae5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMGNsb3RoaW5nfGVufDF8fHx8MTc2MjYxMTc5N3ww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1581784878214-8d5596b98a01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjI2MzM2MDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHRleHR1cmV8ZW58MXx8fHwxNzYyNjAwNjQ1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1580136607993-fd598cf5c4f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwYXJ0fGVufDF8fHx8MTc2MjU3NjcxM3ww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1593821684772-6865bb9413a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwYWNjZXNzb3JpZXMlMjBmbGF0JTIwbGF5fGVufDF8fHx8MTc2MjYzMzYwNXww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1653640869615-e9878a2c8344?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwcG9ydHJhaXQlMjBzdHVkaW98ZW58MXx8fHwxNzYyNTcwNTM3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1591348278863-a8fb3887e2aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBoYW5kYmFnfGVufDF8fHx8MTc2MjYxNTAwOXww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1756725520224-8fe4bdd87983?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzdW5nbGFzc2VzfGVufDF8fHx8MTc2MjYzMzYwMnww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1653869225353-8101df710ff4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwc2hvZXN8ZW58MXx8fHwxNzYyNjA0NDM0fDA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    perspectiveCards: [
      'https://images.unsplash.com/photo-1620905970337-faf5ed7cdbe3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3NtZXRpY3MlMjBtaW5pbWFsfGVufDF8fHx8MTc2MjYzMzYwM3ww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1654512697655-b2899afacae5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMGNsb3RoaW5nfGVufDF8fHx8MTc2MjYxMTc5N3ww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1581784878214-8d5596b98a01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjI2MzM2MDN8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    textMask: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHRleHR1cmV8ZW58MXx8fHwxNzYyNjAwNjQ1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    accordion: [
      'https://images.unsplash.com/photo-1580136607993-fd598cf5c4f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwYXJ0fGVufDF8fHx8MTc2MjU3NjcxM3ww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1593821684772-6865bb9413a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwYWNjZXNzb3JpZXMlMjBmbGF0JTIwbGF5fGVufDF8fHx8MTc2MjYzMzYwNXww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1653640869615-e9878a2c8344?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwcG9ydHJhaXQlMjBzdHVkaW98ZW58MXx8fHwxNzYyNTcwNTM3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1591348278863-a8fb3887e2aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBoYW5kYmFnfGVufDF8fHx8MTc2MjYxNTAwOXww&ixlib=rb-4.1.0&q=80&w=1080'
    ]
  };

  return (
    <div className="bg-white">
      <ScrollProgress />
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-neutral-50 to-neutral-100">
        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="text-center px-8"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-[8rem] md:text-[12rem] leading-none tracking-tighter text-neutral-900"
          >
            <div>SCROLL</div>
            <div className="text-[rgb(255,66,0)]">INNOVATIONS</div>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-8 text-xl text-neutral-600 tracking-wide"
          >
            Advanced CSS scroll-driven animation techniques
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mt-12 flex items-center justify-center gap-2 text-neutral-400"
          >
            <span className="text-sm">Scroll to explore</span>
            <motion.svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" />
            </motion.svg>
          </motion.div>
        </motion.div>

        {/* Decorative grid overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="grid grid-cols-12 h-full border-l border-r border-neutral-300">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="border-r border-neutral-300" />
            ))}
          </div>
        </div>
      </section>

      {/* Navigation Bar */}
      <VariantsNav />

      {/* Variant Sections */}
      <div id="parallax">
        <Suspense fallback={<LoadingFallback />}>
          <ParallaxGrid images={images.parallax} />
        </Suspense>
      </div>

      <div id="flip">
        <Suspense fallback={<LoadingFallback />}>
          <FlipBook images={images.flip} />
        </Suspense>
      </div>

      <div id="slider">
        <Suspense fallback={<LoadingFallback />}>
          <SliceSlider image={images.slider} />
        </Suspense>
      </div>

      <div id="color">
        <Suspense fallback={<LoadingFallback />}>
          <ColorShift image={images.colorShift} />
        </Suspense>
      </div>

      <div id="sticky">
        <Suspense fallback={<LoadingFallback />}>
          <StickyNav images={images.stickyNav} />
        </Suspense>
      </div>

      <div id="path">
        <Suspense fallback={<LoadingFallback />}>
          <PathAnimation images={images.path} />
        </Suspense>
      </div>

      <div id="gradient">
        <Suspense fallback={<LoadingFallback />}>
          <ScaleGradient image={images.scaleGradient} />
        </Suspense>
      </div>

      <div id="horizontal">
        <Suspense fallback={<LoadingFallback />}>
          <HorizontalSnap images={images.horizontal} />
        </Suspense>
      </div>

      <div id="stacked">
        <Suspense fallback={<LoadingFallback />}>
          <StackedCards images={images.stacked} />
        </Suspense>
      </div>

      <div id="clipPath">
        <Suspense fallback={<LoadingFallback />}>
          <ClipPathReveal image={images.clipPath} />
        </Suspense>
      </div>

      <div id="circular">
        <Suspense fallback={<LoadingFallback />}>
          <CircularReveal images={images.circular} />
        </Suspense>
      </div>

      <div id="splitScreen">
        <Suspense fallback={<LoadingFallback />}>
          <SplitScreen images={images.splitScreen} />
        </Suspense>
      </div>

      <div id="infiniteLoop">
        <Suspense fallback={<LoadingFallback />}>
          <InfiniteLoop images={images.infiniteLoop} />
        </Suspense>
      </div>

      <div id="morphingBlob">
        <Suspense fallback={<LoadingFallback />}>
          <MorphingBlob image={images.morphingBlob} />
        </Suspense>
      </div>

      <div id="typewriter">
        <Suspense fallback={<LoadingFallback />}>
          <TypewriterReveal image={images.typewriter} />
        </Suspense>
      </div>

      <div id="zoomOutGrid">
        <Suspense fallback={<LoadingFallback />}>
          <ZoomOutGrid images={images.zoomOutGrid} />
        </Suspense>
      </div>

      <div id="perspectiveCards">
        <Suspense fallback={<LoadingFallback />}>
          <PerspectiveCards images={images.perspectiveCards} />
        </Suspense>
      </div>

      <div id="textMask">
        <Suspense fallback={<LoadingFallback />}>
          <TextMask image={images.textMask} />
        </Suspense>
      </div>

      <div id="accordion">
        <Suspense fallback={<LoadingFallback />}>
          <AccordionReveal images={images.accordion} />
        </Suspense>
      </div>

      {/* Footer */}
      <Suspense fallback={<LoadingFallback />}>
        <Footer />
      </Suspense>
    </div>
  );
}