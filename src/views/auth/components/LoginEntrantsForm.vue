<template>
    <form class="mt-4" @submit.prevent="submit">
        <Input v-model.trim="form.user" class="mb-2" placeholder="Ingrese su numero de DNI" label="DNI" />
        <Input v-model.trim="form.password" class="mb-2" placeholder="Ingrese su contaseña" label="Contraseña" type="password" />
        <div class="flex justify-end mt-4">
            <Button color="default" tyep="submit">
                Ingresar
                <template #suffix>
                    <svg class="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                            clip-rule="evenodd"></path>
                    </svg>
                </template>
            </Button>
        </div>
    </form>
</template>
<script setup>
import { ref } from 'vue';
import { AuthService } from '@/services';
import { useRouter } from 'vue-router';
import { Input, Button } from 'flowbite-vue';

const router = useRouter();

const authService = new AuthService();

const form = ref({
    user: '70757838',
    password: '230001'
});

const submit = async () => {
    await authService.login(form.value);
    router.push({ name: 'home' });
}
</script>