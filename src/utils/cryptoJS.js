import CryptoJS from "crypto-js";

const encrypt = (data) => {
  let dataEncrypt = CryptoJS.AES.encrypt(
    data,
    import.meta.env.VITE_APP_SECRET_KEY
  );
  return dataEncrypt.toString();
};

const decrypt = (data) => {
  let dataDecrypt = CryptoJS.AES.decrypt(
    data,
    import.meta.env.VITE_APP_SECRET_KEY
  );
  dataDecrypt = dataDecrypt.toString(CryptoJS.enc.Utf8);
  return dataDecrypt;
};

export { encrypt, decrypt };
