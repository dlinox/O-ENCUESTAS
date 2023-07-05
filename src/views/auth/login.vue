<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-24 w-auto" src="@/assets/logo.png" alt="UNA PUNO" />
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="submit">
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">DNI</label>
          <div class="mt-2">
            <input id="text" name="user" type="user" autocomplete="user" required v-model="form.user"
              class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6">
          </div>
        </div>
        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Contraseña</label>
            <div class="text-sm">
              <a href="#" class="font-semibold text-blue-600 hover:text-blue-500">Olvidaste tu contraseña?</a>
            </div>
          </div>
          <div class="mt-2">
            <input id="password" name="password" type="password" autocomplete="current-password" required
              v-model="form.password"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6">
          </div>
        </div>

        <div>
          <button type="submit"
            class="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
            Ingresar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { AuthService } from '../../services';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const authService = new AuthService();
const form = ref({
  user: '70757838',
  password: '235674'
});

const submit = async () => {

  await authService.login(form.value);
  router.push({ name: 'home' });


}

const init = async () => {

  let isLogget = authService.validateUser();
  if (isLogget) {
    router.push({ name: 'home' });
  }
}

init();

</script>
