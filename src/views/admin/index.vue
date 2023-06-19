<template>
    <!-- Todo: Crear componente Button  -->
    <AdminLayout>
        <template #header.title> Dashboard </template>
        <template #header.subtitle> Crear nueva Encuesta </template>
        <router-view></router-view>
    </AdminLayout>
</template>
<script setup>
import { ref } from "vue";
import AdminLayout from "@/layouts/AdminLayout.vue";
</script>
  