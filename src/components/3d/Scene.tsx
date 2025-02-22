// Packages
import { FC } from 'react';
import { ContactShadows } from '@react-three/drei';

// Types
import SceneType from '../../types/props/3d/scene';

// Components
import Light from './Light';
import PostProcessing from './PostProcessing';

// Splitting this code section allows to add specific effects to a specific screen
const Scene: FC<SceneType> = (props: SceneType) => {
  // Props
  const { enablePostProcessing, enableShadows, blurMinimumDistance, blurMaximumDistance } = props;
  
  return (
    <>
      <Light />
      {
        (
          enablePostProcessing
        ) ? (
          <PostProcessing
            blurMinimumDistance={blurMinimumDistance}
            blurMaximumDistance={blurMaximumDistance}
          />
        ) : (
          null
        )
      }
      {/* Shadows are not casted over 25 meters to increase the framerate */}
      {
        (
          enableShadows
        ) ? (
          <ContactShadows
            position={[0, 0, 0]}
            opacity={0.75}
            scale={25}
            blur={0.1}
            far={100}
            resolution={2048}
          />
        ) : (
          null
        )
      }
    </>
  );
};

export default Scene;
