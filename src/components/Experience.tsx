import { KeyboardControls } from "@react-three/drei";
import { useLoader, useThree } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import Ecctrl, { EcctrlAnimation } from "ecctrl";
import { useEffect } from "react";
import * as THREE from "three";
import { Character } from "./Character";
import { InvasionEnvironment } from "./Invasion_environment";
import { PakistanFlag } from "./Pakistan_flag";
import AtmosphericEffects from "./AtmosphericEffects";

useLoader.preload(THREE.TextureLoader, "/models/Textures/sky.jpg");

const Experience = ({ shadows }: { shadows: boolean }) => {
  const characterURL = "/models/character.glb";

  const keyboardMap = [
    { name: "forward", keys: ["ArrowUp", "KeyW"] },
    { name: "backward", keys: ["ArrowDown", "KeyS"] },
    { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
    { name: "rightward", keys: ["ArrowRight", "KeyD"] },
    { name: "jump", keys: ["Space"] },
    { name: "run", keys: ["Shift"] },
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

  const texture = useLoader(THREE.TextureLoader, "/models/Textures/sky.jpg");
  texture.mapping = THREE.EquirectangularReflectionMapping;

  const { scene } = useThree();
  useEffect(() => {
    scene.background = texture;
  }, [scene, texture]);

  return (
    <>
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
      <AtmosphericEffects />

      <Physics>
        <RigidBody type="fixed" colliders="trimesh">
          <InvasionEnvironment
            shadows={shadows}
            scale={1}
            position={[0, 0, 0]}
          />
          <PakistanFlag position={[2.68, -0.25, -18.12]} scale={3.9} />
          <PakistanFlag position={[-2.63, -0.25, -18.12]} scale={3.9} />
        </RigidBody>
        <KeyboardControls map={keyboardMap}>
          <Ecctrl
            animated
            capsuleHalfHeight={0.05}
            scale={1.5}
            floatHeight={0.49}
            position={[-25, 25, -18]}
            jumpVel={3}
            {...{
              characterInitDir: 4.5, // Character initial facing direction (in rad)
              camMaxDis: -10,
              camMinDis: -1,
              camUpLimit: 1.3,
              camLowLimit: -0.5,
              camInitDir: { x: 0.23, y: 1.3 },
            }}
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
