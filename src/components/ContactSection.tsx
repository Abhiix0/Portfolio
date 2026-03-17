import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Github, Linkedin } from 'lucide-react';

const socialLinks = [
  { icon: Github, label: "GitHub", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Mail, label: "Email", href: "mailto:abhinavsai039@gmail.com" },
];

export const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-32 flex items-center overflow-hidden"
    >
      <div className="container px-8 md:px-16 relative z-10">
        {/* Heading */}
        <motion.div
          className="max-w-2xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.h2
            className="text-3xl md:text-5xl lg:text-6xl font-light leading-tight"
            style={{ lineHeight: 1.3 }}
          >
            If this made sense to you,
            <br />
            we should talk.
          </motion.h2>

          <motion.p
            className="text-lg text-muted-foreground mt-10 max-w-md mx-auto"
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ lineHeight: 1.7 }}
          >
            I'm open to ideas, projects, or just a good conversation.
          </motion.p>
        </motion.div>

        {/* Social links */}
        <motion.div
          className="flex flex-wrap justify-center gap-5"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.label}
              href={link.href}
              className="group"
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
            >
              <div className="flex items-center gap-3 px-6 py-3.5 rounded-full border border-border/30 bg-card/10 backdrop-blur-sm transition-shadow duration-300 hover:shadow-[0_0_20px_hsl(0_0%_40%/0.15)]">
                <link.icon className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  {link.label}
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Email CTA */}
        <motion.div
          className="mt-14 text-center"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <a
            href="mailto:abhinavsai039@gmail.com"
            className="inline-block px-8 py-4 rounded-full border border-border/25 text-muted-foreground text-sm tracking-wide transition-all duration-300 hover:text-foreground hover:shadow-[0_0_25px_hsl(0_0%_35%/0.12)] hover:border-border/40"
          >
            abhinavsai039@gmail.com
          </a>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        className="absolute bottom-8 left-0 w-full text-center"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <p className="text-sm text-muted-foreground/30">
          © {new Date().getFullYear()} — Designed & Built with ♥
        </p>
      </motion.footer>
    </section>
  );
};