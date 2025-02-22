import Move from "./move";

interface Pokemon {
  pokemonName: string;
  currentLV: number;
  currentHP: number;
  maximumHP: number;
  attack: number;
  defense: number;
  position: number[];
  rotation: number[];
  scale: number[];
  currentAnimation: string;
  moves: MoveType[];
};

export default Pokemon;
