// Packages
import { useEffect } from 'react';
import { SetterOrUpdater, useRecoilState } from 'recoil';

// States
import gameState from '../atoms/game';

// Types
import GameType from '../types/game';
import BGMType from '../types/props/sound/bgm';

const useSetBGM = (bgmName: string) => {
  // State
  const [game, setGame]: [GameType ,SetterOrUpdater<GameType>] = useRecoilState<GameType>(gameState);

  useEffect((): void => {
    // Initializes BGM sounds
    const newBGM: BGMType[] = [
      {
        bgmName: 'Title',
        isPlayed: false
      },
      {
        bgmName: 'Battle',
        isPlayed: false
      },
    ];

    // Stops all BGM sounds then plays the one passed as props
    newBGM.forEach((n: BGMType) => {
      if (n.bgmName === bgmName) {
        n.isPlayed = true;
      } else {
        n.isPlayed = false;
      };
    });

    // Sets all the new BGM list to the game global state
    setGame({...game, bgm: newBGM});
    
  }, [setGame]);

  return game;
}

export default useSetBGM;
