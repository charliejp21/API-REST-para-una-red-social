const bcrypt = require('bcrypt')
const {registerUserDb, duplicatedUserDb, loginFind} = require('../controllers/userController');
const createToken = require("../services/jwt")

//importar servicios

//Registrar usuario
const registerUser = async (req, res) => {

    //Recoger datos de la petición
    const {name, subname, nick, email, password} = req.body;

    //Comprobar que me llegan bien los datos(+ validacion)
    if(!name || !email || !nick || !password){

        return res.status(400).json({

            status: "error",
            message: "Faltan datos por enviar"

        })

    }

    //Control de usuarios duplicados
    try {

        const duplicatedUser = await duplicatedUserDb(email, nick);

        if(duplicatedUser && duplicatedUser.length >= 1){

            return res.status(200).send({

                status: "success",
                message: "El usuario ya existe"

            })

        }else{

            //Crear registro de usuario en la db
            const userSave = await registerUserDb(name, subname, nick, email, hashedPassword)

            //Devolver el resultadado
            return res.status(201).json({

                status: "success",
                mensaje: "Usuario creado",
                user: userSave
            })


        }
        
    } catch (error) {
        
        return res.status(500).json({

            status: "error",
            mensaje: "Error del servidor al crear el usuario"

        })
        
    }

   
}

// Login
const loginUser = async(req, res) => {

    //Recoger parametro del body
    const {email, password} = req.body

    //Buscar en bd si existe

    if(!email || !password){

        return res.status(400).send({

            status: "success",
            mensaje: "Faltan datos por enviar"
        })
    }

    try {

        const findUserDb = await loginFind(email, password)

        if(findUserDb){

            return res.status(200).send({

                status: "success",
                usuario: findUserDb
            })

        }else{

            return res.status(400).send({

                status: "success",
                mensaje: "No hay registros con el correo indiciado"

            })

        }


    } catch (error) {

        return res.status(500).send({

            status: "error",
            mensaje: "Error del servidor al ejecutar el login"

        })
        
    }


    //Comprobar su contraseña

    //Token
    const token = createToken(user)
    

    //Devolver datos del usuario

}

module.exports = {registerUser, loginUser};