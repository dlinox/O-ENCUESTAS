<template>
  <button :disabled="isDisabled" type="button" :class="isDisabled ? 'disabled:opacity-75 cursor-not-allowed' : ''"
    class="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
    <slot name="content">
      {{ title }}
    </slot>
  </button>
</template>
<script setup>
const props = defineProps({
  title: {
    default: "Button",
    type: String,
  },

  isDisabled: Boolean
});
</script>
