<template>
  <div id="app" :class="{fullscreen: isFullscreen}">
    <game v-if="$root.ready"></game>
  </div>
</template>

<script>
import Distribution from './components/Distribution.vue'
import Game from './numbers/Game.vue'

export default {
  components: {
    Game,
    Distribution
  },

  computed: {
    isFullscreen () {
      return (screen.availHeight || screen.height - 30) <= window.innerHeight
    }
  }
}
</script>

<style>
body {
  background-color: #68667B;
}

.fullscreen {
  margin-top: 2rem;
}
</style>
