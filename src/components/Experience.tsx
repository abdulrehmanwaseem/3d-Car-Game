import {
  ContactShadows,
  Environment,
  KeyboardControls,
  OrbitControls,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import Ecctrl, { EcctrlAnimation } from "ecctrl";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Character } from "./Character";
import { InvasionEnvironment } from "./Invasion_environment";

const UFOBeam = () => {
  const beamRef = useRef();

  useFrame((state) => {
    if (beamRef.current) {
      beamRef.current.rotation.y += 0.01;
      beamRef.current.material.opacity =
        0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
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

const FloatingParticles = () => {
  const particlesRef = useRef();
  const particleCount = 200;

  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = Math.random() * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={particles}
          itemSize={3}
        />
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

const Experience = () => {
  const characterURL = "/models/character.glb";

  const keyboardMap = [
    { name: "forward", keys: ["ArrowUp", "KeyW"] },
    { name: "backward", keys: ["ArrowDown", "KeyS"] },
    { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
    { name: "rightward", keys: ["ArrowRight", "KeyD"] },
    { name: "jump", keys: ["Space"] },
    { name: "run", keys: ["Shift"] },
    // Optional animation key map
    { name: "action1", keys: ["1"] },
    { name: "action2", keys: ["KeyF"] },
    { name: "action3", keys: ["KeyE"] },
    { name: "action4", keys: ["3"] },
  ];

  const animationSet = {
    idle: "idle",
    walk: "walk",
    run: "sprint",
    jump: "jump",
    jumpIdle: "idle",
    jumpLand: "idle",
    fall: "fall",
    action1: "pick-up",
    action2: "attack-melee-right",
    action3: "attack-kick-right",
  };
  return (
    <>
      {/* <Environment preset="sunset" /> */}
      <ambientLight intensity={1} />

      <directionalLight
        intensity={1.2}
        castShadow
        position={[-15, 25, 15]}
        shadow-mapSize={[4096, 4096]}
        shadow-camera-far={60}
        shadow-camera-near={0.1}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
        shadow-bias={-0.0005}
        color="#ffd0b8"
      />

      <spotLight
        position={[0, 31, -1]}
        angle={0.6}
        penumbra={0.5}
        intensity={2}
        color="#00ff88"
        castShadow
        shadow-mapSize={[2048, 2048]}
      />

      {/* Atmospheric Effects */}
      <UFOBeam />
      <FloatingParticles />

      <Physics>
        <RigidBody type="fixed" colliders="trimesh">
          <InvasionEnvironment scale={1} position={[0, 0, 0]} />
        </RigidBody>
        <KeyboardControls map={keyboardMap}>
          <Ecctrl
            animated
            position={[-5, 20, -15]}
            capsuleHalfHeight={0.05}
            scale={1.5}
            floatHeight={0.49}
          >
            <EcctrlAnimation
              characterURL={characterURL}
              animationSet={animationSet}
            >
              <Character position={[0, -0.51, 0]} />
            </EcctrlAnimation>
          </Ecctrl>
        </KeyboardControls>
      </Physics>
    </>
  );
};

export default Experience;
