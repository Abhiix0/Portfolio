import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ProjectCard } from './ProjectCard';

const projects = [
  {
    id: 1,
    title: 'AI Data Analyst',
    description: 'Built a multi-agent analysis pipeline that turns raw data into structured insight — no code required.',
    longDescription:
      'Designed and built a multi-agent data analysis tool using Python and Streamlit. Drop in any CSV or Excel file and the system handles everything — automated profiling, interactive visualizations, and LLM-generated insights via Groq API. A free-form chat interface lets you ask questions about your data directly. Built on a strict pipeline architecture: each agent owns exactly one responsibility — profiling, visualization, insight generation, recommendations, and report assembly. Includes Kaggle API integration for fetching public datasets and a rule-based fallback when the LLM is unavailable. The goal was simple: make data accessible to anyone, not just people who can write code.',
    tags: ['Python', 'Streamlit', 'Multi-Agent', 'LLM', 'Groq', 'Pandas'],
    github: 'https://github.com/Abhiix0/AI-Data-Analyst',
  },
  {
    id: 2,
    title: 'Data Insight Lab',
    description: 'Designed Power BI dashboards that surface patterns in real-world data — built for clarity, not decoration.',
    longDescription:
      'A series of Power BI dashboards built on real, messy datasets — Tech Layoffs (workforce reduction patterns across companies, industries, and time), Streaming Content Analysis (genre trends, production countries, runtime shifts, and content growth), and Airline Flight Delay Analysis (delay patterns, airport congestion, and operational bottlenecks). Each dashboard starts from a question a real person would ask, not from the data itself. Built with Power Query for transformation, DAX for calculated measures, and deliberate visual design to surface what matters. The measure of success: a non-technical stakeholder should be able to act on it without an explanation.',
    tags: ['Power BI', 'DAX', 'Power Query', 'Data Visualization', 'Analytics'],
    github: 'https://github.com/Abhiix0/data-insight-lab',
  },
];

export const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView   = useInView(sectionRef, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to('.projects-header', {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end:   'bottom top',
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
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 left-0 w-[500px] h-[500px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, hsl(0 0% 8% / 0.5) 0%, transparent 70%)' }}
          animate={{ x: [0, -30, 0], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>

      <div className="container px-4 md:px-8 lg:px-16 relative z-10 max-w-screen-xl mx-auto">
        {/* Section header */}
        <div className="projects-header mb-10 md:mb-16 lg:mb-20">
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
            Things I've built — data pipelines, AI tools, dashboards that turn noise into decisions.
          </motion.p>
        </div>

        {/* 2-card grid — centered on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 lg:max-w-4xl lg:mx-auto">
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