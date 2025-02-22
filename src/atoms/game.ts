// Packages
import { atom, RecoilState } from 'recoil'

// Types
import GameType from '../types/game';

const gameState: RecoilState<GameType> = atom({
  key: 'game',
  default: {} as GameType,
});

export default gameState;
