<template>
    <ul role="list" class="rounded-lg bg-white divide-y divide-gray-150  shadow-lg overflow-hidden">
        <li v-for="(item, index) in topics" class="flex justify-between gap-x-6 p-3 hover:bg-blue-100  cursor-pointer"
            :class="currentTopic === item.id ? 'bg-blue-50' : ''"
            @click="currentTopic === item.id ? null : setDataStore(item)">
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
import { SurveyService } from '@/services/index'

const route = useRoute();
const dataStore = useDataStore();
const surveyService = new SurveyService();

const topics = ref(null);
const currentId = route.params.id;
const currentTopic = ref(null);

const setDataStore = async (topic) => {


    let _topic = dataStore.topics.find(item => item.id == topic.id);

    if (_topic.sections?.length > 0) {
        dataStore.sections = _topic.sections;
        currentTopic.value = topic.id;
        dataStore.currentTopic = topic;


        if (dataStore.sections.length > 0) {
            getQuestions(dataStore.sections[0].id);
        }


        return;
    }

    let _sections = await surveyService.getSections(topic.id);

    _sections.sort((a, b) => a.ordinal - b.ordinal);

    dataStore.topics.map((item) => {
        if (item.id == topic.id) {
            item.sections = _sections;
            dataStore.sections = item.sections;
        }
    });


    currentTopic.value = topic.id;
    dataStore.currentTopic = topic;

    if (dataStore.sections.length > 0) {
        getQuestions(dataStore.sections[0].id);
    }
}

const getQuestions = (sectionId) => {
    //console.log(dataStore.topics);

    dataStore.topics.map((item) => {

        if (item.id === dataStore.currentTopic.id) {

            item.sections.map(async (section) => {
                if (section.id == sectionId) {
                    if (section.questions) {
                        dataStore.questions = section.questions;
                    }
                    else {
                        let res = await surveyService.getQuestions(section.id);
                        let questions = res;
                        questions.sort((a, b) => a.ordinal - b.ordinal);
                        section.questions = questions;
                        dataStore.questions = questions;
                    }
                }
            })
        }

    });
}


const initComponent = async () => {
    let res = await surveyService.getTopics(route.params.id);
    res.sort((a, b) => a.ordinal - b.ordinal);
    dataStore.topics = res;
    topics.value = res;
    if (topics.value.length > 0) {
        let firtTopic = topics.value[0];
        setDataStore(firtTopic);
    }
}
initComponent();

</script>