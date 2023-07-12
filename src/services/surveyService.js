import Cookies from "js-cookie";
import http from "../utils/https";

export default class SurveyService {
  getSurveys = async () => {
    let token = Cookies.get("token");
    http.defaults.headers["Authorization"] = "Bearer " + token;
    let surveys = await http.get("SURVEYS/v1/");
    return surveys.data.data;
  };

  getSurvey = async (id) => {
    try {
      let token = Cookies.get("token");
      http.defaults.headers["Authorization"] = "Bearer " + token;
      let survey = await http.get(`SURVEYS/v1/actual/${id}/`);
      return survey.data.data[0];
    } catch (error) {
      console.log("error: ", error);
      return false;
    }
  };

  getTopics = async (survey) => {
    let token = Cookies.get("token");
    http.defaults.headers["Authorization"] = "Bearer " + token;
    let topics = await http.get(`SURVEYS/v1/topics/${survey}/`);
    return topics.data.data;
  };

  getSections = async (topic) => {
    let token = Cookies.get("token");
    http.defaults.headers["Authorization"] = "Bearer " + token;
    let sections = await http.get(`SURVEYS/v1/sections/${topic}/`);
    return sections.data.data;
  };

  getQuestions = async (section) => {
    let token = Cookies.get("token");
    http.defaults.headers["Authorization"] = "Bearer " + token;
    let questions = await http.get(`SURVEYS/v1/questions/section/${section}/`);
    return questions.data.data;
  };

  setPositionsCurrents = async (currents) => {
    try {
      let token = Cookies.get("token");
      http.defaults.headers["Authorization"] = "Bearer " + token;
      await http.post(`SURVEYS/v1/position/`, currents);
      return true;
    } catch (error) {
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
      return false;
    }
  };
}
