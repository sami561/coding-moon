import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Box } from '@react-three/drei';

interface PokemonModelProps {
  position: [number, number, number];
  color: string;
}

export function PokemonModel({ position, color }: PokemonModelProps) {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (group.current) {
      // Rotate the model
      group.current.rotation.y += 0.01;

      // Make the model jump up and down
      const jumpHeight = 0.5; // Height of the jump
      const jumpSpeed = 2; // Speed of the jump
      group.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * jumpSpeed) * jumpHeight;
    }
  });

  return (
    <group ref={group} position={position}>
      {/* Body */}
      <Sphere args={[1, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color={color} />
      </Sphere>
      
      {/* Eyes */}
      <Sphere args={[0.2, 32, 32]} position={[0.4, 0.3, 0.8]}>
        <meshStandardMaterial color="black" />
      </Sphere>
      <Sphere args={[0.2, 32, 32]} position={[-0.4, 0.3, 0.8]}>
        <meshStandardMaterial color="black" />
      </Sphere>
      
      {/* Ears */}
      <Box args={[0.3, 0.8, 0.2]} position={[0.7, 1.2, 0]} rotation={[0, 0, 0.5]}>
        <meshStandardMaterial color={color} />
      </Box>
      <Box args={[0.3, 0.8, 0.2]} position={[-0.7, 1.2, 0]} rotation={[0, 0, -0.5]}>
        <meshStandardMaterial color={color} />
      </Box>
    </group>
  );
}