import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import profileImage from '@/assets/profile-portrait.png';

const innerParticles = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  x: Math.random() * 80 + 10,
  y: Math.random() * 80 + 10,
  size: Math.random() * 3 + 1,
  duration: Math.random() * 4 + 3,
}));

const RIPPLE_COUNT = 4;
const RIPPLE_DURATION = 3;

// Circle is w-80 = 320px on desktop, w-64 = 256px on mobile
// Labels use absolute top/left with negative margins to sit OUTSIDE the circle
// top/left are set relative to the profile wrapper div (which is sized to the circle)
const floatingLabels = [
  {
    id: 'year',
    text: '2nd Year',
    // top-left, above and to the left
    top: '-14px',
    left: '-90px',
    driftX: 3,
    driftY: 4,
    duration: 5.2,
    delay: 0,
  },
  {
    id: 'field',
    text: 'Data Science',
    // top-right, above and to the right
    top: '30px',
    left: '290px',
    driftX: -4,
    driftY: 4,
    duration: 6.1,
    delay: 0.8,
  },
  {
    id: 'location',
    text: 'Hyderabad, IN',
    // bottom-left
    top: '240px',
    left: '-100px',
    driftX: 4,
    driftY: -3,
    duration: 5.8,
    delay: 1.4,
  },
  {
    id: 'status',
    text: 'Looking for internships',
    // bottom-right
    top: '270px',
    left: '240px',
    driftX: -3,
    driftY: -4,
    duration: 6.6,
    delay: 0.4,
    hasIndicator: true,
  },
];

export const ManifestoSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const [isHoveringProfile, setIsHoveringProfile] = useState(false);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

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
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="container max-w-7xl mx-auto px-8 md:px-16 xl:px-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left: Profile with ripples + floating labels */}
          <motion.div
            ref={profileRef}
            className="relative flex justify-center lg:justify-start"
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Sized exactly to the circle so labels offset from its edges */}
            <div className="relative w-64 h-64 md:w-80 md:h-80">

              {/* Floating satellite labels — positioned relative to circle box */}
              {floatingLabels.map((label) => (
                <motion.div
                  key={label.id}
                  className="absolute z-20 hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-foreground/60 border border-border/50 backdrop-blur-sm"
                  style={{
                    top: label.top,
                    left: label.left,
                    background: 'hsl(0 0% 5% / 0.85)',
                    whiteSpace: 'nowrap',
                  }}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={
                    isInView
                      ? {
                          opacity: 1,
                          scale: 1,
                          y: [0, -label.driftY, 0, label.driftY, 0],
                          x: [0, label.driftX, 0, -label.driftX, 0],
                        }
                      : { opacity: 0, scale: 0.7 }
                  }
                  transition={{
                    opacity: { duration: 0.5, delay: 0.8 + label.delay },
                    scale:   { duration: 0.5, delay: 0.8 + label.delay },
                    y: {
                      duration: label.duration,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: label.delay,
                    },
                    x: {
                      duration: label.duration * 1.15,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: label.delay + 0.3,
                    },
                  }}
                  whileHover={{ scale: 1.08, borderColor: 'hsl(0 0% 50%)' }}
                >
                  {label.hasIndicator && <span className="status-dot" />}
                  {label.text}
                </motion.div>
              ))}

              {/* Ripple rings + profile circle — fills the wrapper exactly */}
              <div
                className="relative overflow-hidden lg:overflow-visible w-full h-full"
                onMouseEnter={() => setIsHoveringProfile(true)}
                onMouseLeave={() => setIsHoveringProfile(false)}
              >
                {/* CSS ripple rings */}
                {Array.from({ length: RIPPLE_COUNT }).map((_, i) => (
                  <div
                    key={i}
                    className="profile-ripple-ring"
                    style={{
                      animationDelay: `-${(RIPPLE_DURATION / RIPPLE_COUNT) * i}s`,
                    }}
                  />
                ))}

                {/* Profile image */}
                <motion.div
                  className="relative w-full h-full rounded-full overflow-hidden glow-border"
                  animate={{
                    scale: isHoveringProfile ? 1.05 : 1,
                    boxShadow: isHoveringProfile
                      ? '0 0 60px hsl(0 0% 40% / 0.3), inset 0 0 30px hsl(0 0% 0% / 0.5)'
                      : '0 0 30px hsl(0 0% 20% / 0.2)',
                  }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
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
                          ease: 'easeInOut',
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
                    animate={{ opacity: isHoveringProfile ? 0.3 : 0.6 }}
                    transition={{ duration: 0.4 }}
                  />

                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover grayscale"
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right: Manifesto text */}
          <div className="space-y-6 lg:space-y-10">
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
              <p>I work in data — pipelines, dashboards, models.</p>
              <p>Turning noise into something a person can act on.</p>
              <p>Python when I need precision. SQL when I need to listen.</p>
              <p>Power BI when the story needs to be seen.</p>
            </motion.div>

            <motion.p
              className="manifesto-text text-lg text-muted-foreground/70 max-w-xl"
              style={{ lineHeight: 1.7 }}
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Every commit is a quiet refusal to disappear.
            </motion.p>

            <motion.div
              className="manifesto-text flex flex-wrap gap-3 pt-4"
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {['Python', 'SQL', 'Power BI', 'Machine Learning', 'Data Analysis'].map((skill) => (
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