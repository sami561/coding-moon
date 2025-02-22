// Packages
import { atom, RecoilState } from 'recoil'

// Types
import BattleType from '../types/battle';

const battleState: RecoilState<BattleType> = atom({
  key: 'battle',
  default: {} as BattleType,
});

export default battleState;
