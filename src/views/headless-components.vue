<template>
    <div>
        <HDropDown />
        <HSelect :options="selectOptions" item-title="name" item-value="idUser" v-model="hSelect" />

        <HAutoComplete v-model="hAutocomplete" />
        {{ hAutocomplete }}
    </div>
</template>
<script setup>
import { ref } from 'vue';
import HDropDown from '../components/HDropDown.vue';
import HSelect from '../components/HSelect.vue';
import HAutoComplete from '../components/HAutoComplete.vue';
const hSelect = ref(1);


const hAutocomplete = ref({ "userId": 6, "id": 101, "title": "explicabo enim cumque porro aperiam occaecati minima", "completed": false });
const selectOptions = [
    { idUser: 1, name: 'Select Opcion 1' },
    { idUser: 2, name: 'Select Opcion 2' },
    { idUser: 3, name: 'Select Opcion 3' },
];


</script>