<template>
    <pre>
        {{ useDemoStore.surveys }}
    </pre>
</template>
<script setup>
import { useDataDemoStore } from "../store/index"
const useDemoStore = useDataDemoStore();

</script>