import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HeroSection } from '@/components/HeroSection';
import { ManifestoSection } from '@/components/ManifestoSection';
import { QuoteSection } from '@/components/QuoteSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { ContactSection } from '@/components/ContactSection';
import { CustomCursor } from '@/components/CustomCursor';

const Index = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      setIsModalOpen((e as CustomEvent).detail.open);
    };
    window.addEventListener('modalStateChange', handler);
    return () => window.removeEventListener('modalStateChange', handler);
  }, []);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';

    const ctx = gsap.context(() => {
      // Defer refresh so child component effects have already registered their triggers
      requestAnimationFrame(() => ScrollTrigger.refresh());

      // Section transition effects
      const sections = document.querySelectorAll('section');
      sections.forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0.8 },
          {
            opacity: 1,
            duration: 0.5,
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              end: 'top 20%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, mainRef);

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
      ctx.revert(); // Only kills triggers created inside this context
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        ref={mainRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="relative overflow-x-hidden"
      >
        <CustomCursor />

        {/* Navigation */}
        <motion.nav
          className={`fixed top-0 left-0 w-full z-40 p-6 md:p-8 flex justify-between items-center mix-blend-difference transition-all duration-200 ${isModalOpen ? 'pointer-events-none opacity-0' : ''}`}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.a
            href="#"
            className="text-lg font-medium text-foreground tracking-tight"
            whileHover={{ scale: 1.05 }}
            data-magnetic
          >
            ASG
          </motion.a>

          <div className="hidden sm:flex items-center gap-6 md:gap-8">
            {[
              { label: 'About', href: '#about' },
              { label: 'Work', href: '#projects' },
              { label: 'Contact', href: '#contact' },
            ].map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                className="relative text-sm text-foreground/70 hover:text-foreground transition-colors group"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                {item.label}
                <motion.span
                  className="absolute -bottom-1 left-0 h-px bg-foreground"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </div>
        </motion.nav>

        {/* Main sections */}
        <main>
          <HeroSection />
          <div id="about">
            <ManifestoSection />
          </div>
          <QuoteSection />
          <div id="projects">
            <ProjectsSection />
          </div>
          <div id="contact">
            <ContactSection />
          </div>
        </main>

        {/* Ambient noise overlay for texture */}
        <div
          className="noise-overlay fixed inset-0 pointer-events-none z-[100] opacity-[0.012]"
        />

        {/* Scroll progress indicator */}
        <motion.div
          className={`fixed bottom-8 right-8 z-50 hidden md:block transition-all duration-200 ${isModalOpen ? 'pointer-events-none opacity-0' : ''}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <div className="w-px h-24 bg-border/30 relative overflow-hidden rounded-full">
            <motion.div
              className="absolute top-0 left-0 w-full bg-foreground/60"
              style={{
                height: '100%',
                scaleY: scrollYProgress,
                transformOrigin: 'top',
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Index;
