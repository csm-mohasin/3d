import React from 'react';

const Lighting = () => {
  return (
    <>
      <ambientLight intensity={0.45} color="#b0c4ff" />
      <directionalLight
        position={[4, 8, 6]}
        intensity={1.25}
        color="#ffffff"
      />
      <directionalLight
        position={[-6, -4, -10]}
        intensity={0.6}
        color="#1b2f6b"
      />
      <pointLight
        position={[0, 2, 3]}
        intensity={1.2}
        color="#7f5af0"
        distance={10}
      />
      <pointLight
        position={[-3, -2, 4]}
        intensity={0.9}
        color="#22d3ee"
        distance={9}
      />
    </>
  );
};

export default Lighting;
