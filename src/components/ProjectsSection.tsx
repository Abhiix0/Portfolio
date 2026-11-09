import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ProjectCard } from './ProjectCard';
import type { Project } from '@/types';

const projects: Project[] = [
  {
    id: 1,
    title: 'Spawn',
    description: 'A developer CLI that simplifies Python project creation and eliminates repetitive setup work.',
    longDescription:
      'Spawn is a local command-line tool that transforms a single command into a fully structured Python development environment. It automates project scaffolding, Git initialization, virtual environment creation, GitHub publishing, and template generation for common workflows like FastAPI, Data Science, and Machine Learning.\n\nBuilt with Python, Typer, and Rich, Spawn focuses on developer experience through interactive prompts, clear terminal interfaces, and automated setup flows. It also includes a project auditing system called `spawn doctor`, which analyzes repository health and scores projects across documentation, testing, deployment, and configuration best practices.',
    tags: ['Python', 'CLI Development', 'Typer', 'Rich', 'Developer Tools', 'Automation'],
    github: 'https://github.com/Abhiix0/Spawn',
  },
  {
    id: 2,
    title: 'NexGauge',
    description: 'A career intelligence platform designed to help students understand their skills, identify gaps and track their development through structured assessments and actionable insights.',
    longDescription:
      'NexGauge is a full-stack analytics platform that measures student career readiness through a combination of SQL feature engineering, machine learning, and explainable insights. The system ingests coding activity, GitHub contribution data, academic performance, and behavioral metrics to generate readiness scores and personalized recommendations.\n\nThe architecture separates concerns across PostgreSQL, FastAPI, and React, with all feature computation performed directly inside SQL through optimized multi-CTE pipelines. A hybrid insight engine combines Random Forest feature importance with rule-based reasoning to produce recommendations that are both interpretable and data-driven.',
    tags: ['Python', 'React', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Machine Learning'],
    github: 'https://github.com/Abhiix0/PIS',
  },
  {
    id: 3,
    title: 'Relay',
    description: 'An intelligent context layer that combines agent-based workflows with persistent context to support more informed AI interactions.',
    longDescription:
      'Relay is an intelligent context management system designed to enhance AI interactions through persistent context layers and coordinated agent workflows. The platform maintains conversation history, user preferences, and domain knowledge across sessions, enabling more coherent and contextually aware AI responses.\n\nBuilt with React, Node.js, and MongoDB, Relay orchestrates multiple AI agents that collaborate to understand user intent, retrieve relevant context, and generate informed responses. The system emphasizes context engineering as a core capability, treating persistent memory and intelligent retrieval as fundamental to effective AI assistance.',
    tags: ['React', 'Node.js', 'MongoDB', 'Express', 'AI Agents', 'Context Engineering'],
    github: 'https://github.com/Abhiix0',
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
      className="relative min-h-screen py-20 md:py-28 lg:py-36"
      style={{ background: '#080808', zIndex: 1 }}
    >
      {/* Subtle ambient glow continuation from Autumn Walk */}
      <div
        className="absolute top-0 left-0 w-full h-40 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 50% 30% at 50% 0%, rgba(198,93,37,0.025) 0%, transparent 70%)',
        }}
      />

      <div className="container px-4 md:px-8 lg:px-16 relative z-10 max-w-screen-xl mx-auto">
        {/* Section header */}
        <div className="projects-header mb-12 md:mb-16 lg:mb-20">
          <motion.span
            className="text-sm tracking-widest uppercase text-muted-foreground block"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Selected Works
          </motion.span>
          <motion.h2
            className="text-5xl md:text-6xl lg:text-7xl font-light mt-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Projects
          </motion.h2>
          <motion.p
            className="text-base md:text-lg text-muted-foreground mt-6 max-w-xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Things I've built — developer tools, intelligent systems, and software that turn complex problems into working products.
          </motion.p>
        </div>

        {/* 3-card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
};