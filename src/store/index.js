import { defineStore } from 'pinia'
import { SurveyService } from '../services';

const surveyService = new SurveyService();

const useDataStore = defineStore('dataStore', {
  state: () => ({
    currentSurvey: {},
    
    currentTopic: {},
    nextTocpic: null,
    prevTocpic: null,
    
    currentSection: {},
    nextSection: null,
    prevSection: null,

    surveys: [],
    topics: [],
    sections: [], //currents
    questions: [], //currents


  }),
  actions: {
    async getSurveys() {
      if (this.surveys.length === 0) {
        let res = await surveyService.getSurveys();
        return res;
      }
      return this.surveys;
    },
    setSurveys(surveys) {
      this.surveys = surveys
    },

    async setCurrentSurvey(survey) {

      if (this.surveys.length === 0) {
        //TODO: CONSUMIR SERVICIO DE GETSURVE
        let res = await surveyService.getSurvey(survey);
        this.currentSurvey =  res.data.data[0];
        return;
      }

      this.currentSurvey = this.surveys?.find((item) => survey == item.id);

    },

    async getTopics(survey) {
      let res = await surveyService.getTopics(survey);
      return res;
    }

  }
});

export { useDataStore }

