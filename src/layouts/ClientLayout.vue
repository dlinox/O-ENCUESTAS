<template>
  <div class="bg-blue-50 h-full min-h-screen">
    <nav class="bg-white border-2">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <img class="h-8 w-8" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                alt="Your Company" />
            </div>
          </div>
          <div class="hidden md:block">
            <div class="ml-4 flex items-center md:ml-6">
              <button @click="logout" type="button"
                class="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                  aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
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
