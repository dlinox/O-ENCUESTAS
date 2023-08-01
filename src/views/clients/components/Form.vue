<template>
  <div class="grid grid-cols-2 mt-4 bg-white mx-auto justify-center">
    <div class="col-span-2 rounded-lg">
      <ul ref="refList" class="">
        <li
        v-for="(question, indexQuestion) in questionsList"
        :key="question.id"
        :id="question.id"
        :class="[
          !question.isDependent || question.show ? 'pt-2 pb-5' : '',
          question.show ? 'bg-slate-50  -mt-3 px-4 pt-2 rounded-lg' : '',
        ]"
        >
          <template v-if="!question.isDependent || question.show">
            <template
              v-if="question.type === 0"
              :class="question.show ? 'bg-slate-600 p-3 rounded-lg' : ''"
            >
              <OneSelection
                :isDisabled="notChanges.includes(question.id)"
                :question="question"
                v-model="question.answer.options"
                @update:modelValue="validation($event, question, true)"
              />
            </template>

            <template v-else-if="question.type === 1">
              <InputForm
                :helperText="question.helpQuestion"
                :isReadonly="notChanges.includes(question.id)"
                v-model="question.answer.text"
                type="text"
                :isRequired="question.isRequired === 'true' ? true : false"
                :label="question.statement"
                :error="question.error"
                @update:modelValue="validation($event, question)"
              />
            </template>

            <template v-else-if="question.type === 2">
              <InputForm
                :helperText="question.helpQuestion"
                :isReadonly="notChanges.includes(question.id)"
                v-model="question.answer.text"
                type="date"
                :isRequired="question.isRequired === 'true' ? true : false"
                :label="question.statement"
                :error="question.error"
                @update:modelValue="validation($event, question)"
              />
            </template>

            <template v-else-if="question.type === 3">
              <InputForm
                :helperText="question.helpQuestion"
                :isReadonly="notChanges.includes(question.id)"
                v-model="question.answer.text"
                type="number"
                :isRequired="question.isRequired === 'true' ? true : false"
                :label="question.statement"
                :error="question.error"
                @update:modelValue="validation(question.answer, question)"
              />
            </template>

            <template v-else-if="question.type === 50">
              <StudyCycleForm
                :isDisabled="notChanges.includes(question.id)"
                :question="question"
                v-model="question.answer.text"
              />
            </template>

            <template v-else-if="question.type === 21">
              <FacuForm
                :isRequired="question.isRequired === 'true' ? true : false"
                :isDisabled="notChanges.includes(question.id)"
                :question="question"
                v-model="question.answer.text"
              />
            </template>

            <template v-if="question.type === 30">
              <OneSelectionOtherForm
                :question="question"
                v-model="question.answer.options"
                @update:modelValue="validation($event, question, true)"
              />
            </template>

            <template v-else-if="question.type === 20">
              <ProStudyForm
                :isDisabled="notChanges.includes(question.id)"
                :isRequired="question.isRequired === 'true' ? true : false"
                :question="question"
                v-model="question.answer.text"
              />
            </template>

            <template v-else-if="question.type === 4">
              <HSelect
                :isRequired="question.isRequired === 'true' ? true : false"
                v-model="question.answer.text"
                :label="question.statement"
                :error="question.error"
                @update:modelValue="validation($event, question, indexQuestion)"
              />
            </template>

            <template v-else-if="question.type === 6">
              <MultipleSelection
                :question="question"
                v-model="question.answer.options"
                @update:modelValue="validation($event, question, indexQuestion)"
              />
            </template>

            <template v-else-if="question.type === 8">
              <InputForm
                :helperText="question.helpQuestion"
                :isReadonly="notChanges.includes(question.id)"
                v-model="question.answer.text"
                type="email"
                :isRequired="question.isRequired === 'true' ? true : false"
                :label="question.statement"
                :error="question.error"
                @update:modelValue="validateEmail($event, question)"
              />
            </template>

            <template v-else-if="question.type === 9">
              <InputForm
                :helperText="question.helpQuestion"
                :isReadonly="notChanges.includes(question.id)"
                v-model="question.answer.text"
                type="tel"
                :isRequired="question.isRequired === 'true' ? true : false"
                :label="question.statement"
                :error="question.error"
                @update:modelValue="validatePhone($event, question)"
              />
            </template>

            <template v-else-if="question.type === 10">
              <UbigeoForm
                :question="question"
                :isReadonly="notChanges.includes(question.id)"
                v-model="question.answer.text"
                :error="question.error ? true : false"
                @update:modelValue="validation(question.answer, question)"
              />
              <div class="w-full text-end">
                <span class="text-xs text-red-600">{{
                  question.error?.text
                }}</span>
              </div>
            </template>

            <template v-else-if="question.type === 11">
              <UbigeoOtherForm
                :isReadonly="notChanges.includes(question.id)"
                :question="question"
                v-model="question.answer.text"
                :error="question.error ? true : false"
                @update:modelValue="validation(question.answer, question)"
              />
              <div class="w-full text-end">
                <span class="text-xs text-red-600">{{
                  question.error?.text
                }}</span>
              </div>
            </template>
          </template>
        </li>
      </ul>

      <div class="flex justify-end mt-4">
        <slot name="footer" :submit="submit"> </slot>
      </div>
    </div>
  </div>

  
