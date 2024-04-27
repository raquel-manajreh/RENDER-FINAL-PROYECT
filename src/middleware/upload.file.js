//GESTIÓN Y VALIDACIÓN DE LOS FICHEROS
const multer = require('multer')// Encargado de gestionar los archivos, de cargar los archivos(esas imagenes)
const cloudinary = require('cloudinary').v2// Herramienta principal con la que me voy a conectar a claudinary(como todas las dependencias que hacemos siempre)
const {CloudinaryStorage} = require('multer-storage-cloudinary')// Encargado de, con claudinary, cargar los archivos(en claudinary), para subir los archivos al almacenamiento de claudinary - INTEGRAR EL MULTER CON CLAUDINARY

//Vamos a CREAR el ALMACEN, y se usará la función cuando queramos compartir esas imgs
//Permite subir a cloudinary las imagenes previamente validadas con el multer
const storage = new CloudinaryStorage({
    cloudinary:cloudinary, //1º param - DÓNDE lo quiero almacenar
    params: { //2º param - Catacterísticas de las imgs
        folder: 'studentFullStack', //En que carpeta quieres que se guarden esas imgs
        allowedFormats: ['jpg', 'jpeg', 'pmg', 'gif', 'svg']
    }
})

//Subo la imagen con los parametros definidos
const upload = multer({storage})//Siempre va a ser storage, donde se guarda, en esa variable de arriba llamada storage

module.exports = upload; // Se exporta (como siempre)