// Packages
import { FC } from 'react';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';

// Types
import CameraType from '../../types/props/3d/camera';

const Camera: FC<CameraType> = (props: CameraType) => {
  // Props
  const { children, enableRotate, position, rotation, minimumDistance, maximumDistance, maximumPolarAngle } = props;
  
  return (
    <>
      {/* Creates an Orbit Controls camera that is the easiest camera to use */}
      <OrbitControls
        enablePan={false}
        enableDamping={false}
        enableRotate={enableRotate}
        minDistance={minimumDistance}
        maxDistance={maximumDistance}
        maxPolarAngle={maximumPolarAngle}
      />
      {/* Creates a perspective camera that uses passed as props parameters */}  
      {/* @ts-ignore, we use here an array of number instead of a Vector3, that is working as well */}
      <PerspectiveCamera position={position} rotation={rotation}>
        {children}
      </PerspectiveCamera>
    </>
  );
};

export default Camera;
