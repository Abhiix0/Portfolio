import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import profileImage from '@/assets/profile-portrait.png';

const rippleRings = Array.from({ length: 4 }, (_, i) => ({
  id: i,
  delay: i * 0.6,
  duration: 3 + i * 0.5,
  scale: 1.3 + i * 0.25,
}));

const innerParticles = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  x: Math.random() * 80 + 10,
  y: Math.random() * 80 + 10,
  size: Math.random() * 3 + 1,
  duration: Math.random() * 4 + 3,
}));

export const ManifestoSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const [isHoveringProfile, setIsHoveringProfile] = useState(false);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.manifesto-text',
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-32 flex items-center section-ambient overflow-hidden"
    >
      {/* Background ambient elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, hsl(0 0% 12% / 0.5) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container px-8 md:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Profile with ripples */}
          <motion.div
            ref={profileRef}
            className="relative flex justify-center lg:justify-start"
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="relative"
              onMouseEnter={() => setIsHoveringProfile(true)}
              onMouseLeave={() => setIsHoveringProfile(false)}
            >
              {/* Ripple rings */}
              {rippleRings.map((ring) => (
                <motion.div
                  key={ring.id}
                  className="absolute inset-0 rounded-full border border-foreground/10"
                  animate={{
                    scale: [1, ring.scale],
                    opacity: [0.4, 0],
                  }}
                  transition={{
                    duration: ring.duration,
                    delay: ring.delay,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                />
              ))}

              {/* Profile circle */}
              <motion.div
                className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden glow-border"
                animate={{
                  scale: isHoveringProfile ? 1.05 : 1,
                  boxShadow: isHoveringProfile
                    ? '0 0 60px hsl(0 0% 40% / 0.3), inset 0 0 30px hsl(0 0% 0% / 0.5)'
                    : '0 0 30px hsl(0 0% 20% / 0.2)',
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                data-hover
              >
                {/* Inner floating particles */}
                <div className="absolute inset-0 pointer-events-none">
                  {innerParticles.map((particle) => (
                    <motion.div
                      key={particle.id}
                      className="absolute rounded-full bg-foreground/20"
                      style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        width: particle.size,
                        height: particle.size,
                      }}
                      animate={{
                        y: [-10, 10, -10],
                        x: [-5, 5, -5],
                        opacity: [0.2, 0.5, 0.2],
                      }}
                      transition={{
                        duration: particle.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: particle.id * 0.3,
                      }}
                    />
                  ))}
                </div>

                {/* Vignette overlay */}
                <motion.div
                  className="absolute inset-0 z-10 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle, transparent 40%, hsl(0 0% 0% / 0.6) 100%)',
                  }}
                  animate={{
                    opacity: isHoveringProfile ? 0.3 : 0.6,
                  }}
                  transition={{ duration: 0.4 }}
                />

                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover grayscale"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Manifesto text */}
          <div className="space-y-10">
            <motion.span
              className="manifesto-text text-sm tracking-widest uppercase text-muted-foreground block"
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              About Me
            </motion.span>

            <motion.p
              className="manifesto-text text-lg text-muted-foreground max-w-xl"
              style={{ lineHeight: 1.75 }}
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              I build things the way some people write letters they'll never send.
              <br />
              Somewhere between logic and longing, I found programming.
              <br />
              A strange craft—where you can give structure to chaos,
              <br />
              and call it meaning.
            </motion.p>

            <motion.div
              className="manifesto-text text-lg text-muted-foreground max-w-xl space-y-2"
              style={{ lineHeight: 1.7 }}
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <p>I believe every system is a confession.</p>
              <p>Every dataset is a pattern waiting to be understood.</p>
              <p>Every clean line of code is an attempt to make sense of a world</p>
              <p>that rarely is.</p>
            </motion.div>

            <motion.p
              className="manifesto-text text-lg text-muted-foreground/70 max-w-xl mt-14"
              style={{ lineHeight: 1.7 }}
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Every commit is a quiet refusal to disappear.
            </motion.p>

            <motion.div
              className="manifesto-text flex gap-6 pt-4"
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {['Python', 'Java', 'SQL', 'Power BI'].map((skill, i) => (
                <motion.span
                  key={skill}
                  className="text-sm text-foreground/70 px-3 py-1.5 rounded-full border border-border/50 hover:border-foreground/30 hover:text-foreground transition-colors cursor-default"
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
