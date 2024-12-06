import { GAME_CONFIG } from "@/config/gameConfig"

export default class LungGame extends Phaser.Scene {
  last: number = Date.now()

  circle_list: Phaser.GameObjects.Arc[] = []
  constructor() {
    super("LungGame")
  }

  create() {
    this.add.image(GAME_CONFIG.SCENE_WIDTH / 2, GAME_CONFIG.SCENE_HEIGHT / 2, "bg").setScale(0.5, 0.5)
    this.add.circle(GAME_CONFIG.SCENE_WIDTH / 2, GAME_CONFIG.SCENE_HEIGHT / 2, 100, 0xeeeeee, 0.7)
    this.add.image(GAME_CONFIG.SCENE_WIDTH / 2, GAME_CONFIG.SCENE_HEIGHT / 2, "mouse_click").setScale(0.4, 0.4)
    this.generateNewCircle()

    this.input.on("mouse_click", this.tempo, this)
  }

  generateNewCircle() {
    this.circle_list.push(this.add.circle(GAME_CONFIG.SCENE_WIDTH / 2, GAME_CONFIG.SCENE_HEIGHT / 2, GAME_CONFIG.SCENE_WIDTH / 2 + 100)
      .setStrokeStyle(10, 0xff00ff)
      .setData({ "time": 750 })
    )
  }

  preload() {
    this.load.image("mouse_click", "assets/mouse_click.webp")
    this.load.image("bg", "assets/mines_background.png")
  }

  update() {
    for (let i = 0; i < this.circle_list.length; i++) {
      this.circle_list[i].data.values.time -= 16
      const new_rad = (GAME_CONFIG.SCENE_WIDTH / 2) * (this.circle_list[i].data.values.time / 750) + 100
      if (new_rad < 100) {
        this.circle_list[i].destroy()
        this.circle_list.splice(i, 1)

      } else {
        this.circle_list[i].setRadius(new_rad)
      }

    }
  }

  tempo() {

  }


}
