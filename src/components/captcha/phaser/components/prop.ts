import MainScene from "../scenes/mainscene";
import Phaser from "phaser";

export default class Prop {
  static speed: number = 4
  public safepos: { x: number, y: number } | null = null

  public it: Phaser.GameObjects.Image | null = null

  public aimingPos: { x: number, y: number } | null = null

  static texture_dict: { good: string[], bad: string[] } = {
    good: [
      "mcfish",
      "flounder",
      "gragas",
      "marto",
      "magikarp",
      "jak_shark",
      "cetus"
    ],
    bad: [
      "tetris",
      "civ6oil",
      "inserter",
      "goomba",
      "amogus",
      "ygo",
      "goose",
      "mk8",
      "wumpa",
      "nukacola"
    ],
  }

  public isGood: boolean = true
  public me: Phaser.GameObjects.Image | null = null

  constructor(good: boolean) {
    this.isGood = good
  }

  public draw(scene: MainScene, x: number, y: number, scale: number = 1, layer: number = 0, isFirst: boolean = false): any {
    let sprite = this.isGood ?
      Prop.texture_dict.good[Math.floor(Math.random() * Prop.texture_dict.good.length)]
      : Prop.texture_dict.bad[Math.floor(Math.random() * Prop.texture_dict.bad.length)]
    this.it = scene.add.image(x, y, sprite)
      .setScale(scale * 1.2, scale * 1.2).setDepth(layer).setInteractive()
      .setAlpha(Math.min(1 / 9 * (layer + 1), 1))
      .setData({ "good": this.isGood, "dragged": false })
    this.safepos = { x: x, y: y }
    if (isFirst) {
      scene.input.setDraggable(this.it)
    }
    return this.it
  }

  public move(scene: MainScene, x: number, y: number, scale: number = 1, layer: number = 0, isFirst: boolean = false) {
    if (this.it === null) {
      this.draw(scene, x, y, scale, layer, isFirst)
    } else {
      this.aimingPos = { x: x, y: y }
      this.it.setScale(scale * 1.2, scale * 1.2);
      this.it.setDepth(layer);
      this.it.setAlpha(Math.min(1 / 9 * (layer + 1), 1))
      this.safepos = { x: x, y: y }
      if (isFirst) {
        scene.input.setDraggable(this.it)
      }
    }
  }

  public update(first: boolean = false, t: number) {
    if (this.it !== null) {
      if (!this.it.data || this.it.data.values.dragged) {
        return
      }
      if (this.aimingPos !== null) {
        let diffx = this.aimingPos.x - this.it.x
        let diffy = this.aimingPos.y - this.it.y
        if (diffx > Prop.speed) {
          this.it.x += Math.sign(diffx) * Prop.speed
        } else {
          this.it.x = this.aimingPos.x
        }

        if (diffy > Prop.speed) {
          this.it.y += Math.sign(diffy) * Prop.speed
        } else {
          this.it.y = this.aimingPos.y
        }

        if (diffx == 0 && diffy == 0) {
          this.aimingPos = null
        }

      } else if (first && this.safepos !== null) {
        //console.log("proc")
        let force = (4000 - t) / 4000
        this.it.x = this.safepos.x + (Math.random() - 0.5) * 20 * force
        this.it.y = this.safepos.y + (Math.random() - 0.5) * 20 * force
      }
    }
  }

}
