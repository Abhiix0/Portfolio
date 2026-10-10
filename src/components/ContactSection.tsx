import { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Github, Linkedin, ArrowUpRight } from 'lucide-react';

const socialLinks = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/Abhiix0' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/abhiinavsaig' },
  { icon: Mail, label: 'Email', href: 'mailto:abhinavsai039@gmail.com' },
];

export const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const chronoParticles = useMemo(() => Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 6 + 4,
    color: `hsl(0 0% ${50 + Math.random() * 30}% / 0.3)`,
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
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-16 md:py-24 lg:py-32 flex items-center section-ambient"
    >
      {/* Interactive parallax background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ x: mousePos.x * -30, y: mousePos.y * -30 }}
        transition={{ type: 'spring', stiffness: 50, damping: 30 }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 80% 80% at ${50 + mousePos.x * 30}% ${50 + mousePos.y * 30}%, hsl(0 0% 12% / 0.6) 0%, transparent 60%)`,
          }}
        />
        {chronoParticles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
              background: particle.color,
              boxShadow: `0 0 ${particle.size * 3}px hsl(0 0% 60% / 0.2)`,
            }}
            animate={{ y: [0, -30, 0], opacity: [0.2, 0.6, 0.2], scale: [1, 1.2, 1] }}
            transition={{ duration: particle.duration, repeat: Infinity, ease: 'easeInOut', delay: particle.id * 0.3 }}
          />
        ))}
      </motion.div>

      {/* ── Always-visible glowing frame ── */}
      <motion.div
        className="absolute inset-4 pointer-events-none rounded-3xl"
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
        {/* Border only - no corner accents */}
      </motion.div>

      {/* Animated border lines */}
      <div className="absolute inset-0 pointer-events-none">
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
          animate={{ x: mousePos.x * 15, y: mousePos.y * 10 }}
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
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              If this made sense to you,
            </motion.span>
            <motion.span
              className="block mt-2"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              we should talk.
            </motion.span>
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-muted-foreground mt-8 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
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
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.label}
              href={link.href}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              data-magnetic
            >
              <motion.div
                className="relative flex items-center gap-3 px-4 py-3 md:px-6 md:py-4 rounded-2xl border border-border/40 bg-card/20 backdrop-blur-sm overflow-hidden"
                whileHover={{ scale: 1.05, borderColor: 'hsl(0 0% 40%)', boxShadow: '0 0 40px hsl(0 0% 30% / 0.2)' }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                <motion.div className="absolute inset-0 bg-gradient-radial from-foreground/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                <motion.div className="absolute bottom-0 left-0 h-px bg-foreground/50" initial={{ width: 0 }} whileHover={{ width: '100%' }} transition={{ duration: 0.3 }} />
                <motion.div className="relative z-10" whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
                  <link.icon className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                </motion.div>
                <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors relative z-10">
                  {link.label}
                </span>
                <motion.div className="relative z-10" initial={{ x: 0, y: 0, opacity: 0.5 }} whileHover={{ x: 4, y: -4, opacity: 1 }} transition={{ duration: 0.2 }}>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </motion.div>
              </motion.div>
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        className="absolute bottom-8 left-0 w-full text-center"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <p className="text-sm text-muted-foreground/30 tracking-widest uppercase">
          ASG — {new Date().getFullYear()}
        </p>
      </motion.footer>
    </section>
  );
};