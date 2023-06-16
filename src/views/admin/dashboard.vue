<template>
  <!-- Todo: Crear componente Button  -->
  <AdminLayout>
    <template #header.title> Encuestas </template>
    <template #header.subtitle> Crear nueva Encuesta </template>

    <div class="grid grid-cols-7 gap-6">
      <!-- <div class="col-span-2">
        <div v-for="item in form.secctions " class="bg-white border-gray-100 rounded-lg mb-2 p-2">
            - {{ item.title }}
        </div>
      </div> -->
      <div class="col-span-7">
        <div class="grid grid-cols-2 gap-4 ">
          <div class="col-span-2 p-4 bg-white rounded-lg">
            <h2 class="text-lg mb-3 font-bold"> Nueva encuesta</h2>

            <div class="grid grid-cols-4">
              <div class="col-span-2 p-4">
                <InputForm v-model="form.title" label="Nombre de la encuesta"
                  placeholder="Ingrese el nombre de la encuesta" />
              </div>
              <div class="col-span-2 p-4">
                <label class="block text-sm font-medium leading-6 text-gray-900"> Dirigido a:</label>
                <CheckBoxesFrom :options="[
                  { id: 1, title: 'Estudiantes' },
                  { id: 2, title: 'Docente' },
                ]" />
              </div>
            </div>
          </div>
          <WrapperSection v-for="(section, indexSection) in form.secctions" :title="'Sección ' + (indexSection + 1)"
            class="col-span-2 rounded-lg border-solid border-2 border-gray-100 p-3 bg-white">
            <template #actions>
              <div>
                <ButtonPrimary title="Borrar" />
                <ButtonPrimary class="ms-2" title="Duplicar" />
              </div>
            </template>

            <template #inputs>
              <InputForm v-model="section.title" label="Nombre de sección"
                placeholder="Ingrese el nombre de la encuesta" />
            </template>

            <template #content>
              <WrapperSection v-for="(question, indexQuestion) in section.questions"
                :title="'Pregunta ' + (indexQuestion + 1)" class=" p-3 border-t-2 border-gray-400 ">
                <template #actions>

                  <div>
                    <ButtonPrimary title="Borrar" />
                    <ButtonPrimary class="ms-2" title="Duplicar" />
                  </div>

                </template>

                <template #inputs>

                  <div class="grid grid-cols-3  gap-4">
                    <div class="col-span-2">
                      <InputForm v-model="question.statement" label="Enunciado de la pregunta"
                        placeholder="Ingrese el enunciado de la pregunta" />
                    </div>
                    <div class="col-span-1">

                      <label class="block text-sm font-medium leading-6 text-gray-900">
                        Tipipo de pregunta
                      </label>
                      <HSelect :options="optionTypeQuestion" />
                    </div>
                  </div>

                </template>

                <template #content>
                  <div class="py2">
                    <CheckBoxesFrom :questionIndex="`${question.id}-required`" :options="[{ title: 'Obligatorio' }]" />
                    <CheckBoxesFrom :questionIndex="`${question.id}-inline`" :options="[{ title: 'Inline' }]" />
                    <CheckBoxesFrom :questionIndex="`${question.id}-depent`"
                      :options="[{ title: 'Depende de otra pregunta' }]" />


                  </div>
                  <div class="section-item bg-gray-200 rounded-md p-3 mt-4">
                    <div v-for="(option, indexOption) in question.options" class="grid grid-cols-12 gap-1 mt-2">
                      <div class="col-span-10">
                        <InputForm v-model="option.title" :label="'Opcion ' + (indexOption + 1)"
                          :placeholder="'Ingrese la opcion ' + (indexOption + 1)" />
                      </div>
                      <div class="col-span-2 flex items-end">
                        <ButtonPrimary class="ms-2" title="-" />
                        <ButtonPrimary class="ms-2" title="+" />
                      </div>
                    </div>
                  </div>
                </template>
              </WrapperSection>
            </template>
          </WrapperSection>


          <div class="relative col-span-2 divide-y-2 divide-gray-400 divide-dashed">
            <div class="text-center py-2">
              <ButtonPrimary class="absolute top-0 right-auto " title="Aadir seccin" />
            </div>
            <div class="text-center py-2">
            </div>
          </div>
        </div>
      </div>
    </div>



  </AdminLayout>
</template>
<script setup>
import { ref } from "vue";
import AdminLayout from "@/layouts/AdminLayout.vue";
import InputForm from "@/components/Forms/inputForm.vue";
import ButtonPrimary from "@/components/ButtonPrimary.vue";
import WrapperSection from "./survey/components/WrapperSection.vue";
import CheckBoxesFrom from "@/components/Forms/CheckBoxesFrom.vue";
import HSelect from "../../components/HSelect.vue";
import { TrashIcon } from "@heroicons/vue/20/solid";


const optionTypeQuestion = [
  { id: 'TEXT', title: 'Texto' },
  { id: 'NUMBER', title: 'Número' },
  { id: 'SELECT', title: 'Desplegable' },
  { id: 'RADIO', title: 'Opcion unica' },
  { id: 'CHECKBOX', title: 'Opcion multiple' },
];

const form = ref({
  title: "Encuesta de ejemplo",
  secctions: [
    {
      title: "Seccion 1",
      description: "Descripcion de la seccion ",
      questions: [
        {
          statement: "Pregunta",
          options: [
            { title: "Opcion" },
            { title: "Opcion" },
            { title: "Opcion" },
          ],
        },
        {
          statement: "Pregunta",
          options: [
            { title: "Opcion" },
            { title: "Opcion" },
            { title: "Opcion" },
          ],
        },
      ],
    },

    {
      title: "Seccion 2",
      description: "Descripcion de la seccion ",
      questions: {
        statement: "Pregunta",
        options: [
          { title: "Opcion" },
          { title: "Opcion" },
          { title: "Opcion" },
        ],
      },
    },
  ],
});

const demoData = ref({
  id: 1,
  title: "",
  to: "",
  topics: [
    {
      id: 1,
      title: "",
      description: "",
      sections: [
        {
          id: 1,
          title: "",
          description: "",
          isDependent: "",
          questions: [
            {
              id: 1,
              statement: "",
              description: "",
              structure:{
                type: 'TEXT ...',
                required: true,
                inline: true,
              }, // por ver
              options: [
                {
                  id: 1,
                  title: "",
                }
              ]
            }
          ]
        }
      ]
    }
  ]
})

const defaultSection = {
  title: "Seccion",
  description: "Descripcion de la seccion ",
  questions: [
    {
      statement: "Pregunta",
      options: [{ title: "Opcion" }],
    },
  ],
};

const addSection = () => {
  form.value.secctions.push({ ...defaultSection });
};
const removeSection = (indexSection) => {
  form.value.secctions.splice(indexSection, 1);
};
</script>
