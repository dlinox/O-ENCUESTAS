<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-24 w-auto" src="/logo.png" alt="UNA PUNO" />
    </div>
    <the-card
      class="relative sm:mx-auto sm:w-full sm:max-w-sm mt-10"
      variant="image"
    >
      <Tabs v-model="loginTab">
        <Tab
          v-for="(item, index) in _tabs"
          :key="index"
          :name="item.name"
          :title="item.title"
        >
          <LoginReguarForm v-if="item.name === 'regular'" />
          <LoginEntrantsForm v-else />
        </Tab>
      </Tabs>
    </the-card>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { AuthService } from "@/services";
import { TheCard, Tabs, Tab } from "flowbite-vue";
import LoginReguarForm from "./components/LoginRegularForm.vue";
import LoginEntrantsForm from "./components/LoginEntrantsForm.vue";

const router = useRouter();
const authService = new AuthService();

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
