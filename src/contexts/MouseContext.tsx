import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface MousePosition {
  x: number; // raw clientX
  y: number; // raw clientY
}

const MouseContext = createContext<MousePosition>({ x: 0, y: 0 });

export const MouseProvider = ({ children }: { children: ReactNode }) => {
  const [pos, setPos] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return <MouseContext.Provider value={pos}>{children}</MouseContext.Provider>;
};

export const useMousePosition = () => useContext(MouseContext);
