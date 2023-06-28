<template>
    <h4>ubigeo</h4>
    <!-- <UbigeoForm v-model="ubigeo"></UbigeoForm> -->
    <div class="max-w-xl mx-auto bg-blue-50 p-5">

        <MultiOptionInput :question="question" v-model="answer" />
        <pre>
           answer:  {{ answer }}
        </pre>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import MultiOptionInput from '../components/Forms/MultiOptionInput.vue';

const question = ref({
    statement: '',
    options: [
        {
            title: 'Opcion 1',
        },
        {
            title: 'Opcion 2',
        },
        {
            title: 'Opcion 3',
        },
    ]
});

const answer = ref([]);


</script>