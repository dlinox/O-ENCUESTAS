<template>
    <ul role="list" class="rounded-lg bg-white divide-y divide-gray-150  shadow-lg overflow-hidden">
        <li v-for="(item, index) in topics" class="flex justify-between gap-x-6 p-3 hover:bg-blue-100  cursor-pointer"
            :class="currentTopic === item.id ? 'bg-blue-50' : ''"
            @click="currentTopic === item.id ? null : setDataStore(item.id)">
            <div class="flex gap-x-4">
                <div class="min-w-0 flex-auto ">
                    <p class="text-sm font-semibold leading-6 uppercase text-gray-600"
                        :class="currentTopic === item.id ? 'text-gray-900' : ''">
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

import { ref } from 'vue';
import { useRoute } from "vue-router";
import { useDataStore } from '@/store';
import http from '@/utils/https';

const route = useRoute();
const dataStore = useDataStore();

const topics = ref(null);
const currentId = route.params.id;
const currentTopic = ref(null);

const setDataStore = async (idTopic) => {

    let topic = dataStore.topics.find(item => item.id == idTopic);

    if (topic.sections?.length > 0) {
        dataStore.sections = topic.sections;
        currentTopic.value = idTopic;
        dataStore.currentTopic = idTopic;
        return;
    }

    let _sections = await http.get(`sections/${idTopic}/`);
    _sections = _sections.data.data;
    _sections.sort((a, b) => a.ordinal - b.ordinal);

    dataStore.topics.map((item) => {
        if (item.id == idTopic) {
            item.sections = _sections;
            dataStore.sections = item.sections;
        }
    });

    currentTopic.value = idTopic;

    dataStore.currentTopic = idTopic;
}

const initComponent = async () => {

    let res = await http.get(`topics/${currentId}/`);

    res = res.data.data;
    res.sort((a, b) => a.ordinal - b.ordinal);

    dataStore.topics = res;

    topics.value = res;

    if (topics.value.length > 0) {
        let firtTopic = topics.value[0].id;
        setDataStore(firtTopic);
    }
}

initComponent();

</script>