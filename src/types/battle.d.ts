// Types
import PokemonType from './pokemon';

interface Battle {
  textBox: string;
  enableUI: boolean;
  camera: {
    enableRotate: boolean;
    position: number[];
    rotation: number[];
  }
  team1: PokemonType[];
  team2: PokemonType[];
};

export default Battle;
