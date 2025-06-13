import {
  Environment,
  KeyboardControls,
  Loader,
  OrbitControls,
  OrthographicCamera,
} from "@react-three/drei";
import { Physics, RigidBody } from "@react-three/rapier";
import Ecctrl, { EcctrlAnimation } from "ecctrl";
import { VillageEnvironment } from "./Village_environment";
import { InvasionEnvironment } from "./Invasion_environment";
import { Character } from "./Character";
import { Suspense } from "react";

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
    { name: "action2", keys: ["2"] },
    { name: "action3", keys: ["3"] },
    { name: "action4", keys: ["KeyF"] },
  ];

  const animationSet = {
    idle: "idle",
    walk: "walk",
    run: "sprint",
    jump: "jump",
    jumpIdle: "idle",
    jumpLand: "idle",
    fall: "fall",
    action1: "emote-yes",
  };
  return (
    <>
      {/* <OrbitControls maxPolarAngle={Math.PI / 2} /> */}

      <Environment preset="sunset" />
      <ambientLight intensity={0.5} />

      <directionalLight
        intensity={1.5}
        castShadow
        position={[-15, 20, 15]}
        shadow-mapSize={[4096, 4096]}
        shadow-camera-far={50}
        shadow-camera-near={1}
        shadow-bias={-0.001}
        color="#ffd0b8"
      >
        <OrthographicCamera
          left={-30}
          right={30}
          top={30}
          bottom={-30}
          attach={"shadow-camera"}
        />
      </directionalLight>

      <Physics>
        <RigidBody type="fixed" colliders="trimesh">
          <InvasionEnvironment scale={1} position={[0, 0, 0]} />
        </RigidBody>
        <KeyboardControls map={keyboardMap}>
          <Ecctrl
            animated
            position={[5, 20, 15]}
            capsuleHalfHeight={0.3}
            floatHeight={0.2}
            scale={1.5}
          >
            <EcctrlAnimation
              characterURL={characterURL} // Must have property
              animationSet={animationSet}
            >
              <Character position={[0, -0.6, 0]} />
            </EcctrlAnimation>
          </Ecctrl>
        </KeyboardControls>
      </Physics>
    </>
  );
};

export default Experience;
