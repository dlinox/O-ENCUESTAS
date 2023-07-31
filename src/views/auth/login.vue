<template>
  <div
    class="h-screen bg-gradient-to-b from-gray-100 to-blue-100 flex flex-col"
  >
    <button
      @click="isShowHelpModal = true"
      class="fixed top-4 right-4 z-50 block md:hidden bg-blue-500 text-white rounded-full p-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
        />
      </svg>
    </button>
    <Modal
      v-if="isShowHelpModal"
      @close="isShowHelpModal = !isShowHelpModal"
      :escapable="true"
    >
      <template #header>
        <div class="flex items-center text-lg">Completar la Ficha Integral</div>
      </template>
      <template #body>
        <div class="flex flex-col items-center">
          <div class="text-gray-500 w-full">
            <div class="flex items-start flex-col mb-4">
              <strong class="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6 text-blue-600 me-2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Regulares:
              </strong>

              Ingresar usando su cuenta de "Enchufate"
            </div>
            <div class="flex items-start flex-col">
              <strong class="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6 text-blue-600 me-2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Ingresantes:
              </strong>
              Ingresar usando su DNI y fecha de nacimiento.
              <ul class="text-gray-500 list-disc list-inside text-sm ms-4 mt-1">
                <li><strong>DNI</strong>: 00000000</li>
                <li><strong>Contraseña</strong>: 07302005 (DiaMesAño)</li>
              </ul>
            </div>
          </div>
        </div>
      </template>
    </Modal>

    <main class="h-full flex items-center justify-center">
      <div
        class="w-full px-3 sm:px-6 lg:max-w-3xl xl:max-w-4xl 2xl:max-w-5xl 3xl:max-w-6xl p-8"
      >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="hidden md:flex flex-col items-center">
            <!-- Logo -->
            <img src="logo.png" alt="Logo UNA-PUNO" class="mb-4" width="100" />
            <!-- Descripción -->
            <h1 class="text-2xl text-gray-700 mb-4">
              Bienvenido al sistema de encuestas de la UNA-PUNO
            </h1>
            <p class="text-gray-500 mb-3">LLenado de la ficha Integral</p>
            <div class="text-gray-500 w-full">
              <div class="flex items-start flex-col mb-4">
                <strong class="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6 text-blue-600 me-2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Regulares:
                </strong>

                Ingresar usando su cuenta de "Enchufate"
              </div>
              <div class="flex items-start flex-col">
                <strong class="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6 text-blue-600 me-2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Ingresantes:
                </strong>
                Ingresar usando su DNI y fecha de nacimiento.
                <ul
                  class="text-gray-500 list-disc list-inside text-sm ms-4 mt-1"
                >
                  <li><strong>DNI</strong>: 00000000</li>
                  <li><strong>Contraseña</strong>: 07302005 (DiaMesAño)</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="px-0 sm:w-96 mx-auto md:px-0 flex flex-col">
            <div class="md:hidden flex flex-col items-center">
              <img src="logo.png" alt="Logo UNA-PUNO" class="mb-4" width="70" />

              <h1
                class="text-md px-8 sm:text-xl text-center font-semibold text-gray-700 mb-4"
              >
                Bienvenido al sistema de encuestas de la UNA-PUNO
              </h1>
            </div>

            <div class="bg-white rounded-lg shadow-md mt-auto">
              <Tabs v-model="loginTab" variant="underline">
                <Tab
                  v-for="(item, index) in _tabs"
                  :key="index"
                  :name="item.name"
                  :title="item.title"
                >
                  <div class="px-4 pt-1 pb-4 relative">
                    <LoginReguarForm v-if="item.name === 'regular'" />
                    <LoginEntrantsForm v-else />
                  </div>
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
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
import { AuthService } from "@/services";
import { Modal, Tabs, Tab } from "flowbite-vue";
import LoginReguarForm from "./components/LoginRegularForm.vue";
import LoginEntrantsForm from "./components/LoginEntrantsForm.vue";

const router = useRouter();
const authService = new AuthService();

const isShowHelpModal = ref(false);

const _tabs = [
  { name: "entrants", title: "Ingresante" },
  { name: "regular", title: "Regulares" },
];

const loginTab = ref("entrants");

const init = async () => {
  let isLogget = authService.validateUser();
  if (isLogget) {
    router.push({ name: "home" });
  }
};

init();
</script>
<style>
.loading {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.8);
  z-index: 2;
}
</style>
