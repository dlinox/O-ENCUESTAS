import Cookies from "js-cookie";
import http from "../utils/https";

export default class SurveyService {

    getSurveys = async () => {
        let surveys = await http.get('/');
        return surveys.data.data;
    };
    // setSurveys = (surveys) => dataStore.surveys = surveys;

    getSurvey =  async (id) => {

        let survey = await http.get(`actual/${id}/`);

        console.log(survey.data.data[0]);

        return survey;

    }

    getTopics = async (survey) => {
        let topics = await http.get(`topics/${survey}/`);
        return topics.data.data;
    };
    // setTopics = async (topics) => dataStore.topics = topics;

    getSections = async (topic) => {
        let sections = await http.get(`sections/${topic}/`);
        return sections.data.data;
    };
    // setSections = (sections) => dataStore.sections = sections;

    getQuestions = async (section) => {

        let token = Cookies.get('token');
        http.defaults.headers['Authorization'] = 'Bearer ' + token;

        let questions = await http.get(`questions/section/${section}/`);
        return questions.data.data;
    };
    // setQuestions = (questions) => dataStore.questions = questions;
}