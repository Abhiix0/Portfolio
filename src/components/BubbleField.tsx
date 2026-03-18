import React from 'react';

const bubbles = [
  { id: 0, x: 15,  size: 80,  duration: 20, delay: -5,  opacity: 0.5 },
  { id: 1, x: 35,  size: 50,  duration: 15, delay: -10, opacity: 0.5 },
  { id: 2, x: 55,  size: 110, duration: 25, delay: -3,  opacity: 0.45 },
  { id: 3, x: 70,  size: 60,  duration: 18, delay: -14, opacity: 0.5 },
  { id: 4, x: 82,  size: 90,  duration: 22, delay: -8,  opacity: 0.45 },
  { id: 5, x: 45,  size: 140, duration: 28, delay: -18, opacity: 0.35 },
  { id: 6, x: 25,  size: 45,  duration: 14, delay: -7,  opacity: 0.5 },
  { id: 7, x: 65,  size: 70,  duration: 20, delay: -12, opacity: 0.45 },
];

export const BubbleField = () => {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 1,
      }}
    >
      <style>{`
        @keyframes bubble-rise {
          0%   { transform: translateY(0px);      opacity: 0;    }
          8%   { opacity: var(--bop);              }
          85%  { opacity: var(--bop);              }
          100% { transform: translateY(-110vh);    opacity: 0;    }
        }
      `}</style>

      {bubbles.map((b) => (
        <div
          key={b.id}
          style={{
            position:     'absolute',
            width:        b.size,
            height:       b.size,
            left:         `${b.x}%`,
            bottom:       0,
            borderRadius: '9999px',
            border:       `1.5px solid rgba(255,255,255,${b.opacity})`,
            background:   `radial-gradient(circle at 35% 30%, rgba(255,255,255,${b.opacity * 0.6}) 0%, rgba(255,255,255,0.05) 40%, transparent 65%)`,
            boxShadow:    `0 0 ${Math.round(b.size * 0.25)}px rgba(255,255,255,${b.opacity * 0.3})`,
            ['--bop' as string]: b.opacity,
            animation:    `bubble-rise ${b.duration}s linear ${b.delay}s infinite`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};