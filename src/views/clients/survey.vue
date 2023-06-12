<template>
    <ClientLayout>
        <template #header.title> {{ currentSurvey.title }} </template>
        <template #header.subtitle> {{ currentSurvey.description }} </template>

        <div class="grid grid-cols-4 gap-4">
            <div class="col-span-1">
                <IndexSurvey />
            </div>

            <div class="col-span-3 rounded-lg bg-white p-4">

                <div class="rounded-lg bg-blue-50 p-4 text-blue-600 mb-4" >
                    ¡Lea y responda! detenidamente todas las preguntas planteadas en la Ficha Socioeconómica. El ingreso de
                    sus datos socioeconómicos tiene carácter de Declaración Jurada, estudiante que no declare correctamente
                    tendrá la sanción respectiva.
                </div>
                <ul class="list-inside px-12">
                    <li class="text-lg font-medium mb-4" v-for="( question, indexQuestion) in currentSurvey.questions"
                        :key="indexQuestion">
                        <h3 class="mb-3"> {{ indexQuestion + 1 }}. {{ question.statement }} </h3>
                        <div class="ms-4">

                            <RadioGroupForm :questionIndex="indexQuestion" :options="question.options"
                                v-model="question.result" />
                        </div>
                    </li>
                </ul>


                <div class="border-t border-gray-100 py-4 flex justify-end">
                    <ButtonPrimary title="Guardar" @click="saveSection()" />
                    <ButtonPrimary class="ms-3" title="Guardar y continuar" @click="saveSection()" />
                </div>
            </div>
        </div>
    </ClientLayout>
</template>
<script setup>
import { computed, ref, } from "vue";
import { useRoute } from "vue-router";
import { useSurveyStore } from '@/store/index'
import ClientLayout from "@/layouts/ClientLayout.vue";
import ButtonPrimary from "@/components/ButtonPrimary.vue";
import RadioGroupForm from "@/components/Forms/RadioGroupForm.vue";
import IndexSurvey from "./components/IndexSurvey.vue"

const route = useRoute();
const surveyStore = useSurveyStore();


const currentId = route.params.id;

const currentSurvey = computed(() => surveyStore.survey.secctions.filter((item) => (item.current && !item.complete))[0]);

const saveSection = () => {

    let indexSection = surveyStore.survey.secctions.findIndex(item => item.id == currentSurvey.value.id);
    let countSection = surveyStore.survey.secctions.length;

    if ((indexSection + 1) != countSection) {
        surveyStore.survey.secctions[indexSection].complete = true;
        surveyStore.survey.secctions[indexSection].current = false;

        surveyStore.survey.secctions[indexSection + 1].current = true;
        surveyStore.survey.secctions[indexSection + 1].complete = false;

        console.log('Guardando ... ');
    }
    else {
        console.log('Completado ... ');
    }
}
</script>