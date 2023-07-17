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
      //SURVEY_AUTHENTICATIONS/v1/receive/
      let res = await http.post("SURVEY_AUTHENTICATIONS/v1/", {
        usr_: data.username,
        pwd_: data.password,
        // "user":  data.username,
        // "password": data.password,
        // "codigo_ingreso": null,
        // "nombres": data.name,
        // "segundo_apellido": data.paternalSurname,
        // "primer_apellido": data.maternalSurname,
        // "nro_documento": data.document,
        // "codigo_programa": data.academicProgramCode,
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
          message: "(e) iniciando ...",
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

  loginEntrants = async (data) => {
    // let enchufate = await this.authenticateEnchufate(data);
    // if (!enchufate.status) return enchufate;

    let fake = await this.loginEnchufateFake(data.username, data.password);
    if (!fake.status) return fake;

    let admition = await this.getDataAdmition(data.username);
    if (!admition.status) return admition;

    let survey = await this.singInSurvey(data);
    if (!survey.status) return survey;

    // let toke = encrypt(survey.data.token);
    let token = survey.data.token;

    Cookies.set("token", token);
    http.defaults.headers["Authorization"] = "Bearer " + survey.data.token;

    return survey;
  };

  //*LOGIN REGULAR STUDENT
  loginRegular = async (data) => {
    let enchufate = await this.authenticateEnchufate(data);

    console.log(enchufate);

    if (!enchufate.status) return enchufate;

    let survey = await this.reciveData(enchufate.data, data);
    // let survey = await this.singInSurvey(data); /*deprecate
    console.log("survey: ", survey);

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
    //*pendiente
    let validation = this.validateUser();

    if (validation) {
      return;
    }
    http.defaults.headers["Authorization"] = "Bearer " + route.key;
  };

  logout = () => {
    Cookies.remove("token");
    http.defaults.headers["Authorization"] = null;
    return;
  };
}
