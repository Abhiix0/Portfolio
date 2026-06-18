import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ProjectCard } from './ProjectCard';

const projects = [
  {
    id: 1,
    title: 'Spawn',
    description: 'A developer CLI that eliminates repetitive Python project setup and creates production-ready environments in seconds.',
    longDescription:
      'Spawn is a local command-line tool that transforms a single command into a fully structured Python development environment. It automates project scaffolding, Git initialization, virtual environment creation, GitHub publishing, and template generation for common workflows like FastAPI, Data Science, and Machine Learning.\n\nBuilt with Python, Typer, and Rich, Spawn focuses on developer experience through interactive prompts, clear terminal interfaces, and automated setup flows. It also includes a project auditing system called `spawn doctor`, which analyzes repository health and scores projects across documentation, testing, deployment, and configuration best practices.',
    tags: ['Python', 'CLI Development', 'Typer', 'Rich', 'Developer Tools', 'Automation'],
    github: 'https://github.com/Abhiix0/Spawn',
  },
  {
    id: 2,
    title: 'Placement Intelligence System (PIS)',
    description: 'An ML-powered platform that evaluates placement readiness using real coding activity, GitHub signals, and predictive analytics.',
    longDescription:
      'PIS is a full-stack analytics platform that measures student placement readiness through a combination of SQL feature engineering, machine learning, and explainable insights. The system ingests coding activity, GitHub contribution data, academic performance, and behavioral metrics to generate readiness scores and personalized recommendations.\n\nThe architecture separates concerns across PostgreSQL, FastAPI, and Streamlit, with all feature computation performed directly inside SQL through optimized multi-CTE pipelines. A hybrid insight engine combines Random Forest feature importance with rule-based reasoning to produce recommendations that are both interpretable and data-driven.',
    tags: ['Python', 'PostgreSQL', 'Machine Learning', 'FastAPI', 'Streamlit', 'Data Engineering'],
    github: 'https://github.com/Abhiix0/PIS',
  },
  {
    id: 3,
    title: 'AI Data Analyst',
    description: 'A multi-agent analytics system that turns raw datasets into insights, visualizations, and AI-generated reports.',
    longDescription:
      'AI Data Analyst is an agent-based analytics platform designed to automate the data analysis workflow. Users can upload datasets and receive intelligent summaries, exploratory analysis, statistical insights, and visual interpretations generated through coordinated AI agents.\n\nThe project orchestrates specialized agents responsible for data understanding, analysis, reasoning, and reporting, creating a workflow that mirrors how a human analyst approaches a problem. The focus is on reducing manual analysis effort while making data exploration faster, more accessible, and more actionable.',
    tags: ['Python', 'Streamlit', 'Multi-Agent Systems', 'Data Analytics', 'AI Workflows', 'LLMs'],
    github: 'https://github.com/Abhiix0/AI-Data-Analyst',
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
            Things I've built — CLI tools, ML platforms, and AI systems that turn complex problems into working software.
          </motion.p>
        </div>

        {/* 3-card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10">
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