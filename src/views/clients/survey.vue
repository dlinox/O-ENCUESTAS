<template>
    <ClientLayout>

        <template v-if="isLoading">
            cargando...
        </template>

        <template v-else>
            <pre>
            {{ survey }}
        </pre>

            <h2 class="text-xl uppercase mb-4 font-bold"> {{ currentSurvey?.title }} </h2>

            <div class="grid grid-cols-4 gap-4">

                <Alert type="info" class="col-span-4">
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
                    </div>

                    <template v-if="sections.length == 0">
                        <h4 class="text-center text-lg uppercase  font-extrabold text-gray-400 align-items-center">
                            no hay secciones
                        </h4>
                    </template>

                    <template v-else>
                        <ButtonPrimary v-for="section in sections" :key="section.id" :title="section.title"
                            @click="getQuestions(section.id)" class="me-3 mb-3" />

                        <FormQuestion v-if="questions?.length > 0" :questions="questions" />
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
import { useAuthStore } from "@/store/auth";

import ClientLayout from "@/layouts/ClientLayout.vue";
import ButtonPrimary from "@/components/ButtonPrimary.vue";
import IndexSurvey from "./components/IndexSurvey.vue"

import { Alert } from "flowbite-vue";

const authStore = useAuthStore();
const router = new useRouter();

import FormQuestion from "./components/Form.vue"

const surveyService = new SurveyService();
const dataStore = useDataStore();

const route = useRoute();

const sections = computed(() => dataStore.sections);

const questions = computed(() => [...dataStore.questions]);

const _questions = ref([]);

const currentSurvey = computed(() => dataStore.currentSurvey);
const currentTopic = computed(() => dataStore.currentTopic);

const getQuestions = (sectionId) => {

    dataStore.topics.map((item) => {

        if (item.id === dataStore.currentTopic.id) {
            item.sections.map(async (section) => {
                if (section.id == sectionId) {
                    let res = await surveyService.getQuestions(section.id);
                    let questions = res;
                    questions.sort((a, b) => a.ordinal - b.ordinal);
                    section.questions = questions;
                    dataStore.questions = questions;
                    _questions.value = questions;
                }
            })
        }

    });
}

const paramsSurvey = computed(() => route.params.id);
const paramsTopic = computed(() => route.params.topic);
const paramsSection = computed(() => route.params.section);


const isLoading = ref(false);

const serCurrenrSurveys = async () => {
    await dataStore.setCurrentSurvey(route.params.id);
}

const survey  = ref();

const getSurveyData = async () => {


    let survey = await surveyService.getSurvey(route.params.id);
    survey = survey.data.data;
    console.log(survey);
    if (survey.topic === route.params.topic && survey.section === route.params.section) {


        let topics = await surveyService.getTopics(route.params.id);
        let section = await surveyService.getTopics(route.params.topic);
        let questions = await surveyService.getQuestions(route.params.section);

        console.log(topics);
        console.log(section);
        console.log(questions);

    }
    else {
        // router.go(`http://10.1.2.70:6001/survey/${survey.id}/${survey.topic}/${survey.section}`);

    }
}



const initSurvey = async () => {

    if (route.params.id &&
        route.params.topic &&
        route.params.section) {
        isLoading.value = true;
        await getSurveyData();
        isLoading.value = false;
    }
    else {
        router.back();
    }

}

initSurvey();

</script>