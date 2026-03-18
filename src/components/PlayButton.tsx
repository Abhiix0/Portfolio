import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PlayButtonProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export const PlayButton = ({ isPlaying, onToggle }: PlayButtonProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const waveformBars = Array.from({ length: 5 }, (_, i) => ({
    id:         i,
    baseHeight: 10 + Math.sin(i * 0.9) * 7,
  }));

  return (
    <motion.button
      ref={buttonRef}
      className="relative group flex items-center gap-4"
      onClick={onToggle}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.96 }}
      data-magnetic
    >
      {/* Circle */}
      <motion.div
        className="relative w-16 h-16 rounded-full border-2 flex items-center justify-center overflow-hidden"
        animate={{
          borderColor: isPlaying
            ? 'hsl(0 0% 80%)'
            : isHovering ? 'hsl(0 0% 60%)' : 'hsl(0 0% 30%)',
          boxShadow: isPlaying
            ? '0 0 40px hsl(0 0% 60% / 0.35), inset 0 0 20px hsl(0 0% 50% / 0.1)'
            : isHovering
              ? '0 0 25px hsl(0 0% 50% / 0.2)'
              : '0 0 12px hsl(0 0% 30% / 0.12)',
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Pulse rings — playing only */}
        <AnimatePresence>
          {isPlaying && (
            <>
              <motion.div
                className="absolute inset-0 rounded-full border border-foreground/20"
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: 1.5, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border border-foreground/15"
                initial={{ scale: 1, opacity: 0.3 }}
                animate={{ scale: 1.9, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.4, delay: 0.5, repeat: Infinity, ease: 'easeOut' }}
              />
            </>
          )}
        </AnimatePresence>

        {/* Icon area — triangle or waveform */}
        <div className="relative w-6 h-6 flex items-center justify-center z-10">
          <AnimatePresence mode="wait">
            {!isPlaying ? (
              /* ── Triangle (play icon) ── */
              <motion.svg
                key="triangle"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.2 }}
              >
                <motion.polygon
                  points="4,2 16,9 4,16"
                  fill="hsl(0 0% 85%)"
                  animate={{ fill: isHovering ? 'hsl(0 0% 100%)' : 'hsl(0 0% 75%)' }}
                  transition={{ duration: 0.2 }}
                />
              </motion.svg>
            ) : (
              /* ── Waveform bars (playing) ── */
              <motion.div
                key="waveform"
                className="flex items-center gap-[3px]"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.2 }}
              >
                {waveformBars.map((bar) => (
                  <motion.div
                    key={bar.id}
                    className="w-[3px] bg-foreground/90 rounded-full"
                    animate={{
                      height: [
                        bar.baseHeight * 0.35,
                        bar.baseHeight * 1.9,
                        bar.baseHeight * 0.35,
                      ],
                    }}
                    transition={{
                      duration: 0.45 + bar.id * 0.07,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: bar.id * 0.08,
                    }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Label */}
      <motion.span
        className="text-sm uppercase tracking-widest"
        animate={{
          x:     isHovering ? 5 : 0,
          color: isPlaying
            ? 'hsl(0 0% 95%)'
            : isHovering ? 'hsl(0 0% 85%)' : 'hsl(0 0% 55%)',
        }}
        transition={{ duration: 0.25 }}
      >
        {isPlaying ? 'Playing' : 'Listen'}
      </motion.span>
    </motion.button>
  );
};