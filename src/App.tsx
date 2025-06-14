import { Canvas } from "@react-three/fiber";
import Experience from "./components/Experience";
import { Suspense } from "react";

const App = () => {
  return (
    <Canvas shadows camera={{ position: [0, 5, 10], fov: 50 }}>
      <Suspense fallback={null}>
        <Experience />
      </Suspense>
    </Canvas>
  );
};

export default App;
