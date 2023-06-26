<template>
  <HeaderPage title="Nueva Encuesta">
    <template #actions>
      <router-link to="/admin/surveys/create">
        <ButtonPrimary title="Nueva" />
      </router-link>
    </template>
  </HeaderPage>

  <div class="flex ">
    <div class="flex-none w-1/5 h-screen bg-white shadow-inner p-4">
      <h3 class="text-md mb-3 font-bold"> Topicos </h3>
      <ul>
        <li v-for="item in 2" class="group p-3 border flex justify-between rounded-lg  cursor-pointer mb-2">
          <div class="flex items-center">
            <div class="h-5 w-5 text-gray-400">
              <DocumentIcon></DocumentIcon>
            </div>
            <div class="ms-3 font-medium text-gray-600">
              Topico {{ item }}
            </div>
          </div>
          <div class="">

            <div class="group-hover:bg-slate-300 group-hover:text-white h-6 w-6 text-gray-400  rounded-md">
              <EllipsisHorizontalIcon />
            </div>

          </div>
        </li>

        <li
          class="group p-3 border border-gray-300 flex justify-between border-dashed  rounded-lg bg-gray-50 cursor-pointer mb-2">
          <div class="flex items-center">
            <div class="h-5 w-5 text-gray-400">
              <PlusIcon></PlusIcon>
            </div>
            <div class="ms-3 font-medium text-gray-600">
              Añadir topico
            </div>
          </div>

        </li>
      </ul>
    </div>
    <div class="grow py-4 px-4 ">
      <div class="max-w-4xl mx-auto">
        <div class="bg-white rounded-md p-4 mb-4">

          <div class="flex justify-between items-start">

            <div>

              <h2 class="text-lg font-medium text-gray-600  mb-3 ">Titulo de la encuesta</h2>
              <p class="text-sm font-medium text-gray-600 ">Descripcion de la encuesta</p>

            </div>
            <ButtonPrimary>
              <template #content>
                <div class="h-3 w-3">
                  <PencilIcon></PencilIcon>
                </div>
              </template>

            </ButtonPrimary>
          </div>
        </div>
        <div class="bg-white rounded-md ">
          <div class="p-4">
            <HModal>
              <template v-slot:activator="{ modal }">
                <button
                  class="group p-3 border border-gray-300 flex justify-center border-dashed  rounded-lg bg-gray-50 cursor-pointer w-full"
                  @click="modal">
                  <div class="flex items-center">
                    <div class="h-5 w-5 text-gray-400">
                      <PlusIcon></PlusIcon>
                    </div>
                    <div class="ms-3 font-medium text-gray-600">
                      Añadir pregunta
                    </div>
                  </div>
                </button>
              </template>
              <template v-slot:content="{ modal }">

                <HModal density="max-w-3xl">
                  <template v-slot:activator="{ modal }">

                    <div v-for="item in questionTypes"
                      class="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                      @click=" setQuestionAux(item); modal()">
                      <div
                        class="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <svg class="h-6 w-6 text-gray-600 group-hover:text-blue-600" xmlns="http://www.w3.org/2000/svg"
                          fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" :d="item.svg" />
                        </svg>
                      </div>
                      <div>
                        <p class="font-semibold text-gray-900">
                          {{ item.title }}
                        </p>
                        <p class="mt-1 text-gray-600"> {{ item.description }} </p>
                      </div>
                    </div>
                  </template>

                  <template v-slot:content="{ modal }">
                    <template v-if="currnetType.structure.type == 'TEXT'">
                      <InputForm label="Enunciado de la pregunta" />
                    </template>

                    <template v-else>
                      <div class="grid grid-cols-1 divide-y">
                        <div class="py-2">
                          <InputForm v-model="questionAux.statement" label="Enunciado de la pregunta" />
                        </div>
                        <div class="py-2">
                          <h4 class="text-sm font-medium"> Opciones </h4>
                          <div v-for="(option, index) in questionAux.options" :key="index" class="mb-2">
                            <div class="flex justify-between items-center">
                              <div class="w-11/12">
                                <InputForm v-model="option.title" placeholder="Opcion 1" />
                              </div>
                              <button class="flex-none bg-gray-200 p-2 rounded-md"
                                @click="questionAux.options.splice(index, 1)">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                  stroke="currentColor" class="w-4 h-4">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>

                        <div class="py-2 flex justify-between items-center">
                          <div>
                            <p>
                              <input v-model="questionAux.required" type="checkbox" class="mb-1 me-2"> Requerido
                            </p>

                            <p>
                              <input v-model="questionAux.inline" type="checkbox" class="mb-1 me-2"> Inline
                            </p>
                          </div>

                          <div>
                            <ButtonPrimary title="Agregar opcion" class="me-2" @click="addOption" />
                            <ButtonPrimary title="Agregar 'otra' respuesta " />
                          </div>
                        </div>
                      </div>
                    </template>
                  </template>

                  <template v-slot:actions="{ modal }">
                    <ButtonPrimary title="Cerrar" @click="modal" />
                    <ButtonPrimary title="Guardar" class="ms-2" @click="saveQuestion(); modal()" />
                  </template>

                </HModal>
              </template>
            </HModal>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-none w-1/5  shadow p-4">

      <h3 class="text-md mb-3 font-bold"> Secciones </h3>

      <ul>
        <li v-for="item in 2" class="group p-3 border flex justify-between rounded-lg  cursor-pointer mb-2">
          <div class="flex items-center">
            <div class="h-5 w-5 text-gray-400">
              <DocumentIcon></DocumentIcon>
            </div>
            <div class="ms-3 font-medium text-gray-600">
              Seccion {{ item }}
            </div>
          </div>
          <div class="">

            <div class="group-hover:bg-slate-300 group-hover:text-white h-6 w-6 text-gray-400  rounded-md">
              <EllipsisHorizontalIcon />
            </div>

          </div>
        </li>

        <li
          class="group p-3 border border-gray-300 flex justify-between border-dashed  rounded-lg bg-gray-50 cursor-pointer mb-2">
          <div class="flex items-center">
            <div class="h-5 w-5 text-gray-400">
              <PlusIcon></PlusIcon>
            </div>
            <div class="ms-3 font-medium text-gray-600">
              Añadir Seccion
            </div>
          </div>

        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import InputForm from "@/components/Forms/inputForm.vue";
