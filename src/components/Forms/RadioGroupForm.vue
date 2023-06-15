<template>
    <div v-for="(option, index) in options" :key="option.title" class="flex items-center my-2">
        <input :id="`radio-${index}${questionId}`" type="radio" :value="option.id" v-model="input"
            :name="`name-${index}${questionId}`"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
        <label :for="`radio-${index}${questionId}`" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            {{ option.title }}
        </label>
    </div>
</template>
<script setup>
import { computed } from "vue";

const props = defineProps({
    questionId: String,
    options: Array,
    modelValue: {
        type: [String, Number],
        default: null,
    },
});
const emit = defineEmits(["update:modelValue"]);

const input = computed({
    get: () => props.modelValue,
    set: (value) => emit("update:modelValue", value),
});
</script>
  