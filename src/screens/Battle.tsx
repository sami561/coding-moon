// Packages
import { FC, ReactNode, useEffect } from 'react';
import { SetterOrUpdater, useRecoilBridgeAcrossReactRoots_UNSTABLE, useRecoilState, } from 'recoil';
import { Canvas } from '@react-three/fiber';
import { Html } from '@react-three/drei';

// Components
// 2d
import Card from '../components/2d/Card';
import Settings from '../components/2d/Settings';
import Text from '../components/2d/TextBox';
// 3d
import Animation from '../components/3d/Animation';
import Camera from '../components/3d/Camera';
import Scene from '../components/3d/Scene';
import StadiumGenerator from '../components/utils/StadiumGenerator';

// States
import battleState from '../atoms/battle';

// Types
import ScreenType from '../types/props/screen';
import BattleType from '../types/battle';
import PokemonType from '../types/pokemon';

// Hooks
import useSetBGM from '../hooks/useSetBGM';
import MoveType from '../types/move';
import Move from '../components/2d/Move';

const Battle: FC<ScreenType> = (props: ScreenType) => {
  // Allows wrapped components to access Recoil Root
  const RecoilBridge: FC<{ children: ReactNode; }> = useRecoilBridgeAcrossReactRoots_UNSTABLE();

  // Props
  const { game }: ScreenType = props;

  // States
  const [battle, setBattle]: [BattleType, SetterOrUpdater<BattleType>] = useRecoilState<BattleType>(battleState);

  // Hooks
  // Sets the current BGM sound played to 'Battle' to the global game state
  useSetBGM('Battle');

  useEffect((): void => {
    // Initializes a new team for the player
    const newTeam1: PokemonType[] = [
      {
        pokemonName: 'Squirtle',
        currentLV: 12,
        currentHP: 1,
        maximumHP: 1,
        attack: 1,
        defense: 1,
        position: [0, 0, 7.5],
        rotation: [0, Math.PI * 1, 0],
        scale: [0.75, 0.75, 0.75],
        currentAnimation: 'SquirtleStance',
        moves: [
          {
            moveName: 'Tackle',
            damages: 15
          },
          {
            moveName: 'Water Gun',
            damages: 25
          },
        ],
      },
    ];

    // Initializes a new team for the AI
    const newTeam2: PokemonType[] = [
      {
        pokemonName: 'Onix',
        currentLV: 14,
        currentHP: 1,
        maximumHP: 1,
        attack: 1,
        defense: 1,
        position: [0, 0, -7.5],
        rotation: [0, Math.PI * 2, 0],
        scale: [1.5, 1.5, 1.5],
        currentAnimation: 'OnixStance',
        moves: [
          {
            moveName: 'Tackle',
            damages: 15
          },
          {
            moveName: 'Rock Throw',
            damages: 20
          },
        ],
      },
    ];

    const newTeam = (array: PokemonType[]): PokemonType[] => {
      // Creates new random characteristics for each Pokémon the team passed as argument
      array.forEach((n: PokemonType): void => {
        n.currentHP = (n.currentLV + Math.floor(Math.random() * n.currentLV + 1)) * 2;
        n.maximumHP = n.currentHP;
        n.attack = n.currentLV + Math.floor(Math.random() * n.currentLV + 1);
        n.defense = n.currentLV + Math.floor(Math.random() * n.currentLV + 1);
      });

      // Returns all the Pokémon with the new characteristics
      return array;
    };

    // Initializes the battle
    const newBattle: BattleType = {
      textBox: '',
      enableUI: false,
      camera: {
        enableRotate: true,
        position: [0, -1.25, 0],
        rotation: [0, Math.PI * 1.5, 0],
      },
      team1: newTeam(newTeam1),
      team2: newTeam(newTeam2),
    };

    setBattle(newBattle);

    let newTextBox: string = 'You are challenged by Gym Leader Brock!';

    setBattle({...newBattle, textBox: newTextBox,});

    setTimeout((): void => {
      newTextBox = '';

      setBattle({...newBattle, textBox: newTextBox,});
    }, 2000);

    setTimeout((): void => {
      const audio: HTMLAudioElement = new Audio('sfx/Onix.wav');

      // Checks if the SFX are enabled in the game global state
      if (game.enableSFX) {
        audio.play();
      }

      newTextBox = 'Gym Leader Brock sent out Onix!';

      setBattle({...newBattle, textBox: newTextBox,});
    }, 2500);

    setTimeout((): void => {
      newTextBox = '';

      setBattle({...newBattle, textBox: newTextBox,});
    }, 4500);

    setTimeout((): void => {
      const audio: HTMLAudioElement = new Audio('sfx/Squirtle.wav');

      // Checks if the SFX are enabled in the game global state
      if (game.enableSFX) {
        audio.play();
      }

      newTextBox = 'Go! Squirtle!';

      setBattle({...newBattle, textBox: newTextBox,});
    }, 5000);

    setTimeout((): void => {
      newTextBox = '';

      setBattle({...newBattle, textBox: newTextBox,});
    }, 7000);

    setTimeout((): void => {
      newTextBox = '(You can click and hold to move the camera.)';

      setBattle({...newBattle, textBox: newTextBox,});
    }, 7500);

    setTimeout((): void => {
      newTextBox = '';

      setBattle({...newBattle, textBox: newTextBox, enableUI: true,});
    }, 9500);
  }, [setBattle]);

  return (
    <div className='absolute h-full w-full bg-black'>
      <Canvas>
        {/* Initializes UI */}
        <Html as='div' fullscreen className='select-none'>
          {/* Checks if the battle state exists then displays the text box with its parameter contained in the battle global state */}
          {
            (
              battle?.textBox
            ) ? (
              <RecoilBridge>
                <Text
                  text={battle?.textBox as string}
                  battle={battle}
                  game={game}
                />
              </RecoilBridge>
            ) : (
              null
            )
          }
          <RecoilBridge>
            <Settings game={game} />
          </RecoilBridge>
          {/* Checks if the battle state exists then displays the Pokémon cards with their parameters contained in the battle global state */}
          {
            (
              battle?.enableUI && battle?.team1 && battle?.team2
            ) ? (
              <>
                <div className='flex w-full p-4'>
                  <Card
                    pokemon={battle?.team1[0] as PokemonType}
                    team={1}
                  />
                  <Card
                    pokemon={battle?.team2[0] as PokemonType}
                    team={2}
                  />
                </div>
              </>
            ) : (
              null
            )
          }
          {/* Checks if the battle state exists then displays the Pokémon moves with their parameters contained in the battle global state */}
          {
            (
              battle?.enableUI && battle?.team1
            ) ? (
              <div className='absolute bottom-0 right-0 animate-pulse hover:animate-none'>
                <div className='flex flex-col p-4 space-y-4'>
                  {
                    battle?.team1[0].moves.map((m: MoveType, i: number) => {
                      return (
                        <RecoilBridge key={i}>
                          <Move move={m} battle={battle} game={game} />
                        </RecoilBridge>
                      );
                    })
                  }
                </div>
              </div>
            ) : (
              null
            )
          }
        </Html>
        {/* Initializes 3d elements */}
        {/* Initializes camera props */}
        {
          (
            battle?.camera
          ) ? (
            <Camera
              enableRotate={battle.camera.enableRotate}
              position={battle.camera.position}
              rotation={battle.camera.rotation}
              minimumDistance={10}
              maximumDistance={10}
              maximumPolarAngle={Math.PI * 0.5}
            >
              {/* Initializes scene props */}
              <Scene
                enablePostProcessing={game.enablePostProcessing}
                enableShadows={game.enableShadows}
                blurMinimumDistance={0.1}
                blurMaximumDistance={10}
              />
              <StadiumGenerator />
              {/* Checks if the battle state exists then displays the Pokémon 3d animations with their parameters contained in the battle global state */}
              {
                (
                  battle?.team1
                ) ? (
                  <>
                    {/* That is not possible to load an animation just with its file name, you need to display or hide it */}
                    {
                      battle?.team1[0].currentAnimation === 'SquirtleStance'
                      ?
                      <Animation
                        title='SquirtleStance'
                        position={battle?.team1[0].position as number[]}
                        rotation={battle?.team1[0].rotation as number[]}
                        scale={battle?.team1[0].scale as number[]}
                      />
                      :
                      null
                    }
                    {
                      battle?.team1[0].currentAnimation === 'SquirtleAttack'
                      ?
                      <Animation
                        title='SquirtleAttack'
                        position={battle?.team1[0].position as number[]}
                        rotation={battle?.team1[0].rotation as number[]}
                        scale={battle?.team1[0].scale as number[]}
                      />
                      :
                      null
                    }
                  </>
                ) : (
                  null
                )
              }
              {/* Checks if the battle state exists then displays the Pokémon 3d animations with their parameters contained in the battle global state */}
              {
                (
                  battle?.team2
                ) ? (
                  <>
                    {/* That is not possible to load an animation just with its file name, you need to display or hide it */}
                    {
                      battle?.team2[0].currentAnimation === 'OnixStance'
                      ?
                      <Animation
                        title='OnixStance'
                        position={battle?.team2[0].position as number[]}
                        rotation={battle?.team2[0].rotation as number[]}
                        scale={battle?.team2[0].scale as number[]}
                      />
                      :
                      null
                    }
                    {
                      battle?.team2[0].currentAnimation === 'OnixAttack'
                      ?
                      <Animation
                        title='OnixAttack'
                        position={battle?.team2[0].position as number[]}
                        rotation={battle?.team2[0].rotation as number[]}
                        scale={battle?.team2[0].scale as number[]}
                      />
                      :
                      null
                    }
                  </>
                ) : (
                  null
                )
              }
            </Camera>
          ) : (
            null
          )
        }
      </Canvas>
    </div>
  );
};

export default Battle;
