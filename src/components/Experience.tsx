import { KeyboardControls } from "@react-three/drei";
import { Physics, RigidBody } from "@react-three/rapier";
import Ecctrl, { EcctrlAnimation } from "ecctrl";
import { Character } from "./Character";
import { InvasionEnvironment } from "./Invasion_environment";

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
      {/* <OrbitControls maxPolarAngle={Math.PI / 2} /> */}
      {/* <Environment preset="sunset" /> */}
      <ambientLight intensity={1} />

      <directionalLight
        intensity={1.5}
        castShadow
        position={[-15, 20, 15]}
        shadow-mapSize={[4096, 4096]}
        shadow-camera-far={50}
        shadow-camera-near={1}
        shadow-bias={-0.001}
        color="#ffd0b8"
      />

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
