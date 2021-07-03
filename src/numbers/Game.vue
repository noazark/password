<template>
  <div class="game">
    <p class="password">
      <a
        href=""
        :class="['part', { active: n <= state.pw.length }]"
        @click.prevent="setDifficulty(n)"
        v-for="n in state.maxlength"
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
            :size="state.maxlength + 1"
            :maxlength="state.pw.length"
            @input="
              setStage($event.target.value.split('').map((el) => Number(el)))
            "
            :value="state.stage.join('')"
          />
          <br />
          <button class="stage-submit" :disabled="!isValid">submit</button>
        </form>
      </template>
      <template v-else>
        <div class="part">You Win</div>
      </template>
    </div>

    <ul class="attempts" v-if="state.attempts.length > 0">
      <attempt
        class="attempt"
        v-for="(attempt, i) in state.attempts.slice().reverse()"
        :key="i"
        :number="state.attempts.length - i"
        :attempt="attempt"
        :assist="isWinner"
      ></attempt>
    </ul>
    <ul class="instructions" v-else>
      <li>Guess the {{ state.pw.length }} digit password</li>
      <li>Hints are given with each guess</li>
      <li>Restart for a new password</li>
    </ul>
  </div>
</template>

<script lang="ts">
import Attempt from "./Attempt.vue";
import { computed, defineComponent, reactive, watch } from "@vue/runtime-core";
import {
  createPassword,
  hasWinningAttempt,
  makeAttempt,
  validate,
  Attempt as AttemptType,
  Password,
} from "../gameplay";

type Store = {
  maxlength: number;
  selectedLength: number;
  pw: Password;
  startTimestamp?: number;
  lastAttemptTimestamp?: number;
  attempts: AttemptType[];
  stage: Password;
};

export default defineComponent({
  components: {
    Attempt,
  },

  setup() {
    const state: Store = reactive({
      maxlength: 5,
      selectedLength: 3,
      pw: createPassword(3),
      startTimestamp: undefined,
      lastAttemptTimestamp: Date.now(),
      attempts: [],
      stage: [],
    });

    const isWinner = computed(() => {
      return state.attempts && hasWinningAttempt(state.pw, state.attempts);
    });

    const isValid = computed(() => {
      if (state.pw && state.attempts) {
        const isValid = () => validate(state.pw, state.stage);
        const isFirst = () =>
          state.attempts == null || state.attempts.length === 0;
        const isNew = () =>
          state.stage.join("") !==
          state.attempts[state.attempts.length - 1].solution.join("");

        return isValid() && (isFirst() || isNew());
      } else {
        return false;
      }
    });

    function submit() {
      state.attempts = makeAttempt(state.pw, state.attempts, state.stage);
      state.stage = [];

      if (state.attempts.length === 1) {
        state.startTimestamp = Date.now();
      }
    }

    function restart() {
      state.pw = createPassword(state.selectedLength);
      state.attempts = [];
      state.stage = [];
      state.lastAttemptTimestamp = Date.now();
    }

    function setDifficulty(val: number) {
      state.selectedLength = val;
    }

    function setStage(val: Password) {
      state.stage = val;
    }

    watch(
      () => state.selectedLength,
      () => restart()
    );

    return {
      state,
      isWinner,
      isValid,
      submit,
      restart,
      setDifficulty,
      setStage,
    };
  },
});
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
  display: inline-block;
  color: #da6253;
  font-family: monospace;
  font-size: 2rem;
  text-decoration: none;
  margin-top: 24px;
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
