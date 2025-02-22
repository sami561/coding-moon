// Packages
import { FC, ReactNode } from 'react';
import { SetterOrUpdater, useRecoilBridgeAcrossReactRoots_UNSTABLE, useRecoilState, useSetRecoilState } from 'recoil';
import { Canvas } from '@react-three/fiber';
import { Html } from '@react-three/drei';

// Components
// 2d
import Settings from '../components/2d/Settings';
// 3d
import Animation from '../components/3d/Animation';
import Camera from '../components/3d/Camera';
import Scene from '../components/3d/Scene';
// utils
import GrasslandGenerator from '../components/utils/GrasslandGenerator';

// States
import gameState from '../atoms/game';

// Types
import ScreenType from '../types/props/screen';
import GameType from '../types/game';

// Hooks
import useSetBGM from '../hooks/useSetBGM';

const Title: FC<ScreenType> = (props: ScreenType) => {
  // Allows wrapped components to access Recoil Root
  const RecoilBridge: FC<{ children: ReactNode; }> = useRecoilBridgeAcrossReactRoots_UNSTABLE();

  // Props
  const { game }: ScreenType = props;

  // States
  const setGame: SetterOrUpdater<GameType> = useSetRecoilState<GameType>(gameState);

  // Functions
  const changeScreen = (): void => {
    // Initializes a new SFX sound  
    const audio: HTMLAudioElement  = new Audio('sfx/Ok.wav');

    // Checks if the SFX are enabled in the game global state
    if (game.enableSFX) {
      audio.play();
    }
    
    const newGame: GameType = {...game, currentScreen: 'Battle'};

    // Changes the current screen of the game global state
    setGame(newGame);
  };

  // Sets the current BGM sound played to 'Title' to the global game state
  useSetBGM('Title');

  return (
    <div className='absolute h-full w-full bg-black'>
      <Canvas>
        {/* Initializes UI */}
        <Html as='div' fullscreen className='flex select-none'>
          <RecoilBridge>
            <Settings game={game} />
          </RecoilBridge>
          <div className='flex flex-col justify-center w-full md:space-y-8 space-y-4 p-8'>
            <img src='images/Logo.png' className='flex mb-auto h-64 w-64' />
            <button onClick={changeScreen} className='text-2xl uppercase text-white font-bowlby-one animate-pulse lg:text-6xl md:text-4xl hover:scale-110 hover:animate-none duration-100'>Click to play</button>
            <div className='flex justify-center space-x-4'>
              <a href='https://www.linkedin.com/in/maxence-gumiero-47a048181/' target='_blank'>
                <img src='icons/Linkedin.png' className='md:h-12 h-8 drop-shadow hover:scale-110 duration-100' />
              </a>
              <a href='https://github.com/MaxouJS/pokemon-react-js-and-three-js' target='_blank'>
                <img src='icons/Github.png' className='md:h-12 h-8 drop-shadow hover:scale-110 duration-100' />
              </a>
            </div>
            <div className='text-xs drop-shadow lg:block hidden'>
              <p className='flex justify-center text-xs font-bold'>Made by Maxence Gumiero (MaxouJS)</p>
              <p className='flex justify-center text-xs text-black/25'>I am not affiliated to Nintendo or Pokémon Company,</p>
              <p className='flex justify-center text-xs text-black/25'>All concepts, designs and sounds here are belong to Nintendo and Pokémon Company</p>
            </div>
          </div>
        </Html>
        {/* Initializes 3d elements */}
        {/* Initializes camera props */}
        <Camera
          position={[0, -1, 2.5]}
          rotation={[0, Math.PI * 1.5, 0]}
          enableRotate={false}
          minimumDistance={1}
          maximumDistance={1}
          maximumPolarAngle={Math.PI * 0.5}
        >
          {/* Initializes scene props */}
          <Scene
            enablePostProcessing={game.enablePostProcessing}
            enableShadows={game.enableShadows}
            blurMinimumDistance={0.05}
            blurMaximumDistance={10}
          />
          {/* Places manually some 3d animated elements */}
          <Animation title={'SquirtleHi'} position={[-3, 0, -0.5]} rotation={[0, Math.PI * 0.4, 0]} scale={[1, 1, 1]} />
          <Animation title={'Tree'} position={[-9, -0.1, -10]} rotation={[0, Math.PI / 2, 0]} scale={[1, 1, 1]} />
          <Animation title={'Tree'} position={[-10, -0.1, -6]} rotation={[0, Math.PI / 2, 0]} scale={[1, 1, 1]} />
          <Animation title={'Tree'} position={[-10, -0.1, 0]} rotation={[0, Math.PI / 2, 0]} scale={[1, 1, 1]} />
          <Animation title={'Tree'} position={[-10, -0.1, 6]} rotation={[0, Math.PI / 2, 0]} scale={[1, 1, 1]} />
          <Animation title={'Tree'} position={[-9, -0.1, 10]} rotation={[0, Math.PI / 2, 0]} scale={[1, 1, 1]} />
          <Animation title={'Tree'} position={[-14, -0.1, -12.5]} rotation={[0, Math.PI / 2, 0]} scale={[1, 1, 1]} />
          <Animation title={'Tree'} position={[-15, -0.1, -5]} rotation={[0, Math.PI / 2, 0]} scale={[1, 1, 1]} />
x          <Animation title={'Tree'} position={[-15, -0.1, 5]} rotation={[0, Math.PI / 2, 0]} scale={[1, 1, 1]} />
          <Animation title={'Tree'} position={[-14, -0.1, 12.5]} rotation={[0, Math.PI / 2, 0]} scale={[1, 1, 1]} />
          <GrasslandGenerator />
        </Camera>
      </Canvas>
    </div>
  );
};

export default Title;
