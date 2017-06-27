<template lang="html">
  <div>
    <span :class="[{'close-match': !isMatch(el, i) && isCorrect(el, i), match: isMatch(el, i)}, 'part']" v-for="el, i in attempt.solution">{{el}}</span>
    <div :class="['hint', {assist}]">
      <span class="match">{{matchCount}}</span>
      <span class="close-match">{{closeMatchCount}}</span>
    </div>
  </div>
</template>

<script>
import {getCount, MATCH, CLOSE_MATCH, SCORE} from '../../index'

export default {
  props: ['attempt', 'assist'],

  computed: {
    matchCount () {
      return getCount(MATCH, this.attempt)
    },

    closeMatchCount () {
      return getCount(CLOSE_MATCH, this.attempt)
    }
  },

  methods: {
    isMatch (el, i) {
      return this.assist && this.attempt.test[SCORE][i] === MATCH
    },

    isCorrect (el, i) {
      return this.assist && this.attempt.test[SCORE][i] === CLOSE_MATCH
    }
  }
}
</script>

<style scoped>
.part, .match, .close-match {
  color: #E4E4E4;
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

.match, .close-match {
  font-weight: bold;
  font-size: 2rem;
}

.assist .match,
.assist .close-match {
  opacity: 0.5;
}

.match {
  color: #9dd29a;
}

.close-match {
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
