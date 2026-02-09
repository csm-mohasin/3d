import React, { useEffect } from 'react';
import Layout from './components/Layout';
import SceneCanvas from './scenes/SceneCanvas';
import { ScrollProvider, useScrollContext } from './hooks/useScrollContext';
import { useDeviceDetect } from './hooks/useDeviceDetect';
import { useLenisScroll } from './hooks/useLenisScroll';
import { useCursorParallax } from './hooks/useCursorParallax';

const AppInner = () => {
  const { scroll } = useScrollContext();
  const device = useDeviceDetect();
  const enableSmooth = !device.reducedMotion;

  useLenisScroll(enableSmooth);
  const cursor = useCursorParallax(device.isMobile || device.reducedMotion);

  // Background gradient subtle hue shift based on scroll progress
  useEffect(() => {
    const hue = 10 + (scroll.progress || 0) * 40;
    document.documentElement.style.setProperty('--bg-hue', `${hue}deg`);
  }, [scroll.progress]);

  return (
    <div className={`app ${device.isMobile ? 'is-mobile' : ''}`}>
      <SceneCanvas scroll={scroll} device={device} cursor={cursor} />
      <Layout device={device} />
    </div>
  );
};

const App = () => (
  <ScrollProvider>
    <AppInner />
  </ScrollProvider>
);

export default App;
