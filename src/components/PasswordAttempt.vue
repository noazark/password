<template>
  <div class="attempt">
    <div class="attempt-number">#{{ number }}</div>
    <div class="parts">
      <span :class="[{ [attempt.test.score[i]]: assist }, 'part']" v-for="(el, i) in attempt.solution" :key="i">{{ el
      }}</span>
    </div>
    <div class="hint">
      <span :class="score" v-for="score in hints" :key="score">
        {{ getCount(score, attempt) }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { getCount, SCORE, Attempt } from "@/gameplay";
import { defineComponent, PropType } from "@vue/runtime-core";

export default defineComponent({
  props: {
    number: {
      type: Number,
      required: true,
    },
    attempt: {
      type: Object as PropType<Attempt>,
      required: true,
    },
    assist: {
      type: Boolean,
      default: false,
    },
  },

  setup() {
    const hints = [SCORE.MATCH, SCORE.CLOSE_MATCH];

    return {
      hints,
      getCount,
    };
  },
});
</script>

<style scoped>
.attempt {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: baseline;
  width: 100%;
}

.attempt-number,
.match,
.close_match {
  color: #e4e4e4;
  display: inline;
  font-family: monospace;
  font-weight: bold;
  font-size: 2rem;
  opacity: 0.5;
}

.part {
  color: #e4e4e4;
  font-family: monospace;
  box-sizing: border-box;
  font-weight: normal;
  font-size: 4rem;
  opacity: 1;
}

.attempt-number {
  color: rgba(255, 255, 255, 0.15);
}

.match {
  color: #9dd29a;
}

.close_match {
  color: #6cb2bd;
}

.attempt-number {
  width: 100%;
  text-align: right;
}

.hint {
  width: 100%;
  text-align: left;
}
</style>
