<template>
  <div class="game">
    <p class="password">
      <a
        href=""
        :class="['part', { active: n <= pw.length }]"
        @click.prevent="setDifficulty(n)"
        v-for="n in maxlength"
        :key="n"
        >*</a
      >
      <br />
      <a href="" class="restart" @click.prevent="restart">restart</a>
    </p>

    <div class="stage">
      <template v-if="!isWinner">
        <form @submit.prevent="submit">
          <input
            autofocus
            inputmode="numeric"
            pattern="[0-9]*"
            :size="maxlength + 1"
            :maxlength="pw.length"
            @input="
              setStage($event.target.value.split('').map((el) => Number(el)))
            "
            :value="stage.join('')"
          />
          <br />
          <button class="stage-submit" :disabled="!isValid">submit</button>
        </form>
      </template>
      <template v-else>
        <div class="part">You Win</div>
      </template>
    </div>

    <ul class="attempts" v-if="attempts.length > 0">
      <attempt
        class="attempt"
        v-for="(attempt, i) in attempts.slice().reverse()"
        :key="i"
        :number="attempts.length - i"
        :attempt="attempt"
        :assist="isWinner"
      ></attempt>
    </ul>
    <ul class="instructions" v-else>
      <li>Guess the {{ pw.length }} digit password</li>
      <li>Hints are given with each guess</li>
      <li>Restart for a new password</li>
    </ul>
  </div>
</template>

<script>
import Attempt from "./Attempt.vue";
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  components: {
    Attempt,
  },

  watch: {
    selectedLength: {
      handler() {
        this.restart();
      },
      immediate: true,
    },
  },

  computed: {
    ...mapState([
      "maxlength",
      "selectedLength",
      "pw",
      "startTimestamp",
      "lastAttemptTimestamp",
      "attempts",
      "stage",
    ]),

    ...mapGetters(["isWinner", "isValid"]),
  },

  methods: {
    ...mapActions(["restart", "setDifficulty", "setStage", "submit"]),
  },
};
</script>

<style scoped>
.game {
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  text-align: center;
  justify-content: flex-start;
  width: 100%;
}

.password,
.stage,
.attempts {
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
  color: #e4e4e4;
}

.stage input {
  background-color: rgba(255, 255, 255, 0.08);
  border-bottom: 3px solid #e4e4e4;
  border-radius: 0;
  border: 0;
  box-sizing: border-box;
  color: #e4e4e4;
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
  color: #9dd29a;
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
  color: #e4e4e4;
  display: inline;
  font-family: monospace;
  font-size: 4rem;
  text-decoration: none;
}

.attempts,
.instructions {
  padding: 0;
  margin-top: 0;
  width: 100%;
}

.attempts > li,
.instructions > li {
  list-style: none;
}

.instructions {
  color: #e4e4e4;
  font-family: monospace;
  font-size: 1.2rem;
}

.instructions > li {
  margin-bottom: 0.75rem;
}
</style>
