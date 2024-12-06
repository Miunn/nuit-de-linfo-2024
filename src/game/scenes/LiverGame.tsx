import { Prompt } from '@/components/Game/Prompt';
import { GAME_CONFIG } from '@/config/gameConfig';
import { Scene, GameObjects, Input } from 'phaser';

export class LiverGame extends Scene {
    private prompt!: Prompt;
    private goodObjectsCount = 6;
    private badObjectsCount = 10;
    private badObjectsRemoved = 0;
    private goodTextures = ['good_object', 'good_object2'];
    private badTextures = ['bad_object', 'bad_object2'];

    constructor() {
        super({ key: 'LiverGame' });
    }

    preload() {
        this.load.image('liver_background', './assets/fish_background.png');
        this.load.image('good_object', './assets/good_object.png');
        this.load.image('good_object2', './assets/good_object2.webp');
        this.load.image('bad_object', 'assets/bad_object.png');
        this.load.image('bad_object2', './assets/bad_object2.png');
        this.load.image('coral', './assets/coral.png');

    }

    create() {
        this.add.image(GAME_CONFIG.SCENE_WIDTH / 2, GAME_CONFIG.SCENE_HEIGHT / 2, 'liver_background')
            .setDisplaySize(GAME_CONFIG.SCENE_WIDTH, GAME_CONFIG.SCENE_HEIGHT);
        this.prompt = new Prompt(this);

        for(let i = 0; i < this.goodObjectsCount; i++) {
            
            const randomGoodTexture = this.goodTextures[Math.floor(Math.random() * this.goodTextures.length)];
            const goodObject = this.add.sprite(
                Phaser.Math.Between(100, GAME_CONFIG.SCENE_WIDTH - 100),
                Phaser.Math.Between(100, GAME_CONFIG.SCENE_HEIGHT - 100),
                randomGoodTexture
            ).setDisplaySize(90, 90);
            goodObject.setData('type', 'good');
            goodObject.setInteractive();
            goodObject.on('pointerdown', (pointer: Input.Pointer) => {
                pointer.event.stopPropagation();
                this.removeObject(goodObject);
            });
        }

        for(let i = 0; i < this.badObjectsCount; i++) {
            const randomBadTexture = this.badTextures[Math.floor(Math.random() * this.badTextures.length)];
            const badObject = this.add.sprite(
                Phaser.Math.Between(100, GAME_CONFIG.SCENE_WIDTH - 100),
                Phaser.Math.Between(100, GAME_CONFIG.SCENE_HEIGHT - 100),
                randomBadTexture
            ).setDisplaySize(90, 90);
            badObject.setData('type', 'bad');
            badObject.setInteractive();
            badObject.on('pointerdown', (pointer: Input.Pointer) => {
                pointer.event.stopPropagation();
                this.removeObject(badObject);
                this.add.sprite(
                    Phaser.Math.Between(100, GAME_CONFIG.SCENE_WIDTH - 100),
                    GAME_CONFIG.SCENE_HEIGHT - 100,
                    'coral'
                ).setDisplaySize(80, 100);
            });
        }
    }

    update() {
        if (this.badObjectsRemoved === this.badObjectsCount) {
            this.prompt.show('Merci ! Vous avez soigné mon foie !');
            this.time.delayedCall(2000, () => {
                this.scene.start("BeachLeft", { id: 1 });
            });
        }
    }

    private removeObject(object: GameObjects.Sprite) {
        if (object.getData('type') === 'bad') {
            object.destroy();
            this.badObjectsRemoved++;        
        }
        if (object.getData('type') === 'good') {
            object.destroy();
            const randomGoodTexture = this.goodTextures[Math.floor(Math.random() * this.goodTextures.length)];
            const goodObject = this.add.sprite(
                Phaser.Math.Between(100, GAME_CONFIG.SCENE_WIDTH - 100),
                Phaser.Math.Between(100, GAME_CONFIG.SCENE_HEIGHT - 100),
                randomGoodTexture
            ).setDisplaySize(90, 90);
            goodObject.setData('type', 'good');
            goodObject.setInteractive();
            goodObject.on('pointerdown', (pointer: Input.Pointer) => {
                pointer.event.stopPropagation();
                this.removeObject(goodObject);
            });
        }
    }
}