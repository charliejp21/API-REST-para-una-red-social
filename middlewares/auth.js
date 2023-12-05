//importar modulos
const jwt = require("jwt-simple")
const moment = require("moment")
require('dotenv').config();
const {SECRET} = process.env;

//Funcion de autenticación (MIDDLEWARE de autenticación)
exports.auth = (req, res, next) =>{

    //Comprobar si me llega la cabecera de auth
    if(!req.headers.authorization){

        return res.status(403).json({

            status: "error",
            message: "La petición no tiene la cabecera de autenticación"

        })

    }

    //limpar el token(Posibles comillas simples o dobles)
    const token = req.headers.authorization.replace(/['"]+/g, '')

    //Decodificar el token
    try {
        
        let payload = jwt.decode(token, SECRET)

        //Comprobar expiración del token
        if(payload.exp <= moment().unix()){

            return res.status(401).json({

                status: "error",
                message: "Token expirado",

            })

        }
        
        //Agregar datos del usuario
        req.user = payload;

    } catch (error) {
        
        return res.status(404).send({

            status: "error",
            message: "Token inválido",
            error
        })
    }

    //Pasar a ejecución de acción
    next()

}