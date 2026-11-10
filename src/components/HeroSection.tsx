import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import gsap from 'gsap';
import silhouetteImage from '@/assets/silhouette-headphones.png';
import ambientAudio from '@/assets/ambient.mp3';
import { ParticleField } from './ParticleField';
import { PlayButton } from './PlayButton';
import { BubbleField } from './BubbleField';

export const HeroSection = () => {
  const containerRef  = useRef<HTMLDivElement>(null);
  const silhouetteRef = useRef<HTMLDivElement>(null);
  const textRef       = useRef<HTMLDivElement>(null);
  const audioRef      = useRef<HTMLAudioElement | null>(null);

  const pauseTimer    = useRef<ReturnType<typeof setTimeout>>();
  const mouseX = useMotionValue(0), mouseY = useMotionValue(0);
  const parallaxX = useSpring(mouseX, { stiffness: 40, damping: 15 });
  const parallaxY = useSpring(mouseY, { stiffness: 40, damping: 15 });
  const [isPlaying,      setIsPlaying]      = useState(false);
  const [hiddenChar,     setHiddenChar]     = useState<number | null>(null);

  // ── audio ─────────────────────────────────────────────────────────────────
  useEffect(() => () => {
    clearTimeout(pauseTimer.current);
    audioRef.current?.pause();
    audioRef.current = null;
  }, []);

  const fadeVolume = (target: number, duration = 1200) => {
    const audio = audioRef.current;
    if (!audio) return;
    const start = audio.volume, diff = target - start, t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      audio.volume = Math.max(0, Math.min(1, start + diff * p));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const handlePlayToggle = () => {
    clearTimeout(pauseTimer.current);
    if (isPlaying) {
      const audio = audioRef.current;
      fadeVolume(0, 800); pauseTimer.current = setTimeout(() => audio?.pause(), 850); setIsPlaying(false);
    } else {
      if (!audioRef.current) {
        const audio = new Audio(ambientAudio);
        audio.loop = true;
        audio.volume = 0;
        audioRef.current = audio;
      }
      audioRef.current.play().catch(() => {});
      fadeVolume(0.55, 1200); setIsPlaying(true);
    }
  };

  // ── scroll ────────────────────────────────────────────────────────────────
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const y       = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.6, 0.85], [1, 0.7, 0]);
  const scale   = useTransform(scrollYProgress, [0, 1], [1, 0.96]);
  const blur    = useTransform(scrollYProgress, [0.3, 0.7], [0, 2.5]);
  const blurFilter = useTransform(blur, (v) => `blur(${v}px)`);
  const springY       = useSpring(y,       { stiffness: 80,  damping: 25 });
  const springOpacity = useSpring(opacity, { stiffness: 100, damping: 30 });

  // ── GSAP ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(silhouetteRef.current, { y: 8, duration: 3, ease: 'sine.inOut', repeat: -1, yoyo: true });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // ── mouse ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const r = containerRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - r.left - r.width / 2) / r.width * 20);
      mouseY.set((e.clientY - r.top - r.height / 2) / r.height * 15);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [mouseX, mouseY]);

  const textLines = [
    { text: "Hello, I'm Abhi.", delay: 0    },
    { text: 'Breathing.',       delay: 0.15 },
    { text: 'Exhausted.',       delay: 0.3  },
    { text: 'Alive.',           delay: 0.45 },
  ];

  return (
    <motion.section
      ref={containerRef}
      className="relative min-h-[100svh] flex items-center overflow-hidden"
      style={{
        position: 'relative',
        opacity: springOpacity, scale, willChange: 'transform, opacity, filter',
        filter: blurFilter,
        background: 'linear-gradient(180deg, hsl(0 0% 4%) 0%, hsl(0 0% 0%) 40%, hsl(0 0% 0%) 100%)',
      }}
    >
      <div className="noise-overlay absolute inset-0 pointer-events-none z-20" style={{ opacity: 0.03, mixBlendMode: 'overlay' }} />

      <ParticleField />

      {/* Bubbles */}
      <BubbleField />

      {/* Text — LEFT — Responsive padding and typography */}
      <div ref={textRef} className="relative z-10 w-full md:w-1/2 px-6 sm:px-8 md:pl-16 lg:pl-24 xl:pl-32 2xl:pl-40 md:pr-4">
        <div className="max-w-lg">
          {textLines.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60, filter: 'blur(12px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.9, delay: 0.6 + line.delay, ease: [0.22, 1, 0.36, 1] }}
              onMouseLeave={() => setHiddenChar(null)}
            >
              <h1
                className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light tracking-[-0.02em] leading-tight transition-all duration-300 text-balance ${index !== 1 ? 'hover:tracking-[0.02em] hover:scale-[1.02]' : ''} ${
                  index === 1 ? 'text-gradient font-medium' : index === 0 ? 'text-foreground/95' : 'text-foreground/60'
                }`}
              >
                {line.text.split('').map((char, charIndex) => (
                  <span
                    key={charIndex}
                    className={index === 1 ? 'inline-block' : 'inline-block transition-transform duration-150 ease-out hover:scale-[1.15] hover:-translate-y-[3px]'}
                    {...(index === 1 ? { onMouseEnter: () => setHiddenChar(charIndex), style: { opacity: hiddenChar === charIndex ? 0 : 1 } } : {})}
                  >
                    {char === ' ' ? ' ' : char}
                  </span>
                ))}
              </h1>
            </motion.div>
          ))}

          <motion.p className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-muted-foreground max-w-md leading-relaxed" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}>
            Watching clouds. Solving problems.
          </motion.p>

          <motion.div className="mt-8 sm:mt-12" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 1.8 }}>
            <PlayButton isPlaying={isPlaying} onToggle={handlePlayToggle} />
          </motion.div>

          <motion.div className="mt-8 sm:mt-12 flex items-center gap-3 text-muted-foreground" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2, duration: 1 }}>
            <motion.div className="w-px h-12 sm:h-16 bg-gradient-to-b from-foreground/60 via-foreground/30 to-transparent" animate={{ scaleY: [1, 0.6, 1], opacity: [0.8, 0.4, 0.8] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }} />
            <span className="text-xs sm:text-sm tracking-widest uppercase">Scroll to explore</span>
          </motion.div>
        </div>
      </div>

      {/* Silhouette — RIGHT — Responsive positioning to avoid text overlap */}
      <motion.div
        className="absolute right-4 sm:right-6 md:right-12 lg:right-16 xl:right-20 2xl:right-28 bottom-6 sm:bottom-8 md:bottom-12 lg:bottom-16 w-[70%] sm:w-[65%] md:w-[45%] lg:w-[40%] xl:w-[35%] 2xl:w-[30%] h-[50vh] sm:h-[55vh] md:h-[65vh] lg:h-[70vh] pointer-events-none opacity-40 sm:opacity-60 md:opacity-100"
        style={{ y: springY }}
      >
        <div ref={silhouetteRef} className="absolute inset-0">
        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl overflow-hidden bg-black">
          <motion.div
            className="relative w-full h-full flex items-end justify-center pb-4 sm:pb-6 md:pb-8"
            style={{ x: parallaxX, y: parallaxY }}
          >
            <motion.img
              src={silhouetteImage}
              alt="Silhouette"
              decoding="async"
              className="h-full w-full object-contain object-bottom select-none mix-blend-lighten"
              style={{ filter: 'invert(1)' }}
              whileHover={{ scale: 1.02 }}
              data-magnetic
            />
          </motion.div>
        </div>
        </div>
      </motion.div>

      {/* Ambient gradient left */}
      <div className="absolute top-0 left-0 w-1/2 h-full pointer-events-none" style={{ background: 'radial-gradient(ellipse at 20% 40%, hsl(0 0% 8% / 0.5) 0%, transparent 70%)' }} />

      {/* Bottom transition gradient */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-[40vh] pointer-events-none z-20"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(8,8,8,0.3) 30%, rgba(8,8,8,0.7) 60%, #080808 100%)',
          opacity: scrollYProgress,
        }}
      />
    </motion.section>
  );
};
