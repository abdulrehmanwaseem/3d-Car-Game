import { Environment, KeyboardControls, OrbitControls } from '@react-three/drei';
import { Physics, RigidBody } from "@react-three/rapier";
import { CarRacingMap } from './Car-Racing-Map';
import { RaceCar } from './Race-Car';
import Ecctrl from "ecctrl";
import { CuboidCollider } from '@react-three/rapier'

const Experience = () => {
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

  return (
   <>
      <Environment preset="sunset" />
      <OrbitControls autoRotate maxPolarAngle={Math.PI / 2} />
      <ambientLight intensity={0.5} />

<Physics gravity={[0, -9.81, 0]} debug>
          <RigidBody type="fixed"  colliders="trimesh" position={[0, -1, 0]} restitution={0.2} friction={0.5}>
            <CarRacingMap position={[0, 0, 0]} />
          </RigidBody>
                <KeyboardControls map={keyboardMap}>
  <Ecctrl 
      // RigidBody & Ecctrl settings:
      colliders={false}  /* disable auto collider generation to use custom colliders */
      friction={2}       /* high friction for tire grip */
      restitution={0}    /* no bounce */
      linearDamping={1.0} /* air drag for smooth deceleration */
      angularDamping={4.0}/* strong rotational damping for stability */
      gravityScale={1}    /* normal gravity (Ecctrl handles extra gravity when falling) */
      maxVelLimit={8}     /* top speed of car */
      turnSpeed={ 20 }    /* e.g. 20 (fast turn) – use an actual number here */
      turnVelMultiplier={0.15}/* slight reduction of turn dampening at speed for agility */
      floatHeight={0.3}   /* keep car low to ground (small hover distance) */
      capsuleHalfHeight={0.25} /* (if needed) shrink capsule size to fit car */
      capsuleRadius={0.3} /* radius ~ wheel radius or half car thickness */
      springK={1.0}       /* spring stiffness for suspension */
      dampingC={0.15}     /* higher damping for less bounce */
      autoBalanceSpringK={0.3} /* keep default upright spring */
      autoBalanceDampingC={0.05}/* slightly higher damping for auto-balance */
      position={[1, 2, 14]} /* initial position of the car in the world */
    >
      <RaceCar userData={{ camExcludeCollision: true }} position={[0, -0.6, 0]} rotation={[0, Math.PI / 1, 0]} />
    </Ecctrl>
</KeyboardControls>

        </Physics>
    </>
  )
}

export default Experience