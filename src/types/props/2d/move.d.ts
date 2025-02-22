// Types
import BattleType from '../../battle';
import GameType from '../../game';
import MoveType from '../../move';

interface Move {
  move: MoveType;
  battle: BattleType;
  game: GameType;
};

export default Move;
