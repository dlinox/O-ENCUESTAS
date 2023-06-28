<template>
     <router-view></router-view>
</template>
<script setup>
import { useDataStore } from './store';
import { useAuthStore } from './store/auth'
import { useRoute } from 'vue-router';

const route = useRoute();
const dataStore = useDataStore();
const authStore = useAuthStore();

const init = async () => {
     console.log('init app');
  
     setTimeout(() => {
          authStore.setCurretUser(route.query);
     }, 100);

     let res = await dataStore.getSurveys();
     dataStore.setSurveys(res);
}
init();
</script>


