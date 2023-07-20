<template>
  <Alert v-show="errorMessage !== null" type="danger" class="mt-4" >
    {{ errorMessage }}
  </Alert>
  <form class="mt-4" @submit.prevent="submit">
    <template v-if="isLoading">
      <div class="loading">
        <Spinner />
      </div>
    </template>
    <Input
      v-model.trim="form.username"
      class="mb-2"
      placeholder="Ingrese su numero de DNI"
      label="DNI"
    />
    <Input
      v-model.trim="form.password"
      class="mb-2"
      placeholder="Ingrese su contaseña"
      label="Contraseña"
      type="password"
    />
    <div class="flex justify-end mt-4">
      <Button color="default" tyep="submit">
        Ingresar
        <template #suffix>
          <svg
            class="ml-2 -mr-1 w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </template>
      </Button>
    </div>
  </form>
</template>
<script setup>
import { ref } from "vue";
import { AuthService } from "@/services";
import { useRouter } from "vue-router";
import { Input, Button, Spinner, Alert } from "flowbite-vue";

const router = useRouter();

const authService = new AuthService();

const isLoading = ref(false);

const form = ref({
  username: "",
  password: "",
});

const errorMessage = ref(null);

const submit = async () => {
  errorMessage.value = null;
  isLoading.value = true;

  let login = await authService.loginEntrants(form.value);

  if(!login.status){
     errorMessage.value =  'Credenciales no válidas';
  }

  isLoading.value = false;
  router.push({ name: "home" });
};
</script>