import ButtonPrimary from "@/components/ButtonPrimary.vue";
import HModal from "@/components/HModal.vue";
import HeaderPage from "@/components/HeaderPage.vue";

import { DocumentIcon, EllipsisHorizontalIcon, PencilIcon, PlusIcon } from "@heroicons/vue/20/solid";

const form = ref({
  title: "Encuesta de ejemplo",
  topics: [
    {
      title: "Seccion 1",
      secctions: [
        {
          title: "Seccion 1",
          description: "Descripcion de la seccion ",
          questions: [],
        },
      ],
    }
  ],

});

const currnetType = ref(null);

 const questionTypes = [
  {
    title: 'Texto de respuesta',
    description: 'Permite escribir un texto pequeño',
    svg: 'M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12',
    structure: {
      type: 'TEXT',
      required: true,
      inline: true,
    }
  },
  {
    title: 'Seleccion Simple',
    description: 'Permite elegir una opcion',
    svg: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    structure: {
      type: 'RADIO',
      required: true,
      inline: true,
    }
  },
  {
    title: 'Seleccion simple despleable',
    description: 'Permite elegir una opcion de un desplegable',
    svg: 'M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9',
    structure: {
      type: 'SELECT',
      required: true,
      inline: true,
    }
  },
  {
    title: 'Seleccion multiple',
    description: 'Permite seleccionar multiples opciones',
    svg: 'M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z',
    structure: {
      type: 'CHECKBOX',
      required: true,
      inline: true,
    }
  },
];


const questionAux = ref({
  statement: "",
  options: [
    { title: 'Option 1', },
    { title: 'Option 2', },
    { title: 'Option 3', },

  ]
});


const setQuestionAux = (item) => {

  currnetType.value = item;
  questionAux.value = {
    ...questionAux.value,
    ...item.structure,
  }
}

const addTopic = () => {};
const addSecction = (indexTopic) => {};

const addOption = () => {//indexTopic, indexSection
  questionAux.value.options.push({ title: '' });
}

const saveQuestion = () => {
  form.value.topics[0].secctions[0].questions.push({ ...questionAux.value });
}
</script>
