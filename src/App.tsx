import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import Experience from "./components/Experience";
import { Suspense } from "react";
import * as THREE from "three";
import { Perf } from "r3f-perf";
import { Leva } from "leva";

const App = () => {
  const [shadows, setShadows] = useState(true);

  useEffect(() => {
    const id = setTimeout(() => {
      setShadows(false);
    }, 850);
    return () => clearTimeout(id);
  }, []);

  return (
    <>
      <Leva collapsed />

      <Canvas
        shadows={shadows ? { type: THREE.PCFSoftShadowMap } : false}
        camera={{ position: [0, 8, 15], near: 0.1, fov: 60, far: 200 }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.0,
        }}
      >
        <Perf />
        <Suspense fallback={null}>
          <Experience shadows={shadows} />
        </Suspense>
      </Canvas>
    </>
  );
};

export default App;
