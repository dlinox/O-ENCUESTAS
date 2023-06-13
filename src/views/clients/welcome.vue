<template>
    <ClientLayout>
        <template #header.title>FICHA INTEGRAL DEL ESTUDIANTE UNIVERSITARIO</template>
        <template #header.subtitle>Los datos a registrar son de carácter confidencial</template>


        <div class="grid grid-cols-4 gap-4">
            <div class="col-span-1">
                <IndexSurvey />
            </div>
            <div class="col-span-3 rounded-lg bg-white p-3">
                <div class="px-6">
                    <h3 class="text-base font-semibold leading-7 text-gray-900">
                        Bienvenido(a)
                    </h3>
                    <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                        FICHA INTEGRAL.
                    </p>
                </div>
                <div class="px-8 mt-6 border-t border-gray-100">
                    <dl class="divide-y divide-gray-100">
                        <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0" v-for="item in dataStudent">
                            <dt class="text-sm font-medium leading-6 text-gray-900">
                                {{ item.key }}
                            </dt>
                            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {{ item.value }}
                            </dd>
                        </div>
                    </dl>
                    <div class="border-t border-gray-100 pt-4 flex justify-end">
                        <RouterLink to="/encuesta/1">
                            <ButtonPrimary title="Guardar" />
                        </RouterLink>
                        <RouterLink to="/encuesta/1">
                            <ButtonPrimary class="ms-3" title="Guardar y continuar" />
                        </RouterLink>
                    </div>
                </div>
            </div>
        </div>

    </ClientLayout>
</template>
<script setup>
import ClientLayout from "@/layouts/ClientLayout.vue";
import ButtonPrimary from "@/components/ButtonPrimary.vue";
import IndexSurvey from "./components/IndexSurvey.vue"

const dataStudent = [
    {
        key: "Nombre(s)",
        value: "Denis Lino",
    },
    {
        key: "Apellidos",
        value: "Puma Ticona",
    },
    {
        key: "Lugar de origen",
        value: "Departamento, Provincia, Ditstrito",
    },
    {
        key: "Lugar de residencia",
        value: "Departamento, Provincia, Ditstrito",
    },
    {
        key: "Fecha de nacimiento",
        value: "25 de Julio del 1230",
    },
    {
        key: "Correo electronico",
        value: "dpumaticona@gmail.com",
    },
    {
        key: "Número de celular",
        value: "951208106",
    },
];

</script>
  