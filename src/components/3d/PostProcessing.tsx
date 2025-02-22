// Packages
import { FC } from 'react';
import { Bloom, DepthOfField, EffectComposer, HueSaturation, Noise, Vignette } from '@react-three/postprocessing';

// Types
import PostProcessingType from '../../types/props/3d/postProcessing';

const PostProcessing: FC<PostProcessingType> = (props: PostProcessingType) => {
  // Props
  const { blurMinimumDistance, blurMaximumDistance } = props;
  
  return (
    <EffectComposer>
      {/* Adds simple visual effects to improving render's quality */}
      {/* Caution! Not all devices can supports these effects, that is using user's device GPU, so some devices wouldn't support it */}
      <DepthOfField focusDistance={0} focalLength={blurMinimumDistance} bokehScale={blurMaximumDistance} height={1024} />
      <Bloom luminanceThreshold={1} luminanceSmoothing={1} height={1024} />
      <Noise opacity={0.05} />
      <HueSaturation saturation={0.125} />
    </EffectComposer>
  );
};

export default PostProcessing;
