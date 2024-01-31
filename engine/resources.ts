export class Resources {

  toLoad: { [key: string]: string }
  images: { 
    [key: string]: Resource 
  }

  constructor() {
    this.toLoad = {
      ground: "/sprites/ground.png",
      hero: "/sprites/hero.png",
      shadow: "/sprites/shadow.png",
      sky: "/sprites/sky.png",
    }

    this.images = {}

    Object.keys(this.toLoad).forEach((key) => {
      const img = new Image()
      img.src = this.toLoad[key]

      this.images[key] = {
        image: img,
        isLoaded: false
      }

      img.onload = () => {
        this.images[key].isLoaded = true
      }
    })
  }

}