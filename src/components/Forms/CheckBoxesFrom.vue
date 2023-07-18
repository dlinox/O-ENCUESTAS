<template>
    <div v-for="(option, index) in options" :key="option.title" class="flex items-center my-2">
        <input :id="`checkbox-${index}${questionIndex}`" type="checkbox" :value="option.id" v-model="input"
            :name="`name-${index}${questionIndex}`"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
        <label :for="`checkbox-${index}${questionIndex}`" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 first-letter:uppercase">
            {{ option.title }}
        </label>
    </div>
</template>
<script setup>

import { computed } from "vue";
const props = defineProps({
    questionIndex: [Number, String],
    options: Array,
    modelValue: {
        type: [Number, Object, String, Array],
        default: [],
    },
});
const emit = defineEmits(["update:modelValue"]);

const input = computed({
    get: () => props.modelValue,
    set: (value) => emit("update:modelValue", value),
});
</script>
  