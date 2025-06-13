import { Canvas } from "@react-three/fiber";
import Experience from "./components/Experience";

const App = () => {
  return (
       <Canvas
        shadows
        camera={{ position: [8, 5, 4],   near: 0.1,
        far: 100,
        fov: 30,  
}}
      >
        <Experience />
      </Canvas>
  )
}

export default App