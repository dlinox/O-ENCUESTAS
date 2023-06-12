
<template>
     <router-view></router-view>
     <pre>
{{ dataSurvey }}
     </pre>
</template>
<script setup>
import { useSurveyStore } from '@/store/index'
import { RS, RL, SU, SM, SD, MR } from './models/Structure.js'

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
                         id: 1,
                         statement: "Egresos familiares",
                         dependent: 2,//Id de la pregunta que depende si dependiera de alguna,
                         helpQuestion: 'Mensaje ayuda para la pregunta, nota, alerta , etc....',
                         askQuestion: '', // solo para preguntas simples o  si seleccionar una opcion distinta (OTROS)

                         RL,

                         options: [// puede ser null ó []
                              {
                                   id: 1,
                                   title: "Opcion 1",
                                   value: ''// 0=No Seleccionada / 1=Seleccionada
                              },
                              {
                                   id: 2,
                                   title: "Alimentación",
                                   value: ''// el valor mumerico
                              },
                              {
                                   id: 3,
                                   title: "Opcion 3",
                                   value: ''
                              },
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
