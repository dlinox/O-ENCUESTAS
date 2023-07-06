<template>
    <list-group class="w-full">
        <list-group-item class="py-3" v-for="topic in topics" :key="topic.id"
            :class="currentTopic === topic.id ? 'text-blue-600' : ''"
            @click="currentTopic === topic.id ? null : setDataStore(topic)">
            <template #prefix>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
                </svg>
            </template>
            <span class="capitalize">
                {{ topic.title }}
            </span>
        </list-group-item>
    </list-group>
</template>
<script setup>

import { ref } from 'vue';
import { useRoute } from "vue-router";
import { useDataStore } from '@/store';
import { SurveyService } from '@/services/index'
import { ListGroup, ListGroupItem } from 'flowbite-vue';

const route = useRoute();
const dataStore = useDataStore();
const surveyService = new SurveyService();

const topics = ref(null);
const currentTopic = ref(null);

const setDataStore = async (topic) => {

    let _topic = dataStore.topics.find(item => item.id == topic.id);

    if (_topic.sections?.length > 0) {
        dataStore.sections = _topic.sections;

        currentTopic.value = topic.id;
        //TODO: utilizar el servicio de actualizacion de current topic
        dataStore.currentTopic = topic;

        if (dataStore.sections.length > 0) {
            //TODO: obtener las preguntas de la seccion actual
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