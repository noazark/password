<template>
  <form
    class="stage"
    @submit.prevent="handleSubmit"
  >
    <input
      autofocus
      inputmode="numeric"
      pattern="[0-9]*"
      :size="size"
      :maxlength="max"
      :value="textValue"
      @input.stop.prevent="handleInput"
    >
    <br>
    <button
      class="stage-submit"
      :disabled="disabled"
    >
      submit
    </button>
  </form>
</template>

<script lang="ts" setup>
import { Password } from "@/gameplay";
import { computed, defineEmits, defineProps, PropType } from "vue";

const emit = defineEmits(["submit", "input"])

const props = defineProps({
  max: {
    type: Number,
    default: 3,
  },
  size: {
    type: Number,
    default: 5,
  },
  value: {
    type: Array as PropType<Password>,
    default: () => [],
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const textValue = computed(() => props.value.join(""));

function handleSubmit(evt: Event) {
  evt.stopImmediatePropagation();
  emit("submit");
}

function handleInput(evt: Event) {
  const el = (evt.target as HTMLInputElement) || null;

  if (el) {
    emit(
      "input",
      el.value.split("").map((el) => Number(el))
    );
  }
}
</script>

<style>
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
  cursor: pointer;
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
</style>
