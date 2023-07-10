<template>
    <label class="block text-sm font-medium leading-6 text-gray-900 capitalize">
        {{ question.statement }}
    </label>

    <div class="grid grid-cols-3 gap-5">
        <div>
            <HAutoComplete placeholder="Departamento" :error="error" :items="departamentos" itemTitle="title"
                @mouseup="getDepartamentos" itemValue="code" v-model="form.departamento"
                @update:modelValue="changeDepartamento" />
        </div>
        <div>
            <HAutoComplete :error="error" :items="provincias" itemTitle="title" itemValue="code" placeholder="Provincia"
                v-model="form.provincia" @update:modelValue="changeProvincia" />
        </div>
        <div>
            <HAutoComplete :error="error" :items="distritos" itemTitle="title" itemValue="code" placeholder="Distrito"
                v-model="form.distrito" @update:modelValue="input = $event.code" />
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import HAutoComplete from '@/components/HAutoComplete.vue';
import UbigeoService from '../services/ubigeoService';
const ubigeoService = new UbigeoService();

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

const departamentos = ref([]);
const provincias = ref([]);
const distritos = ref([]);

const form = ref({
    departamento: null,
    provincia: null,
    distrito: null,
});

const changeDepartamento = async (val) => {
    form.value.provincia = null;
    provincias.value = [];
    form.value.distrito = null;
    distritos.value = [];
    provincias.value = await ubigeoService.getProvincias(val.code);

    emit("update:modelValue", null);
}
const changeProvincia = async (val) => {
    emit("update:modelValue", null);

    distritos.value = [];
    form.value.distrito = null;
    distritos.value = await ubigeoService.getDistritos(val.code);
}


const getDepartamentos = async () => {
    departamentos.value = await ubigeoService.getDepartamentos();
}

const setInputs = async (ubigeo) => {
    let res = await ubigeoService.getUbigeo(ubigeo);

    form.value.departamento = {
        "code": res.idDepartment,
        "title": res.department,
    };

    form.value.provincia = {
        "code": res.idProvince,
        "title": res.province,
    };

    form.value.distrito = {
        "code": res.idDistrict,
        "title": res.district,
    };

}

const init = async () => {
    if (input.value) {
        await setInputs(input.value);
    }
}

init();

</script>