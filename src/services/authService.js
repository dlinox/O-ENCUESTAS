import http from "../utils/https";
import Cookies from "js-cookie";



export default class AuthService {
    
    
    login = async (data) => {
        let res = await http.post('http://38.43.133.27/SURVEY_AUTHENTICATIONS/v1/',
            {
                "usr_": data.user,
                "pwd_": data.password
            }
        );
        Cookies.set('token', res.data.token);
        
        http.defaults.headers['Authorization'] = 'Bearer ' + res.data.token;
    }

    validateUser = async () => {

        let token = Cookies.get('token');

        if ((token != null && token != 'undefined')) {
            return true;
        }
        return false;
    }

    getCurrentUser = async (route) => {

        let validation = this.validateUser();

        if (validation) {
            return;
        };

        if (!route.key) {
            this.logout();
            return;
        };

        http.defaults.headers['Authorization'] = 'Bearer ' + route.key;
    }

    logout = () => {

        Cookies.remove('token');
        http.defaults.headers['Authorization'] = null;
        //router.push({name: 'login'});
        return;
    }

}