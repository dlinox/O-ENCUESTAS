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


        <ButtonPrimary title="Get Menu" @click="getMenu()" />
      </div>
    </div>
  </ClientLayout>
</template>
<script setup>
import { computed, ref } from 'vue';
import ClientLayout from '@/layouts/ClientLayout.vue';
import { useDataStore } from '../../store/index';
import { useAuthStore } from '../../store/auth';

import ButtonPrimary from '../../components/ButtonPrimary.vue';
import httpsys from '../../utils/httpsys';
import CryptoJS from 'crypto-js';
import http from '../../utils/https';

const secretKey = '123566asdsd';

const dataStore = useDataStore();
const authStore = useAuthStore();
const surveys = computed(() => dataStore.surveys);

const getMenu = async () => {
  let idAccount_ = authStore.account;
  let idModule_ = authStore.module;
  var bytes = await CryptoJS.AES.decrypt(idAccount_, secretKey);
  idAccount_ = await bytes.toString(CryptoJS.enc.Utf8);
  console.log(idAccount_);
  http.post('http://38.43.133.27/SYSTEMS/SUBMODULE_BY_ACCOUNT/v1/',  { idAccount_: idAccount_, idModule_: idModule_ })
}

</script>
