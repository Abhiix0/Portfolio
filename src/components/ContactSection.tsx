import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Github, Twitter, Linkedin, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { icon: Github, label: "GitHub", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Mail, label: "Email", href: "mailto:hello@example.com" },
];

export const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isNearEdge, setIsNearEdge] = useState(false);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePos({ x, y });

        // Check if near edges for easter egg
        const edgeThreshold = 0.08;
        setIsNearEdge(
          Math.abs(x) > 0.5 - edgeThreshold ||
          Math.abs(y) > 0.5 - edgeThreshold
        );
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Generate chrono glow particles
  const chronoParticles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 6 + 4,
  }));

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-32 flex items-center overflow-hidden section-ambient"
    >
      {/* Interactive parallax background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          x: mousePos.x * -30,
          y: mousePos.y * -30,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 30 }}
      >
        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 80% 80% at ${50 + mousePos.x * 30}% ${50 + mousePos.y * 30}%, hsl(0 0% 12% / 0.6) 0%, transparent 60%)`,
          }}
        />

        {/* Chrono glow particles */}
        {chronoParticles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
              background: `hsl(0 0% ${50 + Math.random() * 30}% / 0.3)`,
              boxShadow: `0 0 ${particle.size * 3}px hsl(0 0% 60% / 0.2)`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: particle.id * 0.3,
            }}
          />
        ))}
      </motion.div>

      {/* Edge easter egg - glowing lines when cursor near edges */}
      <motion.div
        className="absolute inset-4 pointer-events-none rounded-3xl"
        animate={{
          opacity: isNearEdge ? 1 : 0,
          boxShadow: isNearEdge
            ? 'inset 0 0 60px hsl(0 0% 30% / 0.2), 0 0 30px hsl(0 0% 30% / 0.1)'
            : 'none',
        }}
        transition={{ duration: 0.4 }}
      >
        <div className="absolute inset-0 rounded-3xl border border-foreground/10" />
      </motion.div>

      {/* Animated border lines */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-border/50 to-transparent"
          animate={{ opacity: [0.15, 0.4, 0.15] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-border/30 to-transparent"
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        />
      </div>

      <div className="container px-8 md:px-16 relative z-10">
        {/* Main heading with interactive parallax */}
        <motion.div
          className="max-w-4xl mx-auto text-center mb-20"
          animate={{
            x: mousePos.x * 15,
            y: mousePos.y * 10,
          }}
          transition={{ type: "spring", stiffness: 100, damping: 30 }}
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
            className="text-4xl md:text-6xl lg:text-7xl font-light leading-tight"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
          >
            <motion.span
              className="inline-block"
              initial={{ opacity: 0, x: -60 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              Let's create
            </motion.span>{" "}
            <motion.span
              className="inline-block text-gradient"
              initial={{ opacity: 0, x: 60 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              something
            </motion.span>
            <br />
            <motion.span
              className="inline-block"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              extraordinary together.
            </motion.span>
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-muted-foreground mt-8 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </motion.p>
        </motion.div>

        {/* Social links with enhanced interactions */}
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
                className="relative flex items-center gap-3 px-6 py-4 rounded-2xl border border-border/40 bg-card/20 backdrop-blur-sm overflow-hidden"
                whileHover={{
                  scale: 1.05,
                  borderColor: 'hsl(0 0% 40%)',
                  boxShadow: '0 0 40px hsl(0 0% 30% / 0.2)',
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                {/* Hover glow */}
                <motion.div
                  className="absolute inset-0 bg-gradient-radial from-foreground/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                />

                {/* Underline grow animation */}
                <motion.div
                  className="absolute bottom-0 left-0 h-px bg-foreground/50"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />

                <motion.div
                  className="relative z-10"
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                >
                  <link.icon className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                </motion.div>
                <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors relative z-10">
                  {link.label}
                </span>
                <motion.div
                  className="relative z-10"
                  initial={{ x: 0, y: 0, opacity: 0.5 }}
                  whileHover={{ x: 4, y: -4, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </motion.div>
              </motion.div>
            </motion.a>
          ))}
        </motion.div>

        {/* Email CTA with glow pulse */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.a
            href="mailto:hello@example.com"
            className="inline-block group relative"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              className="relative px-10 py-5 rounded-full border-2 border-border overflow-hidden"
              animate={{
                boxShadow: [
                  '0 0 20px hsl(0 0% 25% / 0.15)',
                  '0 0 40px hsl(0 0% 35% / 0.25)',
                  '0 0 20px hsl(0 0% 25% / 0.15)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Fill animation on hover */}
              <motion.div
                className="absolute inset-0 bg-foreground"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{ originX: 0 }}
              />
              <span className="relative z-10 text-lg font-medium text-foreground group-hover:text-background transition-colors duration-300">
                hello@example.com
              </span>
            </motion.div>
          </motion.a>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        className="absolute bottom-8 left-0 w-full text-center"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <p className="text-sm text-muted-foreground/40">
          © {new Date().getFullYear()} — Designed & Built with ♥
        </p>
      </motion.footer>
    </section>
  );
};
