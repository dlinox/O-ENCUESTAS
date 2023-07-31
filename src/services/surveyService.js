import Cookies from "js-cookie";
import http from "../utils/https";
import AuthService from "./authService";

const authService = new AuthService();

export default class SurveyService {
  getSurveys = async () => {
    try {
      let token = Cookies.get("token");
      http.defaults.headers["Authorization"] = "Bearer " + token;
      let surveys = await http.get("SURVEYS/v1/");

      return surveys.data.data;
    } catch (error) {
      let status = error.response?.status;
      if (status === 401) {
        authService.logout();
      }
    }
  };

  hasFinished = async (survey) => {
    try {
      let token = Cookies.get("token");
      http.defaults.headers["Authorization"] = "Bearer " + token;
      await http.get(`SURVEYS/v1/hasFinished/${survey}/`);
      return true;
    } catch (error) {
      return false;
    }
  };

  getSurvey = async (id) => {
    try {
      let token = Cookies.get("token");
      http.defaults.headers["Authorization"] = "Bearer " + token;
      let survey = await http.get(`SURVEYS/v1/actual/${id}/`);
      return survey.data.data[0];
    } catch (error) {
      let status = error.response?.status;
      if (status === 401) {
        authService.logout();
      }
      return false;
    }
  };

  getTopics = async (survey) => {
    try {
      let token = Cookies.get("token");
      http.defaults.headers["Authorization"] = "Bearer " + token;
      let topics = await http.get(`SURVEYS/v1/topics/${survey}/`);
      return topics.data.data;
    } catch (error) {
      let status = error.response?.status;
      if (status === 401) {
        authService.logout();
      }
      return false;
    }
  };

  getSections = async (topic) => {
    try {
      let token = Cookies.get("token");
      http.defaults.headers["Authorization"] = "Bearer " + token;
      let sections = await http.get(`SURVEYS/v1/sections/${topic}/`);
      return sections.data.data;
    } catch (error) {
      let status = error.response?.status;
      if (status === 401) {
        authService.logout();
      }
      return false;
    }
  };

  getQuestions = async (section) => {
    try {
      let token = Cookies.get("token");
      http.defaults.headers["Authorization"] = "Bearer " + token;
      let questions = await http.get(
        `SURVEYS/v1/questions/section/${section}/`
      );
      return questions.data.data;
    } catch (error) {
      let status = error.response?.status;
      if (status === 401) {
        authService.logout();
      }
    }
  };

  setPositionsCurrents = async (currents) => {
    try {
      let token = Cookies.get("token");
      http.defaults.headers["Authorization"] = "Bearer " + token;
      await http.post(`SURVEYS/v1/position/`, currents);
      return true;
    } catch (error) {
      let status = error.response?.status;
      if (status === 401) {
        authService.logout();
      }
      return false;
    }
  };

  saveSection = async (data) => {
    try {
      let token = Cookies.get("token");
      http.defaults.headers["Authorization"] = "Bearer " + token;
      await http.post(`SURVEYS/v1/answers/section/`, data);
      return true;
    } catch (error) {
      let status = error.response?.status;
      if (status === 401) {
        authService.logout();
      }
      return false;
    }
  };

  finishSurvey = async (survey) => {
    try {
      let token = Cookies.get("token");
      http.defaults.headers["Authorization"] = "Bearer " + token;
      await http.post(`SURVEYS/v1/final/`, { survey_: survey });
      return true;
    } catch (error) {
      let status = error.response?.status;
      if (status === 401) {
        authService.logout();
      }
      return false;
    }
  };
}
