import { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Github, Linkedin, ArrowUpRight } from 'lucide-react';

const socialLinks = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/Abhiix0', type: 'github' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/abhiinavsaig', type: 'linkedin' },
  { icon: Mail, label: 'Email', href: 'mailto:abhinavsai039@gmail.com', type: 'email' },
];

export const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  // Floating ember particles - warm autumn atmosphere
  const emberParticles = useMemo(() => Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: 100 + Math.random() * 20,
    size: Math.random() * 2.5 + 1,
    duration: Math.random() * 15 + 20,
    delay: Math.random() * -20,
    drift: (Math.random() - 0.5) * 40,
    opacity: Math.random() * 0.3 + 0.15,
  })), []);

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
    
    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-16 md:py-24 lg:py-32 flex items-center section-ambient"
    >
      {/* Ambient lighting - subtle orange glow behind content */}
      <motion.div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 0 }}
      >
        {/* Central ambient glow - warm and diffused */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: '60%',
            height: '60%',
            background: 'radial-gradient(ellipse at center, hsl(18 60% 45% / 0.08) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.6, 0.85, 0.6],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Secondary ambient layer */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 70% 60% at ${50 + mousePos.x * 20}% ${50 + mousePos.y * 20}%, hsl(0 0% 10% / 0.4) 0%, transparent 65%)`,
          }}
          animate={{
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
      </motion.div>

      {/* Floating ember particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
        {emberParticles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              bottom: '-5%',
              width: particle.size,
              height: particle.size,
              background: `radial-gradient(circle, hsl(18 70% 55% / ${particle.opacity}) 0%, hsl(18 80% 50% / 0) 70%)`,
              boxShadow: `0 0 ${particle.size * 4}px hsl(18 70% 55% / ${particle.opacity * 0.6})`,
            }}
            animate={{
              y: [0, -window.innerHeight - 100],
              x: [0, particle.drift],
              opacity: [0, particle.opacity, particle.opacity, 0],
              scale: [0.5, 1, 1, 0.8],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: 'linear',
              opacity: {
                times: [0, 0.1, 0.85, 1],
                duration: particle.duration,
              },
            }}
          />
        ))}
      </div>

      {/* Orbital light motif - subtle circular element */}
      <motion.div
        className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ 
          width: '500px', 
          height: '500px',
          zIndex: 1,
        }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 2, delay: 1 }}
      >
        {/* Circular orbit path */}
        <svg
          className="absolute inset-0 w-full h-full"
          style={{ transform: 'rotate(-90deg)' }}
        >
          <motion.circle
            cx="250"
            cy="250"
            r="240"
            fill="none"
            stroke="hsl(0 0% 100% / 0.03)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 3, delay: 1.5, ease: 'easeOut' }}
          />
        </svg>

        {/* Traveling light point */}
        <motion.div
          className="absolute left-1/2 top-1/2"
          style={{
            width: '8px',
            height: '8px',
            marginLeft: '-4px',
            marginTop: '-4px',
          }}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <div
            className="absolute"
            style={{
              width: '8px',
              height: '8px',
              top: '-240px',
              background: 'radial-gradient(circle, hsl(18 70% 60% / 0.8) 0%, transparent 70%)',
              borderRadius: '50%',
              boxShadow: '0 0 12px 2px hsl(18 70% 60% / 0.4)',
            }}
          />
        </motion.div>
      </motion.div>

      {/* ── Always-visible glowing frame ── */}
      <motion.div
        className="absolute inset-4 pointer-events-none rounded-3xl"
        style={{ zIndex: 2 }}
        animate={{
          boxShadow: [
            'inset 0 0 40px hsl(0 0% 30% / 0.08), 0 0 20px hsl(0 0% 30% / 0.06)',
            'inset 0 0 80px hsl(0 0% 40% / 0.18), 0 0 40px hsl(0 0% 40% / 0.12)',
            'inset 0 0 40px hsl(0 0% 30% / 0.08), 0 0 20px hsl(0 0% 30% / 0.06)',
          ],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Border */}
        <div className="absolute inset-0 rounded-3xl border border-foreground/15" />
      </motion.div>

      {/* Animated border lines */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
        <motion.div
          className="hidden md:block absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-border/50 to-transparent"
          animate={{ opacity: [0.15, 0.4, 0.15] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="hidden md:block absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-border/30 to-transparent"
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        />
      </div>

      <div className="container px-4 md:px-8 lg:px-16 relative z-10 max-w-screen-xl mx-auto">
        {/* Main heading */}
        <motion.div
          className="max-w-3xl mx-auto text-center mb-12 md:mb-16 lg:mb-20"
          animate={{ 
            x: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : mousePos.x * 8, 
            y: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : mousePos.y * 5 
          }}
          transition={{ type: 'spring', stiffness: 100, damping: 30 }}
        >
          <motion.span
            className="text-sm tracking-widest uppercase text-muted-foreground block mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Get in Touch
          </motion.span>

          <motion.h2
            className="text-3xl md:text-5xl lg:text-6xl font-light leading-[1.2]"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
          >
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              If this made sense to you,
            </motion.span>
            <motion.span
              className="block mt-2"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              we should talk.
            </motion.span>
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-muted-foreground mt-8 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            I'm open to ideas, projects, or just a good conversation.
          </motion.p>
        </motion.div>

        {/* Social links */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 md:gap-6"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.75 }}
        >
          {socialLinks.map((link, index) => {
            const isEmail = link.type === 'email';
            const isGithub = link.type === 'github';
            
            return (
              <motion.a
                key={link.label}
                href={link.href}
                className="group relative"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.85 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                data-magnetic
              >
                <motion.div
                  className="relative flex items-center gap-3 px-5 py-3 md:px-7 md:py-4 rounded-2xl border overflow-hidden"
                  style={{
                    borderColor: 'hsl(0 0% 100% / 0.08)',
                    background: 'rgba(16, 16, 16, 0.4)',
                    backdropFilter: 'blur(8px)',
                  }}
                  whileHover={{ 
                    scale: 1.03,
                    borderColor: isEmail ? 'hsl(18 70% 55% / 0.35)' : 'hsl(0 0% 100% / 0.18)',
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  {/* Hover gradient overlay */}
                  <motion.div 
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: isEmail 
                        ? 'radial-gradient(circle at center, hsl(18 70% 55% / 0.08) 0%, transparent 70%)'
                        : 'radial-gradient(circle at center, hsl(0 0% 100% / 0.03) 0%, transparent 70%)',
                      opacity: 0,
                    }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Bottom accent line */}
                  <motion.div 
                    className="absolute bottom-0 left-0 h-px"
                    style={{
                      background: isEmail ? 'hsl(18 70% 55% / 0.5)' : 'hsl(0 0% 100% / 0.3)',
                      width: 0,
                    }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  />

                  {/* Icon with interaction */}
                  <motion.div 
                    className="relative z-10"
                    animate={{ 
                      x: 0,
                      rotate: 0,
                    }}
                    whileHover={{ 
                      x: isGithub ? 3 : 0,
                      rotate: isGithub ? 0 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <link.icon 
                      className="w-5 h-5 transition-colors duration-300"
                      style={{
                        color: 'hsl(0 0% 60%)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = isEmail ? 'hsl(18 70% 60%)' : 'hsl(0 0% 96%)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'hsl(0 0% 60%)';
                      }}
                    />
                  </motion.div>

                  {/* Label */}
                  <span 
                    className="text-sm font-medium transition-colors duration-300 relative z-10"
                    style={{ color: 'hsl(0 0% 60%)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = isEmail ? 'hsl(18 70% 60%)' : 'hsl(0 0% 96%)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'hsl(0 0% 60%)';
                    }}
                  >
                    {link.label}
                  </span>

                  {/* Arrow with directional movement */}
                  <motion.div 
                    className="relative z-10"
                    initial={{ x: 0, y: 0 }}
                    whileHover={{ 
                      x: 4, 
                      y: -4,
                    }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                  >
                    <ArrowUpRight 
                      className="w-4 h-4 transition-colors duration-300"
                      style={{ color: 'hsl(0 0% 55%)' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = isEmail ? 'hsl(18 70% 60%)' : 'hsl(0 0% 96%)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'hsl(0 0% 55%)';
                      }}
                    />
                  </motion.div>

                  {/* Subtle glow for email button */}
                  {isEmail && (
                    <motion.div
                      className="absolute inset-0 rounded-2xl pointer-events-none"
                      style={{
                        boxShadow: '0 0 0 0 hsl(18 70% 55% / 0)',
                      }}
                      whileHover={{
                        boxShadow: '0 0 20px 2px hsl(18 70% 55% / 0.15)',
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.div>
              </motion.a>
            );
          })}
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        className="absolute bottom-8 left-0 w-full text-center"
        style={{ zIndex: 10 }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.3 } : {}}
        transition={{ duration: 1.2, delay: 1.5, ease: 'easeOut' }}
      >
        <p className="text-sm tracking-widest uppercase" style={{ color: 'hsl(0 0% 55%)' }}>
          ASG — {new Date().getFullYear()}
        </p>
      </motion.footer>
    </section>
  );
};