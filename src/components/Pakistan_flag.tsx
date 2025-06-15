import { useAnimations, useGLTF } from "@react-three/drei";
import { useGraph } from "@react-three/fiber";
import React, { useEffect } from "react";
import * as THREE from "three";
import type { GLTF } from "three-stdlib";
import { SkeletonUtils } from "three-stdlib";

type ActionName = "Pakistan Flag";

interface GLTFAction extends THREE.AnimationClip {
  name: ActionName;
}

type GLTFResult = GLTF & {
  nodes: {
    Object_7: THREE.SkinnedMesh;
    Object_9: THREE.SkinnedMesh;
    Object_11: THREE.SkinnedMesh;
    _rootJoint: THREE.Bone;
  };
  materials: {
    Flag_Mat: THREE.MeshStandardMaterial;
    Material: THREE.MeshStandardMaterial;
    Flag_Pole_Mat: THREE.MeshStandardMaterial;
  };
  animations: GLTFAction[];
};

export function PakistanFlag(props: React.JSX.IntrinsicElements["group"]) {
  const group = React.useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF("/models/pakistan_flag.glb");
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone) as unknown as GLTFResult;
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (actions["Pakistan Flag"]) {
      actions["Pakistan Flag"].play();
    }
  }, [actions]);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <primitive object={nodes._rootJoint} />
        <skinnedMesh
          name="Object_7"
          geometry={nodes.Object_7.geometry}
          material={materials.Flag_Mat}
          skeleton={nodes.Object_7.skeleton}
          rotation={[-1.566, 0, 0]}
          scale={0.01}
        />
        <skinnedMesh
          name="Object_9"
          geometry={nodes.Object_9.geometry}
          material={materials.Material}
          skeleton={nodes.Object_9.skeleton}
          rotation={[-1.566, 0, 0]}
          scale={0.01}
        />
        <skinnedMesh
          name="Object_11"
          geometry={nodes.Object_11.geometry}
          material={materials.Flag_Pole_Mat}
          skeleton={nodes.Object_11.skeleton}
          rotation={[-1.566, 0, 0]}
          scale={0.01}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/models/pakistan_flag.glb");
