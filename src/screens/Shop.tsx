// Packages
import { FC, ReactNode,useState } from 'react';
import { SetterOrUpdater, useRecoilBridgeAcrossReactRoots_UNSTABLE, useRecoilState, useSetRecoilState } from 'recoil';
import { Canvas } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';

// Components
// 2d
import Settings from '../components/2d/Settings';
import ShopCard from '../components/2d/ShopCard';
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

const ShopPage: FC<ScreenType> = (props: ScreenType) => {
  // Allows wrapped components to access Recoil Root
  const RecoilBridge: FC<{ children: ReactNode; }> = useRecoilBridgeAcrossReactRoots_UNSTABLE();

  // Props
  const { game }: ScreenType = props;

  // States
  const setGame: SetterOrUpdater<GameType> = useSetRecoilState<GameType>(gameState);
  const [userScore, setUserScore] = useState(500);
  const [ownedPokemon, setOwnedPokemon] = useState<string[]>([]);
  const shopItems = [
    { id: 'pikachu', name: 'Pikachu', price: 300, color: '#FFD700' },
    { id: 'bulbasaur', name: 'Bulbasaur', price: 400, color: '#90EE90' },
    { id: 'charmander', name: 'Charmander', price: 500, color: '#FF4500' },
    { id: 'pikachu', name: 'Pikachu', price: 300, color: '#FFE870' },
    { id: 'bulbasaur', name: 'Bulbasaur', price: 400, color: '#F5BD30' },

  ];

  const handlePurchase = (id: string, price: number) => {
    if (userScore >= price) {
      setUserScore(userScore - price);
      setOwnedPokemon([...ownedPokemon, id]);
    } else {
      alert('Not enough points!');
    }
  };

  const goToDashboard = (): void => {
    // Initializes a new SFX sound
    const audio: HTMLAudioElement  = new Audio('sfx/Ok.wav');

    // Checks if the SFX are enabled in the game global state
    if (game.enableSFX) {
      audio.play();
    }

    const newGame: GameType = {...game, currentScreen: 'Title'};

    // Changes the current screen of the game global state
    setGame(newGame);
  };


  // Sets the current BGM sound played to 'Shop' to the global game state
  useSetBGM('Shop');

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
            <span className="text-xl font-medium text-white">
              Your Points: {userScore}
            </span>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
              {shopItems.map((item) => (
                <ShopCard
                  key={item.id}
                  name={item.name}
                  price={item.price}
                  color={item.color}
                  userScore={userScore}
                  onPurchase={() => handlePurchase(item.id, item.price)}
                />
              ))}
            </div>
            <button onClick={goToDashboard} className='text-2xl uppercase text-white font-bowlby-one animate-pulse lg:text-6xl md:text-4xl hover:scale-110 hover:animate-none duration-100'>Back to Dashboard</button>
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
          <Animation title={'Tree'} position={[-15, -0.1, 5]} rotation={[0, Math.PI / 2, 0]} scale={[1, 1, 1]} />
          <Animation title={'Tree'} position={[-14, -0.1, 12.5]} rotation={[0, Math.PI / 2, 0]} scale={[1, 1, 1]} />
          <GrasslandGenerator />
        </Camera>
      </Canvas>
    </div>
  );
};

export default ShopPage;
