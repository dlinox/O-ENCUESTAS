import axios from "axios"

export default class Ubigeo {
    getDepartamentos = async () => {
        let departamentos =  await axios.get('http://38.43.133.27/API/lugar/');
        return departamentos.data;

    }
    getProvincias = async (departamento) => {
        let provincias =  await axios.get(`http://38.43.133.27/API/provincias/${departamento}/`);
        return provincias.data;
    }
    getDistritos = async (provincia) => {
        let distritos =  await axios.get(`http://38.43.133.27/API/distritos/${provincia}/`);
        return distritos.data;
    }
}