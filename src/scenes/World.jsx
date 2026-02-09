import React, { useMemo } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import FloatingShapes from './FloatingShapes';
import Particles from './Particles';
import Lighting from './lighting/Lighting';

const World = ({ scroll, device, cursor }) => {
  const { camera, scene } = useThree();

  useMemo(() => {
    scene.fog = new THREE.FogExp2('#050510', 0.08);
  }, [scene]);

  useFrame((state, delta) => {
    const progress = scroll.progress || 0;
    const cursorX = cursor?.x || 0;
    const cursorY = cursor?.y || 0;

    const targetZ = THREE.MathUtils.lerp(12, 4, progress);
    const targetY = THREE.MathUtils.lerp(1.4, -1.2, progress);

    const tiltX = cursorY * 0.15;
    const tiltY = cursorX * 0.25;

    camera.position.z = THREE.MathUtils.damp(
      camera.position.z,
      targetZ,
      3,
      delta
    );
    camera.position.y = THREE.MathUtils.damp(
      camera.position.y,
      targetY + tiltX,
      3,
      delta
    );
    camera.position.x = THREE.MathUtils.damp(
      camera.position.x,
      tiltY,
      3,
      delta
    );

    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <Lighting />
      <FloatingShapes scroll={scroll} device={device} />
      <Particles scroll={scroll} device={device} />
    </>
  );
};

export default World;
