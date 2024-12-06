import { Prompt } from '@/components/Game/Prompt';
import { GAME_CONFIG } from '@/config/gameConfig';
import { Scene, GameObjects, Input } from 'phaser';

export class LiverGame extends Scene {
    private itemsCollected!: number;
    

    constructor() {
        super({ key: 'HeartGame' });
    }

    preload() {
        this.load.image('sea_background', 'assets/sea_background.png');
        this.load.image('boss_shark', 'assets/boss_shark.png');
        this.load.spritesheet('character', 
            'https://labs.phaser.io/assets/sprites/dude.png',
            { frameWidth: 32, frameHeight: 48 }
          );
    }

    create() {

    }

    update() {

    }
}