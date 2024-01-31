export const gridCells = (n: number) => {
  return n * 16
}

export const isSpaceFree = (walls: Set<string>, x: number, y: number) => {
  return !walls.has(`${x},${y}`)
}