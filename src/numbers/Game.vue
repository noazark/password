<template>
  <div class="game">
    <p class="password">
      <a href="" :class="['part', {active: n <= pw.length}]" @click.prevent="selectedLength = n" v-for="n in maxlength">*</a>
      <br>
      <a href="" class="restart" @click.prevent="restart">restart</a>
    </p>

    <div class="stage">
      <template v-if="!isWinner">
        <form @submit.prevent="submit">
          <input autofocus inputmode="numeric" pattern="[0-9]*" :size="maxlength+1" :maxlength="pw.length" v-model="stage"></input>
          <br>
          <button class="stage-submit" :disabled="!isValid">submit</button>
        </form>
      </template>
      <template v-else>
        <div class="part">You Win</div>
      </template>
    </div>


    <ul class="attempts">
      <li is="attempt" class="attempt" v-for="attempt, i in attempts.slice().reverse()" :pw="pw" :attempt="attempt" :assist="isWinner"></li>
    </ul>
  </div>
</template>

<script>
import Attempt from './Attempt.vue'
import {createPassword, hasWinningAttempt, makeAttempt, validate} from '../../index'

export default {
  components: {
    Attempt
  },

  data () {
    return {
      maxlength: 5,
      selectedLength: 3,
      pw: null,
      startTimestamp: null,
      lastAttemptTimestamp: null,
      attempts: null,
      stage: null,
      isValid: false
    }
  },

  watch: {
    selectedLength: {
      handler () {
        this.restart()
      },
      immediate: true
    },

    stage () {
      this.validate()
    },

    attempts () {
      if (this.attempts.length === 1) {
        this.startTimestamp = Date.now()
      }
    },

    isWinner () {
      this.$ga.event('game', 'win', undefined, this.attempts.length)
      this.$ga.time('game', 'win', Date.now() - this.startTimestamp)
    }
  },

  computed: {
    isWinner () {
      return hasWinningAttempt(this.pw, this.attempts)
    },

    solution () {
      return this.stage.split('').map(el => Number(el))
    }
  },

  methods: {
    restart () {
      if (this.attempts != null) {
        this.$ga.event('game', 'restart', undefined, this.attempts.length, Date.now() - this.startTimestamp)
      }

      this.pw = createPassword(this.selectedLength)
      this.attempts = []
      this.stage = ''
      this.lastAttemptTimestamp = Date.now()

      this.$ga.set(`dimension${this.selectedLength}`, `difficulty-${this.selectedLength}`)
    },

    submit () {
      this.attempts = makeAttempt(this.pw, this.attempts, this.solution)

      this.$ga.event('game', 'attempt', `attempt-${this.attempts.length}`, Date.now() - this.lastAttemptTimestamp)
    },

    validate () {
      this.isValid = validate(this.pw, this.solution)
    }
  }
}
</script>

<style scoped>
.game {
  align-items: center;
  display: flex;
  flex-direction: column;
  overflow: scroll;
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

.attempts {
  padding: 0;
  margin-top: 0;
}

.attempts > li {
  list-style:none;
}
</style>