</template>

<script setup>
import { ref, computed } from "vue";
import {
  IsRequired,
  IsEmail,
  IsNumber,
  MaxLong,
} from "@/helpers/validationForm";
import OneSelection from "@/components/Forms/OneSelection.vue";
import MultipleSelection from "@/components/Forms/MultipleSelection.vue";
import UbigeoOtherForm from "@/components/Forms/UbigeoOtherForm.vue";
import UbigeoForm from "@/components/UbigeoForm.vue";
import InputForm from "@/components/Forms/InputForm.vue";
import HSelect from "@/components/HSelect.vue";
import { SurveyService } from "@/services";
import StudyCycleForm from "@/components/Forms/StudyCycleForm.vue";
import FacuForm from "@/components/Forms/FacuForm.vue";
import ProStudyForm from "@/components/Forms/ProStudyForm.vue";
import OneSelectionOtherForm from "../../../components/Forms/OneSelectionOtherForm.vue";
import { useAuthStore } from "@/store/auth";

const authStore = useAuthStore();

const surveyService = new SurveyService();

const props = defineProps({
  questions: Array,
  section: Object,
});

const refList = ref(null);

const toast = ref({
  show: false,
  text: null,
  type: "success",
});

const emit = defineEmits(["onSuccess", "onFaild"]);

const questionsList = computed(() => props.questions);

const isValid = ref(true);

const onSelectTrigger = (question) => {
  questionsList.value.map((item) => {
    if (item.isDependent == question.id) {
      if (item.optionTrigger === question.answer.options) {
        item.show = true;
      } else if (item.optionTrigger === null) {
        item.show = true;
      } else {
        item.answer = [];
        item.show = false;
      }
    }
    return item;
  });
};

const validation = (val, question, isTrigger = false) => {
  // if (!val) return;
  if (isTrigger) {
    onSelectTrigger(question);
  }

  if (question.isRequired === "true") {
    required(val, question);
  }
};

const required = (val, question) => {
  questionsList.value.map((item) => {
    if (item.id === question.id) {
      if (!IsRequired(val)) {
        item.error = {
          isError: true,
          text: "Obligatorio",
        };
        isValid.value = false;
      } else if (question.isRequired === "false" && !IsRequired(val)) {
        item.error = {
          isError: false,
          text: null,
        };
        isValid.value = true;
      } else {
        item.error = {
          isError: false,
          text: null,
        };
        isValid.value = true;
      }
    }
  });
};

const validateEmail = (val, question) => {
  questionsList.value.map((item) => {
    if (item.id == question.id) {
      if (question.isRequired === "true" && !IsRequired(val)) {
        item.error = {
          isError: true,
          text: "Obligatorio",
        };

        isValid.value = false;
      } else if (question.isRequired === "false" && !IsRequired(val)) {
        item.error = {
          isError: false,
          text: null,
        };

        isValid.value = true;
      } else if (!IsEmail(val)) {
        item.error = {
          isError: true,
          text: "Formato no valido",
        };

        isValid.value = false;
      } else {
        item.error = {
          isError: false,
          text: null,
        };
        isValid.value = true;
      }
    }
  });
};

const validatePhone = (val, question) => {
  questionsList.value.map((item) => {
    if (item.id == question.id) {
      if (!IsRequired(val)) {
        item.error = {
          isError: true,
          text: "Obligatorio",
        };

        isValid.value = false;
      } else if (!IsNumber(val)) {
        item.error = {
          isError: true,
          text: "Solo se permite numeros",
        };
        isValid.value = false;
      } else if (question.isRequired === "false" && !IsRequired(val)) {
        item.error = {
          isError: false,
          text: null,
        };

        isValid.value = true;
      } else if (!MaxLong(val, 9)) {
        item.error = {
          isError: true,
          text: `Longitud debe se ${9} digitos`,
        };

        isValid.value = false;
      } else {
        item.error = {
          isError: false,
          text: null,
        };

        isValid.value = true;
      }
    }
  });
};

const notChangesRegular = [
  "78ae9492-a909-459f-ba53-15165c884d87",
  "d2574937-e2fc-4eb5-b612-d767e3610a04",
  "fb5c10df-f60d-4815-a007-a189e879054e",
  "e8367e12-f088-4188-bed8-50342bac562c",
  "c9175462-8e03-47b1-9450-2f126a1655c2",
  "de9c81d9-87d5-4cf4-b2f0-5274399ff94c",
  "a3056caa-84a9-44a0-9ee5-46a59ad3f073",
  "ab123cd2-c64d-44d2-8023-af2849bf6f9d",
  "bd4313bd-1709-4bfd-8fae-bfe2eb6e5d05",
  // "654a124d-93e4-4a1b-84e2-4e189fb4a0dc",
  // "2cb7930e-344f-4371-a2d1-da1579bfe33e",
  "16373178-2cb7-4a9e-be10-33d1145fcb48",
  "b37c3cce-8d8a-45e3-90bd-59e0bcb9cccb", //*R
  "50af5759-8009-4419-bfc2-8df851be62b1",
  "4d36be9a-1567-4d80-a726-a5a1bc2a33c7",
  "36f9a47d-457d-4052-ab25-47b4decb887f",
  "574ba955-5176-4997-8e34-42524cafa862",
  "6bc3b523-2a89-423d-99bf-53692c004633",
];

