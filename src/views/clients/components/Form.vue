<template>
  <div class="grid grid-cols-2 mt-4 bg-white mx-auto justify-center">
    <div class="col-span-2 rounded-lg">
      <div
        v-for="(question, indexQuestion) in questionsList"
        :key="question.id"
      >
        <ul>
          <template v-if="!question.isDependent || question.show">
            <li class="mb-4" v-if="question.type === 0">
              <OneSelection
                :question="question"
                v-model="question.answer.options"
                @update:modelValue="validation($event, question, true)"
              />
            </li>

            <li class="mb-4" v-else-if="question.type === 1">
              <InputForm
                v-model="question.answer.text"
                type="text"
                :isRequired="question.isRequired === 'true' ? true : false"
                :label="question.statement"
                :error="question.error"
                @update:modelValue="validation($event, question)"
              />
            </li>

            <li class="mb-4" v-else-if="question.type === 2">
              <InputForm
                v-model="question.answer.text"
                type="date"
                :isRequired="question.isRequired === 'true' ? true : false"
                :label="question.statement"
                :error="question.error"
                @update:modelValue="validation($event, question)"
              />
            </li>

            <li class="mb-4" v-else-if="question.type === 3">
              <InputForm
                v-model="question.answer.text"
                type="number"
                :isRequired="question.isRequired === 'true' ? true : false"
                :label="question.statement"
                :error="question.error"
                @update:modelValue="validation(question.answer, question)"
              />
            </li>

            <li class="mb-4" v-else-if="question.type === 50">
              <StudyCycleForm
                :question="question"
                v-model="question.answer.text"
              />
            </li>

            <li class="mb-4" v-else-if="question.type === 21">
              <FacuForm :question="question" v-model="question.answer.text" />
            </li>

            <li class="mb-4" v-if="question.type === 30">
              <OneSelectionOtherForm
                :question="question"
                v-model="question.answer.options"
                @update:modelValue="validation($event, question, true)"
              />
            </li>

            <li class="mb-4" v-else-if="question.type === 20">
              <ProStudyForm
                :question="question"
                v-model="question.answer.text"
              />
            </li>

            <li class="mb-4" v-else-if="question.type === 4">
              <HSelect
                v-model="question.answer.text"
                :label="question.statement"
                :error="question.error"
                @update:modelValue="validation($event, question, indexQuestion)"
              />
            </li>

            <li class="mb-4" v-else-if="question.type === 6">
              <MultipleSelection
                :question="question"
                v-model="question.answer.options"
                @update:modelValue="validation($event, question, indexQuestion)"
              />
            </li>

            <li class="mb-4" v-else-if="question.type === 8">
              <InputForm
                v-model="question.answer.text"
                type="email"
                :isRequired="question.isRequired === 'true' ? true : false"
                :label="question.statement"
                :error="question.error"
                @update:modelValue="validateEmail($event, question)"
              />
            </li>

            <li class="mb-4" v-else-if="question.type === 9">
              <InputForm
                v-model="question.answer.text"
                type="tel"
                :isRequired="question.isRequired === 'true' ? true : false"
                :label="question.statement"
                :error="question.error"
                @update:modelValue="validatePhone($event, question)"
              />
            </li>

            <li class="mb-4" v-else-if="question.type === 10">
              <UbigeoForm
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
            </li>

            <li class="mb-4" v-else-if="question.type === 11">
              <UbigeoOtherForm
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
            </li>
          </template>
        </ul>
      </div>
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

const surveyService = new SurveyService();

const props = defineProps({
  questions: Array,
  section: Object,
});

const emit = defineEmits(["onSuccess", "onFaild"]);

const questionsList = computed(() => props.questions);

const isValid = ref(true);

const onSelectTrigger = (question) => {
  questionsList.value.map((item) => {
    if (item.isDependent == question.id) {
      if (item.optionTrigger === question.answer.options) {
        item.show = true;
      } else {
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
    if (!item.isDependent || item.show) {
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

const validAll = () => {
  var countError = 0;

  questionsList.value.forEach((item) => {
    if (
      !item.answer?.options &&
      !item.answer?.text &&
      item.isRequired === "true" &&
      (!item.isDependent || item.show)
    ) {
      item.error = {
        isError: true,
        text: "Obligatorio",
      };

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
  console.log(validAll());

  let valid = validAll();

  console.log("valid", valid);

  if (valid) {
    let data = setAnswers();
    console.log(setAnswers());
    let res = await surveyService.saveSection(data);

    emit("onSuccess");
    console.log("Guardando ...");
    return res;
  }

  console.error("Error ...");
  emit("onFaild");
  return false;
};
</script>
