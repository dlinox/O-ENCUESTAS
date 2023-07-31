<template>
  <HSelect
    :isDisabled="isDisabled"
    v-model="input"
    :label="question.statement"
    :error="question.error"
    :options="faculties"
  />
</template>

<script setup>
import { computed } from "vue";
import HSelect from "../HSelect.vue";
import faculties from "../../assets/SURVEY_FACULTIES.json";

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
</script>
