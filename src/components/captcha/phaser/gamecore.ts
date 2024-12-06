import Phaser from "phaser";
import MainScene from "./scenes/mainscene";
import End from "./scenes/end";
import WaitC from "./scenes/wait";

export default class GameCore extends Phaser.Game {

  private static default_conf: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    scale: {
      mode: Phaser.Scale.FIT,
      width: 650,
      height: 600,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      //parent: "game-container"
    },

    backgroundColor: '#000000',
    scene: [
      WaitC,
      MainScene,
      End
    ]
  }

  positons: { timestamp: number, x: number, y: number }[] = []

  constructor(parent: string) {
    super({ ...GameCore.default_conf, parent })
    //this.scene.start("END")
  }

  /*public game() {
    this.scene.run("MainScene")
  }*/
}
