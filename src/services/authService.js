import http from "../utils/https";
import Cookies from "js-cookie";
import enchuData from '../assets/datademo.json';

export default class AuthService {
    loginEnchufate = async (username, password = null) => {

        let res = enchuData.find((item) => item.nro_documento === username);

        if (!res) return {
            data: null,
            status: false,
        };

        return {
            data: res,
            status: true,
        };

    }
    setDataAdmicion = async (dni) => {

        let res = await http.get('http://172.80.80.60/api/consulta/' + dni);
        return res;

    }

    login = async (data) => {

        let restEnchufate = await this.loginEnchufate(data.user, data.password);

        if (restEnchufate.status) {

            let dni = restEnchufate.data.nro_documento;
            let resAdmicion = await this.setDataAdmicion(dni);

            if (resAdmicion.data.status) {

                let resLogin = await http.post('http://38.43.133.27/SURVEY_AUTHENTICATIONS/v1/',
                    {
                        "usr_": data.user,
                        "pwd_": data.password,
                        ...data,
                        ...restEnchufate,
                    }
                );

                if (resLogin) {
                    Cookies.set('token', resLogin.data.token);
                    http.defaults.headers['Authorization'] = 'Bearer ' + resLogin.data.token;
                }
            }
        }
    }

    validateUser = async () => {

        let token = Cookies.get('token');
        if ((token != null && token != 'undefined')) {
            return true;
        }
        return false;
    }

    getCurrentUser = async () => {

        let validation = this.validateUser();

        if (validation) {
            return;
        };

        http.defaults.headers['Authorization'] = 'Bearer ' + route.key;
    }

    logout = () => {
        Cookies.remove('token');
        http.defaults.headers['Authorization'] = null;
        return;
    }

}