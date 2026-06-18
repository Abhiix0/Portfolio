import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';

interface Ripple {
  id: number;
  x: number;
  y: number;
}

interface Trail {
  id: number;
  x: number;
  y: number;
}

export const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [trails, setTrails] = useState<Trail[]>([]);
  const trailIdRef = useRef(0);
  const lastTrailTime = useRef(0);

  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);
  const springGlowX = useSpring(glowX, { stiffness: 200, damping: 20 });
  const springGlowY = useSpring(glowY, { stiffness: 200, damping: 20 });

  useEffect(() => {
    const timeoutIds: ReturnType<typeof setTimeout>[] = [];

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      glowX.set(e.clientX - 40);
      glowY.set(e.clientY - 40);

      // Add trail particle with throttling
      const now = Date.now();
      if (now - lastTrailTime.current > 30) {
        lastTrailTime.current = now;
        const newTrail = { id: trailIdRef.current++, x: e.clientX, y: e.clientY };
        setTrails((prev) => [...prev.slice(-15), newTrail]);

        const id = setTimeout(() => {
          setTrails((prev) => prev.filter((t) => t.id !== newTrail.id));
        }, 400);

        timeoutIds.push(id);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('[data-magnetic]') ||
        target.closest('[data-hover]')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      timeoutIds.forEach(clearTimeout);
    };
  }, []);

  useEffect(() => {
    const rippleTimeouts: ReturnType<typeof setTimeout>[] = [];

    const handleClick = (e: MouseEvent) => {
      const newRipple = { id: Date.now(), x: e.clientX, y: e.clientY };
      setRipples((prev) => [...prev, newRipple]);

      const id = setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 800);

      rippleTimeouts.push(id);
    };

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
      rippleTimeouts.forEach(clearTimeout);
    };
  }, []);

  return (
    <>
      {/* Trail particles */}
      <AnimatePresence>
        {trails.map((trail, index) => (
          <motion.div
            key={trail.id}
            className="fixed pointer-events-none z-[9995] rounded-full hidden md:block"
            style={{
              left: trail.x - 2,
              top: trail.y - 2,
              width: 4,
              height: 4,
              background: `hsl(0 0% ${60 + index * 2}% / ${0.3 - index * 0.015})`,
            }}
            initial={{ scale: 1, opacity: 0.4 }}
            animate={{ scale: 0.3, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>

      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 rounded-full bg-foreground/90 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        animate={{
          x: mousePos.x - 6,
          y: mousePos.y - 6,
          scale: isHovering ? 2.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 600,
          damping: 28,
          mass: 0.3,
        }}
      />

      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 rounded-full border border-foreground/20 pointer-events-none z-[9998] hidden md:block"
        animate={{
          x: mousePos.x - 24,
          y: mousePos.y - 24,
          scale: isHovering ? 1.8 : 1,
          opacity: isHovering ? 0.6 : 0.25,
          borderColor: isHovering ? 'hsl(0 0% 60%)' : 'hsl(0 0% 30%)',
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
          mass: 0.5,
        }}
      />

      {/* Magnetic glow when hovering */}
      <AnimatePresence>
        {isHovering && (
          <motion.div
            className="fixed pointer-events-none z-[9996] rounded-full hidden md:block"
            style={{
              x: springGlowX,
              y: springGlowY,
              width: 80,
              height: 80,
              background: 'radial-gradient(circle, hsl(0 0% 100% / 0.08) 0%, transparent 70%)',
              position: 'fixed',
              top: 0,
              left: 0,
              pointerEvents: 'none',
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>

      {/* Click ripples */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="fixed pointer-events-none z-[9997] rounded-full hidden md:block"
            style={{
              left: ripple.x - 30,
              top: ripple.y - 30,
              width: 60,
              height: 60,
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="w-full h-full rounded-full border border-foreground/40"
              style={{
                background: 'radial-gradient(circle, hsl(0 0% 100% / 0.15) 0%, transparent 70%)',
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
};
