const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email', //se puede crear por un gmail que te quisieras crear para el proyecto
    port: 587,
    auth: {
        user: 'tracey91@ethereal.email', //Usuario del email
        pass: 'ukYMz5HnrPnJA1TPPT' // contraseña del email
    }
});

module.exports = transporter;