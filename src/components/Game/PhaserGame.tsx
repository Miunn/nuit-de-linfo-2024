import React, { useEffect, useRef } from 'react';
import { Game } from 'phaser';
import { gameConfig } from '../../game/config';

export const PhaserGame = React.forwardRef<HTMLDivElement>((_props, ref) => {
  const gameRef = useRef<Game | null>(null);

  useEffect(() => {
    if (!gameRef.current) {
      gameRef.current = new Game(gameConfig);
    }

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, []);

  return <div ref={ref} id="game-container" className="rounded-lg overflow-hidden shadow-xl max-w-3xl max-h-3xl" />;
});