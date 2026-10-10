# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Vite dev server on port 8080 (host `::`)
- `npm run build` — production build to `dist/` (`build:dev` for development mode)
- `npm run lint` — ESLint over the repo
- `npm run preview` — serve the built output

There is no test suite. Deployed on Vercel (https://abhiix0.vercel.app/).

## Architecture

Single-page personal portfolio: React 18 + TypeScript + Vite (SWC) + Tailwind 3. The `@` alias maps to `src/`.

- `src/App.tsx` sets up React Router with only `/` (`pages/Index.tsx`) and a `*` NotFound route.
- `src/pages/Index.tsx` is the page shell: it renders the fixed nav, the section stack (Hero → Manifesto → Quote → Projects → Contact, wrapped in `#about`, `#projects`, `#contact` anchors used by nav links), a noise overlay, and a scroll-progress bar. It also enables smooth scrolling and registers GSAP ScrollTrigger fades on every `<section>`, killing all triggers on unmount.
- `src/components/*Section.tsx` are the page sections; `CustomCursor`, `ParticleField`, `BubbleField`, `PlayButton`, `ProjectCard` are supporting pieces. `HeroSection` owns the looping ambient audio (`src/assets/ambient.mp3`) with a manual volume fade.
- Animation uses both **framer-motion** (scroll/hover/entrance) and **GSAP** (ScrollTrigger and imperative timelines); both are used throughout components.
- Cross-component communication for modals uses a window `CustomEvent` named `modalStateChange` (`detail.open`); `Index` listens to it to hide the nav and scroll indicator. Elements with a `data-magnetic` attribute are targeted by the custom cursor.
- Styling: Tailwind with CSS-variable theme tokens in `src/index.css`; `cn()` helper in `src/lib/utils.ts`. shadcn config exists (`components.json`, ui alias `@/components/ui`) but no `components/ui` directory is currently present.
