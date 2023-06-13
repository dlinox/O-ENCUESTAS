<template>
    <div class="grid grid-cols-3 bg-white mx-auto justify-center">
        <div class="rounded-lg bg-blue-50 p-4">
            <div v-for="(section, indexSection)  in sections">
                <h3>Seccion: {{ section.title }}</h3>

                <div v-for="(question, indexQuestion) in  section.questions">
                    <ul>
                        <template v-if="question.dependent == null || question.show">

                            <li v-if="question.structure.code === 'RS'">
                                <div>
                                    <ShortAnswer :question="question" v-model="question.answer" />
                                </div>
                            </li>
                            <li v-else-if="question.structure.code === 'SU'">
                                <div>
                                    <OneSelection :question="question" v-model="question.answer"
                                        @update:modelValue="onSelectTrigger($event, indexSection, indexQuestion)" />
                                </div>
                            </li>
                            <li v-else-if="question.structure.code === 'SM'">
                                <div>
                                    <MultipleSelection :question="question" v-model="question.answer" />
                                </div>
                            </li>

                            <li v-else-if="question.structure.code === 'SD'">
                                <div>
                                    <SelectSelection :question="question" v-model="question.answer"
                                        @update:modelValue="onSelectTrigger($event, indexSection)" />
                                </div>
                            </li>

                        </template>

                    </ul>
                </div>
            </div>
        </div>
        <div class="col-span-2 max-h-96   overflow-auto">
            <pre>
                {{ sections }}
            </pre>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import ShortAnswer from '../components/Forms/ShortAnswer.vue';
import { useSurveyStore } from '@/store/index'
import OneSelection from '../components/Forms/OneSelection.vue';
import MultipleSelection from '../components/Forms/MultipleSelection.vue';
import SelectSelection from '../components/Forms/SelectSelection.vue';

const surveyStore = useSurveyStore();

const sections = ref(surveyStore.survey.sections);

const onSelectTrigger = (e, indexSection, indexQuestion) => {
    sections.value[indexSection].questions.map((item) => {
        if (item.dependent == indexQuestion) {
            if (item.optionTrigger == e) {
                item.show = true;
            }
            else {
                item.show = false;
            }
        }
        return item;
    });
}


</script>