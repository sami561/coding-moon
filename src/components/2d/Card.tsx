// Packages
import { FC } from 'react';

// Types
import CardType from '../../types/props/2d/card';

const Card: FC<CardType> = (props: CardType) => {
  // Props
  const { pokemon, team } = props;

  return (
    <div className={`flex flex-col ${team === 2 ? 'ml-auto' : 'mr-auto'} bg-gradient-to-b from-cyan-400 to-green-400 shadow-xl shadow-green-400/50 rounded-xl ring-2 ring-cyan-400/50 md:w-64 w-48 h-24 px-4 py-3 space-y-0.5 text-white font-bold drop-shadow`}>
      <p className='flex items-center mb-2'>
        <span className='text-md'>{pokemon.pokemonName}</span>
        <span className='ml-auto text-sm'>Lv.{pokemon.currentLV}</span>
      </p>
      <div className='flex'>
        {/* The HP bar changes depending on Pokemon current HP */}
        <span style={{width: `${Math.round(pokemon.currentHP * 100 / pokemon.maximumHP)}%`}} className='bg-gradient-to-r from-green-400 to-yellow-400 shadow shadow-neutral-900 ring-2 ring-neutral-900 h-2 mb-2'></span>
        <span style={{width: `${Math.round((pokemon.maximumHP - pokemon.currentHP) * 100 / pokemon.maximumHP)}%`}} className='bg-neutral-900 shadow shadow-neutral-900 ring-2 ring-neutral-900 h-2 mb-2'></span>
      </div>
      <p className='text-sm'>{pokemon.currentHP}/{pokemon.maximumHP}</p>
    </div>
  );
};

export default Card;
