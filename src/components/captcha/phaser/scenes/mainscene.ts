import Phaser, { GameObjects } from "phaser";
import Prop from "../components/prop"
import { number } from "zod";
import { EventBus } from "../eventbus";

export default class MainScene extends Phaser.Scene {

  safepos = { x: 0, y: 0 }
  last: number = Date.now()
  static timeout = 4000

  timing = MainScene.timeout * 2

  score: number = 0

  prop_array: Prop[] = []

  text: Phaser.GameObjects.Text | null = null

  time_rect: Phaser.GameObjects.Rectangle | null = null

  positons: { timestamp: number, x: number, y: number }[] = []

  constructor() {
    super("MainScene")
  }

  create() {
    this.add.image(200, 325, "bg")
    this.add.image(560, 450, "bin").setScale(0.4, 0.4)
    this.add.rectangle(325, 15, 650, 30, 0xdddddd)
    this.time_rect = this.add.rectangle(325, 15, 650, 30, 0xffdd00)
    this.text = this.add.text(325, 60, "" + this.score, {
      fontFamily: 'Arial Black', fontSize: 45, color: '#ffffff',
      stroke: '#000000', strokeThickness: 8,
      align: 'center'
    }).setOrigin(0.5)

    for (let i = 0; i < 5; i++) {
      const it = new Prop(Math.random() > 0.5)
      it.draw(this, 325, 610 - (Math.sqrt(i + 1) * 150), 1 / Math.sqrt(i + 1), 9 - i, i === 0)
      this.prop_array.push(it)
    }

    console.log(this.prop_array)

    let z = this.add.zone(75, 400, 150, 400).setRectangleDropZone(150, 400).setData({ "good": true })
    //this.drawZone(z, 0x00ff00)
    let y = this.add.zone(575, 400, 150, 400).setRectangleDropZone(150, 400).setData({ "good": false })
    //this.drawZone(y, 0xff0000)
    console.log("done creating prop")
    console.log("create finish")
    //this.input.on("pointerdown", (item: any, obj: any) => console.log(obj[0]))
    this.input.on("dragstart", (pointer: any, el: Phaser.GameObjects.GameObject) => MainScene.dragzer(this, el))
    this.input.on("drag", (pointer: any, el: Phaser.GameObjects.GameObject) => MainScene.fullDragging(this, pointer, el))
    this.input.on("dragend", (pointer: any, el: Phaser.GameObjects.GameObject, drop: boolean) => MainScene.DroppingLaTeammmmmm(this, pointer, el, drop))
    this.input.on("drop", (pointer: any, el: Phaser.GameObjects.GameObject, dropzone: Phaser.GameObjects.Zone) => MainScene.Dropingzer(this, el, dropzone))
  }

  update() {
    if (this.prop_array.length === 0) {
      this.goOn()
    }

    let now = Date.now()
    let delta = now - this.last
    this.last = now
    //console.log(delta)
    this.timing -= delta
    if (this.timing < 0) {
      this.prop_array[0].it?.destroy()
      this.goOn()
      this.loosePoint()
    }
    this.time_rect?.setScale(this.timing / MainScene.timeout, 1)
    for (let i = 0; i < this.prop_array.length; i++) {
      this.prop_array[i].update(i === 0, this.timing)
    }

    let pos = this.input.activePointer.position


    this.positons.push({ timestamp: now, x: pos.x, y: pos.y })

    if (this.score >= 10) {
      this.score = 0
      EventBus.emit("result", this)
      while (this.prop_array.length > 0) {
        this.prop_array.pop()?.it?.destroy()
      }
      this.timing = MainScene.timeout * 2
      this.scene.start("END")
    }
    if (this.score <= -5) {
      this.score = 0
      while (this.prop_array.length > 0) {
        this.prop_array.pop()?.it?.destroy()
      }
      this.timing = MainScene.timeout * 2
      this.scene.start("END")
    }

    //console.log(this.positons)
  }

  private drawZone(zone: Phaser.GameObjects.Zone, color: number) {
    let dr = this.add.graphics()
    dr.lineStyle(4, color)
    dr.strokeRect(
      zone.x - zone.input?.hitArea.width / 2,
      zone.y - zone.input?.hitArea.height / 2,
      zone.input?.hitArea.width,
      zone.input?.hitArea.height,
    )
    zone.setData("outline", dr);
  }



  preload() {

    this.load.image("mcfish", "assets/mcfish.webp")
    this.load.image("civ6oil", "assets/civ6oil.png")
    this.load.image("tetris", "assets/tetris.png")
    this.load.image("flounder", "assets/flounder.webp")
    this.load.image("gragas", "assets/gragas.webp")
    this.load.image("bg", "assets/bg_cap.png")
    this.load.image("bin", "assets/bin.png")
    console.log("preload called")
  }

  public static dragzer(scene: MainScene, el: Phaser.GameObjects.GameObject) {
    el.data.values.dragged = true
    console.log("mogging")
    //console.log(el.data.list)
    // @ts-ignore
    scene.safepos.x = el.x
    // @ts-ignore
    scene.safepos.y = el.y
  }

  public static fullDragging(scene: MainScene, pointer: any, el: Phaser.GameObjects.GameObject) {
    /*if (!el.data.values.first) {
      return
    }*/
    console.log("drag " + pointer.x)
    // @ts-ignore
    el.x = pointer.position.x
    // @ts-ignore
    el.y = pointer.position.y
  }

  public static DroppingLaTeammmmmm(scene: MainScene, pointer: any, el: Phaser.GameObjects.GameObject, drop: boolean) {
    /*if (!el.data.values.first) {
      return
    }*/
    if (!drop) {
      el.data.values.dragged = false
      // @ts-ignore
      el.x = scene.safepos.x
      // @ts-ignore
      el.y = scene.safepos.y
    }
  }

  public goOn() {
    this.prop_array.shift()

    while (this.prop_array.length < 5) {
      this.prop_array.push(new Prop(Math.random() < 0.5))
    }
    for (let i = 0; i < this.prop_array.length; i++) {
      this.prop_array[i].move(this, 325, 600 - (Math.sqrt(i + 1) * 175), 1 / Math.sqrt(i + 1), 9 - i, i === 0)
    }
    this.timing = MainScene.timeout
  }

  public gainPoint() {
    this.score++
    this.text?.setText("" + this.score)
  }

  public loosePoint() {
    this.score--
    this.text?.setText("" + this.score)
  }

  public static Dropingzer(scene: MainScene, el: Phaser.GameObjects.GameObject, zone: Phaser.GameObjects.Zone) {
    /*if (!el.data.values.first) {
      return
    }*/
    el.data.values.dragged = false

    if (el.data.values.good === zone.data.values.good) {
      scene.gainPoint()
    } else {
      scene.loosePoint()
    }

    el.destroy()

    scene.goOn()
  }

}
