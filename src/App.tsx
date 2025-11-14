import { useRef, Suspense, lazy } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ScrollProgress } from './components/ScrollProgress';
import { VariantsNav } from './components/VariantsNav';
import { ArrowDown } from 'lucide-react';

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
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-6">
        <motion.div
          className="w-16 h-16 border border-neutral-900"
          animate={{ 
            rotate: 360,
            borderRadius: ['0%', '50%', '0%']
          }}
          transition={{ 
            rotate: { duration: 2, repeat: Infinity, ease: 'linear' },
            borderRadius: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
          }}
        />
        <span className="text-xs tracking-[0.2em] uppercase font-['Inter'] text-neutral-400">Loading Experience</span>
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

  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const lineWidth = useTransform(scrollYProgress, [0, 0.3], ['0%', '100%']);

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
      
      {/* Hero Section - Completely Redesigned */}
      <section ref={heroRef} className="relative min-h-[140vh] flex items-center justify-center overflow-hidden bg-neutral-50">
        <motion.div 
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative z-10 text-center px-6 md:px-12 max-w-7xl mx-auto py-32"
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12"
          >
            <span className="inline-block text-xs tracking-[0.3em] uppercase font-['Inter'] text-neutral-500 border border-neutral-300 px-5 py-2.5 rounded-full">
              Portfolio Archive
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-7xl md:text-9xl lg:text-[11rem] leading-[0.9] tracking-tight text-neutral-900 mb-12"
          >
            <div className="italic">Scroll—Driven</div>
            <div className="mt-4 italic">Animations</div>
          </motion.h1>

          {/* Decorative Line */}
          <motion.div 
            className="relative h-px bg-neutral-900 mb-16 max-w-2xl mx-auto"
            style={{ width: lineWidth }}
          />
          
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl md:text-2xl lg:text-3xl leading-relaxed text-neutral-600 max-w-4xl mx-auto mb-20"
          >
            A comprehensive library of nineteen scroll-driven animation patterns, 
            crafted for modern web experiences with accessibility at the forefront.
          </motion.p>

          {/* Creator Credit */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-20"
          >
            <p className="text-sm md:text-base text-neutral-500 mb-2 font-['Inter'] tracking-wide">
              Created by
            </p>
            <p className="text-3xl md:text-4xl lg:text-5xl text-neutral-900 italic tracking-tight">
              Austin Carson
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center justify-center gap-12 md:gap-20 text-sm font-['Inter']"
          >
            <div className="text-center">
              <div className="text-5xl md:text-6xl text-neutral-900 mb-3">19</div>
              <div className="text-xs tracking-[0.2em] uppercase text-neutral-500">Variants</div>
            </div>
            <div className="w-px h-16 bg-neutral-300" />
            <div className="text-center">
              <div className="text-5xl md:text-6xl text-neutral-900 mb-3">100%</div>
              <div className="text-xs tracking-[0.2em] uppercase text-neutral-500">WCAG AA</div>
            </div>
            <div className="w-px h-16 bg-neutral-300" />
            <div className="text-center">
              <div className="text-5xl md:text-6xl text-neutral-900 mb-3">120+</div>
              <div className="text-xs tracking-[0.2em] uppercase text-neutral-500">Tokens</div>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 1 }}
            className="absolute bottom-16 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="flex flex-col items-center gap-4"
            >
              <span className="text-xs tracking-[0.25em] uppercase font-['Inter'] text-neutral-400">Scroll to Explore</span>
              <ArrowDown className="w-5 h-5 text-neutral-400" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.015]">
          <svg width="100%" height="100%">
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </section>

      {/* Navigation Bar */}
      <VariantsNav />

      {/* All Variants with Suspense boundaries */}
      <Suspense fallback={<LoadingFallback />}>
        <div id="parallax"><ParallaxGrid images={images.parallax} /></div>
      </Suspense>

      <Suspense fallback={<LoadingFallback />}>
        <div id="flip"><FlipBook images={images.flip} /></div>
      </Suspense>

      <Suspense fallback={<LoadingFallback />}>
        <div id="slider"><SliceSlider image={images.slider} /></div>
      </Suspense>

      <Suspense fallback={<LoadingFallback />}>
        <div id="color"><ColorShift image={images.colorShift} /></div>
      </Suspense>

      <Suspense fallback={<LoadingFallback />}>
        <div id="sticky"><StickyNav images={images.stickyNav} /></div>
      </Suspense>

      <Suspense fallback={<LoadingFallback />}>
        <div id="path"><PathAnimation images={images.path} /></div>
      </Suspense>

      <Suspense fallback={<LoadingFallback />}>
        <div id="gradient"><ScaleGradient image={images.scaleGradient} /></div>
      </Suspense>

      <Suspense fallback={<LoadingFallback />}>
        <div id="horizontal"><HorizontalSnap images={images.horizontal} /></div>
      </Suspense>

      <Suspense fallback={<LoadingFallback />}>
        <div id="stacked"><StackedCards images={images.stacked} /></div>
      </Suspense>

      <Suspense fallback={<LoadingFallback />}>
        <div id="clipPath"><ClipPathReveal image={images.clipPath} /></div>
      </Suspense>

      <Suspense fallback={<LoadingFallback />}>
        <div id="circular"><CircularReveal images={images.circular} /></div>
      </Suspense>

      <Suspense fallback={<LoadingFallback />}>
        <div id="splitScreen"><SplitScreen images={images.splitScreen} /></div>
      </Suspense>

      <Suspense fallback={<LoadingFallback />}>
        <div id="infiniteLoop"><InfiniteLoop images={images.infiniteLoop} /></div>
      </Suspense>

      <Suspense fallback={<LoadingFallback />}>
        <div id="morphingBlob"><MorphingBlob image={images.morphingBlob} /></div>
      </Suspense>

      <Suspense fallback={<LoadingFallback />}>
        <div id="typewriter"><TypewriterReveal image={images.typewriter} /></div>
      </Suspense>

      <Suspense fallback={<LoadingFallback />}>
        <div id="zoomOutGrid"><ZoomOutGrid images={images.zoomOutGrid} /></div>
      </Suspense>

      <Suspense fallback={<LoadingFallback />}>
        <div id="perspectiveCards"><PerspectiveCards images={images.perspectiveCards} /></div>
      </Suspense>

      <Suspense fallback={<LoadingFallback />}>
        <div id="textMask"><TextMask image={images.textMask} /></div>
      </Suspense>

      <Suspense fallback={<LoadingFallback />}>
        <div id="accordion"><AccordionReveal images={images.accordion} /></div>
      </Suspense>

      {/* Footer */}
      <Suspense fallback={<LoadingFallback />}>
        <Footer />
      </Suspense>
    </div>
  );
}