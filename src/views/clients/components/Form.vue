<template>
    <div class="grid grid-cols-2 mt-4 bg-white mx-auto justify-center">
        <div class="col-span-2 rounded-lg p-4">



            <div v-for="question in questionsList">
                <ul>
                    <template v-if="question.isDependent === null">

                        <li class="mb-4" v-if="question.type === 0">
                            <div>
                                <OneSelection :question="question" v-model="question.answer"
                                    @update:modelValue="validation(question.answer, question)" />
                                <div class="w-full text-end">
                                    <span class=" text-xs text-red-600 ">{{ question.error }}</span>
                                </div>


                            </div>
                            <!-- @update:modelValue="onSelectTrigger($event, indexSection, indexQuestion)" -->
                            <!-- <div>
                                <MultiOptionSelect :question="question"  v-model="question.answer" />
                                <MultiOptionInput :question="question" v-model="question.answer"
                                @update:modelValue="validation(question.answer, question)"

                                />
                                <div class="w-full text-end">
                                    <span class=" text-xs text-red-600 ">{{ question.error }}</span>
                                </div>
                            </div> -->
                        </li>


                        <li class="mb-4" v-else-if="question.type === 1">
                            <div>
                                <ShortAnswer :question="question" v-model="question.answer"
                                    @update:modelValue="validation(question.answer, question)" />
                                <div class="w-full text-end">
                                    <span class=" text-xs text-red-600 ">{{ question.error }}</span>
                                </div>
                            </div>
                        </li>

                        <li class="mb-4" v-else-if="question.type === 2">
                            <ShortAnswer type="date" :question="question" v-model="question.answer"
                                @update:modelValue="validation(question.answer, question)" />
                            <div class="w-full text-end">
                                <span class=" text-xs text-red-600 ">{{ question.error }}</span>
                            </div>
                        </li>

                        <li class="mb-4" v-else-if="question.type === 3">
                            <ShortAnswer type="number" :question="question" v-model="question.answer"
                                @update:modelValue="validation(question.answer, question)" />
                            <div class="w-full text-end">
                                <span class=" text-xs text-red-600 ">{{ question.error }}</span>
                            </div>
                        </li>


                        <li class="mb-4" v-else-if="question.type === 8">

                            <EmailForm :question="question" v-model="question.answer"
                                @update:modelValue="validateEmail($event , question)" />
                            <div class="w-full text-end">
                                <span class=" text-xs text-red-600 ">{{ question.error }}</span>
                            </div>
                        </li>

                        <!-- <li class="mb-4" v-else-if="question.type === '9'">
                            <ShortAnswer type="number" :question="question" v-model="question.answer"
                                @update:modelValue="validation(question.answer, question)" />
                            <div class="w-full text-end">
                                <span class=" text-xs text-red-600 ">{{ question.error }}</span>
                            </div>
                        </li> -->

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
                            <!-- @update:modelValue="onSelectTrigger($event, indexSection, indexQuestion)" -->

                            <div>

                                <!-- <MultiOptionInput :question="question" v-model="question.answer"
                                @update:modelValue="validation(question.answer, question)"
                                
                                />
                                <div class="w-full text-end">
                                    <span class=" text-xs text-red-600 ">{{ question.error }}</span>
                                </div> -->
                            </div>
                        </li>
                    </template>
                </ul>
            </div>
            <div class="flex justify-end mt-4 ">
                <ButtonPrimary title="Guardar sección" :isDisabled="!isValid" @click="saveSection" />
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

import MultiOptionInput from '../../../components/Forms/MultiOptionInput.vue';
import MultiOptionSelect from '../../../components/Forms/MultiOptionSelect.vue';
import EmailForm from '../../../components/Forms/EmailForm.vue';



const props = defineProps({
    questions: Array,
});

const questionsList = computed(() => props.questions);

const isValid = ref(true);

const validation = (val, question) => {
    let validForm = true;
    validForm = required(val, question);
    isValid.value = validForm;
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

    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    questionsList.value.map((item) => {
        if (item.id == question.id) {
            if (val === null || val === "") {
                item.error = "Obligatorio";
                //isRequired = false;
            }
            else if (!val.match(validRegex)){
                item.error = "Formato no valido";

            }
            else {
                delete item.error;
                i//sRequired = true;
            }
        }
    });


    if (val.match(validRegex)) {

        console.log('alido');

        return true;

    } else {

        console.log('ahora si eno es valido')

        return false;
    }

}
</script>