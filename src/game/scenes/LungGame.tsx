import { Prompt } from "@/components/Game/Prompt"
import { GAME_CONFIG } from "@/config/gameConfig"

export default class LungGame extends Phaser.Scene {
  prompt!: Prompt;

  last: number = Date.now()

  points = 0

  tint_timer = 0

  tint_color = 0xffffff

  nextwave = 1000

  scoreboard: Phaser.GameObjects.Text | null = null
  bg: Phaser.GameObjects.Image | null = null

  poumon: Phaser.GameObjects.Image | null = null

  circle_list: Phaser.GameObjects.Arc[] = []
  constructor() {
    super("LungGame")
  }

  create() {
    this.bg = this.add.image(GAME_CONFIG.SCENE_WIDTH / 2, GAME_CONFIG.SCENE_HEIGHT / 2, "bg").setScale(0.5, 0.5).setInteractive()
    this.poumon = this.add.image(GAME_CONFIG.SCENE_WIDTH / 2, GAME_CONFIG.SCENE_HEIGHT / 2 - 50, "breathe").setAlpha(0)
    this.add.circle(GAME_CONFIG.SCENE_WIDTH / 2, GAME_CONFIG.SCENE_HEIGHT / 2, 100, 0xeeeeee, 0.7)
    this.add.image(GAME_CONFIG.SCENE_WIDTH / 2, GAME_CONFIG.SCENE_HEIGHT / 2, "mouse_click").setScale(0.4, 0.4)
    this.scoreboard = this.add.text(GAME_CONFIG.SCENE_WIDTH / 2, 100, "" + this.points)

    this.input.on("pointerdown", this.tempo, this)
    this.prompt = new Prompt(this)
  }

  generateNewCircle() {
    this.circle_list.push(this.add.circle(GAME_CONFIG.SCENE_WIDTH / 2, GAME_CONFIG.SCENE_HEIGHT / 2, GAME_CONFIG.SCENE_WIDTH / 2 + 100)
      .setStrokeStyle(10, 0xffffff * Math.random(), 0.7)
      .setData({ "time": 750 })
    )
  }

  preload() {
    this.load.image("mouse_click", "assets/mouse_click.webp")
    this.load.image("bg", "assets/mines_background.png")
    this.load.image("breathe", "assets/breathe.webp")
  }

  update() {
    this.nextwave -= 16
    if (this.nextwave <= 0) {
      this.nextwave = 600 + Math.random() * 550
      this.generateNewCircle()
    }
    for (let i = 0; i < this.circle_list.length; i++) {
      this.circle_list[i].data.values.time -= 16
      const new_rad = (GAME_CONFIG.SCENE_WIDTH / 2) * (this.circle_list[i].data.values.time / 750) + 100
      if (new_rad < 90) {
        this.circle_list[i].destroy()
        this.circle_list.splice(i, 1)
        this.miss()
      } else {
        this.circle_list[i].setRadius(new_rad)
      }
    }
    this.scoreboard?.setText("" + this.points)
    if (this.tint_timer > 0) {
      //console.log(this.tint_timer)
      this.bg?.setTint(this.tint_color)
      this.tint_timer -= 16
      if (this.tint_color !== 0xffaaaa)
        this.poumon?.setAlpha(0.2)
    } else {
      this.bg?.setTint(0xffffff)
      this.poumon?.setAlpha(0)
    }

    if (this.points > 1000) {
      this.prompt.show('Merci ! Je peux enfin respirer !');
      this.time.delayedCall(2000, () => {
          this.scene.start("BeachLeft", { id: 2 });
      });
    }
  }

  perfect() {
    this.points += 50
    this.tint_color = 0xaaaaff
    this.tint_timer = 300
  }

  ok() {
    this.points += 20
    this.tint_color = 0xaaffaa
    this.tint_timer = 300
  }

  bad() {
    this.points += 10
    this.tint_color = 0xffddaa
    this.tint_timer = 300
  }

  miss() {
    //this.points -= 5
    this.tint_color = 0xffaaaa
    this.tint_timer = 300
  }

  tempo() {
    console.log("proc")
    if (this.circle_list.length == 0) {
      this.miss()
      return
    }
    if (this.circle_list[0].data.values.time > 200) {
      this.miss()
      return
    }
    if (this.circle_list[0].data.values.time > 150) {
      this.bad()
    } else if (this.circle_list[0].data.values.time > 100) {
      this.ok()
    }
    else {
      this.perfect()
    }
    this.circle_list.shift()?.destroy()
  }


}
