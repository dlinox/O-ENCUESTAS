<template>
    <ClientLayout>
        <template #header.title> {{ currentSurvey.title }} </template>
        <template #header.subtitle> {{ currentSurvey.subtitle }} </template>
        <div class="grid grid-cols-4 gap-4">
            <div class=" col-span-4 rounded-lg bg-blue-100 p-4 text-blue-700 mb-1 text-sm">
                ¡Lea y responda! detenidamente todas las preguntas planteadas. Estudiante que no declare correctamente
                tendrá la sanción respectiva.
            </div>
            <div class="col-span-1  ">
                <IndexSurvey />
            </div>

            <div class="col-span-3 rounded-lg bg-white p-4 shadow-lg">
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
                    <!-- <ul role="list" class="divide-y divide-gray-100"> -->
                    <!-- <li  class=" gap-x-6 pb-5"> -->
                    <ButtonPrimary v-for="section in sections" :key="section.id" :title="section.title"
                        @click="getQuestions(section.id)" class="me-3" />

                    <!-- <ul>
                            <li v-for="question  in section.questions" :key="question.id">
                                <h4 class="text-md uppercase font-medium mb-3">
                                    {{ question.ordinal }}. {{ question.statement }}
                                    
                                </h4>
                            </li>
                        </ul> -->
                    <!-- </li> -->
                    <FormQuestion v-if="questions?.length > 0" :questions="questions" />
                    <!-- </ul> -->
                </template>

                <!-- <div class="border-t border-gray-100 py-4 flex justify-end">
                    <ButtonPrimary title="Guardar" @click="saveSection()" />
                    <ButtonPrimary class="ms-3" title="Guardar y continuar" @click="saveSection()" />
                </div> -->
            </div>
        </div>
    </ClientLayout>
</template>
<script setup>
import { computed } from "vue";
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

const initSurvey = () => {
    dataStore.setCurrentSurvey(route.params.id);
}

initSurvey()
</script>