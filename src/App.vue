<template>
     <router-view></router-view>
</template>
<script setup>
import { ref } from 'vue';
import { useAuthStore } from './store/auth';

const authStore = useAuthStore();
const appLoading = ref(false);

const init = async () => {

     appLoading.value = false;
     setTimeout(() => {
     }, 100);
     authStore.setCurretUser();
     appLoading.value = false;
}

init();
</script>