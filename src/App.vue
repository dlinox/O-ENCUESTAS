<template>
     <router-view></router-view>
</template>
<script setup>
import { ref } from 'vue';
const appLoading = ref(false);

const init = async () => {

     appLoading.value = false;
     setTimeout(() => {
     }, 100);
     appLoading.value = false;
}

init();
</script>