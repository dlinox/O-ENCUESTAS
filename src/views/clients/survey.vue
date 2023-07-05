<template>
    <ClientLayout>
        <template #header.title> {{ currentSurvey?.title }} </template>
        <template #header.subtitle> {{ currentSurvey?.subtitle }} </template>
        <div class="grid grid-cols-4 gap-4">
            <div class="col-span-4 rounded-lg bg-blue-100 p-4 text-blue-700 mb-1 text-sm">
                <strong> Indicaciones: </strong>
                <p>
                    Estudiantes Universitarios. Lea y responda todos los ítems de manera obligatoria, verídica y detallada.
                </p>
                <p>
                    Los datos consignados son confidenciales (Según ley de protección de datos personales).
                </p>
            </div>
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

                    <FormQuestion v-if="questions?.length > 0" :questions="questions">

                    </FormQuestion>

                    <ButtonPrimary v-for="section in sections" :key="section.id" :title="section.title"
                        @click="getQuestions(section.id)" class="me-3 mb-3" />
                </template>

            </div>
        </div>
    </ClientLayout>
</template>
<script setup>
import { computed, reactive, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useDataStore } from '@/store';
import { SurveyService } from "../../services";
import ClientLayout from "@/layouts/ClientLayout.vue";
import ButtonPrimary from "@/components/ButtonPrimary.vue";
import IndexSurvey from "./components/IndexSurvey.vue"


import FormQuestion from "./components/Form.vue"

const surveyService = new SurveyService();
const dataStore = useDataStore();

const route = useRoute();

const sections = computed(() => dataStore.sections);
const questions = computed(() => [...dataStore.questions]);

const currentSurvey = computed(() => dataStore.currentSurvey);
const currentTopic = computed(() => dataStore.currentTopic);

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

const serCurrenrSurveys = async () => {

    await dataStore.setCurrentSurvey(route.params.id);
}

const initSurvey = async () => {

    await serCurrenrSurveys();
    //currentSurvey.value = dataStore.currentSurvey;
}


initSurvey();

</script>