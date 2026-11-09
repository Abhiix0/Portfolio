import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import aboutImage from '@/assets/about.png';

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
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: '#080808' }}
    >
      {/* Top transition gradient - emerges from Hero darkness */}
      <div
        className="absolute top-0 left-0 w-full h-[30vh] pointer-events-none z-20"
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
        <img
          src={aboutImage}
          alt="About"
          className="w-full h-full object-cover"
          style={{
            filter: 'brightness(0.85) contrast(1.1)',
          }}
        />
      </motion.div>

      {/* Bottom transition gradient into Autumn Walk */}
      <div
        className="absolute bottom-0 left-0 w-full h-48 pointer-events-none z-10"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(8,8,8,0.5) 50%, #080808 100%)',
        }}
      />
    </section>
  );
};