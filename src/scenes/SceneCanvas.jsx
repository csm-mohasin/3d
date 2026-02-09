import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import World from './World';

const SceneCanvas = ({ scroll, device, cursor }) => {
  const dpr = device.isMobile || device.reducedMotion ? [1, 1.5] : [1, 2];

  return (
    <div className="scene-canvas">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        }}
        dpr={dpr}
      >
        <Suspense fallback={null}>
          <World scroll={scroll} device={device} cursor={cursor} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default SceneCanvas;
