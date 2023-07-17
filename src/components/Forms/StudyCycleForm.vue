<template>
  <HSelect
    :isDisabled="isDisabled"
    v-model="input"
    :label="question.statement"
    :error="question.error"
    :options="options"
  />
</template>

<script setup>
import { computed } from "vue";
import HSelect from "../HSelect.vue";

const props = defineProps({
  modelValue: [Number, Object, String, Array],
  label: String,
  type: {
    default: "text",
    type: String,
  },
  placeholder: String,
  question: Object,
  isDisabled: Boolean,
});
const emit = defineEmits(["update:modelValue"]);

const input = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const options = [
  { id: 1, title: "Semestre I" },
  { id: 2, title: "Semestre II    " },
  { id: 3, title: "Semestre III" },
  { id: 4, title: "Semestre IV" },
  { id: 5, title: "Semestre V" },
  { id: 6, title: "Semestre VI" },
  { id: 7, title: "Semestre VII" },
  { id: 8, title: "Semestre VIII" },
  { id: 9, title: "Semestre IX" },
  { id: 10, title: "Semestre X" },
  { id: 11, title: "Semestre XI" },
  { id: 12, title: "Semestre XII" },
];
</script>
