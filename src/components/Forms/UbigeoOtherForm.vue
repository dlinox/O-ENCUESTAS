<template>
    <label class="block text-sm font-medium leading-6 text-gray-900 capitalize">
        {{ question.statement }}
    </label>

    <div class="grid grid-cols-3 gap-x-5">
        <div>
            <HAutoComplete placeholder="Departamento" :error="error" :items="departamentos" itemTitle="name"
                v-model="form.departamento" @update:modelValue="changeDepartamento" />
        </div>
        <div>
            <HAutoComplete :error="error" :items="provincias" itemTitle="name" placeholder="Provincia"
                v-model="form.provincia" @update:modelValue="changeProvincia" />
        </div>
        <div>
            <HAutoComplete :error="error" :items="distritos" itemTitle="name" placeholder="Distrito" v-model="form.distrito"
                @update:modelValue="input = $event.id" />
        </div>

        <div class="col-span-3">

            <InputForm v-model="question.other" label="Dirección"></InputForm>

        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import HAutoComplete from '@/components/HAutoComplete.vue';
import UbigeoService from '@/services/ubigeoService';
import InputForm from './InputForm.vue';

const ubigeoService = new UbigeoService();

const emit = defineEmits(["update:modelValue", "clickInput"]);

const props = defineProps({
    modelValue: [Number, Object, String, Array],
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
    provincias.value = await ubigeoService.getProvincias(val.id);
    emit("update:modelValue", null)
}
const changeProvincia = async (val) => {
    emit("update:modelValue", null)
    distritos.value = [];
    form.value.distrito = null;

    distritos.value = await ubigeoService.getDistritos(val.id);
}

const init = async () => {
    departamentos.value = await ubigeoService.getDepartamentos();
}

init();

</script>