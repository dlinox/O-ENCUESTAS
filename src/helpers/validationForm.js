const IsRequired = (val) => {
    if (val === '' || val === null) return false;
    return true;
}
const IsNumber = (val) => {
    let validNumber = /^[0-9]+$/;
    if (val.match(validNumber)) return true;
    return false;
}

const MaxLong = (val, log) => {
    if (val.length <= log) return true;
    return false;
}

const MinLong = (val, log) => {
    if (val.length >= log) return true;
    return false;
}

const IsEmail = (val) => {
    let validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (val.match(validEmail)) return true;
    return false;
}

const IsDate = (val) => { }
const IsArray = (val) => { }


export {
    IsRequired,
    IsNumber,
    IsEmail,
    IsArray,
    IsDate,
    MaxLong,
    MinLong
};