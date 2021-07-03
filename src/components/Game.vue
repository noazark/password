<template>
  <div class="game">
    <difficulty-select
      :max="maxlength"
      :value="selectedLength"
      @change="setDifficulty"
      @reset="restart"
    />

    <div class="stage">
      <template v-if="!isWinner">
        <attempt-input
          :size="maxlength + 1"
          :max="selectedLength"
          :value="state.stage"
          :disabled="!isValid"
          @submit="submit"
          @input="setStage"
        />
      </template>
      <template v-else>
        <div class="part">You Win</div>
      </template>
    </div>

    <attempt-list
      v-if="state.attempts.length > 0"
      :attempts="state.attempts"
      :assist="isWinner"
    />
    <ul class="instructions" v-else>
      <li>Guess the {{ selectedLength }} digit password</li>
      <li>Hints are given with each guess</li>
      <li>Restart for a new password</li>
    </ul>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  reactive,
  ref,
  watch,
} from "@vue/runtime-core";
import {
  createGame,
  hasWinningAttempt,
  makeAttempt,
  validate,
  Game,
  Password,
} from "../gameplay";
import DifficultySelect from "@/components/DifficultySelect.vue";
import AttemptInput from "@/components/AttemptInput.vue";
import AttemptList from "@/components/AttemptList.vue";

export default defineComponent({
  components: {
    DifficultySelect,
    AttemptInput,
    AttemptList,
  },

  setup() {
    const maxlength = ref(5);
    const selectedLength = ref(3);
    const state: Game = reactive(createGame(selectedLength.value));

    const isWinner = computed(() => {
      return (
        state.attempts && hasWinningAttempt(state.password, state.attempts)
      );
    });

    const isValid = computed(() => {
      if (state.password && state.attempts) {
        const isValid = () => validate(state.password, state.stage);
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
      console.log("submit", arguments);

      state.attempts = makeAttempt(state.password, state.attempts, state.stage);
      state.stage = [];
    }

    function restart() {
      Object.assign(state, createGame(selectedLength.value));
    }

    function setDifficulty(val: number) {
      selectedLength.value = val;
    }

    function setStage(val: Password) {
      state.stage = val;
    }

    watch(selectedLength, () => restart());

    return {
      maxlength,
      selectedLength,
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
  margin-top: 2rem;
}

.stage,
.attempts {
  margin-top: 1rem;
  margin-bottom: 2rem;
}

.attempts,
.instructions {
  padding: 0;
  margin-top: 0;
  width: 100%;
}

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

.part {
  color: rgba(255, 255, 255, 0.08);
  box-sizing: border-box;
  display: inline;
  font-family: monospace;
  font-size: 4rem;
  text-decoration: none;
}
</style>
