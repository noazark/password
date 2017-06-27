<template>
  <div class="game">
    <p class="password">
      <a href="" :class="['part', {active: n <= pw.length}]" @click.prevent="setDifficulty(n)" v-for="n in maxlength">*</a>
      <br>
      <a href="" class="restart" @click.prevent="restart">restart</a>
    </p>

    <div class="stage">
      <template v-if="!isWinner">
        <form @submit.prevent="submit">
          <input autofocus inputmode="numeric" pattern="[0-9]*" :size="maxlength+1" :maxlength="pw.length" @input="setStage($event.target.value.split('').map(el => Number(el)))" :value="stage.join('')"></input>
          <br>
          <button class="stage-submit" :disabled="!isValid">submit</button>
        </form>
      </template>
      <template v-else>
        <div class="part">You Win</div>
      </template>
    </div>

    <ul class="attempts">
      <li is="attempt" class="attempt" v-for="attempt, i in attempts.slice().reverse()" :attempt="attempt" :assist="isWinner"></li>
    </ul>

    <ul class="instructions" v-if="attempts.length === 0">
      <li>Guess the {{pw.length}} digit password</li>
      <li>Hints are given with each guess</li>
      <li>Reset for a new password</li>
    </ul>
  </div>
</template>

<script>
import Attempt from './Attempt.vue'
import {mapActions, mapGetters, mapState} from 'vuex'

export default {
  components: {
    Attempt
  },

  watch: {
    selectedLength: {
      handler () {
        this.restart()

        // Artificially delay this event until after other watchers. This is so
        // the restart event will be triggered before a change in dimension.
        setTimeout(() => {
          this.$ga.set(`dimension${this.selectedLength}`, `difficulty-${this.selectedLength}`)
        })
      },
      immediate: true
    },

    attempts () {
      if (this.attempts.length === 0) {
        this.$ga.event('game', 'restart', undefined, this.attempts.length)
        this.$ga.time('game', 'restart', Date.now() - this.startTimestamp)
      }

      if (this.attempts.length > 0) {
        this.$ga.event('game', 'attempt', `attempt-${this.attempts.length}`, Date.now() - this.lastAttemptTimestamp)
      }
    },

    isWinner (val) {
      if (val === true) {
        this.$ga.event('game', 'win', undefined, this.attempts.length)
        this.$ga.time('game', 'win', Date.now() - this.startTimestamp)
      }
    }
  },

  computed: {
    ...mapState([
      'maxlength',
      'selectedLength',
      'pw',
      'startTimestamp',
      'lastAttemptTimestamp',
      'attempts',
      'stage'
    ]),

    ...mapGetters([
      'isWinner',
      'isValid'
    ])
  },

  methods: {
    ...mapActions([
      'restart',
      'setDifficulty',
      'setStage',
      'submit'
    ])
  }
}
</script>

<style scoped>
.game {
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  text-align: center;
  justify-content: flex-start;
}

.password, .stage, .attempts {
  margin-bottom: 2rem;
}

.restart {
  color: #da6253;
  font-family: monospace;
  font-size: 2rem;
  text-decoration: none;
}

.password {
  line-height: 1rem;
  padding-top: 1rem;
}

.password > .part {
  color: rgba(255, 255, 255, 0.08);
}

.password > .part.active {
  color: #E4E4E4;
}

.stage input {
  background-color: rgba(255, 255, 255, 0.08);
  border-bottom: 3px solid #E4E4E4;
  border-radius: 0;
  border: 0;
  box-sizing: border-box;
  color: #E4E4E4;
  font-family: monospace;
  font-size: 4rem;
  height: 68px;
  margin: 0;
  outline: none;
  padding: 0.1rem;
  text-align: center;
  vertical-align: top;
  width: 100%;
}

.stage-submit {
  background-color: rgba(255, 255, 255, 0.2);
  border: 0;
  color: #9DD29A;
  font-family: monospace;
  font-size: 2rem;
  margin: 0;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  width: 100%;
}

.stage-submit:disabled {
  opacity: 0.2;
}

.part {
  box-sizing: border-box;
  color: #E4E4E4;
  display: inline;
  font-family: monospace;
  font-size: 4rem;
  text-decoration: none;
}

.attempts,
.instructions {
  padding: 0;
  margin-top: 0;
}

.attempts > li,
.instructions > li {
  list-style:none;
}

.instructions {
  color: #E4E4E4;
  font-family: monospace;
  font-size: 1.2rem;
}

.instructions > li {
  margin: 0.75rem 0;
}

</style>
