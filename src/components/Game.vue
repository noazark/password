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
import { defineComponent } from "@vue/runtime-core";
import {
  maxlength,
  selectedLength,
  state,
  isWinner,
  isValid,
  submit,
  restart,
  setDifficulty,
  setStage,
} from "@/state";
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
