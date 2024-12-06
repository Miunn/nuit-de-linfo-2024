import Phaser from "phaser";
import { EventBus } from "../eventbus";

export default class End extends Phaser.Scene {

  pass: boolean | undefined = undefined
  valid: Phaser.GameObjects.Text | null = null

  retry: Phaser.GameObjects.Rectangle | null = null
  retry_text: Phaser.GameObjects.Text | null = null
  constructor() {
    super("END")
  }

  create() {
    this.add.image(200, 325, "bg")
    this.add.text(325, 100, "Terminé !", {
      fontFamily: 'Arial Black', fontSize: 45, color: '#ffffff',
      stroke: '#000000', strokeThickness: 8,
      align: 'center'
    }).setOrigin(0.5)

    this.add.image(325, 275, "scroll").setScale(1, 0.67)

    this.valid = this.add.text(325, 270, "Ton score est trop faible !\nréésaie !",
      {
        fontFamily: 'Arial Black', fontSize: 30, color: '#000000',
        align: 'center'
      }
    ).setOrigin(0.5)

    this.retry = this.add.rectangle(325, 500, 400, 100, 0xff9900).setInteractive().on("pointerdown", () => {
      this.scene.start("WAIT")
      console.log("GO")
    }, this)
    this.retry_text = this.add.text(325, 500, "Réésayer", {
      fontFamily: 'Arial Black', fontSize: 45, color: '#000000',
      align: 'center'
    }).setOrigin(0.5)


    EventBus.on("valid", (data: boolean) => {
      this.pass = data
    })
  }

  update() {
    this.valid?.setText(this.pass === undefined ? "Ton score est trop faible !\n\nréésaie !" : (this.pass ? "Bien joué!\n\nLe captcha est validé." : "Aïe, il semblerait que\ntu sois un robot..."))

    if (this.pass) {
      this.retry?.setAlpha(0)
      this.retry_text?.setAlpha(0)
    } else {
      this.retry?.setAlpha(1)
      this.retry_text?.setAlpha(1)
    }
  }

  preload() {
    this.load.image("bg", "assets/bg_cap.png")
    this.load.image("scroll", "assets/scroll.webp")
  }
} 
