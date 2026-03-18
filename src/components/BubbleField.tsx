import { motion } from 'framer-motion';

interface Bubble {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  drift: number;
}

const BUBBLE_COUNT = 14;

const bubbles: Bubble[] = Array.from({ length: BUBBLE_COUNT }, (_, i) => ({
  id:       i,
  // Concentrate bubbles on the right half of screen where silhouette is
  x:        52 + (i * 4.8 + Math.sin(i * 1.3) * 8) % 44,
  size:     40 + (i % 6) * 28,         // 40px – 180px
  duration: 10 + (i % 6) * 3.5,        // 10s – 27.5s
  delay:    -(i * 1.9) % 22,
  opacity:  0.08 + (i % 5) * 0.05,     // 0.08 – 0.28 — subtle on page bg
  drift:    (i % 2 === 0 ? 1 : -1) * (10 + (i % 5) * 8),
}));

export const BubbleField = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {bubbles.map((b) => (
        <motion.div
          key={b.id}
          className="absolute rounded-full"
          style={{
            width:   b.size,
            height:  b.size,
            left:    `${b.x}%`,
            bottom:  -b.size,
            opacity: 0,
            border:  `1px solid hsl(0 0% 100% / ${b.opacity * 2.5})`,
            background: `radial-gradient(circle at 30% 28%, hsl(0 0% 100% / ${b.opacity * 1.2}) 0%, transparent 60%)`,
            boxShadow: `0 0 ${Math.round(b.size * 0.2)}px hsl(0 0% 100% / ${b.opacity * 0.5})`,
          }}
          animate={{
            y:       [0, -(window.innerHeight + b.size * 2)],
            x:       [0, b.drift, 0, -b.drift * 0.6, 0],
            opacity: [0, b.opacity, b.opacity, b.opacity * 0.6, 0],
          }}
          transition={{
            y:       { duration: b.duration, delay: b.delay, repeat: Infinity, ease: 'linear' },
            x:       { duration: b.duration * 0.9, delay: b.delay, repeat: Infinity, ease: 'easeInOut' },
            opacity: { duration: b.duration, delay: b.delay, repeat: Infinity, ease: 'easeInOut', times: [0, 0.07, 0.5, 0.88, 1] },
          }}
        />
      ))}
    </div>
  );
};