<template>
  <div class="grid grid-cols-4">
    <label
      for="price"
      class="col-span-4 text-sm font-medium leading-6 text-gray-900 first-letter:uppercase"
    >
      {{ question.statement }}

      <span class="text-red-600 font-mono">
        {{ question.isRequired === 'true' ? "*" : "" }}
      </span>
    </label>
    <div class="relative mt-1 rounded-md col-span-4 ps-4">
      <CheckBoxesFrom
        :questionIndex="question.id"
        :options="question.options"
        v-model="input"
      />
    </div>
    <div class="col-span-4 text-end">
      <span class="text-xs text-red-600">{{ question.error?.text }}</span>
    </div>
  </div>
</template>
<script setup>
import { computed } from "vue";
import CheckBoxesFrom from "./CheckBoxesFrom.vue";

const props = defineProps({
  modelValue: {
    type: [Array, String],
  },
  question: Object,
});
const emit = defineEmits(["update:modelValue"]);

const input = computed({
  get: () =>
    Array.isArray(props.modelValue)
      ? props.modelValue
      : props.modelValue?.split(","),
  set: (value) => emit("update:modelValue", value),
});
</script>
