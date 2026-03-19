import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ProjectCard } from './ProjectCard';

const projects = [
  {
    id: 1,
    title: "Ethereal Canvas",
    description: "An interactive art experience that responds to sound and movement.",
    longDescription: "A groundbreaking web experience that transforms audio input into stunning visual art. Built with WebGL and the Web Audio API, this project explores the intersection of music and visual design, creating unique artworks that evolve in real-time.",
    tags: ["WebGL", "Audio API", "Creative Coding"],
    link: "#",
    github: "#",
  },
  {
    id: 2,
    title: "Mindflow",
    description: "A meditation app with adaptive ambient soundscapes.",
    longDescription: "Mindflow combines AI-generated ambient music with guided breathing exercises. The app learns from user sessions to create personalized soundscapes that evolve throughout the meditation, helping users achieve deeper states of relaxation.",
    tags: ["React Native", "AI/ML", "Audio"],
    link: "#",
    github: "#",
  },
  {
    id: 3,
    title: "Chronicle",
    description: "A minimal journaling platform with beautiful typography.",
    longDescription: "Chronicle reimagines digital journaling with a focus on typography and distraction-free writing. Features include mood tracking, encrypted storage, and beautiful PDF exports. The interface adapts to the time of day with subtle theme changes.",
    tags: ["Next.js", "Typography", "Privacy"],
    link: "#",
  },
  {
    id: 4,
    title: "Pulse",
    description: "Real-time collaboration tools for creative teams.",
    longDescription: "A suite of tools designed for creative agencies and design teams. Pulse includes real-time whiteboarding, asset management, and client feedback systems. Built for speed and seamless collaboration across distributed teams.",
    tags: ["WebSockets", "Canvas API", "Collaboration"],
    link: "#",
    github: "#",
  },
];

export const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax effect on scroll
      gsap.to('.projects-header', {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-16 md:py-24 lg:py-32 section-ambient"
    >
      {/* Background ambient elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/3 right-0 w-[600px] h-[600px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, hsl(0 0% 10% / 0.4) 0%, transparent 70%)' }}
          animate={{ x: [0, 50, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 left-0 w-[500px] h-[500px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, hsl(0 0% 8% / 0.5) 0%, transparent 70%)' }}
          animate={{ x: [0, -30, 0], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      <div className="container px-4 md:px-8 lg:px-16 relative z-10">
        {/* Section header */}
        <div ref={headerRef} className="projects-header mb-10 md:mb-16 lg:mb-20">
          <motion.span
            className="text-sm tracking-widest uppercase text-muted-foreground block"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Selected Works
          </motion.span>
          <motion.h2
            className="text-4xl md:text-6xl lg:text-7xl font-light mt-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-gradient">Projects</span>
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground mt-4 max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            A curated selection of work that represents my passion for craft and attention to detail.
          </motion.p>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};
