<template>
     <router-view></router-view>
</template>
<script setup>
import { useDataStore } from './store';
import { useAuthStore } from './store/auth'

const dataStore = useDataStore();
const authStore = useAuthStore();

const init = async () => {
     console.log('init app');

     authStore.setCurretUser();

     let res = await dataStore.getSurveys();//pasar al home
     dataStore.setSurveys(res);//pasar al home

}
init();
</script>


