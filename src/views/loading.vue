<template>
    <div class="h-screen w-screen bg-blue-50 flex items-center justify-center">
        <img src="@/assets/logo.png" width="120" alt="">
    </div>
</template>
<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();


const init = new Promise((resolve, reject) => {

    let query = route.query;

    if (query) {
        resolve(query);
    }
    else {
        reject(false);
    }
})

init.then((query) => {
    console.log('query', query);
}).catch((error) => {
    console.log(error);
});

</script>