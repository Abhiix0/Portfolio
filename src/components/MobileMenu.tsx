import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

interface MobileMenuProps {
  isModalOpen: boolean;
}

const menuItems = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export const MobileMenu = ({ isModalOpen }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent background scrolling
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  // Close menu on Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  // Close menu if another modal opens
  useEffect(() => {
    if (isModalOpen) {
      setIsOpen(false);
    }
  }, [isModalOpen]);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Toggle */}
      <motion.button
        type="button"
        onClick={() => setIsOpen(true)}
        disabled={isModalOpen || isOpen}
        className="sm:hidden relative z-50 p-2 text-foreground"
        aria-label="Open navigation menu"
        aria-expanded={isOpen}
        whileTap={{ scale: 0.92 }}
      >
        <div className="w-6 h-5 flex flex-col justify-between">
          <span className="w-full h-0.5 bg-current rounded-full" />
          <span className="w-full h-0.5 bg-current rounded-full" />
          <span className="w-full h-0.5 bg-current rounded-full" />
        </div>
      </motion.button>

      {/* Fullscreen Navigation Portal */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <motion.div
                key="mobile-navigation"
                className="fixed inset-0 z-[99999] sm:hidden"
                style={{
                  backgroundColor: '#080808',
                  height: '100dvh',
                  width: '100%',
                  isolation: 'isolate',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                role="dialog"
                aria-modal="true"
                aria-label="Mobile navigation"
              >
                {/* Navigation Container */}
                <div className="relative flex flex-col h-full w-full px-7">

                  {/* Header */}
                  <motion.div
                    className="flex items-center justify-between py-7 border-b border-white/[0.08]"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                  >
                    <span className="text-lg font-medium tracking-tight text-white">
                      ASG
                    </span>

                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="p-2 text-white hover:text-white/60 transition-colors"
                      aria-label="Close navigation menu"
                    >
                      <X size={27} strokeWidth={1.5} />
                    </button>
                  </motion.div>

                  {/* Navigation Links */}
                  <nav className="flex-1 flex flex-col justify-center">
                    {menuItems.map((item, index) => (
                      <motion.a
                        key={item.label}
                        href={item.href}
                        onClick={handleLinkClick}
                        className="
                          block py-7
                          text-[2.5rem]
                          font-light
                          tracking-tight
                          text-white/90
                          border-b border-white/[0.08]
                          transition-colors duration-200
                          hover:text-white
                        "
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.35,
                          delay: 0.12 + index * 0.08,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        {item.label}
                      </motion.a>
                    ))}
                  </nav>

                  {/* Footer */}
                  <div className="pb-8 pt-5">
                    <span className="text-[10px] tracking-[0.25em] text-white/30 uppercase">
                      ASG — 2026
                    </span>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
};