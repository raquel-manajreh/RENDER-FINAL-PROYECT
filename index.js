// imports de dependencias y archivos
const express = require('express');
const {connectDB} = require('./src/utils/database');

const routerUser = require('./src/api/routes/user.routes');
const env = require('dotenv')
const cloudinary = require('cloudinary').v2;
const cors = require('cors')
const swaggerUI = require('swagger-ui-express');

// const swaggerJson = require('./swagger.json'); //Cuando este relleno porque ahora esta vacio y me 'crashea' la terminal

env.config()//Para trabajar con variables de entorno. Configuración del servidor

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY_CLOUD,
    api_secret: process.env.API_SECRET_CLOUD
});

//configuracion del servidor
const server = express();
server.use(express.json());
connectDB();
server.use(cors());

// configuro el servidor con las rutas
server.use('/user', routerUser);

// server.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJson));
//Lo de justo arriba lo pongo normal y no como comentario cuando tenga el json completo, ya que ahora me 'crashea' la termianl

//1ºrura para ver la documentacion, 2º ejecutar la interfaz grafica de Swagger, 3º que este swaggerUI utilice el swagger.json, exportando las dependencias al principio y poniendo este ultimo parametro aqui para indicarlo

// ejecucion del servidor
const PORT = process.env.PORT;
server.listen(PORT, () => {
    console.log(`Escuchando puerto http://localhost:${PORT}`);
});
