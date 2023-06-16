<template>
  <ClientLayout>
    <template #header.title> Encuestas </template>
    <template #header.subtitle> Listado de encuestas disponibles </template>
    <div class="container">
      <div class="grid bg-white shadow-lg p-5 rounded-lg">
        <ul>
          <li v-for="(item, index) in surveys" class=" hover:text-blue-600">
            <router-link :to="'/survey/' + item.id">
              {{ item.title }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </ClientLayout>
</template>
<script setup>
import ClientLayout from '@/layouts/ClientLayout.vue'
import { useDataStore } from '../../store/index'
import { computed } from 'vue';
const dataStore = useDataStore();
const surveys = computed(() => dataStore.surveys);

</script>
