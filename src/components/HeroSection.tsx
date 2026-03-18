import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import gsap from 'gsap';
import silhouetteImage from '@/assets/silhouette-headphones.png';
import ambientAudio from '@/assets/ambient.mp3';
import { ParticleField } from './ParticleField';
import { PlayButton } from './PlayButton';

export const HeroSection = () => {
  const containerRef    = useRef<HTMLDivElement>(null);
  const silhouetteRef   = useRef<HTMLDivElement>(null);
  const textRef         = useRef<HTMLDivElement>(null);
  const audioRef        = useRef<HTMLAudioElement | null>(null);

  const [mousePos,       setMousePos]       = useState({ x: 0, y: 0 });
  const [isHoveringText, setIsHoveringText] = useState<number | null>(null);
  const [isPlaying,      setIsPlaying]      = useState(false);

  // ── audio setup ──────────────────────────────────────────────────────────
  useEffect(() => {
    const audio = new Audio(ambientAudio);
    audio.loop   = true;
    audio.volume = 0;          // start silent — fade in on play
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  const fadeVolume = (target: number, duration = 1200) => {
    const audio = audioRef.current;
    if (!audio) return;
    const start     = audio.volume;
    const diff      = target - start;
    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      audio.volume = Math.max(0, Math.min(1, start + diff * progress));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const handlePlayToggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      fadeVolume(0, 800);
      setTimeout(() => audio.pause(), 850);
      setIsPlaying(false);
    } else {
      audio.play();
      fadeVolume(0.55, 1200);
      setIsPlaying(true);
    }
  };

  // ── scroll transforms ────────────────────────────────────────────────────
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y       = useTransform(scrollYProgress, [0, 1], [0, 250]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale   = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const blur    = useTransform(scrollYProgress, [0, 0.5], [0, 8]);

  const springY       = useSpring(y,       { stiffness: 80,  damping: 25 });
  const springOpacity = useSpring(opacity, { stiffness: 100, damping: 30 });

  // ── GSAP ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(silhouetteRef.current, {
        y: 8, duration: 3, ease: 'sine.inOut', repeat: -1, yoyo: true,
      });
      const glow = document.querySelector('.laptop-glow');
      if (glow) {
        gsap.to(glow, {
          opacity: 0.8, scale: 1.1, duration: 2,
          ease: 'sine.inOut', repeat: -1, yoyo: true,
        });
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // ── mouse tracking ───────────────────────────────────────────────────────
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: (e.clientX - rect.left  - rect.width  / 2) / rect.width,
          y: (e.clientY - rect.top   - rect.height / 2) / rect.height,
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const textLines = [
    { text: "Hello, I'm Abhi.", delay: 0    },
    { text: 'Breathing.',       delay: 0.15 },
    { text: 'Exhausted.',       delay: 0.3  },
    { text: 'Alive.',           delay: 0.45 },
  ];

  return (
    <motion.section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        opacity: springOpacity,
        scale,
        filter: useTransform(blur, (v) => `blur(${v}px)`),
        background: 'linear-gradient(180deg, hsl(0 0% 4%) 0%, hsl(0 0% 0%) 40%, hsl(0 0% 0%) 100%)',
      }}
    >
      {/* Film grain */}
      <div
        className="noise-overlay absolute inset-0 pointer-events-none z-20"
        style={{ opacity: 0.03, mixBlendMode: 'overlay' }}
      />

      <ParticleField />

      {/* Text — LEFT */}
      <div ref={textRef} className="relative z-10 w-full md:w-1/2 pl-8 md:pl-24 lg:pl-32 pr-4">
        <div className="max-w-xl">
          {textLines.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60, filter: 'blur(12px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.9, delay: 0.6 + line.delay, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={() => setIsHoveringText(index)}
              onMouseLeave={() => setIsHoveringText(null)}
            >
              <h1
                className={`text-4xl md:text-6xl lg:text-7xl font-light tracking-tight leading-tight transition-all duration-300 ${
                  index === 1 ? 'text-gradient font-medium' : index === 0 ? 'text-foreground/95' : 'text-foreground/60'
                }`}
                style={{
                  letterSpacing: isHoveringText === index ? '0.02em' : '-0.02em',
                  transform:     isHoveringText === index ? 'scale(1.02)' : 'scale(1)',
                }}
              >
                {line.text.split('').map((char, charIndex) => (
                  <motion.span
                    key={charIndex}
                    className="inline-block"
                    whileHover={{ scale: 1.15, y: -3, transition: { duration: 0.15, ease: 'easeOut' } }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </h1>
            </motion.div>
          ))}

          <motion.p
            className="mt-8 text-lg md:text-xl text-muted-foreground max-w-md leading-relaxed"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
          >
            Curiosity first. Progress over perfection.
          </motion.p>

          {/* Play button */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.8 }}
          >
            <PlayButton isPlaying={isPlaying} onToggle={handlePlayToggle} />
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="mt-12 flex items-center gap-3 text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 1 }}
          >
            <motion.div
              className="w-px h-16 bg-gradient-to-b from-foreground/60 via-foreground/30 to-transparent"
              animate={{ scaleY: [1, 0.6, 1], opacity: [0.8, 0.4, 0.8] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span className="text-sm tracking-widest uppercase">Scroll to explore</span>
          </motion.div>
        </div>
      </div>

      {/* Silhouette — RIGHT */}
      <motion.div
        ref={silhouetteRef}
        className="absolute right-8 md:right-16 bottom-8 md:bottom-16 w-[85%] md:w-[40%] h-[70vh] pointer-events-none"
        style={{ y: springY }}
      >
        <div className="absolute inset-0 bg-black rounded-3xl overflow-hidden" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 60%, hsl(0 0% 15% / 0.25) 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[60%] h-8 pointer-events-none rounded-full"
          style={{ background: 'radial-gradient(ellipse at center, hsl(0 0% 0% / 0.6) 0%, transparent 70%)', filter: 'blur(12px)' }}
        />
        <motion.div
          className="relative w-full h-full flex items-end justify-center pb-8"
          animate={{ x: mousePos.x * 20, y: mousePos.y * 15 }}
          transition={{ type: 'spring', stiffness: 40, damping: 15 }}
        >
          <motion.img
            src={silhouetteImage}
            alt="Silhouette"
            className="h-[90%] w-auto object-contain object-bottom select-none mix-blend-lighten"
            style={{ filter: 'invert(1)' }}
            whileHover={{ scale: 1.02 }}
            data-magnetic
          />
        </motion.div>
      </motion.div>

      {/* Ambient gradient left */}
      <div
        className="absolute top-0 left-0 w-1/2 h-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 20% 40%, hsl(0 0% 8% / 0.5) 0%, transparent 70%)' }}
      />
    </motion.section>
  );
};