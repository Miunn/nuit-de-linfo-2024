import Phaser from "phaser";
import { EventBus } from "../eventbus";

export default class WaitC extends Phaser.Scene {
  constructor() {
    super("WAIT")
  }

  create() {
    EventBus.on("rdy", (data: any) => {
      if (this.scene)
        this.scene.start("MainScene")
    })
    this.add.text(100, 100, "WAIT")

  }
}
