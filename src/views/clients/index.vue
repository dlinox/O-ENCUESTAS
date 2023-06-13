<template>
  <div>
    <pre>
      {{ dataSurvey }}
    </pre>
  </div>
</template>
<script setup>

import { RS, RL, SU, SM, SD, MR } from '../../models/Structure.js'


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
          statement: "Pregunta se respuesta corta (date,  number, text)",
          dependent: null,//Id de la pregunta que depende si dependiera de alguna,
          helpQuestion: 'Mensaje de ayuda para la pregunta, nota, alerta , etc...',
          structure: {
            id: 'id',
            type: 'type',
            code: 'code',
            input: 'input',
            labelGrid: 'labelGrid',
            inputGrid: 'inputGrid',
            other: 'other',
          },
          options: null,
          answerQuestion: '',
          /**
        * !Structura de respuesta opcion
        * id_pregunta
        * id_opcion
        * value null
        */
          // solo para preguntas simples o  si seleccionar una opcion distinta (OTROS)
          answer: {
            question_id: 1, //---back
            option_id: null,
            value: 'Respuesta'
          }
          //answer: value //Respuesta,
        },
        {
          id: 2,
          statement: "Pregunta de seleccion unica",
          dependent: null,//Id de la pregunta que depende si dependiera de alguna,
          helpQuestion: 'Mensaje ayuda para la pregunta, nota, alerta , etc....',
          askQuestion: '', // solo para preguntas simples o  si seleccionar una opcion distinta (OTROS)
          structure: SU,

          options: [// puede ser null ó []
            {
              id: 21,
              title: "Opcion 1",
            },
            {
              id: 22,
              title: "Opcion 2",
            },
            {
              id: 23,
              title: "Opcion 3",
            },
          ],

          answer: {
            question_id: 2, //---back
            option_id: 21,
            value: null
          }
          //answer:  option_id //41,

        },
        {
          id: 3,
          statement: "Pregunta de seleccion multiple",
          dependent: null,//Id de la pregunta que depende si dependiera de alguna,
          helpQuestion: 'Mensaje ayuda para la pregunta, nota, alerta , etc....',
          askQuestion: '', // solo para preguntas simples o  si seleccionar una opcion distinta (OTROS)
          structure: SM,
          options: [// puede ser null ó []
            {
              id: 31,
              title: "Opcion 1",
            },
            {
              id: 32,
              title: "Opcion 2",
            },
            {
              id: 33,
              title: "Opcion 3",
            },

          ],

          answer: {
            question_id: 3, //---back
            option_id: 31,
            value: null
          }
          //answer:  option_id //41,


        },
        {
          id: 4,
          statement: "Pregunta de seleccion simple desplegable",
          dependent: null,//Id de la pregunta que depende si dependiera de alguna,
          helpQuestion: 'Mensaje ayuda para la pregunta, nota, alerta , etc....',
          askQuestion: '', // solo para preguntas simples o  si seleccionar una opcion distinta (OTROS)
          structure: SD,
          options: [// puede ser null ó []
            {
              id: 41,
              title: "Opcion 1",
            },
            {
              id: 42,
              title: "Opcion 2",
            },
            {
              id: 43,
              title: "Opcion 3",
            },

          ],

          // answer: {
          //      question_id: 4, //---back
          //      option_id: 41,
          //      value: null //---back
          // }
          answer: 41 //option_id //41,
        },
        {
          id: 5,
          statement: "Pregunta de respuesta multiple",
          dependent: null,//Id de la pregunta que depende si dependiera de alguna,
          helpQuestion: 'Mensaje ayuda para la pregunta, nota, alerta , etc....',
          askQuestion: '', // solo para preguntas simples o  si seleccionar una opcion distinta (OTROS)
          structure: SD,
          options: [// puede ser null ó []
            {
              id: 51,
              title: "Ingreso económico del padre",
            },
            {
              id: 52,
              title: "Ingreso económico de la madre",
            },
            {
              id: 53,
              title: "Ingreso económico del estudiante",
            },

          ],

          answer: [
            {
              question_id: 5, //---back
              option_id: 51,
              value: 500.00,
            },
            {
              question_id: 5, //---back
              option_id: 52,
              value: 500.00,
            },
            {
              question_id: 5, //---back
              option_id: 53,
              value: 500.00,
            },
          ]

        },


      ],
    },
  ],
};


</script>
