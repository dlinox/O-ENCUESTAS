<template>
    <label class="block text-sm font-medium leading-6 text-gray-900">
        {{ question.statement }}
    </label>

    <div v-for="(option, index) in question.options" :key="index" class="grid grid-cols-5 items-center">
        <div class="col-span-3">
            {{ option.title }}
        </div>
        <div class="col-span-2">
            <InputForm v-model="option.value" @update:modelValue="changeOptionValue($event, index)" />
            <div class="w-full text-end">
                <span class=" text-xs text-red-600 ">{{ option.error }}</span>
            </div>
        </div>
    </div>
</template>
<script setup>
import { computed, ref } from 'vue';
import InputForm from '../../components/Forms/InputForm.vue'

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

    //validate();
    emit("update:modelValue", props.question.options);
}



</script>