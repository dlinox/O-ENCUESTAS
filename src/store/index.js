import { defineStore } from 'pinia'

export const useSurveyStore = defineStore('surveyStore', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      survey: {},
      count: 1,
    }
  },  
})
