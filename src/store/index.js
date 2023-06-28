import { defineStore } from 'pinia'
import { SurveyService } from '../services';

const surveyService = new SurveyService();

const useDataStore = defineStore('dataStore', {
  state: () => ({
    currentSurvey: {},
    currentTopic: {},
    currentSection: {},

    surveys: [],
    topics: [],
    sections: [], //currents
    questions: [], //currents

    questionType: [
      {value: 1, title: 'TEXT'},
      {value: 2, title: 'DATE'},
      {value: 1, title: 'NUMBER'},
      {value: 1, title: 'RADIO'},
      {value: 1, title: 'SELECT'},
      {value: 1, title: 'TEXTAREA'},
      {value: 1, title: 'COMBOBOX'},
      {value: 1, title: 'UBIGEO'},
    ]
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

    setCurrentSurvey(survey) {
      if (this.currentSurvey.id != survey) {
        this.currentSurvey = this.surveys?.find((item) => survey == item.id);
      }
    },

    async getTopics(survey) {
      let res = await surveyService.getTopics(survey);
      return res;
    }

  }
});

export { useDataStore }