import { Sprite } from "../sprite"
import { Vector2 } from "../vector2"

export const moveTowards = (
  sprite: Sprite, 
  destinationPosition: Vector2,
  speed: number
): number => {
  let distanceToTravelX = destinationPosition.x - sprite.position.x
  let distanceToTravelY = destinationPosition.y - sprite.position.y

  let distance = Math.sqrt(distanceToTravelX ** 2 + distanceToTravelY ** 2)

  if (distance <= speed) {
    sprite.position.x = destinationPosition.x
    sprite.position.y = destinationPosition.y
  } else {
    let normalizedX = distanceToTravelX / distance
    let normalizedY = distanceToTravelY / distance

    sprite.position.x += normalizedX * speed
    sprite.position.y += normalizedY * speed

    distanceToTravelX = destinationPosition.x - sprite.position.x
    distanceToTravelY = destinationPosition.y - sprite.position.y

    distance = Math.sqrt(distanceToTravelX ** 2 + distanceToTravelY ** 2)
  }

  return distance
}