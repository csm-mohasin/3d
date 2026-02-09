import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const FloatingShapes = ({ scroll, device }) => {
  const groupRef = useRef();

  const items = useMemo(
    () => [
      {
        position: [-2.8, 1.8, -7],
        radius: 0.9,
        depth: 0.25,
        color: '#22d3ee',
        emissive: '#22d3ee',
        opacity: 0.85,
        scale: 1.2,
        focusBoost: 0.3
      },
      {
        position: [2.6, -1.1, -5.5],
        radius: 1.1,
        depth: 0.45,
        color: '#7f5af0',
        emissive: '#7f5af0',
        opacity: 0.9,
        scale: 1.1,
        focusBoost: 0.45
      },
      {
        position: [0.1, 0.3, -3.2],
        radius: 1.4,
        depth: 0.75,
        color: '#e5e7eb',
        emissive: '#818cf8',
        opacity: 0.85,
        scale: 1.35,
        focusBoost: 0.6
      },
      {
        position: [-1.4, -2.1, -2],
        radius: 0.7,
        depth: 1.0,
        color: '#22d3ee',
        emissive: '#22d3ee',
        opacity: 0.7,
        scale: 1.0,
        focusBoost: 0.5
      },
      {
        position: [3.1, 2.3, -9],
        radius: 1.2,
        depth: 0.15,
        color: '#7f5af0',
        emissive: '#7f5af0',
        opacity: 0.55,
        scale: 1.0,
        focusBoost: 0.25
      }
    ],
    []
  );

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const t = state.clock.elapsedTime;
    const progress = scroll.progress || 0;
    const velocity = scroll.velocity || 0;
    const velocityFactor = 1 + Math.min(Math.abs(velocity) / 60, 1.8);

    group.children.forEach((mesh, index) => {
      const data = items[index];

      // Depth parallax based on scroll
      mesh.position.z =
        data.position[2] + progress * data.depth * 12 * velocityFactor;

      // Floating idle motion + slight scroll response
      const idleAmp = device.reducedMotion ? 0.08 : 0.25;
      mesh.position.y =
        data.position[1] +
        Math.sin(t * 0.75 + index) * idleAmp +
        (progress - 0.5) * 0.4 * data.depth;

      // Soft rotation, accelerated by scroll velocity
      mesh.rotation.x +=
        delta * 0.3 * (index % 2 === 0 ? 1 : -1) * velocityFactor;
      mesh.rotation.y += delta * 0.4 * velocityFactor;

      const targetScale =
        data.scale *
        (1 + data.focusBoost * THREE.MathUtils.smoothstep(progress, 0.2, 0.9));

      const s = mesh.scale;
      s.x = THREE.MathUtils.damp(s.x, targetScale, 4, delta);
      s.y = THREE.MathUtils.damp(s.y, targetScale, 4, delta);
      s.z = THREE.MathUtils.damp(s.z, targetScale, 4, delta);
    });
  });

  return (
    <group ref={groupRef}>
      {items.map((item, index) => (
        <mesh key={index} position={item.position} castShadow>
          <icosahedronGeometry args={[item.radius, 1]} />
          <meshStandardMaterial
            color={item.color}
            emissive={item.emissive}
            emissiveIntensity={1.4}
            roughness={0.2}
            metalness={0.75}
            transparent
            opacity={item.opacity}
          />
        </mesh>
      ))}
    </group>
  );
};

export default FloatingShapes;
