<template>
    <div class="grid grid-cols-4">
        <label for="price" class="text-sm font-medium leading-6 text-gray-900" :class="question.structure.labelGrid">
            {{ question.statement }}
        </label>
        <div class="relative mt-1 rounded-md" :class="question.structure.inputGrid">
            <SelectForm :options="question.options" v-model="input" />
        </div>
    </div>

</template>

<script setup>
import { computed } from "vue";
import SelectForm from "./SelectForm.vue";


const props = defineProps({
    modelValue: [Number, Object, String, Array],
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