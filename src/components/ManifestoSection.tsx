import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import aboutImage from '@/assets/about.png';

export const ManifestoSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: '#080808' }}
    >
      {/* Background image */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        <img
          src={aboutImage}
          alt="About"
          className="w-full h-full object-cover"
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