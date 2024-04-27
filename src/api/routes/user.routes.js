const express = require('express');
const router = express.Router();
const {register, login, modifyProfile} = require('../controllers/user.controller');
const {isAuth} = require('../../middleware/auth');
const upload = require('../../middleware/upload.file')

router.post('/register', upload.single('image'), register);
router.post('/login', login);
router.put('/update',[isAuth], modifyProfile); //ve a la ruta de update, si me dice que sí está autolizad, pasa a isAuth, y si ese token está autorizado, si está correcto, pasa a modificar los datos del perfil de mi usuario

module.exports = router;