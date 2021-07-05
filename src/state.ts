import { computed, reactive, ref, watch } from "@vue/runtime-core";
import {
  createGame,
  hasWinningAttempt,
  makeAttempt,
  validate,
  Game,
  Password,
} from "./gameplay";

export const maxlength = ref(5);
export const selectedLength = ref(3);
export const state: Game = reactive(createGame(selectedLength.value));

export const isWinner = computed(() => {
  return state.attempts && hasWinningAttempt(state.password, state.attempts);
});

export const isValid = computed(() => {
  if (state.password && state.attempts) {
    const isValid = () => validate(state.password, state.stage);
    const isFirst = () => state.attempts == null || state.attempts.length === 0;
    const isNew = () =>
      state.stage.join("") !==
      state.attempts[state.attempts.length - 1].solution.join("");

    return isValid() && (isFirst() || isNew());
  } else {
    return false;
  }
});

export function submit() {
  state.attempts = makeAttempt(state.password, state.attempts, state.stage);
  state.stage = [];
}

export function restart() {
  Object.assign(state, createGame(selectedLength.value));
}

export function setDifficulty(val: number) {
  selectedLength.value = val;
}

export function setStage(val: Password) {
  state.stage = val;
}

watch(selectedLength, () => restart());
