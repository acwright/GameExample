export class GameLoop {

  update: (timestamp: number) => void
  render: () => void

  lastFrameTime: number
  accumulatedTime: number
  timeStep: number

  rafId: number | null
  isRunning: boolean

  constructor(update: (timestamp: number) => void, render: () => void) {
    this.update = update
    this.render = render

    this.lastFrameTime = 0
    this.accumulatedTime = 0
    this.timeStep = 1000 / 60

    this.rafId = null
    this.isRunning = false
  }

  mainLoop = (timestamp: number) => {
    if (!this.isRunning) { return }

    let deltaTime = timestamp - this.lastFrameTime
    this.lastFrameTime = timestamp

    this.accumulatedTime += deltaTime

    while(this.accumulatedTime >= this.timeStep) {
      this.update(this.timeStep)
      this.accumulatedTime -= this.timeStep
    }

    this.render()

    this.rafId = requestAnimationFrame(this.mainLoop)
  }

  run = () => {
    if (!this.isRunning) {
      this.isRunning = true
      this.rafId = requestAnimationFrame(this.mainLoop)
    }
  }

  stop = () => {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId)
    }
    this.isRunning = false
  }

}