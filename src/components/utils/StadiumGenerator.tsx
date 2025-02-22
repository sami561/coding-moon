// Packages
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';

// Types
import AnimationType from '../../types/props/3d/animation';
import PropsType from '../../types/props/3d/props';
import Animation from '../3d/Animation';

// Components
import Environment from '../3d/Environment';
import Props from '../3d/Props';

// In this project, the map generator is only used for generating random rocks, but you can use it to generates as many random elements you need for your scene
const StadiumGenerator: FC = () => {
  // States
  const [mapProps, setMapProps]: [PropsType[] | null, Dispatch<SetStateAction<PropsType[] | null>>] = useState<PropsType[] | null>(null);
  const [mapAnimatedProps, setMapAnimatedProps]: [AnimationType[] | null, Dispatch<SetStateAction<AnimationType[] | null>>] = useState<AnimationType[] | null>(null);

  useEffect((): void => {
    // Initializes empty array of 3D props
    const newMapProps: PropsType[] = [];
    const newMapAnimatedProps: AnimationType[] = [];

    const creatingElements = (
      elements: number,
      elementName: string,
      yPosition: number,
      isYRotationRandom: boolean,
      minDistance: number,
      maxDistance: number,
      minScale: number,
      maxScale: number,
      array: AnimationType[] | PropsType[],
    ): void => {
      // Creates N elements with random position, rotation and scale
      for (let index = 0; index < elements; index++) {
        let randomXPosition = Math.floor(Math.random() * maxDistance - (maxDistance / 2));

        // Checks if a element can be in the X axis position of a Pokémon, then reassigns the X axis of the element if it's the case
        while (randomXPosition >= -minDistance && randomXPosition <= minDistance) {
          randomXPosition = Math.floor(Math.random() * maxDistance - (maxDistance / 2));
        }

        let randomZPosition = Math.floor(Math.random() * maxDistance - (maxDistance / 2));

        // Checks if a element can be in the Z axis position of a Pokémon, then reassigns the Z axis of the element if it's the case
        while (randomZPosition >= -minDistance && randomZPosition <= minDistance) {
          randomZPosition = Math.floor(Math.random() * maxDistance - (maxDistance / 2));
        }

        // Creates a random position, rotation and scale
        const randomPosition: number[] = [randomXPosition, yPosition, randomZPosition];
        const randomRotation: number[] = [0, isYRotationRandom ? (Math.PI * Math.random() * 2) : 0, 0];
        const randomScale: number = Math.random() * maxScale + minScale;

        array.push({
          title: elementName,
          position: randomPosition,
          rotation: randomRotation,
          scale: [randomScale, randomScale, randomScale],
        });
      };
    };

    // Generates small rocks
    creatingElements(
      // Elements
      50,
      // Element name
      'Rock2',
      // Y axis position
      0,
      // Y axis rotation
      true,
      // Minimum distance
      5,
      // Maximum distance
      40,
      // Minimum scale
      0.125,
      // Maximum scale
      0.25,
      // Targeted array
      newMapProps,
    );

    // Generates big rocks
    creatingElements(
      // Elements
      10,
      // Element name
      'Rock1',
      // Y axis position
      -0.05,
      // Y axis rotation
      true,
      // Minimum distance
      10,
      // Maximum distance
      35,
      // Minimum scale
      1,
      // Maximum scale
      1.5,
      // Targeted array
      newMapProps,
    );

    setMapProps(newMapProps);
    setMapAnimatedProps(newMapAnimatedProps);
  }, [setMapAnimatedProps, setMapProps]);

  return (
    <>
      {/* Creates as many map props there is in the "mapProps" state */}
      {
        (
          mapProps && mapProps.length > 0
        ) ? (
          mapProps.map((d: PropsType, index: number) => {
            return (
              <Props
                key={index}
                title={d.title}
                position={d.position}
                rotation={d.rotation}
                scale={d.scale}
              />
            );
          })
        ) : (
          null
        )
      }
      {/* Creates as many map animated props there is in the "mapAnimatedProps" state */}
      {
        (
          mapAnimatedProps && mapAnimatedProps.length > 0
        ) ? (
          mapAnimatedProps.map((d: AnimationType, index: number) => {
            return (
              <Animation
                key={index}
                title={d.title}
                position={d.position}
                rotation={d.rotation}
                scale={d.scale}
              />
            );
          })
        ) : (
          null
        )
      }
      <Environment title={'Stadium'} position={[0, -0.05, 0]} rotation={[0, Math.PI / 1, 0]} scale={[2, 2, 2]} />
    </>
  );
};

export default StadiumGenerator;
