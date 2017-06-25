<template>
  <div id="app">
    <game></game>
  </div>
</template>

<script>
import Distribution from './components/Distribution.vue'
import Game from './numbers/Game.vue'

export default {
  components: {
    Game,
    Distribution
  }
}
</script>

<style>
body {
  background-color: #68667B;
}
</style>
