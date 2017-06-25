<template lang="html">
  <div>
    <span :class="[{correct: !isMatch(el, i) && isCorrect(el), match: isMatch(el, i)}, 'part']" v-for="el, i in attempt.solution">{{el}}</span>
    <div :class="['hint', {assist}]">
      <span class="match">{{attempt.test.match}}</span>
      <span class="correct">{{attempt.test.correct}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['attempt', 'pw', 'assist'],

  methods: {
    isMatch (el, i) {
      return this.assist && this.pw[i] === el
    },

    isCorrect (el) {
      return this.assist && this.pw.includes(el)
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
