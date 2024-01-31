import { Resources } from './resources'
import { GameLoop } from './gameLoop'
import { Sprite } from './sprite'
import { Input } from './input'
import { Vector2 } from './vector2'
import { gridCells, isSpaceFree } from './utils/grid'
import { moveTowards } from './utils/moveTowards'
import { walls } from './levels/level1'

export class Game {

  ctx?: CanvasRenderingContext2D | null
  resources: Resources
  gameLoop: GameLoop
  input: Input

  sky: Sprite
  ground: Sprite
  hero: Sprite
  shadow: Sprite
  heroDestinationPosition: Vector2

  constructor(ctx?: CanvasRenderingContext2D | null) {
    this.ctx = ctx
    this.resources = new Resources()

    this.sky = new Sprite({
      resource: this.resources.images.sky,
      frameSize: new Vector2(320, 180)
    })
    this.ground = new Sprite({
      resource: this.resources.images.ground,
      frameSize: new Vector2(320, 180)
    })
    this.hero = new Sprite({
      resource: this.resources.images.hero,
      frameSize: new Vector2(32, 32),
      hFrames: 3,
      vFrames: 8,
      frame: 1,
      position: new Vector2(gridCells(6), gridCells(5))
    })
    this.shadow = new Sprite({
      resource: this.resources.images.shadow,
      frameSize: new Vector2(32, 32)
    })

    this.heroDestinationPosition = this.hero.position.duplicate()

    this.input = new Input()
    this.gameLoop = new GameLoop(this.update, this.render)
  }

  run = () => {
    this.gameLoop.run()
  }

  stop = () => {
    this.gameLoop.stop()
  }

  move = () => {
    if (!this.input.direction) { return }

    let nextX = this.heroDestinationPosition.x
    let nextY = this.heroDestinationPosition.y
    const gridSize = 16

    if (this.input.direction == DOWN) {
      nextY += gridSize
      this.hero.frame = 0
    }
    if (this.input.direction == UP) {
      nextY -= gridSize
      this.hero.frame = 6
    }
    if (this.input.direction == LEFT) {
      nextX -= gridSize
      this.hero.frame = 9
    }
    if (this.input.direction == RIGHT) {
      nextX += gridSize
      this.hero.frame = 3
    }

    if (isSpaceFree(walls, nextX, nextY)) {
      this.heroDestinationPosition.x = nextX
      this.heroDestinationPosition.y = nextY
    }
  }
  
  update = (timestamp: number) => {
    const distance = moveTowards(
      this.hero,
      this.heroDestinationPosition,
      1
    )
    const hasArrived = distance <= 1
    if (hasArrived) {
      this.move()
    }
  }

  render = () => {
    if (!this.ctx) { return }

    this.sky.drawImage(this.ctx, 0, 0)
    this.ground.drawImage(this.ctx, 0, 0)

    const heroOffset = new Vector2(-8, -21)
    const heroPosX = this.hero.position.x + heroOffset.x
    const heroPosY = this.hero.position.y + heroOffset.y
    
    this.shadow.drawImage(this.ctx, heroPosX, heroPosY)
    this.hero.drawImage(this.ctx, heroPosX, heroPosY)
  }

}