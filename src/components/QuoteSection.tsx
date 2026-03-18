import { useRef, useEffect, useState, useMemo } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import quoteBg from '@/assets/quote-bg.png';

// ── canvas ────────────────────────────────────────────────────────────────────
const W  = 500;
const H  = 500;
const CX = W / 2;
const CY = H / 2;

// ── formations ────────────────────────────────────────────────────────────────
const SQUARE: [number, number][] = (() => {
  const pts: [number, number][] = [];
  const sp = 96;
  for (let r = 0; r < 4; r++)
    for (let c = 0; c < 4; c++)
      pts.push([CX + (c - 1.5) * sp, CY + (r - 1.5) * sp]);
  return pts;
})();

const DIAMOND: [number, number][] = [
  [CX,       CY - 180],
  [CX - 60,  CY - 120], [CX + 60,  CY - 120],
  [CX - 120, CY - 60],  [CX,       CY - 60],  [CX + 120, CY - 60],
  [CX - 180, CY],       [CX - 60,  CY],        [CX + 60,  CY],       [CX + 180, CY],
  [CX - 120, CY + 60],  [CX,       CY + 60],  [CX + 120, CY + 60],
  [CX - 60,  CY + 120], [CX + 60,  CY + 120],
  [CX,       CY + 180],
];

const CIRCLE: [number, number][] = (() => {
  const pts: [number, number][] = [];
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
    pts.push([CX + Math.cos(a) * 72, CY + Math.sin(a) * 72]);
  }
  for (let i = 0; i < 11; i++) {
    const a = (i / 11) * Math.PI * 2 - Math.PI / 2;
    pts.push([CX + Math.cos(a) * 178, CY + Math.sin(a) * 178]);
  }
  return pts;
})();

const FORMATIONS = [SQUARE, DIAMOND, CIRCLE];
const NAMES      = ['square', 'diamond', 'circle'];

// ── line builder ──────────────────────────────────────────────────────────────
const MAX_DIST = 130;

function buildLines(pts: [number, number][]) {
  const lines: { x1: number; y1: number; x2: number; y2: number; opacity: number }[] = [];
  for (let a = 0; a < pts.length; a++) {
    for (let b = a + 1; b < pts.length; b++) {
      const dx = pts[b][0] - pts[a][0];
      const dy = pts[b][1] - pts[a][1];
      const d  = Math.sqrt(dx * dx + dy * dy);
      if (d < MAX_DIST) {
        lines.push({
          x1: pts[a][0], y1: pts[a][1],
          x2: pts[b][0], y2: pts[b][1],
          opacity: (1 - d / MAX_DIST) * 0.5,
        });
      }
    }
  }
  return lines;
}

