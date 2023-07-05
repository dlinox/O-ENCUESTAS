<template>
  <select v-model="input"
    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    <option selected value="null">Seleccione un opcion</option>
    <option v-for="(item, index) in options" :value="item.id"> {{item.title}} </option>
  </select>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  questionIndex: Number,
  options: Array,
  modelValue: {
    type: [Number, Object, String, Array],
    default: null,
  },
});
const emit = defineEmits(["update:modelValue"]);

const input = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>
