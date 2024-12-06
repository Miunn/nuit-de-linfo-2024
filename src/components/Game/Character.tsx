import React from 'react';
import { useCharacterMovement } from '../../hooks/useCharacterMovement';
import { GAME_CONFIG } from '../../config/gameConfig';

interface CharacterProps {
  targetX: number | null;
}

export const Character: React.FC<CharacterProps> = ({ targetX }) => {
  const { position, direction } = useCharacterMovement(targetX);

  return (
    <div
      className="absolute transition-transform"
      style={{
        transform: `translate(${position.x}px, ${GAME_CONFIG.WALK_PATH_Y}px)`,
      }}
    >
      <div 
        className={`w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center
          ${direction === 'right' ? 'scale-x-1' : 'scale-x-[-1]'}`}
      >
        <span className="text-white">👤</span>
      </div>
    </div>
  );
};