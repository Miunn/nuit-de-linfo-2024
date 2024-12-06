import { Prompt } from '@/components/Game/Prompt';
import { GAME_CONFIG } from '@/config/gameConfig';
import { Scene, GameObjects, Input } from 'phaser';

export class BeachLeft extends Scene {
  private player!: GameObjects.Sprite;
  private items: GameObjects.Sprite[] = [];
  private prompt!: Prompt;
  private isMoving = false;
  private targetX = 0;
  private itemsCollected = 0;

  constructor() {
    super({ key: 'BeachLeft' });
  }

  preload() {
    this.load.image('background', './assets/sunny_beach.png');
    this.load.spritesheet('character', 
      'https://labs.phaser.io/assets/sprites/dude.png',
      { frameWidth: 32, frameHeight: 48 }
    );
    this.load.image('item', 
      'https://labs.phaser.io/assets/sprites/star.png'
    );
  }

  create() {

    this.add.image(GAME_CONFIG.SCENE_WIDTH / 2, GAME_CONFIG.SCENE_HEIGHT / 2, 'background')
    .setDisplaySize(GAME_CONFIG.SCENE_WIDTH, GAME_CONFIG.SCENE_HEIGHT);

    this.player = this.add.sprite(100, GAME_CONFIG.WALK_PATH_Y, 'character');
    this.player.setScale(2.5);

    const itemsConfig = GAME_CONFIG.ITEMS.filter(item => item.location === "beach_left");

    itemsConfig.forEach(config => {
      const item = this.add.sprite(config.x, config.y, 'item');
      item.setInteractive();
      item.setData('message', config.message);
      item.on('pointerdown', (pointer: Input.Pointer) => {
      pointer.event.stopPropagation();
      this.prompt.show(config.message);
      item.destroy();
      this.itemsCollected++;
      });
      this.items.push(item);
    });

    this.prompt = new Prompt(this);

    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers('character', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.input.on('pointerdown', (pointer: Input.Pointer) => {
      if (pointer.event.target !== this.game.canvas) return;
      
      this.targetX = pointer.x;
      this.isMoving = true;

      if (this.targetX < this.player.x) {
        this.player.setFlipX(false);
      } else {
        this.player.setFlipX(true);
      }
    });
  }

  update() {
    if (this.isMoving) {
      const distance = this.targetX - this.player.x;
      const direction = Math.sign(distance);
      const speed = GAME_CONFIG.CHARACTER_SPEED;
      
      if (Math.abs(distance) < 5) {
        this.player.x = this.targetX;
        this.isMoving = false;
        this.player.anims.stop();
        this.player.setFrame(4);
      } else {
        this.player.x += direction * (speed / 60);
        this.player.play('walk', true);
      }
    }
  }
}