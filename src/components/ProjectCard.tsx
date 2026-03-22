import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  link?: string;
  github?: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isExpanded]);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 40 });
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 40 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);
  const glowX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glowY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovering(false);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
    const newParticles = Array.from({ length: 6 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 800);
  };

  return (
    <>
      <motion.div
        ref={cardRef}
        className="relative h-64 md:h-80 cursor-pointer"
        style={{ perspective: 1000 }}
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        onClick={() => setIsExpanded(true)}
        data-magnetic
      >
        <motion.div
          className="w-full h-full card-ambient rounded-2xl p-5 md:p-8 flex flex-col justify-between glow-border transition-all duration-300 relative overflow-hidden"
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          whileHover={{
            boxShadow: "0 30px 60px -15px hsl(0 0% 0% / 0.9), 0 0 100px -25px hsl(0 0% 35% / 0.4)",
          }}
        >
          {/* Particle burst on hover */}
          <AnimatePresence>
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute w-1 h-1 bg-foreground/60 rounded-full pointer-events-none"
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                }}
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 3, opacity: 0, x: (particle.x - 50) * 2, y: (particle.y - 50) * 2 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            ))}
          </AnimatePresence>

          {/* Dynamic glow following cursor */}
          <motion.div
            className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300"
            style={{
              opacity: isHovering ? 0.6 : 0,
              background: `radial-gradient(circle at ${glowX} ${glowY}, hsl(0 0% 30% / 0.3) 0%, transparent 50%)`,
            }}
          />

          {/* Edge glow lines */}
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-2xl"
            style={{
              opacity: isHovering ? 1 : 0,
              transition: 'opacity 0.3s',
            }}
          >
            <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-foreground/30 to-transparent" />
            <div className="absolute bottom-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
          </motion.div>

          {/* Project number */}
          <motion.span
            className="text-4xl md:text-6xl font-light text-muted-foreground/20 select-none"
            style={{ transform: "translateZ(30px)" }}
          >
            {String(index + 1).padStart(2, '0')}
          </motion.span>

          <div className="space-y-4" style={{ transform: "translateZ(20px)" }}>
            <motion.h3
              className="text-xl md:text-2xl font-medium text-foreground"
              animate={{ x: isHovering ? 8 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {project.title}
            </motion.h3>
            <p className="text-muted-foreground line-clamp-2">{project.description}</p>

            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, i) => (
                <motion.span
                  key={tag}
                  className="px-3 py-1 text-xs bg-secondary/50 text-secondary-foreground rounded-full"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * i }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Hover indicator */}
          <motion.div
            className="absolute bottom-4 right-4 w-12 h-12 rounded-full border border-border/30 flex items-center justify-center"
            animate={{
              opacity: isHovering ? 1 : 0.3,
              scale: isHovering ? 1.1 : 1,
              borderColor: isHovering ? 'hsl(0 0% 50%)' : 'hsl(0 0% 20%)',
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.span
              className="text-muted-foreground text-2xl"
              animate={{ rotate: isHovering ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              +
            </motion.span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Expanded overlay */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
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
                className="text-lg text-muted-foreground mt-6 leading-relaxed"
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