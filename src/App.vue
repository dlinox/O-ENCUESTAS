
<template>
     <router-view></router-view>
</template>
<script setup>
import { useSurveyStore } from '@/store/index'
const surveyStore = useSurveyStore();

const dataSurvey = {
     title: "Enuesta de ejemplo",
     secctions: [
          {
               id: 1,
               title: "Seccion 1",
               description: "Descripcion de la seccion 1",
               complete: false,
               current: true,
               questions: [
                    {
                         statement: "Egresos familiares",
                         dependent: 2,//Id de la pregunta que depende si dependiera de alguna,
                         helpQuestion: 'Mensaje ayuda para la pregunta, nota, alerta , etc....',
                         askQuestion: '', // solo para preguntas simples o  si seleccionar una opcion distinta (OTROS)

                         structute: {//tipo de la pregunta, //TABLA O CAMPO JSON 
                              type: 'respuesta simple | RS',
                              // [respuesta simple, seleccion unica, seleccion multiple, pregunta cuando cada opcion resive un valor]
                              input: 'input:number', // [radio, select, input:text.....]
                              other: false, //TIENE LA OPCION DE:  OTRA(O)/ESPECIFICAR ...  
                              grid: 'col-span-2 inline-flex ... ', // UI de la pregunta 
                         },

                         options: [// puede ser null ó [ ]
                              {
                                   title: "Opcion 1",
                                   value: ''// 0=No Seleccionada / 1=Seleccionada
                              }
                              ,
                              {
                                   title: "Alimentación",
                                   value: ''// el valor mumerico
                              }
                              ,
                              {
                                   title: "Opcion 3",
                                   value: ''
                              }
                              ,
                         ],
                    },
                    {
                         statement: "Pregunta 2",
                         options: [
                              { title: "Opcion 1" },
                              { title: "Opcion 2" },
                              { title: "Opcion 3" },
                         ],
                    },

                    {
                         statement: "Pregunta 3",
                         options: [
                              { title: "Opcion 1" },
                              { title: "Opcion 2" },
                              { title: "Opcion 3" },
                         ],
                    },
               ],
          },
          {
               id: 2,
               title: "Seccion 2",
               description: "Descripcion de la seccion 2",
               complete: false,
               current: false,
               questions: [
                    {
                         statement: "Pregunta 1",
                         options: [
                              { title: "Opcion 1" },
                              { title: "Opcion 2" },
                              { title: "Opcion 3" },
                         ],
                    },
                    {
                         statement: "Pregunta 2",
                         options: [
                              { title: "Opcion 1" },
                              { title: "Opcion 2" },
                              { title: "Opcion 3" },
                         ],
                    },
               ],
          },
          {
               id: 3,
               title: "Seccion 3",
               description: "Descripcion de la seccion3",
               complete: false,
               current: false,
               questions: [
                    {
                         statement: "Pregunta 1",
                         options: [
                              { title: "Opcion 1" },
                              { title: "Opcion 2" },
                              { title: "Opcion 3" },
                         ],
                    },
                    {
                         statement: "Pregunta 2",
                         options: [
                              { title: "Opcion 1" },
                              { title: "Opcion 2" },
                              { title: "Opcion 3" },
                         ],
                    },
               ],
          },
          {
               id: 4,
               title: "Seccion 4",
               description: "Descripcion de la seccion 4",
               complete: false,
               current: false,
               questions: [
                    {
                         statement: "Pregunta 1",
                         options: [
                              { title: "Opcion 1" },
                              { title: "Opcion 2" },
                              { title: "Opcion 3" },
                         ],
                    },
                    {
                         statement: "Pregunta 2",
                         options: [
                              { title: "Opcion 1" },
                              { title: "Opcion 2" },
                              { title: "Opcion 3" },
                         ],
                    },
               ],
          },
     ],
};

const init = () => {
     console.log('init survey');
     surveyStore.survey = dataSurvey;
}

init();
</script>
