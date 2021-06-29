<template lang="html">
  <div class="self">
    <div :class="['hint', 'text-right', { assist }]">
      <span class="number" v-if="assist">#{{ number }}</span>
    </div>
    <div class="parts">
      <span
        :class="[
          {
            'close-match': !isMatch(el, i) && isCorrect(el, i),
            match: isMatch(el, i)
          },
          'part'
        ]"
        v-for="(el, i) in attempt.solution"
        :key="i"
        >{{ el }}</span
      >
    </div>
    <div :class="['hint', 'text-left', { assist }]">
      <span class="match">{{ matchCount }}</span>
      <span class="close-match">{{ closeMatchCount }}</span>
    </div>
  </div>
</template>

<script>
import { getCount, MATCH, CLOSE_MATCH, SCORE } from "@/gameplay";

export default {
  props: ["number", "attempt", "assist"],

  computed: {
    matchCount() {
      return getCount(MATCH, this.attempt);
    },

    closeMatchCount() {
      return getCount(CLOSE_MATCH, this.attempt);
    }
  },

  methods: {
    isMatch(el, i) {
      return this.assist && this.attempt.test[SCORE][i] === MATCH;
    },

    isCorrect(el, i) {
      return this.assist && this.attempt.test[SCORE][i] === CLOSE_MATCH;
    }
  }
};
</script>

<style scoped>
.self {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: baseline;
  width: 100%;
}

.part,
.number,
.match,
.close-match {
  color: #e4e4e4;
  display: inline;
  font-family: monospace;
}

.part,
.part.match,
.part.close-match {
  box-sizing: border-box;
  font-weight: normal;
  font-size: 4rem;
  opacity: 1;
}

.number,
.match,
.close-match {
  font-weight: bold;
  font-size: 2rem;
}

.assist .number,
.assist .match,
.assist .close-match {
  opacity: 0.5;
}

.number {
  color: rgba(255, 255, 255, 0.15);
}

.match {
  color: #9dd29a;
}

.close-match {
  color: #6cb2bd;
}

.hint {
  width: 100%;
}

.text-left {
  text-align: left;
}

.text-right {
  text-align: right;
}
</style>
