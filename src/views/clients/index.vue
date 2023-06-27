<template>
  <ClientLayout>
    <template #header.title> Encuestas </template>
    <template #header.subtitle> Listado de encuestas disponibles </template>
    <div class="container">
      <div class="mx-auto max-w-7xl">
        <div class="p-4 bg-white my-4">
          <ul role="list" class="divide-y divide-gray-100">
            <li v-for="survey in surveys" :key="survey.id" class="">
              <router-link :to="'/survey/' + survey.id" class="flex justify-between gap-x-6 py-5 relative group">
                <div class="flex gap-x-4 ">
                  <div class="h-12 w-12 p-2 flex-none rounded-sm bg-blue-50 text-blue-500">
                    <ClipboardDocumentListIcon />
                  </div>
                  <div class="min-w-0 flex-auto">
                    <p class="text-sm font-semibold leading-6 text-gray-900 uppercase group-hover:text-blue-700 ">{{ survey.title }}</p>
                    <p class="mt-1 truncate text-xs leading-5 text-gray-500">{{ survey.description ?
                      survey.description : 'Descripciond de la encuesta' }}</p>
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
    </div>
  </ClientLayout>
</template>
<script setup>
import { computed, ref } from 'vue';
import ClientLayout from '@/layouts/ClientLayout.vue';
import { useDataStore } from '@/store/index';
import { useAuthStore } from '@/store/auth';
import ButtonPrimary from '../../components/ButtonPrimary.vue';
import CryptoJS from 'crypto-js';
import http from '../../utils/https';
import { ClipboardDocumentListIcon } from '@heroicons/vue/20/solid';

const secretKey = '123566asdsd';
const authStore = useAuthStore();

const dataStore = useDataStore();
const surveys = computed(() => dataStore.surveys);

const getMenu = async () => {

  // let idAccount_ = authStore.account;
  // let idModule_ = authStore.module;
  // var bytes = await CryptoJS.AES.decrypt(idAccount_, secretKey);
  // idAccount_ = await bytes.toString(CryptoJS.enc.Utf8);
  // console.log(idAccount_);
  // http.post('http://38.43.133.27/SYSTEMS/SUBMODULE_BY_ACCOUNT/v1/', { idAccount_: idAccount_, idModule_: idModule_ })
}

const init = () => {
  console.log('ini survey');
}
init();
</script>
