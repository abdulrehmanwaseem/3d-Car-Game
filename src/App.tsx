import { Canvas } from "@react-three/fiber";
import Experience from "./components/Experience";
import { Suspense } from "react";
import * as THREE from "three";
import { Perf } from "r3f-perf";

const App = () => {
  return (
    <Canvas
      shadows={{ type: THREE.PCFSoftShadowMap }}
      camera={{ position: [0, 8, 15], near: 0.1, fov: 60, far: 200 }}
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.0,
      }}
    >
      <Perf />
      <Suspense fallback={null}>
        <Experience />
      </Suspense>
    </Canvas>
  );
};

export default App;
