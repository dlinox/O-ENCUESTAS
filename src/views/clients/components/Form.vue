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
                            </div>
                        </li>

                        <li class="mb-4" v-else-if="question.type === 1">
                            <InputForm v-model="question.answer.text" type="text" :label="question.statement"
                                :error="question.error" @update:modelValue="validation($event, question)" />
                        </li>

                        <li class="mb-4" v-else-if="question.type === 2">
                            <InputForm v-model="question.answer.text" type="date" :label="question.statement"
                                :error="question.error" @update:modelValue="validation($event, question)" />
                        </li>

                        <li class="mb-4" v-else-if="question.type === 3">
                            <InputForm v-model="question.answer.text" type="number" :label="question.statement"
                                :error="question.error" @update:modelValue="validation(question.answer, question)" />
                        </li>

                        <li class="mb-4" v-else-if="question.type === 4">
                            <HSelect v-model="question.answer.text" label="question.statement" :error="question.error"
                                @update:modelValue="validation($event, question, indexQuestion)" />
                        </li>

                        <li class="mb-4" v-else-if="question.type === 6">
                            <MultipleSelection :question="question" v-model="question.answer.options"
                                @update:modelValue="validation($event, question, indexQuestion)" />
                        </li>

                        <li class="mb-4" v-else-if="question.type === 8">
                            <InputForm v-model="question.answer.text" type="email" :label="question.statement"
                                :error="question.error" @update:modelValue="validateEmail(question.answer, question)" />
                        </li>

                        <li class="mb-4" v-else-if="question.type === 9">
                            <InputForm v-model="question.answer.text" type="tel" :label="question.statement"
                                :error="question.error" @update:modelValue="validatePhone($event, question)" />
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
import { IsRequired, IsEmail, IsNumber, MaxLong } from '@/helpers/validationForm'
import ButtonPrimary from '@/components/ButtonPrimary.vue';
import OneSelection from '@/components/Forms/OneSelection.vue';
import MultipleSelection from '@/components/Forms/MultipleSelection.vue';
import UbigeoOtherForm from '@/components/Forms/UbigeoOtherForm.vue';
import UbigeoForm from '@/components/UbigeoForm.vue';
import InputForm from '@/components/Forms/InputForm.vue';
import HSelect from '@/components/HSelect.vue';

const props = defineProps({
    questions: Array,
});

const questionsList = computed(() => props.questions);

const isValid = ref(true);

const onSelectTrigger = (question) => {

    questionsList.value.map((item) => {
        if (item.isDependent == question.id) {
            if (item.optionTrigger === question.answer.text) {
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
    validForm = required(val.text, question);
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
                item.error = {
                    isError: true,
                    text: 'Obligatorio'
                };
                isRequired = false;
            }
            else {
                item.error = {
                    isError: false,
                    text: null
                };
                isRequired = true;
            }
        }
    });
    return isRequired;
}

const validateEmail = (val, question) => {

    questionsList.value.map((item) => {
        if (item.id == question.id) {
            if (!IsRequired(val)) {
                item.error = {
                    isError: true,
                    text: 'Obligatorio'
                };
            }
            else if (!IsEmail(val)) {
                item.error = {
                    isError: true,
                    text: 'Formato no valido',
                };
            }
            else {
                item.error = {
                    isError: false,
                    text: null,
                };
            }
        }
    });
}

const validatePhone = (val, question) => {

    questionsList.value.map((item) => {
        if (item.id == question.id) {
            if (!IsRequired(val)) {
                item.error = {
                    isError: true,
                    text: 'Obligatorio',
                };
            }
            else if (!IsNumber(val)) {
                item.error = {
                    isError: true,
                    text: 'Solo se permite numeros',
                };
            }
            else if (!MaxLong(val, 9)) {
                item.error = {
                    isError: true,
                    text: `Longitud debe se ${9} digitos`,
                };
            }
            else {
                item.error = {
                    isError: false,
                    text: null,
                };
            }
        }
    });
}

const saveSection = () => {
    isValid.value = true;
    questionsList.value.forEach((item) => {
        if (!item.answer?.options && !item.answer?.text && (!item.isDependent || item.show)) {

            item.error = {
                isError: true,
                text: 'Obligatorio',
            };
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

</script>

