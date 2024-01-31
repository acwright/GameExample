import type { Resource } from "./resource"
import { Vector2 } from "./vector2"

export class Sprite {

  resource: Resource
  frameSize: Vector2
  hFrames: number
  vFrames: number
  frame: number
  scale: number
  position: Vector2

  frameMap: Map<number, Vector2>
  
  constructor(options: {
    resource: Resource,
    frameSize?: Vector2,
    hFrames?: number,
    vFrames?: number,
    frame?: number,
    scale?: number,
    position?: Vector2
  }) {
    this.resource = options.resource
    this.frameSize = options.frameSize || new Vector2(16, 16)
    this.hFrames = options.hFrames || 1
    this.vFrames = options.vFrames || 1
    this.frame = options.frame || 0
    this.scale = options.scale || 1
    this.position = options.position || new Vector2(0, 0)

    this.frameMap = new Map<number, Vector2>()

    this.buildFrameMap()
  }

  buildFrameMap = () => {
    let frameCount = 0

    for(let v = 0; v < this.vFrames; v++) {
      for(let h = 0; h < this.hFrames; h++) {
        this.frameMap.set(
          frameCount, 
          new Vector2(
            this.frameSize.x * h, 
            this.frameSize.y * v
          )
        )
        frameCount++
      }
    }
  }

  drawImage = (
    ctx: CanvasRenderingContext2D, 
    x: number, 
    y: number
  ) => {
    if (!this.resource.isLoaded) { return }

    let frameCoordX = 0
    let frameCoordY = 0
    const frame = this.frameMap.get(this.frame)
    if (frame) {
      frameCoordX = frame.x
      frameCoordY = frame.y
    }

    const frameSizeX = this.frameSize.x
    const frameSizeY = this.frameSize.y

    ctx.drawImage(
      this.resource.image,
      frameCoordX,
      frameCoordY,
      frameSizeX,
      frameSizeY,
      x,
      y,
      frameSizeX * this.scale,
      frameSizeY * this.scale
    )
  }

}