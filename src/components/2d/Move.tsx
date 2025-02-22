// Packages
import { FC } from 'react';
import { SetterOrUpdater, useSetRecoilState } from 'recoil';

// States
import battleState from '../../atoms/battle';
import gameState from '../../atoms/game';

// Types
import MovePropsType from '../../types/props/2d/move';
import BattleType from '../../types/battle';
import GameType from '../../types/game';
import MoveType from '../../types/move';
import PokemonType from '../../types/pokemon';

const Move: FC<MovePropsType> = (props: MovePropsType) => {
  // Props
  const { move, battle, game }: MovePropsType = props;

  // States
  const setBattle: SetterOrUpdater<BattleType> = useSetRecoilState<BattleType>(battleState);
  const setGame: SetterOrUpdater<GameType> = useSetRecoilState<GameType>(gameState);

  // Functions
  const useMove = (): void => {
    // Initializes a new SFX sound
    let audio: HTMLAudioElement  = new Audio('sfx/Ok.wav');

    // Checks if the SFX are enabled in the game global state
    if (game.enableSFX) {
      audio.play();
    }

    // Copies Pokemon and their teams
    let newTeam1: PokemonType[] = [...battle.team1];
    let newSquirtle: PokemonType = {...battle.team1[0]};
    let newTeam2: PokemonType[] = [...battle.team2];
    let newOnix: PokemonType = {...battle.team2[0]};

    // Selects a random move for Onix
    const onixMove: MoveType = newOnix.moves[Math.floor(Math.random() * 2)];

    // Creates a random damages number based on Squirtle properties
    const squirtleDamages: number = Math.floor(move.damages + newSquirtle.attack - newOnix.defense);
    console.log(squirtleDamages);
    // Creates a random damages number based on Onix properties
    const onixDamages: number = Math.floor(onixMove.damages + newOnix.attack - newSquirtle.defense);
    console.log(onixDamages);

    setBattle({
      ...battle,
      enableUI: false,
    });

    // All the followings timeouts are here for the user experience, to simulate a "real" Pokémon battle
    setTimeout((): void => {
      // Playing the audio sound of the Squirtle move depending of the move name
      audio = new Audio(`sfx/${move.moveName.replace(/ /g,'')}.wav`);
  
      // Checks if the SFX are enabled in the game global state
      if (game.enableSFX) {
        audio.play();
      }

      // Takes Squirtle damages to Onix HP then plays Squirtle attack animation
      newOnix.currentHP -= squirtleDamages;
      newTeam2[0] = {...newOnix, currentAnimation: 'OnixStance'};
      newTeam1[0] = {...newSquirtle, currentAnimation: 'SquirtleAttack'};

      // Checks Onix current HP then fixing it to 0 if its going under 0
      {
        (
          newOnix.currentHP < 0
        ) ? (
          newOnix.currentHP = 0
        ) : (
          newOnix.currentHP
        )
      }

      // Sets both of the teams with the Pokémon with new properties, currentHP and currentAnimation in this case
      setBattle({
        ...battle,
        enableUI: false,
        team1: [...newTeam1],
        team2: [...newTeam2]
      });
    }, 500);

    setTimeout((): void => {
      newTeam1[0] = {...newSquirtle, currentAnimation: 'SquirtleStance'};

      setBattle({
        ...battle,
        textBox: `Squirtle used ${move.moveName}!`,
        enableUI: false,
        team1: [...newTeam1],
        team2: [...newTeam2]
      });
    }, 2100);

    setTimeout((): void => {
      setBattle({
        ...battle,
        textBox: '',
        enableUI: false,
        team1: [...newTeam1],
        team2: [...newTeam2]
      });
    }, 4100);

    setTimeout((): void => {
      // Playing the audio sound of the Onix move depending of the move name
      audio = new Audio(`sfx/${onixMove.moveName.replace(/ /g,'')}.wav`);
  
      // Checks if the SFX are enabled in the game global state
      if (game.enableSFX) {
        audio.play();
      }

      // Takes Onix damages to Squirtle HP then plays Onix attack animation
      newSquirtle.currentHP -= onixDamages;
      newTeam1[0] = {...newSquirtle, currentAnimation: 'SquirtleStance'};
      newTeam2[0] = {...newOnix, currentAnimation: 'OnixAttack'};

      // Checks Squirtle current HP then fixing it to 0 if its going under 0
      {
        (
          newSquirtle.currentHP < 0
        ) ? (
          newSquirtle.currentHP = 0
        ) : (
          newSquirtle.currentHP
        )
      }

      // Sets both of the teams with the Pokémon with new properties, currentHP and currentAnimation in this case
      setBattle({
        ...battle,
        enableUI: false,
        team1: [...newTeam1],
        team2: [...newTeam2]
      });
    }, 4600);

    setTimeout((): void => {
      newTeam2[0] = {...newOnix, currentAnimation: 'OnixStance'};

      setBattle({
        ...battle,
        textBox: `Onix used ${onixMove.moveName}!`,
        enableUI: false,
        team1: [...newTeam1],
        team2: [...newTeam2]
      });
    }, 6200);

    setTimeout((): void => {
      setBattle({
        ...battle,
        textBox: '',
        enableUI: false,
        team1: [...newTeam1],
        team2: [...newTeam2]
      });
    }, 8200);

    setTimeout((): void => {
      if (newOnix.currentHP === 0) {
        setBattle({
          ...battle,
          textBox: 'You win!',
          enableUI: false,
          team1: [...newTeam1],
          team2: [...newTeam2]
        });

        setTimeout((): void => {
          setGame({...game, currentScreen: 'Title'});
        }, 2000);
      } else if (newSquirtle.currentHP === 0) {
        setBattle({
          ...battle,
          textBox: 'You win!',
          enableUI: false,
          team1: [...newTeam1],
          team2: [...newTeam2]
        });

        setTimeout((): void => {
          setGame({...game, currentScreen: 'Title'});
        }, 2000);
      } else {
        setBattle({
          ...battle,
          textBox: '',
          enableUI: true,
          team1: [...newTeam1],
          team2: [...newTeam2]
        });
      }
    }, 8700);
  }
  
  return (
    <button onClick={useMove} className='bg-gradient-to-r from-cyan-400 to-green-400 shadow-xl shadow-green-400/50 rounded-xl ring-4 ring-cyan-400/50 border-2 border-white md:w-64 w-48 p-2 text-sm font-semibold drop-shadow hover:scale-105 duration-100'>
      <p>{move.moveName}</p>
    </button>
  );
};

export default Move;
