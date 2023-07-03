<template>
    <label class="block text-sm font-medium leading-6 text-gray-900">
        {{ question.statement }}
    </label>

    <div v-for="(option, index) in question.options" :key="index" class="grid grid-cols-5 items-center">

        <div class="col-span-4">

            <input :id="`checkbox-${index}${option.id}`" type="checkbox"  v-model="option.select"
                :name="`name-${index}${option.id}`"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
            <label :for="`checkbox-${index}${option.id}`" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                {{ option.title }}
            </label>
        </div>
        <div v-if="option.select" class="col-span-1">
            <SelectForm v-model="option.value"
                :options="[{ id: 1, title: 'Leve' }, { id: 2, title: 'Moderado' }, { id: 3, title: 'Severo' }]">
            </SelectForm>
        </div>
    </div>
</template>
<script setup>
import { computed, ref } from 'vue';

import InputForm from '../../components/Forms/InputForm.vue'

import SelectForm from '../../components/Forms/SelectForm.vue'

const props = defineProps({
    question: Object,
    modelValue: [Object, Array, String],

});

const emit = defineEmits(["update:modelValue"]);

const input = computed({
    get: () => props.modelValue,
    set: (value) => emit("update:modelValue", value),
});

const isValid = ref(true);

const validate = () => {
    isValid.value = true;
    props.question.options.forEach((item) => {
        if (!item.value) {
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

const changeOptionValue = (val, index) => {
    if (!val || val == "") {
        props.question.options[index].error = "Obligatorio";
    }
    else {
        delete props.question.options[index].error;
    }
    // validate();
    emit("update:modelValue", props.question.options);
}
</script>