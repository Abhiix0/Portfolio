import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  drift: number;
  color: string;
}

interface LightStreak {
  id: number;
  x: number;
  height: number;
  duration: number;
  delay: number;
}

export const ParticleField = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [lightStreaks, setLightStreaks] = useState<LightStreak[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [viewH, setViewH] = useState(typeof window !== 'undefined' ? window.innerHeight : 800);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Generate floating particles
    const newParticles: Particle[] = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 25 + 20,
      delay: Math.random() * 15,
      opacity: Math.random() * 0.4 + 0.1,
      drift: (Math.random() - 0.5) * 150,
      color: `hsl(0 0% ${70 + Math.random() * 30}% / ${(Math.random() * 0.4 + 0.1).toFixed(2)})`,
    }));
    setParticles(newParticles);

    // Generate light streaks
    const newStreaks: LightStreak[] = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      x: 15 + i * 20,
      height: Math.random() * 200 + 100,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 5,
    }));
    setLightStreaks(newStreaks);
  }, []);

  useEffect(() => {
    const update = () => setViewH(window.innerHeight);
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Cursor-following ambient gradient */}
      <motion.div
        className="absolute inset-0 transition-all duration-700 ease-out"
        style={{
          background: `radial-gradient(ellipse 50% 50% at ${mousePos.x * 100}% ${mousePos.y * 100}%, hsl(0 0% 18% / 0.4) 0%, transparent 60%)`,
        }}
      />

      {/* Secondary ambient orb */}
      <motion.div
        className="absolute w-96 h-96 rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, hsl(0 0% 15% / 0.3) 0%, transparent 70%)',
          left: `${mousePos.x * 60 + 20}%`,
          top: `${mousePos.y * 60 + 20}%`,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Light streaks */}
      {lightStreaks.map((streak) => (
        <motion.div
          key={streak.id}
          className="absolute w-px bg-gradient-to-b from-transparent via-foreground/10 to-transparent"
          style={{
            left: `${streak.x}%`,
            height: streak.height,
          }}
          animate={{
            y: [-streak.height, viewH + streak.height],
            opacity: [0, 0.5, 0.5, 0],
          }}
          transition={{
            duration: streak.duration,
            delay: streak.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            width: particle.size,
            height: particle.size,
            background: particle.color,
            boxShadow: particle.size > 2 ? `0 0 ${particle.size * 3}px hsl(0 0% 100% / 0.2)` : 'none',
          }}
          animate={{
            y: [viewH, -100],
            x: [0, particle.drift],
            rotate: [0, 360],
            opacity: [0, particle.opacity, particle.opacity, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Cursor-responsive light streak */}
      <motion.div
        className="absolute w-0.5 h-40 bg-gradient-to-b from-transparent via-foreground/15 to-transparent blur-sm"
        style={{
          left: `${mousePos.x * 100}%`,
          top: `${mousePos.y * 100 - 15}%`,
        }}
        animate={{
          opacity: [0.1, 0.4, 0.1],
          scaleY: [0.8, 1.3, 0.8],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};
