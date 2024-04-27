const jwt = require('jsonwebtoken');

const generateToken =  (data) => { //la data tiene que ser un objeto
    return jwt.sign(data, process.env.SECRET_JWT, {expiresIn: '1h'})//1º- informacion que quieres guardar en el token()la data, 2º - clave secreta para nosotros como programadores, que me invento, y que suele ser un HASH super largo, 3º- en cuanto tiempo expiraese token, tiempo de duración 
}

const verfyToken = (token) => {
    return jwt.verify(token, 'secretKeyPepino')//1º-el token que yo quiero verificar, 2º-clave secreta creada personal de programador, la clave con la que has creado ese token
}

module.exports = {generateToken, verfyToken};