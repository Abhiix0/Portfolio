import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import profileImage from '@/assets/profile-portrait.png';

const RIPPLE_COUNT = 3;
const RIPPLE_DURATION = 4;

const techStack = [
  {
    category: 'LANGUAGES',
    technologies: ['Python', 'JavaScript', 'TypeScript', 'SQL'],
  },
  {
    category: 'BACKEND & DATABASES',
    technologies: ['FastAPI', 'Node.js', 'Express', 'PostgreSQL', 'MongoDB'],
  },
  {
    category: 'FRONTEND',
    technologies: ['React', 'Next.js', 'Tailwind CSS'],
  },
  {
    category: 'DATA & AI',
    technologies: ['Pandas', 'NumPy', 'Scikit-learn', 'Machine Learning'],
  },
  {
    category: 'TOOLS',
    technologies: ['Git', 'GitHub', 'Docker', 'Typer', 'Rich', 'pytest'],
  },
];

export const ManifestoSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const [isHoveringProfile, setIsHoveringProfile] = useState(false);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-24 md:py-32 lg:py-40 flex items-center overflow-hidden"
      style={{ background: '#080808' }}
    >
      {/* Subtle background ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, hsl(0 0% 10% / 0.3) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="container max-w-7xl mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: Avatar with Orbital Rings (40% - 2 columns) */}
          <motion.div
            ref={profileRef}
            className="lg:col-span-2 relative flex justify-center lg:justify-start"
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96">
              
              {/* Warm ambient glow behind avatar */}
              <motion.div
                className="absolute inset-0 rounded-full blur-3xl pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(198,93,37,0.08) 0%, rgba(229,138,67,0.04) 40%, transparent 70%)',
                }}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.4, 0.6, 0.4],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Profile container with ripples */}
              <div
                className="relative w-full h-full"
                onMouseEnter={() => setIsHoveringProfile(true)}
                onMouseLeave={() => setIsHoveringProfile(false)}
              >
                {/* Simplified orbital ripple rings */}
                {Array.from({ length: RIPPLE_COUNT }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}
                    initial={{ scale: 1, opacity: 0 }}
                    animate={{
                      scale: [1, 1.8, 1],
                      opacity: [0, 0.4, 0],
                    }}
                    transition={{
                      duration: RIPPLE_DURATION,
                      repeat: Infinity,
                      delay: (RIPPLE_DURATION / RIPPLE_COUNT) * i,
                      ease: 'easeInOut',
                    }}
                  />
                ))}

                {/* Profile image */}
                <motion.div
                  className="relative w-full h-full rounded-full overflow-hidden"
                  style={{
                    border: '1px solid rgba(255,255,255,0.08)',
                    boxShadow: '0 0 40px rgba(0,0,0,0.5), inset 0 0 20px rgba(0,0,0,0.3)',
                  }}
                  animate={{
                    scale: isHoveringProfile ? 1.03 : 1,
                    borderColor: isHoveringProfile ? 'rgba(229,138,67,0.15)' : 'rgba(255,255,255,0.08)',
                  }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  data-hover
                >
                  {/* Vignette overlay */}
                  <motion.div
                    className="absolute inset-0 z-10 pointer-events-none"
                    style={{
                      background: 'radial-gradient(circle, transparent 35%, rgba(8,8,8,0.7) 100%)',
                    }}
                    animate={{ opacity: isHoveringProfile ? 0.4 : 0.7 }}
                    transition={{ duration: 0.5 }}
                  />

                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover grayscale"
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Technical Stack (60% - 3 columns) */}
          <div className="lg:col-span-3 space-y-8 lg:space-y-10">
            
            {/* Eyebrow */}
            <motion.span
              className="text-xs md:text-sm tracking-[0.2em] uppercase block"
              style={{ color: '#858585' }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              What I Work With
            </motion.span>

            {/* Main heading */}
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-light"
              style={{ color: '#EEEEEE' }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.3 }}
            >
              Technical Stack
            </motion.h2>

            {/* Tech categories */}
            <div className="space-y-8 md:space-y-10 pt-4">
              {techStack.map((stack, stackIndex) => (
                <motion.div
                  key={stack.category}
                  className="space-y-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.5 + stackIndex * 0.1 }}
                >
                  {/* Category label */}
                  <h3
                    className="text-xs tracking-[0.15em] uppercase font-medium"
                    style={{ color: '#555555' }}
                  >
                    {stack.category}
                  </h3>

                  {/* Technologies */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    {stack.technologies.map((tech, techIndex) => (
                      <motion.span
                        key={tech}
                        className="text-base md:text-lg font-light transition-colors duration-300 cursor-default"
                        style={{ color: '#EEEEEE' }}
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.6 + stackIndex * 0.1 + techIndex * 0.03 }}
                        whileHover={{
                          color: '#E58A43',
                          scale: 1.05,
                        }}
                      >
                        {tech}
                        {techIndex < stack.technologies.length - 1 && (
                          <span
                            className="ml-4 text-xs"
                            style={{ color: '#555555' }}
                          >
                            ·
                          </span>
                        )}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom transition gradient into Autumn Walk */}
      <div
        className="absolute bottom-0 left-0 w-full h-48 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(8,8,8,0.5) 50%, #080808 100%)',
        }}
      />

      {/* Subtle atmospheric glow for transition */}
      <div
        className="absolute bottom-0 left-0 w-full h-40 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(198,93,37,0.02) 0%, transparent 70%)',
        }}
      />
    </section>
  );
};