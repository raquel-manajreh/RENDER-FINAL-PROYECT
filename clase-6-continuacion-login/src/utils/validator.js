const User = require('../api/models/user.model')

const validateEmailDB = async (emailUser) => {
    try {
        const validateEmail = await  User.findOne({email: emailUser});
        return validateEmail;
    } catch (error) {
        console.log(error);
    }
};

const validatePassword = (pass) => {
    const regex = /[A-Za-z\d$@$!%*?&]{8,15}/;
    return regex.test(pass); //esto devuelve true o false
};

module.exports = {validateEmailDB, validatePassword};

