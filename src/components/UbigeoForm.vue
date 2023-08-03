<template>
  <label class="block text-sm font-medium leading-6 text-gray-900 capitalize">
    {{ question.statement }}
    <span class="text-red-600 font-mono">
      {{ question.isRequired === "true" ? "*" : "" }}
    </span>
  </label>

  <div class="grid grid-cols-3 gap-5">
    <div>
      <HAutoComplete
        placeholder="Departamento"
        :error="error"
        :items="departamentos"
        itemValue="code"
        v-model="form.departamento"
        @update:modelValue="changeDepartamento"
        :isDisabled="isReadonly"
      />
    </div>
    <div>
      <HAutoComplete
        :error="error"
        :items="provincias"
        itemValue="code"
        placeholder="Provincia"
        v-model="form.provincia"
        @update:modelValue="changeProvincia"
        :isDisabled="isReadonly"
      />
    </div>
    <div>
      <HAutoComplete
        :error="error"
        :items="distritos"
        itemValue="code"
        placeholder="Distrito"
        v-model="form.distrito"
        @update:modelValue="input = $event.code"
        :isDisabled="isReadonly"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import HAutoComplete from "@/components/HAutoComplete.vue";
import UbigeoService from "../services/ubigeoService";
const ubigeoService = new UbigeoService();

const emit = defineEmits(["update:modelValue", "clickInput"]);

const props = defineProps({
  modelValue: [String, Number, Object, Array],
  question: [Object, Array],
  isReadonly: Boolean,
  error: {
    type: Boolean,
    default: false,
  },
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
};
const changeProvincia = async (val) => {
  emit("update:modelValue", null);

  distritos.value = [];
  form.value.distrito = null;
  distritos.value = await ubigeoService.getDistritos(val.code);
};

const getDepartamentos = async () => {
  departamentos.value = await ubigeoService.getDepartamentos();
};

const setInputs = async (ubigeo) => {
  let res = await ubigeoService.getUbigeo(ubigeo);

  form.value.departamento = {
    code: res.idDepartment,
    title: res.department,
  };

  form.value.provincia = {
    code: res.idProvince,
    title: res.province,
  };

  form.value.distrito = {
    code: res.idDistrict,
    title: res.district,
  };
};

const init = async () => {
  getDepartamentos();
  if (input.value) {
    await setInputs(input.value);
  }
};

init();
</script>
