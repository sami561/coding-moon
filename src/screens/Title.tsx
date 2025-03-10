// Packages
import { FC, ReactNode } from "react";
import {
  SetterOrUpdater,
  useRecoilBridgeAcrossReactRoots_UNSTABLE,
  useRecoilState,
  useSetRecoilState,
} from "recoil";
import { Canvas } from "@react-three/fiber";
import { Html } from "@react-three/drei";

// Components
// 2d
import Settings from "../components/2d/Settings";
// 3d
import Animation from "../components/3d/Animation";
import Camera from "../components/3d/Camera";
import Scene from "../components/3d/Scene";
// utils
import GrasslandGenerator from "../components/utils/GrasslandGenerator";

// States
import gameState from "../atoms/game";

// Types
import ScreenType from "../types/props/screen";
import GameType from "../types/game";

// Hooks
import useSetBGM from "../hooks/useSetBGM";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const Title: FC<ScreenType> = (props: ScreenType) => {
  // Allows wrapped components to access Recoil Root

  const RecoilBridge: FC<{ children: ReactNode }> =
    useRecoilBridgeAcrossReactRoots_UNSTABLE();

  // Props
  const { game }: ScreenType = props;

  // States
  const setGame: SetterOrUpdater<GameType> =
    useSetRecoilState<GameType>(gameState);

  // Functions
  const changeScreen = (): void => {
    // Initializes a new SFX sound
    const audio: HTMLAudioElement = new Audio("sfx/Ok.wav");

    // Checks if the SFX are enabled in the game global state
    if (game.enableSFX) {
      audio.play();
    }

    const newGame: GameType = { ...game, currentScreen: "Battle" };

    // Changes the current screen of the game global state
    setGame(newGame);
  };
  const changeScreenlogin= (): void => {
    // Initializes a new SFX sound
    const audio: HTMLAudioElement = new Audio("sfx/Ok.wav");

    // Checks if the SFX are enabled in the game global state
    if (game.enableSFX) {
      audio.play();
    }

    const newGame: GameType = { ...game, currentScreen: "shop" };

    // Changes the current screen of the game global state
    setGame(newGame);
  };

  // Sets the current BGM sound played to 'Title' to the global game state
  useSetBGM("Title");

  return (
    <div className="absolute h-full w-full bg-black">
      <Canvas>
        {/* Initializes UI */}
        <Html as="div" fullscreen className="flex select-none">
          <RecoilBridge>
            <Settings game={game} />
          </RecoilBridge>
          <div className="flex flex-col justify-center w-full md:space-y-8 space-y-4 p-8">
            <img src="images/Logo.png" className="flex mb-auto h-64 w-64" />
            <button
              onClick={changeScreen}
              className="text-2xl uppercase text-white font-bowlby-one animate-pulse lg:text-6xl md:text-4xl hover:scale-110 hover:animate-none duration-100"
            >
              Click to play
            </button>

           <button
              onClick={changeScreenlogin}
              className="absolute right-10 top-10 py-4 px-8  bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold"
            >
              shop
            </button>

            {/*
            <button onClick={handelshop}  className="absolute right-60 top-10 py-4 px-8  bg-blue-500 hover:bg-green-600 text-white rounded-lg font-semibold">
              shop
              </button> */}
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
          <Html position={[0, 0, 0]}>
            <div className="p-4 bg-white text-black rounded-lg shadow-lg">
              Centered Content
            </div>
          </Html>
          <Animation
            title={"SquirtleHi"}
            position={[-3, 0, -1.2]}
            rotation={[0, Math.PI * 0.2, 0]}
            scale={[1, 1, 1]}
          />

  <Animation
    title="GoodMPublic"
    position={[-5, 0, 3]}
    rotation={[0, Math.PI * 0.2, 0]}
    scale={[0.01, 0.01, 0.01]}
  />
          <Animation
            title={"Tree"}
            position={[-9, -0.1, -10]}
            rotation={[0, Math.PI / 2, 0]}
            scale={[1, 1, 1]}
          />
          <Animation
            title={"Tree"}
            position={[-10, -0.1, -6]}
            rotation={[0, Math.PI / 2, 0]}
            scale={[1, 1, 1]}
          />
          <Animation
            title={"Tree"}
            position={[-10, -0.1, 0]}
            rotation={[0, Math.PI / 2, 0]}
            scale={[1, 1, 1]}
          />
          <Animation
            title={"Tree"}
            position={[-10, -0.1, 6]}
            rotation={[0, Math.PI / 2, 0]}
            scale={[1, 1, 1]}
          />
          <Animation
            title={"Tree"}
            position={[-9, -0.1, 10]}
            rotation={[0, Math.PI / 2, 0]}
            scale={[1, 1, 1]}
          />
          <Animation
            title={"Tree"}
            position={[-14, -0.1, -12.5]}
            rotation={[0, Math.PI / 2, 0]}
            scale={[1, 1, 1]}
          />
          <Animation
            title={"Tree"}
            position={[-15, -0.1, -5]}
            rotation={[0, Math.PI / 2, 0]}
            scale={[1, 1, 1]}
          />
          x{" "}
          <Animation
            title={"Tree"}
            position={[-15, -0.1, 5]}
            rotation={[0, Math.PI / 2, 0]}
            scale={[1, 1, 1]}
          />
          <Animation
            title={"Tree"}
            position={[-14, -0.1, 12.5]}
            rotation={[0, Math.PI / 2, 0]}
            scale={[1, 1, 1]}
          />
          <GrasslandGenerator />
        </Camera>
      </Canvas>
    </div>
  );
};

export default Title;
