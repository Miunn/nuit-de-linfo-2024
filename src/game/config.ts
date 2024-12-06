import { Types } from 'phaser';
import { BeachLeft } from './scenes/BeachLeft';
import { GAME_CONFIG } from '../config/gameConfig';
import { BeachRight } from './scenes/BeachRight';
import { LiverGame } from './scenes/LiverGame';
import { HeartGame } from './scenes/HeartGame';
import LungGame from './scenes/LungGame';
import { Context1 } from './scenes/Context1';
import { Context2 } from './scenes/Context2';
import { Context3 } from './scenes/Context3';
import { Context4 } from './scenes/Context4';

export const gameConfig: Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'game-container',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: GAME_CONFIG.SCENE_WIDTH,
    height: GAME_CONFIG.SCENE_HEIGHT,
    min: {
      width: 800,
      height: 600
    }
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: false
    }
  },
  scene: [Context1, Context2, Context3, Context4, BeachLeft, BeachRight, LiverGame, LungGame, HeartGame]
};
