import Cookies from "js-cookie";
import http from "../utils/https";

export default class SurveyService {

    getSurveys = async () => {
        let token = Cookies.get('token');
        http.defaults.headers['Authorization'] = 'Bearer ' + token;
        let surveys = await http.get('/');
        return surveys.data.data;
    };
    
    getSurvey =  async (id) => {
        let token = Cookies.get('token');
        http.defaults.headers['Authorization'] = 'Bearer ' + token;
        let survey = await http.get(`actual/${id}/`);
        return survey;
    }

    getTopics = async (survey) => {
        let token = Cookies.get('token');
        http.defaults.headers['Authorization'] = 'Bearer ' + token;
        let topics = await http.get(`topics/${survey}/`);
        return topics.data.data;
    };

    getSections = async (topic) => {
        let token = Cookies.get('token');
        http.defaults.headers['Authorization'] = 'Bearer ' + token;
        let sections = await http.get(`sections/${topic}/`);
        return sections.data.data;
    };

    getQuestions = async (section) => {
        let token = Cookies.get('token');
        http.defaults.headers['Authorization'] = 'Bearer ' + token;
        let questions = await http.get(`questions/section/${section}/`);
        return questions.data.data;
    };
    
}