import http from "../utils/https";
import Cookies from "js-cookie";
import enchuData from "@/assets/datademo.json";

export default class AuthService {
  reciveData = async (data, credentias) => {
    try {
      //SURVEY_AUTHENTICATIONS/v1/receive/
      let res = await http.post("SURVEY_AUTHENTICATIONS/v1/receive/", {
        // usr_: data.username,
        // pwd_: data.password,
        user: credentias.username,
        password: credentias.password,
        codigo_ingreso: data.userName,
        nombres: data.name,
        segundo_apellido: data.paternalSurname,
        primer_apellido: data.maternalSurname,
        nro_documento: data.document,
        codigo_programa: data.academicProgramCode,
        uuid: data.id,
      });

      return {
        data: res.data,
        status: true,
        message: "(s) success ok",
      };
    } catch (error) {
      return {
        data: null,
        status: false,
        message: "(s) Credenciales no válidas [SIN ACCESO] ",
      };
    }
  };

  singInSurvey = async (data) => {
    try {
      let res = await http.post("SURVEY_AUTHENTICATIONS/v1/", {
        usr_: data.username,
        pwd_: data.password,
      });
      return {
        data: res.data,
        status: true,
        message: "(s) success ok",
      };
    } catch (error) {
      return {
        data: null,
        status: false,
        message: "(s) Credenciales no válidas [SIN ACCESO] ",
      };
    }
  };

  //*LOGIN ENTRANTS STUDENT
  getDataAdmition = async (dni) => {
    const urlApiAdmi = import.meta.env.VITE_APP_URL_API_ADMI;
    try {
      let res = await http.get(urlApiAdmi + dni);
      return {
        data: res.data.data,
        status: res.data.status,
        message: "(a) " + res.data.message,
      };
    } catch (error) {
      return {
        data: null,
        status: false,
        message: "(a) " + error,
      };
    }
  };

  authenticateEnchufate = async (data) => {
    try {
      let formData = new FormData();
      formData.append("username", data.username);
      formData.append("password", data.password);
      let userAuth = await http.post(
        "https://intranet.unap.edu.pe/biblioteca/api/get-student-information",
        formData
      );
      if (userAuth.data == "Contraseña incorrecta.") {
        return {
          data: null,
          status: false,
          message: "(e) Contraseña incorrecta.",
        };
      } else {
        return {
          data: userAuth.data,
          status: true,
          message: "(e) Iniciando ...",
        };
      }
    } catch (error) {
      return {
        data: null,
        status: false,
        message: "(e) " + error,
      };
    }
  };

  loginEntrantsWithEnchufate = async (data) => {
    let enchufate = await this.authenticateEnchufate(data);
    if (!enchufate.status) return enchufate;
    let admition = await this.getDataAdmition(data.username);
    if (!admition.status) return admition;
    let survey = await this.reciveData(enchufate.data, data);
    if (!survey.status) return survey;
    let token = survey.data.token;
    Cookies.set("token", token);
    http.defaults.headers["Authorization"] = "Bearer " + survey.data.token;
    return survey;
  };

  loginEntrantsAux = async (data) => {
    let admition = await this.getDataAdmition(data.username);
    if (!admition.status) return admition;

    let survey = await this.singInSurvey(data);
    if (!survey.status) return survey;
    let token = survey.data.token;
    Cookies.set("token", token);
    http.defaults.headers["Authorization"] = "Bearer " + survey.data.token;
    return survey;
  };

  loginEntrants = async (data) => {
    let typeLogin = import.meta.env.VITE_APP_LOGIN_ENTRANTS;
    if (typeLogin === "enchufate") {
      let res = await this.loginEntrantsWithEnchufate(data);
      return res;
    } else if ("aux") {
      console.log("aux");
      let res = await this.loginEntrantsAux(data);
      return res;
    }

    console.error("Service login no defined");
  };

  //*LOGIN REGULAR STUDENT
  loginRegular = async (data) => {
    let enchufate = await this.authenticateEnchufate(data);
    if (!enchufate.status) return enchufate;
    let survey = await this.reciveData(enchufate.data, data);
    if (!survey.status) return survey;
    Cookies.set("token", survey.data.token);
    http.defaults.headers["Authorization"] = "Bearer " + survey.data.token;

    return survey;
  };

  loginEnchufateFake = async (username, password = null) => {
    let res = enchuData.find((item) => item.nro_documento === username);

    if (!res)
      return {
        data: null,
        status: false,
        message: "(fk) Credenciales no válidas [SIN ACCESO] ",
      };

    return {
      data: res,
      status: true,
      message: "(fk) Fake ok ",
    };
  };

  validateUser = async () => {
    let token = Cookies.get("token");
    if (token != null && token != "undefined") {
      return true;
    }
    return false;
  };

  getCurrentUser = async () => {
    let isValid = this.validateUser();
    if (isValid) {
      try {
        let token = Cookies.get("token");
        http.defaults.headers["Authorization"] = "Bearer " + token;
        let currentUser = await http.get(`IsRegular/`);
        return currentUser.data.justEntered === 1 ? true : false;
        // return  true;
      } catch (error) {
        let status = error.response?.status;
        if (status === 401) {
          this.logout();
        }
        return true;
      }
    }
  };

  logout = () => {
    Cookies.remove("token");
    http.defaults.headers["Authorization"] = null;
    return;
  };
}
