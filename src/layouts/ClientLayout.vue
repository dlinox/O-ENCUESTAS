<template>
  <div class="bg-blue-50 h-full min-h-screen">
    <Navbar>
      <template #logo>
        <NavbarLogo link="https://www.google.com/" alt="Flowbite logo" image-url="/logo.png">
          UNA-PUNO
        </NavbarLogo>
      </template>

      <template #menu-icon>
        {{ '' }}
      </template>

      <Button color="alternative" size="sm" @click="logout">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
        </svg>
      </Button>
    </Navbar>


    <main>
      <div class="main-wrapper mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <slot></slot>
      </div>
    </main>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/auth";
import { Navbar, NavbarLogo, NavbarCollapse, NavbarLink, Button } from 'flowbite-vue'
const router = useRouter();
const authStore = useAuthStore();
const props = defineProps({});

const showmenu = () => {
  console.log('lino');
}

const logout = () => {
  console.log('salir');
  authStore.logout();
  router.push({ name: 'login' });
}

</script>
<style >
.input-danger {
  color: red;

}

.input-danger input {
  border: 2px solid #ff0000;
  background-color: rgba(255, 0, 0, .02);

}

.input-danger input:focus {
  border: 2px solid #ff0000;
  box-shadow: none;
}
</style>