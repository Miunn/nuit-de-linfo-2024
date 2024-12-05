import { Types } from 'phaser';
import { Scene1 } from './scenes/Scene1';
import { GAME_CONFIG } from '../config/gameConfig';

export const gameConfig: Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'game-container',
  width: GAME_CONFIG.SCENE_WIDTH,
  height: GAME_CONFIG.SCENE_HEIGHT,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    parent: 'game-container',
    width: GAME_CONFIG.SCENE_WIDTH,
    height: GAME_CONFIG.SCENE_HEIGHT,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: false
    }
  },
  scene: [Scene1]
};