import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import aboutImage from '@/assets/about.png';
import aboutMobileImage from '@/assets/about-mobile.png';

// Skill categories data
const skillCategories = [
  {
    number: '01',
    label: 'LANGUAGES',
    skills: ['Python', 'JavaScript', 'TypeScript', 'SQL'],
  },
  {
    number: '02',
    label: 'BACKEND & DATABASES',
    skills: ['FastAPI', 'Node.js', 'Express', 'PostgreSQL', 'MongoDB'],
  },
  {
    number: '03',
    label: 'FRONTEND',
    skills: ['React', 'Next.js', 'Tailwind CSS'],
  },
  {
    number: '04',
    label: 'DATA & AI',
    skills: ['Pandas', 'NumPy', 'Scikit-learn', 'Machine Learning'],
  },
  {
    number: '05',
    label: 'TOOLS',
    skills: ['Git', 'GitHub', 'Docker', 'Typer', 'Rich', 'pytest'],
  },
];

export const ManifestoSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  
  // Scroll-based reveal from darkness
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start start']
  });
  
  const imageOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);
  const imageY = useTransform(scrollYProgress, [0, 1], [60, 0]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

  const headingVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pb-24 sm:pb-32 md:pb-40"
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
        
        {/* Mobile: Reduce background opacity for better text readability */}
        <div 
          className="absolute inset-0 sm:hidden pointer-events-none bg-black/60"
          style={{ zIndex: 1 }}
        />
      </motion.div>

      {/* Content - positioned in right panel (desktop) or upper panel (mobile) */}
      <motion.div
        ref={contentRef}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 py-8 sm:py-12 md:py-0"
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={containerVariants}
      >
        <div className="flex flex-col md:flex-row md:items-start md:justify-end">
          {/* Desktop: Right side (55-58% width), Mobile: Full width positioned in upper panel */}
          <div className="w-full md:w-[58%] lg:w-[56%] md:pl-8 lg:pl-12">
            
            {/* Eyebrow */}
            <motion.div
              variants={itemVariants}
              className="mb-3 sm:mb-4 md:mb-6 lg:mb-8"
            >
              <p 
                className="text-[10px] xs:text-xs sm:text-sm text-muted-foreground uppercase tracking-[0.2em] font-mono"
                style={{ letterSpacing: '0.2em' }}
              >
                02 // WHAT I WORK WITH
              </p>
            </motion.div>

            {/* Main Heading */}
            <motion.h2
              variants={headingVariants}
              className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tight mb-6 sm:mb-8 md:mb-12 lg:mb-16"
              style={{ 
                color: '#F0F0F0',
                fontWeight: 300,
              }}
            >
              Technical Stack
            </motion.h2>

            {/* Skill Categories */}
            <div className="space-y-4 xs:space-y-5 sm:space-y-6 md:space-y-8 lg:space-y-10">
              {skillCategories.map((category, categoryIndex) => (
                <motion.div
                  key={category.number}
                  variants={itemVariants}
                  className="group"
                >
                  {/* Category Label */}
                  <div className="flex items-baseline gap-2 xs:gap-2.5 sm:gap-3 mb-2 xs:mb-2.5 sm:mb-3 md:mb-4">
                    <span 
                      className="text-sm xs:text-base sm:text-lg md:text-xl font-mono text-muted-foreground flex-shrink-0"
                      style={{ color: '#888888' }}
                    >
                      {category.number}
                    </span>
                    <span 
                      className="text-[10px] xs:text-xs sm:text-sm uppercase tracking-[0.12em] xs:tracking-[0.15em] text-muted-foreground"
                      style={{ 
                        color: '#888888',
                        letterSpacing: '0.15em',
                      }}
                    >
                      {category.label}
                    </span>
                  </div>

                  {/* Skill Pills */}
                  <div className="flex flex-wrap gap-1.5 xs:gap-2 sm:gap-2.5 md:gap-3">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                        transition={{
                          duration: 0.4,
                          delay: 0.5 + categoryIndex * 0.1 + skillIndex * 0.05,
                          ease: [0.25, 0.1, 0.25, 1] as const,
                        }}
                        whileHover={{
                          scale: 1.05,
                          borderColor: '#F0F0F0',
                          color: '#F0F0F0',
                          transition: { duration: 0.2 },
                        }}
                        className="px-2.5 xs:px-3 sm:px-3.5 md:px-4 py-1 xs:py-1.5 sm:py-2 text-[10px] xs:text-xs sm:text-sm border rounded-full cursor-default transition-colors duration-200"
                        style={{
                          borderColor: '#2a2a2a',
                          backgroundColor: 'rgba(18, 18, 18, 0.4)',
                          color: '#b0b0b0',
                          fontWeight: 400,
                        }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom transition gradient into Quote section - reduced to prevent covering content */}
      <div
        className="absolute bottom-0 left-0 w-full h-24 xs:h-28 sm:h-32 md:h-36 pointer-events-none z-10"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(8,8,8,0.3) 30%, rgba(8,8,8,0.7) 70%, #080808 100%)',
        }}
      />
    </section>
  );
};