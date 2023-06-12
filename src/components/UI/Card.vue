<template>
  <div class="border-2 radius-1xl p-4 sm:p-5 lg:flex-auto">
    <div>
      <slot name="header">
        <h3 class="text-2xl font-bold tracking-tight text-gray-900">
          {{ title }}
        </h3>
        <p class="mt-2 text-base leading-7 text-gray-600">
          {{ description }}
        </p> </slot
      >>
    </div>
    <div class="bg-black">
      <slot name="content" />
    </div>

    <div class="bg-black">
      <slot name="footer" />
    </div>
  </div>
</template>
<script setup>
const props = (defineProps = ref({
  title: String,
  subtitle: String,
}));
</script>
