<template>
    <ul role="list" class="rounded-lg bg-white divide-y divide-gray-150  shadow-lg">

        <li v-for="(item, index) in sections" class="flex justify-between gap-x-6 p-3">
            <div class="flex gap-x-4">
                <div class="min-w-0 flex-auto">
                    <p class="text-sm font-semibold leading-6 text-gray-600">
                        <!-- :class="item.current ? 'text-blue-600' : 'text-gray-900'" -->
                        {{ item.title }}
                    </p>
                    <p class="mt-1 truncate text-xs leading-5 text-gray-500">
                        <!-- {{ item.complete ? "Finalizado" : "Pendiente" }} -->
                    </p>
                </div>
            </div>

            <div class="hidden sm:flex sm:flex-col sm:items-end">
                <p class="mt-1 text-xs leading-5 text-gray-500">
                    <!-- {{ item.questions.length }} Pregunta(s) -->
                </p>
            </div>

        </li>
    </ul>
</template>
<script setup>
import { ref, computed } from 'vue';
import { useSurveyStore } from '@/store/index';
const surveyStore = useSurveyStore();

const sections = ref(null);


const initComponent = async () => {
    let res = await fetch('http://38.43.133.27/SURVEYS/v1/topics/00f8bb07-09ee-11ee-9726-00505689a76b/');
    let json = await res.json();
    

    console.log(json);
    sections.value = json.data;
}

initComponent();

</script>