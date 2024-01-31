export const useGameEngine = (canvas: Ref<HTMLCanvasElement | undefined>) => {
  return new Game(canvas.value?.getContext('2d'))
}