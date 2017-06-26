<template lang="html">
  <div>
    <span :class="[{correct: !isMatch(el, i) && isCorrect(el, i), match: isMatch(el, i)}, 'part']" v-for="el, i in attempt.solution">{{el}}</span>
    <div :class="['hint', {assist}]">
      <span class="match">{{matchCount}}</span>
      <span class="correct">{{correctCount}}</span>
    </div>
  </div>
</template>

<script>
import {getCount, MATCH, CORRECT, SCORE} from '../../index'

export default {
  props: ['attempt', 'assist'],

  computed: {
    matchCount () {
      return getCount(MATCH, this.attempt.test.score)
    },

    correctCount () {
      return getCount(CORRECT, this.attempt.test.score)
    }
  },

  methods: {
    isMatch (el, i) {
      return this.assist && this.attempt.test[SCORE][i] === MATCH
    },

    isCorrect (el, i) {
      return this.assist && this.attempt.test[SCORE][i] === CORRECT
    }
  }
}
</script>

<style scoped>
.part, .match, .correct {
  color: #E4E4E4;
  display: inline;
  font-family: monospace;
}

.part,
.part.match,
.part.correct {
  box-sizing: border-box;
  font-weight: normal;
  font-size: 4rem;
  opacity: 1;
}

.match, .correct {
  font-weight: bold;
  font-size: 2rem;
}

.assist .match,
.assist .correct {
  opacity: 0.5;
}

.match {
  color: #9dd29a;
}

.correct {
  color: #6cb2bd;
}

.hint {
  display: inline-block;

  /* hack to ignore width of this element and allow
   * flexbox to center everything else
   */
  overflow: visible;
  white-space: nowrap;
  width: 0;
}
</style>
