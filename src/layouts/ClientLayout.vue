<template>
  <div
    class="bg-gradient-to-b from-gray-100 to-blue-100 h-full min-h-screen flex flex-col justify-between"
  >
    <Navbar>
      <template #logo>
        <router-link :to="{ name: 'home' }">
          <img :src="baseUrl + 'logo.png'" alt="" width="45" />
        </router-link>
      </template>

      <template #menu-icon>
        {{ "" }}
      </template>

      <Button
        color="alternative"
        :class="
          authStore.currentUser
            ? ' border border-blue-500'
            : 'border  border-red-500'
        "
        size="sm"
        @click="logout"
      >
        <div
          class="inline-flex"
          :class="authStore.currentUser ? 'text-blue-500' : 'text-red-500'"
        >
          Salir
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5 ml-3"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
            />
          </svg>
        </div>
      </Button>
    </Navbar>

    <main>
      <div class="main-wrapper mx-auto max-w-7xl sm:px-6 lg:px-8">
        <slot></slot>
      </div>
    </main>

    <footer class="bg-blue-100 p-4 text-center">
      <p class="text-gray-500">
        © 2023 OTI - UNA PUNO. Todos los derechos reservados.
      </p>
    </footer>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Navbar, Button } from "flowbite-vue";
import { useAuthStore } from "../store/auth";

const router = useRouter();
const authStore = useAuthStore();
const props = defineProps({});

const baseUrl = import.meta.env.VITE_APP_BASE_URL;

const curretUser = ref(null);

const getCurretUser = async () => {
  await authStore.setCurrentUser();
};

getCurretUser();
const logout = () => {
  console.log("salir");
  authStore.logout();
  router.push({ name: "login" });
};
</script>
<style>
.input-danger {
  color: red;
}

.input-danger input {
  border: 2px solid #ff0000;
  background-color: rgba(255, 0, 0, 0.02);
}

.input-danger input:focus {
  border: 2px solid #ff0000;
  box-shadow: none;
}
</style>
