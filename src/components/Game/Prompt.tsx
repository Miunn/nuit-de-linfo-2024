import { Scene, GameObjects } from 'phaser';

export class Prompt extends GameObjects.Container {
  private readonly PROMPT_HEIGHT = 100;
  private readonly PROMPT_WIDTH = 600;
  private readonly PROMPT_Y = -this.PROMPT_HEIGHT / 2;
  private readonly PROMPT_FINAL_Y = this.PROMPT_HEIGHT / 2;
  private readonly BORDER_SIZE = 6;
  private background: GameObjects.Rectangle;
  private border: GameObjects.Rectangle;
  private text: GameObjects.Text;

  constructor(scene: Scene) {
    super(scene, 0, 0);
    scene.add.existing(this);

    this.border = scene.add.rectangle(
      scene.scale.width / 2,
      this.PROMPT_Y,
      this.PROMPT_WIDTH + this.BORDER_SIZE * 2,
      this.PROMPT_HEIGHT + this.BORDER_SIZE * 2,
      0x593D29
    );

    this.background = scene.add.rectangle(
      scene.scale.width / 2,
      this.PROMPT_Y,
      this.PROMPT_WIDTH,
      this.PROMPT_HEIGHT,
      0xFFFFF0
    );

    this.text = scene.add.text(
      scene.scale.width / 2,
      this.PROMPT_Y,
      '',
      {
        fontSize: 24,
        color: '#2A2A2A',
        align: 'center',
        wordWrap: { width: this.PROMPT_WIDTH - 20 }
      }
    ).setOrigin(0.5);

    this.setDepth(1000);
    this.border.setDepth(1000);
    this.background.setDepth(1001);
    this.text.setDepth(1003);

    this.setVisible(false);
  }

  show(message: string) {
    this.text.setText(message);
    this.setVisible(true);
    this.border.setVisible(true);
    this.background.setVisible(true);
    this.text.setVisible(true);

    this.scene.tweens.add({
      targets: [this.border, this.background, this.text],
      y: this.PROMPT_FINAL_Y,
      duration: 300,
      ease: 'Back.easeOut',
      onComplete: () => {
        this.scene.time.delayedCall(3000, () => this.hide());
      }
    });
  }

  private hide() {
    this.scene.tweens.add({
      targets: [this.border, this.background, this.text],
      y: this.PROMPT_Y,
      duration: 300,
      ease: 'Back.easeIn',
      onComplete: () => {
        this.setVisible(false);
        this.border.setVisible(false);
        this.background.setVisible(false);
        this.text.setVisible(false);
      }
    });
  }
}