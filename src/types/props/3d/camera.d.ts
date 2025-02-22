// Packages
import { ReactNode } from 'react';

interface Camera {
  children: ReactNode;
  enableRotate: boolean;
  position: number[];
  rotation: number[];
  minimumDistance: number;
  maximumDistance: number;
  maximumPolarAngle: number;
};

export default Camera;
