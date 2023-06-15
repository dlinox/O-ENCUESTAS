import { defineStore } from 'pinia'


const useDataStore = defineStore('dataStore', {
  state: () => {
    return {
      currentSurvey: {},
      currentTopic: null,
      surveys: [],
      topics: [],
      sections: [],
      questions: [],
    }
  },
});


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

export { useSurveyStore, useDataDemoStore, useDataStore }