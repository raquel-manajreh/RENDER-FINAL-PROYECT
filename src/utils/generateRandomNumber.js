const generateRandomNumber = () => {

    const random = Math.random().toString(32).substring(2);//Me genera un numro random de 0 a 1, me lo convierte en string en base 32, y le quito los primeros 2 caracteres para eliminar el 0, porque el 0 a la izquierda no pinta nada.
    const date = Date.now().toString(32);
    return random + date;

}

module.exports = generateRandomNumber;