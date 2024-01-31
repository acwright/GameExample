<template>
  <canvas ref="canvas" width="320" height="180" class="w-full bg-cyan-300"></canvas>
</template>

<script setup lang="ts">
  const canvas = ref<HTMLCanvasElement>()

  onMounted(() => {
    const game = useGameEngine(canvas)
    game.run()
  })
</script>