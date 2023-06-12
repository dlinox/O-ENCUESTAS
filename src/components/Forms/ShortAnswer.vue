<template>
    <div class="grid grid-cols-4">
        <label for="price" class="text-sm font-medium leading-6 text-gray-900" :class="labelGrid">
            {{ label }}
        </label>
        <div class="relative mt-1 rounded-md shadow-sm" :class="inputGrid">
            <input v-model="input" :type="type"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                :placeholder="placeholder" />
        </div>
    </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
    modelValue: [String, Number],
    label: String,
    labelGrid: {
        type: String,
        default: 'col-span-4'
    },
    inputGrid: {
        type: String,
        default: 'col-span-4'
    },
    type: {
        default: "text",
        type: String,
    },
    placeholder: String,
});
const emit = defineEmits(["update:modelValue"]);

const input = computed({
    get: () => props.modelValue,
    set: (value) => emit("update:modelValue", value),
});
</script>

