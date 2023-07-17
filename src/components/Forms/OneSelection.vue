<template>
  <div class="grid grid-cols-4">
    <label
      for="price"
      class="col-span-4 text-sm font-medium leading-6 text-gray-900 capitalize"
    >
      {{ question.statement }}
      <span class="text-red-700">
        {{ question.isRequired === "true" ? "*" : "" }}
      </span>
    </label>
    <div class="relative col-span-4 mt-1 rounded-md ms-4">
      <RadioGroupForm
      :isDisabled="isDisabled"
        :questionId="question.id"
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
import RadioGroupForm from "../Forms/RadioGroupForm.vue";

const props = defineProps({
  modelValue: [Number, Object, String, Array],
  label: String,
  type: {
    default: "text",
    type: String,
  },
  isDisabled:Boolean,
  placeholder: String,
  question: Object,
});
const emit = defineEmits(["update:modelValue"]);

const input = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>
