import Phaser from "phaser";
import { EventBus } from "../eventbus";

export default class WaitC extends Phaser.Scene {
  constructor() {
    super("WAIT")
  }

  create() {
    this.add.image(200, 325, "bg")
    this.add.text(325, 75, "Captcha'ttrape les dechets", {
      fontFamily: 'Arial Black', fontSize: 40, color: '#ffffff',
      stroke: '#000000', strokeThickness: 8,
      align: 'center'
    }).setOrigin(0.5)

    this.add.rectangle(325, 500, 400, 100, 0xff9900).setInteractive().on("pointerdown", () => {
      this.scene.start("MainScene")
      console.log("GO")
    }, this)
    this.add.text(325, 500, "C'est Parti !", {
      fontFamily: 'Arial Black', fontSize: 45, color: '#000000',
      align: 'center'
    }).setOrigin(0.5)

    this.add.image(325, 275, "scroll").setScale(1, 0.67)
    this.add.text(
      325,
      275,
      "Tu dois trier les dechets des\nchoses qui vont dans l'eau.\n\nGlisse vers la gauche les objets\nqui vont dans la mer\n\nGlisse vers la droite les objets\nqui vont dans la poubelle",
      {
        fontFamily: 'Arial Black', fontSize: 22, color: '#000000',
        align: 'center'
      }
    ).setOrigin(0.5)

  }

  preload() {
    this.load.image("bg", "assets/bg_cap.png")
    this.load.image("scroll", "assets/scroll.webp")
  }
}
