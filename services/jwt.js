//Importar dependencias
const jwt = require("jwt-simple")
const moment = require("moment")
require('dotenv').config();
const {SECRET} = process.env;

//Crear una función para generar tokens
const createToken = (user) => {

    const payload = {

        id: user._id,
        name: user.name,
        surname: user.surname,
        nick: user.nick,
        email: user.email,
        role: user.role,
        imagen: user.image,
        iat: moment().unix(),
        exp: moment().add(30, "days").unix()

    }

    //Devolver jwt token codificado
    return jwt.encode(payload, SECRET)

}

module.exports = createToken;