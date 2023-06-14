<template>
    <div class="grid grid-cols-4">
        <label :for="'id-' + question.id" class="text-sm font-medium leading-6 text-gray-900"
            :class="question.structure.labelGrid">
            {{ question.statement }}
        </label>
        <div class="relative mt-1 rounded-md" :class="question.structure.inputGrid">
            <input v-model="input" :type="question.structure.input" :id="'id-' + question.id"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
    </div>
</template>

<script setup>
//number, text, date
import { computed } from "vue";

const props = defineProps({
    modelValue: [String, Number],
    question: Object
});
const emit = defineEmits(["update:modelValue"]);

const input = computed({
    get: () => props.modelValue,
    set: (value) => emit("update:modelValue", value),
});
</script>

