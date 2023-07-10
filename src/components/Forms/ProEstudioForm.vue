<template>
    <label class="block text-sm font-medium leading-6 text-gray-900 capitalize">
        {{ question.statement }}
    </label>

    <div class="grid grid-cols-3 gap-5">
        <div>
            <HAutoComplete placeholder="Facultad" :error="error" :items="facultades" itemTitle="title"
                @mouseup="getFacultades" itemValue="code" v-model="form.facultad" />
        </div>
        <div>
            <HAutoComplete :error="error" :items="programas" itemTitle="title" itemValue="code" placeholder="Provincia"
                v-model="form.provincia" @mouseup="getProgramas" />
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import HAutoComplete from '@/components/HAutoComplete.vue';
import ProgramaService from '../services/programaService';
const programaService = new ProgramaService();


const emit = defineEmits(["update:modelValue", "clickInput"]);

const props = defineProps({
    modelValue: [String, Number, Object, Array],
    question: [Object, Array],
    error: {
        type: Boolean,
        default: false,
    }
});

const input = computed({
    get: () => props.modelValue,
    set: (value) => emit("update:modelValue", value),
});

const programas = ref([]);
const facultades = ref([]);

const form = ref({
    facultad: null,
    progrmaa: null,
});


const getFacultades = async () => {
    if (facultades.length > 0) return;
    facultades.value = await programaService.getFacultades();
}
const getProgramas = async () => {
    if (programas.length > 0) return;
    programas.value = await programaService.getProgramas();
}

const setInputs = async (ubigeo) => {
    
    let res = await ubigeoService.getUbigeo(ubigeo);

    form.value.departamento = {
        "code": res.idDepartment,
        "title": res.department,
    };

    form.value.distrito = {
        "code": res.idDistrict,
        "title": res.district,
    };

}

const init = async () => {
    if (input.value) {
        // await setInputs(input.value);
    }
}

init();

</script>