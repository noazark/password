import { createStore } from "vuex";
import {
  createPassword,
  hasWinningAttempt,
  makeAttempt,
  validate,
  Attempt,
  Password,
} from "../gameplay";

type Store = {
  maxlength: number;
  selectedLength: number;
  pw: Password;
  startTimestamp?: number;
  lastAttemptTimestamp?: number;
  attempts: Attempt[];
  stage: Password;
};

export const store = createStore<Store>({
  state(): Store {
    return {
      maxlength: 5,
      selectedLength: 3,
      pw: [],
      startTimestamp: undefined,
      lastAttemptTimestamp: undefined,
      attempts: [],
      stage: [],
    };
  },

  getters: {
    isWinner(state) {
      if (state.attempts) {
        return hasWinningAttempt(state.pw, state.attempts);
      } else {
        return false;
      }
    },

    isValid(state, getters) {
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
    },
  },

  mutations: {
    ATTEMPT(state) {
      state.attempts = makeAttempt(state.pw, state.attempts, state.stage);
      state.stage = [];

      if (state.attempts.length === 1) {
        state.startTimestamp = Date.now();
      }
    },

    RESTART(state) {
      state.pw = createPassword(state.selectedLength);
      state.attempts = [];
      state.stage = [];
      state.lastAttemptTimestamp = Date.now();
    },

    SET_DIFFICULTY(state, val) {
      state.selectedLength = val;
    },

    SET_STAGE(state, val) {
      state.stage = val;
    },
  },

  actions: {
    restart({ state, commit }) {
      commit("RESTART");
    },

    setDifficulty({ commit }, val) {
      commit("SET_DIFFICULTY", val);
    },

    setStage({ commit }, val) {
      commit("SET_STAGE", val);
    },

    submit({ state, commit }) {
      commit("ATTEMPT");
    },
  },
});
