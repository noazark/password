<template>
  <div class="password">
    <a
      v-for="n in props.max"
      :key="n"
      href=""
      :class="['part', { active: n <= props.value }]"
      @click.prevent="emit('change', n)"
    >*</a>
    <br>
    <a
      href=""
      class="restart"
      @click.prevent="emit('reset')"
    >restart</a>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';

const emit = defineEmits(["change", "reset"])

const props = defineProps({
  max: {
    type: Number,
    default: 5,
  },
  value: {
    type: Number,
    default: 3,
  },
})
</script>

<style scoped>
.restart {
  display: inline-block;
  color: #da6253;
  font-family: monospace;
  font-size: 2rem;
  text-decoration: none;
  margin-top: 24px;
}

.password {
  line-height: 1rem;
  padding-top: 1rem;
}

.password>.part {
  color: rgba(255, 255, 255, 0.08);
  box-sizing: border-box;
  display: inline;
  font-family: monospace;
  font-size: 4rem;
  text-decoration: none;
}

.part.active {
  color: #e4e4e4;
}
</style>
