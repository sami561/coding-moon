// Packages
import { FC } from 'react';

// Types
import LightType from '../../types/props/3d/light';

const Light: FC<LightType> = (props: LightType) => {
  // Props
  const {} = props;
  
  return (
    <>
      <ambientLight intensity={0.75} />
      <pointLight position={[20, 50, 20]} intensity={0.75} />
    </>
  );
};

export default Light;
