const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const {validateEmailDB, validatePassword} = require('../../utils/validator');
const {generateToken} = require('../../utils/jwt');
const transporter = require('../../utils/nodemailer-config');
const generateRandomNumber = require('../../utils/generateRandomNumber');

const register = async (req, res) => {

    try {
        //creo el documento de ususario
        const userNew = new User(req.body);
        console.log(req.body);

        // Si recibo de cloudinary la ruta de la imagen, se la asigno a la propiedad image de mi nuevo documento
        if(req.file.path){
            userNew.image = req.file.path;
        }

    //validaciones:
    //1.- El usuario no exista (email)
    const valEmail = await validateEmailDB(req.body.email);

    if(!valEmail) { //si no existe valEmail o es = null
    //2.- La contraseña cumpla el patrón requierido (regex)
        const valPassword = validatePassword(req.body.password);//devuelve true o false
        if(valPassword){
        //3.- Encriptar la contraseña antes de registrarme HASH
            userNew.password = bcrypt.hashSync(userNew.password, 10);
            userNew.confirmRandom = generateRandomNumber(); //false
            const createdUser = await userNew.save();

            await transporter.sendMail({
                from: 'lucas64@ethereal.email',//Desde dónde vamos a enviar el email
                to: req.body.email, //A dónde quieres mandarlo
                subject: 'Enviado desde nodemailer',//Asunto
                text: 'Hola mundo',//Un texto
                html: `
                <h4> Bienvenido ${req.body.name} </h4>
                <p> Haga click en el siguiente enlace para confirmar su cuenta <a href="http://localhost:5001/user/confirm-user/${userNew.confirmRandom}"> </a> </p>
                `,
            }, function(error, info){
                if (error){
                    console.log(error);
                    res.send('error al enviar el email');
                }else{
                    console.log('correo enviado: ' + info.response)
                    res.send('correo enviado correctamenre');
                }
            });


            return res.status(200).json({success: true, data: createdUser});
        }else{
            return res.status(200).json({success: false, message: 'La contraseá no cumple con el patrón indicado'});
        }
    }
    return res.status(200).json({success: false, message: 'El email ya está registrado'});

    } catch (error) {
        console.log(error)
        return res.status(500).json(error);
    }
};

const login = async (req, res) => {
    try {
        const userBody = req.body;
        const userDB = await validateEmailDB(userBody.email)
        if(!userDB){
            return res.status(200).json({success: false, message:'El email no está registrado'})
        }
        if(!bcrypt.compareSync(userBody.password, userDB.password)){
            return res.status(200).json({success: true, message: 'contraseña inválida'
            })
        }
        //generar el token
        const token = generateToken({
            name: userDB.name,
            email: userDB.email,
            _id: userDB._id,
        })
        return res.status(200).json({success: true, token: token})

    } catch (error) {
        return res.status(500).json(error);
    }
};

const modifyProfile = async (req, res) => {
    // console.log('estoy en la funcion de modificar')
    console.log(req.userProfile);
    const newUser = new User (req.body);
    newUser.password = bcrypt.hashSync(req.body.password, 10)
    newUser._id = req.userProfile._idconsole.log(newUser);
    const updateUser = await User.findByIdAndUpdate(req.userProfile._id, newUser, {new: true})
    return res.status(200).json({data: updateUser})
};

const getUsers = async (req, res) => {
    try {
       const usersDB = await User.find();
       return res.json(usersDB);
    } catch (error) {
        console.log(error);
    }
};


module.exports = {register, validatePassword, login, modifyProfile, getUsers};