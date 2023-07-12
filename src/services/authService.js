import http from "../utils/https";
import Cookies from "js-cookie";
import enchuData from "@/assets/datademo.json";
import { encrypt, decrypt } from "../utils/cryptoJS";

export default class AuthService {
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

      if (userAuth.data !== "Contraseña incorrecta.") {
        return {
          data: null,
          status: false,
          message: "(e) Contraseña incorrecta.",
        };
      } else {
        return {
          data: userAuth.data,
          status: true,
          message: null,
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
    // let enchufate = await this.authenticateEnchufate(data); //*pendiente
    // if (!enchufate.status) return enchufate; //*pendiente

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
    // let enchufate = await this.authenticateEnchufate(data); //*pendiente
    // if (!enchufate.status) return enchufate; //*pendiente

    return "* pendiente";

    let survey = await this.singInSurvey(data);

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
