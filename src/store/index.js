import { defineStore } from 'pinia'
import { SurveyService } from '../services';

const surveyService = new SurveyService();

const useDataStore = defineStore('dataStore', {
  state: () => ({

    currentSurvey: {},
    currentTopic: {},

    currentSection: {},
    nextSection: {},
    prevSection: {},

    surveys: [],
    topics: [],
    sections: [], //currents
    questions: [], //currents

    cont: 0,
  }),
  actions: {
    async getSurveys() {
      if (this.surveys.length === 0) {
        let res = await surveyService.getSurveys();
        return res;
      }
      return this.surveys;
    },

    async setPositions(survey, topic, section) {
      let body = { "survey_": survey, "topic_": topic, "section_": section };
      let res = await surveyService.setPositionsCurrents(body);
      return res;
    },

    setSurveys(surveys) {
      this.surveys = surveys
    },

    async setCurrentSurvey(survey) {

      if (this.surveys.length === 0) {
        //TODO: CONSUMIR SERVICIO DE GETSURVE
        let res = await surveyService.getSurvey(survey);
        // this.currentSurvey = res.data.data[0];
        return;
      }

      // this.currentSurvey = this.surveys?.find((item) => survey == item.id);

    },

    async getTopics(survey) {
      let res = await surveyService.getTopics(survey);
      return res;
    }

  }
});

export { useDataStore }

