import http from "../utils/https";
import Cookies from "js-cookie";

export default class AuthService {

    validateUser = () => {
        console.log('cookie: ', Cookies.get('key'));
        let key = Cookies.get('key');
        // let account = Cookies.get('account');
        // let module = Cookies.get('module');
        // let role = Cookies.get('role');

        if ((key != null && key != 'undefined')) {

            return true;
        }
        return false;
    }

    getCurrentUser = async (route) => {

        let validation = this.validateUser();

        if (validation) {
            //  window.location.href  = '/';
            return;
        };

        if (!route.key) {
            this.logout();
            return;
        };

        Cookies.set('key', route.key);
        Cookies.set('account', route.account);
        Cookies.set('module', route.module);
        Cookies.set('role', route.role);
        http.defaults.headers['Authorization'] = 'Bearer ' + route.key;
    }

    logout = () => {
        Cookies.remove('key');
        Cookies.remove('account');
        Cookies.remove('module');
        Cookies.remove('role');
        window.location.href  = 'http://38.43.133.27/una-core/login';
        return;
    }

}