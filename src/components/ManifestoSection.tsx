import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import aboutImage from '@/assets/about.png';
import aboutMobileImage from '@/assets/about-mobile.png';

export const ManifestoSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  
  // Scroll-based reveal from darkness
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start start']
  });
  
  const imageOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);
  const imageY = useTransform(scrollYProgress, [0, 1], [60, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden px-4 sm:px-6 md:px-8"
      style={{ background: '#080808' }}
    >
      {/* Top transition gradient - emerges from Hero darkness */}
      <div
        className="absolute top-0 left-0 w-full h-[20vh] xs:h-[22vh] sm:h-[25vh] md:h-[30vh] pointer-events-none z-20"
        style={{
          background: 'linear-gradient(to bottom, #080808 0%, rgba(8,8,8,0.8) 30%, rgba(8,8,8,0.4) 60%, transparent 100%)',
        }}
      />

      {/* Background image with smooth reveal */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          opacity: imageOpacity,
          y: imageY,
        }}
      >
        <picture>
          {/* Extra small mobile (320-374px) */}
          <source 
            media="(max-width: 374px)" 
            srcSet={aboutMobileImage}
          />
          {/* Small mobile (375-639px) */}
          <source 
            media="(min-width: 375px) and (max-width: 639px)" 
            srcSet={aboutMobileImage}
          />
          {/* Desktop version - landscape original (640px+) */}
          <img
            src={aboutImage}
            alt="About - Technical Stack"
            className="w-full h-full object-cover object-center"
            style={{
              filter: 'brightness(0.85) contrast(1.1)',
            }}
          />
        </picture>
      </motion.div>

      {/* Bottom transition gradient into Autumn Walk */}
      <div
        className="absolute bottom-0 left-0 w-full h-32 xs:h-36 sm:h-40 md:h-48 pointer-events-none z-10"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(8,8,8,0.5) 50%, #080808 100%)',
        }}
      />
    </section>
  );
};