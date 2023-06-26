<template>
    <!-- Todo: Crear componente Button  -->
    <AdminLayout>
        <template #header.title> Encuesta </template>
        <template #header.subtitle> Encuesta </template>
        <router-view></router-view>
    </AdminLayout>
</template>
<script setup>
import AdminLayout from "@/layouts/AdminLayout.vue";
</script>
  