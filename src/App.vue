<template>
  <div
    id="app"
    :class="{ fullscreen: isFullscreen }"
  >
    <game />
  </div>
</template>

<script>
import Game from "@/components/PasswordGame.vue";

export default {
  components: {
    Game,
  },

  computed: {
    isFullscreen() {
      return (screen.availHeight || screen.height - 30) <= window.innerHeight;
    },
  },
};
</script>

<style>
body {
  background-color: #68667b;
}

.fullscreen {
  margin-top: 2rem;
}
</style>
