import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { ShoppingCart, Coins } from 'lucide-react';
import { PokemonModel } from '../3d/PokemonModel';

interface ShopItemProps {
  name: string;
  price: number;
  color: string;
  userScore: number;
  onPurchase: () => void;
}

export function ShopCard({ name, price, color, userScore, onPurchase }: ShopItemProps) {
  const canAfford = userScore >= price;

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all opacity-80 duration-300 w-64">
      <div className="h-48 relative">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <PokemonModel position={[0, 0, 0]} color={color} />
          <OrbitControls enableZoom={false} />
        </Canvas>
      </div>

      <div className="p-1">
        <h3 className="text-xl font-bold text-purple-900 mb-2">{name}</h3>
        
        <div className="flex items-center gap-1 mb-4">
          <Coins className="w-5 h-5 text-yellow-500" />
          <span className="text-lg font-medium text-purple-700">{price} points</span>
        </div>

        <button
          onClick={onPurchase}
          disabled={!canAfford}
          className={`w-full py-3 px-1 rounded-xl flex items-center justify-center gap-2 font-medium transition-all duration-300
            ${canAfford 
              ? 'bg-purple-600 hover:bg-purple-500 text-white' 
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
        >
          <ShoppingCart className="w-5 h-5" />
          {canAfford ? 'Purchase' : 'Not enough points'}
        </button>
      </div>
    </div>
  );
}
export default ShopCard;