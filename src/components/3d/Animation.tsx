// Packages
import { FC, useEffect, useMemo } from 'react';
import { useAnimations, useGLTF } from '@react-three/drei';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils';

// Types
import AnimationType from '../../types/props/3d/animation';

// Generic 3d animation component, allows to load and copy any 3d GLTF 3d animation
const Animation: FC<AnimationType> = (props: AnimationType) => {
  // Props
  const { title, position, rotation, scale } = props;
  
  // Initializes this GTLF scene and its animations
  let { scene, animations }: any = useGLTF(`animations/${title}.glb`);
  
  // Allows this 3d animation to be used as many times as required
  scene = useMemo(() => clone(scene), [scene]);
  
  // Initializes actions
  const { actions }: any = useAnimations(animations, scene);
   
  // Hooks
  useEffect((): void => {
    // Resolves the clipping bug on some camera angles
    scene.traverse((child: any) => {
      child.frustumCulled = false;
    });
    
    // Plays the animation in loop
    actions.ArmatureAction.play();
  }, [actions, scene]);
  
  // Using a primitive is the easiest way to load a custom 3d animation. Using meshes can be hard to manage in this case
  return (
    <primitive position={position} rotation={rotation} scale={scale} object={scene} />
  );
};

// Preloads 3d models at the 3d canvas initializion, avoid black screen issue while a new model is loaded
useGLTF.preload('animations/Flower.glb');
useGLTF.preload('animations/OnixAttack.glb');
useGLTF.preload('animations/OnixStance.glb');
useGLTF.preload('animations/SquirtleAttack.glb');
useGLTF.preload('animations/SquirtleHi.glb');
useGLTF.preload('animations/SquirtleStance.glb');
useGLTF.preload('animations/Tree.glb');
useGLTF.preload('animations/Weeds.glb');

export default Animation;
