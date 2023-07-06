<template>
  <div>
    <Input v-model="input" :type="type" :label="label" :class="error?.isError ? 'input-danger' : ''" />
    <div class="w-full text-end">
      <span class=" text-xs text-red-600 ">{{ error?.text }}</span>
    </div>
  </div>
</template>
<script setup>
import { computed } from "vue";
import { Input } from "flowbite-vue";

const props = defineProps({
  modelValue: [String, Number, Object, Array],
  label: String,
  placeholder: String,
  type: {
    default: "text",
    type: String,
  },
  error: {
    type: [Object],
    default: {
      isError: false,
      text: null
    }

  },
});

const emit = defineEmits(["update:modelValue"]);

const input = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>
