<template>
  <label class="block text-sm font-medium leading-6 text-gray-900">
    {{ label }}
  </label>
  <div class="relative mt-1 rounded-md shadow-sm">
    <input @click="$emit('clickInput')" v-model="input" :type="type"
      class="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
      :placeholder="placeholder" />
  </div>
</template>
<script setup>
import { computed } from "vue";

const props = defineProps({
  label: String,
  placeholder: String,
  type: {
    default: "text",
    type: String,
  },
  modelValue: [String, Number],
});
const emit = defineEmits(["update:modelValue", "clickInput"]);

const input = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>
