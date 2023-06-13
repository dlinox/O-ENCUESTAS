<template>

<pre>

{{ auto }}
</pre>
    <AutoComplete v-model="auto" />

  
</template>
<script setup>
import { ref } from 'vue';
import AutoComplete from '../components/Forms/AutoComplete.vue'
const auto = ref('null');

</script>