//importar modulos
const jwt = require("jwt-simple")
const moment = require("moment")
require('dotenv').config();
const {SECRET} = process.env;

//Clave secreta con dotenv
const libjwt = require("../services/jwt")

//Funcion de autenticación
exports.auth = (req, res, next) =>{

    //Comprobar si me llega la cabecera de auth
    if(!req.headers.authorization){

        return res.status(403).json({

            status: "error",
            message: "la petición no tiene la cabecera de autenticación"

        })

    }

}

//limpar el token
const token = req.headers.authorization.replace(/['"]+/g, '')

//Decodificar el token
try {
    
    const payload = jwt.decode(token, SECRET)

    //Comprobar expiración del token
    if(payload.exp <= moment().unix()){

        return res.status(401).send({

            status: "error",
            message: "Token expirado",
            error 
        })


    }

} catch (error) {
    
    return res.status(404).send({

        status: "error",
        message: "Token inválido",
        error
    })
}
//Agregar datos del usuario


//Pasar a ejecución de acción