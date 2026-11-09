import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import type { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  index: number;
  isInView: boolean;
}

export const ProjectCard = ({ project, index, isInView }: ProjectCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    window.dispatchEvent(new CustomEvent('modalStateChange', { detail: { open: isExpanded } }));
    return () => {
      document.body.style.overflow = '';
    };
  }, [isExpanded]);

  return (
    <>
      <motion.div
        ref={cardRef}
        className="relative h-full cursor-pointer group"
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.4 + index * 0.15, ease: [0.22, 1, 0.36, 1] }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={() => setIsExpanded(true)}
        data-magnetic
      >
        <motion.div
          className="h-full rounded-2xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300"
          style={{
            background: '#101010',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
          whileHover={{
            borderColor: 'rgba(255,255,255,0.15)',
            boxShadow: '0 20px 40px -15px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)',
          }}
        >
          {/* Subtle hover gradient */}
          <motion.div
            className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-500"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, transparent 60%)',
              opacity: isHovering ? 1 : 0,
            }}
          />

          {/* Project number */}
          <motion.div
            className="text-6xl md:text-7xl font-light select-none mb-6"
            style={{ color: '#353535' }}
            animate={{ color: isHovering ? '#454545' : '#353535' }}
            transition={{ duration: 0.3 }}
          >
            {String(index + 1).padStart(2, '0')}
          </motion.div>

          <div className="flex-1 space-y-4">
            {/* Project title */}
            <motion.h3
              className="text-2xl md:text-3xl font-medium"
              style={{ color: '#EEEEEE' }}
              animate={{ x: isHovering ? 4 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {project.title}
            </motion.h3>

            {/* Project description */}
            <p
              className="text-sm md:text-base leading-relaxed line-clamp-3"
              style={{ color: '#929292' }}
            >
              {project.description}
            </p>
          </div>

          {/* Technology tags */}
          <div className="flex flex-wrap gap-2 mt-6 mb-4">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs rounded-full"
                style={{
                  background: '#191919',
                  color: '#C5C5C5',
                }}
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 4 && (
              <span
                className="px-3 py-1 text-xs rounded-full"
                style={{
                  background: '#191919',
                  color: '#C5C5C5',
                }}
              >
                +{project.tags.length - 4}
              </span>
            )}
          </div>

          {/* Action indicator */}
          <motion.div
            className="flex items-center justify-end"
            animate={{ x: isHovering ? 4 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="flex items-center gap-2 text-sm"
              style={{ color: isHovering ? '#E58A43' : '#929292' }}
            >
              <span>View Details</span>
              <ArrowUpRight size={16} />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Expanded Modal - PRESERVED EXACTLY */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsExpanded(false)}
          >
            {/* Backdrop with blur */}
            <motion.div
              className="absolute inset-0 bg-background/95 backdrop-blur-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Content */}
            <motion.div
              className="relative z-10 w-full max-w-2xl card-ambient rounded-3xl p-6 md:p-8 lg:p-12 glow-border overflow-hidden"
              initial={{ scale: 0.85, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Ambient glow */}
              <div
                className="absolute top-0 right-0 w-64 h-64 blur-3xl pointer-events-none"
                style={{ background: 'radial-gradient(circle, hsl(0 0% 20% / 0.3) 0%, transparent 70%)' }}
              />

              <motion.button
                onClick={() => setIsExpanded(false)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/50 transition-all"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={20} />
              </motion.button>

              <motion.span
                className="text-7xl font-light text-muted-foreground/15 select-none"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                {String(index + 1).padStart(2, '0')}
              </motion.span>

              <motion.h2
                className="text-2xl md:text-3xl lg:text-4xl font-medium text-foreground mt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                {project.title}
              </motion.h2>

              <motion.p
                className="text-lg text-muted-foreground mt-6 leading-relaxed whitespace-pre-line"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {project.longDescription}
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-2 mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
              >
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 text-sm bg-secondary/50 text-secondary-foreground rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>

              <motion.div
                className="flex gap-4 mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {project.link && (
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-full hover:bg-foreground/90 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ExternalLink size={18} />
                    <span>View Live</span>
                    <motion.span
                      className="inline-block"
                      initial={{ x: 0 }}
                      whileHover={{ x: 3 }}
                    >
                      →
                    </motion.span>
                  </motion.a>
                )}
                {project.github && (
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 border border-border rounded-full hover:border-foreground/50 hover:text-foreground transition-colors text-muted-foreground"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Github size={18} />
                    Source
                  </motion.a>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};