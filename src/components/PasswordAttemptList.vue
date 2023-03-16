<template>
  <ul class="attempts">
    <attempt class="attempt" v-for="(attempt, i) in orderedAttempts" :key="i" :number="attempts.length - i"
      :attempt="attempt" :assist="assist" />
  </ul>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "@vue/runtime-core";
import Attempt from "@/components/PasswordAttempt.vue";
import { Attempt as AttemptType } from "@/gameplay";

export default defineComponent({
  props: {
    attempts: {
      type: Array as PropType<AttemptType[]>,
      default: () => [],
    },
    assist: {
      type: Boolean,
    },
  },

  components: {
    Attempt,
  },

  setup(props) {
    const orderedAttempts = computed(() => {
      return props.attempts.slice().reverse();
    });

    return {
      orderedAttempts,
    };
  },
});
</script>

<style>
.attempts>li {
  list-style: none;
}
</style>
