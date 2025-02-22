// Packages
import { FC } from 'react';
import { SetterOrUpdater, useSetRecoilState } from 'recoil';

// States
import gameState from '../../atoms/game';

// Types
import SettingsType from '../../types/props/2d/settings';
import GameType from '../../types/game';

const Settings: FC<SettingsType> = (props: SettingsType) => {
  // Props
  const { game }: SettingsType = props;

  // States
  const setGame: SetterOrUpdater<GameType> = useSetRecoilState<GameType>(gameState);

   // Functions
  const toggleBGM = (): void => {
    const newGame: GameType = {...game, enableBGM: !game.enableBGM};

    // Toggles the post processing of the game global state
    setGame(newGame);
  };

  const toggleSFX = (): void => {
    const newGame: GameType = {...game, enableSFX: !game.enableSFX};

    // Toggles the post processing of the game global state
    setGame(newGame);
  };

  // Functions
  const togglePostProcessing = (): void => {
    const newGame: GameType = {...game, enablePostProcessing: !game.enablePostProcessing};

    // Toggles the post processing of the game global state
    setGame(newGame);
  };

  const toggleShadows = (): void => {
    const newGame: GameType = {...game, enableShadows: !game.enableShadows};

    // Toggles the shadows of the game global state
    setGame(newGame);
  };

  return (
    <div className='absolute bottom-0 z-50'>
      <div className='flex p-8'>
        <div className='mt-auto space-y-2 text-xs text-white drop-shadow'>
          <button onClick={toggleBGM} className='flex items-center space-x-2'>
            <span className='bg-black rounded shadow shadow-black/50 h-4 w-4'>
              {
                (
                  game && game.enableBGM
                ) ? (
                  <span>X</span>
                ) : (
                  null
                )
              }
            </span>
            <span>Music</span>
          </button>
          <button onClick={toggleSFX} className='flex items-center space-x-2'>
            <span className='bg-black rounded shadow shadow-black/50 h-4 w-4'>
              {
                (
                  game && game.enableSFX
                ) ? (
                  <span>X</span>
                ) : (
                  null
                )
              }
            </span>
            <span>Sounds</span>
          </button>
          <button onClick={togglePostProcessing} className='flex items-center space-x-2'>
            <span className='bg-black rounded shadow shadow-black/50 h-4 w-4'>
              {
                (
                  game && game.enablePostProcessing
                ) ? (
                  <span>X</span>
                ) : (
                  null
                )
              }
            </span>
            <span>Post-Processing</span>
          </button>
          <button onClick={toggleShadows} className='flex items-center space-x-2'>
            <span className='bg-black rounded shadow shadow-black/50 h-4 w-4'>
            {
              (
                game && game.enableShadows
              ) ? (
                <span>X</span>
              ) : (
                null
              )
            }
            </span>
            <span>Shadows</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
