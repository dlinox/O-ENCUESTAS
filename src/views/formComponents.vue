<template>
    <div class="grid grid-cols-3 bg-white mx-auto justify-center">
        <div class="col-span-2 rounded-lg bg-blue-50 p-4">
            <div v-for="(section, indexSection)  in sections">
                <h3>Seccion: {{ section.title }}</h3>

                <div v-for="(question, indexQuestion) in  section.questions">
                    <ul>
                        <template v-if="question.dependent == null || question.show">

                            <li v-if="question.structure.code === 'RS'">
                                <div>
                                    <ShortAnswer :question="question" v-model="question.answer"
                                        @change="validation(question.answer, question, indexSection)" />
                                    <div class="w-full text-end">
                                        <span class=" text-xs text-red-600 ">{{ question.error }}</span>
                                    </div>
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
            <ButtonPrimary title="Guardar" @click="saveSurvey" :isDisabled="!isChange || !isValid" />
        </div>
      
    </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { useSurveyStore } from '@/store/index'
import ShortAnswer from '@/components/Forms/ShortAnswer.vue';
import OneSelection from '@/components/Forms/OneSelection.vue';
import MultipleSelection from '@/components/Forms/MultipleSelection.vue';
import SelectSelection from '@/components/Forms/SelectSelection.vue';
import ButtonPrimary from '@/components/ButtonPrimary.vue';

const props = defineProps({
    questions : Array,
});


const surveyStore = useSurveyStore();

const isValid = ref(true);

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

const saveSurvey = () => {

}

const isChange = ref(false);

watch(sections.value, (val, oldVal) => {
    isChange.value = true;
}, { deep: true })

computed(() => {
    console.log(sections.value);
    console.log(auxForm);
    if (sections.value != auxForm) {
        return true;
    }
    else {
        return false;

    }
});

const validation = (val, question, indexSection) => {

    let validForm = true;
    if (!question.structure.validation) return;
    let rules = question.structure.validation.split('|');
    if (rules.length > 0) {
        rules.forEach(rule => {
            let valid = eval(`${rule}(val, question, indexSection)`);
            if (!valid) {
                validForm = false;
                return;
            }
        });
    }
    isValid.value = validForm;
}

const required = (val, question, indexSection) => {
    var isRequired = null;
    sections.value[indexSection].questions.map((item) => {
        if (item.id == question.id) {
            if (val === null || val === "") {
                item.error = "Obligatorio";
                isRequired = false;
            }
            else {
                item.error = null;
                isRequired = true;
            }
        }
    });
    return isRequired;
}

const number = (val, question, indexSection) => {
    var isNumber = null;
    if (val === null || val === "") return true;
    sections.value[indexSection].questions.map((item) => {
        if (item.id == question.id) {
            if (!Number.isInteger(parseInt(val))) {
                item.error = "* Solo se permite numeros";
                isNumber = false;
            }
            else {
                item.error = null;
                isNumber = true;
            }
        }
    });
    return isNumber;
}

</script>