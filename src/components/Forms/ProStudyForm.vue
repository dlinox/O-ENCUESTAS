<template>
    <HSelect v-model="input" :label="question.statement" :error="question.error" :options="aprograms" />
</template>

<script setup>
import { computed, ref } from "vue";
import HSelect from '../HSelect.vue';
import aprograms from '../../assets/SURVEY_APROGRAMS.json';

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