// ── component ─────────────────────────────────────────────────────────────────
export const QuoteSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView   = useInView(sectionRef, { once: true, margin: '0px 0px -10% 0px' });

  const [mousePos,  setMousePos]  = useState({ x: 0, y: 0 });
  const [fIdx,      setFIdx]      = useState(0);
  const [showLines, setShowLines] = useState(false);
  // dotPositions drives where dots currently are — starts at scatter, moves to formation
  const [dotPositions, setDotPositions] = useState<[number, number][] | null>(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const imageY   = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const overlayY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  // Stable scatter positions — random but fixed for this render
  const scatter = useMemo<[number, number][]>(
    () => Array.from({ length: 16 }, () => [
      CX + (Math.random() - 0.5) * W * 0.9,
      CY + (Math.random() - 0.5) * H * 0.9,
    ]),
    []
  );

  // On first entry: set dots to scatter immediately (no animation yet),
  // then after a short frame delay animate to square
  useEffect(() => {
    if (!isInView) return;

    // Step 1: place dots at scatter (instant, no transition)
    setDotPositions(scatter);

    // Step 2: after 1 frame, move to square — this triggers the fly-in animation
    const t0 = setTimeout(() => setDotPositions(SQUARE), 80);

    // Step 3: lines appear after dots land (~1.4s travel + buffer)
    const t1 = setTimeout(() => setShowLines(true), 2000);

    // Step 4: morph cycle starts
    const interval = setInterval(() => {
      setShowLines(false);
      setTimeout(() => {
        setFIdx(p => {
          const next = (p + 1) % FORMATIONS.length;
          setDotPositions(FORMATIONS[next]);
          return next;
        });
        setTimeout(() => setShowLines(true), 900);
      }, 400);
    }, 5000);

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearInterval(interval);
    };
  }, [isInView]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const r = sectionRef.current.getBoundingClientRect();
      setMousePos({ x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const lines      = buildLines(FORMATIONS[fIdx]);
  const quoteWords = "Clarity doesn't arrive all at once. It builds, slowly, in pieces.".split(' ');

  return (
    <section ref={sectionRef} className="relative min-h-[80vh] py-24 flex items-center overflow-hidden">

      <motion.div className="absolute inset-0 z-0" style={{ y: imageY }}>
        <img src={quoteBg} alt="" className="w-full h-[120%] object-cover opacity-40" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/40"
          style={{ y: overlayY }}
        />
      </motion.div>

      <motion.div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: `radial-gradient(circle at ${50 + mousePos.x * 30}% ${50 + mousePos.y * 30}%, hsl(0 0% 15% / 0.3) 0%, transparent 50%)`,
        }}
      />

      <div className="container px-8 md:px-16 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

          {/* ── LEFT: constellation ── */}
          <motion.div
            className="relative hidden lg:flex items-center justify-center"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <motion.div
              animate={{ x: mousePos.x * 16, y: mousePos.y * 16 }}
              transition={{ type: 'spring', stiffness: 50, damping: 20 }}
            >
              <svg width={W} height={H} style={{ overflow: 'visible', display: 'block' }}>
                <defs>
                  <filter id="dotglow" x="-80%" y="-80%" width="260%" height="260%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Ambient center glow */}
                <motion.circle
                  cx={CX} cy={CY} r={100}
                  fill="hsl(0 0% 60% / 0.04)"
                  animate={{ r: [90, 130, 90], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Lines — keyed to formation so they re-render on morph */}
                {lines.map((l, i) => (
                  <motion.line
                    key={`${NAMES[fIdx]}-line-${i}`}
                    x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
                    stroke="white"
                    strokeWidth={1}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: showLines ? l.opacity : 0 }}
                    transition={{ duration: 0.8, delay: showLines ? i * 0.006 : 0, ease: 'easeInOut' }}
                  />
                ))}

                {/* Dots — STABLE keys (just index) so they animate smoothly between formations */}
                {dotPositions && dotPositions.map(([tx, ty], i) => (
                  <motion.circle
                    key={`dot-${i}`}
                    r={4.5}
                    fill="white"
                    filter="url(#dotglow)"
                    animate={{ cx: tx, cy: ty, opacity: 0.9 }}
                    transition={{
                      cx:      { duration: 1.3, delay: i * 0.035, ease: [0.22, 1, 0.36, 1] },
                      cy:      { duration: 1.3, delay: i * 0.035, ease: [0.22, 1, 0.36, 1] },
                      opacity: { duration: 0.4, delay: i * 0.035 },
                    }}
                  />
                ))}
              </svg>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: quote ── */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <motion.span
              className="text-7xl md:text-9xl text-foreground/10 font-serif leading-none block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              &#x201C;
            </motion.span>

            <blockquote className="text-2xl md:text-4xl font-light leading-relaxed -mt-4">
              {quoteWords.map((word, index) => (
                <motion.span
                  key={index}
                  className="inline-block mr-[0.3em]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  style={{ letterSpacing: '0.01em' }}
                >
                  {word}
                </motion.span>
              ))}
            </blockquote>

            <motion.div
              className="w-16 h-px bg-gradient-to-r from-foreground/30 to-transparent"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 1.2 }}
              style={{ transformOrigin: 'left' }}
            />

            <motion.span
              className="text-sm text-foreground/35 tracking-widest uppercase block"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 1.5 }}
            >
              Abhinav Sai
            </motion.span>
          </motion.div>

        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-30 pointer-events-none" />
    </section>
  );
};