import { Prompt } from '@/components/Game/Prompt';
import { GAME_CONFIG } from '@/config/gameConfig';
import { Scene, GameObjects, Input } from 'phaser';

export class BeachLeft extends Scene {
  private readonly SCENE_TRANSITION_THRESHOLD = 70;
  private player!: GameObjects.Sprite;
  private items: GameObjects.Sprite[] = [];
  private prompt!: Prompt;
  private isMoving = false;
  private targetX = 0;
  private gameData: number[] = [];
  private gameEnded = false;

  constructor() {
    super({ key: 'BeachLeft' });
  }

  init(data: number | undefined) {
    if (data) {

    }
  }

  preload() {
    this.load.image('background_left', './assets/sunny_beach_left.png');
    this.load.spritesheet('character',
      'https://labs.phaser.io/assets/sprites/dude.png',
      { frameWidth: 32, frameHeight: 48 }
    );
    this.load.image('liver','./assets/liver.png');
    this.load.image('lung','./assets/breathe.webp');
    this.load.image('heart','./assets/heart.png');
    this.load.image('sign_right', './assets/arrow_right.png');
  }

  init(data?: { id: number }) {
    if(data) {this.gameData.push(data.id);}
  }

  create() {

    this.add.image(GAME_CONFIG.SCENE_WIDTH / 2, GAME_CONFIG.SCENE_HEIGHT / 2, 'background_left')
      .setDisplaySize(GAME_CONFIG.SCENE_WIDTH, GAME_CONFIG.SCENE_HEIGHT);

    this.player = this.add.sprite(100, GAME_CONFIG.WALK_PATH_Y, 'character')
    .setScale(2.5)
    .setDepth(2);

    this.add.image(GAME_CONFIG.SCENE_WIDTH - 100, GAME_CONFIG.WALK_PATH_Y, 'sign_right').setDisplaySize(250, 250).setDepth(1);

    const itemsConfig = GAME_CONFIG.ITEMS.filter(item => 
      item.location === "beach_left" && !this.gameData.includes(item.id)
    );

    itemsConfig.forEach(config => {
      const item = this.add.sprite(config.x, config.y, config.icon)
        .setData('message', config.message)
        .setData('scene', config.scene)
        .setDisplaySize(80, 80);
      item.setInteractive();
      item.on('pointerdown', (pointer: Input.Pointer) => {
      pointer.event.stopPropagation();
      this.prompt.show(item.getData('message'));
      const itemScene = item.getData('scene');
      this.time.delayedCall(2000, () => {
        this.scene.start(itemScene);
      });
      item.destroy();
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

      if (this.player.x >= GAME_CONFIG.SCENE_WIDTH - this.SCENE_TRANSITION_THRESHOLD) {
        this.transitionToRightBeach();
        return;
      }

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

    if (this.gameData.includes(1) && this.gameData.includes(2) && this.gameData.includes(3) && !this.gameEnded) {
      //TODO: CONFETTI
      this.gameEnded = true;
      this.prompt.show('Félicitations ! Vous avez terminé le jeu !');
    }
  }

  private transitionToRightBeach() {
    this.cameras.main.fadeOut(500);
    this.time.delayedCall(500, () => {
      this.scene.start('BeachRight', {
        x: this.player.x <= this.SCENE_TRANSITION_THRESHOLD ?
          GAME_CONFIG.SCENE_WIDTH - this.SCENE_TRANSITION_THRESHOLD :
          this.SCENE_TRANSITION_THRESHOLD,
          id: this.gameData
      });
    });
  }
}
