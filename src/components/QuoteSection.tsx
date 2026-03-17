import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import quoteBg from '@/assets/quote-bg.png';

gsap.registerPlugin(ScrollTrigger);

export const QuoteSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const overlayY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePos({
          x: (e.clientX - rect.left) / rect.width - 0.5,
          y: (e.clientY - rect.top) / rect.height - 0.5,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const quoteWords = "Clarity doesn't arrive all at once. It builds, slowly, in pieces.".split(' ');

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[80vh] py-24 flex items-center overflow-hidden"
    >
      {/* Background image with parallax */}
      <motion.div
        ref={imageRef}
        className="absolute inset-0 z-0"
        style={{ y: imageY }}
      >
        <img
          src={quoteBg}
          alt=""
          className="w-full h-[120%] object-cover opacity-40"
        />
        {/* Overlay that moves slightly differently */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/40"
          style={{ y: overlayY }}
        />
      </motion.div>

      {/* Cursor-responsive gradient */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: `radial-gradient(circle at ${50 + mousePos.x * 30}% ${50 + mousePos.y * 30}%, hsl(0 0% 15% / 0.3) 0%, transparent 50%)`,
        }}
      />

      <div className="container px-8 md:px-16 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Visual element (abstract) */}
          <motion.div
            className="relative hidden lg:block"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <motion.div
              className="w-full aspect-square max-w-md relative"
              animate={{
                x: mousePos.x * 20,
                y: mousePos.y * 20,
              }}
              transition={{ type: "spring", stiffness: 50, damping: 20 }}
            >
              {/* Abstract geometric shapes */}
              <motion.div
                className="absolute top-10 left-10 w-32 h-32 border border-foreground/20 rounded-2xl"
                animate={{ rotate: [0, 5, 0], y: [-5, 5, -5] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute top-20 left-20 w-48 h-48 border border-foreground/10 rounded-3xl"
                animate={{ rotate: [0, -3, 0], y: [5, -5, 5] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              />
              <motion.div
                className="absolute top-32 left-32 w-40 h-40 bg-gradient-to-br from-foreground/5 to-transparent rounded-2xl backdrop-blur-sm"
                animate={{ rotate: [0, 8, 0], scale: [1, 1.02, 1] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />
              
              {/* Central glow */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full blur-2xl"
                style={{ background: 'radial-gradient(circle, hsl(0 0% 40% / 0.4) 0%, transparent 70%)' }}
                animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>

          {/* Right: Quote text */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <motion.span
              className="text-6xl md:text-8xl text-foreground/10 font-serif block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              "
            </motion.span>

            <blockquote className="text-2xl md:text-4xl font-light leading-relaxed -mt-8">
              {quoteWords.map((word, index) => (
                <motion.span
                  key={index}
                  className="inline-block mr-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: 0.5 + index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    letterSpacing: '0.02em',
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </blockquote>

            <motion.div
              className="flex items-center gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <div className="w-12 h-px bg-gradient-to-r from-foreground/50 to-transparent" />
              <span className="text-sm text-muted-foreground tracking-widest uppercase">
                Steve Jobs
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-30 pointer-events-none" />
    </section>
  );
};
