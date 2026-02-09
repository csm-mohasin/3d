import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const Particles = ({ scroll, device }) => {
  const pointsRef = useRef();

  const count = device.isMobile || device.reducedMotion ? 400 : 1100;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const i3 = i * 3;
      arr[i3 + 0] = (Math.random() - 0.5) * 22;
      arr[i3 + 1] = (Math.random() - 0.5) * 18;
      arr[i3 + 2] = (Math.random() - 0.5) * 24;
    }
    return arr;
  }, [count]);

  useFrame((state, delta) => {
    const points = pointsRef.current;
    if (!points) return;

    const vel = scroll.velocity || 0;
    const progress = scroll.progress || 0;
    const pos = points.geometry.attributes.position.array;
    const t = state.clock.elapsedTime;

    const velocityFactor =
      0.5 + Math.min(Math.abs(vel) / 40, 2.5) + (scroll.isScrolling ? 0.2 : 0);

    for (let i = 0; i < count; i += 1) {
      const i3 = i * 3;

      // Subtle vertical shimmer
      pos[i3 + 1] +=
        Math.sin(t * 0.45 * velocityFactor + i * 0.35) * 0.0025;

      // Z drift forward/back depending on scroll progress
      pos[i3 + 2] +=
        delta *
        0.35 *
        (progress - 0.5) *
        (1 + (i % 7) * 0.08) *
        velocityFactor;
    }

    points.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={device.isMobile ? 0.03 : 0.05}
        sizeAttenuation
        depthWrite={false}
        transparent
        opacity={0.65}
        color="#a5b4fc"
      />
    </points>
  );
};

export default Particles;
