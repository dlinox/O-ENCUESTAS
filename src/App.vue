<template>
  <template v-if="mant === 'mantenimiento'">
    <div
      class="flex items-center justify-center h-screen bg-gradient-to-br from-blue-500 to-purple-700"
    >
      <div class="text-center">
        <h1 class="text-4xl font-bold text-white mb-4">¡Volveremos pronto!</h1>
        <p class="text-lg text-white">
          Gracias por visitarnos. Estamos trabajando en mejoras.
        </p>
        <!-- <p class="text-lg text-white">Esperamos verte de nuevo pronto.</p> -->
      </div>
    </div>
  </template>
  <template v-else>
    <router-view></router-view>
  </template>
</template>
<script setup>
import { ref } from "vue";
const appLoading = ref(false);

const mant = import.meta.env.VITE_APP_STATUS;

const init = async () => {
  appLoading.value = false;
  setTimeout(() => {}, 100);
  appLoading.value = false;
};

init();
</script>
