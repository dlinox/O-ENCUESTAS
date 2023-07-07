<template>
  <ClientLayout>
    <template #header.title> Encuestas </template>
    <template #header.subtitle> Listado de encuestas disponibles </template>


    <div v-if="isLoading" class="w-100">
      ...Cargado...
    </div>


    <div v-else class="mx-auto max-w-7xl">

      <div class="p-4 bg-white my-4">
        <ul role="list" class="divide-y divide-gray-100">
          <li v-for="survey in surveys" :key="survey.id" class="">
            <router-link :to="`/survey/${survey.id}/${survey.topic}/${survey.section}`" class="flex justify-between gap-x-6 py-5 relative group">
              <div class="flex gap-x-4 ">
                <div class="h-12 w-12 p-2 flex-none rounded-sm bg-blue-50 text-blue-500">
                  <ClipboardDocumentListIcon />
                </div>
                <div class="min-w-0 flex-auto">
                  <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white uppercase">
                    {{ survey.title }}

                  </h5>

                  <p class="mt-1 truncate text-xs leading-5 text-gray-500">
                    {{ survey.description ?
                      survey.description : survey.title }}
                  </p>
                </div>
              </div>
              <div class="hidden text-center  sm:flex sm:flex-col sm:items-end ">
                <p class="text-sm  leading-6 text-gray-900">{{ survey.stage }}</p>
                <p class="mt-1 text-xs leading-5 text-gray-500">
                  Publicado: 23 de junio de 2023
                </p>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </ClientLayout>
</template>
<script setup>
import { computed, ref } from 'vue';
import ClientLayout from '@/layouts/ClientLayout.vue';
import { useDataStore } from '@/store/index.js';

import { ClipboardDocumentListIcon } from '@heroicons/vue/20/solid';

const dataStore = useDataStore();
const surveys = computed(() => dataStore.surveys);

const isLoading = ref(false);

const getListSurveys = async () => {
  let res = await dataStore.getSurveys();
  dataStore.setSurveys(res);
}

const init = async () => {
  console.log('ini survey');
  isLoading.value = true;
  await getListSurveys();
  isLoading.value = false;
}
init();
</script>
