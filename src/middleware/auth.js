const {verifyToken} = require('../utils/jwt');
const User = require('../api/models/user.model');

//por cada ruta privada, tendremos que verificar el token, por lo que es mejor crear la constante para hacerlo varias veces y reutilizarlo más facilmente

const isAuth = async (req, res, next) => {
  try {
    //req.params, req.url, req.body
    const auth = req.headers.authorization;
    if(!auth) {
        return res.status(400).json({message:'No esta autorizado'})
    }
    // console.log(auth);
    const token = auth.split('')[1];
    const tokenVerified = verifyToken(token)
    console.log(tokenVerified);
    if(!tokenVerified._id) {
        return res.status(400).json({message:'Token incorrecto'})
    }

    const userProfile = await User.findById(tokenVerified._id)

    req.userProfile = userProfile;
    next()

  } catch (error) {
    
  }
}

module.exports = {isAuth};