import { useFrame } from "@react-three/fiber";
import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { Mesh, ConeGeometry, MeshBasicMaterial } from "three";

// UFOBeam component
export const UFOBeam: React.FC = (): React.JSX.Element => {
  const beamRef = useRef<Mesh<ConeGeometry, MeshBasicMaterial> | null>(null);
  useFrame((state) => {
    const mesh = beamRef.current;
    if (mesh) {
      mesh.rotation.y += 0.01;
      mesh.material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }
  });

  return (
    <mesh ref={beamRef} position={[0, 15, -1]}>
      <coneGeometry args={[8, 30, 32, 1, true]} />
      <meshBasicMaterial
        color="#00ff88"
        transparent
        opacity={0.3}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
};

// FloatingParticles component
export const FloatingParticles: React.FC = (): React.JSX.Element => {
  const particlesRef = useRef<THREE.Points | null>(null);
  const particleCount = 200;

  const particles = useMemo<Float32Array>(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = Math.random() * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return positions;
  }, [particleCount]);

  useFrame((state) => {
    const points = particlesRef.current;
    if (points) {
      points.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[particles, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#88ff88"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const AtmosphericEffects: React.FC = (): React.JSX.Element => {
  return (
    <>
      <UFOBeam />
      <FloatingParticles />
    </>
  );
};
export default AtmosphericEffects;
