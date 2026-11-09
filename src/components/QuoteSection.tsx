import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FallingLeaves } from 'falling-leaves/react';
import autumnForest from '@/assets/Quote.png';

// ── Firefly Component ─────────────────────────────────────────────────────────
interface FireflyProps {
  delay: number;
  duration: number;
  x: string;
  size: number;
}

const Firefly = ({ delay, duration, x, size }: FireflyProps) => {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: x,
        bottom: '20%',
        width: size,
        height: size,
      }}
      initial={{ opacity: 0, y: 0 }}
      animate={{
        opacity: [0, 0.6, 0.3, 0.7, 0],
        y: [-50, -150, -100, -200, -250],
        x: [0, 20, -10, 15, -5],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <div
        className="w-full h-full rounded-full"
        style={{
          background: 'radial-gradient(circle, #E58A43 0%, #C65D25 50%, transparent 70%)',
          boxShadow: '0 0 8px #E58A43, 0 0 12px #C65D25',
        }}
      />
    </motion.div>
  );
};

// ── Main Component ────────────────────────────────────────────────────────────
export const QuoteSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: '0px 0px -20% 0px' });
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Generate firefly data
  const fireflies = Array.from({ length: isMobile ? 6 : 10 }, (_, i) => ({
    id: i,
    delay: i * 1.8,
    duration: 15 + Math.random() * 10,
    x: `${20 + Math.random() * 60}%`,
    size: 3 + Math.random() * 3,
  }));

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] flex items-center"
      style={{ background: '#080808', overflow: 'visible' }}
    >
      {/* ── Background Image with Slow Zoom ── */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1 }}
        animate={isInView ? { scale: 1.035 } : { scale: 1 }}
        transition={{
          duration: 30,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url(${autumnForest})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        {/* Dark overlay to preserve monochromatic mood */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(8,8,8,0.3) 0%, rgba(8,8,8,0.1) 50%, rgba(8,8,8,0.4) 100%)',
          }}
        />
      </motion.div>

      {/* ── Atmospheric Fog Layer ── */}
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none"
        initial={{ x: '-10%' }}
        animate={{ x: '10%' }}
        transition={{
          duration: 40,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'linear',
        }}
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 30% 40%, rgba(85,80,75,0.15) 0%, transparent 50%), radial-gradient(ellipse 70% 40% at 70% 60%, rgba(85,80,75,0.1) 0%, transparent 50%)',
        }}
      />

      {/* ── Ambient Lantern Glow ── */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 25% 30% at 40% 45%, rgba(229,138,67,0.08) 0%, transparent 60%), radial-gradient(ellipse 20% 25% at 60% 50%, rgba(198,93,37,0.06) 0%, transparent 55%)',
        }}
      />

      {/* ── Falling Maple Leaves (Extended Container) ── */}
      {isInView && (
        <div 
          className="absolute left-0 right-0 pointer-events-none" 
          style={{ 
            top: 0, 
            height: '150vh', // Extends beyond section into Projects
            zIndex: 20 
          }}
        >
          <FallingLeaves
            count={isMobile ? 12 : 22}
            shapes={['maple']}
            colors={['#C65D25', '#E58A43', '#D99A65', '#C65D25', '#E58A43']}
            size={isMobile ? [12, 24] : [16, 32]}
            speed={[0.4, 1.2]}
            wind={[0.2, 0.7]}
            sway={[0.5, 1.2]}
            rotationSpeed={[-1.2, 1.2]}
            opacity={0.85}
            zIndex={20}
            respectReducedMotion={true}
            autoStart={true}
          />
          {/* Progressive fade - starts deeper in Projects section */}
          <div
            className="absolute left-0 right-0 pointer-events-none"
            style={{
              top: '120vh', // Starts fade well into Projects
              height: '30vh',
              background: 'linear-gradient(to bottom, transparent 0%, rgba(8,8,8,0.7) 50%, rgba(8,8,8,1) 100%)',
            }}
          />
        </div>
      )}

      {/* ── Fireflies ── */}
      {isInView && (
        <div className="absolute inset-0 z-15 pointer-events-none overflow-hidden">
          {fireflies.map((firefly) => (
            <Firefly
              key={firefly.id}
              delay={firefly.delay}
              duration={firefly.duration}
              x={firefly.x}
              size={firefly.size}
            />
          ))}
        </div>
      )}

      {/* ── Gradient Fade Top ── */}
      <div
        className="absolute top-0 left-0 w-full h-32 pointer-events-none z-30"
        style={{
          background: 'linear-gradient(to bottom, #080808 0%, transparent 100%)',
        }}
      />

      {/* ── Forest Fade to Darkness ── */}
      <div
        className="absolute bottom-0 left-0 w-full h-[60%] pointer-events-none z-30"
        style={{
          background: 'linear-gradient(to top, #080808 0%, rgba(8,8,8,0.95) 15%, rgba(8,8,8,0.7) 35%, rgba(8,8,8,0.4) 55%, transparent 100%)',
        }}
      />

      {/* ── Transition Ambient Glow ── */}
      <div
        className="absolute bottom-0 left-0 w-full h-48 pointer-events-none z-25"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(198,93,37,0.03) 0%, transparent 70%)',
        }}
      />
    </section>
  );
};