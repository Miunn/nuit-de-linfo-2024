import { useState, useEffect } from 'react';
import { GAME_CONFIG } from '../config/gameConfig';

interface Position {
  x: number;
}

export const useCharacterMovement = (targetX: number | null) => {
  const [position, setPosition] = useState<Position>({ x: GAME_CONFIG.INITIAL_X });
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  useEffect(() => {
    if (targetX === null) return;

    const moveToTarget = () => {
      const dx = targetX - position.x;
      if (Math.abs(dx) < GAME_CONFIG.CHARACTER_SPEED) return;

      const newX = position.x + Math.sign(dx) * GAME_CONFIG.CHARACTER_SPEED;
      setPosition({ x: newX });
      setDirection(dx > 0 ? 'right' : 'left');
    };

    const animationFrame = requestAnimationFrame(moveToTarget);
    return () => cancelAnimationFrame(animationFrame);
  }, [targetX, position.x]);

  return { position, direction };
};