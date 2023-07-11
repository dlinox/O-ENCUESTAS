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
                        <FormQuestion v-if="questions?.length > 0" :questions="questions" :section="currentSection"
                            @onSuccess="getNextSecionTopic">
                            <template v-slot:footer="{ submit }">
                                <div class="flex justify-between w-full">
                                    <div>
                                        <Button v-if="currentSection.previous" color="light">
                                            <div class="text-start">
                                                <span>Anterior</span>
                                                <h5 class="text-lg capitalize">
                                                    Titulo seccion previa
                                                </h5>
                                            </div>
                                        </Button>
                                    </div>

                                    <div>
                                        <Button v-if="currentSection.next" @click="submit" color="light">
                                            <div class="text-end">
                                                <span>Siguiente </span>
                                                <h5 class="text-lg capitalize"> {{ nextSection.title }} </h5>
                                            </div>
                                        </Button>

                                        <template v-else>
                                            <template v-if="nextTopic !== null">
                                                <Button @click="submit">
                                                    <div class="text-end">
                                                        <span>Siguiente </span>
                                                        <h5 class="text-lg capitalize"> {{ nextTopic.title }} </h5>
                                                    </div>
                                                </Button>
                                            </template>
                                            <template v-else>
                                                <Button @click="submit" color="green">
                                                    <div class="text-end">
                                                        <span> Finalizar </span>
                                                        <h5 class="text-lg capitalize"> {{ nextTopic.title }} </h5>
                                                    </div>
                                                </Button>
                                            </template>
                                        </template>
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

    dataStore.currentTopic = _topics.find((item) => item.id === survey.topic);
    dataStore.currentSection = _sections.find((item) => item.id === survey.section);

    dataStore.nextSection = _sections.find((item) => item.id === dataStore.currentSection.next);
    dataStore.prevSection = _sections.find((item) => item.id === dataStore.currentSection.previous);
}

const setSurveydata = async () => {
    
}

const getSurveyData = async () => {

    let survey = await surveyService.getSurvey(route.params.id);

    if (!survey) {
        router.push({ name: 'home' });
        // router.push({ name: '404' });
    }

    else {
        surveyCurrent.value = survey;
        if (survey.topic && survey.section) {

            let _topics = await surveyService.getTopics(survey.topic);
            let _sections = await surveyService.getSections(survey.section);
            let _questions = await surveyService.getQuestions(survey.section);

            dataStore.topics = _topics;
            dataStore.sections = _sections;
            questions.value = _questions;

            //setCurrerts(survey, _topics, _sections);
        }

        else {
            router.back();
            dataStore.cont++;
        }
    }
}




const nextTopic = ref(null);

const getNextTopic = () => {

    let index = dataStore.topics.findIndex(item => dataStore.currentTopic.id === item.id);

    if (index !== -1) {
        let nextIndex = dataStore.topics.findIndex(item => dataStore.topics[index + 1].id === item.id);
        if (nextIndex !== -1) {
            nextTopic.value = dataStore.topics[index + 1];
        }
    }

}

const getNextSecionTopic = () => {
    console.log('current Section:', currentSection.value);
    console.log('current Section:', currentSection.value.next);
    console.log('current Topic:', currentTopic.value);
    if (currentSection.value.next) {
        router.push(`/survey/${route.params.id}/${route.params.topic}/${currentSection.value.next}`);

        dataStore.setPositions(route.params.id, route.params.topic, currentSection.value.next);
    }
    else {
        console.log('pasar a la siguiente  topico');
    }
}


const initSurvey = async () => {
    console.log('init survey ');
    await getSurveyData();
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