import axios from "axios"

export default class Ubigeo {
    getDepartamentos = async () => {
        let departamentos = await axios.get('http://38.43.133.27/SURVEY_PLACES/v1/departments/');

        console.log(departamentos);
        return departamentos.data.data;

    }
    getProvincias = async (departamento) => {

        let provincias = await axios.get(`http://38.43.133.27/SURVEY_PLACES/v1/provinces/${departamento}/`);
        return provincias.data.data;
    }

    getDistritos = async (provincia) => {
        let distritos = await axios.get(`http://38.43.133.27/SURVEY_PLACES/v1/districts/${provincia}/`);
        return distritos.data.data;
    }

    getUbigeo = async (ubigeo) => {
        try {
            let res = await axios.get(`http://38.43.133.27/SURVEY_PLACES/v1/${ubigeo}/`);

            return res.data.data[0];
        } catch (error) {
            return null;
        }

    }
}