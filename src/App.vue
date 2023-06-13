
<template>
     <!-- <a  class="text-blue-600" href="https://docs.google.com/document/d/14Y60ll7pws3E2byvsuK7gX4IksFRf6uXv62cDEJbNXM/edit?usp=sharing" target="_blank">Doc</a> -->
     <router-view></router-view>
</template>
<script setup>
import { useSurveyStore } from '@/store/index'
import { RS, RL, SU, SM, SD, MR } from './models/Structure.js'
const surveyStore = useSurveyStore();
const dataSurvey = {
     title: "Enuesta de ejemplo",
     sections: [
          {
               id: 1,
               title: "Datos personales",
               description: "Datos personales del estudiante",
               complete: false,
               current: true,
               questions: [
                    {
                         id: 1,
                         statement: "Codigo",
                         dependent: null,//Id de la pregunta que depende si dependiera de alguna,
                         helpQuestion: 'Ingrese el nombre completo de su padre.',
                         structure: RS,
                         options: null,
                         answerQuestion: '',
                         // answer: null, //Respuesta,
                    },

                    {
                         id: 2,
                         statement: "Facultad",
                         dependent: null,//Id de la pregunta que depende si dependiera de alguna,
                         helpQuestion: 'Ingrese el nombre completo de su padre.',
                         structure: RS,
                         options: null,
                         answerQuestion: '',
                         answer: null, //Respuesta,
                    },


                    {
                         id: 3,
                         statement: "Carrera profesional",
                         dependent: null,//Id de la pregunta que depende si dependiera de alguna,
                         helpQuestion: 'Ingrese el nombre completo de su padre.',
                         structure: RS,
                         options: null,
                         answerQuestion: '',
                         answer: null, //Respuesta,
                    },


                    {
                         id: 4,
                         statement: "Modalidad de ingreso",
                         dependent: null,//Id de la pregunta que depende si dependiera de alguna,
                         helpQuestion: 'Ingrese el nombre completo de su padre.',
                         structure: RS,
                         options: null,
                         answerQuestion: '',
                         answer: null, //Respuesta,
                    },


                    {
                         id: 5,
                         statement: "Paterno",
                         dependent: null,//Id de la pregunta que depende si dependiera de alguna,
                         helpQuestion: 'Ingrese el nombre completo de su padre.',
                         structure: RS,
                         options: null,
                         answerQuestion: '',
                         // answer: null, //Respuesta,
                    },


                    {
                         id: 6,
                         statement: "Materno",
                         dependent: null,//Id de la pregunta que depende si dependiera de alguna,
                         helpQuestion: 'Ingrese el nombre completo de su padre.',
                         structure: RS,
                         options: null,
                         answerQuestion: '',
                         answer: null, //Respuesta,
                    },

                    {
                         id: 6,
                         statement: "Nombres",
                         dependent: null,//Id de la pregunta que depende si dependiera de alguna,
                         helpQuestion: 'Ingrese el nombre completo de su padre.',
                         structure: RS,
                         options: null,
                         answerQuestion: '',
                         answer: null, //Respuesta,
                    },

                    {
                         id: 7,
                         statement: "¿Tiene seguro de salud?",
                         dependent: null,//Id de la pregunta que depende si dependiera de alguna,
                         helpQuestion: 'Mensaje ayuda para la pregunta, nota, alerta , etc....',
                         askQuestion: '', // solo para preguntas simples o  si seleccionar una opcion distinta (OTROS)
                         structure: SD,

                         options: [
                              {
                                   id: 20,
                                   title: "NO TENGO",
                              },
                              {
                                   id: 21,
                                   title: "SIS",
                              },
                              {
                                   id: 22,
                                   title: "ESSALUD",
                              },
                              {
                                   id: 23,
                                   title: "OTRO",
                              },
                         ],
                    },


                    {
                         id: 8,
                         statement: "Tiene Alguna Discapacidad",
                         dependent: null,//Id de la pregunta que depende si dependiera de alguna,
                         optionTrigger: null,//Id de la pregunta que depende si dependiera de alguna,
                         helpQuestion: 'Mensaje ayuda para la pregunta, nota, alerta , etc....',
                         askQuestion: '', // solo para preguntas simples o  si seleccionar una opcion distinta (OTROS)
                         structure: SU,
                         options: [// puede ser null ó []
                              {
                                   id: 31,
                                   title: "SI",
                              },
                              {
                                   id: 32,
                                   title: "NO",
                              },
                         ],

                    },

                    {
                         id: 9,
                         statement: "Tipo de dicapacidad",
                         dependent: 8,//Id de la pregunta que depende si dependiera de alguna,
                         optionTrigger: 31,//Id de la pregunta que depende si dependiera de alguna,
                         helpQuestion: 'Mensaje ayuda para la pregunta, nota, alerta , etc....',
                         askQuestion: '', // solo para preguntas simples o  si seleccionar una opcion distinta (OTROS)
                         structure: SD,

                         options: [
                              {
                                   id: 80,
                                   title: "Discapacidad física o motora: Impedimento para moverse o trasladarse.",
                              },
                              {
                                   id: 81,
                                   title: "Discapacidad sensorial: Pérdida de la capacidad visual o auditiva, problemas para comunicarse o utilizar el lenguaje.",
                              },
                              {
                                   id: 82,
                                   title: "Discapacidad intelectual: Limitaciones para aprender y responder a situaciones",
                              },
                              {
                                   id: 83,
                                   title: "Discapacidad mental o psíquica: Relacionada con el comportamiento adaptativo del individuo.",
                              },
                         ],
                    },

                    {
                         id: 10,
                         statement: "Tipo de dicapacidad",
                         dependent: 8,//Id de la pregunta que depende si dependiera de alguna,
                         optionTrigger: 31,//Id de la pregunta que depende si dependiera de alguna,
                         helpQuestion: 'Mensaje ayuda para la pregunta, nota, alerta , etc....',
                         askQuestion: '', // solo para preguntas simples o  si seleccionar una opcion distinta (OTROS)
                         structure: SD,

                         options: [
                              {
                                   id: 101,
                                   title: "Leve",
                              },

                              {
                                   id: 102,
                                   title: "Moderado",
                              },

                              {
                                   id: 103,
                                   title: "Severo",
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
/************ 
v-model: cuando cada opcion tiene una respuesta
answer :{
     id_option,
     value,
}
*/
</script>

