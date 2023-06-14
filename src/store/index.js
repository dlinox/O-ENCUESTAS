import { defineStore } from 'pinia'

const useSurveyStore = defineStore('surveyStore', {
  state: () => {
    return {
      survey: {},
      count: 1,
    }
  },  
});

const useDataDemoStore = defineStore('demoStore', {
  
  state: () => {
    return {
      surveys: [],
    }
  },  
});

export {useSurveyStore,  useDataDemoStore}