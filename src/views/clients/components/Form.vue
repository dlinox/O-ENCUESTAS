<template>
    <div class="grid grid-cols-2 mt-4 bg-white mx-auto justify-center">
        <div class="col-span-2 rounded-lg p-4">
            <div v-for="question in questionsList">
                <ul>
                    <template v-if="question.dependent === 0">
                        <li v-if="question.options === null || question.options?.length === 0">
                            <div>
                                <ShortAnswer :question="question" v-model="question.answer"
                                    @update:modelValue="validation(question.answer, question)" />
                                <div class="w-full text-end">
                                    <span class=" text-xs text-red-600 ">{{ question.error }}</span>
                                </div>
                            </div>
                        </li>
                        <li v-else-if="question.options.length > 0">
                            <div>
                                <OneSelection :question="question" v-model="question.answer" />
                                <!-- @update:modelValue="onSelectTrigger($event, indexSection, indexQuestion)" -->
                            </div>
                        </li>
                        <!-- <li v-else-if="question.structure.code === 'SM'">
                            <div>
                                <MultipleSelection :question="question" v-model="question.answer" />
                            </div>
                        </li>

                        <li v-else-if="question.structure.code === 'SD'">
                            <div>
                                <SelectSelection :question="question" v-model="question.answer"
                                    @update:modelValue="onSelectTrigger($event, indexSection)" />
                            </div>
                        </li> -->
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
import { ref, watch, computed } from 'vue';

import ButtonPrimary from '@/components/ButtonPrimary.vue';
import ShortAnswer from '@/components/Forms/ShortAnswer.vue';
import OneSelection from '@/components/Forms/OneSelection.vue';
import MultipleSelection from '@/components/Forms/MultipleSelection.vue';
import SelectSelection from '@/components/Forms/SelectSelection.vue';

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
                item.error = null;
                isRequired = true;
            }
        }
    });
    return isRequired;
}

const saveSection = () => {
    questionsList.value.forEach((item) => {
        if(!item.answer){
            item.error = "Obligatorio"
            isValid.value =  false;
        }
    })
}
</script>