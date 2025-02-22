// Packages
import { FC, useEffect, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import { Event, Object3D } from 'three';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils';

// Types
import EnvironmentType from '../../types/props/3d/environment';

// Generic 3d model component, allows to load and copy any 3d GLTF 3d model
const Environment: FC<EnvironmentType> = (props: EnvironmentType) => {
  // Props
  const { title, position, rotation, scale } = props;
  
  // Initializes this GTLF scene
  let { scene }: any = useGLTF(`environments/${title}.glb`);

  // Allows this 3d model to be used as many times as required
  scene = useMemo((): Object3D<Event> => clone(scene), [scene]);
  
  // Hooks    
  useEffect((): void => {
    // Resolves the clipping bug on some camera angles
    scene.traverse((child: any) => {
      child.frustumCulled = false;
    });
  }, [scene]);

   // Using a primitive is the easiest way to load a custom 3d model. Using meshes can be hard to manage in this case
  return (
    <primitive position={position} rotation={rotation} scale={scale} object={scene} />
  );
};

// Preloads 3d models at the 3d canvas initializion, avoid black screen issue while a new model is loaded
useGLTF.preload('environments/Grassland.glb');
useGLTF.preload('environments/Stadium.glb');

export default Environment;
