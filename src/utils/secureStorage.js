import CryptoJS from "crypto-js";
import SecureStorage from "secure-web-storage";

const SECRET_KEY = 'kjgbn9458gbn450g4m43589=3-0k23f423h42h3jh2r29f';

var secureStorage = new SecureStorage(localStorage, {
    hash: function hash(key) {
        key = CryptoJS.SHA256(key, SECRET_KEY);

        return key.toString();

    },
    encrypt: function encrypt(data) {
        data = CryptoJS.AES.encrypt(data, SECRET_KEY);
        data = data.toString();
        return data;

    },
    decrypt: function decrypt(data) {
        data = CryptoJS.AES.decrypt(data, SECRET_KEY);

        data = data.toString(CryptoJS.enc.Utf8);

        return data;

    }

});

if (import.meta.env.NODE_ENV !== 'production') {
    secureStorage = localStorage;
}

export default secureStorage;