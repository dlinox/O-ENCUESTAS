<template>
  <!-- Todo: Crear componente Button  -->
  <AdminLayout>
    <template #header.title> Encuestas </template>
    <template #header.subtitle> Crear nueva Encuesta </template>

    <div class="grid grid-cols-3 gap-8">
      <div class="col-span-2 rounded-lg bg-white p-3 pt-5">
        <InputForm
          v-model="form.title"
          label="Nombre de la encuesta"
          placeholder="Ingrese el nombre de la encuesta"
        />

        <WrapperSection
          v-for="(section, indexSection) in form.secctions"
          :title="'Sección ' + (indexSection + 1)"
          class="col-span-2 rounded-lg border-solid border-2 border-gray-100"
        >
          <template #actions>
            <ButtonPrimary title="Añadir sección" />
          </template>

          <template #inputs>
            <InputForm
              v-model="section.title"
              label="Nombre de sección"
              placeholder="Ingrese el nombre de la encuesta"
            />
          </template>

          <template #content>
            <WrapperSection
              v-for="(question, indexQuestion) in section.questions"
              :title="'Pregunta ' + (indexQuestion + 1)"
              class="section-item bg-gray-50 p-3 rounded-md"
            >
              <template #actions>
                <ButtonPrimary title="Añadir pregunta" />
              </template>

              <template #inputs>
                <InputForm
                  v-model="question.statement"
                  label="Enunciado de la pregunta"
                  placeholder="Ingrese el enunciado de la pregunta"
                />
              </template>

              <template #content>
                <div class="section-item bg-gray-200 rounded-md p-3 mt-4">
                  <div
                    v-for="(option, indexOption) in question.options"
                    class="grid grid-cols-12 gap-1 mt-2"
                  >
                    <div class="col-span-10">
                      <InputForm
                        v-model="option.title"
                        :label="'Opcion ' + (indexOption + 1)"
                        :placeholder="'Ingrese la opcion ' + (indexOption + 1)"
                      />
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
      </div>
      <div class="rounded-lg ring-1 bg-white ring-gray-100 p-3">col 2</div>
    </div>
  </AdminLayout>
</template>
<script setup>
import { ref } from "vue";
import AdminLayout from "@/layouts/AdminLayout.vue";
import InputForm from "@/components/Forms/inputForm.vue";
import ButtonPrimary from "@/components/ButtonPrimary.vue";
import WrapperSection from "./survey/components/WrapperSection.vue";
const form = ref({
  title: "Enuesta de ejemplo",
  secctions: [
    {
      title: "Seccion",
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
      title: "Seccion",
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
