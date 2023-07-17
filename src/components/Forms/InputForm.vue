<template>
  <div>
    <label
      for="price"
      class="col-span-4 text-sm font-medium leading-6 text-gray-900 capitalize"
    >
      {{ label }}
      <span class="text-red-700">
        {{ isRequired ? "*" : "" }}
      </span>
    </label>

    <Input
      :readonly="isReadonly"
      v-model="input"
      :type="type"
      :class="error?.isError ? 'input-danger' : ''"
    />
    <div class="w-full text-end">
      <span class="text-xs text-red-600">{{ error?.text }}</span>
    </div>
  </div>
</template>
<script setup>
import { computed } from "vue";
import { Input } from "flowbite-vue";

const props = defineProps({
  modelValue: [Number, String, Object, Array],
  label: String,
  placeholder: String,
  type: {
    default: "text",
    type: String,
  },
  isRequired: {
    type: Boolean,
    default: false,
  },
  isReadonly: {
    type: Boolean,
    default: false,
  },
  error: {
    type: [Object],
    default: {
      isError: false,
      text: null,
    },
  },
});

const emit = defineEmits(["update:modelValue"]);

const input = computed({
  get: () =>
    typeof props.modelValue === "string"
      ? props.modelValue
      : props.modelValue?.toString(),
  set: (value) => emit("update:modelValue", value),
});
</script>
