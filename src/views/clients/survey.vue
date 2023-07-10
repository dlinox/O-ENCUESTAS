<template>
    <ClientLayout>

        <template v-if="isLoading">
            <div class="pre-loading">
                cargando...
            </div>
        </template>

        <template v-else>
            <h2 class="text-xl uppercase mb-4 font-bold"> {{ currentSurvey?.title }} </h2>
 
            <div class="grid grid-cols-4 gap-4">

                <Alert type="info" class="col-span-4" ref="alert">
                    <strong> Indicaciones: </strong>
                    <p>
                        Estudiantes Universitarios. Lea y responda todos los ítems de manera obligatoria, verídica y
                        detallada.
                    </p>
                    <p>
                        Los datos consignados son confidenciales (Según ley de protección de datos personales).
                    </p>
                </Alert>

                <div class="col-span-4 md:col-span-1  ">
                    <IndexSurvey />
                </div>

                <div class="col-span-4 md:col-span-3 rounded-lg bg-white p-4 shadow-lg">
                    <div class="">
                        <h3 class="text-lg font-semibold mb-3 uppercase">
                            {{ currentTopic.title }}
                        </h3>
                        <h4 class="text-sm uppercase mb-4 font-bold"> {{ currentSection?.title }} </h4>
                    </div>

                    <template v-if="sections.length == 0">
                        <h4 class="text-center text-lg uppercase  font-extrabold text-gray-400 align-items-center">
                            no hay secciones
                        </h4>
                    </template>

                    <template v-else>
                        <FormQuestion v-if="questions?.length > 0" :questions="questions" :section="currentSection">
                            <template v-slot:footer="{ submit }">
                                <div class="flex justify-between">
                                    <div>
                                        <Button v-if="currentSection.previous">
                                            <div class="text-start">
                                                <span>Anterior</span>
                                                <h5 class="text-lg"> {{ nextSection.title }} </h5>
                                            </div>
                                        </Button>
                                    </div>
                                    <div>
                                        <Button v-if="currentSection.next" @click="submit">
                                            <div class="text-end">
                                                <span>Siguiente </span>
                                                <h5 class="text-lg capitalize"> {{ nextSection.title }} </h5>
                                            </div>
                                        </Button>
                                    </div>
                                </div>
                            </template>
                        </FormQuestion>
                    </template>
                </div>
            </div>
        </template>
    </ClientLayout>
    
</template>
<script setup>
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useDataStore } from '@/store';
import { SurveyService } from "@/services";

import ClientLayout from "@/layouts/ClientLayout.vue";

import IndexSurvey from "./components/IndexSurvey.vue"
import FormQuestion from "./components/Form.vue"

import { Alert, Button } from "flowbite-vue";

const router = new useRouter();

const surveyService = new SurveyService();
const dataStore = useDataStore();

const route = useRoute();

const surveyCurrent = ref(null);
const questions = ref([]);
const sections = computed(() => dataStore.sections)

const currentSurvey = computed(() => dataStore.currentSurvey);
const currentTopic = computed(() => dataStore.currentTopic);

const currentSection = computed(() => dataStore.currentSection);
const nextSection = computed(() => dataStore.nextSection);

const isLoading = ref(false);

const setCurrerts = (survey, _topics, _sections) => {

    dataStore.currentTopic = _topics.find((item) => item.id === route.params.topic);
    dataStore.currentSection = _sections.find((item) => item.id === survey.section);
    dataStore.nextSection = _sections.find((item) => item.id === dataStore.currentSection.next);
    dataStore.prevSection = _sections.find((item) => item.id === dataStore.currentSection.previous);

}

const getSurveyData = async () => {

    let survey = await surveyService.getSurvey(route.params.id);

    if (!survey) {
        router.push({ name: 'home' });
    }

    else {
        surveyCurrent.value = survey;
        if (survey.topic === route.params.topic && survey.section === route.params.section) {
            let _topics = await surveyService.getTopics(route.params.id);
            let _sections = await surveyService.getSections(route.params.topic);
            let _questions = await surveyService.getQuestions(route.params.section);

            dataStore.topics = _topics;
            dataStore.sections = _sections;
            questions.value = _questions;
            setCurrerts(survey, _topics, _sections);
        }

        else {
            router.back();
            dataStore.cont++;
        }
    }
}

const getSurveyDataWithOutCurrents = async () => {

    let survey = await surveyService.getSurvey(route.params.id);

    if (!survey) {
        router.push({ name: 'home' });
    }

    else {

        surveyCurrent.value = survey;

        let _topics = await surveyService.getTopics(route.params.id);
        let _sections = await surveyService.getSections(_topics[0].id);
        let _questions = await surveyService.getQuestions(_sections[0].id);

        let res = await dataStore.setPositions(survey.id, _topics[0].id, _sections[0].id);

        if (res) {

            dataStore.topics = _topics;
            dataStore.sections = _sections;
            questions.value = _questions;

            dataStore.currentTopic = _topics[0];
            dataStore.currentSection = _sections[0];
            dataStore.nextSection = _sections.find((item) => item.id === survey.section);

        }
        else {
            router.push({ name: 'home' });
        }
    }
}

const initSurvey = async () => {
    let idParams = route.params.id;
    let topicParams = route.params.topic;
    let sectionParams = route.params.section;
    if (topicParams == 'null' && sectionParams == 'null') {
        isLoading.value = true;
        await getSurveyDataWithOutCurrents();
        isLoading.value = false;
    }

    else if (idParams && topicParams && sectionParams) {
        isLoading.value = true;
        await getSurveyData();
        isLoading.value = false;
    }

    else {
        router.push({ name: 'home' });
    }
}

initSurvey();


</script>
<style>
.pre-loading {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
}
</style>