const notChangesEntrants = [
  "78ae9492-a909-459f-ba53-15165c884d87",
  "d2574937-e2fc-4eb5-b612-d767e3610a04",
  "fb5c10df-f60d-4815-a007-a189e879054e",
  "e8367e12-f088-4188-bed8-50342bac562c",
  "c9175462-8e03-47b1-9450-2f126a1655c2",
  "de9c81d9-87d5-4cf4-b2f0-5274399ff94c",
  "a3056caa-84a9-44a0-9ee5-46a59ad3f073",
  "ab123cd2-c64d-44d2-8023-af2849bf6f9d",
  "bd4313bd-1709-4bfd-8fae-bfe2eb6e5d05",
  // "2cb7930e-344f-4371-a2d1-da1579bfe33e", //Correo electrónico personal
  "16373178-2cb7-4a9e-be10-33d1145fcb48", //Lugar De Nacimiento
  "85c4a938-b006-45a8-bdbd-1c4223656ab6", //¿Presenta alguna discapacidad?
  // s2
  "50af5759-8009-4419-bfc2-8df851be62b1",
  "4d36be9a-1567-4d80-a726-a5a1bc2a33c7",
  "36f9a47d-457d-4052-ab25-47b4decb887f",
  "574ba955-5176-4997-8e34-42524cafa862",
  "6bc3b523-2a89-423d-99bf-53692c004633",
];

const notChanges = computed(() =>
  authStore.currentUser ? notChangesEntrants : notChangesRegular
);

const setAnswers = () => {
  let answerSection = {
    section_: props.section.id,
    answers_: [],
  };

  const restInText = [1, 2, 3, 5, 8, 9, 10, 20, 50];
  const restInOptionsSimple = [0, 4];
  const restInOptionsMulti = [6];
  const restInWithOther = [11];
  const restInBoth = [30];

  questionsList.value.forEach((item) => {
    if (
      (!item.isDependent || item.show) &&
      !notChanges.value.includes(item.id)
    ) {
      if (restInText.includes(item.type)) {
        answerSection.answers_.push({
          qst_: item.id,
          opts_: null,
          txt_: item.answer.text,
        });
      } else if (restInOptionsSimple.includes(item.type)) {
        answerSection.answers_.push({
          qst_: item.id,
          opts_: [item.answer.options],
          txt_: null,
        });
      } else if (restInOptionsMulti.includes(item.type)) {
        answerSection.answers_.push({
          qst_: item.id,
          opts_: Array.isArray(item.answer.options)
            ? item.answer.options
            : item.answer.options?.split(","),
          txt_: null,
        });
      }
      // Array.isArray(props.modelValue) ? props.modelValue : props.modelValue.split(',')
      else if (restInWithOther.includes(item.type)) {
        let ubigeo = item.answer.text.split("%%%", 2);
        answerSection.answers_.push({
          qst_: item.id,
          opts_: null,
          txt_: ubigeo[0] + "%%%" + item.other,
        });
      } else if (restInBoth.includes(item.type)) {
        answerSection.answers_.push({
          qst_: item.id,
          opts_: [item.answer.options],
          txt_: item.answer.text,
        });
      }
    }
  });

  return answerSection;
};

const errorIds = ref([]);

const validAll = () => {
  var countError = 0;
  errorIds.value = [];

  questionsList.value.forEach((item) => {
    if (
      !item.answer?.text &&
      ((item.answer?.options &&
        Array.isArray(item.answer?.options) &&
        item.answer?.options.length === 0) ||
        !item.answer?.options) &&
      item.isRequired === "true" &&
      (!item.isDependent || item.show)
    ) {
      item.error = {
        isError: true,
        text: "Obligatorio",
      };

      errorIds.value.push(item.id);

      countError++;
    } else {
      item.error = {
        isError: false,
        text: null,
      };
    }
  });

  return countError > 0 ? false : true;
};

const submit = async () => {
  let valid = validAll();
  if (valid) {
    let data = setAnswers();
    let res = await surveyService.saveSection(data);

    toast.value.show = true;
    toast.value.text = "Datos actualizados";
    toast.value.type = "success";

    emit("onSuccess", toast.value);
    return res;
  }

  document.getElementById(errorIds.value[0]).scrollIntoView("smooth");

  console.error("Error ...");

  toast.value.show = true;
  toast.value.text = "Responda las preguntas de manera correcta";
  toast.value.type = "danger";
  emit("onFaild", toast.value);
  return false;
};

const init = async () => {
  questionsList.value.forEach((item) => {
    onSelectTrigger(item);
  });
};
init();
</script>
