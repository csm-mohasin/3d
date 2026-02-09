import { useEffect, useState } from 'react';

// Desktop-only cursor parallax mapping to -1..1 range
export const useCursorParallax = (disabled = false) => {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (disabled || typeof window === 'undefined') return;

    const handleMove = (event) => {
      const xNorm = (event.clientX / window.innerWidth - 0.5) * 2;
      const yNorm = (event.clientY / window.innerHeight - 0.5) * -2;
      setCursor({ x: xNorm, y: yNorm });
    };

    window.addEventListener('pointermove', handleMove);
    return () => window.removeEventListener('pointermove', handleMove);
  }, [disabled]);

  return cursor;
};
