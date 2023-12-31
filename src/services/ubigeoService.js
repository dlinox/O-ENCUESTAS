import axios from "axios";

import  departments  from '../assets/dev.json'; 

export default class UbigeoService {
  getDepartamentos = async () => {
    return departments.data;
  };
  getProvincias = async (departamento) => {
    let provincias = await axios.get(
      `https://service2.unap.edu.pe/SURVEY_PLACES/v1/provinces/${departamento}/`
    );
    return provincias.data.data;
  };

  getDistritos = async (provincia) => {
    let distritos = await axios.get(
      `https://service2.unap.edu.pe/SURVEY_PLACES/v1/districts/${provincia}/`
    );
    return distritos.data.data;
  };

  getUbigeo = async (ubigeo) => {
    try {
      let res = await axios.get(
        `https://service2.unap.edu.pe/SURVEY_PLACES/v1/${ubigeo}/`
      );
      return res.data.data[0];
    } catch (error) {
      return null;
    }
  };
}
