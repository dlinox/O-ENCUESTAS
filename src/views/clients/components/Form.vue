<template>
    <div class="grid grid-cols-2 mt-4 bg-white mx-auto justify-center">
        <div class="col-span-2 rounded-lg p-4">

            <div v-for="(question, indexQuestion) in questionsList" :key="question.id">
                <ul>
                    <template v-if="!question.isDependent || question.show">

                        <li class="mb-4" v-if="question.type === 0">
                            <div>
                                <OneSelection :question="question" v-model="question.answer.text"
                                    @update:modelValue="validation($event, question, indexQuestion)" />
                                <!-- @update:modelValue="onSelectTrigger($event, indexSection, indexQuestion)" -->
                                <div class="w-full text-end">
                                    <span class=" text-xs text-red-600 ">{{ question.error }}</span>
                                </div>
                            </div>
                            <!-- @update:modelValue="onSelectTrigger($event, indexSection, indexQuestion)" -->
                        </li>

                        <li class="mb-4" v-else-if="question.type === 1">
                            <div>
                                <ShortAnswer :question="question" v-model="question.answer.text"
                                    @update:modelValue="validation(question.answer, question)" />
                                <div class="w-full text-end">
                                    <span class=" text-xs text-red-600 ">{{ question.error }}</span>
                                </div>
                            </div>
                        </li>

                        <li class="mb-4" v-else-if="question.type === 2">
                            <ShortAnswer type="date" :question="question" v-model="question.answer.text"
                                @update:modelValue="validation(question.answer, question)" />
                            <div class="w-full text-end">
                                <span class=" text-xs text-red-600 ">{{ question.error }}</span>
                            </div>
                        </li>

                        <li class="mb-4" v-else-if="question.type === 3">
                            <ShortAnswer type="number" :question="question" v-model="question.answer.text"
                                @update:modelValue="validation(question.answer, question)" />
                            <div class="w-full text-end">
                                <span class=" text-xs text-red-600 ">{{ question.error }}</span>
                            </div>
                        </li>

                        <li class="mb-4" v-else-if="question.type === 8">

                            <EmailForm :question="question" v-model="question.answer.text"
                                @update:modelValue="validateEmail($event, question)" />
                            <div class="w-full text-end">
                                <span class=" text-xs text-red-600 ">{{ question.error }}</span>
                            </div>
                        </li>

                        <li class="mb-4" v-else-if="question.type === 9">
                            <ShortAnswer type="text" :question="question" v-model="question.answer.text"
                                @update:modelValue="validatePhone(question.answer, question)" />
                            <div class="w-full text-end">
                                <span class=" text-xs text-red-600 ">{{ question.error }}</span>
                            </div>
                        </li>

                        <li class="mb-4" v-else-if="question.type === 10">
                            <UbigeoForm :question="question" v-model="question.answer"
                                :error="question.error ? true : false"
                                @update:modelValue="validation(question.answer, question)" />
                            <div class="w-full text-end">
                                <span class=" text-xs text-red-600 ">{{ question.error }}</span>
                            </div>
                        </li>

                        <li class="mb-4" v-else-if="question.type === 11">
                            <UbigeoOtherForm :question="question" v-model="question.answer"
                                :error="question.error ? true : false"
                                @update:modelValue="validation(question.answer, question)" />
                            <div class="w-full text-end">
                                <span class=" text-xs text-red-600 ">{{ question.error }}</span>
                            </div>
                        </li>

                        <li class="mb-4" v-else-if="question.type === 100000">
                            <div>
                                <OneSelection :question="question" v-model="question.answer"
                                    @update:modelValue="validation(question.answer, question)" />
                                <div class="w-full text-end">
                                    <span class=" text-xs text-red-600 ">{{ question.error }}</span>
                                </div>
                            </div>
                        </li>
                    </template>
                </ul>
            </div>
            <div class="flex justify-end mt-4 ">
                <!-- <ButtonPrimary title="Guardar sección" :isDisabled="!isValid" @click="saveSection" /> -->
                <ButtonPrimary :isDisabled="!isValid" @click="saveSection">
                    <template #content>
                        <slot name="buttonNext">
                            Siguiente
                        </slot>
                    </template>
                </ButtonPrimary>

            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import ButtonPrimary from '@/components/ButtonPrimary.vue';
import ShortAnswer from '@/components/Forms/ShortAnswer.vue';
import OneSelection from '@/components/Forms/OneSelection.vue';
import UbigeoOtherForm from '@/components/Forms/UbigeoOtherForm.vue';
import UbigeoForm from '@/components/UbigeoForm.vue';
import EmailForm from '../../../components/Forms/EmailForm.vue';
import { IsRequired, IsEmail, IsNumber } from '../../../helpers/validationForm'

import { useDataStore } from '../../../store/index.js'

const dataStore = useDataStore();

const props = defineProps({
    questions: Array,
});

const questionsList = computed(() => props.questions);

const isValid = ref(true);



const onSelectTrigger = (question) => {

    questionsList.value.map((item) => {
        if (item.isDependent == question.id) {

            console.log(item.optionTrigger, ' = ', question.answer);

            if (item.optionTrigger === question.answer) {
                item.show = true;
            }
            else {
                item.show = false;
            }
        }
        return item;
    });
}

const validation = (val, question, indexQuestion = null) => {
    let validForm = true;
    validForm = required(val, question);
    isValid.value = validForm;

    if (indexQuestion) {
        onSelectTrigger(question)
    }
}


const required = (val, question) => {
    var isRequired = null;
    questionsList.value.map((item) => {
        if (item.id == question.id) {
            if (val === null || val === "") {
                item.error = "Obligatorio";
                isRequired = false;
            }
            else {
                delete item.error;
                isRequired = true;
            }
        }
    });
    return isRequired;
}

const saveSection = () => {
    isValid.value = true;
    questionsList.value.forEach((item) => {
        if (!item.answer) {
            item.error = "Obligatorio"
            isValid.value = false;
        }
        else {
            delete item.error;
        }
    })

    if (isValid.value) {
        console.log('Guardando ...');
    }
}

const validateEmail = (val, question) => {

    questionsList.value.map((item) => {
        if (item.id == question.id) {
            if (!IsRequired(val)) {
                item.error = "Obligatorio";
            }
            else if (!IsEmail(val)) {
                item.error = "Formato no valido";
            }
            else {
                delete item.error;
            }
        }
    });
}

const validatePhone = (val, question) => {

    questionsList.value.map((item) => {
        if (item.id == question.id) {
            if (!IsRequired(val)) {
                item.error = "Obligatorio";
            }
            else if (!IsNumber(val)) {
                item.error = "Solo se permite numeros";
            }
            else if (!MaxLong(val, 9)) {
                item.error = "Longitud debe se 9 digitos";
            }
            else {
                delete item.error;
            }
        }
    });
}
</script>