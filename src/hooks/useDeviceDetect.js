import { useEffect, useState } from 'react';

export const useDeviceDetect = () => {
  const [device, setDevice] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    reducedMotion: false
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const detect = () => {
      const ua = navigator.userAgent || navigator.vendor || '';
      const isTouch =
        'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const width = window.innerWidth;

      const isMobileUA = /android|iphone|ipod|blackberry|iemobile|opera mini/i.test(
        ua.toLowerCase()
      );

      const isMobile = isMobileUA || (isTouch && width < 768);
      const isTablet = !isMobile && width >= 768 && width < 1024;

      setDevice((prev) => ({
        ...prev,
        isMobile,
        isTablet,
        isDesktop: !isMobile && !isTablet
      }));
    };

    const motionQuery = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );

    const updateMotion = () => {
      setDevice((prev) => ({
        ...prev,
        reducedMotion: motionQuery.matches
      }));
    };

    detect();
    updateMotion();

    window.addEventListener('resize', detect);
    motionQuery.addEventListener('change', updateMotion);

    return () => {
      window.removeEventListener('resize', detect);
      motionQuery.removeEventListener('change', updateMotion);
    };
  }, []);

  return device;
};
