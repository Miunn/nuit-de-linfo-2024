import { Types } from 'phaser';
import { BeachLeft } from './scenes/BeachLeft';
import { GAME_CONFIG } from '../config/gameConfig';
import { BeachRight } from './scenes/BeachRight';
import { LiverGame } from './scenes/LiverGame';

export const gameConfig: Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'game-container',
  //width: GAME_CONFIG.SCENE_WIDTH,
  //height: GAME_CONFIG.SCENE_HEIGHT,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    //parent: 'game-container',
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
  scene: [BeachLeft, BeachRight, LiverGame]
};