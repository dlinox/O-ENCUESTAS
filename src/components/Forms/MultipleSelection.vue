<template>
    <div class="grid grid-cols-4">
        <label for="price" class="text-sm font-medium leading-6 text-gray-900" :class="question.structure.labelGrid">
            {{ question.statement }}
        </label>
        <div class="relative mt-1 rounded-md" :class="question.structure.inputGrid">
            <CheckBoxesFrom :questionIndex="question.id" :options="question.options" v-model="input" />
        </div>
    </div>
</template>
<script setup>
import { computed } from "vue";
import CheckBoxesFrom from "./CheckBoxesFrom.vue";

const props = defineProps({
    modelValue: {
        type: Array,
        default: []
    },
    question: Object
});
const emit = defineEmits(["update:modelValue"]);

const input = computed({
    get: () => props.modelValue,
    set: (value) => emit("update:modelValue", value),
});
</script>