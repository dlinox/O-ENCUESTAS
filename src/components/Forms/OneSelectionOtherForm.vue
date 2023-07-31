<template>
    <div class="grid grid-cols-4">
        <label for="price" class=" col-span-4 text-sm font-medium leading-6 text-gray-900 capitalize">
            {{ question.statement }}

            <span class="text-red-600 font-mono">
      {{ question.isRequired === "true" ? "*" : "" }}
    </span>
        </label>
        <div class="relative col-span-4 mt-1 rounded-md ms-4">
            <RadioGroupForm :questionId="question.id" :options="question.options" v-model="input" />
        </div>

        <div class="col-span-4">
            <InputForm v-model="question.answer.text" label="Especifique"></InputForm>
        </div>
        <div class="col-span-4 text-end">
            <span class=" text-xs text-red-600 ">{{ question.error?.text }}</span>
        </div>
    </div>
</template>

<script setup>
import { computed } from "vue";
import RadioGroupForm from "../Forms/RadioGroupForm.vue"
import InputForm from "../Forms/InputForm.vue"

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