<template>
  <ul class="attempts">
    <PasswordAttempt
      v-for="(attempt, i) in orderedAttempts"
      :key="i"
      class="attempt"
      :number="attempts.length - i"
      :attempt="attempt"
      :assist="assist"
    />
  </ul>
</template>

<script lang="ts" setup>
import { computed, defineProps, PropType } from "@vue/runtime-core";
import PasswordAttempt from "@/components/PasswordAttempt.vue";
import { Attempt as AttemptType } from "@/gameplay";

const props = defineProps({
  attempts: {
    type: Array as PropType<AttemptType[]>,
    default: () => [],
  },
  assist: {
    type: Boolean,
  },
})

const orderedAttempts = computed(() => {
  return props.attempts.slice().reverse();
});
</script>

<style>
.attempts>li {
  list-style: none;
}
</style>
