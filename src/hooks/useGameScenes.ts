import { useState, useCallback } from 'react';
import { GAME_CONFIG } from '../config/gameConfig';

export const useGameScene = () => {
  const [targetX, setTargetX] = useState<number | null>(null);

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    
    if (clickY >= GAME_CONFIG.WALK_PATH_Y) {
      setTargetX(e.clientX - rect.left);
    }
  }, []);

  return { handleClick, targetX };
};