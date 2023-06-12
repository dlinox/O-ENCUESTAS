<template>
    <ul class="list-inside px-12">
        <li class="text-lg font-medium mb-4">
            <h3 class="mb-3"> {{ question.statement }} </h3>
            <div class="ms-4">
                <RadioGroupForm :questionIndex="question.id" :options="question.options" v-model="question.result" />
            </div>
        </li>
    </ul>
</template>
<script setup>
//number, text, date
import { computed } from "vue";

const props = defineProps({
    modelValue: [String, Number],
    label: String,
    type: {
        default: "text",
        type: String,
    },
    placeholder: String,
    question: Object,
});
const emit = defineEmits(["update:modelValue"]);

const input = computed({
    get: () => props.modelValue,
    set: (value) => emit("update:modelValue", value),
});
</script>