<template>
  <div class="bg-blue-50 h-full min-h-screen">
    <nav class="bg-white border-2">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <img class="h-8 w-8" src="@/assets/logo.png" alt="UNA PUNO" />
            </div>
          </div>
          <div class="hidden md:block">
            <div class="ml-4 flex items-center md:ml-6">
              <button @click="logout" type="button"
                class="rounded-full bg-gray-800 p-2 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-4 h-4">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <header class="bg-white shadow">
      <slot name="header">
        <div class="mx-auto w-full px-4 py-3 sm:px-6 lg:px-8 flex justify-between align-center bg-blue">
          <div>
            <h2 class="text-xl font-bold tracking-tight text-gray-700 uppercase">
              <slot name="header.title"> titulo </slot>
            </h2>
            <span class="titulo text-sm font-semibold text-gray-400">
              <slot name="header.subtitle"> subtitle </slot>
            </span>
          </div>
          <div class="flex">
            <slot name="header.actions">

            </slot>
          </div>
        </div>
      </slot>
    </header>

    <main>
      <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <slot></slot>
      </div>
    </main>
  </div>
</template>
<script setup>
import { computed } from "vue";
import { useAuthStore } from "../store/auth";
const authStore = useAuthStore();
const props = defineProps({});

const logout = () => {
  console.log('salir');
  authStore.logout();
}

</script>
