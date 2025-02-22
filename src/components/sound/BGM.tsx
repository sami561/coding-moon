// Game
import { FC, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import useSound from 'use-sound';
import { ReturnedValue } from 'use-sound/dist/types';

// States
import gameState from '../../atoms/game';

// Types
import BGMType from '../../types/props/sound/bgm';
import GameType from '../../types/game';

const BGM: FC<BGMType> = (props: BGMType) => {
  // Props
  const { bgmName, isPlayed }: BGMType = props;

  // States
  const game: GameType = useRecoilValue<GameType>(gameState);

  // Initializes BGM sound
  const [play, {stop}]: ReturnedValue = useSound(`bgm/${bgmName}.wav`, { volume: 0.5, interrupt: true });

  // Hooks
  useEffect((): void => {
    {
      (
        game.enableBGM && isPlayed
      ) ? (
        play()
      ) : (
        stop()
      )
    }
  }, [isPlayed, game.enableBGM, play, stop]);

  // Doesn't need to return anything
  return null;
}

export default BGM;
