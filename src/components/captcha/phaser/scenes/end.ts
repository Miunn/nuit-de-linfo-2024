import Phaser from "phaser";
import { EventBus } from "../eventbus";

export default class End extends Phaser.Scene {

  pass: boolean = false
  valid: Phaser.GameObjects.Text | null = null
  constructor() {
    super("END")
  }

  create() {
    this.add.text(100, 100, "FINI")
    this.valid = this.add.text(100, 200, "You didn't passed")
    EventBus.on("valid", (data: boolean) => {
      this.pass = data
    })
  }

  update() {
    this.valid?.setText(this.pass ? "You passed !" : "If you are not a bot, try again")
  }
} 
