<template>
     <router-view></router-view>
</template>
<script setup>
import { useDataStore } from './store';
const dataStore = useDataStore();

const init = async () => {
     //TODO: functions authServices
     console.log('init app');
     let res = await dataStore.getSurveys();
     dataStore.setSurveys(res);
}
init();
</script>

