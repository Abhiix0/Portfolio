import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Github, Linkedin, ArrowUpRight } from 'lucide-react';
import contactBg from '@/assets/contact.png';

const socialLinks = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/Abhiix0', type: 'github' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/abhiinavsaig', type: 'linkedin' },
  { icon: Mail, label: 'Email', href: 'mailto:abhinavsai039@gmail.com', type: 'email' },
];

export const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

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
      className="relative min-h-screen py-16 md:py-24 lg:py-32 flex items-center overflow-hidden"
    >
      {/* Moonlit Japanese shrine background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${contactBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Dark atmospheric overlay for content contrast */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(12,10,9,0.75) 0%, rgba(12,10,9,0.65) 50%, rgba(12,10,9,0.8) 100%)',
          }}
        />
      </div>

      {/* Subtle decorative frame */}
      <motion.div
        className="absolute inset-4 md:inset-6 pointer-events-none rounded-3xl"
        style={{ zIndex: 2 }}
        animate={{
          boxShadow: [
            'inset 0 0 40px rgba(196, 106, 70, 0.03), 0 0 20px rgba(190, 145, 120, 0.02)',
            'inset 0 0 60px rgba(196, 106, 70, 0.06), 0 0 30px rgba(190, 145, 120, 0.04)',
            'inset 0 0 40px rgba(196, 106, 70, 0.03), 0 0 20px rgba(190, 145, 120, 0.02)',
          ],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div 
          className="absolute inset-0 rounded-3xl" 
          style={{ 
            border: '1px solid rgba(190, 145, 120, 0.12)',
          }}
        />
      </motion.div>

      <div className="container px-4 md:px-8 lg:px-16 relative z-10 max-w-screen-xl mx-auto">
        {/* Main heading */}
        <motion.div
          className="max-w-3xl mx-auto text-center mb-12 md:mb-16 lg:mb-20"
          animate={{ 
            x: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : mousePos.x * 6, 
            y: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : mousePos.y * 4 
          }}
          transition={{ type: 'spring', stiffness: 100, damping: 30 }}
        >
          {/* Eyebrow with crimson accent */}
          <motion.div
            className="flex items-center justify-center gap-3 mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div 
              className="w-8 h-px" 
              style={{ 
                background: 'linear-gradient(to right, transparent, rgba(196, 106, 70, 0.4), transparent)',
              }}
            />
            <span
              className="text-xs tracking-[0.25em] uppercase font-medium"
              style={{ color: '#A49B93' }}
            >
              Get in Touch
            </span>
            <div 
              className="w-8 h-px" 
              style={{ 
                background: 'linear-gradient(to right, transparent, rgba(196, 106, 70, 0.4), transparent)',
              }}
            />
          </motion.div>

          <motion.h2
            className="text-3xl md:text-5xl lg:text-6xl font-light leading-[1.2]"
            style={{ color: '#E8E3DC' }}
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
              we should{' '}
              <span style={{ color: '#C46A46' }}>talk.</span>
            </motion.span>
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl mt-8 max-w-xl mx-auto leading-relaxed"
            style={{ color: '#A49B93' }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            I'm open to ideas, projects, or just a good conversation.
          </motion.p>
        </motion.div>

        {/* Social links */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 md:gap-5"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.75 }}
        >
          {socialLinks.map((link, index) => {
            const isEmail = link.type === 'email';
            
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
                  className="relative flex items-center gap-3 px-6 py-3.5 md:px-8 md:py-4 rounded-xl border overflow-hidden"
                  style={{
                    borderColor: 'rgba(190, 145, 120, 0.18)',
                    background: 'rgba(20, 15, 13, 0.55)',
                    backdropFilter: 'blur(12px)',
                  }}
                  whileHover={{ 
                    y: -2,
                    borderColor: isEmail ? 'rgba(196, 106, 70, 0.65)' : 'rgba(190, 145, 120, 0.45)',
                    background: isEmail ? 'rgba(196, 106, 70, 0.12)' : 'rgba(25, 20, 18, 0.65)',
                  }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                >
                  {/* Warm hover glow */}
                  <motion.div 
                    className="absolute inset-0 pointer-events-none rounded-xl"
                    style={{
                      background: isEmail 
                        ? 'radial-gradient(circle at center, rgba(196, 106, 70, 0.15) 0%, transparent 70%)'
                        : 'radial-gradient(circle at center, rgba(232, 227, 220, 0.04) 0%, transparent 70%)',
                      opacity: 0,
                    }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Bottom accent line */}
                  <motion.div 
                    className="absolute bottom-0 left-0 h-px"
                    style={{
                      background: isEmail 
                        ? 'linear-gradient(to right, transparent, rgba(196, 106, 70, 0.7), transparent)'
                        : 'linear-gradient(to right, transparent, rgba(190, 145, 120, 0.4), transparent)',
                      width: 0,
                    }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                  />

                  {/* Icon */}
                  <motion.div 
                    className="relative z-10"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <link.icon 
                      className="w-5 h-5 transition-all duration-250"
                      style={{
                        color: '#B8AEA5',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = isEmail ? '#C46A46' : '#E8E3DC';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#B8AEA5';
                      }}
                    />
                  </motion.div>

                  {/* Label */}
                  <span 
                    className="text-sm font-medium transition-all duration-250 relative z-10"
                    style={{ 
                      color: '#D8D0C8',
                      letterSpacing: '0.02em',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = isEmail ? '#C46A46' : '#E8E3DC';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#D8D0C8';
                    }}
                  >
                    {link.label}
                  </span>

                  {/* Arrow with directional movement */}
                  <motion.div 
                    className="relative z-10"
                    initial={{ x: 0, y: 0 }}
                    whileHover={{ 
                      x: 3, 
                      y: -3,
                    }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                  >
                    <ArrowUpRight 
                      className="w-4 h-4 transition-all duration-250"
                      style={{ color: '#A49B93' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = isEmail ? '#C46A46' : '#E8E3DC';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#A49B93';
                      }}
                    />
                  </motion.div>

                  {/* Email emphasis: subtle outer glow */}
                  {isEmail && (
                    <motion.div
                      className="absolute inset-0 rounded-xl pointer-events-none"
                      style={{
                        boxShadow: '0 0 0 0 rgba(196, 106, 70, 0)',
                      }}
                      whileHover={{
                        boxShadow: '0 0 24px 3px rgba(196, 106, 70, 0.18)',
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
        animate={isInView ? { opacity: 0.35 } : {}}
        transition={{ duration: 1.2, delay: 1.5, ease: 'easeOut' }}
      >
        <p 
          className="text-sm tracking-[0.2em] uppercase font-light" 
          style={{ color: '#8A8179' }}
        >
          ASG — {new Date().getFullYear()}
        </p>
      </motion.footer>
    </section>
  );
};