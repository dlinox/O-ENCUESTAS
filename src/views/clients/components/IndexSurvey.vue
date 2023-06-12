<template>
    <ul role="list" class="rounded-lg bg-white divide-y divide-gray-100">

        <li class="flex justify-between gap-x-6 p-3">
            <div class="flex gap-x-4">
                <div class="min-w-0 flex-auto">
                    <p class="text-sm font-semibold leading-6 text-blue-600">
                        Datos Personales
                    </p>
                    <p class="mt-1 truncate text-xs leading-5 text-gray-500">
                    </p>
                </div>
            </div>
        </li>

        <li v-for="(item, index) in surveyStore.survey.secctions" class="flex justify-between gap-x-6 p-3">
            <div class="flex gap-x-4">
                <div class="min-w-0 flex-auto">
                    <p class="text-sm font-semibold leading-6"
                        :class="item.current ? 'text-blue-600' : 'text-gray-900'">
                        {{ item.title }} 
                    </p>
                    <p class="mt-1 truncate text-xs leading-5 text-gray-500">
                        {{ item.complete ? "Finalizado" : "Pendiente" }}
                    </p>
                </div>
            </div>

            <div class="hidden sm:flex sm:flex-col sm:items-end">
                <p class="mt-1 text-xs leading-5 text-gray-500">
                    {{ item.questions.length }} Pregunta(s)
                </p>
            </div>

        </li>
    </ul>
</template>
<script setup>

import { useSurveyStore } from '@/store/index';
const surveyStore = useSurveyStore();

</script>