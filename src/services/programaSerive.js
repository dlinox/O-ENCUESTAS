import axios from "axios"

export default class ProgramaService {

    getFacultades = async () => {
        let res = await axios.get('http://38.43.133.27/SURVEY_FACULTIES/v1/');
        return res.data.data;
    }
    getProgramas = async () => {
        let res = await axios.get('http://38.43.133.27/SURVEY_APROGRAMS/v1/');
        return res.data.data;
    }
}