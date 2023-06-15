<template>
    <div class="grid grid-cols-4">
        <label for="price" class="text-sm font-medium leading-6 text-gray-900" :class="question.structure?.labelGrid">
            {{ question.statement }}
        </label>
        <div class="relative mt-1 rounded-md" :class="question.structure?.inputGrid">
            <RadioGroupForm :questionId="question.id" :options="question.options" v-model="input" />
        </div>
    </div>

</template>

<script setup>
//number, text, date
import { computed } from "vue";
import RadioGroupForm from "../Forms/RadioGroupForm.vue"


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