<template>
  <div class="mt-4 p-3" :class="listClass">
    <div class="flex justify-between align-center">
      <slot name="title">
        <h4 class="text-base font-semibold mt-2">{{ title }}</h4>
      </slot>
      <slot name="actions"> </slot>
    </div>

    <div v-if="withHeader" class="h-px flex-auto bg-gray-100 my-3"></div>
    <slot name="inputs"> </slot>
    <slot name="content"> </slot>
  </div>
</template>
<script setup>
const props = defineProps({
  listClass: {
    default: "rounded-lg border-solid border-2 border-gray-100",
    type: String,
  },
  title: String,
  withHeader: {
    default: true,
    type: Boolean
  },
});
</script>
