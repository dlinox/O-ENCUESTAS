<template>
    <ClientLayout>

        <template v-if="isLoading">
            <LoaderSpinner v-if="isLoading" />
        </template>

        <template v-else>
            <h2 class="text-xl uppercase  font-bold py-5 text-blue-950 "> {{ survey.title }} </h2>

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
                    <IndexSurvey :changeTopic="changeTopic" :topics="topics" :current="currents.topic" />
                </div>

                <div class="col-span-4 md:col-span-3 rounded-lg bg-white p-6 shadow-lg mb-4">
                    <div class="">
                        <h3 class="text-lg font-semibold mb-3 uppercase">
                            {{ currents.topic?.title }}
                        </h3>
                        <h4 class="text-sm uppercase mb-4 font-bold"> {{ currents.section?.title }} </h4>
                    </div>

                    <template v-if="!sections">
                        <h4 class="text-center text-lg uppercase  font-extrabold text-gray-400 align-items-center">
                            no hay secciones
                        </h4>
                    </template>

                    <template v-else>

                        <LoaderSpinner v-if="isLoadingForm" />
                        <FormQuestion v-else :questions="questions" :section="currents.section">
                            <template v-slot:footer="{ submit }">
                                <div class="flex justify-between w-full">
                                    <div class="previous">
                                        <Button v-if="previous.section" @click="async () => {
                                            let isSave = await submit();
                                            if (isSave) {
                                                await changeSection(previous.section);
                                            }
                                        }">
                                            <div class="text-start">
                                                <span>Anterior</span>
                                                <h5 class="text-lg capitalize">
                                                    {{ previous.section.title }}
                                                </h5>
                                            </div>
                                        </Button>

                                        <template v-else>
                                            <Button v-if="previous.topic" color="light" @click="async () => {
                                                let isSave = await submit();
                                                if (isSave) {
                                                    await changeTopic(previous.topic);
                                                }
                                            }">
                                                <div class="text-start">
                                                    <span>Anterior</span>
                                                    <h5 class="text-lg capitalize">
                                                        {{ previous.topic.title }}
                                                    </h5>
                                                </div>
                                            </Button>
                                        </template>
                                    </div>

                                    <div class="nexts">
                                        <Button v-if="nexts.section" @click="async () => {
                                            let isSave = await submit();
                                            if (isSave) {
                                                await changeSection(nexts.section);
                                            }
                                        }">
                                            <div class="text-end">
                                                <span>Siguiente </span>
                                                <h5 class="text-lg capitalize"> {{ nexts.section.title }} </h5>
                                            </div>
                                        </Button>

                                        <template v-else>
                                            <template v-if="nexts.topic !== null">
                                                <Button color="light" @click="async () => {
                                                    let isSave = await submit();
                                                    if (isSave) {
                                                        await changeTopic(nexts.topic);
                                                    }
                                                }">
                                                    <div class="text-end">
                                                        <span>Siguiente </span>
                                                        <h5 class="text-lg capitalize"> {{ nexts.topic.title }} </h5>
                                                    </div>
                                                </Button>
                                            </template>
                                            <template v-else>
                                                <Button @click="" color="green">
                                                    <div class="text-end">
                                                        <span> Guardar </span>
                                                        <h5 class="text-lg capitalize"> Finalizar </h5>
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
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useDataStore } from '@/store';
import { SurveyService } from "@/services";

import { Alert, Button } from "flowbite-vue";

import ClientLayout from "@/layouts/ClientLayout.vue";

import LoaderSpinner from "@/components/LoaderSpinner.vue";

import IndexSurvey from "./components/IndexSurvey.vue"
import FormQuestion from "./components/Form.vue"

const router = new useRouter();

const surveyService = new SurveyService();
const dataStore = useDataStore();//talves para los topics

const route = useRoute();

const survey = ref(null);
const topics = ref(null);
const sections = ref(null);
const questions = ref(null);


const currents = ref({
    section: null,
    topic: null,
});

const nexts = ref({
    section: null,
    topic: null,
});

const previous = ref({
    section: null,
    topic: null,
});

const isLoading = ref(false);
const isLoadingForm = ref(false);

const changeTopic = async (nextTopic) => {

    isLoadingForm.value = true;

    let _sections = await getSections(nextTopic.id);
    if (_sections.length > 0) {

        let updatePosition = await dataStore.setPositions(survey.value.id, nextTopic.id, _sections[0].id);

        if (updatePosition) {
            survey.value.topic = nextTopic.id;

            survey.value.section = _sections[0].id;
            sections.value = _sections;

            await setSurveydata(survey.value);
            questions.value = await getQuestions(currents.value.section.id);
        }
    }

    isLoadingForm.value = false;
}

const changeSection = async (nextSection) => {

    isLoadingForm.value = true;

    let _questions = await getQuestions(nextSection.id);


    if (_questions.length > 0) {
        let updatePosition = await dataStore.setPositions(survey.value.id, currents.value.topic.id, nextSection.id);
        if (updatePosition) {
            survey.value.section = nextSection.id;

            await setSurveydata(survey.value);
            questions.value = _questions;
        }
    }
    isLoadingForm.value = false;
}

const finalSurvey = () => { }

const getTopics = async (surveyId) => await surveyService.getTopics(surveyId);
const getSections = async (topicId) => await surveyService.getSections(topicId);
const getQuestions = async (sectionId) => await surveyService.getQuestions(sectionId);

const getNextElement = (element, elements) => {

    let index = elements.findIndex(item => element.id === item.id);
    if (index !== -1 && elements.length !== (index + 1)) {

        let nextIndex = elements.findIndex(item => elements[index + 1]?.id === item.id);
        if (nextIndex !== -1) {
            return elements[index + 1];
        }
        else {
            return null;
        }
    }
    else {
        return null;
    }
}

const getPrevElement = (element, elements) => {

    let index = elements.findIndex(item => element.id === item.id);

    if (index !== -1 && index !== 0) {
        let prevIndex = elements.findIndex(item => elements[index - 1]?.id === item.id);
        if (prevIndex !== -1) {
            return elements[index - 1];
        }
        else {
            return null;
        }
    }
    else {
        return null;
    }
}

const setCurrerts = async (survey) => {
    currents.value.section = sections.value.find((item) => item.id === survey.section);
    currents.value.topic = topics.value.find((item) => item.id === survey.topic);
}

const setNexts = async () => {
    nexts.value.topic = getNextElement(currents.value.topic, topics.value);
    nexts.value.section = getNextElement(currents.value.section, sections.value);
}

const setPrevius = async () => {
    previous.value.topic = getPrevElement(currents.value.topic, topics.value);
    previous.value.section = getPrevElement(currents.value.section, sections.value);
}

const setSurveydata = async (survey) => {
    await setCurrerts(survey);
    await setNexts();
    await setPrevius();
}

const getSurveyData = async () => {

    survey.value = await surveyService.getSurvey(route.params.id);
    if (!survey.value) {
        router.push({ name: 'home' });
        // router.push({ name: '404' });
    }

    else {

        if (survey.value.topic && survey.value.section) {
            topics.value = await getTopics(survey.value.id)
            sections.value = await getSections(survey.value.topic)
            questions.value = await getQuestions(survey.value.section);

            await setSurveydata(survey.value);
        }

        else {
            router.back();
            dataStore.cont++;
        }
    }
}

const initSurvey = async () => {
    console.log('init survey ');
    isLoading.value = true;
    await getSurveyData();
    isLoading.value = false;

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